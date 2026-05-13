// Current Rentals — slim search-results page. Heading + filter row + 6-card
// grid + Load More. Marketing copy lives on /rent; this page is intentionally
// just the listings view.
//
// Listings come from CMS, preferring the dedicated rent endpoint when
// populated, falling back to the home featured array filtered to rent-type
// properties.

import Nav from "@/components/sections/Nav";
import AdvancedRentalSearch from "@/components/sections/AdvancedRentalSearch";
import NextLevelRenting from "@/components/sections/NextLevelRenting";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function CurrentRentalsPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<AdvancedRentalSearch />
				<NextLevelRenting />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
