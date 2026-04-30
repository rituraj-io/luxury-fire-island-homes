// About — two-column section. Left is a photo collage with two tilted
// blue-bordered cards and a circular logo seal overlay. Right column TBD.

import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import RevealStagger from '@/components/motion/RevealStagger';
import RevealItem from '@/components/motion/RevealItem';
import Bob from '@/components/motion/Bob';
import { DISTANCE, DURATION, STAGGER } from '@/lib/motion';
import { paragraphs, type AboutSection } from '@/lib/cms';


// Static destinations for the four CMS-driven CTA strings (in API order).
// "BUY" has no listing page yet — placeholder anchor until one is built.
const ANSWER_HREFS = ['/current-rentals', '#buy', '/sell', '/manage'];


type Props = { data: AboutSection };


export default function About({ data }: Props) {
	const { title1, title2, answers, question, description1, description2 } = data;

	return (
		<section id="about" className="w-full bg-[#f8f4ec] py-16 md:py-24">
			<div className="mx-auto grid max-w-[768px] gap-12 px-4 md:px-8 min-[992px]:max-w-site min-[992px]:grid-cols-2 min-[992px]:gap-10">
				{/* Left column — collage, reveals as a whole unit */}
				<Reveal y={DISTANCE.card} duration={DURATION.card} className="relative mx-auto w-full max-w-[500px]">
					<div className="relative aspect-[5/6]">
						<Bob className="absolute left-[6%] top-[18%] w-[48%]" delay={0.1} amplitude={3} duration={2.8}>
							<div className="-rotate-[3deg]">
								<Image
									src="/assets/images/blue-card-1.webp"
									alt="Fire Island homes"
									width={715}
									height={1385}
									className="h-auto w-full drop-shadow-xl"
								/>
							</div>
						</Bob>
						<Bob className="absolute right-[4%] top-0 w-[48%]" delay={0.7} amplitude={4} duration={3.2}>
							<div className="rotate-[4deg]">
								<Image
									src="/assets/images/blue-card-2.webp"
									alt="Fire Island lifestyle"
									width={716}
									height={1391}
									className="h-auto w-full drop-shadow-xl"
								/>
							</div>
						</Bob>
						<div className="absolute bottom-[1%] right-[11%] flex h-36 w-36 items-center justify-center rounded-full bg-brand-yellow p-1 shadow-lg md:h-40 md:w-40 md:p-1.5">
							<Image
								src="/assets/images/logo-seal-blue.svg"
								alt="Luxury Fire Island Homes"
								width={120}
								height={120}
								className="h-full w-full -rotate-[10deg]"
							/>
						</div>
					</div>
				</Reveal>

				{/* Right column — headline + body copy, staggered */}
				<RevealStagger className="text-black">
					<RevealItem as="h2" className="font-sans text-2xl font-medium uppercase tracking-wider text-brand-blue md:text-3xl">
						{title1.preStyle}{' '}
						<span className="mx-2 inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
							{title1.styled}
						</span>
						{title1.postStyle ? <> {title1.postStyle}</> : null}
					</RevealItem>

					<RevealItem className="mt-6 space-y-5 font-body text-[16px] leading-relaxed">
						{paragraphs(description1).map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</RevealItem>

					<RevealItem as="h2" className="mt-10 font-sans text-2xl font-medium uppercase tracking-wider text-brand-blue md:text-3xl">
						{title2.preStyle}{' '}
						<span className="mx-2 inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">
							{title2.styled}
						</span>
						{title2.postStyle ? <> {title2.postStyle}</> : null}
					</RevealItem>

					<RevealItem className="mt-6 space-y-5 font-body text-[16px] leading-relaxed">
						{paragraphs(description2).map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</RevealItem>
				</RevealStagger>
			</div>

			{/* Second row — heading + CTA buttons (one per CMS answer). */}
			<div className="mx-auto mt-16 w-full max-w-[768px] px-4 md:mt-20 md:px-8 min-[992px]:max-w-[900px]">
				<Reveal as="h3" className="text-center font-sans text-xl font-medium uppercase tracking-wider text-brand-blue md:text-2xl">
					{question}
				</Reveal>

				<RevealStagger gap={STAGGER.card} className="mx-auto mt-8 grid max-w-[750px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{answers.map((answer, i) => (
						<RevealItem key={i} y={DISTANCE.card} duration={DURATION.card}>
							<Link
								href={ANSWER_HREFS[i] ?? '#'}
								className="flex min-h-[110px] items-center justify-center bg-[#d67229] px-5 py-5 text-center font-sans text-[16px] font-medium leading-snug text-white transition hover:brightness-95">
								<span>{answer}</span>
							</Link>
						</RevealItem>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}
