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
import { getAllRentalSlugs, getRentalBySlug, type Rental } from "@/lib/rentals";
import { findFeaturedById, getHomeCms, type FeaturedProperty } from "@/lib/cms";


type Params = { slug: string };


// Build a minimal Rental shape from a CMS featured-property record. The
// detail template's optional sections (rooms, neighborhood, pricing tiers,
// rules) hide themselves when the data isn't present.
function rentalFromFeatured(p: FeaturedProperty): Rental {
	return {
		slug: p.id,
		name: p.title,
		location: p.locationLabel,
		pricePerWeek: p.priceLabel,
		beds: p.bedrooms,
		baths: p.bathrooms,
		sleeps: p.bedrooms * 2,
		heroImage: p.thumbnailUrl,
		heroAlt: p.title,
		gallery: [{ src: p.thumbnailUrl, alt: p.title }],
	};
}


// Resolves a slug to a Rental: local data first, then CMS featured arrays.
async function resolveRental(slug: string): Promise<Rental | null> {
	const local = getRentalBySlug(slug);
	if (local) return local;

	const featured = await findFeaturedById(slug);
	return featured ? rentalFromFeatured(featured) : null;
}


export function generateStaticParams(): Params[] {
	return getAllRentalSlugs().map((slug) => ({ slug }));
}


export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const rental = await resolveRental(slug);
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
	const [rental, home] = await Promise.all([
		resolveRental(slug),
		getHomeCms().catch(() => null),
	]);
	if (!rental) notFound();

	// Surface other CMS-featured rentals on the carousel; filter the current
	// listing out so the user doesn't see the page they're already on.
	const featured = home?.sections.section2.featured.filter((p) => p.id !== slug);

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
					featured={featured}
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
