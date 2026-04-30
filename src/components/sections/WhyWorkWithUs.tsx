// WhyWorkWithUs — single centered text column with photos scattered
// around it as absolute decoration. Photos identified from the provided
// assets: photo-2 (people), photo-3 (bike), photo-1 (blue house),
// photo-4 (pool house — gets the yellow badge), photo-5 (aerial).

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import Bob from "@/components/motion/Bob";
import { DISTANCE, DURATION } from "@/lib/motion";
import { paragraphs, type WhyWorkSection } from "@/lib/cms";


const CTAS = [
	{ href: "/#about", label: "ABOUT US" },
	{ href: "/#events", label: "SEE EVENTS" },
	{ href: "#reviews", label: "OUR REVIEWS" },
];


type Props = { data: WhyWorkSection };


export default function WhyWorkWithUs({ data }: Props) {
	const { title } = data;
	const desc1 = paragraphs(data.description1);
	const desc2 = paragraphs(data.description2);

	return (
		<section className="relative w-full overflow-hidden bg-[#f8f4ec]">
			{/* ---------- Desktop ---------- */}

			<div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden h-full w-[1280px] -translate-x-1/2 min-[992px]:block">
				{/* Left cluster — reveals as a whole unit */}
				<Reveal y={DISTANCE.card} duration={DURATION.card} className="absolute left-[4%] top-[5%] z-0 aspect-[486/800] w-[486px]">
					<Bob className="pointer-events-auto absolute left-[7%] top-[7%] z-10 w-[50%]" delay={0.15} amplitude={3.5} duration={3} >
						<div className="-rotate-[9deg]">
							<Image src="/assets/images/photo-2.webp" alt="Luxury Fire Island Homes team on the beach with clients" width={600} height={800} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
						</div>
					</Bob>

					<Bob className="pointer-events-auto absolute left-[42%] top-[30%] z-20 w-[58%]" delay={0.75} amplitude={3} duration={2.6}>
						<div className="-rotate-[2deg]">
							<div className="relative aspect-[4/3] w-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]">
								<Image src="/assets/images/photo-3.webp" alt="Cruising Fire Island&apos;s car-free paths by beach bike" fill className="object-cover" sizes="22vw" />
							</div>
						</div>
					</Bob>

					<Bob className="pointer-events-auto absolute left-[-4%] top-[calc(50%-18px)] z-0 w-[76%]" delay={1.25} amplitude={4} duration={3.4}>
						<div className="rotate-[8deg]">
							<Image src="/assets/images/photo-1.webp" alt="Charming blue beach cottage on Fire Island" width={600} height={500} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
						</div>
					</Bob>

					<div className="absolute left-[66%] top-[16%] z-30 text-center">
						<h2 className="font-sans text-xl font-medium uppercase tracking-wider text-brand-blue">
							{title.preStyle}{" "}
							<span className="inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
								{title.styled}
							</span>
							{title.postStyle ? <> {title.postStyle}</> : null}
						</h2>
					</div>
				</Reveal>

				{/* Right cluster — slightly delayed */}
				<Reveal y={DISTANCE.card} duration={DURATION.card} delay={0.2} className="absolute right-[0.5%] top-[44%] aspect-[346/533] w-[346px]">
					<Bob className="pointer-events-auto absolute left-[-8%] top-0 z-20 w-[96%]" delay={0.4} amplitude={3.5} duration={3} >
						<div className="relative -rotate-[3deg]">
							<Image src="/assets/images/photo-4.webp" alt="Luxury waterfront Fire Island home with private pool" width={800} height={600} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
							<div className="absolute -left-10 -top-20 flex h-32 w-32 items-center justify-center rounded-full bg-brand-yellow p-1 shadow-lg md:h-36 md:w-36 md:p-1.5">
								<Image src="/assets/images/logo-seal-blue.svg" alt="" width={120} height={120} className="h-full w-full rotate-[9deg]" />
							</div>
						</div>
					</Bob>

					<Bob className="pointer-events-auto absolute left-[24%] top-[30%] z-10 w-[81%]" delay={1} amplitude={3} duration={2.7}>
						<div className="rotate-[8deg]">
							<Image src="/assets/images/photo-5.webp" alt="Aerial view of a Fire Island beach home surrounded by dunes" width={500} height={400} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
						</div>
					</Bob>
				</Reveal>
			</div>

			<div className="relative mx-auto hidden w-full max-w-[1280px] px-8 py-24 min-[992px]:block">
				<RevealStagger className="relative ml-auto mr-0 w-[55%] pr-[2%]">
					<RevealItem className="space-y-5 text-left font-body text-[16px] leading-relaxed text-black">
						{desc1.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</RevealItem>
				</RevealStagger>

				<RevealStagger className="relative ml-auto mr-[146px] mt-[200px] flex w-[55%] flex-col">
					<RevealItem className="w-full max-w-[420px] space-y-5 text-left font-body text-[16px] leading-relaxed text-black">
						{desc2.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</RevealItem>

					<RevealItem className="mt-10 flex w-full flex-row flex-wrap justify-start gap-4">
						{CTAS.map((c) => (
							<Link
								key={c.href}
								href={c.href}
								className="bg-[#d67229] px-8 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-95"
							>
								{c.label}
							</Link>
						))}
					</RevealItem>
				</RevealStagger>
			</div>

			{/* ---------- Mobile (stacked) ---------- */}
			<div className="mx-auto w-full max-w-[560px] px-4 py-16 min-[992px]:hidden">
				<Reveal y={DISTANCE.card} duration={DURATION.card} className="grid grid-cols-2 gap-4">
					<Image src="/assets/images/photo-2.webp" alt="Luxury Fire Island Homes team on the beach with clients" width={600} height={800} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					<Image src="/assets/images/photo-3.webp" alt="Cruising Fire Island&apos;s car-free paths by beach bike" width={600} height={800} className="mt-10 h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
				</Reveal>

				<Reveal as="h2" className="mt-10 text-center font-sans text-xl font-medium uppercase tracking-wider text-brand-blue">
					{title.preStyle}{" "}
					<span className="inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
						{title.styled}
					</span>
					{title.postStyle ? <> {title.postStyle}</> : null}
				</Reveal>

				<RevealStagger className="mt-6 space-y-5 text-left font-body text-[16px] leading-relaxed text-black">
					{desc1.map((p, i) => (
						<RevealItem key={i} as="p">{p}</RevealItem>
					))}
				</RevealStagger>

				<Reveal y={DISTANCE.card} duration={DURATION.card} className="relative mt-8">
					<Image src="/assets/images/photo-4.webp" alt="Luxury waterfront Fire Island home with private pool" width={1000} height={700} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					<div className="absolute -left-4 -top-6 flex h-28 w-28 items-center justify-center rounded-full bg-brand-yellow p-1 shadow-lg">
						<Image src="/assets/images/logo-seal-blue.svg" alt="" width={120} height={120} className="h-full w-full -rotate-[10deg]" />
					</div>
				</Reveal>

				<RevealStagger className="mt-8 space-y-5 text-left font-body text-[16px] leading-relaxed text-black">
					{desc2.map((p, i) => (
						<RevealItem key={i} as="p">{p}</RevealItem>
					))}
				</RevealStagger>

				<Reveal y={DISTANCE.card} duration={DURATION.card} className="mt-8 grid grid-cols-2 gap-4">
					<Image src="/assets/images/photo-1.webp" alt="Charming blue beach cottage on Fire Island" width={800} height={600} className="h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
					<Image src="/assets/images/photo-5.webp" alt="Aerial view of a Fire Island beach home surrounded by dunes" width={500} height={500} className="mt-10 h-auto w-full border-4 border-white shadow-xl transition-transform duration-300 hover:scale-[1.03]" />
				</Reveal>

				<RevealStagger className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-4">
					{CTAS.map((c) => (
						<RevealItem key={c.href} className="max-[575px]:w-[calc(50%-0.5rem)]">
							<Link href={c.href} className="block bg-[#d67229] px-8 py-3 text-center font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-95">
								{c.label}
							</Link>
						</RevealItem>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}
