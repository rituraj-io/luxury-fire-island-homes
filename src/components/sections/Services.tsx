"use client";


// Services — two-column tabbed section. Desktop (>=992px) shows tabs
// on the left with a persistent card on the right. Mobile collapses
// into an accordion: the active tab expands to reveal the card inline
// via a smooth grid-rows height animation.

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION } from "@/lib/motion";
import { paragraphs, type AccordionItem } from "@/lib/cms";


type Tab = { key: string; label: string; body: string[] };


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

			<div className="mt-6 space-y-4 font-body text-[16px] leading-relaxed text-black">
				{tab.body.map((p, i) => (
					<p key={i}>{p}</p>
				))}
			</div>

			<Link
				href="/current-rentals"
				className="mt-8 inline-block bg-brand-blue px-5 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-110"
			>
				BROWSE OUR LISTINGS
			</Link>
		</div>
	);
}


type Props = { accordion: AccordionItem[] };


export default function Services({ accordion }: Props) {
	const tabs = useMemo<Tab[]>(
		() =>
			accordion.map((a, i) => ({
				key: String(i),
				label: a.title,
				body: paragraphs(a.description),
			})),
		[accordion]
	);

	const [active, setActive] = useState(tabs[0]?.key ?? "0");

	return (
		<section className="w-full bg-[#dbe2ec] py-10 md:py-14">
			<div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
				{/* ---------- Desktop (>=992px) ---------- */}
				<div className="hidden gap-16 min-[992px]:grid min-[992px]:grid-cols-2">
					<RevealStagger as="ul" className="flex flex-col justify-center self-center">
						{tabs.map((t, i) => {
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

					<Reveal y={DISTANCE.card} duration={DURATION.card} delay={0.15} className="grid items-center self-center [grid-template-areas:'stack']">
						{tabs.map((t) => {
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
					</Reveal>
				</div>

				{/* ---------- Mobile accordion (<992px) ---------- */}
				<RevealStagger as="ul" className="flex flex-col min-[992px]:hidden">
					{tabs.map((t, i) => {
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
