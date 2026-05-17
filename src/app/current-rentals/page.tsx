// Current Rentals — the locked Rent-only search-results page. Same
// AdvancedRentalSearch component as /properties-on-sale, but its listingType
// is fixed to "Rent": the Sale/Rent toggle is hidden and "Clear all" can't
// escape the rentals scope. Marketing copy still lives on /rent.

import { Suspense } from "react";
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
				{/* Suspense satisfies Next 16's prerender requirement for
				    useSearchParams() inside the client search component. */}
				<Suspense fallback={null}>
					<AdvancedRentalSearch lockedListingType="Rent" />
				</Suspense>
				<NextLevelRenting />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
