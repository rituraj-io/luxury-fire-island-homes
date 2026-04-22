// Current Rentals landing page. Shell route; sections will be added as
// screenshots are provided.

import Nav from "@/components/sections/Nav";
import CurrentRentals from "@/components/sections/CurrentRentals";
import NextLevelRenting from "@/components/sections/NextLevelRenting";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function CurrentRentalsPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<CurrentRentals />
				<NextLevelRenting />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
