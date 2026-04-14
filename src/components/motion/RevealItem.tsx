"use client";


// Child of <RevealStagger>. Inherits orchestration from the parent, so
// nothing here needs viewport logic or delays — stagger is computed upstream.

import { motion, useReducedMotion } from "motion/react";
import { useMemo, type ElementType } from "react";
import { DISTANCE, DURATION, staggerChild } from "@/lib/motion";


type RevealItemProps = {
  as?: ElementType;
  y?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
};


export default function RevealItem({
  as: Tag = "div",
  y = DISTANCE.text,
  duration = DURATION.text,
  className,
  children,
}: RevealItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = useMemo(() => motion.create(Tag as ElementType), [Tag]);

  if (reduced) {
    const Plain = Tag as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <MotionTag className={className} variants={staggerChild(y, duration)}>
      {children}
    </MotionTag>
  );
}
