"use client";


// PropertyHero — full-bleed property photo with a centered script headline,
// uppercase subcopy, and three orange CTAs. Mirrors RentalHero's type treatment
// (rotated yellow script with a hard blue drop shadow) and reuses the homepage
// Hero's intro cascade + parallax. Slightly taller than RentalHero to make
// room for the Buy/Sell/Rent button row.

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import HeroIntroItem, { HERO_TIMELINE } from "@/components/motion/HeroIntro";
import { EASE, useFinePointer } from "@/lib/motion";


const CTAS = [
  { label: "BUY", href: "#buy" },
  { label: "SELL", href: "#sell" },
  { label: "RENT", href: "#rent" },
];


export default function PropertyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const parallaxEnabled = finePointer && !reduced;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(620px+env(safe-area-inset-top))] w-full overflow-hidden md:min-h-[calc(700px+env(safe-area-inset-top))]"
    >
      <motion.div
        className="absolute inset-0"
        style={parallaxEnabled ? { y: bgY } : undefined}
        initial={reduced ? false : { scale: parallaxEnabled ? 1.2 : 1.04, opacity: 0 }}
        animate={{ scale: parallaxEnabled ? 1.14 : 1, opacity: 1 }}
        transition={{
          scale: { duration: 2.2, ease: EASE, delay: 0.1 },
          opacity: { duration: 1.4, ease: EASE, delay: 0.1 },
        }}
      >
        <Image
          src="/assets/images/property-hero.jpg"
          alt="Fire Island property"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Scrim improves legibility of yellow overlay text against bright
          outdoor photography. */}
      <div aria-hidden className="absolute inset-0 bg-black/25" />

      <div className="relative pt-[calc(144px+env(safe-area-inset-top))]">
        <div className="mx-auto flex min-h-[460px] w-full max-w-[1100px] flex-col items-center justify-center gap-6 px-4 pb-10 pt-10 md:pb-14 md:pt-16 min-[992px]:min-h-[540px] min-[992px]:px-8">
          <HeroIntroItem
            as="h1"
            delay={HERO_TIMELINE.headline}
            className="-rotate-[5deg] text-center font-script text-[44px] leading-[1.05] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-6xl md:text-7xl md:[text-shadow:3px_4px_0_#185b89] lg:text-[96px] lg:[text-shadow:3px_5px_0_#185b89]"
          >
            Your Second Home
            <br />
            on Fire Island Starts Here
          </HeroIntroItem>

          <HeroIntroItem
            as="p"
            delay={HERO_TIMELINE.subcopy}
            className="max-w-[340px] self-end text-right font-sans text-[14px] font-medium uppercase tracking-[0.14em] text-brand-yellow [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] sm:text-base md:max-w-[410px] md:text-lg"
          >
            Without the stress, the surprises, or the schlep
          </HeroIntroItem>

          <HeroIntroItem
            delay={HERO_TIMELINE.cta}
            className="mt-2 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            {CTAS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="bg-brand-orange px-10 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-95 md:px-12"
              >
                {c.label}
              </Link>
            ))}
          </HeroIntroItem>
        </div>
      </div>
    </section>
  );
}
