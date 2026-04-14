// Centralized site constants — consumed by metadata, sitemap, robots,
// and JSON-LD. Change the URL here (or via NEXT_PUBLIC_SITE_URL at build
// time) and every SEO surface updates together.

export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
	"https://luxuryfireislandhomes.com";


export const SITE = {
	name: "Luxury Fire Island Homes",
	shortName: "LFIH",
	tagline: "The sandier side of New York",
	description:
		"Luxury Fire Island Homes helps you buy, sell, and rent on Fire Island, NY. Expert local agents, vetted rentals, and 100+ five-star reviews across Ocean Beach, Ocean Bay Park, Seaview, Kismet, and Davis Park.",
	locale: "en_US",
	phone: "+1-631-570-8942",
	phoneDisplay: "631-570-8942",
	email: "hello@luxuryfireislandhomes.com",
	founded: "2001",
	address: {
		streetAddress: "1234 Street Avenue",
		addressLocality: "Ocean Bay Park",
		addressRegion: "NY",
		postalCode: "11770",
		addressCountry: "US",
	},
	geo: {
		latitude: 40.6496,
		longitude: -73.1427,
	},
	areaServed: [
		"Ocean Beach, NY",
		"Ocean Bay Park, NY",
		"Seaview, NY",
		"Kismet, NY",
		"Davis Park, NY",
		"Fire Island, NY",
	],
	sameAs: [
		"https://www.instagram.com/luxuryfireislandhomes",
		"https://www.facebook.com/luxuryfireislandhomes",
		"https://www.tiktok.com/@luxuryfireislandhomes",
		"https://www.linkedin.com/company/luxuryfireislandhomes",
		"https://www.youtube.com/@luxuryfireislandhomes",
	],
} as const;


export const OG_IMAGE = {
	url: "/og-image.webp",
	width: 1200,
	height: 630,
	alt: "Luxury Fire Island Homes — aerial view of a Fire Island beach with the homepage hero and help card overlay.",
} as const;
