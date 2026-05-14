"use client";


// PropertyGallery — opening moment for /rentals/[slug]. Replaces the generic
// photo hero used on earlier rental pages with an Airbnb-style layout: a
// title/stats band above a 1-big + 4-small photo grid. If the rental lacks a
// `gallery`, the grid collapses to a single full-width hero photo so older
// entries still render cleanly.
//
// The title band uses the site's yellow script + blue hard-shadow treatment,
// so the page still reads as part of the LFIH family while borrowing the
// photo-first information architecture the listing pattern expects.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION } from "@/lib/motion";
import type { Rental, RentalImage } from "@/lib/rentals";


type Props = { rental: Rental };


// Near-fullscreen lightbox that lists every photo for the property. Mirrors
// the body-scroll-lock pattern used elsewhere on the site (position:fixed
// body + --lock-gutter on html so the fixed nav doesn't shift, plus a
// resize dispatch on close so Lenis re-measures the page bounds).
function GalleryLightbox({
	photos,
	open,
	onClose,
}: {
	photos: RentalImage[];
	open: boolean;
	onClose: () => void;
}) {
	const [render, setRender] = useState(false);
	const [shown, setShown] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (open) {
			setRender(true);
			let inner = 0;
			const outer = requestAnimationFrame(() => {
				inner = requestAnimationFrame(() => setShown(true));
			});
			return () => {
				cancelAnimationFrame(outer);
				if (inner) cancelAnimationFrame(inner);
			};
		}
		setShown(false);
		const t = setTimeout(() => setRender(false), 250);
		return () => clearTimeout(t);
	}, [open]);

	useEffect(() => {
		if (!render) return;
		const scrollY = window.scrollY;
		const body = document.body;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const prev = {
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			right: body.style.right,
			width: body.style.width,
			paddingRight: body.style.paddingRight,
		};
		body.style.position = "fixed";
		body.style.top = `-${scrollY}px`;
		body.style.left = "0";
		body.style.right = "0";
		body.style.width = "100%";
		if (scrollbarWidth > 0) {
			body.style.paddingRight = `${scrollbarWidth}px`;
			document.documentElement.style.setProperty("--lock-gutter", `${scrollbarWidth}px`);
		}
		return () => {
			body.style.position = prev.position;
			body.style.top = prev.top;
			body.style.left = prev.left;
			body.style.right = prev.right;
			body.style.width = prev.width;
			body.style.paddingRight = prev.paddingRight;
			document.documentElement.style.removeProperty("--lock-gutter");
			window.scrollTo(0, scrollY);
			window.dispatchEvent(new Event("resize"));
		};
	}, [render]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	// Chrome's wheel routing breaks when body is position:fixed — events
	// stop reaching the modal's scrollable child. Attach a non-passive
	// wheel listener and scroll the viewport by hand.
	useEffect(() => {
		if (!render) return;
		const el = scrollRef.current;
		if (!el) return;
		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			el.scrollTop += e.deltaY;
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, [render]);

	if (!render) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			data-shown={shown}
			className="fixed inset-0 z-[100] bg-black/90 opacity-0 transition-opacity duration-200 ease-out data-[shown=true]:opacity-100"
			onClick={onClose}
		>
			<button
				type="button"
				onClick={onClose}
				aria-label="Close gallery"
				className="fixed right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center bg-white/90 text-brand-blue shadow-lg transition hover:bg-white md:right-6 md:top-6"
			>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
					<path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				</svg>
			</button>

			<div
				ref={scrollRef}
				className="absolute inset-0 overflow-y-auto overscroll-contain p-4 pt-20 md:p-10 md:pt-24"
			>
				<div className="mx-auto grid w-full max-w-[960px] grid-cols-1 gap-4 md:gap-6">
					{photos.map((img, i) => (
						<div key={`${img.src}-${i}`} className="relative aspect-[16/10] bg-white/5">
							<Image
								src={img.src}
								alt={img.alt}
								fill
								sizes="(min-width: 768px) 960px, 100vw"
								className="object-cover"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}


const STAT_VALUE =
	"font-display text-[44px] leading-none tracking-[0.02em] text-brand-blue md:text-[56px]";
const STAT_LABEL =
	"mt-1 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[12px]";


export default function PropertyGallery({ rental }: Props) {
	const lead = rental.gallery?.[0] ?? { src: rental.heroImage, alt: rental.heroAlt };
	const smalls = rental.gallery?.slice(1, 5) ?? [];
	const [lightboxOpen, setLightboxOpen] = useState(false);

	// Split the price label into amount + period so the stats column reads
	// like the others ("$4,680" / "MONTHLY") instead of stuffing the period
	// inline ("$4,680 / monthly / week"). Handles both legacy hardcoded
	// labels ("$10,000/week") and the API's spaced form ("$4,680 / monthly").
	const priceMatch = rental.pricePerWeek.match(/^(.+?)\s*\/\s*(.+)$/);
	const priceAmount = priceMatch ? priceMatch[1].trim() : rental.pricePerWeek;
	const pricePeriod = priceMatch ? priceMatch[2].trim() : "week";

	return (
		<section className="w-full bg-[#f8f4ec] pt-[calc(144px+env(safe-area-inset-top)+1.5rem)] pb-10 md:pt-[calc(144px+env(safe-area-inset-top)+2.5rem)] md:pb-14">
			<div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
				{/* Title band */}
				<Reveal className="flex flex-col items-center text-center">
					{rental.referenceCode && (
						<p className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-brand-blue md:text-[13px]">
							Ref. {rental.referenceCode} · {rental.location}
						</p>
					)}

					<h1 className="mt-4 -rotate-[3deg] font-script text-[44px] leading-[1] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-[64px] md:text-[80px] md:[text-shadow:3px_4px_0_#185b89] lg:text-[96px] lg:[text-shadow:3px_5px_0_#185b89]">
						{rental.name}
					</h1>

					{rental.tagline && (
						<p className="mt-5 font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-brand-blue md:text-[15px]">
							{rental.tagline}
						</p>
					)}
				</Reveal>

				{/* Stats row */}
				<RevealStagger className="mx-auto mt-8 grid w-full max-w-[760px] grid-cols-4 items-end gap-2 border-y border-brand-blue/20 px-2 py-6 md:mt-10 md:gap-4 md:py-8">
					<RevealItem className="flex flex-col items-center text-center">
						<span className={STAT_VALUE}>{rental.beds}</span>
						<span className={STAT_LABEL}>Bedrooms</span>
					</RevealItem>
					<RevealItem className="flex flex-col items-center border-l border-brand-blue/20 text-center">
						<span className={STAT_VALUE}>{rental.baths}</span>
						<span className={STAT_LABEL}>Bathrooms</span>
					</RevealItem>
					<RevealItem className="flex flex-col items-center border-l border-brand-blue/20 text-center">
						<span className={STAT_VALUE}>{rental.sleeps}</span>
						<span className={STAT_LABEL}>Sleeps</span>
					</RevealItem>
					<RevealItem className="flex flex-col items-center border-l border-brand-blue/20 text-center">
						<span className="font-display text-[26px] leading-none tracking-[0.02em] text-brand-blue md:text-[34px]">
							{priceAmount}
						</span>
						<span className={STAT_LABEL}>{pricePeriod}</span>
					</RevealItem>
				</RevealStagger>

				{/* Photo grid */}
				<Reveal
					y={DISTANCE.card}
					duration={DURATION.card}
					delay={0.1}
					className="mt-10 md:mt-12"
				>
					{smalls.length >= 4 ? (
						<>
							<div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-xl min-[992px]:grid-cols-4 min-[992px]:grid-rows-2">
								<div className="relative aspect-[4/3] min-[992px]:col-span-2 min-[992px]:row-span-2 min-[992px]:aspect-auto">
									<Image
										src={lead.src}
										alt={lead.alt}
										fill
										priority
										sizes="(min-width: 992px) 50vw, 100vw"
										className="object-cover"
									/>
								</div>
								{smalls.map((img) => (
									<div key={img.src} className="relative aspect-[4/3]">
										<Image
											src={img.src}
											alt={img.alt}
											fill
											sizes="(min-width: 992px) 25vw, 100vw"
											className="object-cover"
										/>
									</div>
								))}
								{rental.gallery && rental.gallery.length > 5 && (
									<button
										type="button"
										onClick={() => setLightboxOpen(true)}
										className="absolute bottom-4 right-4 hidden cursor-pointer bg-white/95 px-5 py-3 font-sans text-[13px] font-medium uppercase tracking-wider text-brand-blue shadow-md transition hover:bg-white min-[992px]:inline-block"
									>
										View all {rental.gallery.length} photos
									</button>
								)}
							</div>

							{/* Mobile "view all" — stacks below the grid where the desktop overlay can't fit */}
							{rental.gallery && rental.gallery.length > 5 && (
								<div className="mt-4 flex justify-center min-[992px]:hidden">
									<button
										type="button"
										onClick={() => setLightboxOpen(true)}
										className="cursor-pointer bg-white px-5 py-3 font-sans text-[13px] font-medium uppercase tracking-wider text-brand-blue shadow-md transition hover:brightness-95"
									>
										View all {rental.gallery.length} photos
									</button>
								</div>
							)}
						</>
					) : (
						<div className="relative aspect-[16/9] overflow-hidden rounded-xl md:aspect-[21/9]">
							<Image
								src={lead.src}
								alt={lead.alt}
								fill
								priority
								sizes="100vw"
								className="object-cover"
							/>
						</div>
					)}
				</Reveal>
			</div>

			{rental.gallery && (
				<GalleryLightbox
					photos={rental.gallery}
					open={lightboxOpen}
					onClose={() => setLightboxOpen(false)}
				/>
			)}
		</section>
	);
}
