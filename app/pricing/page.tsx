import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Pricing } from "@/components/modules/pricing";

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
              Pricing
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Choose the plan that fits your travel purpose.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Detailed plan pricing for document review, submission support, and end-to-end visa preparation.
            </p>
          </div>
          <Pricing />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
