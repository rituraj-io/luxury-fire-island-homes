// PropertyDetails — yellow band on /rentals/[slug]. Three stacked detail
// columns (House rules / Safety & property / Cancellation), then a full
// pricing & fees panel beneath them. Uses the site's cream tile vocabulary
// and uppercase Gopher column headings.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { Rental } from "@/lib/rentals";


type Props = { rental: Rental };


function DetailCard({
	heading,
	items,
}: {
	heading: string;
	items: string[] | string;
}) {
	const list = Array.isArray(items) ? items : [items];
	return (
		<div className="h-full rounded-2xl bg-[#fffbf8] p-6 md:p-7">
			<h3 className="font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[14px]">
				{heading}
			</h3>
			<ul className="mt-5 space-y-3 font-body text-[14px] leading-relaxed text-black md:text-[15px]">
				{list.map((item, i) => (
					<li key={i} className="flex gap-3">
						<span
							aria-hidden
							className="mt-[9px] inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-brand-blue"
						/>
						<span>{item}</span>
					</li>
				))}
			</ul>
		</div>
	);
}


export default function PropertyDetails({ rental }: Props) {
	if (!rental.rules && !rental.pricing) return null;

	const rules = rental.rules;
	const pricing = rental.pricing;

	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
				<Reveal
					as="h2"
					className="text-center font-script text-[36px] leading-[1.1] text-brand-blue md:text-[52px] lg:text-[56px]"
				>
					Things to know
				</Reveal>

				{rules && (
					<RevealStagger
						gap={STAGGER.card}
						className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:gap-5"
					>
						<RevealItem y={DISTANCE.card} duration={DURATION.card}>
							<DetailCard heading="House rules" items={rules.house} />
						</RevealItem>
						<RevealItem y={DISTANCE.card} duration={DURATION.card}>
							<DetailCard heading="Safety &amp; property" items={rules.safety} />
						</RevealItem>
						<RevealItem y={DISTANCE.card} duration={DURATION.card}>
							<DetailCard heading="Cancellation policy" items={rules.cancellation} />
						</RevealItem>
					</RevealStagger>
				)}

				{pricing && (
					<Reveal
						y={DISTANCE.card}
						duration={DURATION.card}
						delay={0.1}
						className="mt-10 rounded-2xl bg-[#fffbf8] p-6 md:mt-12 md:p-8"
					>
						<div className="grid gap-8 md:grid-cols-3">
							<div>
								<h3 className="font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[14px]">
									Availability
								</h3>
								<p className="mt-4 font-body text-[14px] leading-relaxed text-black md:text-[15px]">
									{pricing.availability}
								</p>
							</div>

							<div>
								<h3 className="font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[14px]">
									Pricing
								</h3>
								<ul className="mt-4 space-y-2 font-body text-[14px] leading-relaxed text-black md:text-[15px]">
									{pricing.tiers.map((t) => (
										<li key={t.label} className="flex items-baseline justify-between gap-3">
											<span>{t.label}</span>
											<span className="font-semibold">{t.value}</span>
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className="font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[14px]">
									Additional fees
								</h3>
								<ul className="mt-4 space-y-2 font-body text-[14px] leading-relaxed text-black md:text-[15px]">
									{pricing.fees.map((f) => (
										<li key={f.label} className="flex items-baseline justify-between gap-3">
											<span>{f.label}</span>
											<span className="font-semibold">{f.value}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<p className="mt-8 border-t border-brand-blue/20 pt-6 text-center font-sans text-[14px] italic leading-snug text-brand-blue md:text-[15px]">
							Call the listing agent or Luxury Fire Island Homes at{" "}
							<a
								href={`tel:${pricing.bookingPhone.replace(/[^0-9+]/g, "")}`}
								className="font-semibold not-italic"
							>
								{pricing.bookingPhone}
							</a>
							{rental.referenceCode && (
								<>
									{" "}— mention reference code{" "}
									<span className="font-semibold not-italic">#{rental.referenceCode}</span>.
								</>
							)}
						</p>
					</Reveal>
				)}
			</div>
		</section>
	);
}
