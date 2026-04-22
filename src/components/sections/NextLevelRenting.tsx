// NextLevelRenting — long inquiry form for /current-rentals. Soft blue
// band with a script heading, bold subline, multi-field form, consent
// checkbox, orange Submit, and a post-submit reminder. Fields are
// placeholder-only; a real handler lands when the backend is wired up.

import Reveal from "@/components/motion/Reveal";


const INPUT =
	"w-full bg-[#f8f4ec] px-4 py-3 font-sans text-[16px] text-brand-blue placeholder-black/40 outline-none focus:ring-2 focus:ring-brand-blue/30";


export default function NextLevelRenting() {
	return (
		<section className="w-full bg-[#dce5ef] py-16 md:py-20">
			<div className="mx-auto flex w-full max-w-[720px] flex-col items-center px-4 text-center md:px-8">
				<Reveal
					as="h2"
					className="font-script text-[32px] leading-[1.15] text-brand-blue sm:text-[38px] md:text-[44px]"
				>
					Next Level Home Renting Experience
				</Reveal>

				<Reveal
					as="p"
					delay={0.05}
					className="mt-3 font-sans text-[18px] font-semibold text-brand-blue md:text-xl"
				>
					Start your search now!
				</Reveal>

				<Reveal delay={0.1} className="mt-8 w-full">
					<form className="flex w-full flex-col gap-3">
						<input type="text" name="name" placeholder="name" className={INPUT} />

						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<input type="tel" name="phone" placeholder="phone" className={INPUT} />
							<input type="email" name="email" placeholder="email" className={INPUT} />
						</div>

						<input type="text" name="dates" placeholder="what dates are you looking to rent?" className={INPUT} />
						<input type="text" name="party" placeholder="how many people are in your party?" className={INPUT} />
						<input type="text" name="minors" placeholder="how many of those people are under the age 18?" className={INPUT} />
						<input type="text" name="pets" placeholder="do you have any pets?" className={INPUT} />
						<input type="text" name="neighborhood" placeholder="do you have a neighborhood preference?" className={INPUT} />
						<input type="text" name="mustHaves" placeholder="what are your must haves?" className={INPUT} />
						<input type="text" name="agent" placeholder="are you currently working with an agent? if so, who is it?" className={INPUT} />
						<input type="text" name="referral" placeholder="how did you hear about us?" className={INPUT} />

						<label className="mt-2 flex items-center gap-3 self-center text-left font-sans text-[14px] text-black/50 md:text-[15px]">
							<input
								type="checkbox"
								name="consent"
								className="h-4 w-4 shrink-0 cursor-pointer accent-brand-blue"
							/>
							Disclaimer Text, Privacy Policy, Terms and Conditions
						</label>

						<button
							type="submit"
							className="mt-4 cursor-pointer self-center bg-brand-orange px-10 py-3 font-sans text-[16px] font-medium tracking-wider text-white transition hover:brightness-95"
						>
							Submit
						</button>

						<p className="mx-auto mt-8 max-w-[360px] text-center font-sans text-[18px] font-semibold leading-snug text-brand-blue md:text-xl">
							P.S. The sooner you start, the sooner we get to work. Summer isn&apos;t waiting!
						</p>
					</form>
				</Reveal>
			</div>
		</section>
	);
}
