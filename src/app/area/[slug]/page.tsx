// Area detail page — dynamic route per Fire Island community.
// Template is data-driven; swap the data source in `@/lib/areas` when the
// CMS is wired without touching this file.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import AreaHero from "@/components/sections/AreaHero";
import AreaAbout from "@/components/sections/AreaAbout";
import AreaFacts from "@/components/sections/AreaFacts";
import AreaBlock from "@/components/sections/AreaBlock";
import AreaQuote from "@/components/sections/AreaQuote";
import RentalInquiry from "@/components/sections/RentalInquiry";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getAllAreaSlugs, getAreaBySlug } from "@/lib/areas";


type Params = { slug: string };


export function generateStaticParams(): Params[] {
	return getAllAreaSlugs().map((slug) => ({ slug }));
}


export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const area = getAreaBySlug(slug);
	if (!area) return {};
	return {
		title: `${area.name}, Fire Island`,
		description: area.about.body[0] ?? `${area.name} on Fire Island.`,
		alternates: { canonical: `/area/${area.slug}` },
	};
}


export default async function AreaDetailPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { slug } = await params;
	const area = getAreaBySlug(slug);
	if (!area) notFound();

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<AreaHero area={area} />
				<AreaAbout area={area} />
				{area.facts && area.facts.length > 0 && <AreaFacts facts={area.facts} />}
				{area.blocks.map((block, i) => (
					<AreaBlock
						key={block.heading}
						block={block}
						background={i % 2 === 0 ? "cream" : "blue-gray"}
					/>
				))}
				{area.pullQuote && <AreaQuote quote={area.pullQuote} />}
				<RentalInquiry
					heading={`Interested in ${area.name}?`}
					subline={
						<>
							Tell us a little about what you&apos;re looking for
							<br />
							and we&apos;ll take it from there.
						</>
					}
				/>
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
