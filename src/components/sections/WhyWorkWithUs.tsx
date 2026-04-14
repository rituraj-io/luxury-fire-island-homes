// WhyWorkWithUs — single centered text column with photos scattered
// around it as absolute decoration. Photos identified from the provided
// assets: photo-2 (people), photo-3 (bike), photo-1 (blue house),
// photo-4 (pool house — gets the yellow badge), photo-5 (aerial).

import Image from "next/image";
import Link from "next/link";


const CTAS = [
	{ href: "#about", label: "ABOUT US" },
	{ href: "#events", label: "SEE EVENTS" },
	{ href: "#reviews", label: "OUR REVIEWS" },
];


export default function WhyWorkWithUs() {
	return (
		<section className="relative w-full overflow-hidden bg-[#f8f4ec]">
			{/* ---------- Desktop ---------- */}

			{/* Decor rail — fixed 1280px wide, centered via absolute +
			    translate. At viewports <1280px this rail extends past both
			    viewport edges so photo clusters keep their sizes and overflow
			    the viewport instead of invading the text. pointer-events-none
			    so it never blocks text clicks. */}
			<div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden h-full w-[1280px] -translate-x-1/2 min-[992px]:block">
				{/* Left cluster */}
				<div className="absolute left-[4%] top-[5%] z-0 aspect-[486/800] w-[486px]">
					{/* photo-2 — people group (middle z) */}
					<div className="pointer-events-auto absolute left-[7%] top-[7%] z-10 w-[50%] -rotate-[9deg]">
						<Image src="/assets/images/photo-2.JPG" alt="" width={600} height={800} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					</div>

					{/* photo-3 — bike (top z), 4:3 crop */}
					<div className="pointer-events-auto absolute left-[42%] top-[30%] z-20 w-[58%] -rotate-[2deg]">
						<div className="relative aspect-[4/3] w-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]">
							<Image src="/assets/images/photo-3.JPG" alt="" fill className="object-cover" sizes="22vw" />
						</div>
					</div>

					{/* photo-1 — small blue house (bottom z) */}
					<div className="pointer-events-auto absolute left-[-4%] top-[calc(50%-18px)] z-0 w-[76%] rotate-[8deg]">
						<Image src="/assets/images/photo-1.png" alt="" width={600} height={500} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					</div>

					{/* "WHY WORK WITH Us?" heading — part of the cluster */}
					<div className="absolute left-[66%] top-[16%] z-30 text-center">
						<h2 className="font-sans text-xl font-medium uppercase tracking-wider text-brand-blue">
							Why work
							<br />
							with{" "}
							<span className="inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
								Us?
							</span>
						</h2>
					</div>
				</div>

				{/* Right cluster */}
				<div className="absolute right-[2%] top-[48%] aspect-[346/533] w-[346px]">
					{/* photo-4 — pool house with badge */}
					<div className="pointer-events-auto absolute left-[-8%] top-0 z-20 w-[96%] -rotate-[3deg]">
						<Image src="/assets/images/photo-4.jpg" alt="" width={800} height={600} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
						<div className="absolute -left-10 -top-20 flex h-32 w-32 items-center justify-center rounded-full bg-brand-yellow p-1 shadow-lg md:h-36 md:w-36 md:p-1.5">
							<Image src="/assets/images/logo-seal-blue.svg" alt="" width={120} height={120} className="h-full w-full rotate-[9deg]" />
						</div>
					</div>

					{/* photo-5 — aerial house */}
					<div className="pointer-events-auto absolute left-[24%] top-[30%] z-10 w-[81%] rotate-[8deg]">
						<Image src="/assets/images/photo-5.png" alt="" width={500} height={400} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					</div>
				</div>
			</div>

			{/* Text container — viewport-responsive, stays fully within the
			    viewport at all widths. This container drives the section's
			    height; the decor rail above sits behind it via h-full. */}
			<div className="relative mx-auto hidden w-full max-w-[1280px] px-8 py-24 min-[992px]:block">
				{/* Top text block — pushed to the right edge, text left-aligned */}
				<div className="relative ml-auto mr-0 w-[55%] pr-[2%]">
					<div className="space-y-5 text-left font-body text-[15px] leading-relaxed text-black">
						<p>
							We take the stress, guesswork, and frustration out of buying, selling, or renting in Fire Island so you can focus on what actually matters: soaking up beach days, making memories, and living your best barefoot life.
						</p>
						<p>
							Fire Island is all about community, and so are we. Our team lives across the island in places like{" "}
							<span className="font-medium underline">Ocean Beach</span>,{" "}
							<span className="font-medium underline">Ocean Bay Park</span>, and{" "}
							<span className="font-medium underline">Seaview</span>, and we know every nook of Fire Island from{" "}
							<span className="font-medium underline">Kismet</span> to{" "}
							<span className="font-medium underline">Davis Park</span>.
						</p>
						<p>
							Some of us have been coming here for generations, others visited once and never left. Together, we bring decades of experience, deep roots, and unique insight that makes every move feel personal.
						</p>
					</div>

				</div>

				{/* Bottom block — outer container w-full max-w-[N]; text lives
				    in a narrower inner div, left-aligned to the start. Buttons
				    span the full outer width, flex-row aligned to the start. */}
				<div className="relative ml-auto mr-[146px] mt-[200px] flex w-[55%] flex-col">
					<div className="w-full max-w-[420px] space-y-5 text-left font-body text-[15px] leading-relaxed text-black">
						<p>
							At Luxury Fire Island Homes, we&apos;re more than real estate. We&apos;re part of the island&apos;s creative heartbeat.
						</p>
						<p>
							Our Ocean Bay Park office is home to <span className="font-medium italic underline">Art in the Park</span>, a seasonal gallery that showcases Fire Island artists and brings the community together through creativity, connection, and culture.
						</p>
						<p>
							With <span className="font-medium italic">100+ five-star reviews</span>, regular features in the Fire Island News, and relationships that run deep across the island, you&apos;re not just working with a real estate team — you&apos;re stepping into the Fire Island community, guided by people who truly know it.
						</p>
					</div>

					<div className="mt-10 flex w-full flex-row flex-wrap justify-start gap-4">
						{CTAS.map((c) => (
							<Link
								key={c.href}
								href={c.href}
								className="bg-[#d67229] px-8 py-3 font-sans text-[14px] font-medium tracking-wider text-white transition hover:brightness-95"
							>
								{c.label}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* ---------- Mobile (stacked) ---------- */}
			<div className="mx-auto w-full max-w-[560px] px-4 py-16 min-[992px]:hidden">
				<div className="grid grid-cols-2 gap-4">
					<Image src="/assets/images/photo-2.JPG" alt="" width={600} height={800} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					<Image src="/assets/images/photo-3.JPG" alt="" width={600} height={800} className="mt-10 h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
				</div>

				<h2 className="mt-10 text-center font-sans text-xl font-medium uppercase tracking-wider text-brand-blue">
					Why work with{" "}
					<span className="inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
						Us?
					</span>
				</h2>

				<div className="mt-6 space-y-5 text-left font-body text-[15px] leading-relaxed text-black">
					<p>
						We take the stress, guesswork, and frustration out of buying, selling, or renting in Fire Island so you can focus on what actually matters: soaking up beach days, making memories, and living your best barefoot life.
					</p>
					<p>
						Fire Island is all about community, and so are we. Our team lives across the island in places like{" "}
						<span className="font-medium underline">Ocean Beach</span>,{" "}
						<span className="font-medium underline">Ocean Bay Park</span>, and{" "}
						<span className="font-medium underline">Seaview</span>, and we know every nook of Fire Island from{" "}
						<span className="font-medium underline">Kismet</span> to{" "}
						<span className="font-medium underline">Davis Park</span>.
					</p>
					<p>
						Some of us have been coming here for generations, others visited once and never left. Together, we bring decades of experience, deep roots, and unique insight that makes every move feel personal.
					</p>
				</div>

				<div className="relative mt-8">
					<Image src="/assets/images/photo-4.jpg" alt="" width={1000} height={700} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					<div className="absolute -left-4 -top-6 flex h-28 w-28 items-center justify-center rounded-full bg-brand-yellow p-1 shadow-lg">
						<Image src="/assets/images/logo-seal-blue.svg" alt="" width={120} height={120} className="h-full w-full -rotate-[10deg]" />
					</div>
				</div>

				<div className="mt-8 space-y-5 text-left font-body text-[15px] leading-relaxed text-black">
					<p>
						At Luxury Fire Island Homes, we&apos;re more than real estate. We&apos;re part of the island&apos;s creative heartbeat.
					</p>
					<p>
						Our Ocean Bay Park office is home to <span className="font-medium italic underline">Art in the Park</span>, a seasonal gallery that showcases Fire Island artists and brings the community together through creativity, connection, and culture.
					</p>
					<p>
						With <span className="font-medium italic">100+ five-star reviews</span>, regular features in the Fire Island News, and relationships that run deep across the island, you&apos;re not just working with a real estate team — you&apos;re stepping into the Fire Island community, guided by people who truly know it.
					</p>
				</div>

				<div className="mt-8 grid grid-cols-2 gap-4">
					<Image src="/assets/images/photo-1.png" alt="" width={800} height={600} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					<Image src="/assets/images/photo-5.png" alt="" width={500} height={500} className="mt-10 h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
				</div>

				<div className="mt-10 flex flex-wrap justify-center gap-4">
					{CTAS.map((c) => (
						<Link key={c.href} href={c.href} className="bg-[#d67229] px-8 py-3 text-center font-sans text-[14px] font-medium tracking-wider text-white transition hover:brightness-95 max-[575px]:w-[calc(50%-0.5rem)]">
							{c.label}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
