"use client";


// Current Rentals — landing section for /current-rentals. Cream band with a
// script heading, filter row (search / sort / map), short pitch, orange CTA,
// and a 3-up grid of rental cards. LOAD MORE reveals another page of
// rentals. Search/sort/map controls are visual placeholders — wiring will
// follow once the rental backend is connected.

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";


type RentalCard = {
	code: string;
	price: string;
	address: string;
	image: string;
};


const RENTALS: RentalCard[] = [
	{ code: "OB919E",  price: "$7,500/week",  address: "Ocean Beach, Fire Island, NY 11770",     image: "/assets/images/placeholder.svg" },
	{ code: "OBP24S",  price: "$10,000/week", address: "Ocean Bay Park, Fire Island, NY 11770",  image: "/assets/images/placeholder.svg" },
	{ code: "OBP7C",   price: "$6,500/week",  address: "Ocean Bay Park, Fire Island, NY 11770",  image: "/assets/images/placeholder.svg" },
	{ code: "OB46B",   price: "$5,500/week",  address: "Ocean Beach, NY 11770",                  image: "/assets/images/placeholder.svg" },
	{ code: "OB647OB", price: "$7,500/week",  address: "Ocean Beach, NY 11770",                  image: "/assets/images/placeholder.svg" },
	{ code: "OBP38E",  price: "$10,000/week", address: "Ocean Bay Park, NY 11770",               image: "/assets/images/placeholder.svg" },
];


const PAGE_SIZE = 6;


export default function CurrentRentals() {
	const [query, setQuery] = useState("");
	const [visible, setVisible] = useState(PAGE_SIZE);
	const shown = RENTALS.slice(0, visible);

	return (
		<section className="w-full bg-[#f8f4ec] pb-16 pt-[calc(144px+env(safe-area-inset-top)+2rem)] md:pb-20 md:pt-[calc(144px+env(safe-area-inset-top)+3rem)]">
			<div className="mx-auto max-w-site px-4 md:px-8">
				{/* Header block — heading, filter row, pitch, CTA. */}
				<Reveal y={DISTANCE.text} duration={DURATION.text} className="flex flex-col items-center text-center">
					<h1 className="font-script text-[40px] leading-none text-brand-blue md:text-[52px]">
						Current Rentals
					</h1>

					{/* Filter row — stacks on mobile, row on sm+. */}
					<div className="mt-8 flex w-full max-w-[720px] flex-col gap-3 sm:flex-row sm:items-stretch">
						<label className="min-w-0 flex-1">
							<span className="sr-only">Search rentals</span>
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

						<button
							type="button"
							className="flex h-12 cursor-pointer items-center justify-center border-2 border-[#5c7f9f] bg-white px-5 font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5"
						>
							Show Map
						</button>
					</div>

					<p className="mt-6 max-w-[600px] font-body text-[16px] leading-relaxed text-black">
						Don&apos;t see what you&apos;re looking for? Don&apos;t worry. We have access to ALL rentals on Fire Island. Let us know your criteria by filling out the form below!
					</p>

					<Link
						href="#work-with-us"
						className="mt-6 inline-block bg-brand-orange px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
					>
						Click Here to Work With Us
					</Link>
				</Reveal>

				{/* Rental grid — 1 → 2 → 3 columns. */}
				<RevealStagger
					gap={STAGGER.card}
					className="mx-auto mt-12 grid max-w-[420px] grid-cols-1 gap-6 sm:max-w-[780px] sm:grid-cols-2 md:mt-14 md:max-w-site md:grid-cols-3"
				>
					{shown.map((r) => (
						<RevealItem key={r.code} y={DISTANCE.card} duration={DURATION.card}>
							<article className="bg-white shadow-sm">
								<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
									<Image
										src={r.image}
										alt={`${r.code} — ${r.address}`}
										fill
										sizes="(min-width: 768px) 360px, (min-width: 640px) 45vw, 90vw"
										className="object-cover"
									/>
								</div>
								<div className="px-5 py-4 text-center">
									<p className="font-sans text-[20px] font-medium text-black">{r.price}</p>
									<p className="mt-1.5 font-sans text-[16px] text-black">{r.code}</p>
									<p className="mt-0.5 font-sans text-[16px] text-black/80">{r.address}</p>
								</div>
							</article>
						</RevealItem>
					))}
				</RevealStagger>

				<Reveal y={DISTANCE.text} duration={DURATION.text} className="mt-10 flex justify-center md:mt-12">
					<button
						type="button"
						onClick={() => setVisible((v) => v + PAGE_SIZE)}
						className="cursor-pointer border-2 border-brand-blue bg-transparent px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5"
					>
						Load More
					</button>
				</Reveal>
			</div>
		</section>
	);
}
