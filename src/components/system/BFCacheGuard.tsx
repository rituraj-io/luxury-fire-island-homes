"use client";


// Reload when the page is restored from the browser's bfcache. The Reveal
// motion components use `whileInView` with `once: true` and don't re-fire on
// bfcache restore — without this guard, sections that hadn't yet entered the
// viewport stay stuck at opacity:0 and the page renders blank after a back
// navigation from a full page (e.g. Next's default 404).

import { useEffect } from "react";


export default function BFCacheGuard() {
	useEffect(() => {
		const onPageShow = (e: PageTransitionEvent) => {
			if (e.persisted) window.location.reload();
		};
		window.addEventListener("pageshow", onPageShow);
		return () => window.removeEventListener("pageshow", onPageShow);
	}, []);

	return null;
}
