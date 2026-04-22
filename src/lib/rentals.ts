// Rental property data. Hardcoded for now; will move to a backend fetch later.
// Keyed by URL slug (human-readable).


export type Rental = {
	slug: string;
	name: string;
	location: string;
	pricePerWeek: string;
	beds: number;
	baths: number;
	sleeps: number;
	heroImage: string;
	heroAlt: string;
};


export const RENTALS: Rental[] = [
	{
		slug: "ocean-bay-park-bayfront-retreat",
		name: "Ocean Bay Park Bayfront Retreat",
		location: "Ocean Bay Park, Fire Island, NY",
		pricePerWeek: "$10,000/week",
		beds: 3,
		baths: 3,
		sleeps: 10,
		heroImage: "/assets/images/rental-ocean-bay-park-bayfront-retreat.jpg",
		heroAlt: "Cedar-shingle beach cottage with wraparound deck and lush garden entry",
	},
];


export function getRentalBySlug(slug: string): Rental | undefined {
	return RENTALS.find((r) => r.slug === slug);
}


export function getAllRentalSlugs(): string[] {
	return RENTALS.map((r) => r.slug);
}
