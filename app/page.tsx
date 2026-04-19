import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LandingHero } from "@/components/modules/landing-hero";
import { TrustBar } from "@/components/modules/trust-bar";
import { VisaChecker } from "@/components/modules/visa-checker";
import { PopularEvisas } from "@/components/modules/popular-evisas";
import { HowItWorks } from "@/components/modules/how-it-works";
import { WhyUs } from "@/components/modules/why-us";
import { Pricing } from "@/components/modules/pricing";
import { FAQ } from "@/components/modules/faq";
import { FloatingWhatsApp } from "@/components/modules/floating-whatsapp";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <LandingHero />
      <TrustBar />
      <VisaChecker />
      <PopularEvisas />
      <WhyUs />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FloatingWhatsApp />
      <SiteFooter />
    </>
  );
}
