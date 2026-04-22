// RentalExpectations — yellow band with a two-column checklist of
// promises and a dark-blue "Get Started" CTA.

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";


const ITEMS = [
	"Curated Homes That Aren't on Airbnb or Vrbo",
	"Tailored to Your Family's Needs",
	"Clear, Responsive Communication",
	"We get the details right",
	"Spotless, Well-Maintained Rentals",
	"No mystery smells. No broken appliances.",
	"Local Experts Who Know Everyone and Everything",
	"Conceirge Level Service (the Fire Island SCHELP)",
];


export default function RentalExpectations() {
	return (
		<section className="w-full bg-brand-yellow py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
				<Reveal as="h2" className="text-center font-script text-[38px] leading-[1.15] text-brand-blue md:text-[48px]">
					Here&apos;s What You Can Expect
				</Reveal>

				<Reveal as="p" delay={0.05} className="mt-3 text-center font-sans text-xl font-medium uppercase tracking-wider text-brand-blue md:text-2xl">
					When you rent with us:
				</Reveal>

				<RevealStagger delay={0.1} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
					{ITEMS.map((item) => (
						<RevealItem key={item} className="flex items-center gap-3 bg-white px-5 py-4 shadow-sm">
							<svg
								viewBox="0 0 24 24"
								aria-hidden
								className="h-6 w-6 shrink-0 text-brand-blue"
							>
								<path
									d="M4 12.5 10 18 20 7"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span className="font-sans text-[15px] text-black md:text-[16px]">{item}</span>
						</RevealItem>
					))}
				</RevealStagger>

				<Reveal y={0} delay={0.2} className="mt-10 flex w-full justify-center">
					<Link
						href="#inquire"
						className="bg-[#185b89] px-8 py-3 font-sans text-[16px] font-medium uppercase tracking-wider text-white transition hover:brightness-110"
					>
						Get Started &mdash; Inquire Here
					</Link>
				</Reveal>
			</div>
		</section>
	);
}
