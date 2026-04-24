// Rental detail page — dynamic route per rental listing.
// Composition is data-driven; optional sections (neighborhood, details, full
// overview) auto-hide when the rental record doesn't carry that data.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import PropertyGallery from "@/components/sections/PropertyGallery";
import PropertyOverview from "@/components/sections/PropertyOverview";
import PropertyNeighborhood from "@/components/sections/PropertyNeighborhood";
import PropertyDetails from "@/components/sections/PropertyDetails";
import Properties from "@/components/sections/Properties";
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
				<PropertyGallery rental={rental} />
				<PropertyOverview rental={rental} />
				<PropertyNeighborhood rental={rental} />
				<PropertyDetails rental={rental} />
				<Properties
					background="bg-[#dbe2ec]"
					cta={{ label: "SEE ALL CURRENT RENTALS", href: "/rentals" }}
				/>
				<RentalReviews />
				<section id="inquiry">
					<RentalInquiry
						heading={`Ready to book ${rental.name}?`}
						subline={
							<>
								Tell us your dates and we&apos;ll lock it in.
								<br />
								{rental.referenceCode && (
									<>Mention #{rental.referenceCode} so we know exactly which home.</>
								)}
							</>
						}
					/>
				</section>
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
