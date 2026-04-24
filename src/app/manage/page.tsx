// Manage landing page — property management pitch for homeowners who want
// their Fire Island home rented without running the show themselves.
// Sections alternate cream → blue-gray → yellow → cream to preserve the
// site's band rhythm. Closes with the reused RentalInquiry form configured
// with manage-specific copy.

import Nav from "@/components/sections/Nav";
import ManageHero from "@/components/sections/ManageHero";
import NotYourHouse from "@/components/sections/NotYourHouse";
import SoonerQuote from "@/components/sections/SoonerQuote";
import HowWeKeepBooked from "@/components/sections/HowWeKeepBooked";
import FlexibilityOptions from "@/components/sections/FlexibilityOptions";
import RentalInquiry from "@/components/sections/RentalInquiry";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function ManagePage() {
	return (
		<>
			<Nav />
			<main id="inquiry-top" className="flex flex-col">
				<ManageHero />
				<NotYourHouse />
				<SoonerQuote />
				<HowWeKeepBooked />
				<FlexibilityOptions />
				<section id="inquiry">
					<RentalInquiry
						heading="Let's Make Your Home Work for You Again"
						subline={
							<>
								Tell us a little about your property,
								<br />
								and we&apos;ll show you what&apos;s possible.
							</>
						}
						postSubmit="Whether you want to rent full-time or just a few weeks a year—we've got you covered."
					/>
				</section>
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
