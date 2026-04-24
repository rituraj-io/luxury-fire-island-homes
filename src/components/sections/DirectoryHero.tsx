"use client";


// DirectoryHero — reusable landing band for the directory routes.
// Rotated script headline with the brand's blue hard-shadow vocabulary over
// the cream band. Used on /directory (big title) and on /directory/[slug]
// with a smaller treatment. No full-bleed photo on these pages — the
// category tiles and listing cards carry the imagery instead.

import Link from "next/link";
import HeroIntroItem, { HERO_TIMELINE } from "@/components/motion/HeroIntro";


type Breadcrumb = { label: string; href?: string };


type Props = {
	eyebrow?: string;
	title: string;
	tagline?: string;
	breadcrumbs?: Breadcrumb[];
	size?: "lg" | "md";
};


export default function DirectoryHero({
	eyebrow,
	title,
	tagline,
	breadcrumbs,
	size = "lg",
}: Props) {
	const titleClass =
		size === "lg"
			? "font-script text-[48px] leading-[1] text-brand-yellow [text-shadow:2px_3px_0_#185b89] sm:text-[72px] md:text-[96px] md:[text-shadow:3px_4px_0_#185b89] lg:text-[120px] lg:[text-shadow:3px_5px_0_#185b89]"
			: "font-script text-[40px] leading-[1.05] text-brand-yellow [text-shadow:2px_3px_0_#185b89] md:text-[64px] md:[text-shadow:3px_4px_0_#185b89] lg:text-[80px] lg:[text-shadow:3px_5px_0_#185b89]";

	return (
		<section className="relative w-full overflow-hidden bg-[#185b89] pt-[calc(144px+env(safe-area-inset-top)+2rem)] pb-12 md:pb-16">
			{/* Soft texture — the pattern strip reused from the nav to give the
			    band a subtle island-y grain. */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-20"
				style={{
					backgroundImage: "url('/assets/images/pattern-blue.svg')",
					backgroundRepeat: "repeat",
					backgroundSize: "auto 60px",
				}}
			/>

			<div className="relative mx-auto flex w-full max-w-site flex-col items-center px-4 text-center md:px-8">
				{breadcrumbs && breadcrumbs.length > 0 && (
					<HeroIntroItem
						delay={HERO_TIMELINE.eyebrow}
						className="mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-brand-yellow/90 md:text-[13px]"
					>
						{breadcrumbs.map((b, i) => (
							<span key={`${b.label}-${i}`} className="flex items-center gap-2">
								{b.href ? (
									<Link href={b.href} className="transition hover:text-white">
										{b.label}
									</Link>
								) : (
									<span>{b.label}</span>
								)}
								{i < breadcrumbs.length - 1 && (
									<span aria-hidden className="text-brand-yellow/50">
										/
									</span>
								)}
							</span>
						))}
					</HeroIntroItem>
				)}

				{eyebrow && (
					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.eyebrow}
						className="font-sans text-[13px] font-medium uppercase tracking-[0.28em] text-brand-yellow md:text-[14px]"
					>
						{eyebrow}
					</HeroIntroItem>
				)}

				<HeroIntroItem
					as="h1"
					delay={HERO_TIMELINE.headline}
					className={`mt-4 -rotate-[3deg] ${titleClass}`}
				>
					{title}
				</HeroIntroItem>

				{tagline && (
					<HeroIntroItem
						as="p"
						delay={HERO_TIMELINE.subcopy}
						className="mt-6 max-w-[560px] font-sans text-[14px] font-medium italic leading-relaxed text-brand-yellow/90 md:text-[16px]"
					>
						{tagline}
					</HeroIntroItem>
				)}
			</div>
		</section>
	);
}
