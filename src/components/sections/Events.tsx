"use client";


// Events — looping carousel of community event cards on an orange band.
// Reuses the exact same carousel mechanics as Properties: 3/2/1 cards per
// viewport, duplicated strip with post-transition snap-back for seamless
// wrap-around.

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Reveal from "@/components/motion/Reveal";
import { DISTANCE, DURATION } from "@/lib/motion";


type EventItem = {
	image: string;
	month: string;
	day: string;
	title: string;
	location: string;
	time: string;
	price: string;
};


const EVENTS: EventItem[] = [
	{
		image: "/assets/images/placeholder.svg",
		month: "MARCH",
		day: "17",
		title: "St Patricks Bar Crawl",
		location: "Kismet",
		time: "3pm",
		price: "$30",
	},
	{
		image: "/assets/images/placeholder.svg",
		month: "APRIL",
		day: "4",
		title: "Easter Egg Hunt",
		location: "Davis Park",
		time: "8am-11am",
		price: "FREE",
	},
	{
		image: "/assets/images/placeholder.svg",
		month: "APRIL",
		day: "22",
		title: "Community Bagel Breakfast",
		location: "Ocean Beach Office",
		time: "8am-11am",
		price: "FREE",
	},
	{
		image: "/assets/images/placeholder.svg",
		month: "MAY",
		day: "10",
		title: "Beach Cleanup Day",
		location: "Ocean Bay Park",
		time: "9am-12pm",
		price: "FREE",
	},
	{
		image: "/assets/images/placeholder.svg",
		month: "MAY",
		day: "25",
		title: "Memorial Day BBQ",
		location: "Seaview",
		time: "12pm-4pm",
		price: "$20",
	},
];


const GAP = 20;


export default function Events() {
	const total = EVENTS.length;
	const strip = [...EVENTS, ...EVENTS];

	const [index, setIndex] = useState(0);
	const [animate, setAnimate] = useState(true);
	const [visible, setVisible] = useState(3);
	const [cardW, setCardW] = useState(0);
	const viewportRef = useRef<HTMLDivElement>(null);
	const indexRef = useRef(0);
	const visibleRef = useRef(3);

	useLayoutEffect(() => {
		const update = () => {
			if (!viewportRef.current) return;
			const w = viewportRef.current.getBoundingClientRect().width;
			const v = window.matchMedia("(min-width: 992px)").matches
				? 3
				: window.matchMedia("(min-width: 768px)").matches
					? 2
					: 1;
			setVisible(v);
			setCardW((w - (v - 1) * GAP) / v);
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	useLayoutEffect(() => {
		indexRef.current = index;
		visibleRef.current = visible;
	}, [index, visible]);

	const onTransitionEnd = () => {
		if (index >= total) {
			setAnimate(false);
			setIndex(index - total);
		} else if (index < 0) {
			setAnimate(false);
			setIndex(index + total);
		}
	};

	const step = (dir: 1 | -1) => {
		const cur = indexRef.current;
		const target = cur + dir;
		const maxIdx = strip.length - visibleRef.current;
		if (target < 0 || target > maxIdx) {
			flushSync(() => {
				setAnimate(false);
				setIndex(cur - dir * total);
			});
		}
		setAnimate(true);
		setIndex((i) => i + dir);
	};

	const prev = () => step(-1);
	const next = () => step(1);

	const stride = cardW + GAP;

	return (
		<section className="w-full bg-brand-orange py-16 md:py-20">
			<div className="mx-auto w-full max-w-site px-4 md:px-8">
				<Reveal as="h2" className="text-center font-sans text-xl font-medium uppercase tracking-wider text-white md:text-2xl">
					<span className="mr-2 inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
						Upcoming
					</span>
					Community Events
				</Reveal>
			</div>

			<Reveal y={0} duration={0.8} delay={0.05} className="relative mx-auto mt-10 w-full max-w-site px-12 md:px-16">
				<button
					type="button"
					aria-label="Previous events"
					onClick={prev}
					className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center md:left-4"
				>
					<Image src="/assets/images/angle-small-left.svg" alt="" width={32} height={32} className="h-8 w-8" />
				</button>

				<button
					type="button"
					aria-label="Next events"
					onClick={next}
					className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center md:right-4"
				>
					<Image src="/assets/images/angle-small-right.svg" alt="" width={32} height={32} className="h-8 w-8" />
				</button>

				<div ref={viewportRef} className="overflow-hidden">
					<ul
						onTransitionEnd={onTransitionEnd}
						style={{
							transform: `translate3d(${-index * stride}px, 0, 0)`,
							transition: animate ? "transform 500ms ease" : "none",
						}}
						className="flex"
					>
						{strip.map((e, i) => (
							<li
								key={`${e.title}-${i}`}
								style={{
									width: cardW ? `${cardW}px` : `${100 / visible}%`,
									marginRight: i === strip.length - 1 ? 0 : GAP,
								}}
								className="shrink-0 bg-white"
							>
								<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
									<Image
										src={e.image}
										alt={e.title}
										fill
										className="object-cover"
										sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
									/>
									<div className="absolute bottom-2 left-2 bg-white px-3 py-2 text-center shadow">
										<div className="font-sans text-[11px] font-medium tracking-wider text-brand-blue">
											{e.month}
										</div>
										<div className="font-sans text-xl font-medium leading-none text-brand-blue">
											{e.day}
										</div>
									</div>
								</div>

								<div className="px-5 pb-5 pt-5">
									<p className="font-sans text-[16px] font-medium text-brand-blue">
										{e.title}
									</p>
									<p className="mt-1 font-sans text-[14px] text-brand-blue">
										{e.location}
									</p>
									<div className="mt-4 flex items-center justify-between font-sans text-[14px] text-brand-blue">
										<span>{e.time}</span>
										<span>{e.price}</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</Reveal>

			<Reveal className="mx-auto mt-10 flex w-full max-w-site justify-center px-4">
				<Link
					href="#events"
					className="bg-brand-yellow px-5 py-3 font-sans text-[16px] font-medium tracking-wider text-[#1a5c89] transition hover:brightness-95"
				>
					SEE ALL EVENTS
				</Link>
			</Reveal>
		</section>
	);
}
