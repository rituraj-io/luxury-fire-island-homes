// NotYourHouse — problem + diagnosis section for /manage. Centered editorial
// column over a cream band, flanked by tilted decorative photos (left cluster
// of two, right single photo with the yellow brand seal) — same visual
// vocabulary as AreYouSure on /sell. Contains the "It's probably not your
// house—it's your strategy" pull-quote card in the middle and closes with
// the LFIH pitch paragraph.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import Bob from "@/components/motion/Bob";
import { DISTANCE, DURATION } from "@/lib/motion";


export default function NotYourHouse() {
	return (
		<section className="relative w-full overflow-hidden bg-[#f8f4ec] py-16 md:py-20">
			<div className="relative mx-auto w-full max-w-[1180px] px-4 md:px-8">
				{/* Decorative photo clusters — desktop only */}
				<div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[992px]:block">
					{/* Left cluster — two stacked photos, scales as one unit */}
					<div className="absolute left-[1%] top-[18%] w-[20%] aspect-[4/7]">
						<Bob
							className="absolute left-[14%] top-0 w-[90%]"
							delay={0.1}
							amplitude={3}
							duration={2.8}
						>
							<div className="-rotate-[3deg]">
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

						<Bob
							className="absolute -left-[6%] top-[40%] w-[82%]"
							delay={0.6}
							amplitude={4}
							duration={3.2}
						>
							<div className="-rotate-[7deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image
										src="/assets/images/cornfield-farmhouse.webp"
										alt=""
										width={580}
										height={779}
										sizes="13vw"
										className="h-auto w-full"
									/>
								</div>
							</div>
						</Bob>
					</div>

					{/* Right cluster — single photo with brand seal */}
					<div className="absolute right-[1%] top-[26%] w-[22%]">
						<Bob delay={0.3} amplitude={3.5} duration={3}>
							<div className="rotate-[8deg]">
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
						<div className="absolute -bottom-[36%] -right-[8%] flex aspect-square w-[50%] items-center justify-center rounded-full bg-brand-yellow p-1.5 shadow-lg">
							<Image
								src="/assets/images/logo-seal-blue.svg"
								alt="Luxury Fire Island Homes"
								width={120}
								height={120}
								className="h-full w-full rotate-[4deg]"
							/>
						</div>
					</div>
				</div>

				{/* Centered editorial column */}
				<RevealStagger className="relative mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
					<RevealItem
						as="p"
						className="font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						You&apos;re not alone.
					</RevealItem>

					<RevealItem
						as="h2"
						className="mt-2 font-script text-[40px] leading-[1.05] text-brand-blue md:text-[54px] lg:text-[60px]"
					>
						The rental market&apos;s changing—and fast.
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-8 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Today&apos;s guests expect more, compare more, and are tempted by everything from
						boutique hotels to European getaways (yes, even the ones with free breakfast and
						towel swans).
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-5 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Still, your home{" "}
						<span className="font-semibold italic">shouldn&apos;t</span> be sitting empty.
						Especially not when it&apos;s in the perfect location, full of charm, and has{" "}
						<span className="font-semibold italic">that</span> outdoor shower everyone dreams
						about.
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-5 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						And if you&apos;re still the one posting in Facebook groups, chasing down renters,
						or watching your Airbnb calendar sit blank… something&apos;s not working. Especially
						if your &ldquo;management team&rdquo; is MIA when it actually counts.
					</RevealItem>

					{/* Pull-quote card — the diagnosis */}
					<RevealItem
						y={DISTANCE.card}
						duration={DURATION.card}
						className="mt-10 w-full bg-[#fffbf8] px-6 py-7 shadow-sm md:px-8 md:py-8"
					>
						<p className="font-body text-[15px] leading-relaxed text-black md:text-[16px]">
							But here&apos;s the thing:
						</p>
						<p className="mt-3 font-body text-[18px] font-semibold italic leading-relaxed text-[#1a5c89] md:text-[20px]">
							It&apos;s probably not your house—it&apos;s your strategy.
						</p>
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-10 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Renters today want more than just a bed and a BBQ. They want the full experience:
						clean, styled, easy-to-book homes, quick responses, and someone local they can call
						when they can&apos;t figure out the TV remote (it happens).
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-8 font-script text-[32px] leading-[1.1] text-brand-blue md:text-[40px]"
					>
						That&apos;s where we come in.
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-6 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						At Luxury Fire Island Homes, we don&apos;t just throw your listing online and cross
						our fingers. We position your home, market it like a pro, and manage the entire
						guest experience—so you get{" "}
						<span className="font-semibold italic">more bookings, better guests,</span> and the{" "}
						<span className="font-semibold italic">highest possible income</span> without the
						stress.
					</RevealItem>
				</RevealStagger>
			</div>

			{/* Mobile-only decorative row — slimmed-down echo of the desktop clusters */}
			<Reveal
				y={DISTANCE.card}
				duration={DURATION.card}
				className="relative mx-auto mt-12 flex w-full max-w-[420px] items-center justify-center gap-6 px-4 min-[992px]:hidden"
			>
				<div className="w-[42%] -rotate-[3deg]">
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
				<div className="relative w-[46%] rotate-[8deg]">
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
					<div className="absolute -bottom-[22%] -right-[8%] flex aspect-square w-[50%] items-center justify-center rounded-full bg-brand-yellow p-1 shadow-lg">
						<Image
							src="/assets/images/logo-seal-blue.svg"
							alt="Luxury Fire Island Homes"
							width={80}
							height={80}
							className="h-full w-full rotate-[4deg]"
						/>
					</div>
				</div>
			</Reveal>
		</section>
	);
}
