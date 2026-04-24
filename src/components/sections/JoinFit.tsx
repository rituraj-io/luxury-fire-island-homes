// JoinFit — cream band on /join, right before the inquiry form. The PDF's
// "Is This Your Kind of Team?" checklist rendered as a centered
// checkmarked list with a playful closing line that leads into the form.

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import RevealStagger from "@/components/motion/RevealStagger";


const FIT = [
	"Love Fire Island and want to be part of its community",
	"Value relationships over transactions",
	"Want mentorship, growth, and support",
	"Also believe work should be fun",
];


function CheckIcon() {
	return (
		<svg
			aria-hidden
			viewBox="0 0 24 24"
			className="h-5 w-5 shrink-0 text-brand-orange md:h-6 md:w-6"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20 6L9 17l-5-5" />
		</svg>
	);
}


export default function JoinFit() {
	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[720px] px-4 text-center md:px-8">
				<Reveal
					as="h2"
					className="font-script text-[36px] leading-[1.1] text-brand-blue md:text-[48px] lg:text-[56px]"
				>
					Is This Your Kind of Team?
				</Reveal>

				<Reveal
					as="p"
					delay={0.05}
					className="mx-auto mt-6 max-w-[520px] font-body text-[15px] leading-relaxed text-black md:text-[16px]"
				>
					You&apos;ll feel right at home here if you:
				</Reveal>

				<RevealStagger className="mx-auto mt-10 flex max-w-[560px] flex-col items-stretch gap-4 text-left">
					{FIT.map((item) => (
						<RevealItem key={item}>
							<div className="flex items-start gap-4 rounded-xl bg-[#fffbf8] px-5 py-4 shadow-sm md:px-6 md:py-5">
								<span className="mt-[3px]">
									<CheckIcon />
								</span>
								<p className="font-body text-[15px] leading-snug text-black md:text-[16px]">
									{item}
								</p>
							</div>
						</RevealItem>
					))}
				</RevealStagger>

				<Reveal
					as="p"
					delay={0.1}
					className="mx-auto mt-10 max-w-[520px] font-sans text-[18px] font-semibold italic leading-snug text-brand-blue md:text-[20px]"
				>
					If you&apos;re nodding your head… we should probably talk.
				</Reveal>
			</div>
		</section>
	);
}
