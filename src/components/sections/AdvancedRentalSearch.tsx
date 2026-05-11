"use client";


// AdvancedRentalSearch — the /current-rentals page experience. Pulls the
// brand's vocabulary (cream band, script heading, polaroid cards) and grafts
// on an Airbnb-style filter surface: a top compact bar (keyword, city,
// listing type, cadence, Filters, sort), an active-filter chip row, then the
// listings grid with load-more.
//
// Heavy filters live inside a slide-in dialog driven by RentalFilterPanel
// (defined in this file). Filter state is owned at the top — the panel works
// on a draft until Apply is hit, so users can change their mind without
// re-running the page query on every click.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { FeaturedProperty } from "@/lib/cms";
import {
	applyFilters,
	applySort,
	CADENCES,
	countActive,
	EMPTY_FILTERS,
	FAMILY_APARTMENT,
	FEATURE_GROUPS,
	LISTING_TYPES,
	NEIGHBORHOODS,
	PRIVATE_SHARED,
	type Filters,
	type Range,
	type SortKey,
} from "@/lib/rentalFilters";


const PAGE_SIZE = 6;


const COMPACT_INPUT =
	"h-12 w-full appearance-none border-2 border-brand-blue/30 bg-white px-4 pr-9 font-sans text-[14px] text-brand-blue outline-none transition focus:border-brand-blue md:text-[15px]";


type Props = { items: FeaturedProperty[] };


export default function AdvancedRentalSearch({ items }: Props) {
	const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
	const [sort, setSort] = useState<SortKey>("default");
	const [visible, setVisible] = useState(PAGE_SIZE);
	const [panelOpen, setPanelOpen] = useState(false);

	const results = useMemo(() => applySort(applyFilters(items, filters), sort), [items, filters, sort]);
	const shown = results.slice(0, visible);
	const canLoadMore = visible < results.length;
	const activeCount = countActive(filters);

	// Reset visible page count whenever filters/sort change so the user lands
	// on the first page of results, not deep inside a previous query.
	useEffect(() => {
		setVisible(PAGE_SIZE);
	}, [filters, sort]);

	const setField = <K extends keyof Filters>(key: K, value: Filters[K]) =>
		setFilters((f) => ({ ...f, [key]: value }));

	return (
		<section className="w-full bg-[#f8f4ec] pb-16 pt-[calc(144px+env(safe-area-inset-top)+2rem)] md:pb-20 md:pt-[calc(144px+env(safe-area-inset-top)+3rem)]">
			<div className="mx-auto w-full max-w-site px-4 md:px-8">
				<Reveal y={DISTANCE.text} duration={DURATION.text} className="flex flex-col items-center text-center">
					<h1 className="font-script text-[40px] leading-none text-brand-blue md:text-[52px]">
						Current Rentals
					</h1>
					<p className="mt-4 max-w-[560px] font-body text-[16px] leading-relaxed text-black">
						Combine filters to dial in the right home — neighborhood, dates, amenities, the works.
					</p>
				</Reveal>

				{/* Top compact bar — keyword + city + listing type + filters + sort. */}
				<Reveal y={DISTANCE.text} duration={DURATION.text} delay={0.05} className="mt-10">
					<form
						onSubmit={(e) => e.preventDefault()}
						className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto_auto]"
					>
						<label className="relative">
							<span className="sr-only">Keyword</span>
							<input
								type="search"
								value={filters.keyword}
								onChange={(e) => setField("keyword", e.target.value)}
								placeholder="Title or city"
								className={COMPACT_INPUT.replace("pr-9", "pr-4")}
							/>
						</label>

						<label className="relative">
							<span className="sr-only">Neighborhood</span>
							<select
								value={filters.city}
								onChange={(e) => setField("city", e.target.value)}
								className={COMPACT_INPUT}
							>
								<option value="">Any neighborhood</option>
								{NEIGHBORHOODS.map((n) => (
									<option key={n} value={n}>
										{n}
									</option>
								))}
							</select>
							<Caret />
						</label>

						<label className="relative">
							<span className="sr-only">Listing type</span>
							<select
								value={filters.listingType}
								onChange={(e) => setField("listingType", e.target.value as Filters["listingType"])}
								className={COMPACT_INPUT}
							>
								<option value="">Sale or Rent</option>
								{LISTING_TYPES.map((t) => (
									<option key={t} value={t}>
										{t}
									</option>
								))}
							</select>
							<Caret />
						</label>

						<button
							type="button"
							onClick={() => setPanelOpen(true)}
							className="flex h-12 cursor-pointer items-center justify-center gap-2 border-2 border-brand-blue bg-white px-5 font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5"
						>
							<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M3 6h18M6 12h12M10 18h4" />
							</svg>
							Filters
							{activeCount > 0 && (
								<span className="ml-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-blue px-1.5 text-[12px] text-white">
									{activeCount}
								</span>
							)}
						</button>

						<label className="relative">
							<span className="sr-only">Sort</span>
							<select
								value={sort}
								onChange={(e) => setSort(e.target.value as SortKey)}
								className={COMPACT_INPUT}
							>
								<option value="default">Sort: Default</option>
								<option value="price-asc">Price: Low to High</option>
								<option value="price-desc">Price: High to Low</option>
								<option value="beds-desc">Most bedrooms</option>
							</select>
							<Caret />
						</label>
					</form>

					{/* Active filter chips — clicking a chip clears that one filter. */}
					{activeCount > 0 && (
						<div className="mt-4 flex flex-wrap items-center gap-2">
							{renderChips(filters, setFilters)}
							<button
								type="button"
								onClick={() => setFilters(EMPTY_FILTERS)}
								className="ml-1 font-sans text-[13px] font-medium uppercase tracking-wider text-brand-blue underline-offset-4 hover:underline"
							>
								Clear all
							</button>
						</div>
					)}
				</Reveal>

				{/* Result count */}
				<p className="mt-8 font-sans text-[14px] text-brand-blue/70">
					{results.length} {results.length === 1 ? "home" : "homes"} found
				</p>

				{/* Grid */}
				{shown.length === 0 ? (
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
					<RevealStagger
						gap={STAGGER.card}
						className="mx-auto mt-6 grid max-w-[420px] grid-cols-1 gap-6 sm:max-w-[780px] sm:grid-cols-2 md:max-w-site md:grid-cols-3"
					>
						{shown.map((r) => (
							<RevealItem key={r.id} y={DISTANCE.card} duration={DURATION.card}>
								<Link
									href={`/rentals/${r.id}`}
									className="group block bg-white shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl"
								>
									<div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
										<Image
											src={r.thumbnailUrl}
											alt={`${r.title} — ${r.locationLabel}`}
											fill
											sizes="(min-width: 768px) 360px, (min-width: 640px) 45vw, 90vw"
											className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
										/>
										<div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/25" />
										<div className="absolute left-3 top-3 z-10 bg-white/95 px-3 py-1 font-sans text-[12px] font-medium uppercase tracking-wider text-brand-blue">
											{r.propertyType}
										</div>
									</div>
									<div className="px-5 py-4 text-center transition-transform duration-300 ease-out group-hover:-translate-y-1">
										<p className="font-sans text-[20px] font-medium text-black">{r.priceLabel}</p>
										<p className="mt-1.5 font-sans text-[16px] text-black">{r.title}</p>
										<p className="mt-0.5 font-sans text-[14px] text-black/80">{r.locationLabel}</p>
										<p className="mt-2 font-sans text-[12px] uppercase tracking-wider text-brand-blue/70">
											{r.bedrooms} BD · {r.bathrooms} BA
										</p>
									</div>
								</Link>
							</RevealItem>
						))}
					</RevealStagger>
				)}

				{canLoadMore && (
					<Reveal y={DISTANCE.text} duration={DURATION.text} className="mt-10 flex justify-center md:mt-12">
						<button
							type="button"
							onClick={() => setVisible((v) => v + PAGE_SIZE)}
							className="cursor-pointer border-2 border-brand-blue bg-transparent px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-brand-blue transition hover:bg-brand-blue/5"
						>
							Load More
						</button>
					</Reveal>
				)}
			</div>

			<RentalFilterPanel
				open={panelOpen}
				onClose={() => setPanelOpen(false)}
				initial={filters}
				onApply={(next) => {
					setFilters(next);
					setPanelOpen(false);
				}}
			/>
		</section>
	);
}


/* ──────────────────────── active filter chips ──────────────────────── */


function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
	return (
		<span className="inline-flex h-8 items-center gap-2 border border-brand-blue/30 bg-white px-3 font-sans text-[13px] text-brand-blue">
			{label}
			<button
				type="button"
				aria-label={`Remove ${label}`}
				onClick={onRemove}
				className="flex h-4 w-4 items-center justify-center rounded-full text-brand-blue/70 transition hover:bg-brand-blue/10 hover:text-brand-blue"
			>
				<svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		</span>
	);
}


function rangeChipLabel(field: string, r: Range): string | null {
	if (r.min == null && r.max == null) return null;
	if (r.min != null && r.max != null) return `${field}: ${r.min}–${r.max}`;
	if (r.min != null) return `${field}: ${r.min}+`;
	return `${field}: ≤ ${r.max}`;
}


function renderChips(filters: Filters, set: React.Dispatch<React.SetStateAction<Filters>>) {
	const chips: React.ReactNode[] = [];
	const clear = <K extends keyof Filters>(key: K, value: Filters[K]) =>
		set((f) => ({ ...f, [key]: value }));

	if (filters.keyword) chips.push(<Chip key="kw" label={`"${filters.keyword}"`} onRemove={() => clear("keyword", "")} />);
	if (filters.city) chips.push(<Chip key="city" label={filters.city} onRemove={() => clear("city", "")} />);
	if (filters.listingType)
		chips.push(<Chip key="lt" label={filters.listingType} onRemove={() => clear("listingType", "")} />);
	if (filters.exclusiveListing)
		chips.push(<Chip key="exc" label={`Exclusive: ${filters.exclusiveListing}`} onRemove={() => clear("exclusiveListing", "")} />);
	if (filters.familyApartment)
		chips.push(<Chip key="fa" label={filters.familyApartment} onRemove={() => clear("familyApartment", "")} />);
	if (filters.privateShared)
		chips.push(<Chip key="ps" label={filters.privateShared} onRemove={() => clear("privateShared", "")} />);
	if (filters.cadence.length)
		chips.push(<Chip key="cad" label={`Cadence: ${filters.cadence.join(", ")}`} onRemove={() => clear("cadence", [])} />);

	const beds = rangeChipLabel("Beds", filters.bedrooms);
	if (beds) chips.push(<Chip key="bd" label={beds} onRemove={() => clear("bedrooms", {})} />);
	const baths = rangeChipLabel("Baths", filters.bathrooms);
	if (baths) chips.push(<Chip key="ba" label={baths} onRemove={() => clear("bathrooms", {})} />);
	const sleeps = rangeChipLabel("Sleeps", filters.sleeps);
	if (sleeps) chips.push(<Chip key="sl" label={sleeps} onRemove={() => clear("sleeps", {})} />);
	const price = rangeChipLabel("$", filters.price);
	if (price) chips.push(<Chip key="pr" label={price} onRemove={() => clear("price", {})} />);

	for (const f of filters.features) {
		chips.push(
			<Chip
				key={`feat-${f}`}
				label={f}
				onRemove={() => set((curr) => ({ ...curr, features: curr.features.filter((x) => x !== f) }))}
			/>,
		);
	}

	return chips;
}


/* ──────────────────────── filter panel modal ──────────────────────── */


function RentalFilterPanel({
	open,
	onClose,
	initial,
	onApply,
}: {
	open: boolean;
	onClose: () => void;
	initial: Filters;
	onApply: (f: Filters) => void;
}) {
	const [draft, setDraft] = useState<Filters>(initial);

	// Re-seed the draft when the panel opens fresh.
	useEffect(() => {
		if (open) setDraft(initial);
	}, [open, initial]);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
		setDraft((f) => ({ ...f, [key]: value }));

	const toggleFeature = (label: string) =>
		setDraft((f) => ({
			...f,
			features: f.features.includes(label)
				? f.features.filter((x) => x !== label)
				: [...f.features, label],
		}));

	const toggleCadence = (c: (typeof CADENCES)[number]) =>
		setDraft((f) => ({
			...f,
			cadence: f.cadence.includes(c) ? f.cadence.filter((x) => x !== c) : [...f.cadence, c],
		}));

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="filter-title"
			className="fixed inset-0 z-[100] flex justify-end bg-black/55"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div className="flex h-full w-full max-w-[560px] flex-col bg-[#fffbf8] shadow-2xl">
				<header className="flex shrink-0 items-center justify-between border-b border-brand-blue/15 px-6 py-5">
					<h2 id="filter-title" className="font-script text-[28px] leading-none text-brand-blue">
						Filters
					</h2>
					<button
						type="button"
						aria-label="Close filters"
						onClick={onClose}
						className="flex h-9 w-9 items-center justify-center text-brand-blue transition hover:bg-brand-blue/10"
					>
						<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</button>
				</header>

				<div className="flex-1 overflow-y-auto px-6 py-6">
					<Group title="Listing">
						<FieldGrid>
							<SelectField label="Listing type" value={draft.listingType} onChange={(v) => set("listingType", v as Filters["listingType"])} options={[["", "Any"], ...LISTING_TYPES.map((t) => [t, t] as [string, string])]} />
							<SelectField label="Neighborhood" value={draft.city} onChange={(v) => set("city", v)} options={[["", "Any"], ...NEIGHBORHOODS.map((n) => [n, n] as [string, string])]} />
							<SelectField label="Exclusive listing" value={draft.exclusiveListing} onChange={(v) => set("exclusiveListing", v as Filters["exclusiveListing"])} options={[["", "Any"], ["yes", "Yes"], ["no", "No"]]} />
							<SelectField label="Family / Apartment" value={draft.familyApartment} onChange={(v) => set("familyApartment", v as Filters["familyApartment"])} options={[["", "Any"], ...FAMILY_APARTMENT.map((x) => [x, x] as [string, string])]} />
							<SelectField label="Private / Shared" value={draft.privateShared} onChange={(v) => set("privateShared", v as Filters["privateShared"])} options={[["", "Any"], ...PRIVATE_SHARED.map((x) => [x, x] as [string, string])]} />
						</FieldGrid>
					</Group>

					<Group title="Availability">
						<p className="-mt-1 mb-3 font-sans text-[12px] italic text-brand-blue/60">
							Cadence field is awaiting backend support — filter shown for preview.
						</p>
						<div className="flex flex-wrap gap-2">
							{CADENCES.map((c) => {
								const active = draft.cadence.includes(c);
								return (
									<button
										key={c}
										type="button"
										onClick={() => toggleCadence(c)}
										className={`h-9 border-2 px-4 font-sans text-[13px] font-medium uppercase tracking-wider transition ${
											active
												? "border-brand-blue bg-brand-blue text-white"
												: "border-brand-blue/30 bg-white text-brand-blue hover:bg-brand-blue/5"
										}`}
									>
										{c}
									</button>
								);
							})}
						</div>
					</Group>

					<Group title="Beds, baths, sleeps, price">
						<RangeRow label="Bedrooms" range={draft.bedrooms} onChange={(r) => set("bedrooms", r)} max={12} />
						<RangeRow label="Bathrooms" range={draft.bathrooms} onChange={(r) => set("bathrooms", r)} max={10} />
						<RangeRow label="Sleeps" range={draft.sleeps} onChange={(r) => set("sleeps", r)} max={24} />
						<RangeRow label="Price (USD)" range={draft.price} onChange={(r) => set("price", r)} step={500} placeholderMin="Min" placeholderMax="Max" />
					</Group>

					{FEATURE_GROUPS.map((g) => (
						<Group key={g.label} title={g.label}>
							<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
								{g.options.map((opt) => {
									const active = draft.features.includes(opt);
									return (
										<label
											key={`${g.label}-${opt}`}
											className={`flex cursor-pointer items-center gap-3 border px-3 py-2 font-sans text-[14px] transition ${
												active
													? "border-brand-blue bg-brand-blue/5 text-brand-blue"
													: "border-brand-blue/20 bg-white text-brand-blue/85 hover:border-brand-blue/40"
											}`}
										>
											<input
												type="checkbox"
												checked={active}
												onChange={() => toggleFeature(opt)}
												className="h-4 w-4 accent-brand-blue"
											/>
											{opt}
										</label>
									);
								})}
							</div>
						</Group>
					))}
				</div>

				<footer className="flex shrink-0 items-center justify-between gap-3 border-t border-brand-blue/15 px-6 py-4">
					<button
						type="button"
						onClick={() => setDraft(EMPTY_FILTERS)}
						className="font-sans text-[14px] font-medium uppercase tracking-wider text-brand-blue underline-offset-4 hover:underline"
					>
						Clear all
					</button>
					<button
						type="button"
						onClick={() => onApply(draft)}
						className="cursor-pointer bg-brand-orange px-8 py-3 font-sans text-[14px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
					>
						Show results
					</button>
				</footer>
			</div>
		</div>
	);
}


function Group({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="mb-8">
			<h3 className="mb-3 font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-brand-blue">
				{title}
			</h3>
			{children}
		</section>
	);
}


function FieldGrid({ children }: { children: React.ReactNode }) {
	return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>;
}


function SelectField({
	label,
	value,
	onChange,
	options,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	options: [string, string][];
}) {
	return (
		<label className="flex flex-col">
			<span className="font-sans text-[12px] font-medium uppercase tracking-wider text-brand-blue/70">
				{label}
			</span>
			<div className="relative mt-1">
				<select
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={COMPACT_INPUT}
				>
					{options.map(([v, l]) => (
						<option key={v || "_"} value={v}>
							{l}
						</option>
					))}
				</select>
				<Caret />
			</div>
		</label>
	);
}


function RangeRow({
	label,
	range,
	onChange,
	max,
	step = 1,
	placeholderMin,
	placeholderMax,
}: {
	label: string;
	range: Range;
	onChange: (r: Range) => void;
	max?: number;
	step?: number;
	placeholderMin?: string;
	placeholderMax?: string;
}) {
	const parse = (s: string): number | undefined => {
		const t = s.trim();
		if (t === "") return undefined;
		const n = Number(t);
		return Number.isFinite(n) ? n : undefined;
	};
	return (
		<div className="mb-3">
			<p className="mb-1 font-sans text-[12px] font-medium uppercase tracking-wider text-brand-blue/70">
				{label}
			</p>
			<div className="grid grid-cols-2 gap-3">
				<input
					type="number"
					inputMode="numeric"
					min={0}
					max={max}
					step={step}
					value={range.min ?? ""}
					onChange={(e) => onChange({ ...range, min: parse(e.target.value) })}
					placeholder={placeholderMin ?? "Min"}
					className="h-11 w-full border border-brand-blue/30 bg-white px-3 font-sans text-[14px] text-brand-blue outline-none transition focus:border-brand-blue"
				/>
				<input
					type="number"
					inputMode="numeric"
					min={0}
					max={max}
					step={step}
					value={range.max ?? ""}
					onChange={(e) => onChange({ ...range, max: parse(e.target.value) })}
					placeholder={placeholderMax ?? "Max"}
					className="h-11 w-full border border-brand-blue/30 bg-white px-3 font-sans text-[14px] text-brand-blue outline-none transition focus:border-brand-blue"
				/>
			</div>
		</div>
	);
}


function Caret() {
	return (
		<svg
			aria-hidden
			viewBox="0 0 12 8"
			className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-brand-blue"
		>
			<path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
