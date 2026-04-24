// JoinBrokerage — cream editorial column on /join covering the PDF's opening
// "Why Join the Luxury Fire Island Homes Team" + "A Brokerage Built for the
// Way Fire Island Actually Works" blocks. Same centered-column vocabulary as
// AreYouSure and NotYourHouse, with a pull-quote card for the "we run on
// trust, relationships, and knowing the island better than anyone else" line.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import Image from "next/image";
import Bob from "@/components/motion/Bob";
import { DISTANCE, DURATION } from "@/lib/motion";


export default function JoinBrokerage() {
	return (
		<section className="relative w-full overflow-hidden bg-[#f8f4ec] py-16 md:py-20">
			<div className="relative mx-auto w-full max-w-[1180px] px-4 md:px-8">
				{/* Decorative flanking photos — desktop only */}
				<div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[992px]:block">
					<div className="absolute left-[1%] top-[18%] w-[20%]">
						<Bob delay={0.2} amplitude={3} duration={3}>
							<div className="-rotate-[5deg]">
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

					<div className="absolute right-[1%] top-[26%] w-[20%]">
						<Bob delay={0.55} amplitude={3.5} duration={3.2}>
							<div className="rotate-[6deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image
										src="/assets/images/photo-3.webp"
										alt=""
										width={600}
										height={450}
										sizes="15vw"
										className="h-auto w-full"
									/>
								</div>
							</div>
						</Bob>
					</div>
				</div>

				<RevealStagger className="relative mx-auto flex w-full max-w-[620px] flex-col items-center text-center">
					<RevealItem
						as="p"
						className="font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Let&apos;s start with the most important thing:
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-3 font-body text-[16px] font-semibold italic leading-relaxed text-brand-blue md:text-[18px]"
					>
						we have a really good time doing this.
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-8 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Fire Island real estate is seasonal, relationship-driven, and sometimes
						delightfully chaotic—in the best way. We believe if you&apos;re going to work
						hard, you should also enjoy the people you&apos;re working with, laugh a lot, and
						feel genuinely supported while you grow.
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-5 font-body text-[15px] italic leading-relaxed text-black md:text-[16px]"
					>
						If that sounds like your kind of vibe, keep reading.
					</RevealItem>

					<RevealItem
						as="h2"
						className="mt-14 font-script text-[36px] leading-[1.05] text-brand-blue md:text-[48px] lg:text-[54px]"
					>
						A Brokerage Built for the Way Fire Island Actually Works
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-8 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						<span className="font-semibold">Luxury Fire Island Homes</span> is a
						hyper-local brokerage focused exclusively on Fire Island sales, rentals, and
						property management. We&apos;re here year-round, deeply connected to the
						community, and known for doing things thoughtfully—without the stress,
						pressure, or ego.
					</RevealItem>

					{/* Pull-quote card */}
					<RevealItem
						y={DISTANCE.card}
						duration={DURATION.card}
						className="mt-10 w-full bg-[#fffbf8] px-6 py-7 shadow-sm md:px-8 md:py-8"
					>
						<p className="font-body text-[15px] leading-relaxed text-black md:text-[16px]">
							We don&apos;t run on cold calls, scripts, or competition inside the office.
						</p>
						<p className="mt-3 font-body text-[18px] font-semibold italic leading-relaxed text-[#1a5c89] md:text-[20px]">
							We run on trust, relationships, and knowing the island better than anyone
							else.
						</p>
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-8 font-body text-[15px] italic leading-relaxed text-black md:text-[16px]"
					>
						(And yes, we still take the business very seriously.)
					</RevealItem>
				</RevealStagger>
			</div>

			{/* Mobile-only decorative row */}
			<Reveal
				y={DISTANCE.card}
				duration={DURATION.card}
				className="relative mx-auto mt-12 flex w-full max-w-[420px] items-center justify-center gap-6 px-4 min-[992px]:hidden"
			>
				<div className="w-[42%] -rotate-[5deg]">
					<div className="overflow-hidden border-4 border-white shadow-xl">
						<Image
							src="/assets/images/bbq-umbrella.webp"
							alt=""
							width={885}
							height={752}
							sizes="40vw"
							className="h-auto w-full"
						/>
					</div>
				</div>
				<div className="w-[46%] rotate-[6deg]">
					<div className="overflow-hidden border-4 border-white shadow-xl">
						<Image
							src="/assets/images/photo-3.webp"
							alt=""
							width={600}
							height={450}
							sizes="44vw"
							className="h-auto w-full"
						/>
					</div>
				</div>
			</Reveal>
		</section>
	);
}
