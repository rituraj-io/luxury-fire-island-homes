// Footer — yellow band with five columns: two link groups, a centered
// oval badge, social links, and a subscribe form. Top edge uses the
// same blue pattern strip as the Nav.

import Image from "next/image";
import Link from "next/link";


const I_WANT_TO = [
	{ label: "BUY A HOME", href: "#buy" },
	{ label: "SELL YOUR HOME", href: "#sell" },
	{ label: "RENT A HOME", href: "#rent" },
	{ label: "MANAGEMENT SERVICES", href: "#manage" },
	{ label: "INQUIRE", href: "#inquire" },
];


const MORE_INFO = [
	{ label: "COMMUNITY", href: "#community" },
	{ label: "ABOUT", href: "#about" },
	{ label: "EVENTS", href: "#events" },
	{ label: "JOBS", href: "#jobs" },
];


const SOCIALS = [
	{ label: "INSTAGRAM", href: "#instagram" },
	{ label: "FACEBOOK", href: "#facebook" },
	{ label: "TIKTOK", href: "#tiktok" },
	{ label: "LINKEDIN", href: "#linkedin" },
	{ label: "YOUTUBE", href: "#youtube" },
];


const SCRIPT_HEADING =
	"font-script text-[22px] font-normal leading-none tracking-normal";
const LINK_ITEM =
	"font-sans text-[16px] font-medium tracking-[0.08em] text-[#185b89] transition hover:brightness-110";
const ADDRESS_LINE = "font-sans text-[14px] text-[#185b89]";


export default function Footer() {
	return (
		<footer className="w-full bg-[#efe29d]">
			<div
				aria-hidden
				className="h-4 w-full"
				style={{
					backgroundImage: "url('/assets/images/pattern-blue.svg')",
					backgroundRepeat: "repeat-x",
					backgroundPosition: "center",
					backgroundSize: "auto 125%",
				}}
			/>

			<div className="mx-auto w-full max-w-site px-6 py-14 md:px-10 md:py-16">
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_1fr_1fr] lg:gap-6">
					{/* I want to... */}
					<div className="flex flex-col">
						<h3 className={SCRIPT_HEADING}>I want to...</h3>
						<ul className="mt-5 flex flex-col gap-[2px]">
							{I_WANT_TO.map((l) => (
								<li key={l.href}>
									<Link href={l.href} className={LINK_ITEM}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
						<div className="mt-6 space-y-1">
							<p className={ADDRESS_LINE}>Office 1 Address</p>
							<p className={ADDRESS_LINE}>1234 Street Avenue</p>
							<p className={ADDRESS_LINE}>City, State, Zip</p>
						</div>
					</div>

					{/* I need more info... */}
					<div className="flex flex-col">
						<h3 className={SCRIPT_HEADING}>I need more info...</h3>
						<ul className="mt-5 flex flex-col gap-[2px]">
							{MORE_INFO.map((l) => (
								<li key={l.href}>
									<Link href={l.href} className={LINK_ITEM}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
						<div className="mt-6 space-y-1">
							<p className={ADDRESS_LINE}>Office 2 Address</p>
							<p className={ADDRESS_LINE}>1234 Street Avenue</p>
							<p className={ADDRESS_LINE}>City, State, Zip</p>
						</div>
					</div>

					{/* Center oval badge */}
					<div className="flex items-start justify-center sm:col-span-2 lg:col-span-1 lg:self-start">
						<Image
							src="/assets/images/logo-expanded-oval-badge.svg"
							alt="Luxury Fire Island Homes — Est. 2001, New York"
							width={260}
							height={200}
							className="h-auto w-[170px] md:w-[190px]"
						/>
					</div>

					{/* Stay Connected */}
					<div className="flex flex-col lg:items-end lg:text-right">
						<h3 className={SCRIPT_HEADING}>Stay Connected</h3>
						<ul className="mt-5 flex flex-col gap-[2px] lg:items-end">
							{SOCIALS.map((l) => (
								<li key={l.href}>
									<Link href={l.href} className={LINK_ITEM}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Don't miss out! */}
					<div className="flex flex-col lg:ml-4 xl:ml-8">
						<h3 className={SCRIPT_HEADING}>Don&apos;t miss out!</h3>
						<p className="mt-4 font-sans text-[16px] font-medium tracking-[0.08em] text-[#185b89]">
							SUBSCRIBE:
						</p>
						<form className="mt-3 flex w-full flex-col gap-3">
							<input
								type="text"
								name="name"
								placeholder="name"
								className="w-full bg-white px-4 py-3 font-sans text-[16px] text-[#185b89] placeholder-[#185b89]/60 outline-none focus:ring-2 focus:ring-[#185b89]/30"
							/>
							<input
								type="email"
								name="email"
								placeholder="email"
								className="w-full bg-white px-4 py-3 font-sans text-[16px] text-[#185b89] placeholder-[#185b89]/60 outline-none focus:ring-2 focus:ring-[#185b89]/30"
							/>
							<button
								type="submit"
								className="cursor-pointer self-start bg-[#d67229] px-6 py-3 font-sans text-[16px] font-medium tracking-[0.04em] text-white transition hover:brightness-95"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</footer>
	);
}
