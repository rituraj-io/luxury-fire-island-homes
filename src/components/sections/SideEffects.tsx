// SideEffects — "Beware of your risks!" band. Script heading + bold subtitle
// at the top, a right-to-left marquee of photo + copy cards in the middle,
// and a closing italic note at the bottom. Shares the same blue-gray band
// (#dce5ef) as HomeBase. Marquee loop math is handled by the shared Marquee
// component.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/ui/Marquee";


type Risk = {
  image: string;
  alt: string;
  title: string;
  body: string;
};


const RISKS: Risk[] = [
  {
    image: "/assets/images/buy-warnings/warning-1.webp",
    alt: "Person watching the ocean at sunset",
    title: "Unexplained calmness",
    body:
      "Side effects include long walks on the beach with iced coffee, zero Sunday scaries, and an overall \u201CI live here now\u201D energy.",
  },
  {
    image: "/assets/images/buy-warnings/warning-2.webp",
    alt: "Backyard pool and deck",
    title: "Frequent hosting of jealous friends",
    body:
      "You will become the designated beach weekend destination. They\u2019ll say \u201Cwe\u2019re just crashing for one night.\u201D They\u2019ll stay three.",
  },
  {
    image: "/assets/images/buy-warnings/warning-3.webp",
    alt: "Two wine glasses toasting over water",
    title: "Chronic ros\u00e9 consumption",
    body:
      "Somehow, it just tastes better on your own deck. Especially at sunset. Especially barefoot.",
  },
  {
    image: "/assets/images/buy-warnings/warning-4.webp",
    alt: "Outdoor shower under the sky",
    title: "An obsession with outdoor showers",
    body: "Once you try one, it\u2019s over for regular plumbing.",
  },
  {
    image: "/assets/images/buy-warnings/warning-5.webp",
    alt: "Dog relaxing on a striped rug",
    title: "Dog joy overload",
    body: "Your pup might start believing they actually own the place.",
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
        <p className="font-sans text-[20px] leading-snug text-black">
          <span className="font-bold">{risk.title}</span>
          <span> &ndash; {risk.body}</span>
        </p>
      </div>
    </article>
  );
}


export default function SideEffects() {
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
          Potential Side Effects of Owning a
          <br />
          Fire Island Beach Home
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
        <span className="font-bold">Important Note:</span>
        <br />
        This lifestyle is highly contagious. Symptoms may spread to friends,
        family, and in-laws&mdash;especially after one weekend visit.
      </Reveal>
    </section>
  );
}
