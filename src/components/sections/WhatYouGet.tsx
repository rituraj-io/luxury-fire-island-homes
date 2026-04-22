// WhatYouGet — "Here's what you get:" yellow band with a 4x4 grid of perks
// and a closing "BOTTOM LINE?" stanza. Sits directly below WhereWeComeIn;
// its yellow matches the circle at the end of that section's timeline line,
// so the line bleeds cleanly into this band. Mobile collapses the grid to
// two columns.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";


const PERKS = [
  "1-Year Home Warranty – On Us.",
  "Early Access to Homes Before They Hit the Market",
  "$100 Off Attorney Services",
  "Buyer Satisfaction Guarantee",
  "Cancel Anytime Promise",
  "Post-Closing Support",
  "We’ll Rent Your Home & Make You Money",
  "Your Wallet Deserves a Vacation Too",
  "Lock & Shop Guarantee",
  "Rate Match Guarantee",
  "Rate Drop Protection",
  "Same-Day Pre-Approval",
  "14-Day Closing",
  "Close-On-Time Guarantee",
  "First Responder Discount",
  "???",
];


export default function WhatYouGet() {
  return (
    <section className="w-full bg-brand-yellow pb-16 pt-36 md:pb-20 md:pt-40">
      <div className="mx-auto w-full max-w-[980px] px-4 md:px-8">
        <Reveal
          as="h2"
          className="text-center font-script text-[40px] leading-none text-brand-blue md:text-[52px]"
        >
          Here&apos;s what you get:
        </Reveal>

        <RevealStagger className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
          {PERKS.map((perk) => (
            <RevealItem
              key={perk}
              className="flex min-h-[130px] items-center justify-center rounded-2xl bg-[#faf6e8] px-4 py-6 text-center font-sans text-[16px] font-semibold uppercase leading-tight tracking-wider text-brand-blue md:min-h-[150px] md:py-8 md:text-[18px]"
            >
              {perk}
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal
          as="h3"
          delay={0.05}
          className="mt-14 text-center font-sans text-[24px] font-bold uppercase tracking-wider text-brand-blue md:mt-16"
        >
          Bottom Line?
        </Reveal>

        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mt-4 max-w-[560px] text-center font-sans text-[22px] font-semibold italic leading-relaxed text-brand-blue"
        >
          We want you in your dream home,
          <br />
          without draining your vacation fund.
        </Reveal>
      </div>
    </section>
  );
}
