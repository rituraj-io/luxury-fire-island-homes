// Hero — full-bleed beach image with overlaid headline on the left
// and a "How can we help you?" action card on the right.

import Image from 'next/image';
import Link from 'next/link';

const HELP_LINKS = [
	{ label: "I'm Buying", href: '#buy' },
	{ label: "I'm Selling", href: '#sell' },
	{ label: "I'm Renting", href: '#rent' },
];

export default function Hero() {
	return (
		// pt equals nav height (h-32 = 128px) + pattern strip (h-4 = 16px) so the image butts up under the nav with no gap.
		<section className="relative pt-[144px]">
			{/* Background image */}
			<div className="relative min-h-[520px] w-full md:min-h-[640px]">
				<Image
					src="/hero-beach.jpg"
					alt="Aerial view of Fire Island beach"
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>

				{/* Content grid */}
				<div className="relative">
					{/* Hero content container. On desktop the headline sits at its natural width
              and the card butts right up against it with a small gap. */}
					<div className="mx-auto flex w-full max-w-[576px] flex-col items-stretch justify-center gap-6 px-4 pb-12 pt-20 min-h-[520px] min-[992px]:min-h-[640px] min-[992px]:max-w-[1000px] min-[992px]:flex-row min-[992px]:items-center min-[992px]:justify-between min-[992px]:gap-6 min-[992px]:px-8">
						{/* Headline */}
						<div className="shrink-0 text-white drop-shadow-lg">
							<p className="ml-4 font-script text-5xl md:text-6xl">Welcome to</p>
							<h1
								className="mt-2 font-display text-5xl leading-[1.05] tracking-[0.06em] sm:text-6xl md:text-7xl min-[992px]:whitespace-nowrap"
								style={{
									WebkitTextStroke: '2px #ffffff',
									color: 'transparent',
								}}>
								THE SANDIER SIDE
								<br />
								OF NEW YORK
							</h1>
						</div>

						{/* Help card — fixed width on desktop, full width on mobile. */}
						<div className="w-full shrink-0 min-[992px]:w-[360px]">
							<div className="rounded-[0.5rem] bg-white/95 px-4 py-6 shadow-xl md:py-8">
								<p className="text-center text-lg font-normal text-brand-blue">How can we help you?</p>

								<ul className="mt-5 flex flex-col gap-3">
									{HELP_LINKS.map(l => (
										<li key={l.href}>
											<Link
												href={l.href}
												className="flex items-center justify-between border-2 border-[#25648D] px-5 py-3 font-medium text-brand-blue-dark transition hover:bg-brand-blue-dark/5">
												<span>{l.label}</span>
												{/* SVG used as a mask so its fill matches the link's border color. */}
												<span
													aria-hidden
													className="inline-block h-5 w-5 shrink-0 bg-[#25648D]"
													style={{
														WebkitMaskImage: "url('/assets/images/arrow-right.svg')",
														WebkitMaskRepeat: 'no-repeat',
														WebkitMaskPosition: 'center',
														WebkitMaskSize: 'contain',
														maskImage: "url('/assets/images/arrow-right.svg')",
														maskRepeat: 'no-repeat',
														maskPosition: 'center',
														maskSize: 'contain',
													}}
												/>
											</Link>
										</li>
									))}
								</ul>

								<Link
									href="tel:6315708942"
									className="mt-3 block border-2 border-[#25648D] bg-brand-orange-light px-5 py-3 text-left font-medium text-brand-blue-dark hover:brightness-95">
									Call Us 631-570-8942
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
