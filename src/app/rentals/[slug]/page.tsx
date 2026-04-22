// Rental detail page. Dynamic route — slug resolves to a Rental record.
// Content is hardcoded via src/lib/rentals.ts for now; sections are built
// out one by one on top of this shell.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import RentalHero from "@/components/sections/RentalHero";
import Properties from "@/components/sections/Properties";
import WelcomeVideo from "@/components/sections/WelcomeVideo";
import RentalDifference from "@/components/sections/RentalDifference";
import RentalExpectations from "@/components/sections/RentalExpectations";
import RentalTruth from "@/components/sections/RentalTruth";
import RentalReviews from "@/components/sections/RentalReviews";
import RentalInquiry from "@/components/sections/RentalInquiry";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getAllRentalSlugs, getRentalBySlug } from "@/lib/rentals";


type Params = { slug: string };


export function generateStaticParams(): Params[] {
	return getAllRentalSlugs().map((slug) => ({ slug }));
}


export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const rental = getRentalBySlug(slug);
	if (!rental) return {};
	return {
		title: rental.name,
		description: `${rental.name} — ${rental.location}. ${rental.beds} beds · ${rental.baths} baths · sleeps ${rental.sleeps}.`,
		alternates: { canonical: `/rentals/${rental.slug}` },
	};
}


export default async function RentalPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { slug } = await params;
	const rental = getRentalBySlug(slug);
	if (!rental) notFound();

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<RentalHero rental={rental} />
				<Properties
					background="bg-[#dbe2ec]"
					cta={{ label: "SEE ALL CURRENT RENTALS", href: "/rentals" }}
				/>
				<WelcomeVideo />
				<RentalDifference />
				<RentalExpectations />
				<RentalTruth />
				<RentalReviews />
				<RentalInquiry />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
