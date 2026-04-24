"use client";


// JoinPillars — yellow band on /join. Four-pillar tabs/accordion panel
// using the same outlined-display vocabulary as the homepage Services and
// the /manage HowWeKeepBooked sections. Consolidates the PDF's "We Invest
// in Our Agents", "Support Without Micromanaging", and "Great Brand. Even
// Better Culture." blocks into a scannable tabbed layout, with a fourth
// tab dedicated to the team / mentorship angle.

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION } from "@/lib/motion";


type Tab = {
	key: string;
	label: string;
	heading: string;
	intro?: string;
	bullets?: string[];
	outro?: ReactNode;
};


const TABS: Tab[] = [
	{
		key: "invest",
		label: "INVESTMENT",
		heading: "We Invest in Our Agents (Like, Actually)",
		intro:
			"We love watching our agents grow—and we put our money where our mouth is. We provide:",
		bullets: [
			"High-quality, professional marketing platforms",
			"Listing and branding support that actually elevates your business",
			"Systems that make your life easier, not harder",
		],
		outro: (
			<>
				<p>
					And we&apos;re proud to say:{" "}
					<span className="font-semibold">
						we are the only Fire Island brokerage offering a formal mentorship program.
					</span>
				</p>
				<p>
					Whether you&apos;re newer to the island or looking to refine your craft, you&apos;ll
					have real guidance—not guesswork or &ldquo;figure it out as you go&rdquo; energy.
				</p>
			</>
		),
	},
	{
		key: "support",
		label: "SUPPORT",
		heading: "Support Without Micromanaging",
		intro: "You'll have:",
		bullets: [
			"Lead flow from rentals, referrals, and inbound inquiries",
			"Pricing guidance rooted in real island data",
			"Transaction support from offer through closing",
			"Mentorship when you want it, autonomy when you don't",
		],
		outro: (
			<p className="font-semibold italic">We trust our agents. And it shows.</p>
		),
	},
	{
		key: "brand",
		label: "BRAND",
		heading: "Great Brand. Even Better Culture.",
		intro:
			"Yes, we're known for our 100+ five-star reviews, features in the Fire Island News, and strong island-wide reputation.",
		bullets: [
			"A collaborative, fun team culture",
			"Zero ego",
			"Mutual respect",
			"Celebrating wins—big and small",
		],
		outro: (
			<p>
				We work hard. We laugh a lot. We show up for each other. And we genuinely love what
				we&apos;re building together.
			</p>
		),
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
				color: active ? "var(--color-brand-yellow)" : "#faf6e8",
			}}
		>
			{label}
		</span>
	);
}


function CardBody({ tab }: { tab: Tab }) {
	return (
		<div className="bg-[#fffbf8] p-5 md:p-6">
			<h3 className="font-script text-[26px] leading-[1.1] text-brand-blue md:text-[32px]">
				{tab.heading}
			</h3>

			<div className="mt-5 space-y-4 font-body text-[15px] leading-relaxed text-black md:text-[16px]">
				{tab.intro && <p>{tab.intro}</p>}

				{tab.bullets && tab.bullets.length > 0 && (
					<ul className="space-y-2 pl-0">
						{tab.bullets.map((b, i) => (
							<li key={i} className="flex gap-3">
								<span
									aria-hidden
									className="mt-[9px] inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-brand-blue"
								/>
								<span>{b}</span>
							</li>
						))}
					</ul>
				)}

				{tab.outro && <div className="space-y-3">{tab.outro}</div>}
			</div>

			<Link
				href="#lets-chat"
				className="mt-7 inline-block bg-brand-blue px-5 py-3 font-sans text-[15px] font-medium tracking-wider text-white transition hover:brightness-110 md:text-[16px]"
			>
				LET&apos;S CHAT
			</Link>
		</div>
	);
}


export default function JoinPillars() {
	const [active, setActive] = useState(TABS[0].key);

	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
				<Reveal
					as="p"
					className="text-center font-sans text-[13px] font-medium uppercase tracking-[0.28em] text-brand-blue md:text-[14px]"
				>
					What you can expect
				</Reveal>

				<Reveal
					as="h2"
					delay={0.05}
					className="mx-auto mt-4 max-w-[720px] text-center font-script text-[36px] leading-[1.1] text-brand-blue md:text-[52px] lg:text-[60px]"
				>
					The good stuff, in four flavors.
				</Reveal>

				{/* Desktop */}
				<div className="mt-12 hidden gap-16 min-[992px]:grid min-[992px]:grid-cols-2">
					<RevealStagger as="ul" className="flex flex-col justify-center self-center">
						{TABS.map((t, i) => {
							const isActive = t.key === active;
							return (
								<RevealItem
									as="li"
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
								</RevealItem>
							);
						})}
					</RevealStagger>

					<Reveal
						y={DISTANCE.card}
						duration={DURATION.card}
						delay={0.15}
						className="grid items-center self-center [grid-template-areas:'stack']"
					>
						{TABS.map((t) => {
							const isActive = t.key === active;
							return (
								<div
									key={t.key}
									aria-hidden={!isActive}
									className={`transition-opacity duration-300 ease-in-out [grid-area:stack] ${
										isActive ? "opacity-100" : "pointer-events-none opacity-0"
									}`}
								>
									<CardBody tab={t} />
								</div>
							);
						})}
					</Reveal>
				</div>

				{/* Mobile accordion */}
				<RevealStagger as="ul" className="mt-10 flex flex-col min-[992px]:hidden">
					{TABS.map((t, i) => {
						const isActive = t.key === active;
						return (
							<RevealItem
								as="li"
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
							</RevealItem>
						);
					})}
				</RevealStagger>
			</div>
		</section>
	);
}
