// SoonerQuote — testimonial moment on /manage. Blue-gray band, a short
// lead-in, then a tilted white "polaroid" card with the page's biggest
// typographic gesture: the "Why didn't I do this sooner?" pull quote in
// script. Closes with the context line about full-service management.
//
// The card is intentionally the visual anchor of the page — shadow-2xl,
// slight -3deg tilt, generous padding — so the quote reads as an artifact,
// not decoration.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION } from "@/lib/motion";


export default function SoonerQuote() {
	return (
		<section className="w-full overflow-hidden bg-[#dce5ef] py-16 md:py-24">
			<RevealStagger className="mx-auto flex w-full max-w-[720px] flex-col items-center px-4 text-center md:px-8">
				<RevealItem
					as="p"
					className="font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					Most of our clients come to us after trying to do it all themselves: zero bookings,
					flaky guests, bad reviews—you name it.
				</RevealItem>

				<RevealItem
					as="p"
					className="mt-5 font-body text-[15px] font-semibold italic leading-relaxed text-brand-blue md:text-[16px]"
				>
					Then they hand it over to us and say:
				</RevealItem>

				<RevealItem
					y={DISTANCE.card}
					duration={DURATION.card}
					className="relative mt-10 w-full max-w-[620px] -rotate-[3deg] bg-[#fffbf8] px-6 py-14 shadow-2xl md:px-12 md:py-20"
				>
					<blockquote className="font-script text-[44px] leading-[1] text-brand-blue md:text-[72px] lg:text-[88px]">
						<span
							aria-hidden
							className="mr-2 inline-block align-top font-script text-[64px] leading-none text-brand-blue/30 md:text-[96px] lg:text-[120px]"
						>
							&ldquo;
						</span>
						Why didn&apos;t I do this sooner?&rdquo;
					</blockquote>
				</RevealItem>

				<RevealItem
					as="p"
					className="mt-14 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					That&apos;s the power of local, full-service rental management (and a team that
					actually knows what they&apos;re doing).
				</RevealItem>
			</RevealStagger>
		</section>
	);
}
