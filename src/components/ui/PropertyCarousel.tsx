"use client";


// PropertyCarousel — looping 3/2/1-up card strip with chevron arrows.
// Card width is JS-computed from the viewport so the visible cards fill
// the container precisely with a fixed 20 px gap. The data is duplicated
// internally so advancing past the last card lands on a real card while
// we wait for the transition to finish, then we snap the index back inside
// [0, total) with animation disabled.

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";


export type PropertyCard = {
	image: string;
	price: string;
	title: string;
	location: string;
	stats: { label: string; value: string }[];
	href?: string;
};


const GAP = 20;


export default function PropertyCarousel({ items }: { items: PropertyCard[] }) {
	const total = items.length;
	const strip = [...items, ...items];

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
		<div className="relative mx-auto w-full max-w-site px-12 md:px-16">
			<button
				type="button"
				aria-label="Previous"
				onClick={prev}
				className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center md:left-4"
			>
				<Image src="/assets/images/angle-small-left.svg" alt="" width={32} height={32} className="h-8 w-8" />
			</button>

			<button
				type="button"
				aria-label="Next"
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
					{strip.map((p, i) => {
						const CardBody = (
							<>
								<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
									<Image
										src={p.image}
										alt={p.title}
										fill
										className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
										sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
									/>
									{/* Slight overlay that fades in on hover. */}
									<div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/25" />
									<span className="absolute bottom-3 left-3 z-10 font-sans text-xl font-medium text-white drop-shadow md:text-2xl">
										{p.price}
									</span>
								</div>

								{/* Text + stats slide up together on hover for a subtle "lift". */}
								<div className="bg-white transition-transform duration-300 ease-out group-hover:-translate-y-2">
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
								</div>
							</>
						);

						return (
							<li
								key={`${p.title}-${i}`}
								style={{
									width: cardW ? `${cardW}px` : `${100 / visible}%`,
									marginRight: i === strip.length - 1 ? 0 : GAP,
								}}
								className="group shrink-0 bg-white shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl"
							>
								{p.href ? (
									<Link href={p.href} className="block">
										{CardBody}
									</Link>
								) : (
									CardBody
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
