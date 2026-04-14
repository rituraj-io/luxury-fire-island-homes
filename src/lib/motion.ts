// Motion tokens — one vocabulary for every animation on the site.
// Editorial restraint: slow-out easing, subtle distances, unhurried staggers.
// Tweak feel here, nowhere else.

"use client";


import { useEffect, useState } from "react";
import type { Transition, Variants } from "motion/react";


// Slow-out editorial curve — glides to rest, no overshoot.
export const EASE = [0.16, 1, 0.3, 1] as const;


export const DURATION = {
  nav: 0.7,
  text: 0.9,
  card: 1.1,
} as const;


export const DISTANCE = {
  text: 24,
  card: 40,
} as const;


export const STAGGER = {
  text: 0.1,
  card: 0.12,
} as const;


export const VIEWPORT = {
  desktop: 0.15,
  mobile: 0.08,
  breakpointPx: 768,
  once: true,
} as const;


// Shared transitions.
export const textTransition: Transition = {
  duration: DURATION.text,
  ease: EASE,
};


export const cardTransition: Transition = {
  duration: DURATION.card,
  ease: EASE,
};


// Standard rise + fade variants for single-element reveals.
export const riseVariants = (y: number = DISTANCE.text): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0 },
});


// Parent container variants: no self-animation, just orchestrates children.
export const staggerParent = (staggerChildren: number = STAGGER.text, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});


// Child variants used by RevealItem — inherits stagger from parent.
export const staggerChild = (y: number = DISTANCE.text, duration: number = DURATION.text): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE },
  },
});


// Returns the correct viewport threshold for the current breakpoint.
// Mobile viewports are taller relative to content density, so they need a
// lower threshold to avoid "empty pixels scrolled before anything moves".
export function useRevealAmount(): number {
  const [amount, setAmount] = useState<number>(VIEWPORT.desktop);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${VIEWPORT.breakpointPx}px)`);
    const apply = () => setAmount(mq.matches ? VIEWPORT.desktop : VIEWPORT.mobile);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return amount;
}


// True on devices with a fine pointer (mouse/trackpad). False on touch
// phones/tablets. Use to gate scroll-linked effects (parallax) that are
// expensive on mobile GPUs and barely noticeable on small screens.
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return fine;
}
