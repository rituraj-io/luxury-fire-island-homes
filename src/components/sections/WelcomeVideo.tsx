// WelcomeVideo — cream band with intro copy, a script welcome headline,
// a video thumbnail with a play affordance, and a row of orange CTAs.

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";


const CTAS = [
	{ label: "MEET OUR TEAM", href: "#team" },
	{ label: "READ OUR REVIEWS", href: "#reviews" },
	{ label: "FOLLOW ON INSTAGRAM", href: "#instagram" },
];


export default function WelcomeVideo() {
	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto flex w-full max-w-[960px] flex-col items-center px-4 text-center md:px-8">
				<Reveal as="p" className="max-w-[500px] font-body text-[15px] leading-relaxed text-black">
					Stop overpaying on Airbnb.
					<br />
					Stop scrolling through sketchy listings.
				</Reveal>

				<Reveal
					as="p"
					delay={0.05}
					className="mt-5 max-w-[500px] font-body text-[15px] leading-relaxed text-black"
				>
					And stop wasting time on agents who ghost you, owners who cancel last
					minute, or homes that look nothing like the photos.
				</Reveal>

				<Reveal
					as="h2"
					delay={0.1}
					className="mt-10 font-script text-[36px] leading-[1.15] text-brand-blue md:text-[44px]"
				>
					Welcome to finding your
					<br />
					Vacation Home, the Right Way.
				</Reveal>

				<Reveal delay={0.15} className="mt-8 w-full">
					<button
						type="button"
						aria-label="Play welcome video"
						className="group relative block aspect-video w-full cursor-pointer overflow-hidden bg-neutral-200"
					>
						<Image
							src="/assets/images/hero-image.webp"
							alt="Aerial view of Fire Island beach"
							fill
							className="object-cover"
							sizes="(min-width: 1024px) 880px, (min-width: 768px) 80vw, 90vw"
						/>
						<span
							aria-hidden
							className="absolute inset-0 flex items-center justify-center"
						>
							<span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-white/10 transition duration-300 ease-out group-hover:scale-110 group-hover:bg-white/25 md:h-24 md:w-24">
								<svg
									viewBox="0 0 24 24"
									className="ml-1 h-8 w-8 fill-white md:h-10 md:w-10"
									aria-hidden
								>
									<path d="M8 5v14l11-7L8 5z" />
								</svg>
							</span>
						</span>
					</button>
				</Reveal>

				<Reveal
					as="p"
					delay={0.1}
					className="mt-10 font-script text-[36px] leading-none text-brand-blue md:text-[44px]"
				>
					Want to see more?
				</Reveal>

				<Reveal delay={0.15} className="mt-5 flex w-full flex-wrap justify-center gap-3">
					{CTAS.map((c) => (
						<Link
							key={c.href}
							href={c.href}
							className="bg-brand-orange px-5 py-3 font-sans text-[14px] font-medium tracking-wider text-white transition hover:brightness-95 md:text-[15px]"
						>
							{c.label}
						</Link>
					))}
				</Reveal>
			</div>
		</section>
	);
}
