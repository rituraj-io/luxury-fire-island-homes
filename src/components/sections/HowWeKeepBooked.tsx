"use client";


// HowWeKeepBooked — yellow band on /manage. Transition heading and intro
// copy, then a four-pillar tabs (desktop) / accordion (mobile) panel using
// the same outlined-display tab-label vocabulary as the homepage Services
// section. Each pillar card may include a short bullet list for the
// process-oriented tabs.

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION } from "@/lib/motion";


type Tab = {
	key: string;
	label: string;
	body: string[];
	bullets?: string[];
};


const TABS: Tab[] = [
	{
		key: "renters",
		label: "WE'VE GOT RENTERS",
		body: [
			"We've helped over 1,500 guests find their perfect Fire Island stay, and we've rented out hundreds of homes in the process. These guests come back year after year—and they trust us to deliver a 5-star experience.",
			"Your future renters? They're already in our system.",
			"(And yes, we have the most 5-star guest reviews on the island—go ahead, check Google.)",
		],
	},
	{
		key: "local",
		label: "WE'RE LOCAL",
		body: [
			"We live here. We know the communities, the streets, the ferry schedules, and the unspoken rules (like which blocks get the best breeze). Every guest is personally vetted by our team and paired with an agent who guides them through the booking process start to finish.",
			"No parties. No problems. Just respectful guests who treat your home like their own.",
		],
	},
	{
		key: "easy",
		label: "EASY TO BOOK",
		body: [
			"The homes we manage get booked faster—and for more money—because we make it simple for guests to fall in love and follow through.",
		],
		bullets: [
			"Your home will be listed on our brand-new, easy-to-use booking site (plus Airbnb, Vrbo, Google, and more)",
			"We use professional photos, smart pricing, and clear descriptions that highlight what makes your home special",
			"Our team responds to every guest question—quickly—so no one slips through the cracks",
			"We offer flexible payment options, so guests can book faster and with more confidence",
		],
	},
	{
		key: "service",
		label: "5-STAR SERVICE",
		body: [
			"We handle all the calls, questions, cleanings, and coordination. You just enjoy the income (and maybe book a few weeks for yourself).",
		],
		bullets: [
			"We respond to every inquiry within minutes—24/7",
			"We support guests during their stay so they leave glowing reviews",
			"We keep you in the loop without flooding your inbox",
			"And we treat your home like it's our own—because it matters",
		],
	},
];


const LABEL_BASE =
	"font-display text-[36px] leading-none tracking-[0.06em] md:text-[44px]";
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
			<h3
				className={LABEL_BASE}
				style={{ ...LABEL_OUTLINE, color: "var(--color-brand-yellow)" }}
			>
				{tab.label}
			</h3>

			<div className="mt-6 space-y-4 font-body text-[16px] leading-relaxed text-black">
				{tab.body.map((p, i) => (
					<p key={i}>{p}</p>
				))}

				{tab.bullets && (
					<ul className="mt-4 space-y-2 pl-0">
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
			</div>

			<Link
				href="#inquiry"
				className="mt-8 inline-block bg-brand-blue px-5 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-110"
			>
				GET IN TOUCH
			</Link>
		</div>
	);
}


export default function HowWeKeepBooked() {
	const [active, setActive] = useState(TABS[0].key);

	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[36px] leading-[1.1] text-brand-blue md:text-[52px] lg:text-[60px]"
				>
					How We Keep Your Home Booked&mdash;and Your Phone Quiet
				</Reveal>

				<Reveal
					as="p"
					delay={0.05}
					className="mx-auto mt-6 max-w-[620px] text-center font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					You didn&apos;t buy a Fire Island home to spend your summer coordinating cleaners and
					chasing down late-night questions about the grill.
				</Reveal>

				<Reveal
					as="p"
					delay={0.08}
					className="mx-auto mt-4 max-w-[620px] text-center font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					You deserve a team that gets it done&mdash;professionally, locally, and profitably.
				</Reveal>

				<Reveal
					as="p"
					delay={0.12}
					className="mx-auto mt-4 text-center font-sans text-[18px] font-semibold italic text-brand-blue md:text-[20px]"
				>
					Here&apos;s how we make it happen:
				</Reveal>

				{/* Desktop: tabs left, card right */}
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
