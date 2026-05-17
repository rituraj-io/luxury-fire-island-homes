// Properties on Sale — the locked Sale-only search-results page. Same
// AdvancedRentalSearch component as /current-rentals, but its listingType is
// fixed to "Sale": the Sale/Rent toggle is hidden and "Clear all" can't
// escape the for-sale scope. Marketing copy still lives on /buy.
//
// The rental inquiry form (NextLevelRenting) is intentionally omitted here —
// it's rental-specific.

import { Suspense } from "react";
import Nav from "@/components/sections/Nav";
import AdvancedRentalSearch from "@/components/sections/AdvancedRentalSearch";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function PropertiesOnSalePage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				{/* Suspense satisfies Next 16's prerender requirement for
				    useSearchParams() inside the client search component. */}
				<Suspense fallback={null}>
					<AdvancedRentalSearch lockedListingType="Sale" />
				</Suspense>
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
