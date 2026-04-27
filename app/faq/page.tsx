import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FAQ } from "@/components/modules/faq";

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
              FAQ
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Answers for professionals preparing global travel.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Clear, concise responses to the most common visa, application, and business travel questions.
            </p>
          </div>
          <FAQ />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
