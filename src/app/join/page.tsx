// Join Our Team landing — careers pitch for agents considering Luxury Fire
// Island Homes. Reuses the site's editorial + tab vocabularies so it feels
// like part of the same brand, not a bolted-on careers microsite.

import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import JoinHero from "@/components/sections/JoinHero";
import JoinBrokerage from "@/components/sections/JoinBrokerage";
import JoinAntiList from "@/components/sections/JoinAntiList";
import JoinPillars from "@/components/sections/JoinPillars";
import JoinFit from "@/components/sections/JoinFit";
import RentalReviews from "@/components/sections/RentalReviews";
import RentalInquiry from "@/components/sections/RentalInquiry";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export const metadata: Metadata = {
	title: "Join Our Team",
	description:
		"Why join the Luxury Fire Island Homes team — hyper-local, relationship-driven, and built for the way Fire Island actually works.",
	alternates: { canonical: "/join" },
};


export default function JoinPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<JoinHero />
				<JoinBrokerage />
				<JoinAntiList />
				<JoinPillars />
				<JoinFit />
				<RentalReviews
					heading={
						<>
							Join the highest rated{" "}
							<span className="ml-1 inline-block font-script text-[44px] font-normal normal-case leading-none tracking-normal md:text-[52px]">
								brokerage
							</span>{" "}
							on the island
						</>
					}
				/>
				<section id="lets-chat">
					<RentalInquiry
						heading="Let's Chat"
						subline={
							<>
								No pressure, no sales pitch—just a real conversation
								<br />
								to see if it&apos;s a fit.
							</>
						}
					/>
				</section>
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
