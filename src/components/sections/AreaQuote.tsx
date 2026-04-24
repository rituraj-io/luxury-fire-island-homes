// AreaQuote — closing pull-quote card for /area/[slug]. Yellow band with a
// centered white card carrying a script pull quote in brand blue, flanked by
// oversized faded opening and closing quote glyphs. Lighter weight than the
// /manage SoonerQuote polaroid — the community page's quote is a graceful
// send-off, not a page anchor.

import Reveal from "@/components/motion/Reveal";
import { DISTANCE, DURATION } from "@/lib/motion";


type Props = { quote: string };


export default function AreaQuote({ quote }: Props) {
	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<Reveal
				y={DISTANCE.card}
				duration={DURATION.card}
				className="relative mx-auto w-full max-w-[780px] bg-[#fffbf8] px-8 py-12 shadow-xl md:px-14 md:py-16"
			>
				<span
					aria-hidden
					className="pointer-events-none absolute left-3 top-0 font-script text-[96px] leading-none text-brand-blue/20 md:left-5 md:text-[140px]"
				>
					&ldquo;
				</span>
				<span
					aria-hidden
					className="pointer-events-none absolute bottom-0 right-3 font-script text-[96px] leading-none text-brand-blue/20 md:bottom-2 md:right-5 md:text-[140px]"
				>
					&rdquo;
				</span>

				<blockquote className="relative text-center font-script text-[26px] leading-[1.2] text-brand-blue md:text-[34px] lg:text-[40px]">
					{quote}
				</blockquote>
			</Reveal>
		</section>
	);
}
