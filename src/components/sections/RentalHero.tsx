"use client";


// RentalHero — full-bleed property photo with a centered script headline and
// uppercase subcopy. Same intro cascade + parallax vocabulary as the homepage
// Hero. The background image is per-rental; the copy is shared across all
// rental pages.

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import HeroIntroItem, { HERO_TIMELINE } from "@/components/motion/HeroIntro";
import { EASE, useFinePointer } from "@/lib/motion";
import type { Rental } from "@/lib/rentals";


export default function RentalHero({ rental }: { rental: Rental }) {
	const sectionRef = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();
	const finePointer = useFinePointer();
	const parallaxEnabled = finePointer && !reduced;
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});
	const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

	return (
		<section
			ref={sectionRef}
			className="relative min-h-[calc(540px+env(safe-area-inset-top))] w-full overflow-hidden md:min-h-[calc(620px+env(safe-area-inset-top))]"
		>
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
					src={rental.heroImage}
					alt={rental.heroAlt}
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
			</motion.div>

			{/* Scrim improves legibility of the yellow/white overlay text against
			    bright outdoor photography. */}
			<div aria-hidden className="absolute inset-0 bg-black/25" />

			<div className="relative pt-[calc(144px+env(safe-area-inset-top))]">
				<div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-6 px-4 pb-10 pt-10 min-h-[400px] md:pt-16 md:pb-14 min-[992px]:min-h-[480px] min-[992px]:px-8">
					<HeroIntroItem
						as="h1"
						delay={HERO_TIMELINE.headline}
						className="-rotate-[5deg] text-center font-script text-[44px] leading-[1.05] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-6xl md:text-7xl md:[text-shadow:3px_4px_0_#185b89] lg:text-[96px] lg:[text-shadow:3px_5px_0_#185b89]"
					>
						Your Dream Vacation
						<br />
						on Fire Island Starts Here
					</HeroIntroItem>

					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.subcopy}
						className="max-w-[340px] self-end text-right font-sans text-[14px] font-medium uppercase tracking-[0.14em] text-brand-yellow [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] sm:text-base md:max-w-[410px] md:text-lg"
					>
						Without the stress, guesswork, or the broken A/C
					</HeroIntroItem>
				</div>
			</div>
		</section>
	);
}
