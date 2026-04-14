"use client";


// Services — two-column tabbed section. Desktop (>=992px) shows tabs
// on the left with a persistent card on the right. Mobile collapses
// into an accordion: the active tab expands to reveal the card inline
// via a smooth grid-rows height animation.

import { useState } from "react";
import Link from "next/link";


type Tab = { key: string; label: string; body: string[] };


const TABS: Tab[] = [
	{
		key: "rent-ours",
		label: "RENT ONE OF OURS",
		body: [
			"We match you with the perfect Fire Island stay, connecting you with homeowners who actually care (think spotless homes and 5-star hospitality, not a broken beach chair and half a roll of toilet paper). Whether you're here for a weekend, a month, or the whole summer, we'll find a place that fits you (and even Fido's) vibe — so you can focus on the beach, not the booking stress.",
			"P.S. Don't wait on these... they usually book up fast.",
		],
	},
	{
		key: "buy",
		label: "BUY A HOME",
		body: [
			"We help you find your perfect slice of Fire Island—whether it's a cozy beach bungalow, a luxury waterfront oasis, or something in between. But we're not just here to show you houses; we're here to welcome you into the island, the community, and the laid-back lifestyle that makes this place special.",
			"With us, you'll get expert (and local) guidance, access to hidden gems, and a stress-free buying experience—zero pushy sales tactics, just real advice. And when you need the best AC guy on the island (because, trust us, you will), we've got you covered. Oh, and every home you buy with us comes with a built-in Fire Island tour guide (aka us), a home warranty, discounted attorney services, and the lowest interest rate possible.",
			"Try finding another team that can top that—we'll wait. 😉",
		],
	},
	{
		key: "sell",
		label: "SELL A HOME",
		body: [
			"Selling your home shouldn't be stressful - unless you count us trying to convince you to stay—we don't want to lose you!",
			"But if you must go, we make sure you walk away with the most money in your pocket. Our expert pricing strategies, next-level marketing, and Certified Home Program attract serious buyers and eliminate surprises that might scare them off. We communicate, we hustle, and we get the job done—so you can move on to your next chapter without the headache.",
			"You will be missed, though 😞",
		],
	},
	{
		key: "rent-out",
		label: "RENT OUT YOURS",
		body: [
			"Nothing like handing over your keys to a rowdy group of 25-year-olds who treat your home like a frat house… Yeah, let's not do that.",
			"When you rent with us, we personally vet every guest to make sure they treat your home the way you would. We handle everything—marketing, bookings, renter screening, and even cleaning and maintenance (if you'd like)—so you can actually enjoy the perks of renting without the stress. Whether it's filling your calendar with great renters or handling the little details, we make the process seamless and worry-free.",
		],
	},
];


const LABEL_BASE =
	"font-display text-[40px] leading-none tracking-[0.06em] md:text-[48px]";
const LABEL_OUTLINE = {
	WebkitTextStroke: "3px var(--color-brand-blue)",
	paintOrder: "stroke fill",
} as const;


function PlusIcon({ rotated }: { rotated: boolean }) {
	return (
		<span
			aria-hidden
			className={`inline-block h-8 w-8 shrink-0 bg-[#1a5c89] transition-transform duration-500 ease-in-out ${
				rotated ? "rotate-45" : ""
			}`}
			style={{
				WebkitMaskImage: "url('/assets/images/plus-small.svg')",
				WebkitMaskRepeat: "no-repeat",
				WebkitMaskPosition: "center",
				WebkitMaskSize: "contain",
				maskImage: "url('/assets/images/plus-small.svg')",
				maskRepeat: "no-repeat",
				maskPosition: "center",
				maskSize: "contain",
			}}
		/>
	);
}


function TabLabel({ label, active }: { label: string; active: boolean }) {
	return (
		<span
			className={LABEL_BASE}
			style={{
				...LABEL_OUTLINE,
				color: active ? "var(--color-brand-yellow)" : "#dbe2ec",
			}}
		>
			{label}
		</span>
	);
}


function CardBody({ tab }: { tab: Tab }) {
	return (
		<div className="bg-[#f8f4ec] p-5 md:p-6">
			<h3
				className={LABEL_BASE}
				style={{ ...LABEL_OUTLINE, color: "var(--color-brand-yellow)" }}
			>
				{tab.label}
			</h3>

			<div className="mt-6 space-y-4 font-body text-[15px] leading-relaxed text-black">
				{tab.body.map((p, i) => (
					<p key={i}>{p}</p>
				))}
			</div>

			<Link
				href="#listings"
				className="mt-8 inline-block bg-brand-blue px-5 py-3 font-sans text-[14px] font-medium tracking-wider text-white transition hover:brightness-110"
			>
				BROWSE OUR LISTINGS
			</Link>
		</div>
	);
}


export default function Services() {
	const [active, setActive] = useState(TABS[0].key);
	const activeTab = TABS.find((t) => t.key === active) ?? TABS[0];

	return (
		<section className="w-full bg-[#dbe2ec] py-10 md:py-14">
			<div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
				{/* ---------- Desktop (>=992px) ---------- */}
				<div className="hidden gap-16 min-[992px]:grid min-[992px]:grid-cols-2">
					<ul className="flex flex-col justify-center self-center">
						{TABS.map((t, i) => {
							const isActive = t.key === active;
							return (
								<li
									key={t.key}
									className={i === 0 ? "" : "border-t border-brand-blue/40"}
								>
									<button
										type="button"
										onClick={() => setActive(t.key)}
										className="flex w-full cursor-pointer items-center gap-4 py-5 text-left"
									>
										<PlusIcon rotated={false} />
										<TabLabel label={t.label} active={isActive} />
									</button>
								</li>
							);
						})}
					</ul>

					{/* Stack all cards in a single grid cell so the container's
					    height is always the tallest card — only the active one
					    is visible. Prevents the whole section from resizing as
					    content switches. */}
					<div className="grid items-center self-center [grid-template-areas:'stack']">
						{TABS.map((t) => {
							const isActive = t.key === active;
							return (
								<div
									key={t.key}
									aria-hidden={!isActive}
									className={`transition-opacity duration-300 ease-in-out [grid-area:stack] ${
										isActive
											? "opacity-100"
											: "pointer-events-none opacity-0"
									}`}
								>
									<CardBody tab={t} />
								</div>
							);
						})}
					</div>
				</div>

				{/* ---------- Mobile accordion (<992px) ---------- */}
				<ul className="flex flex-col min-[992px]:hidden">
					{TABS.map((t, i) => {
						const isActive = t.key === active;
						return (
							<li
								key={t.key}
								className={i === 0 ? "" : "border-t border-brand-blue/40"}
							>
								<button
									type="button"
									onClick={() => setActive(isActive ? "" : t.key)}
									aria-expanded={isActive}
									className="flex w-full cursor-pointer items-center gap-4 py-5 text-left"
								>
									<PlusIcon rotated={isActive} />
									<TabLabel label={t.label} active={isActive} />
								</button>

								{/* Collapsible panel. grid-rows 0fr <-> 1fr gives a
								    smooth height transition without measuring. */}
								<div
									className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
										isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
									}`}
								>
									<div className="overflow-hidden">
										<div className="pb-5">
											<CardBody tab={t} />
										</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
