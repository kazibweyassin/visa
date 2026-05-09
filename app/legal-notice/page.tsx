import Link from "next/link";

const noticePoints = [
  {
    title: "Independent travel consultancy",
    body: "Ailes Global is a private travel consultancy and logistics firm. We provide travel facilitation, document preparation, and planning support only.",
  },
  {
    title: "No government affiliation",
    body: "We are NOT affiliated with any government, embassy, or official agency including the Netherlands Embassy, Uganda government, or any consulate. We do not represent or work on behalf of any government body.",
  },
  {
    title: "Visa decisions are independent",
    body: "Visa issuance and approval are at the sole discretion of the respective embassies and consulates. We cannot influence, guarantee, or predict visa approval outcomes.",
  },
  {
    title: "No guarantees",
    body: "We do not guarantee visa approval, entry permission, or financial returns from business travel arrangements. Visa approval depends entirely on embassy evaluation.",
  },
  {
    title: "Our role",
    body: "We help you prepare documents, provide guidance on requirements, offer timeline planning, and coordinate logistics. We do not submit applications to embassies or make approval decisions.",
  },
];

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Link href="/" className="text-sm font-medium text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">
          ← Back home
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border-2)] bg-[var(--bg-2)] shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
          <div className="border-b border-[var(--border-2)] px-6 py-8 sm:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--green)]">Legal Notice</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--text-1)] sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
              Important legal information
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-3)] sm:text-base">
              Please read this notice carefully to understand what Ailes Global is, what we do, and what we don't do.
            </p>

            {/* User-provided consolidated legal paragraph (aligned with Ailes Global voice) */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-3)] sm:text-base">
              Ailes Travel is a private travel consultancy and logistics firm. We are <strong>NOT</strong> affiliated with any government, embassy, or official agency including the Netherlands Embassy, Uganda government, or China government. We provide travel facilitation, educational benchmarking, and logistics support only. Visa issuance and approval are at the sole discretion of the respective embassies. We do not guarantee visa approval, entry, or financial returns from business travel.
            </p>
          </div>

          <div className="grid gap-4 px-6 py-8 sm:px-10">
            {noticePoints.map((section) => (
              <article key={section.title} className="rounded-2xl border border-[var(--border-2)] bg-[var(--bg)] p-5">
                <h2 className="text-base font-bold text-[var(--text-1)]">{section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--text-3)]">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="border-t border-[var(--border-2)] bg-[var(--green-muted)] px-6 py-6 sm:px-10">
            <h2 className="text-base font-bold text-[var(--text-1)]">Questions?</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-3)]">
              For questions about our services and what we can and cannot do, reach out to us at hello@ailesglobal.com or WhatsApp +256 704 833 021.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
