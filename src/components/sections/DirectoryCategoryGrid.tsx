// DirectoryCategoryGrid — cream band on /directory. Six tile cards in a 3×2
// grid (2 columns on tablet, 1 on mobile). Each tile is a tilted
// white-bordered photo — reusing the site's collage vocabulary — with a
// yellow overlay band at the bottom carrying the category name in uppercase
// Gopher. Alternating tilts keep the row organic rather than rigid.

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


export default function DirectoryCategoryGrid({ categories }: Props) {
	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
				<RevealStagger
					gap={STAGGER.card}
					className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-3"
				>
					{categories.map((c, i) => (
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
			</div>
		</section>
	);
}
