import Link from "next/link";

const policySections = [
  {
    title: "Information we collect",
    body: "We may collect contact details, application information, document uploads, and basic website usage data when you use our services.",
  },
  {
    title: "How we use information",
    body: "We use your information to process visa and study abroad requests, respond to inquiries, improve our services, and communicate with you about your case.",
  },
  {
    title: "Sharing information",
    body: "We only share information with trusted service providers and advisors when needed to deliver our services or meet legal obligations.",
  },
  {
    title: "Your choices",
    body: "You may request access, updates, or deletion of your personal information by contacting us at hello@ailesglobal.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Link href="/" className="text-sm font-medium text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">
          ← Back home
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border-2)] bg-[var(--bg-2)] shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
          <div className="border-b border-[var(--border-2)] px-6 py-8 sm:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--green)]">Privacy Policy</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--text-1)] sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
              How we handle your information
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-3)] sm:text-base">
              This policy explains how AILES Global collects, uses, and protects personal information when you use our website and services.
            </p>
          </div>

          <div className="grid gap-4 px-6 py-8 sm:px-10">
            {policySections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-[var(--border-2)] bg-[var(--bg)] p-5">
                <h2 className="text-base font-bold text-[var(--text-1)]">{section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--text-3)]">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="border-t border-[var(--border-2)] bg-[var(--green-muted)] px-6 py-6 sm:px-10">
            <h2 className="text-base font-bold text-[var(--text-1)]">Contact</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-3)]">
              If you have questions about this policy, email hello@ailesglobal.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}