// Rent landing page. Marketing-style layout: hero, "Don't Worry we've got
// you covered" featured-rentals carousel, the rent CMS marketing sections
// (welcome with video, difference with images, expect benefits, the truth
// closing block), then call-banner.
//
// Featured listings come from CMS, preferring the dedicated rent endpoint
// when populated, falling back to the home featured array filtered to rent
// properties. The full search-results page lives at /current-rentals; the
// "SEE ALL CURRENT RENTALS" CTA below the carousel links there.

import Nav from "@/components/sections/Nav";
import RentHero from "@/components/sections/RentHero";
import Properties from "@/components/sections/Properties";
import RentWelcome from "@/components/sections/RentWelcome";
import RentDifference from "@/components/sections/RentDifference";
import RentExpect from "@/components/sections/RentExpect";
import RentalReviews from "@/components/sections/RentalReviews";
import RentalInquiry from "@/components/sections/RentalInquiry";
import RentTruth from "@/components/sections/RentTruth";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getHomeCms, getRentCms, type FeaturedProperty } from "@/lib/cms";


export default async function RentPage() {
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

	const hero = rent?.heroSection ?? home?.heroSection;

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				{hero ? <RentHero hero={hero} /> : null}
				<Properties
					background="bg-[#dbe2ec]"
					featured={items}
					cta={{ label: "SEE ALL CURRENT RENTALS", href: "/current-rentals" }}
				/>
				<RentWelcome data={rent?.section2} />
				<RentDifference data={rent?.section3} />
				<RentExpect data={rent?.section4} />
				<RentTruth data={rent?.section5} />
				<RentalReviews />
				<RentalInquiry />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
