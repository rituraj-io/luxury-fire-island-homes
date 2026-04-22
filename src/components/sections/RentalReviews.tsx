// RentalReviews — full-bleed orange-stripe band. Centered heading above a
// right-to-left marquee of Google-style review cards. Marquee loop math is
// handled by the shared Marquee component.

import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/ui/Marquee";


type Review = {
	name: string;
	meta: string;
	date: string;
	body: string;
	initialColor: string;
};


const REVIEWS: Review[] = [
	{
		name: "Devora Lans",
		meta: "Local Guide · 13 reviews",
		date: "a year ago",
		initialColor: "bg-neutral-400",
		body:
			"What an incredibly wonderful business model they have here. Not only do they have all the real estate listings and very knowledgeable agents they have truly embraced the rich and vibrant artist community we have here in Ocean beach. Every Thursday evening the office turn into a gallery that is amazing. With a rotating roster of artists every week it is really exciting. Tara had a vision for this and I feel honored to have set the pace with the my showing last night. Can't wait to see who is there next week.",
	},
	{
		name: "Anthony Reese",
		meta: "4 reviews · 1 photo",
		date: "a year ago",
		initialColor: "bg-sky-600",
		body:
			"I think the world of Sydney. She is the type of Realtor you want on your side. She brings a fresh, 21st-century style of knowledge, technology, marketing, and energy. I challenge anyone to match her aggressive style; that's why I nicknamed her \"Sharky.\" If I'm buying or selling a home, I am working with Sydney McCoy\n\nAnthony R",
	},
	{
		name: "Santiago Dipilla",
		meta: "1 review",
		date: "a year ago",
		initialColor: "bg-pink-600",
		body:
			"I recently hired Sydney Mccoy and Sebastian with Luxury Fire Island Homes to manage my property in Ocean Bay Park. I was extremely impressed with their track record of 5Star reviews and happy renters... Not to mention healthy financial statements. Sydney has extremely high attention to detail which Im sure contributes to her success. I've worked with a lot of real estate agents on the island, and Luxury Fire Island Homes surpasses all of them. I am so excited for an amazing season as I have the best team by my side.",
	},
	{
		name: "Laura Maria",
		meta: "5 reviews · 1 photo",
		date: "a year ago",
		initialColor: "bg-amber-500",
		body:
			"I've worked personally with Sydney and Sue and could not praise their dynamic, the relationships they build with their clients and their drive to help others enough. All the agents here are so kind and understanding, completely different from other agencies.",
	},
];


function Stars() {
	return (
		<span aria-label="5 out of 5 stars" className="flex items-center gap-0.5 text-[#f5b400]">
			{Array.from({ length: 5 }).map((_, i) => (
				<svg key={i} viewBox="0 0 20 20" aria-hidden className="h-4 w-4 fill-current">
					<path d="m10 1.5 2.63 5.33 5.88.85-4.26 4.15 1 5.87L10 14.95l-5.26 2.75 1-5.87L1.5 7.68l5.88-.85L10 1.5z" />
				</svg>
			))}
		</span>
	);
}


function ReviewCard({ review }: { review: Review }) {
	return (
		<article className="flex w-[380px] shrink-0 flex-col bg-white p-5 shadow-md">
			<header className="flex items-start justify-between gap-3">
				<div className="flex items-center gap-3">
					<span
						aria-hidden
						className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[15px] font-medium text-white ${review.initialColor}`}
					>
						{review.name[0]}
					</span>
					<div className="flex flex-col leading-tight">
						<span className="font-sans text-[14px] font-medium text-black">{review.name}</span>
						<span className="mt-0.5 font-sans text-[12px] text-black/60">{review.meta}</span>
					</div>
				</div>
				<span aria-hidden className="flex flex-col gap-0.5 pt-1 text-black/50">
					<span className="h-1 w-1 rounded-full bg-current" />
					<span className="h-1 w-1 rounded-full bg-current" />
					<span className="h-1 w-1 rounded-full bg-current" />
				</span>
			</header>

			<div className="mt-3 flex items-center gap-2">
				<Stars />
				<span className="font-sans text-[12px] text-black/60">{review.date}</span>
			</div>

			<p className="mt-3 whitespace-pre-line font-sans text-[13px] leading-snug text-black">
				{review.body}
			</p>
		</article>
	);
}


export default function RentalReviews() {
	return (
		<section
			className="relative w-full overflow-hidden py-16 md:py-20"
			style={{
				backgroundImage: "url('/assets/images/pattern-orange.svg')",
				backgroundRepeat: "repeat",
				backgroundSize: "auto 100%",
			}}
		>
			<Reveal
				as="h2"
				className="relative text-center font-sans text-xl font-medium uppercase tracking-wider text-white md:text-2xl"
			>
				Our Recent{" "}
				<span className="ml-1 inline-block font-script text-[44px] font-normal normal-case leading-none tracking-normal md:text-[52px]">
					Reviews
				</span>
			</Reveal>

			<Marquee
				items={REVIEWS}
				durationSeconds={80}
				itemClassName="mr-5"
				className="mt-10"
				renderItem={(r) => <ReviewCard review={r} />}
			/>
		</section>
	);
}
