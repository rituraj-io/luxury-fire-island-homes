"use client";


// WhereWeComeIn — the "That's Where We Come In." timeline section for the
// property detail page.
//
// Desktop: a central vertical line runs from just below the heading down
// through the entire section and bleeds ~40px into the next section. Each
// side of the line alternates between a photo cluster and a blue info box.
//
// Mobile: the line moves to the left edge; content stacks single-column,
// alternating the two desktop columns row-by-row (L1 → R1 → L2 → R2 …).
//
// Parallax: overlapping photos inside each cluster translate at different
// speeds as the section scrolls through the viewport, giving a subtle depth
// effect (front layers move faster than back layers). Disabled on touch and
// under prefers-reduced-motion.
//
// Each cluster is an aspect-ratio wrapper with percentage-positioned children,
// so a cluster scales as a single unit — tilts, sizes, and overlap are
// preserved when the cluster's width changes.

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, useFinePointer } from "@/lib/motion";
import { paragraphs, type BuySection2 } from "@/lib/cms";


const CTAS = [
  { label: "MEET OUR TEAM", href: "#team" },
  { label: "READ OUR REVIEWS", href: "#reviews" },
  { label: "FOLLOW ON INSTAGRAM", href: "#instagram" },
];


type Box = { heading: string; body: React.ReactNode };


// Default copy used when the CMS hasn't supplied this section (e.g. the buy
// detail route, which doesn't currently fetch buy CMS).
const FALLBACK = {
  intro: [
    "You’re ready to make the move—from summer renter to homeowner. From “Where are we staying this year?” to “Let’s head to our place.”",
    "But finding your perfect second home can feel like a full-time job. Listings go fast. Information is vague. And most agents don’t actually know Fire Island.",
  ],
  headline: "That’s Where We Come In.",
  specialty: {
    heading: "FIRE ISLAND IS OUR SPECIALTY",
    body: "At Luxury Fire Island Homes, we specialize in helping buyers like you make smart, strategic second-home purchases on the island. Whether you’re looking for low-maintenance or legacy-worthy, we’ll help you find the place that fits your family and your lifestyle.",
  },
  believe: {
    heading: "WE BELIEVE IN...",
    body: "X No drama. \nX No guesswork. \n\nJust a smooth path to your forever summer—and smart savings along the way. Because yes, we’ve partnered with a lender who can get you the best rates and perks—so you can spend less on closing costs and more on a better beach cruiser.",
  },
  lifers: {
    heading: "WHY OUR BUYERS BECOME LIFERS",
    body: "We don’t just want you to close—we want you to walk away saying, “That was the easiest, most fun experience I’ve ever had... and honestly, I can’t wait to see [insert agent’s name] again on the island.”\n\nThat’s the energy we’re going for.\n\nSo yes—we’ve packed in more value, support, peace of mind (and jokes) than anyone else on Fire Island. You’ll love us so much, we’ll probably end up in your iPhone favorites (just below your dog walker and your go-to wine shop).",
  },
  closingHeading: "Want to see more?",
};


// Render a CMS description string as paragraphs. Splits on blank lines and
// preserves single-line breaks within a paragraph as <br/>.
function renderDescription(text: string) {
  return paragraphs(text).map((p, i) => (
    <p key={i}>
      {p.split("\n").map((line, j, all) => (
        <span key={j}>
          {line}
          {j < all.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  ));
}


// Parallax magnitudes (px). Each photo's vertical travel across the section's
// viewport pass is `2 * amount` — `+amount` when the section enters, `-amount`
// when it exits. Larger magnitude = faster apparent motion = reads as higher
// z / closer to camera. The spread between back and front is intentionally
// wide so the parallax is visibly legible, not homeopathic.
const DEPTH = {
  back: 30,
  mid: 130,
  front: 260,
} as const;


type ParallaxCtx = {
  scrollProgress: MotionValue<number>;
  enabled: boolean;
};


export default function WhereWeComeIn({ data }: { data?: BuySection2 }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const parallaxEnabled = !reduced && finePointer;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ctx: ParallaxCtx = { scrollProgress: scrollYProgress, enabled: parallaxEnabled };

  const introPara = data ? paragraphs(data.introText) : FALLBACK.intro;
  const headline = data?.headline ?? FALLBACK.headline;
  const specialty: Box = data
    ? {
        heading: data.leftSection.text1.title.toUpperCase(),
        body: renderDescription(data.leftSection.text1.description),
      }
    : { heading: FALLBACK.specialty.heading, body: renderDescription(FALLBACK.specialty.body) };
  const believe: Box = data
    ? {
        heading: data.rightSection.text1.title.toUpperCase(),
        body: renderDescription(data.rightSection.text1.description),
      }
    : { heading: FALLBACK.believe.heading, body: renderDescription(FALLBACK.believe.body) };
  const lifers: Box = data
    ? {
        heading: data.leftSection.text2.title.toUpperCase(),
        body: renderDescription(data.leftSection.text2.description),
      }
    : { heading: FALLBACK.lifers.heading, body: renderDescription(FALLBACK.lifers.body) };
  const closingHeading = data?.rightSection.text2.title || FALLBACK.closingHeading;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-visible bg-[#f8f4ec] py-16 md:py-20"
    >
      {/* ---- Intro paragraphs ---- */}
      <RevealStagger className="mx-auto w-full max-w-[440px] px-4 text-center font-body text-[15px] leading-relaxed text-black md:text-[16px]">
        {introPara.map((p, i) => (
          <RevealItem key={i} as="p" className={i === 0 ? "" : "mt-5"}>
            {p}
          </RevealItem>
        ))}
      </RevealStagger>

      <Reveal
        as="h2"
        className="mx-auto mt-10 text-center font-script text-[44px] leading-none text-brand-blue md:mt-12 md:text-[64px]"
      >
        {headline}
      </Reveal>

      {/* ======================================================== */}
      {/* Desktop layout                                            */}
      {/* ======================================================== */}
      <div className="relative mx-auto mt-12 hidden w-full max-w-[1180px] px-6 md:mt-14 md:px-10 min-[992px]:block">
        <TimelineLine className="left-1/2 -translate-x-1/2" />

        <div className="grid grid-cols-2 gap-x-16">
          {/* Left column */}
          <div className="flex flex-col gap-y-12">
            <Reveal y={DISTANCE.card} duration={DURATION.card}>
              <Cluster1 ctx={ctx} />
            </Reveal>
            <Reveal y={DISTANCE.card} duration={DURATION.card}>
              <BlueBox {...specialty} />
            </Reveal>
            <Reveal y={DISTANCE.card} duration={DURATION.card}>
              <Cluster3 ctx={ctx} />
            </Reveal>
            <Reveal y={DISTANCE.card} duration={DURATION.card}>
              <BlueBox {...lifers} />
            </Reveal>
          </div>

          {/* Right column — offset down so the two columns stagger visually. */}
          <div className="mt-20 flex flex-col gap-y-12">
            <Reveal y={DISTANCE.card} duration={DURATION.card}>
              <Cluster2 ctx={ctx} />
            </Reveal>
            <Reveal y={DISTANCE.card} duration={DURATION.card} className="mt-6">
              <BlueBox {...believe} />
            </Reveal>
            <Reveal y={DISTANCE.card} duration={DURATION.card}>
              <Cluster4 ctx={ctx} />
            </Reveal>
            <Reveal y={DISTANCE.card} duration={DURATION.card} className="-mt-6">
              <ClosingCta heading={closingHeading} />
            </Reveal>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Mobile layout — timeline line on the left, single-column */}
      {/* content pairing each cluster with its adjacent blue card.*/}
      {/* ======================================================== */}
      <div className="relative mx-auto mt-20 w-full max-w-[520px] pl-10 pr-4 min-[992px]:hidden">
        <TimelineLine className="left-4" />

        <div className="flex flex-col gap-y-10">
          <Reveal y={DISTANCE.card} duration={DURATION.card}>
            <Cluster1 ctx={ctx} />
          </Reveal>
          <Reveal y={DISTANCE.card} duration={DURATION.card}>
            <BlueBox {...specialty} />
          </Reveal>
          {/* mt-20 compensates for Cluster2's top-[-22%] overhang (blue-door
              extends ~83px above the cluster box) so it doesn't collide with
              the BlueBox above. */}
          <Reveal y={DISTANCE.card} duration={DURATION.card} className="mt-20">
            <Cluster2 ctx={ctx} />
          </Reveal>
          <Reveal y={DISTANCE.card} duration={DURATION.card}>
            <BlueBox {...believe} />
          </Reveal>
          {/* Nudge Cluster3 down into the gap below it — adds breathing room
              above, tightens spacing to the "WHY OUR BUYERS BECOME LIFERS"
              card. Net vertical footprint unchanged. */}
          <Reveal y={DISTANCE.card} duration={DURATION.card} className="mt-4">
            <Cluster3 ctx={ctx} />
          </Reveal>
          <Reveal y={DISTANCE.card} duration={DURATION.card} className="-mt-4">
            <BlueBox {...lifers} />
          </Reveal>
          <Reveal y={DISTANCE.card} duration={DURATION.card}>
            <Cluster4 ctx={ctx} />
          </Reveal>
          <Reveal y={DISTANCE.card} duration={DURATION.card}>
            <ClosingCta heading={closingHeading} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}


// ------------------------------------------------------------------
// Timeline line — positions differ (center on desktop, left on mobile)
// but otherwise identical: 2px blue bar, hollow circles at each end, and
// extends ~120px past its relative parent so it bleeds into the next section.
// ------------------------------------------------------------------


function TimelineLine({ className = "" }: { className?: string }) {
  // Circle fills match the band behind each end so the line doesn't show
  // through the hollow center: cream at the top (inside this section) and
  // yellow at the bottom (the footer band the line bleeds into).
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 h-[calc(100%+170px)] w-[5px] bg-brand-blue ${className}`}
    >
      <span className="absolute -top-[12px] left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-[5px] border-brand-blue bg-[#f8f4ec]" />
      <span className="absolute -bottom-[12px] left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-[5px] border-brand-blue bg-brand-yellow" />
    </div>
  );
}


// ------------------------------------------------------------------
// Blue info box
// ------------------------------------------------------------------


function BlueBox({
  heading,
  body,
}: {
  heading: string;
  body: React.ReactNode;
}) {
  return (
    <div className="bg-[#dbe2ec] p-5 md:p-6">
      <h3 className="font-sans text-[15px] font-medium uppercase tracking-wider text-brand-blue md:text-base">
        {heading}
      </h3>
      <div className="mt-4 space-y-3 font-body text-[14.5px] leading-relaxed text-black md:text-[15px]">
        {body}
      </div>
    </div>
  );
}


function ClosingCta({ heading }: { heading: string }) {
  return (
    <div>
      <h3 className="font-script text-[40px] leading-none text-brand-blue md:text-[52px]">
        {heading}
      </h3>
      <div className="mt-5 flex flex-col items-start gap-3">
        {CTAS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="bg-brand-orange px-8 py-3 font-sans text-[15px] font-medium tracking-wider text-white transition hover:brightness-95 md:text-[16px]"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}


// ------------------------------------------------------------------
// Photo primitives
// ------------------------------------------------------------------


function PhotoFrame({
  src,
  alt,
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={`relative border-4 border-white shadow-xl ${className ?? ""}`}>
      <Image
        src={src ?? "/assets/images/placeholder.svg"}
        alt={alt ?? ""}
        fill
        sizes="(min-width: 992px) 300px, 80vw"
        className="object-cover"
      />
    </div>
  );
}


// Absolutely-positioned, parallaxed, rotated photo — the building block for
// every cluster. Position/size are passed as className tokens so the caller
// keeps tight control over layout; rotation and parallax depth are props.
// The motion value is always applied; when parallax is disabled (touch or
// reduced-motion) the hook's output range collapses to 0 so the image stays
// put without breaking the motion.div's transform handoff.
// `src`/`alt` are optional — omit for a placeholder while a cluster is still
// being wired up.
function Photo({
  ctx,
  depth,
  rotate,
  position,
  aspect,
  src,
  alt,
}: {
  ctx: ParallaxCtx;
  depth: keyof typeof DEPTH;
  rotate: number;
  position: string;
  aspect: string;
  src?: string;
  alt?: string;
}) {
  const amount = ctx.enabled ? DEPTH[depth] : 0;
  const y = useTransform(ctx.scrollProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div style={{ y, rotate }} className={`absolute ${position}`}>
      <PhotoFrame src={src} alt={alt} className={`w-full ${aspect}`} />
    </motion.div>
  );
}


// ------------------------------------------------------------------
// Clusters
// Each is a relative box with a fixed aspect-ratio so its children (individual
// tilted photos, positioned via %) scale as a single unit. DOM order doubles
// as z-order: later children sit above earlier ones, and receive a stronger
// parallax offset.
// ------------------------------------------------------------------


function Cluster1({ ctx }: { ctx: ParallaxCtx }) {
  // DOM order = z-order: dog-1 first so photo-3 paints over it.
  return (
    <div className="relative mx-auto aspect-[9/4] w-full max-w-[460px]">
      <Photo
        ctx={ctx}
        depth="back"
        rotate={-5}
        position="right-[0%] top-[2%] w-[52%]"
        aspect="aspect-[872/673]"
        src="/assets/images/dog-1.webp"
        alt="Dog on the beach"
      />
      <Photo
        ctx={ctx}
        depth="front"
        rotate={5}
        position="left-[14%] top-[-14%] w-[42.5%]"
        aspect="aspect-[4/3]"
        src="/assets/images/photo-3.webp"
        alt="Fire Island home"
      />
    </div>
  );
}


function Cluster2({ ctx }: { ctx: ParallaxCtx }) {
  return (
    <div className="relative mx-auto aspect-[10/9] w-full max-w-[420px]">
      {/* Top-right: blue-door house */}
      <Photo
        ctx={ctx}
        depth="back"
        rotate={0}
        position="right-[2%] top-[-22%] w-[60%]"
        aspect="aspect-[886/750]"
        src="/assets/images/blue-door-house.webp"
        alt="Blue-door beach house"
      />
      {/* Middle-left: grandpa with family */}
      <Photo
        ctx={ctx}
        depth="mid"
        rotate={-3}
        position="left-[-4%] top-[0%] w-[55%]"
        aspect="aspect-[886/750]"
        src="/assets/images/grandpa-fam.webp"
        alt="Grandpa with the family"
      />
      {/* Bottom-right: mom and daughter */}
      <Photo
        ctx={ctx}
        depth="front"
        rotate={4}
        position="right-[10%] top-[25%] w-[50%]"
        aspect="aspect-[579/778]"
        src="/assets/images/mom-and-daughter.webp"
        alt="Mom and daughter on the beach"
      />
    </div>
  );
}


function Cluster3({ ctx }: { ctx: ParallaxCtx }) {
  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-[460px]">
      <Photo
        ctx={ctx}
        depth="back"
        rotate={-5}
        position="left-[2%] top-[8%] w-[54%]"
        aspect="aspect-[885/752]"
        src="/assets/images/bbq-umbrella.webp"
        alt="BBQ under a beach umbrella"
      />
      <Photo
        ctx={ctx}
        depth="front"
        rotate={7}
        position="right-[2%] top-[0%] w-[46%]"
        aspect="aspect-[580/779]"
        src="/assets/images/cornfield-farmhouse.webp"
        alt="Farmhouse at the edge of a cornfield"
      />
    </div>
  );
}


function Cluster4({ ctx }: { ctx: ParallaxCtx }) {
  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-[360px]">
      <Photo
        ctx={ctx}
        depth="mid"
        rotate={4}
        position="right-[2%] top-[4%] w-[72%]"
        aspect="aspect-[948/802]"
        src="/assets/images/blue-pool.webp"
        alt="Blue pool at a Fire Island home"
      />
    </div>
  );
}
