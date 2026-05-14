// RentTruth — section 5 of /current-rentals. Blue-gray band, centered:
// script "The Truth?" headline and a supporting paragraph from CMS.

import Reveal from "@/components/motion/Reveal";
import { paragraphs, type RentSection5 } from "@/lib/cms";


const FALLBACK: RentSection5 = {
	headline: "The Truth?",
	description:
		"Our Clients Come for the Homes... But Stay for the Service.\nYou don’t just want “a rental”—you want someone who listens, follows through, and treats\nyour vacation like it actually matters. That’s us.",
};


export default function RentTruth({ data }: { data?: RentSection5 }) {
	const d = data ?? FALLBACK;
	const paras = paragraphs(d.description);

	return (
		<section className="w-full bg-[#dce5ef] py-16 md:py-20">
			<div className="mx-auto flex w-full max-w-[760px] flex-col items-center px-4 text-center md:px-8">
				<Reveal
					as="h2"
					className="font-script text-[40px] leading-[1.1] text-brand-blue md:text-[56px]"
				>
					{d.headline}
				</Reveal>

				<div className="mt-6 space-y-4 font-body text-[15px] leading-relaxed text-black md:mt-8 md:text-[16px]">
					{paras.map((p, i) => (
						<Reveal as="p" key={i} delay={0.05 + i * 0.05}>
							{p.split("\n").map((line, j, all) => (
								<span key={j}>
									{line}
									{j < all.length - 1 ? <br /> : null}
								</span>
							))}
						</Reveal>
					))}
				</div>

			</div>
		</section>
	);
}
