// AreaFacts — yellow band tile grid rendering an area's key numeric facts
// (e.g. year founded, acreage, marina slips). Each tile shows the value in
// condensed display type over a cream fill, with a small uppercase label
// beneath. Columns scale with the number of facts so the row stays balanced.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { AreaFact } from "@/lib/areas";


type Props = { facts: AreaFact[] };


export default function AreaFacts({ facts }: Props) {
	if (facts.length === 0) return null;

	// Cap the desktop column count so long fact lists wrap into rows of 4.
	const cols = Math.min(facts.length, 4);
	const gridCols =
		cols === 2
			? "sm:grid-cols-2"
			: cols === 3
				? "sm:grid-cols-3"
				: "sm:grid-cols-2 min-[992px]:grid-cols-4";

	return (
		<section className="w-full bg-brand-yellow py-14 md:py-16">
			<div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
				<Reveal
					as="p"
					className="text-center font-sans text-[13px] font-medium uppercase tracking-[0.24em] text-brand-blue md:text-[14px]"
				>
					At a glance
				</Reveal>

				<RevealStagger
					gap={STAGGER.card}
					className={`mt-8 grid w-full grid-cols-2 gap-3 md:mt-10 md:gap-4 ${gridCols}`}
				>
					{facts.map((fact) => (
						<RevealItem
							key={fact.label}
							y={DISTANCE.card}
							duration={DURATION.card}
						>
							<div className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-2xl bg-[#fffbf8] px-4 py-6 text-center md:min-h-[190px] md:py-8">
								<span className="font-display text-[52px] leading-none tracking-[0.02em] text-brand-blue md:text-[72px] lg:text-[80px]">
									{fact.value}
								</span>
								<span className="mt-3 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-blue md:text-[13px]">
									{fact.label}
								</span>
							</div>
						</RevealItem>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}
