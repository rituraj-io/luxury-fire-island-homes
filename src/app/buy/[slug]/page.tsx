// Property detail page — dynamic per-property at /buy/[slug].
// Content is hard-coded section by section for now; will be replaced with
// backend-fetched data once the API is wired up.

import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import PropertyHero from "@/components/sections/PropertyHero";
import Properties from "@/components/sections/Properties";
import WhereWeComeIn from "@/components/sections/WhereWeComeIn";
import WhatYouGet from "@/components/sections/WhatYouGet";
import HomeBase from "@/components/sections/HomeBase";
import RentalReviews from "@/components/sections/RentalReviews";
import SideEffects from "@/components/sections/SideEffects";
import RentalInquiry from "@/components/sections/RentalInquiry";
import CallBanner from "@/components/sections/CallBanner";
import { getHomeCms } from "@/lib/cms";


type Props = { params: Promise<{ slug: string }> };


export default async function BuyPropertyPage({ params }: Props) {
  const { slug } = await params;
  const home = await getHomeCms().catch(() => null);
  const featured = home?.sections.section2.featured.filter((p) => p.id !== slug);

  return (
    <>
      <Nav />
      <main data-slug={slug} className="flex flex-col">
        <PropertyHero />
        <Properties background="bg-[#dbe2ec]" featured={featured} />
        <WhereWeComeIn />
        <WhatYouGet />
        <HomeBase />
        <RentalReviews />
        <RentalInquiry subline="We’ll help you find the one that’s meant to be yours." />
        <SideEffects />
        <CallBanner />
      </main>
      <Footer />
    </>
  );
}
