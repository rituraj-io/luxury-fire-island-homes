// FlexibilityOptions — cream band on /manage. Script headline, short intro,
// three rhetorical-question tiles, and the page's biggest bottom-half
// typographic gesture: "DONE. DONE. AND DONE." rendered with the same
// outlined-display treatment used for the homepage hero ("THE SANDIER SIDE")
// and the Services tab labels — so this page's climax visually rhymes with
// the rest of the site.
//
// Closes with a blue-gray investor callout (BlueBox vocabulary borrowed from
// WhereWeComeIn) and an italic parting line.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";


const QUESTIONS = [
	"Prefer to stay off Airbnb entirely?",
	"Want guests vetted by us only?",
	"Only want to rent to return guests or families?",
];


const DONE_LABEL =
	"font-display leading-none tracking-[0.04em] text-[56px] sm:text-[72px] md:text-[96px] lg:text-[120px]";
const DONE_OUTLINE = {
	WebkitTextStroke: "3px var(--color-brand-blue)",
	paintOrder: "stroke fill",
	color: "var(--color-brand-yellow)",
} as const;


export default function FlexibilityOptions() {
	return (
		<section className="w-full overflow-hidden bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[40px] leading-[1.05] text-brand-blue md:text-[56px] lg:text-[64px]"
				>
					Want Flexibility? We&apos;ve Got Options.
				</Reveal>

				<Reveal
					as="p"
					delay={0.05}
					className="mx-auto mt-6 max-w-[620px] text-center font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					Not every homeowner wants the same thing—and that&apos;s the point. Whether
					you&apos;re looking to rent just a few weeks, maximize income, or keep things super
					low-key, we offer custom plans to fit your needs.
				</Reveal>

				{/* Three rhetorical-question tiles */}
				<RevealStagger
					gap={STAGGER.card}
					className="mx-auto mt-12 grid w-full max-w-[980px] grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4"
				>
					{QUESTIONS.map((q) => (
						<RevealItem key={q} y={DISTANCE.card} duration={DURATION.card}>
							<div className="flex h-full min-h-[150px] items-center justify-center rounded-2xl bg-[#fffbf8] px-5 py-6 text-center md:min-h-[170px] md:px-6 md:py-7">
								<p className="font-sans text-[17px] font-medium italic leading-snug text-brand-blue md:text-[18px]">
									{q}
								</p>
							</div>
						</RevealItem>
					))}
				</RevealStagger>

				{/* "DONE. DONE. AND DONE." — the typographic climax */}
				<RevealStagger
					gap={STAGGER.card}
					delay={0.1}
					className="mt-12 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-3 md:mt-14 md:gap-x-10"
				>
					<RevealItem y={DISTANCE.card} duration={DURATION.card}>
						<span className={DONE_LABEL} style={DONE_OUTLINE}>
							DONE.
						</span>
					</RevealItem>
					<RevealItem y={DISTANCE.card} duration={DURATION.card}>
						<span
							className={`${DONE_LABEL} inline-block rotate-[3deg]`}
							style={DONE_OUTLINE}
						>
							DONE.
						</span>
					</RevealItem>
					<RevealItem y={DISTANCE.card} duration={DURATION.card}>
						<span
							className={`${DONE_LABEL} inline-block -rotate-[2deg]`}
							style={DONE_OUTLINE}
						>
							AND DONE.
						</span>
					</RevealItem>
				</RevealStagger>

				{/* Investor callout — blue-gray BlueBox pattern borrowed from
				    WhereWeComeIn so this page visually rhymes with /buy. */}
				<Reveal
					y={DISTANCE.card}
					duration={DURATION.card}
					className="mx-auto mt-14 w-full max-w-[720px] bg-[#dbe2ec] p-6 md:mt-16 md:p-8"
				>
					<h3 className="font-sans text-[15px] font-medium uppercase tracking-wider text-brand-blue md:text-base">
						We&apos;re Investors, Too.
					</h3>
					<div className="mt-4 space-y-3 font-body text-[14.5px] leading-relaxed text-black md:text-[15px]">
						<p>
							<span className="font-semibold">We&apos;re also investors ourselves</span>,
							so if your home has strong rental history, we can help present it as an{" "}
							<span className="font-semibold">investment opportunity</span> if/when you
							choose to sell&mdash;complete with cap rates, cash-on-cash returns, and
							value-add upside.
						</p>
					</div>
				</Reveal>

				<Reveal
					as="p"
					delay={0.05}
					className="mx-auto mt-10 max-w-[620px] text-center font-sans text-[18px] italic leading-relaxed text-brand-blue md:text-[20px]"
				>
					You just enjoy the income—and maybe block off a week for yourself (because beach
					walks hit different when you own the place).
				</Reveal>
			</div>
		</section>
	);
}
