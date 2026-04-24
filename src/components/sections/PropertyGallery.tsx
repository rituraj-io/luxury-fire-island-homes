"use client";


// PropertyGallery — opening moment for /rentals/[slug]. Replaces the generic
// photo hero used on earlier rental pages with an Airbnb-style layout: a
// title/stats band above a 1-big + 4-small photo grid. If the rental lacks a
// `gallery`, the grid collapses to a single full-width hero photo so older
// entries still render cleanly.
//
// The title band uses the site's yellow script + blue hard-shadow treatment,
// so the page still reads as part of the LFIH family while borrowing the
// photo-first information architecture the listing pattern expects.

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION } from "@/lib/motion";
import type { Rental } from "@/lib/rentals";


type Props = { rental: Rental };


const STAT_VALUE =
	"font-display text-[44px] leading-none tracking-[0.02em] text-brand-blue md:text-[56px]";
const STAT_LABEL =
	"mt-1 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[12px]";


export default function PropertyGallery({ rental }: Props) {
	const lead = rental.gallery?.[0] ?? { src: rental.heroImage, alt: rental.heroAlt };
	const smalls = rental.gallery?.slice(1, 5) ?? [];

	return (
		<section className="w-full bg-[#f8f4ec] pt-[calc(144px+env(safe-area-inset-top)+1.5rem)] pb-10 md:pt-[calc(144px+env(safe-area-inset-top)+2.5rem)] md:pb-14">
			<div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
				{/* Title band */}
				<Reveal className="flex flex-col items-center text-center">
					{rental.referenceCode && (
						<p className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-brand-blue md:text-[13px]">
							Ref. {rental.referenceCode} · {rental.location}
						</p>
					)}

					<h1 className="mt-4 -rotate-[3deg] font-script text-[44px] leading-[1] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-[64px] md:text-[80px] md:[text-shadow:3px_4px_0_#185b89] lg:text-[96px] lg:[text-shadow:3px_5px_0_#185b89]">
						{rental.name}
					</h1>

					{rental.tagline && (
						<p className="mt-5 font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[15px]">
							{rental.tagline}
						</p>
					)}
				</Reveal>

				{/* Stats row */}
				<RevealStagger className="mx-auto mt-8 grid w-full max-w-[760px] grid-cols-4 items-end gap-2 border-y border-brand-blue/20 px-2 py-6 md:mt-10 md:gap-4 md:py-8">
					<RevealItem className="flex flex-col items-center text-center">
						<span className={STAT_VALUE}>{rental.beds}</span>
						<span className={STAT_LABEL}>Bedrooms</span>
					</RevealItem>
					<RevealItem className="flex flex-col items-center border-l border-brand-blue/20 text-center">
						<span className={STAT_VALUE}>{rental.baths}</span>
						<span className={STAT_LABEL}>Bathrooms</span>
					</RevealItem>
					<RevealItem className="flex flex-col items-center border-l border-brand-blue/20 text-center">
						<span className={STAT_VALUE}>{rental.sleeps}</span>
						<span className={STAT_LABEL}>Sleeps</span>
					</RevealItem>
					<RevealItem className="flex flex-col items-center border-l border-brand-blue/20 text-center">
						<span className="font-sans text-[18px] font-medium leading-none text-brand-blue md:text-[22px]">
							{rental.pricePerWeek.replace(/\/week$/i, "")}
						</span>
						<span className={STAT_LABEL}>/ week</span>
					</RevealItem>
				</RevealStagger>

				{/* Photo grid */}
				<Reveal
					y={DISTANCE.card}
					duration={DURATION.card}
					delay={0.1}
					className="mt-10 md:mt-12"
				>
					{smalls.length >= 4 ? (
						<>
							<div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-xl min-[992px]:grid-cols-4 min-[992px]:grid-rows-2">
								<div className="relative aspect-[4/3] min-[992px]:col-span-2 min-[992px]:row-span-2 min-[992px]:aspect-auto">
									<Image
										src={lead.src}
										alt={lead.alt}
										fill
										priority
										sizes="(min-width: 992px) 50vw, 100vw"
										className="object-cover"
									/>
								</div>
								{smalls.map((img) => (
									<div key={img.src} className="relative aspect-[4/3]">
										<Image
											src={img.src}
											alt={img.alt}
											fill
											sizes="(min-width: 992px) 25vw, 100vw"
											className="object-cover"
										/>
									</div>
								))}
								{rental.gallery && rental.gallery.length > 5 && (
									<Link
										href="#gallery"
										className="absolute bottom-4 right-4 hidden bg-white/95 px-5 py-3 font-sans text-[13px] font-medium uppercase tracking-wider text-brand-blue shadow-md transition hover:bg-white min-[992px]:inline-block"
									>
										View all {rental.gallery.length} photos
									</Link>
								)}
							</div>

							{/* Mobile "view all" — stacks below the grid where the desktop overlay can't fit */}
							{rental.gallery && rental.gallery.length > 5 && (
								<div className="mt-4 flex justify-center min-[992px]:hidden">
									<Link
										href="#gallery"
										className="bg-white px-5 py-3 font-sans text-[13px] font-medium uppercase tracking-wider text-brand-blue shadow-md transition hover:brightness-95"
									>
										View all {rental.gallery.length} photos
									</Link>
								</div>
							)}
						</>
					) : (
						<div className="relative aspect-[16/9] overflow-hidden rounded-xl md:aspect-[21/9]">
							<Image
								src={lead.src}
								alt={lead.alt}
								fill
								priority
								sizes="100vw"
								className="object-cover"
							/>
						</div>
					)}
				</Reveal>
			</div>
		</section>
	);
}
