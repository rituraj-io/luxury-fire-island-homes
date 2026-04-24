// Directory category page — dynamic route per category slug. Data-driven;
// swap `@/lib/directory` for a CMS fetch without touching this file.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import DirectoryHero from "@/components/sections/DirectoryHero";
import DirectoryListings from "@/components/sections/DirectoryListings";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getAllCategorySlugs, getCategoryBySlug } from "@/lib/directory";


type Params = { slug: string };


export function generateStaticParams(): Params[] {
	return getAllCategorySlugs().map((slug) => ({ slug }));
}


export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const category = getCategoryBySlug(slug);
	if (!category) return {};
	return {
		title: `${category.name} — Fire Island Directory`,
		description: `${category.blurb} ${category.listings.length} ${
			category.listings.length === 1 ? "listing" : "listings"
		} on Fire Island.`,
		alternates: { canonical: `/directory/${category.slug}` },
	};
}


export default async function DirectoryCategoryPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { slug } = await params;
	const category = getCategoryBySlug(slug);
	if (!category) notFound();

	return (
		<>
			<Nav />
			<main className="flex flex-col">
				<DirectoryHero
					breadcrumbs={[
						{ label: "Directory", href: "/directory" },
						{ label: category.name },
					]}
					title={category.name}
					tagline={category.blurb}
					size="md"
				/>
				<DirectoryListings listings={category.listings} />
				<CallBanner />
			</main>
			<Footer />
		</>
	);
}
