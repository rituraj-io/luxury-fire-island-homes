"use client";


// Single-element viewport reveal. Fades + rises on enter, plays once,
// respects prefers-reduced-motion.

import { motion, useReducedMotion } from "motion/react";
import { useMemo, type ElementType } from "react";
import { DISTANCE, DURATION, EASE, VIEWPORT, riseVariants } from "@/lib/motion";
import { useRevealAmount } from "@/lib/motion";


type RevealProps = {
  as?: ElementType;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
};


export default function Reveal({
  as: Tag = "div",
  delay = 0,
  y = DISTANCE.text,
  duration = DURATION.text,
  className,
  children,
}: RevealProps) {
  const reduced = useReducedMotion();
  const amount = useRevealAmount();
  const MotionTag = useMemo(() => motion.create(Tag as ElementType), [Tag]);

  if (reduced) {
    const Plain = Tag as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <MotionTag
      className={className}
      variants={riseVariants(y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: VIEWPORT.once, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
