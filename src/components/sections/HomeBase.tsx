// HomeBase — "This Isn't Just a Beach House. It's a Home Base." band.
// Full-bleed right-to-left photo marquee at the top, muted blue-gray band
// below with a script heading and centered body copy. Photos share a fixed
// height; widths vary with their own aspect ratios. Marquee loop math is
// handled by the shared Marquee component.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/ui/Marquee";
import { paragraphs, type BuySection4 } from "@/lib/cms";


type Photo = {
  src: string;
  alt: string;
  aspect: string;
};


const FALLBACK_PHOTOS: Photo[] = [
  { src: "/assets/images/fun-memories/fun-memory-1.webp", alt: "Fire Island memory", aspect: "626 / 836" },
  { src: "/assets/images/fun-memories/fun-memory-2.webp", alt: "Fire Island memory", aspect: "626 / 835" },
  { src: "/assets/images/fun-memories/fun-memory-3.webp", alt: "Fire Island memory", aspect: "625 / 835" },
  { src: "/assets/images/fun-memories/fun-memory-4.webp", alt: "Fire Island memory", aspect: "626 / 835" },
  { src: "/assets/images/fun-memories/fun-memory-5.webp", alt: "Fire Island memory", aspect: "626 / 835" },
  { src: "/assets/images/fun-memories/fun-memory-6.webp", alt: "Fire Island memory", aspect: "623 / 832" },
  { src: "/assets/images/fun-memories/fun-memory-7.webp", alt: "Fire Island memory", aspect: "624 / 832" },
  { src: "/assets/images/fun-memories/fun-memory-8.webp", alt: "Fire Island memory", aspect: "830 / 826" },
  { src: "/assets/images/fun-memories/fun-memory-9.webp", alt: "Fire Island memory", aspect: "620 / 826" },
];


const FALLBACK: BuySection4 = {
  headline: "This Isn’t Just a Beach House. It’s a Home Base.",
  description:
    "It’s ferry rides. Bare feet. Your kids running ahead of you. The bottle of rosé you keep stocked in the fridge. A place where friends visit once—and ask to come back every year. We’re not here to just help you buy a house. We’re here to help you build your Fire Island life. And you don’t have to take our word for it.\n\nWith 100+ five-star reviews and the title of highest-rated real estate company on the island, we’ve helped more families than anyone else—and we’d be honored to help you too.",
  imageUrls: [],
  bottomline: "You’re in good hands. Sunscreen strongly encouraged.",
};


// CMS gives us flat URLs; the marquee needs an aspect ratio per item to keep
// widths varied. Stagger across a few aspects so the row feels organic.
const FALLBACK_ASPECTS = ["626 / 835", "830 / 826", "624 / 832", "620 / 826", "625 / 835"];


function toPhoto(url: string, i: number): Photo {
  return { src: url, alt: "Fire Island memory", aspect: FALLBACK_ASPECTS[i % FALLBACK_ASPECTS.length] };
}


export default function HomeBase({ data }: { data?: BuySection4 }) {
  const d = data ?? FALLBACK;
  const photos: Photo[] =
    d.imageUrls.length > 0 ? d.imageUrls.map(toPhoto) : FALLBACK_PHOTOS;
  const bodyParas = paragraphs(d.description);

  return (
    <section className="w-full bg-[#dce5ef]">
      <Marquee
        items={photos}
        durationSeconds={80}
        itemClassName="relative mr-2 h-full shrink-0"
        trackClassName="h-[240px] md:h-[300px]"
        className="pt-2"
        renderItem={(photo) => (
          <div
            className="relative h-full"
            style={{ aspectRatio: photo.aspect }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 300px, 240px"
              className="object-cover"
            />
          </div>
        )}
      />

      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center px-4 pb-16 pt-12 text-center md:pb-20 md:pt-16 md:px-8">
        <Reveal
          as="h2"
          className="font-script text-[40px] leading-[1.1] text-brand-blue md:text-[52px]"
        >
          {d.headline}
        </Reveal>

        {bodyParas.map((p, i) => (
          <Reveal
            key={i}
            as="p"
            delay={0.05 + i * 0.05}
            className={`${i === 0 ? "mt-8" : "mt-6"} font-body text-[15px] leading-relaxed text-black md:text-[16px]`}
          >
            {p}
          </Reveal>
        ))}

        <Reveal
          as="p"
          delay={0.05 + bodyParas.length * 0.05}
          className="mt-6 font-body text-[15px] font-bold italic text-black md:text-[16px]"
        >
          {d.bottomline}
        </Reveal>
      </div>
    </section>
  );
}
