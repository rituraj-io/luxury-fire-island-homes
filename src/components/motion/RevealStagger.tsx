"use client";


// Parent container that orchestrates staggered children. Pair with
// <RevealItem> descendants — they consume the variants defined here.

import { motion, useReducedMotion } from "motion/react";
import { useMemo, type ElementType } from "react";
import { STAGGER, VIEWPORT, staggerParent, useRevealAmount } from "@/lib/motion";


type RevealStaggerProps = {
  as?: ElementType;
  gap?: number;
  delay?: number;
  amount?: number;
  className?: string;
  children: React.ReactNode;
};


export default function RevealStagger({
  as: Tag = "div",
  gap = STAGGER.text,
  delay = 0,
  amount,
  className,
  children,
}: RevealStaggerProps) {
  const reduced = useReducedMotion();
  const responsiveAmount = useRevealAmount();
  const MotionTag = useMemo(() => motion.create(Tag as ElementType), [Tag]);

  if (reduced) {
    const Plain = Tag as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: VIEWPORT.once, amount: amount ?? responsiveAmount }}
    >
      {children}
    </MotionTag>
  );
}
