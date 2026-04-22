"use client";


// Area — landing section for /area. Header block (script heading, search +
// sort, pitch, CTA), followed by the Fire Island map with a neighborhood
// info card. The card overlays the map on min-[992px]+ and stacks below on
// smaller screens. Interactive hotspot mapping + full neighborhood dataset
// will be layered in once confirmed — the card currently renders a default
// (Seaview) so the visual layout matches the design.

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { DISTANCE, DURATION } from "@/lib/motion";


type Neighborhood = {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	homesForSaleHref: string;
	homesToRentHref: string;
};


const SEAVIEW: Neighborhood = {
	slug: "seaview",
	name: "Seaview",
	tagline: "Peaceful, Family Oriented, Manicured",
	description:
		"Seaview offers stunning beaches, tennis courts, and a private marina. Homes start at $1.6 million, with summer rentals ranging from $5,000 to $13,000 per week. It retains a residential atmosphere while being near the lively restaurants, nightlife, and shops of Ocean Beach.",
	homesForSaleHref: "/buy?area=seaview",
	homesToRentHref: "/current-rentals?area=seaview",
};


export default function Area() {
	const [query, setQuery] = useState("");
	const active = SEAVIEW;

	return (
		<section className="w-full bg-[#f8f4ec] pb-16 pt-[calc(144px+env(safe-area-inset-top)+2rem)] md:pb-20 md:pt-[calc(144px+env(safe-area-inset-top)+3rem)]">
			<div className="mx-auto max-w-site px-4 md:px-8">
				{/* Header block */}
				<Reveal y={DISTANCE.text} duration={DURATION.text} className="flex flex-col items-center text-center">
					<h1 className="font-script text-[40px] leading-none text-brand-blue md:text-[52px]">
						Fire Island Areas
					</h1>

					{/* Filter row — search + sort by, stacks on mobile. */}
					<div className="mt-8 flex w-full max-w-[620px] flex-col gap-3 sm:flex-row sm:items-stretch">
						<label className="min-w-0 flex-1">
							<span className="sr-only">Search neighborhoods</span>
							<div className="flex h-12 items-center border-2 border-[#5c7f9f] bg-white px-4">
								<svg
									aria-hidden
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-7 w-7 shrink-0 text-[#5c7f9f]"
								>
									<circle cx="11" cy="11" r="7" />
									<path d="m20 20-3.5-3.5" />
								</svg>
								<input
									type="search"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="ml-3 h-full flex-1 bg-transparent font-sans text-[14px] text-brand-blue outline-none placeholder:text-brand-blue/60"
								/>
							</div>
						</label>

						<button
							type="button"
							className="flex h-12 cursor-pointer items-center justify-center gap-2 border-2 border-[#5c7f9f] bg-white px-5 font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5"
						>
							Sort By
							<svg aria-hidden viewBox="0 0 12 8" className="h-2 w-3 shrink-0">
								<path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					</div>

					<p className="mt-6 max-w-[500px] font-body text-[16px] leading-relaxed text-black">
						Scroll over a neighborhood to get our overview &amp; links to homes for sale and rental properties.
					</p>

					<Link
						href="#reach-out"
						className="mt-6 inline-block bg-brand-orange px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
					>
						Want Our Help? Reach Out!
					</Link>
				</Reveal>
			</div>

			{/* Map + neighborhood info card. Card overlays map on 992px+ (hangs
			    below the image via bottom padding on the container), stacks below
			    on smaller screens. */}
			<Reveal
				y={DISTANCE.card}
				duration={DURATION.card}
				delay={0.1}
				className="mx-auto mt-10 w-full max-w-[1400px] px-4 md:mt-14 md:px-8"
			>
				<div className="relative min-[992px]:pb-36 min-[1200px]:pb-44">
					<Image
						src="/assets/images/ocean-waves-graphic.webp"
						alt="Illustrated map of Fire Island showing its communities from Robert Moses to Davis Park"
						width={1600}
						height={500}
						className="h-auto w-full"
						priority={false}
					/>

					<NeighborhoodCard data={active} />
				</div>
			</Reveal>
		</section>
	);
}


function NeighborhoodCard({ data }: { data: Neighborhood }) {
	return (
		<div className="mt-6 w-full bg-[#dbe2ec] p-6 min-[992px]:absolute min-[992px]:bottom-0 min-[992px]:right-4 min-[992px]:mt-0 min-[992px]:w-[44%] min-[992px]:max-w-[460px] min-[992px]:p-7">
			<p className="font-sans text-[20px] font-semibold uppercase tracking-wider text-brand-blue md:text-[22px]">
				{data.name}
			</p>
			<p className="mt-2 font-sans text-[15px] font-semibold italic text-brand-blue md:text-[16px]">
				{data.tagline}
			</p>
			<p className="mt-3 font-body text-[14px] leading-relaxed text-brand-blue md:text-[15px]">
				{data.description}
			</p>
			<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4">
				<Link
					href={data.homesForSaleHref}
					className="flex-1 bg-brand-yellow px-4 py-3 text-center font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue transition hover:brightness-95"
				>
					Homes For Sale
				</Link>
				<Link
					href={data.homesToRentHref}
					className="flex-1 bg-brand-yellow px-4 py-3 text-center font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue transition hover:brightness-95"
				>
					Homes To Rent
				</Link>
			</div>
		</div>
	);
}
