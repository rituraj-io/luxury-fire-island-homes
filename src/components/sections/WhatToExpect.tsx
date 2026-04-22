// WhatToExpect — yellow-band section listing the eight things a seller gets
// when working with the team. First tile is a blue-gray intro with body copy;
// the remaining seven are cream tiles with centered uppercase titles.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";


const TILES = [
	"MARKETING THAT ACTUALLY SELLS HOMES",
	"CERTIFIED HOME PROGRAM",
	"A LOCAL, FULL-SERVICE TEAM",
	"CLEAR COMMUNICATION, ALWAYS",
	"GUARANTEED SALE – IN WRITING",
	"NEED HELP GETTING THE HOUSE READY? WE’VE GOT YOU.",
	"SELLING TO AN INVESTOR? WE SPEAK THEIR LANGUAGE",
];


export default function WhatToExpect() {
	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[32px] leading-[1.1] text-brand-blue md:text-[48px] lg:text-[56px]"
				>
					Here’s What You Can Expect when you Sell with Us:
				</Reveal>

				<RevealStagger
					gap={STAGGER.card}
					className="mx-auto mt-10 grid w-full grid-cols-2 gap-2 md:mt-12 md:gap-3 min-[992px]:grid-cols-4"
				>
					{/* Intro tile — blue-gray body copy */}
					<RevealItem y={DISTANCE.card} duration={DURATION.card}>
						<div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl bg-[#dce5ef] p-5 md:min-h-[240px] md:p-6">
							<p className="text-center font-body text-[13px] leading-[1.45] text-black md:text-[13.5px]">
								Whatever your situation, we’ve got the right strategy. Want a quick sale? Total
								discretion? Prefer your nosy neighbors don’t find out you’re moving? We’ll keep
								it quiet. Don’t want to make other agents mad by working with us? Totally
								fair—and also kind of flattering. Bottom line: we’ve done it all, and we’ll
								tailor the process to you.
							</p>
						</div>
					</RevealItem>

					{TILES.map((label) => (
						<RevealItem key={label} y={DISTANCE.card} duration={DURATION.card}>
							<div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl bg-[#fffbf8] p-5 md:min-h-[240px] md:p-6">
								<h3 className="text-center font-sans text-[18px] font-medium uppercase leading-[1.35] tracking-wider text-brand-blue">
									{label}
								</h3>
							</div>
						</RevealItem>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}
