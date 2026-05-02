// Current Rentals — slim search-results page. Heading + filter row + 6-card
// grid + Load More. Marketing copy lives on /rent; this page is intentionally
// just the listings view.
//
// Listings come from CMS, preferring the dedicated rent endpoint when
// populated, falling back to the home featured array filtered to rent-type
// properties.

import Nav from "@/components/sections/Nav";
import CurrentRentals from "@/components/sections/CurrentRentals";
import NextLevelRenting from "@/components/sections/NextLevelRenting";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getHomeCms, getRentCms, type FeaturedProperty } from "@/lib/cms";


export default async function CurrentRentalsPage() {
	const [home, rent] = await Promise.all([
		getHomeCms().catch(() => null),
		getRentCms().catch(() => null),
	]);

	const rentFeatured = rent?.section1.featured ?? [];
	const homeFeatured = home?.sections.section2.featured ?? [];
	const items: FeaturedProperty[] =
		rentFeatured.length > 0
			? rentFeatured
			: homeFeatured.filter((p) => p.propertyType?.toLowerCase() === "rent");

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<CurrentRentals items={items} />
				<NextLevelRenting />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
