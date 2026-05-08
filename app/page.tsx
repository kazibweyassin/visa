import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ImportantUpdates } from "@/components/modules/important-updates";
import LandingHero from "@/components/modules/landing-hero";
import { VisaChecker } from "@/components/modules/visa-checker";
import { PopularEvisas } from "@/components/modules/popular-evisas";
import { HowItWorks } from "@/components/modules/how-it-works";
import { Testimonials } from "@/components/modules/testimonials";
import { FloatingWhatsApp } from "@/components/modules/floating-whatsapp";
import { SupportHub } from "@/components/modules/support-hub";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <LandingHero />
      <ImportantUpdates />
      <VisaChecker />
      <PopularEvisas />
      <HowItWorks />
      <SupportHub />
      <Testimonials />
      <FloatingWhatsApp />
      <SiteFooter />
    </>
  );
}
