"use client";


// Hero — full-bleed beach image with overlaid headline on the left
// and a "How can we help you?" action card on the right. Page-load
// choreography: eyebrow → headline → subcopy → CTA → card, cascaded.
// Background gets a subtle parallax tied to scroll.

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import HeroIntroItem, { HERO_TIMELINE } from "@/components/motion/HeroIntro";
import { DISTANCE, DURATION, EASE, useFinePointer } from "@/lib/motion";
import type { HeroSection } from "@/lib/cms";


const HELP_LINKS = [
	{ label: "I'm Buying", href: "/buy" },
	{ label: "I'm Selling", href: "/sell" },
	{ label: "I'm Renting", href: "/current-rentals" },
];


type Props = { hero: HeroSection };


// Preserves the original two-line layout: splits the CMS headline at " OF "
// so each half lands on its own line. Falls back to a single line if the
// split point isn't present.
function splitHeadline(headline: string): [string, string | null] {
	const match = headline.match(/^(.*?)\s+(OF\s+.+)$/i);
	if (!match) return [headline, null];
	return [match[1], match[2]];
}


export default function Hero({ hero }: Props) {
	const [line1, line2] = splitHeadline(hero.headline);
	const sectionRef = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();
	const finePointer = useFinePointer();
	const parallaxEnabled = finePointer && !reduced;
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});
	// Stronger vertical drift on the background image — 22% of section travel.
	const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

	return (
		<section
			ref={sectionRef}
			// The image fills the full section (including the strip behind
			// the sliding navbar) so there's no white gap pre-animation. The
			// content inside is padded by nav height (128px) + pattern strip
			// (16px) so it never collides with the nav.
			className="relative min-h-[calc(664px+env(safe-area-inset-top))] w-full overflow-hidden md:min-h-[calc(784px+env(safe-area-inset-top))]"
		>
			{/* Background image — parallaxed via a wrapping motion.div that
			    scales so translation never exposes edges. On load it settles
			    from an over-zoomed/over-translated state into its parallax
			    start pose, so the image visibly "breathes" into place. */}
			<motion.div
				className="absolute inset-0"
				style={parallaxEnabled ? { y: bgY } : undefined}
				initial={reduced ? false : { scale: parallaxEnabled ? 1.2 : 1.04, opacity: 0 }}
				animate={{ scale: parallaxEnabled ? 1.14 : 1, opacity: 1 }}
				transition={{
					scale: { duration: 2.2, ease: EASE, delay: 0.1 },
					opacity: { duration: 1.4, ease: EASE, delay: 0.1 },
				}}
			>
				<Image
					src={hero.imageUrl}
					alt="Aerial view of Fire Island beach"
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
			</motion.div>

			<div className="relative pt-[calc(144px+env(safe-area-inset-top))]">
				{/* Content grid */}
				<div className="relative">
					{/* Hero content container. On desktop the headline sits at its natural width
					    and the card butts right up against it with a small gap. */}
					<div className="mx-auto flex w-full max-w-[576px] flex-col items-stretch justify-center gap-6 px-4 pb-12 pt-20 min-h-[520px] min-[992px]:min-h-[640px] min-[992px]:max-w-[1000px] min-[992px]:flex-row min-[992px]:items-center min-[992px]:justify-between min-[992px]:gap-6 min-[992px]:px-8">
						{/* Headline — fills the room left over by the card. Long titles
						    wrap inside this slot; the homepage's two-line layout still
						    renders identically because splitHeadline emits its own <br/>. */}
						<div className="min-w-0 flex-1 text-white drop-shadow-lg">
							<HeroIntroItem as="p" delay={HERO_TIMELINE.eyebrow} className="ml-4 font-script text-5xl md:text-6xl">
								{hero.eyebrow}
							</HeroIntroItem>
							<HeroIntroItem
								as="h1"
								delay={HERO_TIMELINE.headline}
								className="mt-2 font-display text-5xl leading-[1.05] tracking-[0.06em] sm:text-6xl md:text-7xl"
							>
								<span
									style={{
										WebkitTextStroke: "2px #ffffff",
										color: "transparent",
										display: "inline",
									}}
								>
									{line1}
									{line2 ? (
										<>
											<br />
											{line2}
										</>
									) : null}
								</span>
							</HeroIntroItem>
						</div>

						{/* Help card — enters as a whole unit. */}
						<HeroIntroItem
							delay={HERO_TIMELINE.card}
							y={DISTANCE.card}
							duration={DURATION.card}
							className="w-full shrink-0 min-[992px]:w-[360px]"
						>
							<div className="rounded-[0.5rem] bg-white/95 px-4 py-6 shadow-xl md:py-8">
								<p className="text-center text-lg font-normal text-brand-blue">How can we help you?</p>

								<ul className="mt-5 flex flex-col gap-3">
									{HELP_LINKS.map((l) => (
										<li key={l.href}>
											<Link
												href={l.href}
												className="flex items-center justify-between border-2 border-[#25648D] px-5 py-3 font-medium text-brand-blue-dark transition hover:bg-brand-blue-dark/5"
											>
												<span>{l.label}</span>
												{/* SVG used as a mask so its fill matches the link's border color. */}
												<span
													aria-hidden
													className="inline-block h-5 w-5 shrink-0 bg-[#25648D]"
													style={{
														WebkitMaskImage: "url('/assets/images/arrow-right.svg')",
														WebkitMaskRepeat: "no-repeat",
														WebkitMaskPosition: "center",
														WebkitMaskSize: "contain",
														maskImage: "url('/assets/images/arrow-right.svg')",
														maskRepeat: "no-repeat",
														maskPosition: "center",
														maskSize: "contain",
													}}
												/>
											</Link>
										</li>
									))}
								</ul>

								<Link
									href="tel:6315708942"
									className="mt-3 block border-2 border-[#25648D] bg-brand-orange-light px-5 py-3 text-left font-medium text-brand-blue-dark hover:brightness-95"
								>
									Call Us 631-570-8942
								</Link>
							</div>
						</HeroIntroItem>
					</div>
				</div>
			</div>
		</section>
	);
}
