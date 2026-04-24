// RentalInquiry — cream band closing the rental page. Script heading, a
// bold sub-line, and a four-field inquiry form with an orange Submit.
// Form has no handler yet — wiring a backend comes later.

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";


const INPUT = "w-full bg-white/80 px-4 py-3 font-sans text-[16px] text-brand-blue placeholder-black/40 outline-none focus:ring-2 focus:ring-brand-blue/30";


type Props = {
	heading?: ReactNode;
	subline?: ReactNode;
	postSubmit?: ReactNode;
};


export default function RentalInquiry({
	heading = "Tell us about your dream Vacation Home",
	subline = (
		<>
			Let&apos;s make it happen!
			<br />
			(before someone else grabs it)
		</>
	),
	postSubmit,
}: Props = {}) {
	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto flex w-full max-w-[720px] flex-col items-center px-4 text-center md:px-8">
				<Reveal as="h2" className="font-script text-[36px] leading-[1.15] text-brand-blue md:text-[44px]">
					{heading}
				</Reveal>

				<Reveal as="p" delay={0.05} className="mx-auto mt-4 max-w-[360px] font-sans text-[18px] font-semibold leading-snug text-brand-blue md:text-xl">
					{subline}
				</Reveal>

				<Reveal delay={0.1} className="mt-8 w-full">
					<form className="flex w-full flex-col gap-3">
						<input type="text" name="name" placeholder="name" className={INPUT} />

						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<input type="tel" name="phone" placeholder="phone" className={INPUT} />
							<input type="email" name="email" placeholder="email" className={INPUT} />
						</div>

						<textarea name="message" placeholder="message" rows={6} className={`${INPUT} resize-y`} />

						<button
							type="submit"
							className="mt-4 cursor-pointer self-center bg-brand-orange px-10 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-95"
						>
							Submit
						</button>

						{postSubmit && (
							<p className="mx-auto mt-6 max-w-[360px] text-center font-sans text-[18px] font-semibold leading-snug text-brand-blue md:text-xl">
								{postSubmit}
							</p>
						)}
					</form>
				</Reveal>
			</div>
		</section>
	);
}
