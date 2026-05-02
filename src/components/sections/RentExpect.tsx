// RentExpect — yellow band: script headline + uppercase subline, then a
// 2-column grid of white check-mark rows (left-aligned), and a blue
// rectangular CTA button at the bottom. Matches the rent-page mock.

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { RentSection4 } from "@/lib/cms";


const FALLBACK: RentSection4 = {
	headline: "Here’s What You Can Expect",
	introText: "When You Rent With Us:",
	benefits: [
		"Curated Homes That Aren’t on Airbnb or Vrbo",
		"Tailored to Your Family’s Needs",
		"Clear, Responsive Communication",
		"We get the details right",
		"Spotless, Well-Maintained Rentals",
		"No mystery smells. No broken appliances.",
		"Local Experts Who Know Everyone and Everything",
		"Conceirge Level Service (the Fire Island SCHELP)",
	],
};


export default function RentExpect({ data }: { data?: RentSection4 }) {
	const d = data ?? FALLBACK;
	const benefits = d.benefits.length > 0 ? d.benefits : FALLBACK.benefits;

	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-[980px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[36px] leading-[1.1] text-brand-blue md:text-[52px]"
				>
					{d.headline}
				</Reveal>

				<Reveal
					as="p"
					className="mt-3 text-center font-sans text-[15px] font-semibold uppercase tracking-wider text-brand-blue md:mt-4 md:text-[18px]"
				>
					{d.introText}
				</Reveal>

				<RevealStagger
					gap={STAGGER.card}
					className="mx-auto mt-8 grid w-full grid-cols-1 gap-3 md:mt-10 md:grid-cols-2 md:gap-x-5 md:gap-y-3"
				>
					{benefits.map((benefit) => (
						<RevealItem key={benefit} y={DISTANCE.card} duration={DURATION.card}>
							<div className="flex h-full items-center gap-3 rounded-md bg-white px-4 py-3 md:px-5 md:py-3.5">
								<svg
									aria-hidden="true"
									viewBox="0 0 24 24"
									className="h-5 w-5 shrink-0 text-brand-blue md:h-6 md:w-6"
								>
									<path
										d="M5 12.5l4.5 4.5L19 7"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span className="font-body text-[14px] leading-[1.35] text-black md:text-[15px]">
									{benefit}
								</span>
							</div>
						</RevealItem>
					))}
				</RevealStagger>

				<Reveal className="mt-10 flex justify-center md:mt-12">
					<Link
						href="/#contact"
						className="inline-flex items-center justify-center bg-brand-blue px-10 py-4 font-sans text-[15px] font-medium uppercase tracking-wider text-white transition hover:brightness-110 md:text-[16px]"
					>
						Get Started — Inquire Here
					</Link>
				</Reveal>
			</div>
		</section>
	);
}
