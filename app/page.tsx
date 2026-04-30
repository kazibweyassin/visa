import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import LandingHero from "@/components/modules/landing-hero";
import { TrustBar } from "@/components/modules/trust-bar";
import { VisaChecker } from "@/components/modules/visa-checker";
import { PopularEvisas } from "@/components/modules/popular-evisas";
import { HowItWorks } from "@/components/modules/how-it-works";
import { Testimonials } from "@/components/modules/testimonials";
import { FloatingWhatsApp } from "@/components/modules/floating-whatsapp";
import TravelAdvisoryNews from "@/components/modules/travel-advisory-news";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <LandingHero />
      {/* <TrustBar /> */}
      <VisaChecker />
      <PopularEvisas />
      <Testimonials />
      <FloatingWhatsApp />
      <SiteFooter />
    </>
  );
}
