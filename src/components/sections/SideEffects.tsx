// SideEffects — "Beware of your risks!" band. Script heading + bold subtitle
// at the top, a right-to-left marquee of photo + copy cards in the middle,
// and a closing italic note at the bottom. Shares the same blue-gray band
// (#dce5ef) as HomeBase. Marquee loop math is handled by the shared Marquee
// component.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/ui/Marquee";
import type { BuySection7 } from "@/lib/cms";


type Risk = {
  image: string;
  alt: string;
  title: string;
  body: string;
};


const FALLBACK: BuySection7 = {
  headline: "Beware of your risks!",
  introText: "Potential Side Effects of Owning a Fire Island Beach Home",
  note: "This lifestyle is highly contagious. Symptoms may spread to friends, family, and in-laws\u2014especially after one weekend visit.",
  cards: [
    { text: "Unexplained calmness", description: "Side effects include long walks on the beach with iced coffee, zero Sunday scaries, and an overall \u201CI live here now\u201D energy.", imageUrl: "/assets/images/buy-warnings/warning-1.webp" },
    { text: "Frequent hosting of jealous friends", description: "You will become the designated beach weekend destination. They\u2019ll say \u201Cwe\u2019re just crashing for one night.\u201D They\u2019ll stay three.", imageUrl: "/assets/images/buy-warnings/warning-2.webp" },
    { text: "Chronic ros\u00e9 consumption", description: "Somehow, it just tastes better on your own deck. Especially at sunset. Especially barefoot.", imageUrl: "/assets/images/buy-warnings/warning-3.webp" },
    { text: "An obsession with outdoor showers", description: "Once you try one, it\u2019s over for regular plumbing.", imageUrl: "/assets/images/buy-warnings/warning-4.webp" },
    { text: "Dog joy overload", description: "Your pup might start believing they actually own the place.", imageUrl: "/assets/images/buy-warnings/warning-5.webp" },
  ],
};


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
        <p className="font-sans text-[20px] leading-snug text-black">
          <span className="font-bold">{risk.title}</span>
          <span> &ndash; {risk.body}</span>
        </p>
      </div>
    </article>
  );
}


export default function SideEffects({ data }: { data?: BuySection7 }) {
  const d = data ?? FALLBACK;
  const risks: Risk[] = d.cards.map((c) => ({
    image: c.imageUrl,
    alt: c.text,
    title: c.text,
    body: c.description,
  }));

  return (
    <section className="w-full overflow-hidden bg-[#dce5ef] py-14 md:py-16">
      <div className="mx-auto w-full max-w-site px-4 text-center md:px-8">
        <Reveal
          as="h2"
          className="font-script text-[40px] leading-none text-brand-blue md:text-[48px]"
        >
          {d.headline}
        </Reveal>

        <Reveal
          as="p"
          delay={0.05}
          className="mx-auto mt-5 max-w-[520px] font-sans text-[24px] font-bold italic leading-snug text-brand-blue"
        >
          {d.introText}
        </Reveal>
      </div>

      <Marquee
        items={risks}
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
        <span className="font-bold">Important Note:</span>
        <br />
        {d.note}
      </Reveal>
    </section>
  );
}
