// RentalDifference — two side-by-side clusters on the cream band. Each
// cluster pairs a pale-blue text card with a tilted photo collage. The
// first cluster also carries the yellow brand seal. Shares the Welcome
// section's background so the two bleed into one continuous cream band.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Bob from "@/components/motion/Bob";
import { DISTANCE, DURATION } from "@/lib/motion";


const BLUE_BOX = "bg-[#c9d8e7] p-7 md:p-8";
const BOX_HEADING = "font-sans text-[15px] font-medium uppercase tracking-wider text-brand-blue md:text-[17px]";
const BOX_BODY = "mt-4 font-body text-[14px] leading-relaxed text-brand-blue md:text-[15px]";


export default function RentalDifference() {
	return (
		<section className="w-full bg-[#f8f4ec] pb-16 md:pb-24">
			{/* ---------- Desktop ---------- */}
			<div className="mx-auto hidden w-full max-w-[1100px] px-8 min-[992px]:block">
				{/* Cluster 1 — text left, photos + badge right */}
				<div className="relative grid grid-cols-2 gap-x-12">
					<Reveal y={DISTANCE.text} className={`${BLUE_BOX} max-w-[440px] self-center`}>
						<h2 className={BOX_HEADING}>The Luxury Fire Island Homes Difference:</h2>
						<p className={BOX_BODY}>
							At Luxury Fire Island Homes, we take the stress off your plate and match
							you with a vacation rental that actually delivers&mdash;from the spotless
							kitchen to the smooth check-in to the sunset view you&apos;ll be bragging
							about for months.
						</p>
					</Reveal>

					<Reveal
						y={DISTANCE.card}
						duration={DURATION.card}
						delay={0.1}
						className="relative aspect-[520/340] w-full"
					>
						<Bob className="absolute left-[6%] top-[4%] z-10 w-[58%]" delay={0.2} amplitude={3.5} duration={3}>
							<div className="rotate-[4deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image src="/assets/images/bbq-umbrella.webp" alt="" width={885} height={752} className="h-auto w-full" sizes="25vw" />
								</div>
							</div>
						</Bob>

						<Bob className="absolute right-[2%] top-[22%] z-20 w-[40%]" delay={0.7} amplitude={3} duration={2.8}>
							<div className="rotate-[7deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image src="/assets/images/cornfield-farmhouse.webp" alt="" width={580} height={779} className="h-auto w-full" sizes="22vw" />
								</div>
							</div>
						</Bob>

						<div className="absolute left-[48%] top-[90%] z-20 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow p-1.5 shadow-lg">
							<Image src="/assets/images/logo-seal-blue.svg" alt="" width={120} height={120} className="h-full w-full rotate-[5deg]" />
						</div>
					</Reveal>
				</div>

				{/* Cluster 2 — photos left, text right */}
				<div className="mt-20 grid grid-cols-2 gap-x-12">
					<Reveal
						y={DISTANCE.card}
						duration={DURATION.card}
						className="relative aspect-[480/340] w-full"
					>
						<Bob className="absolute right-[2%] top-[2%] z-10 w-[58%]" delay={0.25} amplitude={3.5} duration={3}>
							<div className="-rotate-[4deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image src="/assets/images/dog-1.webp" alt="" width={872} height={673} className="h-auto w-full" sizes="25vw" />
								</div>
							</div>
						</Bob>

						<Bob className="absolute left-[4%] top-[40%] z-20 w-[50%]" delay={0.75} amplitude={3} duration={2.8}>
							<div className="rotate-[7deg]">
								<div className="relative aspect-[4/3] w-full overflow-hidden border-4 border-white bg-neutral-200 shadow-xl">
									<Image src="/assets/images/photo-3.webp" alt="" fill className="object-cover" sizes="22vw" />
								</div>
							</div>
						</Bob>
					</Reveal>

					<Reveal y={DISTANCE.text} delay={0.1} className={`${BLUE_BOX} max-w-[460px] self-center`}>
						<h2 className={BOX_HEADING}>Fun for the whole family</h2>
						<p className={BOX_BODY}>
							Whether you&apos;re planning a peaceful couples&apos; weekend or a
							multi-family getaway (in-laws optional 😅), we&apos;ll find you the
							perfect place&mdash;fast and for at least $1K less than what you&apos;d
							pay on Airbnb or Vrbo.
						</p>
						<p className={BOX_BODY}>
							And yes, we have plenty of pet-friendly homes for rent. Because
							let&apos;s be honest&hellip; you&apos;re really coming so your favorite
							family member can hit the beach.
						</p>
					</Reveal>
				</div>
			</div>

			{/* ---------- Mobile (stacked) ---------- */}
			<div className="mx-auto w-full max-w-[560px] space-y-12 px-4 min-[992px]:hidden">
				<div>
					<Reveal y={DISTANCE.card} duration={DURATION.card} className="relative mx-auto aspect-[5/3] w-full max-w-[420px]">
						<div className="absolute left-[6%] top-0 z-10 w-[58%]">
							<div className="rotate-[4deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image src="/assets/images/bbq-umbrella.webp" alt="" width={885} height={752} className="h-auto w-full" sizes="50vw" />
								</div>
							</div>
						</div>
						<div className="absolute right-[2%] top-[18%] z-20 w-[42%]">
							<div className="rotate-[7deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image src="/assets/images/cornfield-farmhouse.webp" alt="" width={580} height={779} className="h-auto w-full" sizes="45vw" />
								</div>
							</div>
						</div>
						<div className="absolute left-[52%] top-[88%] z-20 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow p-1.5 shadow-lg">
							<Image src="/assets/images/logo-seal-blue.svg" alt="" width={120} height={120} className="h-full w-full rotate-[5deg]" />
						</div>
					</Reveal>

					<Reveal y={DISTANCE.text} className={`mt-16 ${BLUE_BOX}`}>
						<h2 className={BOX_HEADING}>The Luxury Fire Island Homes Difference:</h2>
						<p className={BOX_BODY}>
							At Luxury Fire Island Homes, we take the stress off your plate and match
							you with a vacation rental that actually delivers&mdash;from the spotless
							kitchen to the smooth check-in to the sunset view you&apos;ll be bragging
							about for months.
						</p>
					</Reveal>
				</div>

				<div>
					<Reveal y={DISTANCE.card} duration={DURATION.card} className="relative mx-auto mt-10 aspect-[5/3] w-full max-w-[420px]">
						<div className="absolute right-[2%] top-0 z-10 w-[58%]">
							<div className="-rotate-[4deg]">
								<div className="overflow-hidden border-4 border-white shadow-xl">
									<Image src="/assets/images/dog-1.webp" alt="" width={872} height={673} className="h-auto w-full" sizes="50vw" />
								</div>
							</div>
						</div>
						<div className="absolute left-[4%] top-[36%] z-20 w-[52%]">
							<div className="rotate-[7deg]">
								<div className="relative aspect-[4/3] w-full overflow-hidden border-4 border-white bg-neutral-200 shadow-xl">
									<Image src="/assets/images/photo-3.webp" alt="" fill className="object-cover" sizes="45vw" />
								</div>
							</div>
						</div>
					</Reveal>

					<Reveal y={DISTANCE.text} className={`mt-10 ${BLUE_BOX}`}>
						<h2 className={BOX_HEADING}>Fun for the whole family</h2>
						<p className={BOX_BODY}>
							Whether you&apos;re planning a peaceful couples&apos; weekend or a
							multi-family getaway (in-laws optional 😅), we&apos;ll find you the
							perfect place&mdash;fast and for at least $1K less than what you&apos;d
							pay on Airbnb or Vrbo.
						</p>
						<p className={BOX_BODY}>
							And yes, we have plenty of pet-friendly homes for rent. Because
							let&apos;s be honest&hellip; you&apos;re really coming so your favorite
							family member can hit the beach.
						</p>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
