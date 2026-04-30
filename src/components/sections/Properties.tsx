"use client";


// Properties — "Don't Worry we've got you covered" carousel band.
// Defers all carousel logic to PropertyCarousel; this file owns the
// section band (background + heading) and the seed data.

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import PropertyCarousel, { type PropertyCard } from "@/components/ui/PropertyCarousel";
import type { FeaturedProperty } from "@/lib/cms";


const PROPERTIES: PropertyCard[] = [
	{
		image: "/assets/images/placeholder.svg",
		price: "$2,700,000",
		title: "39 Sloop Walk",
		location: "Summer Club, NY",
		stats: [
			{ label: "BEDS", value: "4" },
			{ label: "BATHS", value: "3" },
			{ label: "SQFT", value: "2,500" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$1,400,000",
		title: "37 Duneway Avenue",
		location: "Seaview, NY",
		stats: [
			{ label: "BEDS", value: "5" },
			{ label: "BATHS", value: "3.5" },
			{ label: "SQFT", value: "1,951" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$10,000/week",
		title: "OBP24S",
		location: "Ocean Bay Park, Fire Island, NY",
		stats: [
			{ label: "BEDS", value: "3" },
			{ label: "BATHS", value: "3" },
			{ label: "SLEEPS", value: "10" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$3,250,000",
		title: "12 Bay Walk",
		location: "Ocean Beach, NY",
		stats: [
			{ label: "BEDS", value: "4" },
			{ label: "BATHS", value: "2.5" },
			{ label: "SQFT", value: "2,100" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$8,500/week",
		title: "SEA12F",
		location: "Seaview, Fire Island, NY",
		stats: [
			{ label: "BEDS", value: "3" },
			{ label: "BATHS", value: "2" },
			{ label: "SLEEPS", value: "8" },
		],
	},
];


type Props = {
	// Tailwind background utility for the section band. Defaults to the
	// homepage yellow; other pages can slot a different band color.
	background?: string;
	// Optional CTA rendered under the carousel (shown on the rental page,
	// omitted on the homepage).
	cta?: { label: string; href: string };
	// CMS-managed featured properties. When omitted, falls back to PROPERTIES
	// so non-homepage callers (rentals/buy slug pages) keep working.
	featured?: FeaturedProperty[];
};


function mapFeatured(items: FeaturedProperty[]): PropertyCard[] {
	return items.map((p) => ({
		image: p.thumbnailUrl,
		price: p.priceLabel,
		title: p.title,
		location: p.locationLabel,
		stats: [
			{ label: "BEDS", value: String(p.bedrooms) },
			{ label: "BATHS", value: String(p.bathrooms) },
			{ label: "SQFT", value: p.areaSqFt.toLocaleString() },
		],
		href: p.propertyType === "Rent" ? `/rentals/${p.id}` : `/buy/${p.id}`,
	}));
}


export default function Properties({
	background = "bg-brand-yellow",
	cta,
	featured,
}: Props = {}) {
	const items = featured && featured.length > 0 ? mapFeatured(featured) : PROPERTIES;

	return (
		<section className={`w-full ${background} py-16 md:py-20`}>
			<div className="mx-auto w-full max-w-site px-4 md:px-8">
				<Reveal as="h2" className="text-center font-sans text-xl font-medium uppercase tracking-wider text-brand-blue md:text-2xl">
					<span className="mr-2 inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
						Don&apos;t Worry
					</span>
					we&apos;ve got you covered
				</Reveal>
			</div>

			<Reveal y={0} duration={0.8} delay={0.05} className="mt-10">
				<PropertyCarousel items={items} />
			</Reveal>

			{cta ? (
				<Reveal y={0} duration={0.7} delay={0.1} className="mt-10 flex w-full justify-center px-4 md:px-8">
					<Link
						href={cta.href}
						className="bg-brand-orange px-8 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-95"
					>
						{cta.label}
					</Link>
				</Reveal>
			) : null}
		</section>
	);
}
