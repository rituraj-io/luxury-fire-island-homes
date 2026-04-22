// Sell landing page. Template shell for the /sell segment — sections will be
// added one by one as content is finalized.

import Nav from "@/components/sections/Nav";
import SellHero from "@/components/sections/SellHero";
import AreYouSure from "@/components/sections/AreYouSure";
import SellingRightWay from "@/components/sections/SellingRightWay";
import WhatToExpect from "@/components/sections/WhatToExpect";
import RentalInquiry from "@/components/sections/RentalInquiry";
import SellSideEffects from "@/components/sections/SellSideEffects";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function SellPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<SellHero />
				<AreYouSure />
				<SellingRightWay />
				<WhatToExpect />
				<RentalInquiry
					subline="Let’s get it sold- We’ll handle the chaos so you don’t have to. Just get ready to pop the champagne."
					postSubmit="P.S. The sooner you start, the sooner we get to work. Summer isn’t waiting— and neither are your buyers."
				/>
				<SellSideEffects />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
