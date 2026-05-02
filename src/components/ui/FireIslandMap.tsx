"use client";


// Inlines the Fire Island SVG map (hover-grow + click-through to /area/<slug>/).
// We *inline* rather than embed via <object> so native scrolling — including
// trackpad/touch momentum — works untouched. While the page is scrolling, a
// class on the <svg> root suppresses hover transforms so the cursor crossing
// communities mid-scroll doesn't fire jittery scale transitions.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


const SVG_URL = "/assets/images/fire-island-map.svg";


type Props = {
	className?: string;
};


export default function FireIslandMap({ className }: Props) {
	const hostRef = useRef<HTMLDivElement>(null);
	const [svgHtml, setSvgHtml] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		let cancelled = false;
		fetch(SVG_URL)
			.then((r) => r.text())
			.then((t) => {
				if (!cancelled) setSvgHtml(t);
			})
			.catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!svgHtml) return;
		const host = hostRef.current;
		if (!host) return;
		const svg = host.querySelector("svg");
		if (!svg) return;

		const cleanups: Array<() => void> = [];

		host.querySelectorAll("a").forEach((a) => {
			const onClick = (e: Event) => {
				const href =
					a.getAttribute("xlink:href") || a.getAttribute("href");
				if (!href || !href.startsWith("/")) return;
				e.preventDefault();
				router.push(href);
			};
			a.addEventListener("click", onClick);
			cleanups.push(() => a.removeEventListener("click", onClick));
		});

		let idleTimer: number | null = null;
		const onScroll = () => {
			svg.classList.add("is-scrolling");
			if (idleTimer !== null) window.clearTimeout(idleTimer);
			idleTimer = window.setTimeout(() => {
				svg.classList.remove("is-scrolling");
				idleTimer = null;
			}, 200);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		cleanups.push(() => window.removeEventListener("scroll", onScroll));

		return () => {
			cleanups.forEach((c) => c());
			if (idleTimer !== null) window.clearTimeout(idleTimer);
		};
	}, [svgHtml, router]);

	return (
		<div className={`relative aspect-[633/210] w-full ${className ?? ""}`.trim()}>
			<div
				ref={hostRef}
				className="absolute inset-0 h-full w-full [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
				dangerouslySetInnerHTML={svgHtml ? { __html: svgHtml } : undefined}
			/>
		</div>
	);
}
