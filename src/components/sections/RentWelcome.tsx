// RentWelcome — section 2 of /current-rentals. Cream band with a centered
// media (the CMS-provided videoUrl, which currently resolves to a still
// image), a script headline, and the intro paragraphs underneath.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { paragraphs, type RentSection2 } from "@/lib/cms";


const FALLBACK: RentSection2 = {
	headline: "Welcome to finding your Vacation Home, the Right Way.",
	videoUrl: "",
	introText:
		"Stop overpaying on Airbnb.\nStop scrolling through sketchy listings.\n\nAnd stop wasting time on agents who ghost you, owners who cancel last minute, or homes that look nothing like the photos.",
};


export default function RentWelcome({ data }: { data?: RentSection2 }) {
	const d = data ?? FALLBACK;
	const intro = paragraphs(d.introText);

	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[36px] leading-[1.1] text-brand-blue md:text-[52px]"
				>
					{d.headline}
				</Reveal>

				{d.videoUrl ? (
					<Reveal
						delay={0.05}
						className="mx-auto mt-10 aspect-[16/9] w-full max-w-[860px] overflow-hidden rounded-lg shadow-xl md:mt-12"
					>
						<div className="relative h-full w-full">
							<Image
								src={d.videoUrl}
								alt={d.headline}
								fill
								sizes="(min-width: 1024px) 860px, 100vw"
								className="object-cover"
							/>
						</div>
					</Reveal>
				) : null}

				<div className="mx-auto mt-10 max-w-[640px] text-center font-body text-[15px] leading-relaxed text-black md:mt-12 md:text-[16px]">
					{intro.map((p, i) => (
						<Reveal
							key={i}
							as="p"
							delay={0.05 + i * 0.05}
							className={i === 0 ? "" : "mt-5"}
						>
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
