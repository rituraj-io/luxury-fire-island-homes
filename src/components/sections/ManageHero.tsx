"use client";


// ManageHero — full-bleed hero for the /manage landing. Same visual
// treatment as SellHero and PropertyHero: parallaxed coastal photo under
// a scrim, rotated yellow script headline with a hard blue drop shadow,
// and an uppercase Gopher subline. The headline is longer than the other
// heroes, so the top-end breakpoint is a step smaller.

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import HeroIntroItem, { HERO_TIMELINE } from "@/components/motion/HeroIntro";
import { EASE, useFinePointer } from "@/lib/motion";


export default function ManageHero() {
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
			className="relative min-h-[calc(560px+env(safe-area-inset-top))] w-full overflow-hidden md:min-h-[calc(640px+env(safe-area-inset-top))]"
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
					src="/assets/images/property-hero.jpg"
					alt="Fire Island coastal home managed by Luxury Fire Island Homes"
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
			</motion.div>

			<div aria-hidden className="absolute inset-0 bg-black/25" />

			<div className="relative pt-[calc(144px+env(safe-area-inset-top))]">
				<div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-6 px-4 pb-10 pt-10 min-h-[400px] md:pb-14 md:pt-16 min-[992px]:min-h-[480px] min-[992px]:px-8">
					<HeroIntroItem
						as="h1"
						delay={HERO_TIMELINE.headline}
						className="-rotate-[5deg] text-center font-script text-[36px] leading-[1.05] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-5xl md:text-6xl md:[text-shadow:3px_4px_0_#185b89] lg:text-[80px] lg:[text-shadow:3px_5px_0_#185b89]"
					>
						Is Your Fire Island Home
						<br />
						Not Booking Like It Used To?
					</HeroIntroItem>

					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.subcopy}
						className="max-w-[360px] self-end text-right font-sans text-[14px] font-medium uppercase tracking-[0.14em] text-brand-yellow [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] sm:text-base md:max-w-[440px] md:text-lg"
					>
						Your home shouldn&apos;t be sitting empty.
					</HeroIntroItem>
				</div>
			</div>
		</section>
	);
}
