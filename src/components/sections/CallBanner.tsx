"use client";


// CallBanner — full-width docks photo with script "Call or text us"
// and a phone number overlaid in brand yellow. Photo parallaxes on scroll
// the same way the hero image does.

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { useFinePointer } from "@/lib/motion";


export default function CallBanner() {
	const sectionRef = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();
	const finePointer = useFinePointer();
	const parallaxEnabled = finePointer && !reduced;
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	// Drift across the full viewport pass of the banner.
	const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "12%"]);

	return (
		<section id="contact" ref={sectionRef} className="relative w-full overflow-hidden">
			<div className="relative aspect-[797/190] min-h-[340px] w-full md:min-h-0">
				<motion.div
					className="absolute inset-0"
					style={parallaxEnabled ? { y: bgY, scale: 1.18 } : undefined}
				>
					<Image
						src="/assets/images/docs-banner-image.webp"
						alt="Aerial view of Fire Island docks and marina"
						fill
						className="object-cover object-[center_70%]"
						sizes="100vw"
						priority={false}
					/>
				</motion.div>
				<RevealStagger className="absolute inset-0 flex flex-col items-center justify-end pb-[3%] text-center text-[#efe29d] [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
					<RevealItem as="span" className="-rotate-3 font-script text-[32px] leading-none sm:text-[44px] md:text-[56px] lg:text-[64px]">
						Call or text us
					</RevealItem>
					<RevealItem>
						<a
							href="tel:6315708942"
							className="-mt-2 block font-sans text-[28px] font-normal tracking-[0.08em] sm:-mt-3 sm:text-[40px] md:-mt-4 md:text-[52px] lg:text-[60px]"
						>
							631-570-8942
						</a>
					</RevealItem>
				</RevealStagger>
			</div>
		</section>
	);
}
