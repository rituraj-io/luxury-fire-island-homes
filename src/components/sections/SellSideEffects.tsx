// SellSideEffects — "Beware of your risks!" band on /sell. Mirrors the
// buy-page SideEffects exactly (same bg, heading/subtitle treatment, marquee
// of image cards, and closing italic note); only the copy and images differ.

import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/ui/Marquee";


type Risk = {
  image: string;
  alt: string;
  body: ReactNode;
};


const RISKS: Risk[] = [
  {
    image: "/assets/images/sell-warnings/warning-1.webp",
    alt: "",
    body: (
      <>
        <span className="font-bold">You may suddenly become very nostalgic.</span> (That
        one deck chair? The beachy light in the hallway? Yep. Tears.)
      </>
    ),
  },
  {
    image: "/assets/images/sell-warnings/warning-2.webp",
    alt: "",
    body: (
      <>
        <span className="font-bold">Friends may ask</span> “Wait… you’re selling?!”
        repeatedly.
      </>
    ),
  },
  {
    image: "/assets/images/sell-warnings/warning-3.webp",
    alt: "",
    body: (
      <>
        You might <span className="font-bold">panic</span> halfway through packing and
        consider not selling at all.
      </>
    ),
  },
  {
    image: "/assets/images/sell-warnings/warning-4.webp",
    alt: "",
    body: (
      <>
        You will feel a little <span className="font-bold">territorial</span> when the
        buyer starts talking about renovations.
      </>
    ),
  },
  {
    image: "/assets/images/sell-warnings/warning-5.webp",
    alt: "",
    body: (
      <>
        You may ask us if it’s too late to <span className="font-bold">rent</span> it out
        instead. (It’s not—we do that too.)
      </>
    ),
  },
];


function RiskCard({ risk }: { risk: Risk }) {
  return (
    <article className="flex h-full w-[240px] shrink-0 flex-col overflow-hidden rounded-sm bg-white shadow-md">
      <div className="relative h-[170px] w-full shrink-0">
        <Image
          src={risk.image}
          alt={risk.alt}
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 p-5">
        <p className="font-sans text-[20px] leading-snug text-black">{risk.body}</p>
      </div>
    </article>
  );
}


export default function SellSideEffects() {
  return (
    <section className="w-full overflow-hidden bg-[#dce5ef] py-14 md:py-16">
      <div className="mx-auto w-full max-w-site px-4 text-center md:px-8">
        <Reveal
          as="h2"
          className="font-script text-[40px] leading-none text-brand-blue md:text-[48px]"
        >
          Beware of your risks!
        </Reveal>

        <Reveal
          as="p"
          delay={0.05}
          className="mx-auto mt-5 max-w-[520px] font-sans text-[24px] font-bold italic leading-snug text-brand-blue"
        >
          Potential Side Effects of Selling
          <br />
          Your Fire Island Home
        </Reveal>
      </div>

      <Marquee
        items={RISKS}
        durationSeconds={70}
        itemClassName="mr-4 flex"
        trackClassName="items-stretch"
        className="mt-10"
        renderItem={(risk) => <RiskCard risk={risk} />}
      />

      <Reveal
        as="p"
        delay={0.05}
        className="mx-auto mt-12 max-w-[640px] px-4 text-center font-sans text-[24px] italic leading-relaxed text-brand-blue"
      >
        <span className="font-bold">The good news?</span>
        <br />
        We’ll guide you through every step&mdash;from pricing to closing to helping you
        find the perfect rental when nostalgia inevitably hits. And yes, we’ll still grab
        a cocktail with you when you’re back on island.
      </Reveal>
    </section>
  );
}
