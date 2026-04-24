"use client";


// AreaHero — full-bleed hero for /area/[slug]. Parallaxed community photo
// under a scrim, small uppercase eyebrow, rotated yellow script name with a
// hard blue drop shadow, italic tagline, and two orange CTAs routing to the
// filtered buy / current-rentals views. Matches the language of SellHero and
// PropertyHero so the detail page slots into the site's hero family.

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import HeroIntroItem, { HERO_TIMELINE } from "@/components/motion/HeroIntro";
import { EASE, useFinePointer } from "@/lib/motion";
import type { Area } from "@/lib/areas";


type Props = { area: Area };


export default function AreaHero({ area }: Props) {
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
			className="relative min-h-[calc(600px+env(safe-area-inset-top))] w-full overflow-hidden md:min-h-[calc(700px+env(safe-area-inset-top))]"
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
					src={area.heroImage}
					alt={area.heroAlt}
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
			</motion.div>

			<div aria-hidden className="absolute inset-0 bg-black/30" />

			<div className="relative pt-[calc(144px+env(safe-area-inset-top))]">
				<div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-5 px-4 pb-12 pt-10 min-h-[440px] md:pb-16 md:pt-16 min-[992px]:min-h-[520px] min-[992px]:px-8">
					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.eyebrow}
						className="font-sans text-[14px] font-medium uppercase tracking-[0.24em] text-brand-yellow [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] md:text-[16px]"
					>
						{area.eyebrow}
					</HeroIntroItem>

					<HeroIntroItem
						as="h1"
						delay={HERO_TIMELINE.headline}
						className="-rotate-[5deg] text-center font-script text-[56px] leading-[1] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-[80px] md:text-[104px] md:[text-shadow:3px_4px_0_#185b89] lg:text-[128px] lg:[text-shadow:3px_5px_0_#185b89]"
					>
						{area.name}
					</HeroIntroItem>

					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.subcopy}
						className="max-w-[420px] text-center font-sans text-[14px] font-medium italic text-brand-yellow [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] sm:text-base md:max-w-[520px] md:text-lg"
					>
						{area.tagline}
					</HeroIntroItem>

					<HeroIntroItem
						delay={HERO_TIMELINE.cta}
						className="mt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4"
					>
						<Link
							href={area.homesForSaleHref}
							className="bg-brand-orange px-8 py-3 font-sans text-[15px] font-medium tracking-wider text-white transition hover:brightness-95 md:px-10 md:text-[16px]"
						>
							HOMES FOR SALE
						</Link>
						<Link
							href={area.homesToRentHref}
							className="bg-brand-orange px-8 py-3 font-sans text-[15px] font-medium tracking-wider text-white transition hover:brightness-95 md:px-10 md:text-[16px]"
						>
							HOMES FOR RENT
						</Link>
					</HeroIntroItem>
				</div>
			</div>
		</section>
	);
}
