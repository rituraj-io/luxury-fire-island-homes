// PropertyNeighborhood — blue-gray band on /rentals/[slug]. Script heading
// followed by a two-column layout on desktop: descriptive paragraphs on the
// left, a simple map placeholder card on the right. Mobile stacks the
// paragraphs over the map placeholder. The map is a static visual for now;
// a real map integration can swap in later without touching the layout.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION } from "@/lib/motion";
import type { Rental } from "@/lib/rentals";


type Props = { rental: Rental };


export default function PropertyNeighborhood({ rental }: Props) {
	if (!rental.neighborhood) return null;
	const n = rental.neighborhood;

	return (
		<section className="w-full bg-[#dce5ef] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
				<Reveal
					as="p"
					className="text-center font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-brand-blue md:text-[13px]"
				>
					Where you&apos;ll be
				</Reveal>

				<Reveal
					as="h2"
					delay={0.05}
					className="mx-auto mt-4 max-w-[780px] text-center font-script text-[36px] leading-[1.1] text-brand-blue md:text-[48px] lg:text-[56px]"
				>
					{n.heading}
				</Reveal>

				<div className="mt-12 grid gap-10 min-[992px]:grid-cols-[1.1fr_1fr] min-[992px]:items-start min-[992px]:gap-14">
					<RevealStagger>
						{n.body.map((p, i) => (
							<RevealItem
								key={i}
								as="p"
								className={`font-body text-[15px] leading-relaxed text-black md:text-[16px] ${
									i === 0 ? "" : "mt-5"
								}`}
							>
								{p}
							</RevealItem>
						))}

						<RevealItem className="mt-8">
							<p className="font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue">
								{rental.location}
							</p>
						</RevealItem>
					</RevealStagger>

					<Reveal
						y={DISTANCE.card}
						duration={DURATION.card}
						delay={0.1}
						className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-white shadow-md md:aspect-[4/3]"
					>
						{/* Map placeholder — uses the existing Fire Island illustration.
						    Swap for an embedded live map when the integration lands. */}
						<Image
							src="/assets/images/ocean-waves-graphic.webp"
							alt="Map of Fire Island showing community locations"
							fill
							sizes="(min-width: 992px) 40vw, 100vw"
							className="object-cover"
						/>
						<div
							aria-hidden
							className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange ring-4 ring-brand-orange/30"
						/>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
