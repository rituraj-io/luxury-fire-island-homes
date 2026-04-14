"use client";


// Properties — looping carousel of property cards on a yellow band.
// Shows 3 cards on desktop, 2 on tablet, 1 on mobile. Arrows slide the
// track by exactly one card width and wrap around by snapping the index
// back inside [0, total) after the slide transition ends.

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Reveal from "@/components/motion/Reveal";
import { DISTANCE, DURATION } from "@/lib/motion";


type Property = {
	image: string;
	price: string;
	title: string;
	location: string;
	stats: { label: string; value: string }[];
};


const PROPERTIES: Property[] = [
	{
		image: "/assets/images/placeholder.svg",
		price: "$2,700,000",
		title: "39 Sloop Walk",
		location: "Summer Club, NY",
		stats: [
			{ label: "BEDS", value: "4" },
			{ label: "BATHS", value: "3" },
			{ label: "SQFT", value: "2,500" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$1,400,000",
		title: "37 Duneway Avenue",
		location: "Seaview, NY",
		stats: [
			{ label: "BEDS", value: "5" },
			{ label: "BATHS", value: "3.5" },
			{ label: "SQFT", value: "1,951" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$10,000/week",
		title: "OBP24S",
		location: "Ocean Bay Park, Fire Island, NY",
		stats: [
			{ label: "BEDS", value: "3" },
			{ label: "BATHS", value: "3" },
			{ label: "SLEEPS", value: "10" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$3,250,000",
		title: "12 Bay Walk",
		location: "Ocean Beach, NY",
		stats: [
			{ label: "BEDS", value: "4" },
			{ label: "BATHS", value: "2.5" },
			{ label: "SQFT", value: "2,100" },
		],
	},
	{
		image: "/assets/images/placeholder.svg",
		price: "$8,500/week",
		title: "SEA12F",
		location: "Seaview, Fire Island, NY",
		stats: [
			{ label: "BEDS", value: "3" },
			{ label: "BATHS", value: "2" },
			{ label: "SLEEPS", value: "8" },
		],
	},
];


const GAP = 20;


export default function Properties() {
	const total = PROPERTIES.length;
	// Duplicate the list so advancing past the last card still lands on a
	// real card while we wait for the transition to finish and snap back.
	const strip = [...PROPERTIES, ...PROPERTIES];

	const [index, setIndex] = useState(0);
	const [animate, setAnimate] = useState(true);
	const [visible, setVisible] = useState(3);
	const [cardW, setCardW] = useState(0);
	const viewportRef = useRef<HTMLDivElement>(null);
	// Ref mirrors `index` so click handlers can read the latest value without
	// waiting for React to flush state between rapid clicks.
	const indexRef = useRef(0);
	const visibleRef = useRef(3);

	// Derive visible-count from viewport width and compute the exact pixel
	// width for each card so `visible` cards fill the viewport precisely.
	useLayoutEffect(() => {
		const update = () => {
			if (!viewportRef.current) return;
			// getBoundingClientRect gives the box width of the overflow
			// container, which now has no padding — so this is exactly the
			// space the cards must fill.
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
		// If the next step would fall outside the duplicated strip, first
		// snap the current index back by `total` (visually identical since
		// strip is duplicated) with no animation — then animate the real
		// step. flushSync ensures the snap render commits before the
		// animating update is scheduled.
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
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-site px-4 md:px-8">
				<Reveal as="h2" className="text-center font-sans text-xl font-medium uppercase tracking-wider text-brand-blue md:text-2xl">
					<span className="mr-2 inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
						Don&apos;t Worry
					</span>
					we&apos;ve got you covered
				</Reveal>
			</div>

			<Reveal y={0} duration={0.8} delay={0.05} className="relative mx-auto mt-10 w-full max-w-site px-12 md:px-16">
				<button
					type="button"
					aria-label="Previous properties"
					onClick={prev}
					className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center md:left-4"
				>
					<Image src="/assets/images/angle-small-left.svg" alt="" width={32} height={32} className="h-8 w-8" />
				</button>

				<button
					type="button"
					aria-label="Next properties"
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
						{strip.map((p, i) => (
							<li
								key={`${p.title}-${i}`}
								style={{
									width: cardW ? `${cardW}px` : `${100 / visible}%`,
									marginRight: i === strip.length - 1 ? 0 : GAP,
								}}
								className="shrink-0 bg-white shadow-sm"
							>
								<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
									<Image
										src={p.image}
										alt={p.title}
										fill
										className="object-cover"
										sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
									/>
									<span className="absolute bottom-3 left-3 font-sans text-xl font-medium text-white drop-shadow md:text-2xl">
										{p.price}
									</span>
								</div>

								<div className="px-5 pb-4 pt-4">
									<p className="font-sans text-[15px] font-medium text-black">{p.title}</p>
									<p className="mt-1 font-sans text-[14px] text-black/70">{p.location}</p>
								</div>

								<div className="grid grid-cols-3 divide-x divide-black/10 border-t border-black/10">
									{p.stats.map((s) => (
										<div key={s.label} className="flex flex-col items-center justify-center py-3 text-black">
											<span className="font-sans text-lg font-medium">{s.value}</span>
											<span className="mt-0.5 font-sans text-[11px] tracking-wider text-black/60">{s.label}</span>
										</div>
									))}
								</div>
							</li>
						))}
					</ul>
				</div>
			</Reveal>
		</section>
	);
}
