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

const PUBLIC_PROPERTY_DETAILS_URL =
	"https://vwk0bwmeh8.execute-api.eu-north-1.amazonaws.com/adminpanel/public-property-details";


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


/* ──────────────────────── property details ──────────────────────── */


// Subset of /public-property-details/:id we actually consume. The endpoint
// returns rich data (full image list, agents with photos, neighborhood,
// beds breakdown by room, pricing tiers). Optional fields stay optional —
// the API returns many nulls and partial records.
export type PublicPropertyAgent = {
	id: string;
	name: string;
	profilePicture: string | null;
};

export type PublicPropertyImage = {
	imageUrl: string;
	caption: string | null;
	displayOrder: number;
};

export type PublicPropertyBedConfig = {
	bedroom: number;
	bedType: string;
	sleeps: number;
	quantity: number;
};

export type PublicPropertyPricingTier = {
	id: string;
	label: string | null;
	price: number;
	period: string;
	startDate: string | null;
	endDate: string | null;
};

export type PublicPropertyDetail = {
	id: string;
	title: string;
	type: "Rent" | "Sale" | string;
	referenceCode: string | null;
	description: string | null;
	overview: string | null;
	featuredImage: string | null;
	images: PublicPropertyImage[] | null;
	agents: PublicPropertyAgent[] | null;
	rooms: {
		bedrooms: number;
		bathrooms: number;
		beds_config: PublicPropertyBedConfig[] | null;
	} | null;
	featuresList: string[] | null;
	areaSqFt: number | null;
	isExclusiveProperty: boolean | null;
	singleFamilyOrApartment: string | null;
	privateOrShared: string | null;
	pricingAndAvailability: PublicPropertyPricingTier[] | null;
	availabilityText: string | null;
	listingPrice: number | string | null;
	neighbourhoodDetails: { id: string; title: string; description: string } | null;
	houseRulesList: string[] | null;
	safetyItemsList: string[] | null;
	cancellationPolicy: string | null;
	checkInStart: string | null;
	checkInEnd: string | null;
	checkOutTime: string | null;
	minBookingDays: number | null;
	maxBookingDays: number | null;
};


// Maps a public-property-details payload to the internal `Rental` shape
// used by /rentals/[slug] page components. The Rental type is the
// universal renderer schema; this bridge keeps the components agnostic of
// the upstream API. Anything the API doesn't provide (pricing tiers,
// detailed rooms layout, hardcoded marketing copy) stays undefined.
function priceLabelFromTier(p: PublicPropertyDetail): string {
	if (p.type === "Sale" && p.listingPrice != null) {
		const n = Number(p.listingPrice);
		if (Number.isFinite(n)) return `$${n.toLocaleString()}`;
	}
	const tier = p.pricingAndAvailability?.[0];
	if (tier) {
		const n = Number(tier.price);
		if (Number.isFinite(n)) return `$${n.toLocaleString()} / ${tier.period}`;
	}
	return "Price on request";
}


function totalSleeps(beds: PublicPropertyBedConfig[] | null | undefined, bedrooms: number): number {
	if (!beds || beds.length === 0) return bedrooms * 2;
	return beds.reduce((sum, b) => sum + (b.sleeps ?? 0) * (b.quantity ?? 1), 0);
}


// Beds_config arrives flat ([{bedroom:1, bedType:"King Bed", sleeps:1, quantity:1}, ...]).
// Group by bedroom number into RentalRoom rows so the "Rooms & beds" section
// renders one card per bedroom with a human-readable bed summary.
function beddingToRooms(
	beds: PublicPropertyBedConfig[] | null | undefined,
): import("@/lib/rentals").RentalRoom[] {
	if (!beds || beds.length === 0) return [];
	const byBedroom = new Map<number, PublicPropertyBedConfig[]>();
	for (const b of beds) {
		const arr = byBedroom.get(b.bedroom) ?? [];
		arr.push(b);
		byBedroom.set(b.bedroom, arr);
	}
	const sortedBedrooms = Array.from(byBedroom.keys()).sort((a, b) => a - b);
	return sortedBedrooms.map((n) => {
		const items = byBedroom.get(n)!;
		// Merge identical bed types within the same bedroom (rare, but the
		// flat API model could repeat them as separate rows).
		const merged = new Map<string, number>();
		for (const b of items) {
			merged.set(b.bedType, (merged.get(b.bedType) ?? 0) + (b.quantity ?? 1));
		}
		const bedSummary = Array.from(merged.entries())
			.map(([type, qty]) => `${qty} ${type}${qty > 1 ? "s" : ""}`)
			.join(" + ");
		const sleeps = items.reduce((sum, b) => sum + (b.sleeps ?? 0) * (b.quantity ?? 1), 0);
		return {
			label: `Bedroom ${n}`,
			bedSummary,
			sleeps,
		};
	});
}


export function propertyDetailToRental(p: PublicPropertyDetail): import("@/lib/rentals").Rental {
	const bedrooms = p.rooms?.bedrooms ?? 0;
	const bathrooms = p.rooms?.bathrooms ?? 0;
	const sleeps = totalSleeps(p.rooms?.beds_config ?? null, bedrooms);
	const sortedImages = (p.images ?? [])
		.slice()
		.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
	const hero = p.featuredImage || sortedImages[0]?.imageUrl || "";
	const gallery = sortedImages.map((img) => ({
		src: img.imageUrl,
		alt: img.caption || p.title,
	}));
	const location = [p.neighbourhoodDetails?.title, "Fire Island, NY"]
		.filter(Boolean)
		.join(" · ");
	const descriptionText = p.description ?? p.overview ?? "";
	const description = descriptionText
		? descriptionText.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)
		: undefined;
	const neighborhood = p.neighbourhoodDetails
		? {
				heading: `Neighborhood Highlight: ${p.neighbourhoodDetails.title}`,
				body: p.neighbourhoodDetails.description
					.split(/\n{2,}/)
					.map((s) => s.trim())
					.filter(Boolean),
			}
		: undefined;
	const agents = (p.agents ?? []).map((a) => ({
		name: a.name,
		photoUrl: a.profilePicture ?? undefined,
	}));
	const rules =
		p.houseRulesList || p.safetyItemsList || p.cancellationPolicy
			? {
					house: p.houseRulesList ?? [],
					safety: p.safetyItemsList ?? [],
					cancellation: p.cancellationPolicy ?? "",
				}
			: undefined;

	const rooms = beddingToRooms(p.rooms?.beds_config);
	const features = p.featuresList ?? [];

	// Build a pricing block when we have at least one tier. We don't have a
	// bookingPhone from this endpoint, so that field stays empty — the
	// PropertyOverview booking card hides the phone link when absent.
	const pricingTiers = (p.pricingAndAvailability ?? []).map((t) => {
		const n = Number(t.price);
		const value = Number.isFinite(n) ? `$${n.toLocaleString()} / ${t.period}` : t.label ?? "";
		return { label: t.label ?? t.period, value };
	});
	const pricing =
		pricingTiers.length > 0 || p.availabilityText
			? {
					availability: p.availabilityText ?? "",
					tiers: pricingTiers,
					fees: [],
					bookingPhone: "",
				}
			: undefined;

	return {
		slug: p.id,
		name: p.title,
		referenceCode: p.referenceCode ?? undefined,
		location,
		pricePerWeek: priceLabelFromTier(p),
		beds: bedrooms,
		baths: bathrooms,
		sleeps,
		heroImage: hero,
		heroAlt: p.title,
		gallery: gallery.length > 0 ? gallery : undefined,
		description,
		features: features.length > 0 ? features : undefined,
		rooms: rooms.length > 0 ? rooms : undefined,
		agents: agents.length > 0 ? agents : undefined,
		neighborhood,
		rules,
		pricing,
	};
}


// Fetches a single property by id. Returns null on 404/error so callers
// can fall through to other resolvers without try/catch noise.
export async function getPropertyDetails(id: string): Promise<PublicPropertyDetail | null> {
	try {
		const res = await fetch(`${PUBLIC_PROPERTY_DETAILS_URL}/${encodeURIComponent(id)}`, {
			next: { revalidate: 300 },
		});
		if (!res.ok) return null;
		const body = (await res.json()) as PublicPropertyDetail | { data: PublicPropertyDetail };
		// Some upstream endpoints wrap the payload in { data: ... } — handle both.
		return (body && typeof body === "object" && "data" in body
			? (body as { data: PublicPropertyDetail }).data
			: (body as PublicPropertyDetail));
	} catch {
		return null;
	}
}


/* ──────────────────────── sort ──────────────────────── */


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
