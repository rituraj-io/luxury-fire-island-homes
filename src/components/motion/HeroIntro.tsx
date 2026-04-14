"use client";


// Hero page-load choreography. Not scroll-triggered — runs on mount with a
// fixed timeline (nav settles first, then hero elements cascade). Children
// declare their slot via the `delay` prop so the timeline stays explicit.

import { motion, useReducedMotion } from "motion/react";
import { useMemo, type ElementType } from "react";
import { DISTANCE, DURATION, EASE, riseVariants } from "@/lib/motion";


type IntroItemProps = {
  as?: ElementType;
  delay: number;
  y?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
};


function HeroIntroItem({
  as: Tag = "div",
  delay,
  y = DISTANCE.text,
  duration = DURATION.text,
  className,
  children,
}: IntroItemProps) {
  const reduced = useReducedMotion();
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
      animate="visible"
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}


// Timeline (seconds). Nav finishes settling at ~0.7s, so content begins
// after it to let the user register the nav before anything else moves.
export const HERO_TIMELINE = {
  eyebrow: 0.55,
  headline: 0.75,
  subcopy: 0.95,
  cta: 1.15,
  card: 1.35,
} as const;


export default HeroIntroItem;
