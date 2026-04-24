// PropertyOverview — cream band on /rentals/[slug]. Two-column layout on
// desktop: long-form description, feature tiles, rooms & beds, spaces, and
// agents on the left; a sticky-ish pricing / booking card on the right in
// the site's polaroid-ish vocabulary. Mobile stacks in a single column with
// the pricing card at the top so the primary CTA is immediately reachable.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { Rental } from "@/lib/rentals";


type Props = { rental: Rental };


function BookingCard({ rental }: Props) {
	const tel = rental.pricing?.bookingPhone
		? `tel:${rental.pricing.bookingPhone.replace(/[^0-9+]/g, "")}`
		: undefined;
	return (
		<aside className="bg-[#fffbf8] p-6 shadow-xl md:p-8">
			<p className="font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-brand-blue">
				From
			</p>
			<p className="mt-1 font-script text-[40px] leading-none text-brand-blue md:text-[52px]">
				{rental.pricePerWeek}
			</p>

			<div className="mt-5 space-y-2 border-t border-brand-blue/20 pt-5 font-body text-[14px] leading-relaxed text-black">
				<p>
					<span className="font-semibold">Bedrooms</span> · {rental.beds}
				</p>
				<p>
					<span className="font-semibold">Bathrooms</span> · {rental.baths}
				</p>
				<p>
					<span className="font-semibold">Sleeps</span> · {rental.sleeps}
				</p>
				{rental.referenceCode && (
					<p>
						<span className="font-semibold">Reference</span> · {rental.referenceCode}
					</p>
				)}
			</div>

			{tel && (
				<a
					href={tel}
					className="mt-6 block bg-brand-orange px-5 py-3 text-center font-sans text-[14px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
				>
					Call to Book {rental.pricing?.bookingPhone}
				</a>
			)}
			<a
				href="#inquiry"
				className="mt-3 block border-2 border-brand-blue px-5 py-3 text-center font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5"
			>
				Check Availability
			</a>

			{rental.referenceCode && (
				<p className="mt-5 font-sans text-[12px] italic leading-snug text-brand-blue/70">
					Mention reference code #{rental.referenceCode} when booking.
				</p>
			)}
		</aside>
	);
}


export default function PropertyOverview({ rental }: Props) {
	const description = rental.description ?? [];
	const features = rental.features ?? [];
	const rooms = rental.rooms ?? [];
	const spaces = rental.spaces ?? [];
	const agents = rental.agents ?? [];

	if (
		description.length === 0 &&
		features.length === 0 &&
		rooms.length === 0 &&
		!rental.pricing
	) {
		return null;
	}

	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 md:px-8 min-[992px]:grid-cols-[1fr_360px] min-[992px]:gap-14">
				{/* Mobile: booking card first so the primary CTA is reachable */}
				<div className="order-1 min-[992px]:hidden">
					<BookingCard rental={rental} />
				</div>

				<div className="order-2 min-[992px]:order-1">
					{description.length > 0 && (
						<RevealStagger className="max-w-[640px]">
							<RevealItem
								as="h2"
								className="font-script text-[32px] leading-[1.1] text-brand-blue md:text-[44px]"
							>
								About this home
							</RevealItem>

							{description.map((p, i) => (
								<RevealItem
									key={i}
									as="p"
									className="mt-5 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
								>
									{p}
								</RevealItem>
							))}
						</RevealStagger>
					)}

					{features.length > 0 && (
						<div className="mt-12 md:mt-14">
							<Reveal
								as="h3"
								className="font-sans text-[15px] font-medium uppercase tracking-[0.2em] text-brand-blue md:text-[16px]"
							>
								Features
							</Reveal>
							<RevealStagger
								gap={STAGGER.card}
								className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
							>
								{features.map((f) => (
									<RevealItem key={f}>
										<div className="flex h-full min-h-[72px] items-center justify-center rounded-xl bg-[#fffbf8] px-4 py-4 text-center font-sans text-[14px] font-medium leading-snug text-brand-blue md:text-[15px]">
											{f}
										</div>
									</RevealItem>
								))}
							</RevealStagger>
						</div>
					)}

					{rooms.length > 0 && (
						<div className="mt-12 md:mt-14">
							<Reveal
								as="h3"
								className="font-sans text-[15px] font-medium uppercase tracking-[0.2em] text-brand-blue md:text-[16px]"
							>
								Rooms &amp; beds
							</Reveal>
							<RevealStagger
								gap={STAGGER.card}
								className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
							>
								{rooms.map((r) => (
									<RevealItem key={r.label} y={DISTANCE.card} duration={DURATION.card}>
										<div className="h-full rounded-xl bg-white p-5 shadow-sm">
											<p className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-brand-blue">
												{r.label}
											</p>
											<p className="mt-3 font-body text-[15px] leading-snug text-black">
												{r.bedSummary}
											</p>
											<p className="mt-3 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-blue/70">
												Sleeps {r.sleeps}
											</p>
										</div>
									</RevealItem>
								))}
							</RevealStagger>
						</div>
					)}

					{(spaces.length > 0 || rental.kitchenNote) && (
						<div className="mt-12 md:mt-14">
							<Reveal
								as="h3"
								className="font-sans text-[15px] font-medium uppercase tracking-[0.2em] text-brand-blue md:text-[16px]"
							>
								Spaces
							</Reveal>
							{spaces.length > 0 && (
								<Reveal
									as="p"
									delay={0.05}
									className="mt-4 font-body text-[15px] leading-relaxed text-black md:text-[16px]"
								>
									{spaces.join(" · ")}
								</Reveal>
							)}
							{rental.kitchenNote && (
								<Reveal
									as="p"
									delay={0.08}
									className="mt-2 font-body text-[14px] italic leading-relaxed text-black/70"
								>
									{rental.kitchenNote}
								</Reveal>
							)}
						</div>
					)}

					{agents.length > 0 && (
						<div className="mt-12 md:mt-14">
							<Reveal
								as="h3"
								className="font-sans text-[15px] font-medium uppercase tracking-[0.2em] text-brand-blue md:text-[16px]"
							>
								Listed by
							</Reveal>
							<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
								{agents.map((a) => (
									<div
										key={a.name}
										className="bg-[#dbe2ec] p-5"
									>
										<p className="font-sans text-[16px] font-medium text-brand-blue">
											{a.name}
										</p>
										<p className="mt-1 font-sans text-[13px] italic text-brand-blue/80">
											{a.title}
										</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Desktop: sticky-ish booking column on the right */}
				<div className="order-3 hidden min-[992px]:order-2 min-[992px]:block">
					<div className="sticky top-36">
						<BookingCard rental={rental} />
					</div>
				</div>
			</div>
		</section>
	);
}
