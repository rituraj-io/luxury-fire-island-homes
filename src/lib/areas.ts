// Fire Island area (community) detail data.
//
// NOTE — HARDCODED FOR DEMO. These records will be backed by a CMS once the
// backend is wired. The template (`/area/[slug]`) and section components are
// already data-driven; only this file needs to swap from a hardcoded array to
// a fetch call when the CMS lands.
//
// Content for Atlantique is sourced verbatim from
// https://luxuryfireislandhomes.com/atlantique/ — the editorial "About",
// "Park & Marina", and "Additional Services" blocks plus the closing
// "seafaring charm" pull quote.


export type AreaBlock = {
	heading: string;
	body: string[];
};


export type AreaFact = {
	value: string;
	label: string;
};


export type Area = {
	slug: string;
	name: string;
	eyebrow: string;
	tagline: string;
	heroImage: string;
	heroAlt: string;

	about: {
		heading: string;
		body: string[];
	};

	facts?: AreaFact[];
	blocks: AreaBlock[];
	pullQuote?: string;

	homesForSaleHref: string;
	homesToRentHref: string;
};


export const AREAS: Area[] = [
	{
		slug: "atlantique",
		name: "Atlantique",
		eyebrow: "Welcome to",
		tagline: "Quiet, seafaring, tucked away—a hidden gem on Fire Island.",
		// TODO: swap for an Atlantique-specific photo once the CMS supplies one.
		heroImage: "/assets/images/property-hero.jpg",
		heroAlt: "Atlantique, Fire Island — dune-lined walkways and secluded beachfront homes",

		about: {
			heading: "About Atlantique, Fire Island",
			body: [
				"Atlantique, founded in 1912, is centered around dune-lined walkways. The 13-acre rustic town, comprised of approximately 50 of some of the most secluded beachfront properties in Long Island and a 150-slip marina, is a community bonded by the common interests of boating and fishing.",
				"This hidden gem was once just a tiny strip of land called Sea Fire Beach, discovered by Carlton Brewster and Dr. George King. Sea-Fire Beach, acquired by the Town of Islip, was renamed Atlantique Beach and deemed a public recreational area facility.",
			],
		},

		facts: [
			{ value: "1912", label: "Founded" },
			{ value: "13", label: "Acres" },
			{ value: "~50", label: "Beachfront Homes" },
			{ value: "150", label: "Marina Slips" },
		],

		blocks: [
			{
				heading: "The Park And Marina",
				body: [
					"The marina offers electrical connections and freshwater hookups, a pumping station, 24-hour restrooms and hot showers, a children's playground, barbecue areas, handball courts, and basketball courts. In addition, the Session Stand marina snack shack serves as a restaurant, mini-mart, and a social gathering area for indoor dining, tap beer, and a wide variety of background music. The marina also features access to a lifeguard-protected bay area, ocean beaches, and dune walkways. However, you have to attain a sitter for Fido because pets are not allowed in township-owned facilities.",
					"Marina docking rates are incredibly reasonable for Islip Town residents but a little higher for non-residents. The marina, a 60-year operation by the town, in March 2021 awarded a contract to Strong's Marine of Mattituck and Al Grovers High and Dry Marina of Freeport. Slip availability is on a first-come, first-served basis and totally at the digression of the dockmaster. Boats also have the option to anchor out on either side of the marina if weather permissible. The Atlantique Marina dockmaster's office monitors VHF Channel 9. Help for boaters is also available by telephone 24 hours a day, seven days a week.",
				],
			},
			{
				heading: "Additional Services",
				body: [
					"Additional services and amenities are available via the western and eastern neighbors of Fair Harbor or Ocean Beach, reachable by foot via the shore or by the unpaved Burma Road. This beautiful little town has a general store, pizza shop, ice cream stand, liquor store, and restaurant.",
					"Ferry access on the Dunewood Atlantique line, out of Bay Shore, is strictly limited to a few boats per day. So those staying in Atlantique without private boat access often use the Ocean Beach or Fair Harbor lines as an alternative means around the area.",
				],
			},
		],

		pullQuote:
			"The quiet, seafaring charm of Atlantique makes it a worthwhile trip if you're searching for a place to get away from the hustle and bustle of the 21st century.",

		homesForSaleHref: "/buy?area=atlantique",
		homesToRentHref: "/current-rentals?area=atlantique",
	},
];


export function getAreaBySlug(slug: string): Area | undefined {
	return AREAS.find((a) => a.slug === slug);
}


export function getAllAreaSlugs(): string[] {
	return AREAS.map((a) => a.slug);
}
