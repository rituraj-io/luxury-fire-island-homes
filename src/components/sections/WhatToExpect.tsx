// WhatToExpect — yellow-band section listing every benefit of selling with the
// team. Each tile is a 3D flip card: cream-faced title flips on hover to reveal
// the blue-gray back with the supporting copy. The first card opens pre-flipped
// (back-side visible) so the section reads as a worked example on landing.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";


type Card = {
	title: string;
	body: string;
};


const CARDS: Card[] = [
	{
		title: "1-Year Home Warranty – On Us.",
		body: "Every listing comes with a free one-year home warranty. Peace of mind for buyers, faster offers for you, and zero out-of-pocket cost — it's our gift to keep the deal stress-free from contract to close.",
	},
	{
		title: "Marketing That Actually Sells Homes",
		body: "We’re not talking about fancy tech or flashy buzzwords. We’re talking about real-world marketing that puts your home in front of the right buyers—fast. Beautiful photography, well-written listings, personal outreach to serious buyers, and showcasing your home like it’s the cover of a magazine.",
	},
	{
		title: "Certified Home Program",
		body: "No surprises, no drama. We make sure everything’s ready before your home hits the market—inspections, paperwork, disclosures—so your home stands out, sells faster, and avoids last-minute headaches.",
	},
	{
		title: "A Local, Full-Service Team",
		body: "We know Fire Island. We know who’s buying, what they’re looking for, and how to make your home shine. From pricing to prepping to even helping buyers get to showings (ferries and all), we handle every detail so you don’t have to lift a finger.",
	},
	{
		title: "Clear Communication, Always",
		body: "You’ll never have to chase us for an update. We’re proactive, responsive, and borderline obsessed with keeping you in the loop. No ghosting. No vague answers. Just real updates from a real team who cares.",
	},
	{
		title: "Guaranteed Sale—In Writing",
		body: "We don’t just say we’ll sell your home—we put it in writing. That means peace of mind for you, and real accountability for us. Your home will sell. Period.",
	},
	{
		title: "Need Help Getting the House Ready? We’ve Got You.",
		body: "We’re plugged into the best locals on the island—whether you need help clearing out the house, sprucing up the yard, or deep cleaning before showings. Take Sebastian, our go-to handyman: he helped our Seaview clients pack up their beach house and settle into their Upper West Side apartment. We don’t just sell your home—we help you through the whole transition.",
	},
	{
		title: "Selling to an Investor? We Speak Their Language.",
		body: "We’re investors ourselves, so we know how to pitch a property for maximum ROI. We’ll put together a full offering plan with your rental history and value-add potential. Cap rate? NOI? Cash-on-cash return? We’ve got it covered—positioning your home as a smart, income-generating opportunity that investors can’t pass up.",
	},
];


export default function WhatToExpect() {
	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[32px] leading-[1.1] text-brand-blue md:text-[48px] lg:text-[56px]"
				>
					Here’s What You Can Expect when you Sell with Us:
				</Reveal>

				<Reveal
					delay={0.05}
					className="mx-auto mt-3 max-w-[720px] text-center font-body text-[14px] italic leading-relaxed text-brand-blue md:mt-4 md:text-[16px]"
				>
					If you’re thinking all real estate companies are the same…
					well listen to this.
				</Reveal>

				<RevealStagger
					gap={STAGGER.card}
					className="mx-auto mt-10 grid w-full grid-cols-2 gap-2 md:mt-12 md:grid-cols-4 md:gap-3"
				>
					{CARDS.map((card) => (
						<RevealItem key={card.title} y={DISTANCE.card} duration={DURATION.card}>
							<FlipCard card={card} />
						</RevealItem>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}


function FlipCard({ card }: { card: Card }) {
	return (
		<div
			tabIndex={0}
			className="group relative h-full min-h-[260px] cursor-pointer outline-none [perspective:1200px] md:min-h-[280px]"
		>
			<div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
				{/* Front — cream tile, uppercase title */}
				<div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#fffbf8] p-5 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] md:p-6">
					<h3 className="text-center font-sans text-[16px] font-medium uppercase leading-[1.35] tracking-wider text-brand-blue md:text-[17px]">
						{card.title}
					</h3>
				</div>

				{/* Back — blue-gray tile, body copy */}
				<div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#dce5ef] p-4 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] md:p-5">
					<p className="text-center font-body text-[11.5px] leading-[1.45] text-brand-blue md:text-[12.5px]">
						{card.body}
					</p>
				</div>
			</div>
		</div>
	);
}
