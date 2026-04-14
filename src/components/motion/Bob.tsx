"use client";


// Continuous gentle vertical bob. Draws no attention on its own — just
// keeps decorative images from looking static after the initial reveal.
// Use staggered `delay` values across sibling instances so they drift
// independently instead of moving in lockstep.

import { motion, useReducedMotion } from "motion/react";
import { useFinePointer } from "@/lib/motion";


type BobProps = {
	delay?: number;        // seconds
	amplitude?: number;    // px, peak translate
	duration?: number;     // seconds, full cycle
	className?: string;
	children: React.ReactNode;
};


export default function Bob({
	delay = 0,
	amplitude = 8,
	duration = 5.5,
	className,
	children,
}: BobProps) {
	const reduced = useReducedMotion();
	const finePointer = useFinePointer();

	// Skip bobbing on touch devices — battery-cost, and small screens
	// already have enough motion from native scroll.
	if (reduced || !finePointer) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			animate={{ y: [0, -amplitude, 0] }}
			transition={{
				duration,
				delay,
				repeat: Infinity,
				ease: "easeInOut",
			}}
		>
			{children}
		</motion.div>
	);
}
