// Area landing page. Shell route; sections will be added as screenshots
// are provided.

import Nav from "@/components/sections/Nav";
import Area from "@/components/sections/Area";
import AreaLocations from "@/components/sections/AreaLocations";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function AreaPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<Area />
				<AreaLocations />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
