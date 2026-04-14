"use client";


// Floating site navigation — fixed to the top, yellow band, logo centered.
// Collapses to a hamburger on mobile.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";


const LEFT_LINKS = [
  { label: "BUY", href: "#buy" },
  { label: "SELL", href: "#sell" },
  { label: "RENT", href: "#rent" },
  { label: "MANAGE", href: "#manage" },
];


const RIGHT_LINKS = [
  { label: "+ COMMUNITY", href: "#community" },
  { label: "+ ABOUT", href: "#about" },
];


export default function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Close the mobile drawer when clicking outside the header.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <motion.header
      ref={headerRef}
      // pt reserves room for the notch / status bar in standalone/PWA
      // contexts. In regular mobile browsers `env(safe-area-inset-top)`
      // resolves to 0, so layout is unchanged.
      className="fixed inset-x-0 top-0 z-50 bg-brand-yellow pt-[env(safe-area-inset-top)]"
      initial={reduced ? false : { y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: DURATION.nav, ease: EASE }}
    >
      <nav className="mx-auto flex h-32 w-full max-w-site items-center justify-between px-4 md:px-8">
        {/* Desktop: left links */}
        <ul className="hidden items-center gap-8 text-sm font-medium tracking-widest text-brand-blue lg:flex">
          {LEFT_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-brand-blue-dark">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo — centered on desktop, left on mobile */}
        <Link href="/" className="flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Image src="/logo.svg" alt="Luxury Fire Island Homes" width={170} height={70} priority />
        </Link>

        {/* Desktop: right links + contact */}
        <div className="hidden items-center gap-8 text-sm font-medium tracking-widest text-brand-blue lg:flex">
          {RIGHT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand-blue-dark">
              {l.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="bg-brand-orange px-6 py-3 font-medium tracking-widest text-white hover:brightness-95"
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-brand-blue transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-brand-blue transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-brand-blue transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer — animates via a grid row trick so height transitions work without a known height. */}
      <div
        className={`grid overflow-hidden bg-brand-yellow transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-brand-blue/10">
            <ul className="mx-auto flex w-full max-w-site flex-col gap-4 px-4 py-6 text-sm font-medium tracking-widest text-brand-blue">
              {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-block bg-brand-orange px-6 py-3 font-medium tracking-widest text-white"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Blue pattern strip beneath the nav — SVG tiled horizontally. */}
      <div
        aria-hidden
        className="h-4 w-full"
        style={{
          backgroundImage: "url('/assets/images/pattern-blue.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "auto 125%",
        }}
      />
    </motion.header>
  );
}
