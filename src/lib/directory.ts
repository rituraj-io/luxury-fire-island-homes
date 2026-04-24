// Fire Island business directory data.
//
// NOTE — HARDCODED FOR DEMO. Listings were scraped from the public
// fireisland.com business directory (the six categories the client asked to
// surface). Will be replaced by a backend/CMS fetch. The section components
// are already data-driven; only this file changes when the CMS lands.
//
// Phone numbers are normalized to `(xxx) xxx-xxxx` on ingest so every card
// renders consistently even though the source page is inconsistent.


export type DirectoryListing = {
	name: string;
	description?: string;
	phone?: string;
	website?: string;
	address?: string;
};


export type DirectoryCategory = {
	slug: string;
	name: string;
	blurb: string;
	image: string;
	imageAlt: string;
	listings: DirectoryListing[];
};


export const DIRECTORY_CATEGORIES: DirectoryCategory[] = [
	{
		slug: "beach-supplies",
		name: "Beach Supplies",
		blurb: "Everything you forgot to pack.",
		// TODO: swap for a category-specific photo once the CMS ships images.
		image: "/assets/images/bbq-umbrella.webp",
		imageAlt: "Beach supplies — umbrella and chairs on Fire Island",
		listings: [
			{
				name: "Kline's Ocean Beach",
				phone: "(631) 583-5333",
				website: "https://business.facebook.com/KlinesFINY/",
				address: "167 Bay Walk, Ocean Beach, Fire Island, NY 11770",
			},
			{
				name: "The Sand Pail",
				phone: "(631) 888-3322",
			},
		],
	},
	{
		slug: "bed-and-breakfast",
		name: "Bed & Breakfast",
		blurb: "Quiet rooms, warm kitchens.",
		image: "/assets/images/blue-door-house.webp",
		imageAlt: "Bed and breakfast — blue-door beach cottage",
		listings: [
			{
				name: "Clegg's Hotel Ocean Beach",
				phone: "(631) 583-9292",
				website: "https://www.cleggshotel.com",
				address: "478 Bayberry Walk, Ocean Beach, Fire Island",
			},
			{
				name: "Pines Bluff Overlook",
				phone: "(631) 597-3064",
				website: "https://www.pinesbluffoverlook.com/index.html",
				address: "362 Ocean Walk, Fire Island Pines, NY 11782",
			},
			{
				name: "Season's Bed & Breakfast",
				website: "https://fireisland.com/business-directory/",
			},
		],
	},
	{
		slug: "fire-island-ferries",
		name: "Fire Island Ferries",
		blurb: "The only way across the bay.",
		image: "/assets/images/docs-banner-image.webp",
		imageAlt: "Fire Island ferries — dock and marina",
		listings: [
			{
				name: "Davis Park Ferry",
				phone: "(631) 475-1665",
				website: "https://www.davisparkferry.com/",
				address: "80 Brightwood St, Patchogue, NY 11772",
			},
			{
				name: "Fire Island Ferries",
				phone: "(631) 665-3600",
				description: "Main Terminal. Freight: (631) 647-3055.",
				website: "https://www.fireislandferries.com/",
				address: "99 Maple Ave, Bay Shore, NY 11706",
			},
			{
				name: "Sayville Ferry Service",
				phone: "(631) 589-0810",
				website: "https://www.sayvilleferry.com",
				address: "41 River Rd, Sayville, NY 11782",
			},
		],
	},
	{
		slug: "ice-cream-and-sweets",
		name: "Ice Cream & Sweets",
		blurb: "Scoops, sprinkles, and a hundred barefoot walks home.",
		image: "/assets/images/fun-memories/fun-memory-4.webp",
		imageAlt: "Ice cream and sweets — beach treats on Fire Island",
		listings: [
			{
				name: "Beaches & Cream",
				website: "https://www.facebook.com/pages/BeachesCream/309912016334725",
				address: "479 Bayberry Walk, Ocean Beach, NY 11770",
			},
			{
				name: "Beach Street Pizza & Grille",
				phone: "(631) 583-8498",
				address: "57 Bay View Walk, Ocean Bay Park, NY 11770",
			},
			{
				name: "Ice Castle Sweet Shoppe",
				phone: "(631) 583-0225",
				website: "https://icecastlefireislan.wixsite.com/home",
				address: "621 Bay Walk, Ocean Beach, NY 11770",
			},
			{
				name: "Rachel's Restaurant & Bakery",
				phone: "(631) 583-9552",
				website: "https://www.rachelsfireisland.com/",
				address: "325 Bay Walk, Ocean Beach, NY 11770",
			},
			{
				name: "Scoops Ice Cream – Fire Island",
				phone: "(631) 583-5173",
				website: "https://www.facebook.com/ScoopsFireIsland/",
				address: "310 Bay Walk, Ocean Beach, NY 11770",
			},
			{
				name: "Sweet Licks",
				phone: "(631) 597-6464",
				website: "https://www.facebook.com/SweetLicksCherryGrove/",
				address: "180 Bayview Walk, Sayville, NY 11782",
			},
		],
	},
	{
		slug: "health-and-wellness",
		name: "Health & Wellness",
		blurb: "Care, therapy, and the stuff that keeps a beach summer going.",
		image: "/assets/images/cornfield-farmhouse.webp",
		imageAlt: "Health and wellness on Fire Island",
		listings: [
			{
				name: "Brookhaven Memorial Hospital Medical Center (BMHMC)",
				phone: "(631) 654-7100",
				website: "https://www.brookhavenhospital.org",
				address: "101 Hospital Road, East Patchogue, NY 11772",
			},
			{
				name: "Davis Park Medical Association",
				phone: "(631) 597-6141",
				website: "https://www.davispark.org/dpma.html",
				address: "7 Dune Walk, Davis Park, NY 11772",
			},
			{
				name: "Earthtone Therapies",
				phone: "(631) 589-6680",
				website: "https://www.earthtonetherapies.com",
				address: "113 Railroad Ave, Sayville, NY 11782",
			},
			{
				name: "Fair Harbor Dunewood Medical",
				phone: "(631) 583-5145",
				address: "Pine Walk, Fair Harbor, NY 11706",
			},
			{
				name: "Fire Island Massage Therapy",
				phone: "(631) 589-6680",
				website: "https://fireislandmassagetherapy.com",
			},
			{
				name: "Fire Island Physical Therapy",
				phone: "(631) 300-8787",
				website: "https://fireislandphysicaltherapy.com/",
				address: "Ocean Beach, NY",
			},
			{
				name: "Good Samaritan Hospital Medical Center",
				phone: "(631) 376-4444",
				website: "https://www.goodsamaritan.chsli.org",
				address: "1000 Montauk Highway, West Islip, NY 11795",
			},
			{
				name: "Massage On Fire Island",
				phone: "(631) 583-8920",
				address: "55 Cedar Walk, Fair Harbor, Fire Island, NY 11706",
				description: "By appointment only.",
			},
		],
	},
	{
		slug: "night-clubs",
		name: "Night Clubs",
		blurb: "The late-night side of the island.",
		image: "/assets/images/hero-image.webp",
		imageAlt: "Fire Island night clubs and bars",
		listings: [
			{
				name: "Fire Island Pines Pavilion",
				phone: "(631) 597-3599",
				website: "https://pinesfi.com/pavilion/",
				address: "Fire Island",
			},
			{
				name: "Flynn's Marina & Restaurant",
				phone: "(631) 583-5000",
				website: "https://www.flynnsfireislandny.com/",
				address: "1 Cayuga St, Ocean Bay Park",
			},
			{
				name: "Sip N Twirl",
				phone: "(631) 597-6500",
				website: "https://pinesfi.com/sipntwirl/",
				address: "36 Fire Island Boulevard, Fire Island Pines, NY 11782",
			},
			{
				name: "The Grove Hotel and Ice Palace Nightclub",
				phone: "(631) 597-6600",
				website: "https://www.grovehotel.com",
				address: "1 Main Walk, Cherry Grove, NY 11782",
			},
		],
	},
];


export function getCategoryBySlug(slug: string): DirectoryCategory | undefined {
	return DIRECTORY_CATEGORIES.find((c) => c.slug === slug);
}


export function getAllCategorySlugs(): string[] {
	return DIRECTORY_CATEGORIES.map((c) => c.slug);
}
