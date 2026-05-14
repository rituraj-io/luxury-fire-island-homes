"use client";


// Momentum scroll provider. Mounts Lenis once, runs one rAF loop, and cleans
// up on unmount. Disables itself under prefers-reduced-motion so we fall back
// to native scroll — non-negotiable for accessibility.

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";


export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
    // Expose the instance so route-change effects (below) can call resize
    // when the page swaps. Lenis caches the document scroll height; without
    // a recompute on nav, scrolling on the new page caps at the old height.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Whenever the route changes, give the new page a couple of frames to
  // commit layout then force Lenis to recompute its cached bounds.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!lenis) return;
    const t = window.setTimeout(() => lenis.resize(), 50);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}
