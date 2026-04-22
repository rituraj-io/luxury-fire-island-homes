// Press landing page — blog listing. Shell route; sections will be added
// one by one as screenshots are provided.

import Nav from "@/components/sections/Nav";
import InThePress from "@/components/sections/InThePress";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";


export default function PressPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<InThePress />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
