// Property Listing — universal search-results page (replaces the older
// /current-rentals route). Supports a `?for=rent` or `?for=sale` query param
// to pre-select the matching listingType filter when the user lands here
// from a marketing CTA. Without `?for=`, the page shows everything.
//
// Marketing copy continues to live on /rent and /buy; this page is
// intentionally just the listings view.

import { Suspense } from "react";
import Nav from "@/components/sections/Nav";
import AdvancedRentalSearch from "@/components/sections/AdvancedRentalSearch";
import NextLevelRenting from "@/components/sections/NextLevelRenting";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function PropertyListingPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				{/* Suspense satisfies Next 16's prerender requirement for
				    useSearchParams() inside the client search component. */}
				<Suspense fallback={null}>
					<AdvancedRentalSearch />
				</Suspense>
				<NextLevelRenting />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
