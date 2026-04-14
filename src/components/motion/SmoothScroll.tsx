"use client";


// Momentum scroll provider. Mounts Lenis once, runs one rAF loop, and cleans
// up on unmount. Disables itself under prefers-reduced-motion so we fall back
// to native scroll — non-negotiable for accessibility.

import { useEffect } from "react";
import Lenis from "lenis";


export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Disable on touch devices — mobile browsers have their own inertial
    // scrolling and Lenis on touch tends to fight it, making the page feel
    // laggy and breaking IntersectionObserver-driven reveals.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.8,
      // Stronger exponential ease — more glide after flick.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
