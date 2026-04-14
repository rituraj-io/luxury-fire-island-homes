// About — two-column section. Left is a photo collage with two tilted
// blue-bordered cards and a circular logo seal overlay. Right column TBD.

import Image from 'next/image';
import Link from 'next/link';


const CTA_BUTTONS = [
	{ href: '#rent-vacation', pre: "I'm looking for a", emphasis: 'VACATION HOME', post: 'to Rent' },
	{ href: '#buy', pre: "I'm looking to", emphasis: 'BUY', post: 'a home' },
	{ href: '#sell', pre: "I'm looking to", emphasis: 'SELL', post: 'my home' },
	{ href: '#rent-out', pre: "I'm looking for help", emphasis: 'RENTING', post: 'my house out' },
];


export default function About() {
	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-24">
			<div className="mx-auto grid max-w-[768px] gap-12 px-4 md:px-8 min-[992px]:max-w-site min-[992px]:grid-cols-2 min-[992px]:gap-10">
				{/* Left column — collage */}
				<div className="relative mx-auto w-full max-w-[500px]">
					<div className="relative aspect-[5/6]">
						{/* Left card — slight counter-clockwise tilt, sits lower. */}
						<div className="absolute left-[6%] top-[18%] w-[48%] -rotate-[3deg]">
							<Image
								src="/assets/images/blue-card-1.png"
								alt="Fire Island homes"
								width={715}
								height={1385}
								className="h-auto w-full drop-shadow-xl"
							/>
						</div>

						{/* Right card — slight clockwise tilt, sits higher and a touch larger. */}
						<div className="absolute right-[4%] top-0 w-[48%] rotate-[4deg]">
							<Image
								src="/assets/images/blue-card-2.png"
								alt="Fire Island lifestyle"
								width={716}
								height={1391}
								className="h-auto w-full drop-shadow-xl"
							/>
						</div>

						{/* Logo seal — yellow circle padded around the blue seal, overlays the bottom. */}
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
				</div>

				{/* Right column — headline + body copy. */}
				<div className="text-black">
					<h2 className="font-sans text-2xl font-medium uppercase tracking-wider text-brand-blue md:text-3xl">
						You love <span className="mx-2 inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">Fire Island</span>
					</h2>

					<div className="mt-6 space-y-5 font-body text-[16px] leading-relaxed">
						<p>
							for its charm, its community, its one-of-a-kind lifestyle—and yeah, maybe even for the Rocket Fuels.
						</p>
						<p>
							I mean... who wouldn&apos;t want to ditch the chaos (and sweat) of NYC or Long Island for a car-free island with insane beaches, no traffic, and the cutest dogs?
						</p>
					</div>

					<h2 className="mt-10 font-sans text-2xl font-medium uppercase tracking-wider text-brand-blue md:text-3xl">
						Let us <span className="mx-2 inline-block font-script text-[52px] font-normal normal-case leading-none tracking-normal">Help You</span> make it home
					</h2>

					<div className="mt-6 space-y-5 font-body text-[16px] leading-relaxed">
						<p>
							Whether you&apos;re buying, selling, or renting, you need a team that knows the island (and everyone on it) inside and out—one that makes the process easy, stress-free, and actually fun. That&apos;s exactly what we do.
						</p>
						<p>
							Let&apos;s make some moves (literally). We&apos;ll handle the real estate — you just worry about what time to catch the ferry.
						</p>
						<p>
							Unless you&apos;re here just to be best friends or track down the local plumber (which, honestly, we wouldn&apos;t blame you)...
						</p>
					</div>
				</div>
			</div>

			{/* Second row — heading + 4 CTA buttons. */}
			<div className="mx-auto mt-16 w-full max-w-[768px] px-4 md:mt-20 md:px-8 min-[992px]:max-w-[900px]">
				<h3 className="text-center font-sans text-xl font-medium uppercase tracking-wider text-brand-blue md:text-2xl">
					How can we help you make your Fire Island dreams a reality?
				</h3>

				<div className="mx-auto mt-8 grid max-w-[750px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{CTA_BUTTONS.map(b => (
						<Link
							key={b.href}
							href={b.href}
							className="flex min-h-[110px] items-center justify-center bg-[#d67229] px-5 py-5 text-center font-sans text-[16px] font-medium leading-snug text-white transition hover:brightness-95">
							<span>
								{b.pre} <span className="uppercase">{b.emphasis}</span> {b.post}
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
