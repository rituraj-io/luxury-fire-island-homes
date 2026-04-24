// AreaBlock — reusable editorial content block for /area/[slug]. Renders a
// single block from the area's `blocks` array as a centered column with a
// script headline and stacked body paragraphs. The band color alternates
// between cream and blue-gray based on the `background` prop so consecutive
// blocks don't collide visually.

import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import type { AreaBlock as AreaBlockData } from "@/lib/areas";


type Background = "cream" | "blue-gray";


type Props = {
	block: AreaBlockData;
	background?: Background;
};


const BG: Record<Background, string> = {
	cream: "bg-[#f8f4ec]",
	"blue-gray": "bg-[#dce5ef]",
};


export default function AreaBlock({ block, background = "cream" }: Props) {
	return (
		<section className={`w-full py-16 md:py-20 ${BG[background]}`}>
			<RevealStagger className="mx-auto flex w-full max-w-[720px] flex-col items-center px-4 text-center md:px-8">
				<RevealItem
					as="h2"
					className="font-script text-[36px] leading-[1.1] text-brand-blue md:text-[48px] lg:text-[56px]"
				>
					{block.heading}
				</RevealItem>

				{block.body.map((p, i) => (
					<RevealItem
						key={i}
						as="p"
						className="mt-6 text-left font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						{p}
					</RevealItem>
				))}
			</RevealStagger>
		</section>
	);
}
