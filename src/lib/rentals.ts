// Rental property data.
//
// NOTE — HARDCODED FOR DEMO. Will move to a backend/CMS fetch. The page
// template (`/rentals/[slug]`) is already data-driven; only this file changes
// when the CMS lands. New fields are optional so older entries still work.


export type RentalImage = {
	src: string;
	alt: string;
};


export type RentalRoom = {
	label: string;
	bedSummary: string;
	sleeps: number;
};


export type RentalAgent = {
	name: string;
	title: string;
};


export type RentalRules = {
	house: string[];
	safety: string[];
	cancellation: string;
};


export type RentalFee = { label: string; value: string };


export type RentalPricing = {
	availability: string;
	tiers: { label: string; value: string }[];
	fees: RentalFee[];
	bookingPhone: string;
};


export type RentalNeighborhood = {
	heading: string;
	body: string[];
};


export type Rental = {
	slug: string;
	name: string;
	referenceCode?: string;
	tagline?: string;
	location: string;
	pricePerWeek: string;
	beds: number;
	baths: number;
	sleeps: number;

	heroImage: string;
	heroAlt: string;

	gallery?: RentalImage[];
	description?: string[];
	features?: string[];
	rooms?: RentalRoom[];
	spaces?: string[];
	kitchenNote?: string;
	agents?: RentalAgent[];
	neighborhood?: RentalNeighborhood;
	rules?: RentalRules;
	pricing?: RentalPricing;
};


export const RENTALS: Rental[] = [
	{
		slug: "obp24s-ocean-bay-park-rental",
		name: "Luxury Beachfront Escape",
		referenceCode: "OBP24S",
		tagline: "With Pool, Bikes & Outdoor BBQ",
		location: "Ocean Bay Park, Fire Island, NY 11770",
		pricePerWeek: "$10,000/week",
		beds: 3,
		baths: 3,
		sleeps: 10,

		heroImage: "/assets/images/rentals/obp24s/2.jpg",
		heroAlt: "Beachfront home with pool and wraparound deck, Ocean Bay Park",

		gallery: [
			{ src: "/assets/images/rentals/obp24s/1.jpg", alt: "Front exterior with landscaped path" },
			{ src: "/assets/images/rentals/obp24s/10.jpg", alt: "Private pool and deck" },
			{ src: "/assets/images/rentals/obp24s/11.jpg", alt: "Outdoor BBQ and patio area" },
			{ src: "/assets/images/rentals/obp24s/21.jpg", alt: "Open living area" },
			{ src: "/assets/images/rentals/obp24s/25.jpg", alt: "Primary bedroom" },
			{ src: "/assets/images/rentals/obp24s/3.jpg", alt: "Property from the deck" },
			{ src: "/assets/images/rentals/obp24s/14.jpg", alt: "Outdoor lounge seating" },
			{ src: "/assets/images/rentals/obp24s/17.jpg", alt: "Kitchen and dining" },
			{ src: "/assets/images/rentals/obp24s/28.jpg", alt: "Second bedroom" },
			{ src: "/assets/images/rentals/obp24s/32.jpg", alt: "Bedroom three with king bed" },
			{ src: "/assets/images/rentals/obp24s/36.jpg", alt: "Loft with two singles" },
			{ src: "/assets/images/rentals/obp24s/40.jpg", alt: "Beach access from the property" },
		],

		description: [
			"Welcome to your new favorite Fire Island retreat - where mornings start with ocean breezes and end with barefoot sunsets. This beachfront beauty blends laid-back luxury with all the comforts of home. Inside, you'll find three sun-kissed bedrooms: Bedroom 1 with a queen bed (sleeps 2), Bedroom 2 with two queen beds plus a cozy loft with two singles (sleeps 6), and Bedroom 3 with a king bed (sleeps 2).",
			"Step outside and instantly slip into vacation mode. A private pool awaits for lazy dips, 3 complimentary bikes make island cruising a breeze, and the outdoor BBQ area is perfect for grilling, gathering, and sharing those “we should move here” moments.",
			"With direct beach access, effortless coastal charm, and space for up to 10 guests, this home brings whimsical, welcoming Fire Island living to life—no Hamptons fuss, all island magic.",
		],

		features: [
			"Outdoor Pool",
			"Beachfront",
			"3 adult bikes",
			"Outdoor BBQ Griller",
			"Outdoor Patio",
			"Beach Chairs",
		],

		rooms: [
			{ label: "Bedroom 1", bedSummary: "1 Queen Bed", sleeps: 2 },
			{ label: "Bedroom 2", bedSummary: "2 Queen Beds + Loft with 2 Single Beds", sleeps: 6 },
			{ label: "Bedroom 3", bedSummary: "1 King Bed", sleeps: 2 },
		],

		spaces: ["Kitchen", "Open Living Area", "Living Room"],
		kitchenNote: "The kitchen is equipped with all the essentials.",

		agents: [
			{ name: "Brett Brubaker", title: "Licensed Real Estate Salesperson" },
			{ name: "Jeffrey Clukey", title: "Licensed Real Estate Salesperson" },
		],

		neighborhood: {
			heading: "Neighborhood Highlight: Ocean Bay Park",
			body: [
				"Ocean Bay Park is a community in Brookhaven, a town in Suffolk County, New York. This lovely area is on Fire Island, a popular destination on Long Island. It is approximately 60 miles due east from New York City. Nestled between Seaview and Point O Woods, it's just a short walk (or bike ride) to Ocean Beach.",
				"To reach the hamlet of Ocean Bay Park, people take a ferry or water taxi from Bay Shore. The ferry ride takes about 30 minutes. The charming waterfront community has only 10 streets. Interestingly, five of the streets are named after the Great Lakes.",
				"It is only a walk or bike ride away from beautiful beaches. The Fire Island neighborhood is family-friendly, and there are many great things to do there. Bicycling and walking are the favored modes of transportation in Ocean Bay Park. Along with the other stores and shops, there is also a bike shop in town.",
			],
		},

		rules: {
			house: [
				"Check-in: Mondays after 3:00 PM",
				"Checkout: Sundays before 11:00 AM",
				"10 guests maximum",
				"6-night minimum",
			],
			safety: [
				"Carbon monoxide alarm",
				"Smoke alarm",
				"Must be at least 30 years old to book",
				"No parties or events",
				"No smoking",
				"No pets allowed",
			],
			cancellation: "No cancellations.",
		},

		pricing: {
			availability: "Available to rent weekly from June to August.",
			tiers: [
				{ label: "July / August", value: "$10,000/week" },
				{ label: "June / September", value: "$10,000/week" },
			],
			fees: [
				{ label: "Security Deposit", value: "$1,000" },
				{ label: "Cleaning", value: "$450" },
			],
			bookingPhone: "631-920-3104",
		},
	},
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
