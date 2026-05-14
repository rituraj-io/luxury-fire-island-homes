"use client";


// RentDifference — section 3 of /rent. Two alternating rows: each pairs a
// blue text box (copy from CMS) with a multi-photo cluster of tilted,
// parallaxed snapshots (hardcoded from /public/assets/images so the layout
// has the visual richness of /buy's WhereWeComeIn timeline rather than
// rendering as two flat single-image rows).
//
// Photos use a fixed-aspect cluster wrapper with percentage-positioned
// children, so each cluster scales as one unit. Front layers parallax further
// than back layers, giving subtle depth on the page scroll. Disabled on touch
// and prefers-reduced-motion.

import Image from "next/image";
import { useRef } from "react";
import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
	type MotionValue,
} from "motion/react";
import Reveal from "@/components/motion/Reveal";
import { paragraphs, type RentSection3 } from "@/lib/cms";
import { useFinePointer } from "@/lib/motion";


type TextBlockData = { title: string; description: string };


// Editorial fallback for each text block, used when section3 hasn't been
// populated in the CMS yet. The CMS is the source of truth when present.
const FALLBACK_BLOCKS: [TextBlockData, TextBlockData] = [
	{
		title: "THE LUXURY FIRE ISLAND HOMES DIFFERENCE:",
		description:
			"At Luxury Fire Island Homes, we take the stress off your plate and match you with a vacation rental that actually delivers — from the spotless kitchen to the smooth check-in to the sunset view you’ll be bragging about for months.",
	},
	{
		title: "Fun for the whole family",
		description:
			"Whether you’re planning a peaceful couples’ weekend or a multi-family getaway (in-laws optional 🥂), we’ll find you the perfect place — fast and for at least $1K less than what you’d pay on Airbnb or Vrbo.\n\nAnd yes, we have plenty of pet-friendly homes for rent. Because let’s be honest… you’re really coming so your favorite family member can hit the beach.",
	},
];


// Walks the new rows[]-based section3 schema and pairs the richText rows
// (first = heading paragraph, rest = body) into TextBlock-ready objects.
function blocksFromRows(data: RentSection3 | undefined): [TextBlockData, TextBlockData] {
	const out: TextBlockData[] = [];
	for (const row of data?.rows ?? []) {
		if (row.kind !== "richText") continue;
		const paras = paragraphs(row.content);
		if (paras.length === 0) continue;
		const [title, ...rest] = paras;
		out.push({ title, description: rest.join("\n\n") });
	}
	return [
		out[0] ?? FALLBACK_BLOCKS[0],
		out[1] ?? FALLBACK_BLOCKS[1],
	];
}


// Each cluster references photos by filename slug (e.g. "bbq-umbrella"),
// so we collect every image URL across section3's image rows into a slug-keyed
// map. CMS URLs end with `<uuid>-<filename>.<ext>`.
type ImageMap = Record<string, string>;

function buildImageMap(data: RentSection3 | undefined): ImageMap {
	const out: ImageMap = {};
	for (const row of data?.rows ?? []) {
		if (row.kind !== "images") continue;
		for (const url of row.urls) {
			const slug = slugFromUrl(url);
			if (slug && !out[slug]) out[slug] = url;
		}
	}
	return out;
}

function slugFromUrl(url: string): string | null {
	const file = url.split("/").pop();
	if (!file) return null;
	const stripped = file.replace(/^[0-9a-f-]{36}-/, "");
	return stripped.replace(/\.[a-z]+$/i, "");
}

function pickSrc(map: ImageMap, slug: string, fallback: string): string {
	return map[slug] ?? fallback;
}


// Parallax magnitudes (px). Each photo's vertical travel across the section's
// viewport pass is `2 * amount`. Larger magnitude reads as closer to camera.
const DEPTH = {
	back: 30,
	mid: 130,
	front: 260,
} as const;


type ParallaxCtx = {
	scrollProgress: MotionValue<number>;
	enabled: boolean;
};


export default function RentDifference({ data }: { data?: RentSection3 }) {
	const [block1, block2] = blocksFromRows(data);
	const images = buildImageMap(data);
	const sectionRef = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();
	const finePointer = useFinePointer();
	const enabled = !reduced && finePointer;

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	const ctx: ParallaxCtx = { scrollProgress: scrollYProgress, enabled };

	return (
		<section ref={sectionRef} className="relative w-full overflow-visible bg-[#f8f4ec] py-16 md:py-24">
			<div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-y-16 px-4 md:px-8 min-[992px]:grid-cols-2 min-[992px]:items-center min-[992px]:gap-x-16 min-[992px]:gap-y-24">
				{/* Row 1 — text on the left, cluster on the right. bbq image
				    overflows beneath the text card via z-index stacking. */}
				<Reveal className="relative z-10">
					<TextBlock {...block1} />
				</Reveal>
				<Reveal delay={0.05}>
					<ClusterA ctx={ctx} images={images} />
				</Reveal>

				{/* Row 2 — cluster on the left, text on the right. Mobile keeps
				    text first for narrative flow (text1 → cluster A → text2 →
				    cluster B); desktop reorders so the cluster lands in column 1. */}
				<Reveal className="min-[992px]:order-2">
					<TextBlock {...block2} />
				</Reveal>
				<Reveal delay={0.05} className="min-[992px]:order-1">
					<ClusterB ctx={ctx} images={images} />
				</Reveal>
			</div>
		</section>
	);
}


function TextBlock({ title, description }: { title: string; description: string }) {
	return (
		<div className="bg-[#dbe2ec] p-6 md:p-9">
			<h3 className="font-sans text-xl font-medium uppercase tracking-wider text-brand-blue md:text-2xl">
				{title}
			</h3>
			<div className="mt-4 space-y-3 font-body text-[14.5px] leading-relaxed text-black md:text-[15px]">
				{paragraphs(description).map((p, i) => (
					<p key={i}>
						{p.split("\n").map((line, j, all) => (
							<span key={j}>
								{line}
								{j < all.length - 1 ? <br /> : null}
							</span>
						))}
					</p>
				))}
			</div>
		</div>
	);
}


// ------------------------------------------------------------------
// Photo primitives — same shape as WhereWeComeIn so the visual language
// matches across the buy and rent landing pages.
// ------------------------------------------------------------------


function PhotoFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
	return (
		<div className={`relative border-4 border-white shadow-xl ${className ?? ""}`}>
			<Image src={src} alt={alt} fill sizes="(min-width: 992px) 280px, 70vw" className="object-cover" />
		</div>
	);
}


function Photo({
	ctx,
	depth,
	rotate,
	position,
	aspect,
	src,
	alt,
}: {
	ctx: ParallaxCtx;
	depth: keyof typeof DEPTH;
	rotate: number;
	position: string;
	aspect: string;
	src: string;
	alt: string;
}) {
	const amount = ctx.enabled ? DEPTH[depth] : 0;
	const y = useTransform(ctx.scrollProgress, [0, 1], [amount, -amount]);

	return (
		<motion.div
			style={{ y, rotate, willChange: ctx.enabled ? "transform" : undefined }}
			className={`absolute ${position}`}>
			<PhotoFrame src={src} alt={alt} className={`w-full ${aspect}`} />
		</motion.div>
	);
}


// Cluster paired with text1 ("THE LUXURY FIRE ISLAND HOMES DIFFERENCE")
// — two tilted, parallaxed photos with the LFIH seal anchoring the bottom
// center, slightly overlapping both photos.
function ClusterA({ ctx, images }: { ctx: ParallaxCtx; images: ImageMap }) {
	return (
		<div className="relative mx-auto aspect-[10/8] w-full max-w-[480px]">
			<Photo
				ctx={ctx}
				depth="back"
				rotate={3}
				position="-left-[14%] top-[2%] w-[64%]"
				aspect="aspect-[885/752]"
				src={pickSrc(images, "bbq-umbrella", "/assets/images/bbq-umbrella.webp")}
				alt="Outdoor dining under a beach umbrella"
			/>
			<Photo
				ctx={ctx}
				depth="front"
				rotate={8}
				position="right-[2%] -top-[2%] w-[52%]"
				aspect="aspect-[579/778]"
				src={pickSrc(images, "cornfield-farmhouse", "/assets/images/cornfield-farmhouse.webp")}
				alt="Tall Fire Island farmhouse"
			/>
			{/* LFIH seal anchored bottom-center, layered over both photos. Same
			    badge treatment as About / WhyWorkWithUs: yellow-filled disc
			    wrapper with the blue line-art SVG inset by the wrapper padding. */}
			<div className="pointer-events-none absolute left-[28%] top-[58%] flex aspect-square w-[34%] rotate-[3deg] items-center justify-center rounded-full bg-brand-yellow p-1.5 shadow-lg">
				<Image
					src={pickSrc(images, "logo-seal-blue", "/assets/images/logo-seal-blue.svg")}
					alt=""
					width={200}
					height={200}
					className="h-full w-full"
				/>
			</div>
		</div>
	);
}


// Cluster paired with text2 ("Fun for the whole family")
// — two tilted, parallaxed photos: man on a beach bike up front, dog on the
// boat ride peeking from behind.
function ClusterB({ ctx, images }: { ctx: ParallaxCtx; images: ImageMap }) {
	return (
		<div className="relative mx-auto aspect-[3/2] w-full max-w-[460px]">
			<Photo
				ctx={ctx}
				depth="back"
				rotate={5}
				position="right-[2%] top-[0%] w-[58%]"
				aspect="aspect-[886/750]"
				src={pickSrc(images, "dog-1", "/assets/images/dog-1.webp")}
				alt="Dog enjoying the boat ride"
			/>
			<Photo
				ctx={ctx}
				depth="front"
				rotate={-5}
				position="left-[2%] top-[18%] w-[58%]"
				aspect="aspect-[886/750]"
				src={pickSrc(images, "photo-3", "/assets/images/photo-3.webp")}
				alt="Cruising Fire Island on a beach bike"
			/>
		</div>
	);
}
