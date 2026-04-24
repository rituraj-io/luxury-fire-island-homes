// JoinAntiList — blue-gray band on /join. The PDF's signature "No cold
// calling / No door knocking / No fighting over internet leads" moment
// rendered with the site's outlined-display type family (same treatment as
// the homepage hero outline and the DONE.DONE.AND DONE. gesture on /manage).
// Sits above the four-pillar tabs so the "Real Leads. Real Relationships.
// Real Fun." header can land with impact.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";


const NOS = ["No Cold Calling.", "No Door Knocking.", "No Fighting Over Internet Leads."];


const NO_LABEL =
	"font-display leading-[0.95] tracking-[0.02em] text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px]";
const NO_OUTLINE = {
	WebkitTextStroke: "3px var(--color-brand-blue)",
	paintOrder: "stroke fill",
	color: "var(--color-brand-yellow)",
} as const;


export default function JoinAntiList() {
	return (
		<section className="w-full overflow-hidden bg-[#dce5ef] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[36px] leading-[1.1] text-brand-blue md:text-[48px] lg:text-[56px]"
				>
					Real Leads. Real Relationships. Real Fun.
				</Reveal>

				<Reveal
					as="p"
					delay={0.05}
					className="mx-auto mt-6 max-w-[640px] text-center font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					Most of our buyers start as renters. Many have been coming to Fire Island for years
					before they ever buy. Because we manage hundreds of rentals and stay closely
					involved in the community, our agents are building relationships long before a sale
					ever happens.
				</Reveal>

				<Reveal
					as="p"
					delay={0.1}
					className="mx-auto mt-4 text-center font-sans text-[18px] font-semibold italic text-brand-blue md:text-[20px]"
				>
					Which means:
				</Reveal>

				<RevealStagger
					gap={STAGGER.card}
					delay={0.1}
					className="mt-10 flex flex-col items-center justify-center gap-y-4 md:mt-14 md:gap-y-6"
				>
					<RevealItem y={DISTANCE.card} duration={DURATION.card}>
						<span className={`${NO_LABEL} inline-block -rotate-[2deg]`} style={NO_OUTLINE}>
							{NOS[0]}
						</span>
					</RevealItem>
					<RevealItem y={DISTANCE.card} duration={DURATION.card}>
						<span className={`${NO_LABEL} inline-block rotate-[1deg]`} style={NO_OUTLINE}>
							{NOS[1]}
						</span>
					</RevealItem>
					<RevealItem y={DISTANCE.card} duration={DURATION.card}>
						<span className={`${NO_LABEL} inline-block -rotate-[1deg]`} style={NO_OUTLINE}>
							{NOS[2]}
						</span>
					</RevealItem>
				</RevealStagger>

				<Reveal
					as="p"
					delay={0.1}
					className="mx-auto mt-14 max-w-[640px] text-center font-sans text-[18px] italic leading-relaxed text-brand-blue md:text-[20px]"
				>
					Just real people, real conversations, and a pipeline that grows season after
					season.
				</Reveal>
			</div>
		</section>
	);
}
