// In the Press — landing section for /press. Cream band with a script
// heading, category list, short pitch, media-inquiry CTA, and a 3-up grid
// of article cards. Each card is a black-outlined preview image with a
// dateline and a blue title link. Preview images are placeholders until
// the real article screenshots are supplied.

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";


type Article = {
	slug: string;
	publication: string;
	title: string;
	date: string;
};


const ARTICLES: Article[] = [
	{
		slug: "hyper-local-market-trend-2026",
		publication: "Fire Island News",
		title: "What Hyper-local Market Trend do you think will matter most in our real estate this year?",
		date: "January 29, 2026",
	},
	{
		slug: "oceanfront-fire-island-pines-luxury-auction",
		publication: "PR Newswire",
		title: "Newly Renovated Oceanfront Home in NY's Fire Island Pines Headed for Luxury Auction",
		date: "May 02, 2025",
	},
	{
		slug: "property-showings-after-summer-crowds",
		publication: "Fire Island News",
		title: "How do property showings and open houses change once the Fire Island summer crowds thin out?",
		date: "September 2, 2025",
	},
	{
		slug: "behind-the-dunes-ocean-bay-park",
		publication: "Fire Island News",
		title: "BEHIND THE DUNES: Luxury Real Estate Office and Gallery Opens in Ocean Bay Park",
		date: "June 23, 2024",
	},
	{
		slug: "storied-legacy-of-the-gables-seaview",
		publication: "Fire Island News",
		title: "The Storied Legacy of \u201CThe Gables\u201D in Seaview: Cursed or Coincidence?",
		date: "September 20, 2025",
	},
];


export default function InThePress() {
	return (
		<section className="w-full bg-[#f8f4ec] pb-16 pt-[calc(144px+env(safe-area-inset-top)+2rem)] md:pb-20 md:pt-[calc(144px+env(safe-area-inset-top)+3rem)]">
			<div className="mx-auto max-w-site px-4 md:px-8">
				{/* Header block — script title, category list, pitch, media CTA. */}
				<Reveal y={DISTANCE.text} duration={DURATION.text} className="flex flex-col items-center text-center">
					<h1 className="font-script text-[40px] leading-none text-brand-blue md:text-[52px]">
						In the Press
					</h1>

					<p className="mt-6 font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-black md:text-sm">
						Articles <span aria-hidden className="mx-1">·</span> Local News <span aria-hidden className="mx-1">·</span> Interviews <span aria-hidden className="mx-1">·</span> Videos
					</p>

					<p className="mt-5 max-w-[560px] font-body text-[16px] leading-relaxed text-black">
						Market insights, luxury property debuts, and industry-leading expertise from your friends at Luxury Fire Island Homes.
					</p>

					<Link
						href="#media-inquiry"
						className="mt-7 inline-block bg-brand-orange px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-white transition hover:brightness-95"
					>
						Media Inquiry? Click Here
					</Link>
				</Reveal>

				{/* Article grid — 1 → 2 → 3 columns. Each card is a link. */}
				<RevealStagger
					gap={STAGGER.card}
					className="mx-auto mt-14 grid max-w-[420px] grid-cols-1 gap-x-6 gap-y-10 sm:max-w-[780px] sm:grid-cols-2 md:max-w-site md:mt-16 md:grid-cols-3"
				>
					{ARTICLES.map((a) => (
						<RevealItem key={a.slug} y={DISTANCE.card} duration={DURATION.card}>
							<article>
								<Link
									href={`/press/${a.slug}`}
									className="group block"
									aria-label={`Read article: ${a.publication}: ${a.title}`}
								>
									<div className="relative aspect-square overflow-hidden border border-black/80 bg-neutral-200 transition group-hover:border-brand-blue">
										<Image
											src="/assets/images/placeholder.svg"
											alt=""
											fill
											sizes="(min-width: 992px) 380px, (min-width: 640px) 45vw, 90vw"
											className="object-cover"
										/>
									</div>

									<p className="mt-4 font-sans text-[16px] font-normal tracking-wider text-black">
										ARTICLE {a.date}
									</p>

									<p className="mt-2 font-sans text-[16px] font-medium leading-snug text-brand-blue transition group-hover:text-brand-blue-dark group-hover:underline">
										{a.publication}: {a.title}
									</p>
								</Link>
							</article>
						</RevealItem>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}
