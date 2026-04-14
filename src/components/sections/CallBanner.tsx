// CallBanner — full-width docks photo with script "Call or text us"
// and a phone number overlaid in brand yellow.

import Image from "next/image";


export default function CallBanner() {
	return (
		<section className="relative w-full">
			<div className="relative aspect-[797/190] w-full">
				<Image
					src="/assets/images/docks-banner-image.jpg"
					alt="Aerial view of Fire Island docks and marina"
					fill
					className="object-cover object-[center_70%]"
					sizes="100vw"
					priority={false}
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-end pb-[3%] text-center text-[#efe29d] [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
					<span className="-rotate-3 font-script text-[32px] leading-none sm:text-[44px] md:text-[56px] lg:text-[64px]">
						Call or text us
					</span>
					<a
						href="tel:6315708942"
						className="-mt-2 font-sans text-[28px] font-normal tracking-[0.08em] sm:-mt-3 sm:text-[40px] md:-mt-4 md:text-[52px] lg:text-[60px]"
					>
						631-570-8942
					</a>
				</div>
			</div>
		</section>
	);
}
