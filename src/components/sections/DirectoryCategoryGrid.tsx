"use client";


// DirectoryCategoryGrid — cream band on /directory. A two-dropdown search bar
// (neighborhood + category) sits above six tile cards in a 3×2 grid (2 cols
// on tablet, 1 on mobile). Each tile is a tilted white-bordered photo —
// reusing the site's collage vocabulary — with a yellow overlay band carrying
// the category name. Filters are instant: picking a category narrows the grid
// to that tile; picking a neighborhood hides categories with no listings in it.

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { DirectoryCategory } from "@/lib/directory";


type Props = {
	categories: DirectoryCategory[];
};


// Subtle alternating tilts so the grid feels like a pinned-photo wall.
const TILTS = ["-rotate-[2deg]", "rotate-[1deg]", "-rotate-[1deg]", "rotate-[2deg]", "-rotate-[1deg]", "rotate-[1deg]"];


// Known Fire Island neighborhoods. Used to extract neighborhood options from
// the free-text addresses on each listing without building a brittle parser.
const KNOWN_NEIGHBORHOODS = [
	"Atlantique",
	"Cherry Grove",
	"Davis Park",
	"Dunewood",
	"Fair Harbor",
	"Fire Island Pines",
	"Kismet",
	"Lonelyville",
	"Ocean Bay Park",
	"Ocean Beach",
	"Point O' Woods",
	"Robbins Rest",
	"Saltaire",
	"Seaview",
	"Summer Club",
];


function neighborhoodsForCategory(c: DirectoryCategory): Set<string> {
	const found = new Set<string>();
	for (const l of c.listings) {
		if (!l.address) continue;
		for (const n of KNOWN_NEIGHBORHOODS) {
			if (l.address.includes(n)) found.add(n);
		}
	}
	return found;
}


const SELECT =
	"h-12 w-full appearance-none border-2 border-brand-blue/30 bg-white px-4 pr-9 font-sans text-[14px] text-brand-blue outline-none focus:border-brand-blue md:text-[15px]";


export default function DirectoryCategoryGrid({ categories }: Props) {
	const [neighborhood, setNeighborhood] = useState("");
	const [categorySlug, setCategorySlug] = useState("");

	// Build the neighborhood dropdown options from whichever neighborhoods
	// actually appear in at least one listing — keeps the dropdown honest as
	// the directory grows.
	const neighborhoodOptions = useMemo(() => {
		const all = new Set<string>();
		for (const c of categories) {
			for (const n of neighborhoodsForCategory(c)) all.add(n);
		}
		return Array.from(all).sort();
	}, [categories]);

	const visible = useMemo(() => {
		return categories.filter((c) => {
			if (categorySlug && c.slug !== categorySlug) return false;
			if (neighborhood) {
				const ns = neighborhoodsForCategory(c);
				if (!ns.has(neighborhood)) return false;
			}
			return true;
		});
	}, [categories, categorySlug, neighborhood]);

	const isFiltered = neighborhood !== "" || categorySlug !== "";

	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
				{/* Search bar */}
				<form
					onSubmit={(e) => e.preventDefault()}
					className="mx-auto mb-12 flex w-full max-w-[820px] flex-col gap-3 sm:flex-row sm:items-stretch md:mb-14"
				>
					<label className="relative flex-1">
						<span className="sr-only">Neighborhood</span>
						<select
							value={neighborhood}
							onChange={(e) => setNeighborhood(e.target.value)}
							className={SELECT}
						>
							<option value="">Any neighborhood</option>
							{neighborhoodOptions.map((n) => (
								<option key={n} value={n}>
									{n}
								</option>
							))}
						</select>
						<Caret />
					</label>

					<label className="relative flex-1">
						<span className="sr-only">Category</span>
						<select
							value={categorySlug}
							onChange={(e) => setCategorySlug(e.target.value)}
							className={SELECT}
						>
							<option value="">Any category</option>
							{categories.map((c) => (
								<option key={c.slug} value={c.slug}>
									{c.name}
								</option>
							))}
						</select>
						<Caret />
					</label>

					{isFiltered && (
						<button
							type="button"
							onClick={() => {
								setNeighborhood("");
								setCategorySlug("");
							}}
							className="h-12 shrink-0 border-2 border-brand-blue px-6 font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5"
						>
							Reset
						</button>
					)}
				</form>

				{visible.length === 0 ? (
					<p className="text-center font-sans text-[15px] italic text-brand-blue/70">
						No matches yet — try a different combination, or clear the filters.
					</p>
				) : (
					<RevealStagger
						gap={STAGGER.card}
						className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-3"
					>
						{visible.map((c, i) => (
							<RevealItem key={c.slug} y={DISTANCE.card} duration={DURATION.card}>
								<Link
									href={`/directory/${c.slug}`}
									className={`group block ${TILTS[i % TILTS.length]} transition-transform duration-300 ease-out hover:rotate-0 hover:scale-[1.02]`}
								>
									<article className="relative overflow-hidden border-4 border-white bg-white shadow-xl">
										<div className="relative aspect-[5/4] w-full bg-neutral-200">
											<Image
												src={c.image}
												alt={c.imageAlt}
												fill
												sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
												className="object-cover transition duration-500 group-hover:scale-[1.04]"
											/>
											<div
												aria-hidden
												className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
											/>
										</div>

										{/* Yellow label band */}
										<div className="flex items-center justify-between gap-3 bg-brand-yellow px-5 py-4">
											<div>
												<p className="font-sans text-[15px] font-medium uppercase tracking-wider text-brand-blue md:text-[16px]">
													{c.name}
												</p>
												<p className="mt-1 font-sans text-[12px] font-medium italic text-brand-blue/70 md:text-[13px]">
													{c.listings.length}{" "}
													{c.listings.length === 1 ? "listing" : "listings"}
												</p>
											</div>
											<span
												aria-hidden
												className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition group-hover:translate-x-1"
											>
												<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
													<path d="M5 12h14M13 6l6 6-6 6" />
												</svg>
											</span>
										</div>
									</article>

									{/* Blurb below each card */}
									<p className="mx-1 mt-4 font-sans text-[13px] italic text-brand-blue/80 md:text-[14px]">
										{c.blurb}
									</p>
								</Link>
							</RevealItem>
						))}
					</RevealStagger>
				)}
			</div>
		</section>
	);
}


function Caret() {
	return (
		<svg
			aria-hidden
			viewBox="0 0 12 8"
			className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-brand-blue"
		>
			<path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
