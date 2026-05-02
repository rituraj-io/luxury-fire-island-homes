// Homes For Sale — slim search-results page. Heading + filter row + 6-card
// grid + Load More. Marketing copy lives on /buy; this page is intentionally
// just the listings view.
//
// Listings come from CMS, preferring the dedicated buy endpoint when
// populated, falling back to the home featured array filtered to non-rent
// property types.

import Nav from "@/components/sections/Nav";
import CurrentBuy from "@/components/sections/CurrentBuy";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getHomeCms, getBuyCms, type FeaturedProperty } from "@/lib/cms";


export default async function HomesForSalePage() {
	const [home, buy] = await Promise.all([
		getHomeCms().catch(() => null),
		getBuyCms().catch(() => null),
	]);

	const buyFeatured = buy?.section1.featured ?? [];
	const homeFeatured = home?.sections.section2.featured ?? [];
	const items: FeaturedProperty[] =
		buyFeatured.length > 0
			? buyFeatured
			: homeFeatured.filter((p) => p.propertyType?.toLowerCase() !== "rent");

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<CurrentBuy items={items} />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
