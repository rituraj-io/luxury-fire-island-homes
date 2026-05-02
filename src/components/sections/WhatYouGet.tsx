// WhatYouGet — "Here's what you get:" yellow band with a flip-card grid of
// buyer perks and a closing "BOTTOM LINE?" stanza. Cards mirror the sell
// page's WhatToExpect: cream-faced title flips 180° on hover to reveal a
// blue-gray back with the supporting copy. Sits directly below WhereWeComeIn;
// its yellow matches the circle at the end of that section's timeline line,
// so the line bleeds cleanly into this band.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { STAGGER } from "@/lib/motion";
import type { BuySection3, BuySection3Card } from "@/lib/cms";


// Editorial fallback for the back-side copy. CMS card hoverText takes
// precedence; this map fills in the blanks when the CMS leaves a card without
// supporting copy. Keys are matched against the trimmed mainText.
const HOVER_FALLBACK: Record<string, string> = {
	"1-Year Home Warranty – On us.":
		"Even dream homes come with surprises. This covers you for the “just in case” moments, so you can breathe easy post-closing.",
	"Early Access to Homes Before they hit the market":
		"A first look at homes before the rest of the island hears about them — find your dream home before other buyers do.",
	"$100 Off Attorney Services":
		"We’ve teamed up with trusted local attorneys who make the paperwork painless and FAST — and pass the savings on to you.",
	"Buyer Satisfaction Guarantee":
		"Not loving your Fire Island home within the first year? We’ll list it and sell it for free.* We’re that confident you’re going to love it.",
	"Cancel Anytime Promise":
		"If we don’t live up to our word before you go under contract, you can walk away — no pressure, no awkwardness, no strings.",
	"Post-Closing Support":
		"Need the name of the best (and semi-reliable) plumber? Trying to find a contractor? We’re here. Text us anytime.",
	"We’ll Rent Your Home & Make You Money":
		"Not spending the whole summer on Fire Island? We won’t judge (well, maybe a little). But if your house is just sitting empty — why not let it pay for itself?",
	"Your Wallet Deserves a Vacation Too":
		"Yes, you’re buying a second home, but that doesn’t mean you’re looking to light money on fire. Just like you want the right house, you also deserve the right financing.",
};


const FALLBACK: BuySection3 = {
	headline: "Here’s what you get:",
	bottomline: "We want you in your dream home, without draining your vacation fund.",
	cards: [
		{ mainText: "1-Year Home Warranty – On us.", hoverText: "" },
		{ mainText: "Early Access to Homes Before they hit the market", hoverText: "" },
		{ mainText: "$100 Off Attorney Services", hoverText: "" },
		{ mainText: "Buyer Satisfaction Guarantee", hoverText: "" },
		{ mainText: "Cancel Anytime Promise", hoverText: "" },
		{ mainText: "Post-Closing Support", hoverText: "" },
		{ mainText: "We’ll Rent Your Home & Make You Money", hoverText: "" },
		{ mainText: "Your Wallet Deserves a Vacation Too", hoverText: "" },
	],
};


function resolveHover(card: BuySection3Card): string {
	const cmsText = (card.hoverText || "").trim();
	if (cmsText) return cmsText;
	return HOVER_FALLBACK[card.mainText.trim()] ?? "";
}


export default function WhatYouGet({ data }: { data?: BuySection3 }) {
	const d = data ?? FALLBACK;

	return (
		<section className="w-full bg-brand-yellow pb-16 pt-36 md:pb-20 md:pt-40">
			<div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[40px] leading-none text-brand-blue md:text-[52px]"
				>
					{d.headline}
				</Reveal>

				<RevealStagger
					gap={STAGGER.card}
					className="mx-auto mt-10 grid w-full grid-cols-2 gap-2 md:mt-12 md:grid-cols-4 md:gap-3"
				>
					{d.cards.map((card) => (
						<RevealItem key={card.mainText}>
							<FlipCard front={card.mainText} back={resolveHover(card)} />
						</RevealItem>
					))}
				</RevealStagger>

				<Reveal
					as="h3"
					delay={0.05}
					className="mt-14 text-center font-sans text-[24px] font-bold uppercase tracking-wider text-brand-blue md:mt-16"
				>
					Bottom Line?
				</Reveal>

				<Reveal
					as="p"
					delay={0.1}
					className="mx-auto mt-4 max-w-[640px] text-center font-sans text-[22px] font-semibold italic leading-relaxed text-brand-blue"
				>
					{d.bottomline}
				</Reveal>
			</div>
		</section>
	);
}


function FlipCard({ front, back }: { front: string; back: string }) {
	return (
		<div
			tabIndex={0}
			className="group relative h-full min-h-[200px] cursor-pointer outline-none [perspective:1200px] md:min-h-[220px]"
		>
			<div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
				{/* Front — cream tile, uppercase title */}
				<div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#fffbf8] p-5 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] md:p-6">
					<h3 className="text-center font-sans text-[15px] font-medium uppercase leading-[1.35] tracking-wider text-brand-blue md:text-[17px]">
						{front}
					</h3>
				</div>

				{/* Back — blue-gray tile, body copy */}
				<div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#dce5ef] p-4 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] md:p-5">
					<p className="text-center font-body text-[12.5px] leading-[1.45] text-brand-blue md:text-[13.5px]">
						{back}
					</p>
				</div>
			</div>
		</div>
	);
}
