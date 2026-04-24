"use client";


// JoinHero — /join landing hero. Same photo-with-rotated-yellow-script +
// blue hard-shadow treatment used on SellHero / ManageHero, with a small
// uppercase "WHY" eyebrow and the PDF's opening one-liner as subcopy.

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import HeroIntroItem, { HERO_TIMELINE } from "@/components/motion/HeroIntro";
import { EASE, useFinePointer } from "@/lib/motion";


export default function JoinHero() {
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
					src="/assets/images/photo-4.webp"
					alt="Luxury waterfront Fire Island home with private pool"
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
			</motion.div>

			<div aria-hidden className="absolute inset-0 bg-black/30" />

			<div className="relative pt-[calc(144px+env(safe-area-inset-top))]">
				<div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-5 px-4 pb-10 pt-10 min-h-[420px] md:pb-14 md:pt-16 min-[992px]:min-h-[500px] min-[992px]:px-8">
					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.eyebrow}
						className="font-sans text-[14px] font-medium uppercase tracking-[0.28em] text-brand-yellow [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] md:text-[16px]"
					>
						Why
					</HeroIntroItem>

					<HeroIntroItem
						as="h1"
						delay={HERO_TIMELINE.headline}
						className="-rotate-[4deg] text-center font-script text-[52px] leading-[1] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-[72px] md:text-[96px] md:[text-shadow:3px_4px_0_#185b89] lg:text-[120px] lg:[text-shadow:3px_5px_0_#185b89]"
					>
						Join our Team
					</HeroIntroItem>

					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.subcopy}
						className="mt-2 max-w-[520px] text-center font-sans text-[14px] font-medium italic leading-relaxed text-brand-yellow [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] md:text-[17px]"
					>
						We have a really good time doing this.
					</HeroIntroItem>
				</div>
			</div>
		</section>
	);
}
