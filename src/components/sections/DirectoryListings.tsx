// DirectoryListings — cream band on /directory/[slug]. 2-column card grid
// of business listings (name + description + phone / website / address rows
// with small icons). Each card is an off-white tile with a yellow accent
// bar — on-brand without competing with the site's photo collages.

import RevealStagger from "@/components/motion/RevealStagger";
import RevealItem from "@/components/motion/RevealItem";
import { DISTANCE, DURATION, STAGGER } from "@/lib/motion";
import type { DirectoryListing } from "@/lib/directory";


type Props = {
	listings: DirectoryListing[];
};


function PhoneIcon() {
	return (
		<svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}


function GlobeIcon() {
	return (
		<svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="10" />
			<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	);
}


function PinIcon() {
	return (
		<svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	);
}


function hostnameOf(url: string): string {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}


function telHref(phone: string): string {
	return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}


function ListingCard({ listing }: { listing: DirectoryListing }) {
	return (
		<article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#fffbf8] shadow-md transition-shadow duration-300 hover:shadow-xl">
			<span aria-hidden className="h-2 w-full bg-brand-yellow" />

			<div className="flex flex-1 flex-col p-6 md:p-7">
				<h3 className="font-sans text-[16px] font-medium uppercase leading-snug tracking-wider text-brand-blue md:text-[18px]">
					{listing.name}
				</h3>

				{listing.description && (
					<p className="mt-3 font-body text-[14px] italic leading-relaxed text-black md:text-[15px]">
						{listing.description}
					</p>
				)}

				<dl className="mt-5 space-y-3 font-sans text-[14px] leading-snug text-brand-blue md:text-[15px]">
					{listing.phone && (
						<div className="flex items-start gap-3">
							<dt className="mt-[3px]">
								<PhoneIcon />
								<span className="sr-only">Phone</span>
							</dt>
							<dd>
								<a href={telHref(listing.phone)} className="hover:underline">
									{listing.phone}
								</a>
							</dd>
						</div>
					)}

					{listing.website && (
						<div className="flex items-start gap-3">
							<dt className="mt-[3px]">
								<GlobeIcon />
								<span className="sr-only">Website</span>
							</dt>
							<dd className="min-w-0 flex-1 break-words">
								<a
									href={listing.website}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{hostnameOf(listing.website)}
								</a>
							</dd>
						</div>
					)}

					{listing.address && (
						<div className="flex items-start gap-3">
							<dt className="mt-[3px]">
								<PinIcon />
								<span className="sr-only">Address</span>
							</dt>
							<dd className="text-black/80">{listing.address}</dd>
						</div>
					)}
				</dl>

				{listing.website && (
					<a
						href={listing.website}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-block self-start bg-brand-orange px-5 py-2.5 font-sans text-[13px] font-medium uppercase tracking-wider text-white transition hover:brightness-95 md:text-[14px]"
					>
						Visit website
					</a>
				)}
			</div>
		</article>
	);
}


export default function DirectoryListings({ listings }: Props) {
	if (listings.length === 0) {
		return (
			<section className="w-full bg-[#f8f4ec] py-20">
				<p className="mx-auto max-w-[520px] px-4 text-center font-body text-[15px] italic leading-relaxed text-black md:text-[16px]">
					No listings in this category yet — check back soon.
				</p>
			</section>
		);
	}

	return (
		<section className="w-full bg-[#f8f4ec] py-16 md:py-20">
			<div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
				<RevealStagger
					gap={STAGGER.card}
					className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
				>
					{listings.map((l, i) => (
						<RevealItem
							key={`${l.name}-${i}`}
							y={DISTANCE.card}
							duration={DURATION.card}
						>
							<ListingCard listing={l} />
						</RevealItem>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}
