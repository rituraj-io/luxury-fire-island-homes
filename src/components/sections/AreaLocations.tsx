// AreaLocations — horizontal marquee of Fire Island neighborhood photos.
// Each tile shows the neighborhood name centered on the image; on hover the
// name fades and two CTAs ("Homes For Sale" / "Homes For Rent") appear,
// linking to filtered Buy and Current Rentals pages by area slug.

import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/ui/Marquee";


type Location = {
	slug: string;
	name: string;
	image: string;
};


const LOCATIONS: Location[] = [
	{ slug: "atlantique", name: "Atlantique", image: "/assets/images/areas/atlantique.webp" },
	{ slug: "cherry-grove", name: "Cherry Grove", image: "/assets/images/areas/cherry-grove.webp" },
	{ slug: "cornielle-estates", name: "Cornielle Estates", image: "/assets/images/areas/cornielle-estates.webp" },
	{ slug: "davis-park", name: "Davis Park", image: "/assets/images/areas/davis-park.webp" },
	{ slug: "dunewood", name: "Dunewood", image: "/assets/images/areas/dunewood.webp" },
	{ slug: "fair-harbor", name: "Fair Harbor", image: "/assets/images/areas/fair-harbor.webp" },
	{ slug: "fire-island-pines", name: "Fire Island Pines", image: "/assets/images/areas/fire-island-pines.webp" },
	{ slug: "kismet", name: "Kismet", image: "/assets/images/areas/kismet.webp" },
	{ slug: "lonelyville", name: "Lonelyville", image: "/assets/images/areas/lonelyville.webp" },
	{ slug: "ocean-bay-park", name: "Ocean Bay Park", image: "/assets/images/areas/ocean-bay-park.webp" },
	{ slug: "ocean-beach", name: "Ocean Beach", image: "/assets/images/areas/ocean-beach.webp" },
	{ slug: "point-o-woods", name: "Point O' Woods", image: "/assets/images/areas/point-o-woods.webp" },
	{ slug: "robbins-rest", name: "Robbins Rest", image: "/assets/images/areas/robbins-rest.webp" },
	{ slug: "saltaire", name: "Saltaire", image: "/assets/images/areas/saltaire.webp" },
	{ slug: "seaview", name: "Seaview", image: "/assets/images/areas/seaview.webp" },
	{ slug: "summer-club", name: "Summer Club", image: "/assets/images/areas/summer-club.webp" },
];


export default function AreaLocations() {
	return (
		<section
			aria-label="Fire Island neighborhoods"
			className="marquee-pause-on-hover relative w-full overflow-hidden bg-[#f8f4ec] py-5 md:py-6"
		>
			<Marquee
				items={LOCATIONS}
				durationSeconds={180}
				itemClassName="group relative mr-3 h-[200px] w-[200px] shrink-0 overflow-hidden bg-neutral-200 md:mr-4 md:h-[260px] md:w-[260px]"
				renderItem={(loc) => (
					<>
						<Image
							src={loc.image}
							alt={loc.name}
							fill
							sizes="(min-width: 768px) 260px, 200px"
							className="object-cover transition duration-500 group-hover:scale-105"
						/>

						{/* Default-state name overlay — fades out on hover. */}
						<span className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 text-center font-sans text-[18px] font-bold uppercase tracking-wider text-white transition duration-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] group-hover:opacity-0 md:text-[22px]">
							{loc.name}
						</span>

						{/* Hover-state CTAs — fade in. Block pointer events while hidden so
						    the underlying tile remains its own (decorative) area. */}
						<div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/55 px-4 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
							<span className="text-center font-sans text-[15px] font-bold uppercase tracking-wider text-white md:text-[18px]">
								{loc.name}
							</span>
							<Link
								href={`/buy?area=${loc.slug}`}
								className="w-[170px] bg-brand-yellow px-3 py-2 text-center font-sans text-[12px] font-medium uppercase tracking-wider text-brand-blue transition hover:brightness-95 md:text-[13px]"
							>
								Homes For Sale
							</Link>
							<Link
								href={`/current-rentals?area=${loc.slug}`}
								className="w-[170px] bg-brand-orange px-3 py-2 text-center font-sans text-[12px] font-medium uppercase tracking-wider text-white transition hover:brightness-95 md:text-[13px]"
							>
								Homes For Rent
							</Link>
						</div>
					</>
				)}
			/>
		</section>
	);
}
