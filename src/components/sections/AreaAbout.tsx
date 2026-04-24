// AreaAbout — cream band on /area/[slug]. Small uppercase eyebrow linking
// the page back to the community name, a centered script headline, and one
// or more body paragraphs. Flanked on desktop by two tilted decorative
// photos reused from the site's collage library — enough to give the page
// the same editorial feel as the /sell and /manage intros without requiring
// a custom photo set per community.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import Bob from "@/components/motion/Bob";
import { DISTANCE, DURATION } from "@/lib/motion";
import type { Area } from "@/lib/areas";


type Props = { area: Area };


export default function AreaAbout({ area }: Props) {
	return (
		<section className="relative w-full overflow-hidden bg-[#f8f4ec] py-16 md:py-20">
			<div className="relative mx-auto w-full max-w-[1180px] px-4 md:px-8">
				{/* Decorative photo clusters — desktop only */}
				<div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[992px]:block">
					<div className="absolute left-[1%] top-[14%] w-[18%]">
						<Bob delay={0.2} amplitude={3.5} duration={3}>
							<div className="-rotate-[6deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image
										src="/assets/images/blue-door-house.webp"
										alt=""
										width={886}
										height={750}
										sizes="15vw"
										className="h-auto w-full"
									/>
								</div>
							</div>
						</Bob>
					</div>

					<div className="absolute right-[1%] top-[22%] w-[20%]">
						<Bob delay={0.5} amplitude={3} duration={2.8}>
							<div className="rotate-[7deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image
										src="/assets/images/bbq-umbrella.webp"
										alt=""
										width={885}
										height={752}
										sizes="15vw"
										className="h-auto w-full"
									/>
								</div>
							</div>
						</Bob>
					</div>
				</div>

				<RevealStagger className="relative mx-auto flex w-full max-w-[640px] flex-col items-center text-center">
					<RevealItem
						as="p"
						className="font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[14px]"
					>
						{area.name}, Fire Island
					</RevealItem>

					<RevealItem
						as="h2"
						className="mt-4 font-script text-[36px] leading-[1.05] text-brand-blue md:text-[48px] lg:text-[56px]"
					>
						{area.about.heading}
					</RevealItem>

					{area.about.body.map((p, i) => (
						<RevealItem
							key={i}
							as="p"
							className="mt-6 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
						>
							{p}
						</RevealItem>
					))}
				</RevealStagger>
			</div>

			{/* Mobile-only decorative row */}
			<Reveal
				y={DISTANCE.card}
				duration={DURATION.card}
				className="relative mx-auto mt-10 flex w-full max-w-[420px] items-center justify-center gap-6 px-4 min-[992px]:hidden"
			>
				<div className="w-[42%] -rotate-[4deg]">
					<div className="overflow-hidden border-4 border-white shadow-xl">
						<Image
							src="/assets/images/blue-door-house.webp"
							alt=""
							width={886}
							height={750}
							sizes="40vw"
							className="h-auto w-full"
						/>
					</div>
				</div>
				<div className="w-[46%] rotate-[7deg]">
					<div className="overflow-hidden border-4 border-white shadow-xl">
						<Image
							src="/assets/images/bbq-umbrella.webp"
							alt=""
							width={885}
							height={752}
							sizes="44vw"
							className="h-auto w-full"
						/>
					</div>
				</div>
			</Reveal>
		</section>
	);
}
