// AreYouSure — second section on /sell. Centered editorial column over a cream
// band, flanked by tilted decorative photos (left cluster of two, right single
// photo with the yellow brand seal). Contains a cream pull-quote card in the
// middle and an orange CTA at the bottom.

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import Bob from "@/components/motion/Bob";
import { DISTANCE, DURATION } from "@/lib/motion";


export default function AreYouSure() {
	return (
		<section className="relative w-full overflow-hidden bg-[#f8f4ec] py-16 md:py-20">
			<div className="relative mx-auto w-full max-w-[1180px] px-4 md:px-8">
				{/* ---- Decorative photo clusters (desktop only) ---- */}
				<div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[992px]:block">
					{/* Left cluster — two stacked photos, scales as one unit */}
					<div className="absolute left-[1%] top-[14%] w-[20%] aspect-[4/7]">
						<Bob
							className="absolute left-[14%] top-0 w-[90%]"
							delay={0.1}
							amplitude={3}
							duration={2.8}
						>
							<div className="-rotate-[3deg]">
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

					{/* Right cluster — single photo with brand seal, scales as one unit */}
					<div className="absolute right-[1%] top-[22%] w-[22%]">
						<Bob delay={0.3} amplitude={3.5} duration={3}>
							<div className="rotate-[8deg]">
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

				{/* ---- Centered editorial column ---- */}
				<RevealStagger className="relative mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
					<RevealItem
						as="p"
						className="font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						First of all…
					</RevealItem>

					<RevealItem
						as="h2"
						className="mt-1 font-script text-[44px] leading-[1.05] text-brand-blue md:text-[56px] lg:text-[64px]"
					>
						Are you sure you want to sell?
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-8 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Like, really really really sure?
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-5 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Because as your local fire island real estate agents,
						<br />
						we feel morally obligated to ask:
					</RevealItem>

					{/* Pull-quote card */}
					<RevealItem
						y={DISTANCE.card}
						duration={DURATION.card}
						className="mt-8 w-full bg-[#fffbf8] px-6 py-6 shadow-sm md:px-8 md:py-7"
					>
						<p className="font-body text-[16px] font-semibold italic leading-relaxed text-[#1a5c89] md:text-[18px]">
							Are you sure you’re done with barefoot coffee strolls, beach hair that somehow
							counts as a style, and sunsets that make everyone in your group chat jealous?
						</p>
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-8 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						That said… the Fire Island market has jumped{" "}
						<span className="font-semibold">
							over 30% in the last three years (aka a potential $300,000 more in your pocket)
						</span>
						, so who are we to stop you from walking away with a giant pile of cash and a smug
						little smile?
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-5 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						We also get that life changes. Maybe the community around you has shifted, your needs
						have evolved, or you’re simply craving a different (read: quieter) vibe.
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-5 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						Or maybe you’re just done listening to the renters’ kids next door scream about
						cannonballs at 11 a.m. (We don’t blame you.)
					</RevealItem>

					<RevealItem
						as="p"
						className="mt-5 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
					>
						<span className="font-semibold">Let’s be honest</span>—if you’re going to part ways
						with your beach house, this is the time to do it. And we’re the team that will make
						it seamless, strategic, and maybe even kind of fun.
					</RevealItem>

					<RevealItem
						y={DISTANCE.card}
						duration={DURATION.card}
						className="mt-10"
					>
						<Link
							href="#next-steps"
							className="inline-block bg-brand-orange px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
						>
							I’m Ready! Tell Me What’s Next
						</Link>
					</RevealItem>
				</RevealStagger>
			</div>

			{/* Mobile-only decorative row — a slimmed-down version of the desktop
			    clusters so the section still feels like the homepage collages. */}
			<Reveal
				y={DISTANCE.card}
				duration={DURATION.card}
				className="relative mx-auto mt-10 flex w-full max-w-[420px] items-center justify-center gap-6 px-4 min-[992px]:hidden"
			>
				<div className="w-[42%] -rotate-[3deg]">
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
				<div className="relative w-[46%] rotate-[8deg]">
					<div className="overflow-hidden border-4 border-white shadow-xl">
						<Image
							src="/assets/images/blue-door-house.webp"
							alt=""
							width={886}
							height={750}
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
