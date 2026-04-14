// 404 — styled to match the homepage: brand yellow band, blue pattern
// strip, outlined display number, script flourish, orange CTA.

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";


export const metadata: Metadata = {
	title: "Page Not Found",
	description: "That page drifted off course. Let's get you back to Fire Island.",
	robots: { index: false, follow: true },
};


export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col bg-[#efe29d]">
			{/* Top pattern strip — visual continuity with Nav/Footer. */}
			<div
				aria-hidden
				className="h-4 w-full shrink-0"
				style={{
					backgroundImage: "url('/assets/images/pattern-blue.svg')",
					backgroundRepeat: "repeat-x",
					backgroundPosition: "center",
					backgroundSize: "auto 125%",
				}}
			/>

			<section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-28">
				{/* Soft decorative umbrella-icon tint at the far right (desktop only). */}
				<Image
					src="/icon.svg"
					alt=""
					aria-hidden="true"
					width={520}
					height={520}
					className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.09] lg:block"
				/>

				<div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center text-center">
					{/* 404 — outlined display face, mirroring Hero's outlined headline. */}
					<h1
						className="font-display text-[120px] leading-none tracking-[0.06em] text-transparent sm:text-[180px] md:text-[240px]"
						style={{
							WebkitTextStroke: "3px var(--color-brand-blue)",
							color: "transparent",
						}}
					>
						404
					</h1>

					{/* Script flourish */}
					<p className="mt-2 font-script text-5xl leading-none text-brand-blue md:mt-4 md:text-6xl">
						You&apos;ve drifted
					</p>

					{/* Secondary headline in sans caps, matching section headings. */}
					<h2 className="mt-3 font-sans text-2xl font-medium uppercase tracking-wider text-brand-blue md:mt-4 md:text-3xl">
						off course
					</h2>

					<p className="mt-8 max-w-[520px] font-body text-[16px] leading-relaxed text-black md:mt-10 md:text-[17px]">
						This page doesn&apos;t exist on Fire Island. Let&apos;s get you back to the beach — the ferry leaves in a minute.
					</p>

					<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 md:mt-12">
						<Link
							href="/"
							className="bg-brand-orange px-8 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-95"
						>
							RETURN HOME
						</Link>
						<Link
							href="/#contact"
							className="border-2 border-brand-blue px-8 py-3 font-sans text-[16px] font-medium tracking-wider text-brand-blue transition hover:bg-brand-blue hover:text-white"
						>
							CONTACT US
						</Link>
					</div>
				</div>
			</section>

			{/* Bottom pattern strip for visual closure. */}
			<div
				aria-hidden
				className="h-4 w-full shrink-0"
				style={{
					backgroundImage: "url('/assets/images/pattern-blue.svg')",
					backgroundRepeat: "repeat-x",
					backgroundPosition: "center",
					backgroundSize: "auto 125%",
				}}
			/>
		</main>
	);
}
