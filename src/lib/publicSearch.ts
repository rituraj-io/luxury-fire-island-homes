// Client for the public-search API. The shape mirrors what the admin panel
// exposes; we only model the fields the search-results UI cares about so the
// type stays manageable. Anything extra in the response is ignored.
//
// `featureIds` is intentionally NOT wired into the payload yet — the public
// API doesn't expose a feature-list endpoint, so we have no way to translate
// our human-readable feature labels into the UUIDs the backend expects.
// Once Saad ships either a public `/features` endpoint or hands us a static
// label→UUID mapping, hook it in inside `filtersToPayload`.


import type { Cadence, Filters } from "@/lib/rentalFilters";


const PUBLIC_SEARCH_URL =
	"https://vwk0bwmeh8.execute-api.eu-north-1.amazonaws.com/adminpanel/public-search";


// Subset of the response we actually render. Optional fields stay optional —
// the API returns many `null`s and we should fail soft rather than over-claim
// in the type.
export type PublicSearchProperty = {
	id: string;
	title: string;
	type: "Rent" | "Sale" | string;
	bedrooms: number;
	bathrooms: number;
	sleeps_capacity: number;
	address_city: string;
	address_state: string;
	is_exclusive_property: boolean;
	single_family_or_apartment: string | null;
	private_or_shared: string | null;
	featured_image: string | null;
	image_urls?: string[] | null;
	listing_price: string | number | null;
	pricing?: Array<{
		price: string | number;
		period: string;
		label?: string | null;
	}> | null;
};


export type PublicSearchResponse = {
	data: PublicSearchProperty[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};


export type SearchArgs = {
	filters: Filters;
	page?: number;
	limit?: number;
};


// Maps "Seasonally" (our UI label) to "seasonal" (the API enum); everything
// else is just a lowercase of our label.
function cadenceToApi(c: Cadence): string {
	return c === "Seasonally" ? "seasonal" : c.toLowerCase();
}


export function filtersToPayload(filters: Filters, page: number, limit: number): Record<string, unknown> {
	const payload: Record<string, unknown> = {
		page,
		limit,
		// All Fire Island listings are in NY — keep this hardcoded until the
		// product ever expands beyond a single state.
		addressState: "NY",
	};

	if (filters.keyword.trim()) payload.search = filters.keyword.trim();
	if (filters.listingType) payload.type = filters.listingType;
	if (filters.city) payload.addressCity = filters.city;

	if (filters.exclusiveListing === "yes") payload.isExclusive = true;
	else if (filters.exclusiveListing === "no") payload.isExclusive = false;

	if (filters.bedrooms.min != null) payload.minBedrooms = filters.bedrooms.min;
	if (filters.bedrooms.max != null) payload.maxBedrooms = filters.bedrooms.max;
	if (filters.bathrooms.min != null) payload.minBathrooms = filters.bathrooms.min;
	if (filters.bathrooms.max != null) payload.maxBathrooms = filters.bathrooms.max;
	if (filters.sleeps.min != null) payload.minSleeps = filters.sleeps.min;
	if (filters.sleeps.max != null) payload.maxSleeps = filters.sleeps.max;

	if (filters.price.min != null) payload.minPrice = filters.price.min;
	if (filters.price.max != null) payload.maxPrice = filters.price.max;

	if (filters.familyApartment) payload.singleFamilyOrApartment = filters.familyApartment;
	if (filters.privateShared) payload.privateOrShared = filters.privateShared;

	if (filters.cadence.length > 0) {
		payload.listingAvailabilityCadence = filters.cadence.map(cadenceToApi);
	}

	// featureIds: skipped — see file-level note above.

	return payload;
}


export async function searchProperties({
	filters,
	page = 1,
	limit = 12,
}: SearchArgs): Promise<PublicSearchResponse> {
	const payload = filtersToPayload(filters, page, limit);
	const res = await fetch(PUBLIC_SEARCH_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		throw new Error(`Search failed: ${res.status} ${res.statusText}`);
	}
	return (await res.json()) as PublicSearchResponse;
}


// Picks a human-readable price label off a property. Sale listings get the
// listing_price; rentals get the first pricing tier with its period suffix.
// Falls back to "Price on request" if neither is populated.
export function priceLabel(p: PublicSearchProperty): string {
	if (p.type === "Sale" && p.listing_price != null) {
		const n = Number(p.listing_price);
		if (Number.isFinite(n)) return `$${n.toLocaleString()}`;
	}
	if (p.pricing && p.pricing.length > 0) {
		const first = p.pricing[0];
		const n = Number(first.price);
		if (Number.isFinite(n)) return `$${n.toLocaleString()} / ${first.period}`;
	}
	return "Price on request";
}


// Card thumbnail with sensible fallback chain.
export function thumbnailUrl(p: PublicSearchProperty): string {
	return p.featured_image || p.image_urls?.[0] || "/assets/images/placeholder.svg";
}


export function locationLabel(p: PublicSearchProperty): string {
	const parts = [p.address_city, p.address_state].filter(Boolean);
	return parts.join(", ");
}


// Sort the current result page client-side. The public-search API itself
// has no sort parameter (yet) — we sort within whatever's been loaded so
// the dropdown still feels responsive. Returns a new array.
export function applySortPublic<T extends PublicSearchProperty>(items: T[], key: "default" | "price-asc" | "price-desc" | "beds-desc"): T[] {
	if (key === "default") return items;
	const priceOf = (p: PublicSearchProperty): number => {
		if (p.type === "Sale" && p.listing_price != null) {
			const n = Number(p.listing_price);
			return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
		}
		if (p.pricing && p.pricing.length > 0) {
			const n = Number(p.pricing[0].price);
			return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
		}
		return Number.POSITIVE_INFINITY;
	};
	const out = [...items];
	switch (key) {
		case "price-asc":
			out.sort((a, b) => priceOf(a) - priceOf(b));
			break;
		case "price-desc":
			out.sort((a, b) => priceOf(b) - priceOf(a));
			break;
		case "beds-desc":
			out.sort((a, b) => b.bedrooms - a.bedrooms);
			break;
	}
	return out;
}
