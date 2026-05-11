// Events page — full listing of Fire Island community events. Pulls from the
// same CMS endpoint as the homepage carousel and renders the full set as a
// responsive grid.

import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import EventsAll from "@/components/sections/EventsAll";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getHomeCms } from "@/lib/cms";


export const metadata: Metadata = {
	title: "Community Events",
	description:
		"Upcoming Fire Island community events — markets, parties, fundraisers, and everything in between.",
	alternates: { canonical: "/events" },
};


export default async function EventsPage() {
	const home = await getHomeCms().catch(() => null);
	const events = home?.sections.section5.orderedEvents ?? [];

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<EventsAll events={events} />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
