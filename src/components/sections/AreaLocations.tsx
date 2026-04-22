// AreaLocations — horizontal marquee of Fire Island neighborhood photos,
// each card overlaid with the neighborhood name. Sits directly under the
// Area map. Marquee loop math is handled by the shared Marquee component.

import Image from "next/image";
import Marquee from "@/components/ui/Marquee";


const LOCATIONS = [
	"Seaview",
	"Fair Harbor",
	"Lonelyville",
	"Atlantique",
	"Dunewood",
	"Ocean Beach",
	"Ocean Bay Park",
	"Kismet",
	"Saltaire",
	"Cherry Grove",
	"The Pines",
	"Davis Park",
	"Water Island",
];


export default function AreaLocations() {
	return (
		<section
			aria-label="Fire Island neighborhoods"
			className="relative w-full overflow-hidden bg-[#f8f4ec] py-5 md:py-6"
		>
			<Marquee
				items={LOCATIONS}
				durationSeconds={70}
				itemClassName="relative mr-3 h-[200px] w-[200px] shrink-0 overflow-hidden bg-neutral-200 md:mr-4 md:h-[260px] md:w-[260px]"
				renderItem={(name) => (
					<>
						<Image
							src="/assets/images/placeholder.svg"
							alt={name}
							fill
							sizes="(min-width: 768px) 260px, 200px"
							className="object-cover"
						/>
						<span className="absolute inset-0 flex items-center justify-center text-center font-sans text-[18px] font-bold uppercase tracking-wider text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] md:text-[22px]">
							{name}
						</span>
					</>
				)}
			/>
		</section>
	);
}
