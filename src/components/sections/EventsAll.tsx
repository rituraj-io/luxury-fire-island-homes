// EventsAll — full /events page grid. Same card vocabulary as the homepage
// Events carousel (date badge over photo, title + location below) but laid
// out as a responsive grid so visitors can scan everything at once.

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { CmsEvent } from "@/lib/cms";


type Props = { events: CmsEvent[] };


function formatDateBadge(iso: string): { month: string; day: string; year: string } {
	const d = new Date(iso);
	const month = d
		.toLocaleString("en-US", { month: "long", timeZone: "UTC" })
		.toUpperCase();
	const day = String(d.getUTCDate());
	const year = String(d.getUTCFullYear());
	return { month, day, year };
}


export default function EventsAll({ events }: Props) {
	return (
		<section className="w-full bg-[#f8f4ec] pb-16 pt-[calc(144px+env(safe-area-inset-top)+2rem)] md:pb-20 md:pt-[calc(144px+env(safe-area-inset-top)+3rem)]">
			<div className="mx-auto w-full max-w-site px-4 md:px-8">
				<Reveal y={DISTANCE.text} duration={DURATION.text} className="flex flex-col items-center text-center">
					<p className="font-sans text-[14px] font-medium uppercase tracking-[0.22em] text-brand-blue">
						Fire Island
					</p>
					<h1 className="mt-3 font-script text-[40px] leading-none text-brand-blue md:text-[56px]">
						Community Events
					</h1>
					<p className="mt-5 max-w-[560px] font-body text-[16px] leading-relaxed text-black">
						Markets, parties, fundraisers, and everything in between — what&apos;s happening on the island, all in one place.
					</p>
				</Reveal>

				{events.length === 0 ? (
					<Reveal className="mt-16 text-center font-body text-[16px] text-black/70">
						No upcoming events listed right now — check back soon.
					</Reveal>
				) : (
					<RevealStagger
						gap={STAGGER.card}
						className="mx-auto mt-12 grid max-w-[420px] grid-cols-1 gap-6 sm:max-w-[820px] sm:grid-cols-2 md:mt-14 md:max-w-site lg:grid-cols-3"
					>
						{events.map((e) => {
							const { month, day, year } = formatDateBadge(e.startDate);
							return (
								<RevealItem key={e.id} y={DISTANCE.card} duration={DURATION.card}>
									<article className="group flex h-full flex-col bg-white shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl">
										<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
											<Image
												src={e.imageUrl}
												alt={e.eventTitle}
												fill
												className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
												sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
											/>
											<div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/20" />
											<div className="absolute bottom-3 left-3 z-10 flex flex-col items-center bg-white px-3 py-2 text-center shadow">
												<div className="font-sans text-[11px] font-medium tracking-wider text-brand-blue">
													{month}
												</div>
												<div className="font-sans text-[22px] font-medium leading-none text-brand-blue">
													{day}
												</div>
												<div className="mt-0.5 font-sans text-[10px] font-medium tracking-wider text-brand-blue/70">
													{year}
												</div>
											</div>
										</div>
										<div className="flex flex-1 flex-col px-5 py-5">
											<p className="font-sans text-[17px] font-medium leading-snug text-brand-blue">
												{e.eventTitle}
											</p>
											<p className="mt-2 font-sans text-[14px] text-brand-blue/80">
												{e.location}
											</p>
										</div>
									</article>
								</RevealItem>
							);
						})}
					</RevealStagger>
				)}
			</div>
		</section>
	);
}
