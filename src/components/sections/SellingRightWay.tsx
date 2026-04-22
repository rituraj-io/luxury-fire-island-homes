// SellingRightWay — centered copy block on a muted blue-gray band. Script
// headline, three stacked body paragraphs (the third leading with a bold-italic
// emphasis line), and a single primary-orange CTA.

import Link from "next/link";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION } from "@/lib/motion";


export default function SellingRightWay() {
	return (
		<section className="w-full bg-[#dce5ef] py-16 md:py-20">
			<RevealStagger className="mx-auto flex w-full max-w-[640px] flex-col items-center px-4 text-center md:px-8">
				<RevealItem
					as="h2"
					className="font-script text-[36px] leading-[1.1] text-brand-blue md:text-[52px] lg:text-[60px]"
				>
					Welcome to Selling, the Right Way.
				</RevealItem>

				<RevealItem
					as="p"
					className="mt-8 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					At Luxury Fire Island Homes, we’re not just listing your home—we’re strategically
					marketing it, positioning it, and presenting it to the right buyers at the right time
					(hint: that’s now).
				</RevealItem>

				<RevealItem
					as="p"
					className="mt-6 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					Our team lives and breathes this island,
					<br />
					and we know exactly what makes a buyer say “this is the one.”
				</RevealItem>

				<RevealItem
					as="p"
					className="mt-6 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					<span className="font-semibold italic">
						And when we say we handle everything—we mean everything.
					</span>
					<br />
					Plus we sell homes in every single Fire Island community - from Davis Park to Kismet.
				</RevealItem>

				<RevealItem y={DISTANCE.card} duration={DURATION.card} className="mt-10">
					<Link
						href="#lets-do-it"
						className="inline-block bg-brand-orange px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
					>
						Let’s Do It
					</Link>
				</RevealItem>
			</RevealStagger>
		</section>
	);
}
