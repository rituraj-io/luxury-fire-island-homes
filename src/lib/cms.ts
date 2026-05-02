// Fetches CMS-managed content for the homepage from the admin API.
// ISR revalidation keeps content fresh without a request-per-render.


const HOME_CMS_URL =
	"https://vwk0bwmeh8.execute-api.eu-north-1.amazonaws.com/adminpanel/cms/pages/home";

const BUY_CMS_URL =
	"https://vwk0bwmeh8.execute-api.eu-north-1.amazonaws.com/adminpanel/cms/pages/buy";

const RENT_CMS_URL =
	"https://vwk0bwmeh8.execute-api.eu-north-1.amazonaws.com/adminpanel/cms/pages/rent";


export type StyledTitle = {
	styled: string;
	preStyle: string;
	postStyle: string;
};

export type FeaturedProperty = {
	id: string;
	title: string;
	areaSqFt: number;
	bedrooms: number;
	bathrooms: number;
	priceLabel: string;
	propertyType: string;
	thumbnailUrl: string;
	locationLabel: string;
};

export type CmsEvent = {
	id: string;
	endDate: string | null;
	imageUrl: string;
	location: string;
	startDate: string;
	eventTitle: string;
};

export type AccordionItem = {
	title: string;
	description: string;
};

export type HeroSection = {
	eyebrow: string;
	headline: string;
	imageUrl: string;
};

export type AboutSection = {
	title1: StyledTitle;
	title2: StyledTitle;
	answers: string[];
	imageUrl: string;
	question: string;
	description1: string;
	description2: string;
};

export type WhyWorkSection = {
	title: StyledTitle;
	image1Url: string;
	image2Url: string;
	description1: string;
	description2: string;
};

export type HomeCms = {
	version: number;
	textFormat: string;
	heroSection: HeroSection;
	sections: {
		section1: AboutSection;
		section2: { featured: FeaturedProperty[] };
		section3: WhyWorkSection;
		section4: { accordion: AccordionItem[] };
		section5: { orderedEvents: CmsEvent[] };
	};
};


export async function getHomeCms(): Promise<HomeCms> {
	const res = await fetch(HOME_CMS_URL, { next: { revalidate: 300 } });
	if (!res.ok) {
		throw new Error(`Home CMS fetch failed: ${res.status} ${res.statusText}`);
	}
	return (await res.json()) as HomeCms;
}


// Buy / Rent landing-page CMS. Both expose a `section1.featured` array of
// FeaturedProperty using the same shape as home.section2.featured.
export type BuySection2BlueBox = {
	text1: { title: string; description: string };
	text2: { title: string; description: string };
	image1Url: string;
	image2Url: string;
};

export type BuySection2 = {
	headline: string;
	introText: string;
	leftSection: BuySection2BlueBox;
	rightSection: BuySection2BlueBox;
};

export type BuySection3Card = {
	mainText: string;
	hoverText: string;
};

export type BuySection3 = {
	headline: string;
	bottomline: string;
	cards: BuySection3Card[];
};

export type BuySection4 = {
	headline: string;
	description: string;
	imageUrls: string[];
	bottomline: string;
};

export type BuySection7Card = {
	text: string;
	description: string;
	imageUrl: string;
};

export type BuySection7 = {
	headline: string;
	introText: string;
	note: string;
	cards: BuySection7Card[];
};

export type BuyCms = {
	version: number;
	textFormat: string;
	heroSection: HeroSection;
	section1: { featured: FeaturedProperty[] };
	section2?: BuySection2;
	section3?: BuySection3;
	section4?: BuySection4;
	section5?: Record<string, unknown>;
	section6?: Record<string, unknown>;
	section7?: BuySection7;
};

export type RentSection2 = {
	headline: string;
	videoUrl: string;
	introText: string;
};

export type RentSection3 = {
	text1: { title: string; description: string };
	text2: { title: string; description: string };
	image1Url: string;
	image2Url: string;
};

export type RentSection4 = {
	headline: string;
	introText: string;
	benefits: string[];
};

export type RentSection5 = {
	headline: string;
	description: string;
	bottomline: string;
};

export type RentCms = {
	version: number;
	textFormat: string;
	heroSection: HeroSection;
	section1: { featured: FeaturedProperty[] };
	section2?: RentSection2;
	section3?: RentSection3;
	section4?: RentSection4;
	section5?: RentSection5;
	section6?: Record<string, unknown>;
	section7?: Record<string, unknown>;
};


export async function getBuyCms(): Promise<BuyCms> {
	const res = await fetch(BUY_CMS_URL, { next: { revalidate: 300 } });
	if (!res.ok) throw new Error(`Buy CMS fetch failed: ${res.status} ${res.statusText}`);
	return (await res.json()) as BuyCms;
}


export async function getRentCms(): Promise<RentCms> {
	const res = await fetch(RENT_CMS_URL, { next: { revalidate: 300 } });
	if (!res.ok) throw new Error(`Rent CMS fetch failed: ${res.status} ${res.statusText}`);
	return (await res.json()) as RentCms;
}


// Looks up a featured property by id across home / buy / rent CMS pages.
// CMS-driven cards on the home carousel link to /rentals/{id} or /buy/{id}
// where `id` is this UUID, so the detail pages need to resolve it.
export async function findFeaturedById(id: string): Promise<FeaturedProperty | null> {
	const [home, buy, rent] = await Promise.all([
		getHomeCms(),
		getBuyCms().catch(() => null),
		getRentCms().catch(() => null),
	]);

	const pools: FeaturedProperty[][] = [
		home.sections.section2.featured,
		buy?.section1.featured ?? [],
		rent?.section1.featured ?? [],
	];

	for (const pool of pools) {
		const hit = pool.find((p) => p.id === id);
		if (hit) return hit;
	}
	return null;
}


// Splits a CMS plain-text blob (\n\n-separated) into paragraph strings.
export function paragraphs(text: string): string[] {
	return text
		.split(/\n\s*\n/)
		.map((s) => s.trim())
		.filter(Boolean);
}
