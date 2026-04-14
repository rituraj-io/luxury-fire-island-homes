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


export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Properties />
        <WhyWorkWithUs />
        <Services />
        <Events />
        <GetToKnow />
        <CallBanner />
      </main>
      <Footer />
    </>
  );
}
