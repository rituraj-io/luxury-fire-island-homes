// Homepage — composes sections in visual order.
// Each section lives in src/components/sections/.

import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Properties from "@/components/sections/Properties";
import WhyWorkWithUs from "@/components/sections/WhyWorkWithUs";
import Services from "@/components/sections/Services";
import Events from "@/components/sections/Events";
import GetToKnow from "@/components/sections/GetToKnow";
import CallBanner from "@/components/sections/CallBanner";
import Footer from "@/components/sections/Footer";
import { getHomeCms } from "@/lib/cms";


export default async function Home() {
  const cms = await getHomeCms();
  const { heroSection, sections } = cms;

  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero hero={heroSection} />
        <About data={sections.section1} />
        <Properties featured={sections.section2.featured} />
        <WhyWorkWithUs data={sections.section3} />
        <Services accordion={sections.section4.accordion} />
        <Events events={sections.section5.orderedEvents} />
        <GetToKnow />
        <CallBanner />
      </main>
      <Footer />
    </>
  );
}
