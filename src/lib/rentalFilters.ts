// Filter taxonomy + helpers for the /current-rentals advanced search.
//
// Filter labels and groupings mirror the LFIH admin panel's Advanced Search
// 1:1 (see project memory). Feature-group keys are stored verbatim so a UI
// selection round-trips cleanly into the backend payload when wiring lands.
//
// Where backend data is currently thin (e.g. cadence, fine-grained features),
// the matching filter still surfaces in the UI but no-ops at filter time —
// the page intentionally over-filters in the UI so the structure is visible
// to the client now, not after the backend ships those fields.


import type { FeaturedProperty } from "@/lib/cms";


export const LISTING_TYPES = ["Sale", "Rent"] as const;
export type ListingType = (typeof LISTING_TYPES)[number];

export const CADENCES = ["Nightly", "Weekly", "Monthly", "Seasonally"] as const;
export type Cadence = (typeof CADENCES)[number];

export const FAMILY_APARTMENT = ["Single Family", "Apartment"] as const;
export const PRIVATE_SHARED = ["Private Home", "Shared"] as const;

// Sourced from the AreaLocations data. Used to surface a neighborhood
// dropdown until the admin panel's City list catches up to all of Fire
// Island's neighborhoods.
export const NEIGHBORHOODS = [
	"Atlantique",
	"Cherry Grove",
	"Davis Park",
	"Dunewood",
	"Fair Harbor",
	"Fire Island Pines",
	"Kismet",
	"Lonelyville",
	"Ocean Bay Park",
	"Ocean Beach",
	"Point O' Woods",
	"Robbins Rest",
	"Saltaire",
	"Seaview",
	"Summer Club",
] as const;


export type FeatureGroup = {
	label: string;
	options: readonly string[];
};

export const FEATURE_GROUPS: readonly FeatureGroup[] = [
	{
		label: "Additional Features",
		options: [
			"Pet Friendly",
			"Dishwasher",
			"Fireplace",
			"Skylights",
			"Washer/Dryer",
			"WiFi",
		],
	},
	{
		label: "Air Conditioning",
		options: ["Central AC", "Ceiling Fans", "Wall/Window units", "Ductless Split Units"],
	},
	{
		label: "Home Amenities",
		options: [
			"Adult Bikes",
			"Child Bikes",
			"BBQ table",
			"Hot Tub",
			"Outdoor Pool",
			"Outdoor Shower",
			"Coffee Machine",
		],
	},
	{
		label: "Location Amenities",
		options: [
			"Bay View",
			"Bayfront",
			"Beach Block",
			"Beach views",
			"Beachfront",
			"Ocean View",
			"Rooftop",
		],
	},
	{
		label: "Outdoor Features",
		options: [
			"Beach Chairs",
			"Outdoor BBQ Griller",
			"Outdoor Patio",
			"Outdoor Pool",
			"Private Dock",
		],
	},
];


export type Range = { min?: number; max?: number };

export type Filters = {
	keyword: string;
	listingType: "" | ListingType;
	city: string;
	exclusiveListing: "" | "yes" | "no";
	familyApartment: "" | (typeof FAMILY_APARTMENT)[number];
	privateShared: "" | (typeof PRIVATE_SHARED)[number];
	cadence: Cadence[];
	bedrooms: Range;
	bathrooms: Range;
	sleeps: Range;
	price: Range;
	// Flat list — keys join groups using the option string verbatim. Same
	// string can appear in multiple groups (e.g. "Outdoor Pool"); we treat the
	// flat list as an OR-able multi-select.
	features: string[];
};


export const EMPTY_FILTERS: Filters = {
	keyword: "",
	listingType: "",
	city: "",
	exclusiveListing: "",
	familyApartment: "",
	privateShared: "",
	cadence: [],
	bedrooms: {},
	bathrooms: {},
	sleeps: {},
	price: {},
	features: [],
};


// Extract a numeric dollar amount from labels like "$10,000/week",
// "$2,700,000", "$8,500 / wk". Returns null if no number found.
export function parsePrice(label: string): number | null {
	const cleaned = label.replace(/[^0-9.]/g, " ").trim();
	const first = cleaned.split(/\s+/)[0];
	if (!first) return null;
	const n = Number(first);
	return Number.isFinite(n) ? n : null;
}


export type SortKey = "default" | "price-asc" | "price-desc" | "beds-desc";


// Apply the current filter set to a list of properties. Filters that are
// "empty" (default values) are skipped. Unsupported filters (data lacks the
// field) silently no-op rather than zeroing the result set.
export function applyFilters(items: FeaturedProperty[], f: Filters): FeaturedProperty[] {
	const kw = f.keyword.trim().toLowerCase();
	return items.filter((p) => {
		if (kw) {
			const hay = `${p.title} ${p.locationLabel}`.toLowerCase();
			if (!hay.includes(kw)) return false;
		}
		if (f.listingType) {
			if ((p.propertyType ?? "").toLowerCase() !== f.listingType.toLowerCase()) return false;
		}
		if (f.city) {
			if (!p.locationLabel?.toLowerCase().includes(f.city.toLowerCase())) return false;
		}
		if (f.bedrooms.min != null && p.bedrooms < f.bedrooms.min) return false;
		if (f.bedrooms.max != null && p.bedrooms > f.bedrooms.max) return false;
		if (f.bathrooms.min != null && p.bathrooms < f.bathrooms.min) return false;
		if (f.bathrooms.max != null && p.bathrooms > f.bathrooms.max) return false;
		if (f.price.min != null || f.price.max != null) {
			const price = parsePrice(p.priceLabel);
			if (price != null) {
				if (f.price.min != null && price < f.price.min) return false;
				if (f.price.max != null && price > f.price.max) return false;
			}
		}
		return true;
	});
}


export function applySort(items: FeaturedProperty[], key: SortKey): FeaturedProperty[] {
	if (key === "default") return items;
	const sorted = [...items];
	switch (key) {
		case "price-asc":
			sorted.sort((a, b) => (parsePrice(a.priceLabel) ?? Infinity) - (parsePrice(b.priceLabel) ?? Infinity));
			break;
		case "price-desc":
			sorted.sort((a, b) => (parsePrice(b.priceLabel) ?? -Infinity) - (parsePrice(a.priceLabel) ?? -Infinity));
			break;
		case "beds-desc":
			sorted.sort((a, b) => b.bedrooms - a.bedrooms);
			break;
	}
	return sorted;
}


// Counts the number of filters the user has touched (non-default values).
// Drives the "X" badge on the Filters button.
export function countActive(f: Filters): number {
	let n = 0;
	if (f.keyword) n++;
	if (f.listingType) n++;
	if (f.city) n++;
	if (f.exclusiveListing) n++;
	if (f.familyApartment) n++;
	if (f.privateShared) n++;
	if (f.cadence.length) n++;
	if (f.bedrooms.min != null || f.bedrooms.max != null) n++;
	if (f.bathrooms.min != null || f.bathrooms.max != null) n++;
	if (f.sleeps.min != null || f.sleeps.max != null) n++;
	if (f.price.min != null || f.price.max != null) n++;
	if (f.features.length) n++;
	return n;
}
