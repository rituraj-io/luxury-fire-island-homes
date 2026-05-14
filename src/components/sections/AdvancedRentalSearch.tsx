"use client";


// AdvancedRentalSearch — the /current-rentals page experience.
//
// Designed to feel like its own LFIH thing rather than an admin form. Three
// layers carry the search UI:
//
//   1. A pill-shaped, segmented "search shell" at the top — labels +
//      currently-selected value, click any segment to open the drawer.
//   2. A horizontally-scrollable quick-amenities strip beneath it, mirroring
//      the way Airbnb surfaces popular toggles inline (Pet Friendly, Pool,
//      Beachfront…) so the page is interactive before users open the drawer.
//   3. A right-side filter drawer with the full taxonomy — but using
//      stepper-style pill rows for counts and tile cards for type-of-place,
//      not the previous wall of <select> dropdowns.
//
// Filter state lives at the top of the section. The drawer works on a draft
// copy so users can change their mind without re-running the query on every
// click.

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import {
	CADENCES,
	countActive,
	EMPTY_FILTERS,
	FAMILY_APARTMENT,
	FEATURE_GROUPS,
	LISTING_TYPES,
	NEIGHBORHOODS,
	PRIVATE_SHARED,
	type Cadence,
	type Filters,
	type Range,
	type SortKey,
} from "@/lib/rentalFilters";
import {
	applySortPublic,
	locationLabel,
	priceLabel,
	type PublicSearchProperty,
	searchProperties,
	thumbnailUrl,
} from "@/lib/publicSearch";


const PAGE_SIZE = 12;


// Surfaced inline above the grid as a horizontal chip strip. These mirror
// what someone landing on the page is most likely to filter by — picked
// across feature groups, not just one.
const POPULAR_FEATURES = [
	"Pet Friendly",
	"Outdoor Pool",
	"Beachfront",
	"WiFi",
	"Washer/Dryer",
	"Hot Tub",
	"Central AC",
	"Beach Chairs",
];


// Maps the public `?for=` query param to the internal listingType filter.
// We normalize a few common spellings so links from older routes still work.
function listingTypeFromQuery(value: string | null): "" | "Rent" | "Sale" {
	if (!value) return "";
	const v = value.toLowerCase();
	if (v === "rent" || v === "rentals") return "Rent";
	if (v === "sale" || v === "buy" || v === "sell" || v === "for-sale") return "Sale";
	return "";
}


export default function AdvancedRentalSearch() {
	const searchParams = useSearchParams();
	const initialListingType = listingTypeFromQuery(searchParams.get("for"));
	const [filters, setFilters] = useState<Filters>(() => ({
		...EMPTY_FILTERS,
		listingType: initialListingType,
	}));
	const [sort, setSort] = useState<SortKey>("default");
	const [panelOpen, setPanelOpen] = useState(false);

	const [data, setData] = useState<PublicSearchProperty[]>([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const activeCount = countActive(filters);

	// Refetch from page 1 whenever filters change. Cancellation prevents
	// stale results from a slower in-flight request from overwriting newer
	// ones if the user toggles filters quickly.
	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(null);
		searchProperties({ filters, page: 1, limit: PAGE_SIZE })
			.then((res) => {
				if (cancelled) return;
				setData(res.data);
				setTotal(res.pagination.total);
				setPage(1);
				setLoading(false);
			})
			.catch((e: unknown) => {
				if (cancelled) return;
				setError(e instanceof Error ? e.message : "Search failed");
				setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [filters]);

	const sortedData = useMemo(() => applySortPublic(data, sort), [data, sort]);
	const canLoadMore = data.length < total;

	// When async results land, the page grows. Lenis cached the document's
	// height at first paint (with an empty grid) and will cap the scroll there
	// — so wheel scrolling tops out around 70% of the now-taller page. Force
	// it to re-measure after the grid renders + images start sizing. Two-stage
	// rAF + small timeout settles after the first layout pass.
	useEffect(() => {
		if (typeof window === "undefined") return;
		const lenis = (window as unknown as { __lenis?: { resize: () => void } }).__lenis;
		if (!lenis) return;
		const id1 = window.setTimeout(() => lenis.resize(), 50);
		const id2 = window.setTimeout(() => lenis.resize(), 400);
		return () => {
			window.clearTimeout(id1);
			window.clearTimeout(id2);
		};
	}, [sortedData.length, loading]);

	const loadMore = async () => {
		const nextPage = page + 1;
		setLoading(true);
		try {
			const res = await searchProperties({ filters, page: nextPage, limit: PAGE_SIZE });
			setData((prev) => [...prev, ...res.data]);
			setPage(nextPage);
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Search failed");
		} finally {
			setLoading(false);
		}
	};

	const toggleFeature = (label: string) =>
		setFilters((f) => ({
			...f,
			features: f.features.includes(label)
				? f.features.filter((x) => x !== label)
				: [...f.features, label],
		}));

	return (
		<section className="w-full bg-[#f8f4ec] pb-16 pt-[calc(144px+env(safe-area-inset-top)+2rem)] md:pb-20 md:pt-[calc(144px+env(safe-area-inset-top)+3rem)]">
			<div className="mx-auto w-full max-w-site px-4 md:px-8">
				<Reveal y={DISTANCE.text} duration={DURATION.text} className="flex flex-col items-center text-center">
					<p className="font-sans text-[14px] font-medium uppercase tracking-[0.22em] text-brand-blue">
						The sandier side of search
					</p>
					<h1 className="mt-3 font-script text-[40px] leading-none text-brand-blue md:text-[56px]">
						Find your Fire Island home
					</h1>
					<p className="mt-4 max-w-[560px] font-body text-[16px] leading-relaxed text-black">
						Pick a neighborhood, length of stay, and the things that matter — we&apos;ll surface the homes that fit.
					</p>
				</Reveal>

				<Reveal y={DISTANCE.text} duration={DURATION.text} delay={0.05}>
					<PillSearchBar
						filters={filters}
						setFilters={setFilters}
						onOpenFullFilters={() => setPanelOpen(true)}
						activeCount={activeCount}
					/>
				</Reveal>

				<Reveal y={DISTANCE.text} duration={DURATION.text} delay={0.1}>
					<QuickAmenities active={filters.features} onToggle={toggleFeature} />
				</Reveal>

				{activeCount > 0 && (
					<Reveal y={DISTANCE.text} duration={DURATION.text}>
						<ChipsRow filters={filters} setFilters={setFilters} />
					</Reveal>
				)}

				<Reveal
					y={DISTANCE.text}
					duration={DURATION.text}
					delay={0.15}
					className="mt-10 flex flex-wrap items-baseline justify-between gap-4"
				>
					<p className="font-sans text-[15px] text-brand-blue">
						{loading && total === 0 ? (
							<span className="italic text-brand-blue/70">Searching homes…</span>
						) : (
							<>
								<span className="font-medium">{total}</span> {total === 1 ? "home" : "homes"} on Fire Island
							</>
						)}
					</p>

					<SortDropdown value={sort} onChange={setSort} />
				</Reveal>

				{error && (
					<div className="mt-6 border-2 border-red-300 bg-red-50 px-5 py-4 font-sans text-[14px] text-red-700">
						Couldn&apos;t load homes: {error}. Try again in a moment, or clear filters.
					</div>
				)}

				{loading && sortedData.length === 0 && !error ? (
					<div className="mt-10 flex min-h-[320px] items-center justify-center">
						<Spinner />
					</div>
				) : !loading && sortedData.length === 0 && !error ? (
					<Reveal y={DISTANCE.text} duration={DURATION.text} className="mx-auto mt-10 max-w-[480px] bg-white p-8 text-center shadow-sm">
						<p className="font-script text-[28px] leading-none text-brand-blue">No matches</p>
						<p className="mt-3 font-sans text-[14px] text-brand-blue/80">
							Try fewer filters or clear them all to see every rental.
						</p>
						<button
							type="button"
							onClick={() => setFilters(EMPTY_FILTERS)}
							className="mt-5 bg-brand-orange px-6 py-2 font-sans text-[14px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
						>
							Clear filters
						</button>
					</Reveal>
				) : (
					// Plain grid (no Framer stagger): the previous RevealStagger
					// mounts at first paint with 0 children, hits `once: true`
					// immediately, and then never re-triggers when async data
					// arrives — so the new RevealItems stay at their `hidden`
					// variant and the grid looks empty even though items are in
					// the DOM. Cards now appear as soon as data lands.
					<div
						className={`mx-auto mt-6 grid max-w-[420px] grid-cols-1 gap-6 transition-opacity duration-200 sm:max-w-[780px] sm:grid-cols-2 md:max-w-site md:grid-cols-3 ${loading ? "opacity-60" : ""}`}
					>
						{sortedData.map((p) => (
							<Link
								key={p.id}
								href={`/property/${p.id}`}
								className="group block bg-white shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl"
							>
								<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
									<Image
										src={thumbnailUrl(p)}
										alt={`${p.title} — ${locationLabel(p)}`}
										fill
										sizes="(min-width: 768px) 360px, (min-width: 640px) 45vw, 90vw"
										className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
										unoptimized
									/>
									<div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/25" />
									<div className="absolute left-3 top-3 z-10 bg-white/95 px-3 py-1 font-sans text-[12px] font-medium uppercase tracking-wider text-brand-blue">
										{p.type}
									</div>
								</div>
								<div className="px-5 py-4 text-center transition-transform duration-300 ease-out group-hover:-translate-y-1">
									<p className="font-sans text-[20px] font-medium text-black">{priceLabel(p)}</p>
									<p className="mt-1.5 font-sans text-[16px] text-black">{p.title}</p>
									<p className="mt-0.5 font-sans text-[14px] text-black/80">{locationLabel(p)}</p>
									<p className="mt-2 font-sans text-[12px] uppercase tracking-wider text-brand-blue/70">
										{p.bedrooms} BD · {p.bathrooms} BA · Sleeps {p.sleeps_capacity}
									</p>
								</div>
							</Link>
						))}
					</div>
				)}

				{canLoadMore && (
					<Reveal y={DISTANCE.text} duration={DURATION.text} className="mt-10 flex justify-center md:mt-12">
						<button
							type="button"
							onClick={loadMore}
							disabled={loading}
							className="cursor-pointer border-2 border-brand-blue bg-transparent px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5 disabled:cursor-progress disabled:opacity-60"
						>
							{loading ? "Loading…" : "Load More"}
						</button>
					</Reveal>
				)}
			</div>

			<RentalFilterPanel
				open={panelOpen}
				onClose={() => setPanelOpen(false)}
				initial={filters}
				resultCount={total}
				onApply={(next) => {
					setFilters(next);
					setPanelOpen(false);
				}}
			/>
		</section>
	);
}


/* ──────────────────────── pill search bar ──────────────────────── */


type SegKey = "where" | "stay" | "type";


function PillSearchBar({
	filters,
	setFilters,
	onOpenFullFilters,
	activeCount,
}: {
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
	onOpenFullFilters: () => void;
	activeCount: number;
}) {
	const [openSeg, setOpenSeg] = useState<SegKey | null>(null);
	const wrapRef = useRef<HTMLDivElement>(null);

	// Close on click outside or Escape only — scroll intentionally does NOT
	// dismiss; the popover sits under the fixed nav (lower z-index) so
	// scrolling just hides part of it temporarily, which is fine.
	useEffect(() => {
		if (!openSeg) return;
		const onDown = (e: MouseEvent) => {
			if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
				setOpenSeg(null);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpenSeg(null);
		};
		document.addEventListener("mousedown", onDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [openSeg]);

	const toggle = (seg: SegKey) => setOpenSeg((prev) => (prev === seg ? null : seg));

	const whereLabel = filters.city || "Anywhere on Fire Island";
	const lengthLabel =
		filters.cadence.length === 0
			? "Any length"
			: filters.cadence.length === 1
				? filters.cadence[0]
				: `${filters.cadence[0]} + ${filters.cadence.length - 1}`;
	const typeLabel = filters.listingType || "Sale or Rent";

	return (
		<div className="mx-auto mt-10 w-full max-w-[860px]">
			{/* Mobile (< md): single full-width button that opens the full
			    filters modal directly — no per-segment popovers, since the bar
			    can't fit three legible segments on a 360–414px viewport. */}
			<button
				type="button"
				onClick={onOpenFullFilters}
				className="flex w-full cursor-pointer items-center gap-3 border-2 border-brand-blue/30 bg-white px-5 py-4 text-left shadow-md transition hover:bg-brand-blue/5 md:hidden"
			>
				<svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-3.5-3.5" />
				</svg>
				<span className="font-sans text-[14px] font-medium uppercase tracking-[0.18em] text-brand-blue">
					Start your search
				</span>
				{activeCount > 0 && (
					<span className="ml-auto flex h-6 min-w-6 items-center justify-center bg-brand-orange px-2 font-sans text-[12px] font-medium text-white">
						{activeCount}
					</span>
				)}
			</button>

			{/* Desktop (>= md): segmented pill bar with per-segment popovers. */}
			<div ref={wrapRef} className="relative hidden md:block">
				<div className="flex items-stretch border-2 border-brand-blue/30 bg-white shadow-md">
				<div className="relative min-w-0 flex-1">
					<Segment label="Where" value={whereLabel} active={openSeg === "where"} onClick={() => toggle("where")} />
					<SegmentPopover open={openSeg === "where"} align="left">
						<PopoverBlock title="Where" helper="Pick a Fire Island neighborhood — or leave it open.">
							<NeighborhoodPicker value={filters.city} onChange={(v) => setFilters((f) => ({ ...f, city: v }))} />
						</PopoverBlock>
					</SegmentPopover>
				</div>

				<Divider />

				<div className="relative min-w-0 flex-1">
					<Segment label="Stay length" value={lengthLabel} active={openSeg === "stay"} onClick={() => toggle("stay")} />
					<SegmentPopover open={openSeg === "stay"} align="center">
						<PopoverBlock title="Stay length" helper="Available nightly, weekly, monthly, or seasonally. Awaiting backend field — preview only.">
							<div className="flex flex-wrap gap-2">
								{CADENCES.map((c) => {
									const active = filters.cadence.includes(c);
									return (
										<button
											key={c}
											type="button"
											onClick={() =>
												setFilters((f) => ({
													...f,
													cadence: f.cadence.includes(c) ? f.cadence.filter((x) => x !== c) : [...f.cadence, c],
												}))
											}
											className={`h-10 cursor-pointer border-2 px-5 font-sans text-[13px] font-medium uppercase tracking-wider transition ${
												active ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/30 bg-white text-brand-blue hover:bg-brand-blue/5"
											}`}
										>
											{c}
										</button>
									);
								})}
							</div>
						</PopoverBlock>
					</SegmentPopover>
				</div>

				<Divider />

				<div className="relative min-w-0 flex-1">
					<Segment label="Sale or rent" value={typeLabel} active={openSeg === "type"} onClick={() => toggle("type")} />
					<SegmentPopover open={openSeg === "type"} align="right">
						<PopoverBlock title="Sale or rent" helper="Pick one to narrow the grid — or leave open for both.">
							<TileGrid>
								{LISTING_TYPES.map((t) => (
									<Tile
										key={t}
										active={filters.listingType === t}
										onClick={() =>
											setFilters((f) => ({
												...f,
												listingType: f.listingType === t ? "" : t,
											}))
										}
									>
										{t === "Sale" ? "For Sale" : "For Rent"}
										<TileSub>{t === "Sale" ? "Buy a home on the island" : "Vacation or seasonal stay"}</TileSub>
									</Tile>
								))}
							</TileGrid>
						</PopoverBlock>
					</SegmentPopover>
				</div>

				<button
					type="button"
					onClick={onOpenFullFilters}
					aria-label="Open all filters"
					className="flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-brand-orange px-6 font-sans text-[13px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
				>
					<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M3 6h18M6 12h12M10 18h4" />
					</svg>
					<span className="hidden sm:inline">Filters</span>
					{activeCount > 0 && (
						<span className="flex h-5 min-w-5 items-center justify-center bg-white px-1.5 font-sans text-[11px] font-medium text-brand-orange">
							{activeCount}
						</span>
					)}
				</button>
				</div>
			</div>
		</div>
	);
}


function Segment({ label, value, active, onClick }: { label: string; value: string; active: boolean; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`group block h-full w-full min-w-0 cursor-pointer px-5 py-3 text-left transition ${
				active ? "bg-brand-blue/5" : "hover:bg-brand-blue/5"
			}`}
		>
			<div className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-brand-blue">
				{label}
			</div>
			<div className={`mt-0.5 truncate font-sans text-[14px] transition ${active ? "text-brand-blue" : "text-brand-blue/80 group-hover:text-brand-blue"}`}>
				{value}
			</div>
		</button>
	);
}


function Divider() {
	return <span aria-hidden className="w-px shrink-0 bg-brand-blue/15" />;
}


function SegmentPopover({
	open,
	align,
	children,
}: {
	open: boolean;
	align: "left" | "center" | "right";
	children: React.ReactNode;
}) {
	// Each popover owns its own enter+exit lifecycle so switching directly
	// from one segment to another cross-fades (the previous popover fades
	// out while the next fades in) instead of swapping instantly. z-30 sits
	// below the fixed nav (z-50) so a scrolled popover passes under it
	// rather than over it.
	const [render, setRender] = useState(false);
	const [shown, setShown] = useState(false);

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
		const t = setTimeout(() => setRender(false), 200);
		return () => clearTimeout(t);
	}, [open]);

	if (!render) return null;

	const alignClass =
		align === "left"
			? "left-0"
			: align === "right"
				? "right-0"
				: "left-1/2 -translate-x-1/2";

	return (
		<div
			data-shown={shown}
			className={`absolute top-full z-30 mt-3 w-[min(560px,calc(100vw-2rem))] origin-top scale-[0.98] border-2 border-brand-blue/20 bg-[#fffbf8] p-6 opacity-0 shadow-2xl transition-all duration-200 ease-out data-[shown=true]:scale-100 data-[shown=true]:opacity-100 ${alignClass}`}
		>
			{children}
		</div>
	);
}


function PopoverBlock({ title, helper, children }: { title: string; helper?: string; children: React.ReactNode }) {
	return (
		<div>
			<h3 className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
				{title}
			</h3>
			{helper && (
				<p className="mt-1 font-sans text-[12px] italic leading-snug text-brand-blue/60">
					{helper}
				</p>
			)}
			<div className="mt-4">{children}</div>
		</div>
	);
}


/* ──────────────────────── quick amenities strip ──────────────────────── */


function QuickAmenities({ active, onToggle }: { active: string[]; onToggle: (label: string) => void }) {
	return (
		<div className="mt-6 -mx-4 overflow-x-auto px-4 md:mt-7 [&::-webkit-scrollbar]:hidden">
			<div className="mx-auto flex w-max gap-2 px-1 md:justify-center md:px-0">
				{POPULAR_FEATURES.map((f) => {
					const isActive = active.includes(f);
					return (
						<button
							key={f}
							type="button"
							onClick={() => onToggle(f)}
							className={`h-9 shrink-0 cursor-pointer border-2 px-4 font-sans text-[13px] font-medium transition ${
								isActive
									? "border-brand-blue bg-brand-blue text-white"
									: "border-brand-blue/20 bg-white text-brand-blue/85 hover:border-brand-blue/40 hover:text-brand-blue"
							}`}
						>
							{f}
						</button>
					);
				})}
			</div>
		</div>
	);
}


/* ──────────────────────── active filter chips row ──────────────────────── */


function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
	return (
		<span className="inline-flex h-8 items-center gap-2 border border-brand-blue/30 bg-white px-3 font-sans text-[13px] text-brand-blue">
			{label}
			<button
				type="button"
				aria-label={`Remove ${label}`}
				onClick={onRemove}
				className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-brand-blue/70 transition hover:bg-brand-blue/10 hover:text-brand-blue"
			>
				<svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		</span>
	);
}


function ChipsRow({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
	const clear = <K extends keyof Filters>(key: K, value: Filters[K]) =>
		setFilters((f) => ({ ...f, [key]: value }));

	const chips: React.ReactNode[] = [];
	if (filters.keyword) chips.push(<Chip key="kw" label={`"${filters.keyword}"`} onRemove={() => clear("keyword", "")} />);
	if (filters.city) chips.push(<Chip key="city" label={filters.city} onRemove={() => clear("city", "")} />);
	if (filters.listingType) chips.push(<Chip key="lt" label={filters.listingType} onRemove={() => clear("listingType", "")} />);
	if (filters.exclusiveListing) chips.push(<Chip key="exc" label={`Exclusive: ${filters.exclusiveListing}`} onRemove={() => clear("exclusiveListing", "")} />);
	if (filters.familyApartment) chips.push(<Chip key="fa" label={filters.familyApartment} onRemove={() => clear("familyApartment", "")} />);
	if (filters.privateShared) chips.push(<Chip key="ps" label={filters.privateShared} onRemove={() => clear("privateShared", "")} />);
	if (filters.cadence.length) chips.push(<Chip key="cad" label={`Stay: ${filters.cadence.join(", ")}`} onRemove={() => clear("cadence", [])} />);
	if (filters.bedrooms.min != null) chips.push(<Chip key="bd" label={`${filters.bedrooms.min}+ beds`} onRemove={() => clear("bedrooms", {})} />);
	if (filters.bathrooms.min != null) chips.push(<Chip key="ba" label={`${filters.bathrooms.min}+ baths`} onRemove={() => clear("bathrooms", {})} />);
	if (filters.sleeps.min != null) chips.push(<Chip key="sl" label={`Sleeps ${filters.sleeps.min}+`} onRemove={() => clear("sleeps", {})} />);
	if (filters.price.min != null || filters.price.max != null) {
		const min = filters.price.min != null ? `$${filters.price.min.toLocaleString()}` : "any";
		const max = filters.price.max != null ? `$${filters.price.max.toLocaleString()}` : "any";
		chips.push(<Chip key="pr" label={`${min} – ${max}`} onRemove={() => clear("price", {})} />);
	}
	for (const f of filters.features) {
		chips.push(
			<Chip
				key={`feat-${f}`}
				label={f}
				onRemove={() => setFilters((curr) => ({ ...curr, features: curr.features.filter((x) => x !== f) }))}
			/>,
		);
	}

	return (
		<div className="mt-5 flex flex-wrap items-center justify-center gap-2">
			{chips}
			<button
				type="button"
				onClick={() => setFilters(EMPTY_FILTERS)}
				className="ml-1 cursor-pointer font-sans text-[13px] font-medium uppercase tracking-wider text-brand-blue underline-offset-4 hover:underline"
			>
				Clear all
			</button>
		</div>
	);
}


/* ──────────────────────── filter drawer ──────────────────────── */


function RentalFilterPanel({
	open,
	onClose,
	initial,
	resultCount,
	onApply,
}: {
	open: boolean;
	onClose: () => void;
	initial: Filters;
	resultCount: number;
	onApply: (f: Filters) => void;
}) {
	const [draft, setDraft] = useState<Filters>(initial);

	// Mobile accordion: one section expanded at a time. Defaults to the first
	// section so something is visible when the modal opens on mobile. Desktop
	// ignores this — every section is always expanded via responsive classes.
	const [mobileOpen, setMobileOpen] = useState<string>("where");

	// Two-stage open/close so the dialog can animate in AND out. `render`
	// controls whether the dialog is in the DOM; `shown` drives the opacity /
	// scale state that Tailwind transitions between via data-[shown].
	const [render, setRender] = useState(false);
	const [shown, setShown] = useState(false);

	// Direct ref to the scrollable region. We attach a non-passive `wheel`
	// listener to it manually because Chrome's wheel routing gets confused
	// when the page is locked with position:fixed body — the wheel events
	// stop reaching the modal's scrollable child. Doing scrollTop math by
	// hand sidesteps that entirely.
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (open) {
			setRender(true);
			// Double rAF — one frame to commit the initial (opacity-0, scale-95)
			// paint, the next to flip into the "shown" state so the transition
			// actually plays instead of starting at the end state.
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
		const t = setTimeout(() => setRender(false), 300);
		return () => clearTimeout(t);
	}, [open]);

	useEffect(() => {
		if (open) setDraft(initial);
	}, [open, initial]);

	// Lock the page scroll while open. We freeze the body in place with
	// position:fixed (preserving the current scroll Y as an offset) — that's
	// the only approach that reliably prevents wheel events from chaining
	// through to the page underneath. When the scrollbar disappears (body
	// no longer scrolls), we reserve its width as `padding-right` on body
	// so fixed-position elements (the nav) don't shift sideways.
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
			// Force Lenis (smooth-scroll) to recompute its cached page bounds —
			// otherwise scrolling stays clamped to the old (modal-open) height.
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

	// Manual wheel handler on the modal's scroll viewport. React's onWheel
	// is passive-by-default so it can't preventDefault; using
	// addEventListener with `{passive:false}` lets us both cancel the page
	// from receiving the wheel AND scroll the modal body programmatically.
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

	// Live preview count for the Apply button. We re-query the API as the
	// user tweaks the *draft* filters (debounced so quick adjustments don't
	// hammer the endpoint) without mutating the parent's applied filters —
	// the results grid only refreshes once they hit Apply. Falls back to the
	// last known applied count while a preview request is in flight.
	const [previewCount, setPreviewCount] = useState<number>(resultCount);
	useEffect(() => {
		if (!open) return;
		let cancelled = false;
		const t = setTimeout(() => {
			searchProperties({ filters: draft, page: 1, limit: 1 })
				.then((res) => {
					if (cancelled) return;
					setPreviewCount(res.pagination.total);
				})
				.catch(() => {
					// Keep the prior count visible on transient failure rather than
					// flashing "Show 0 homes".
				});
		}, 250);
		return () => {
			cancelled = true;
			clearTimeout(t);
		};
	}, [draft, open]);

	if (!render) return null;

	const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
		setDraft((f) => ({ ...f, [key]: value }));

	const toggleFeature = (label: string) =>
		setDraft((f) => ({
			...f,
			features: f.features.includes(label) ? f.features.filter((x) => x !== label) : [...f.features, label],
		}));

	const toggleCadence = (c: Cadence) =>
		setDraft((f) => ({
			...f,
			cadence: f.cadence.includes(c) ? f.cadence.filter((x) => x !== c) : [...f.cadence, c],
		}));

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="filter-title"
			data-shown={shown}
			className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 p-0 opacity-0 transition-opacity duration-300 ease-out data-[shown=true]:opacity-100 md:items-center md:p-6"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			{/* Panel: forced height + 3-row grid (auto / 1fr / auto). The middle
			    row holds a position:relative wrapper, inside which the actual
			    scroll viewport is absolutely positioned with inset-0. That gives
			    the scroll viewport explicit, immutable dimensions tied to the
			    row — content height can't leak through and inflate the box, so
			    `overflow-y-auto` reliably activates. The previous flex-1 /
			    max-h / min-h-0 combo kept letting the inner content's intrinsic
			    height win in practice. */}
			<div
				data-shown={shown}
				className="grid h-[100dvh] w-full max-w-[760px] origin-center translate-y-12 grid-rows-[auto_1fr_auto] overflow-hidden bg-[#fffbf8] opacity-0 shadow-2xl transition-all duration-300 ease-out data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 md:h-[85vh] md:translate-y-0 md:scale-95 md:data-[shown=true]:scale-100"
			>
				<header className="flex items-center justify-between border-b border-brand-blue/15 px-6 py-5">
					<h2 id="filter-title" className="font-script text-[32px] leading-none text-brand-blue">
						Filters
					</h2>
					<button
						type="button"
						aria-label="Close filters"
						onClick={onClose}
						className="flex h-9 w-9 cursor-pointer items-center justify-center text-brand-blue transition hover:bg-brand-blue/10"
					>
						<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</button>
				</header>

				<div className="relative">
					<div
						ref={scrollRef}
						className="absolute inset-0 overflow-y-auto overscroll-contain px-6 py-7"
					>
					<Section id="where" title="Where" helper="Pick a Fire Island neighborhood — or leave it open." mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
						<NeighborhoodPicker value={draft.city} onChange={(v) => set("city", v)} />
					</Section>

					<Section id="type" title="Type of place" helper="Sale or rent, single family or apartment, private or shared." mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
						<TileGrid>
							{LISTING_TYPES.map((t) => (
								<Tile key={t} active={draft.listingType === t} onClick={() => set("listingType", draft.listingType === t ? "" : t)}>
									{t === "Sale" ? "For Sale" : "For Rent"}
									<TileSub>{t === "Sale" ? "Buy a home on the island" : "Vacation or seasonal stay"}</TileSub>
								</Tile>
							))}
						</TileGrid>
						<TileGrid className="mt-3">
							{FAMILY_APARTMENT.map((t) => (
								<Tile key={t} active={draft.familyApartment === t} onClick={() => set("familyApartment", draft.familyApartment === t ? "" : t)}>
									{t}
								</Tile>
							))}
							{PRIVATE_SHARED.map((t) => (
								<Tile key={t} active={draft.privateShared === t} onClick={() => set("privateShared", draft.privateShared === t ? "" : t)}>
									{t}
								</Tile>
							))}
						</TileGrid>
					</Section>

					<Section id="stay" title="Stay length" helper="Available nightly, weekly, monthly, or for the whole season. Awaiting backend field — preview only." mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
						<div className="flex flex-wrap gap-2">
							{CADENCES.map((c) => {
								const active = draft.cadence.includes(c);
								return (
									<button
										key={c}
										type="button"
										onClick={() => toggleCadence(c)}
										className={`h-10 cursor-pointer border-2 px-5 font-sans text-[13px] font-medium uppercase tracking-wider transition ${
											active ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/30 bg-white text-brand-blue hover:bg-brand-blue/5"
										}`}
									>
										{c}
									</button>
								);
							})}
						</div>
					</Section>

					<Section id="rooms" title="Rooms & guests" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
						<StepperPills label="Bedrooms" value={draft.bedrooms.min} onChange={(n) => set("bedrooms", n == null ? {} : { min: n })} max={8} />
						<StepperPills label="Bathrooms" value={draft.bathrooms.min} onChange={(n) => set("bathrooms", n == null ? {} : { min: n })} max={6} />
						<StepperPills label="Sleeps" value={draft.sleeps.min} onChange={(n) => set("sleeps", n == null ? {} : { min: n })} max={16} step={2} />
					</Section>

					<Section id="price" title="Price" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
						<PriceRange value={draft.price} onChange={(r) => set("price", r)} />
					</Section>

					<Section id="exclusive" title="Exclusive listings" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
						<div className="flex gap-2">
							{["yes", "no"].map((v) => {
								const active = draft.exclusiveListing === v;
								return (
									<button
										key={v}
										type="button"
										onClick={() => set("exclusiveListing", active ? "" : (v as "yes" | "no"))}
										className={`h-10 cursor-pointer border-2 px-5 font-sans text-[13px] font-medium uppercase tracking-wider transition ${
											active ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/30 bg-white text-brand-blue hover:bg-brand-blue/5"
										}`}
									>
										{v === "yes" ? "Exclusive only" : "Open market"}
									</button>
								);
							})}
						</div>
					</Section>

					{FEATURE_GROUPS.map((g) => (
						<Section key={g.label} id={`features-${g.label}`} title={g.label} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
							<div className="flex flex-wrap gap-2">
								{g.options.map((opt) => {
									const active = draft.features.includes(opt);
									return (
										<button
											key={`${g.label}-${opt}`}
											type="button"
											onClick={() => toggleFeature(opt)}
											className={`h-9 cursor-pointer border-2 px-4 font-sans text-[13px] transition ${
												active ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/25 bg-white text-brand-blue/85 hover:border-brand-blue/50 hover:text-brand-blue"
											}`}
										>
											{opt}
										</button>
									);
								})}
							</div>
						</Section>
					))}
					</div>
				</div>

				<footer className="flex items-center justify-between gap-3 border-t border-brand-blue/15 px-6 py-4">
					<button
						type="button"
						onClick={() => setDraft(EMPTY_FILTERS)}
						className="cursor-pointer font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue underline-offset-4 hover:underline"
					>
						Clear all
					</button>
					<button
						type="button"
						onClick={() => onApply(draft)}
						className="cursor-pointer bg-brand-orange px-7 py-3 font-sans text-[14px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
					>
						Show {previewCount} {previewCount === 1 ? "home" : "homes"}
					</button>
				</footer>
			</div>
		</div>
	);
}


/* ──────────────────────── drawer building blocks ──────────────────────── */


function Section({
	id,
	title,
	helper,
	mobileOpen,
	setMobileOpen,
	children,
}: {
	id: string;
	title: string;
	helper?: string;
	mobileOpen: string;
	setMobileOpen: (id: string) => void;
	children: React.ReactNode;
}) {
	const isOpen = mobileOpen === id;
	return (
		<section className="mb-6 border-b border-brand-blue/10 pb-6 last:mb-0 last:border-b-0 md:mb-8 md:pb-7">
			<button
				type="button"
				onClick={() => setMobileOpen(isOpen ? "" : id)}
				className="flex w-full cursor-pointer items-start justify-between gap-3 text-left md:cursor-default"
			>
				<div className="min-w-0">
					<h3 className="font-sans text-[15px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
						{title}
					</h3>
					{helper && (
						<p className="mt-1 font-sans text-[12px] italic leading-snug text-brand-blue/60">
							{helper}
						</p>
					)}
				</div>
				<svg
					aria-hidden
					viewBox="0 0 24 24"
					className={`h-5 w-5 shrink-0 text-brand-blue transition-transform md:hidden ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>
			{/* Grid-template-rows trick: animates between 0fr (collapsed) and 1fr
			    (auto-height) smoothly. On desktop we force 1fr so accordion
			    behavior only applies to mobile. */}
			<div
				className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
			>
				<div className="min-h-0">
					<div className="pt-4">{children}</div>
				</div>
			</div>
		</section>
	);
}


function NeighborhoodPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
	return (
		<div className="flex flex-wrap gap-2">
			<button
				type="button"
				onClick={() => onChange("")}
				className={`h-9 cursor-pointer border-2 px-4 font-sans text-[13px] font-medium transition ${
					value === "" ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/25 bg-white text-brand-blue/85 hover:border-brand-blue/50 hover:text-brand-blue"
				}`}
			>
				Anywhere
			</button>
			{NEIGHBORHOODS.map((n) => {
				const active = value === n;
				return (
					<button
						key={n}
						type="button"
						onClick={() => onChange(active ? "" : n)}
						className={`h-9 cursor-pointer border-2 px-4 font-sans text-[13px] transition ${
							active ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/25 bg-white text-brand-blue/85 hover:border-brand-blue/50 hover:text-brand-blue"
						}`}
					>
						{n}
					</button>
				);
			})}
		</div>
	);
}


function TileGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	return <div className={`grid grid-cols-2 gap-3 ${className}`}>{children}</div>;
}


function Tile({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex min-h-[80px] cursor-pointer flex-col items-start justify-center border-2 p-4 text-left transition ${
				active ? "border-brand-blue bg-brand-blue/5" : "border-brand-blue/20 bg-white hover:border-brand-blue/50"
			}`}
		>
			<span className="font-sans text-[15px] font-medium text-brand-blue">{children}</span>
		</button>
	);
}


function TileSub({ children }: { children: React.ReactNode }) {
	// `block` forces the sub-label onto its own line and lets `mt-1` actually
	// apply — without it the span stays inline next to the title text and the
	// margin is ignored.
	return <span className="mt-1 block font-sans text-[12px] font-normal text-brand-blue/70">{children}</span>;
}


function StepperPills({
	label,
	value,
	onChange,
	max,
	step = 1,
}: {
	label: string;
	value: number | undefined;
	onChange: (n: number | undefined) => void;
	max: number;
	step?: number;
}) {
	// Build the option set: Any, then 1..max-step, then "max+".
	const options: { label: string; value: number | undefined }[] = [{ label: "Any", value: undefined }];
	for (let i = step; i < max; i += step) options.push({ label: String(i), value: i });
	options.push({ label: `${max}+`, value: max });

	const isMaxActive = value != null && value >= max;

	return (
		<div className="mb-5 last:mb-0">
			<p className="mb-2 font-sans text-[13px] font-medium uppercase tracking-wider text-brand-blue/80">
				{label}
			</p>
			<div className="flex flex-wrap gap-2">
				{options.map((o) => {
					const active = o.value == null ? value == null : o.value === max ? isMaxActive : o.value === value;
					return (
						<button
							key={o.label}
							type="button"
							onClick={() => onChange(o.value)}
							className={`h-10 min-w-[44px] cursor-pointer border-2 px-3 font-sans text-[13px] font-medium transition ${
								active ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/25 bg-white text-brand-blue/85 hover:border-brand-blue/50 hover:text-brand-blue"
							}`}
						>
							{o.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}


function PriceRange({ value, onChange }: { value: Range; onChange: (r: Range) => void }) {
	const parse = (s: string): number | undefined => {
		const t = s.replace(/[^0-9]/g, "");
		if (t === "") return undefined;
		const n = Number(t);
		return Number.isFinite(n) ? n : undefined;
	};
	const fmt = (n: number | undefined) => (n == null ? "" : n.toLocaleString());

	return (
		<div className="grid grid-cols-2 gap-3">
			<MoneyInput label="Min" value={fmt(value.min)} onChange={(v) => onChange({ ...value, min: parse(v) })} />
			<MoneyInput label="Max" value={fmt(value.max)} onChange={(v) => onChange({ ...value, max: parse(v) })} />
		</div>
	);
}


function MoneyInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
	return (
		<label className="flex flex-col border-2 border-brand-blue/20 bg-white px-4 py-3 transition focus-within:border-brand-blue">
			<span className="font-sans text-[12px] font-medium uppercase tracking-wider text-brand-blue/70">
				{label}
			</span>
			<div className="mt-1 flex items-center gap-1">
				<span className="font-sans text-[18px] text-brand-blue">$</span>
				<input
					type="text"
					inputMode="numeric"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="0"
					className="w-full bg-transparent font-sans text-[18px] text-brand-blue outline-none placeholder:text-brand-blue/30"
				/>
			</div>
		</label>
	);
}


/* ──────────────────────── sort dropdown ──────────────────────── */


const SORT_OPTIONS: { value: SortKey; label: string }[] = [
	{ value: "default", label: "Default" },
	{ value: "price-asc", label: "Price · Low to High" },
	{ value: "price-desc", label: "Price · High to Low" },
	{ value: "beds-desc", label: "Most bedrooms" },
];


function SortDropdown({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
	const [open, setOpen] = useState(false);
	const [render, setRender] = useState(false);
	const [shown, setShown] = useState(false);
	const wrapRef = useRef<HTMLDivElement>(null);

	const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

	useEffect(() => {
		if (!open) return;
		const onDown = (e: MouseEvent) => {
			if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	// Two-stage enter/exit so the menu cross-fades cleanly on toggle.
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
		const t = setTimeout(() => setRender(false), 200);
		return () => clearTimeout(t);
	}, [open]);

	return (
		<div ref={wrapRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="flex h-11 cursor-pointer items-center gap-3 border-b-2 border-brand-blue font-sans text-[14px] font-medium text-brand-blue transition hover:text-brand-blue-dark"
			>
				<span className="text-brand-blue/60">Sort by —</span>
				<span>{current.label}</span>
				<svg
					aria-hidden
					viewBox="0 0 12 8"
					className={`h-2 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
				>
					<path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>

			{render && (
				<div
					data-shown={shown}
					className="absolute right-0 top-full z-30 mt-3 min-w-[240px] origin-top-right scale-95 border-2 border-brand-blue/20 bg-white opacity-0 shadow-xl transition-all duration-200 ease-out data-[shown=true]:scale-100 data-[shown=true]:opacity-100"
				>
					{SORT_OPTIONS.map((o) => {
						const active = o.value === value;
						return (
							<button
								key={o.value}
								type="button"
								onClick={() => {
									onChange(o.value);
									setOpen(false);
								}}
								className={`block w-full cursor-pointer px-5 py-3 text-left font-sans text-[14px] transition ${
									active
										? "bg-brand-blue font-medium text-white"
										: "text-brand-blue hover:bg-brand-blue/5"
								}`}
							>
								{o.label}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}


function Spinner() {
	return (
		<div
			role="status"
			aria-label="Loading homes"
			className="h-12 w-12 animate-spin rounded-full border-[3px] border-brand-blue/20 border-t-brand-blue"
		/>
	);
}


function Caret() {
	return (
		<svg
			aria-hidden
			viewBox="0 0 12 8"
			className="pointer-events-none absolute right-2 top-1/2 h-2 w-3 -translate-y-1/2 text-brand-blue"
		>
			<path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
