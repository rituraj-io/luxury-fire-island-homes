// Buy landing page. Hero + featured grid + the buy-themed marketing sections
// (That's Where We Come In / Here's What You Get / Home Base / Side Effects)
// already exist as components — this page just composes them in order.
//
// Listings come from CMS, preferring the dedicated buy endpoint when populated,
// falling back to the home featured array (filtered to non-rent property
// types). Section copy in the marketing components is currently hardcoded but
// matches the buy CMS sections 2/3/4/7 — wiring those props through is the
// next step once the editorial copy is locked.

import Nav from "@/components/sections/Nav";
import BuyHero from "@/components/sections/BuyHero";
import Properties from "@/components/sections/Properties";
import WhereWeComeIn from "@/components/sections/WhereWeComeIn";
import WhatYouGet from "@/components/sections/WhatYouGet";
import HomeBase from "@/components/sections/HomeBase";
import RentalReviews from "@/components/sections/RentalReviews";
import RentalInquiry from "@/components/sections/RentalInquiry";
import SideEffects from "@/components/sections/SideEffects";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getHomeCms, getBuyCms, type FeaturedProperty } from "@/lib/cms";


export default async function BuyPage() {
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

	const hero = buy?.heroSection ?? home?.heroSection;

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				{hero ? <BuyHero hero={hero} /> : null}
				<Properties
					background="bg-[#dbe2ec]"
					featured={items}
					cta={{ label: "SEE ALL HOMES FOR SALE", href: "/homes-for-sale" }}
				/>
				<WhereWeComeIn data={buy?.section2} />
				<WhatYouGet data={buy?.section3} />
				<HomeBase data={buy?.section4} />
				<RentalReviews />
				<RentalInquiry subline="We’ll help you find the one that’s meant to be yours." />
				<SideEffects data={buy?.section7} />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
