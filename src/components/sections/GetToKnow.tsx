// GetToKnow — "Get to know Fire Island" heading, island map graphic,
// and a short italic paragraph underneath. The island map (with its own
// "GREAT SOUTH BAY" / "ATLANTIC OCEAN" labels and wave decorations) is
// a single asset rendered as-is.

import FireIslandMap from "@/components/ui/FireIslandMap";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION } from "@/lib/motion";


export default function GetToKnow() {
	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<RevealStagger className="mx-auto w-full max-w-site px-4 md:px-8">
				<RevealItem as="h2" className="font-sans text-xl font-medium uppercase tracking-wider text-brand-blue md:text-2xl">
					Get to know
					<span className="mt-1 block font-script text-[44px] font-normal normal-case leading-none tracking-normal md:mt-2 md:text-[56px]">
						Fire Island
					</span>
				</RevealItem>
			</RevealStagger>

			<Reveal y={DISTANCE.card} duration={DURATION.card} delay={0.1} className="mx-auto mt-8 w-full max-w-[1400px] px-4 md:mt-10 md:px-8">
				<FireIslandMap />
			</Reveal>

			<Reveal delay={0.15} className="mx-auto mt-8 w-full max-w-[900px] px-4 md:mt-10 md:px-8">
				<p className="text-left font-body text-[17px] font-semibold italic leading-relaxed text-[#1a5c89] md:text-center md:text-[19px]">
					Fire Island is all about community—and so are we. Whether you&apos;re looking for a rental, searching for your dream home, need the perfect renter for your property, are ready to sell OR just want a great contractor recommendation, we&apos;re here for it.
				</p>
			</Reveal>
		</section>
	);
}
