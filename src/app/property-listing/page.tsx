// /property-listing is retired in favor of two locked routes:
//   • /current-rentals      — Rent-only
//   • /properties-on-sale   — Sale-only
//
// Kept as a permanent redirect so old links / bookmarks (including the
// legacy `?for=sale|rent` and `?area=` params) keep working: sale intent
// lands on the for-sale page, everything else on rentals, with the
// neighborhood filter carried across.

import { redirect } from "next/navigation";


function isSale(value: string | string[] | undefined): boolean {
	const v = (Array.isArray(value) ? value[0] : value)?.toLowerCase();
	return v === "sale" || v === "buy" || v === "sell" || v === "for-sale";
}


export default async function PropertyListingRedirect({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const sp = await searchParams;
	const area = Array.isArray(sp.area) ? sp.area[0] : sp.area;
	const base = isSale(sp.for) ? "/properties-on-sale" : "/current-rentals";
	redirect(area ? `${base}?area=${encodeURIComponent(area)}` : base);
}
