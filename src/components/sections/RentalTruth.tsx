// RentalTruth — muted blue-gray band with a short script lead-in and two
// centered paragraphs that close the rental page's sales pitch.

import Reveal from "@/components/motion/Reveal";


export default function RentalTruth() {
	return (
		<section className="w-full bg-[#dce5ef] py-16 md:py-20">
			<div className="mx-auto flex w-full max-w-[720px] flex-col items-center px-4 text-center md:px-8">
				<Reveal as="h2" className="font-script text-[38px] leading-none text-brand-blue md:text-[44px]">
					The Truth?
				</Reveal>

				<Reveal as="p" delay={0.05} className="mt-8 font-body text-[15px] leading-relaxed text-black md:text-[16px]">
					Our Clients Come for the Homes&hellip; But Stay for the Service.
					<br />
					You don&apos;t just want &ldquo;a rental&rdquo;&mdash;you want someone who
					listens, follows through, and treats your vacation like it actually
					matters. That&apos;s us.
				</Reveal>

				<Reveal as="p" delay={0.1} className="mt-6 font-body text-[15px] font-semibold italic leading-relaxed text-black md:text-[16px]">
					We&apos;ve helped hundreds of NYC and Long Island families find their
					dream Fire Island vacation home&mdash;and we&apos;d love to help you too.
				</Reveal>
			</div>
		</section>
	);
}
