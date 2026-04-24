// Directory landing — shows the six curated Fire Island business categories
// as a tile grid. Each tile routes into `/directory/[slug]`.

import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import DirectoryHero from "@/components/sections/DirectoryHero";
import DirectoryCategoryGrid from "@/components/sections/DirectoryCategoryGrid";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { DIRECTORY_CATEGORIES } from "@/lib/directory";


export const metadata: Metadata = {
	title: "Fire Island Directory",
	description:
		"The places we send our guests to — ferries, B&Bs, ice cream, night clubs, and everything in between.",
	alternates: { canonical: "/directory" },
};


export default function DirectoryPage() {
	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<DirectoryHero
					eyebrow="Fire Island"
					title="The Directory"
					tagline="The places we send our guests to — ferries, B&Bs, ice cream, nights out, and everything in between."
				/>
				<DirectoryCategoryGrid categories={DIRECTORY_CATEGORIES} />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
