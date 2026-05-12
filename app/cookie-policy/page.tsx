import Link from "next/link";

const cookieSections = [
  {
    title: "What cookies are",
    body: "Cookies are small files stored on your device that help websites remember preferences and understand how the site is used.",
  },
  {
    title: "Why we use them",
    body: "We use cookies to keep the site secure, improve performance, remember preferences, and understand how visitors interact with pages.",
  },
  {
    title: "Analytics and functionality",
    body: "Some cookies may support analytics or embedded services so we can improve the browsing experience and measure page performance.",
  },
  {
    title: "Managing cookies",
    body: "You can manage or remove cookies through your browser settings. Blocking some cookies may affect how the site works.",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Link href="/" className="text-sm font-medium text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">
          ← Back home
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border-2)] bg-[var(--bg-2)] shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
          <div className="border-b border-[var(--border-2)] px-6 py-8 sm:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--amber)]">Cookie Policy</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--text-1)] sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
              How we use cookies
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-3)] sm:text-base">
              This policy explains the limited use of cookies and similar technologies on the AILES Global website.
            </p>
          </div>

          <div className="grid gap-4 px-6 py-8 sm:px-10">
            {cookieSections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-[var(--border-2)] bg-[var(--bg)] p-5">
                <h2 className="text-base font-bold text-[var(--text-1)]">{section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--text-3)]">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="border-t border-[var(--border-2)] bg-[var(--amber-muted)] px-6 py-6 sm:px-10">
            <h2 className="text-base font-bold text-[var(--text-1)]">Need help?</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-3)]">
              If you want to know more about cookie usage, contact us at hello@ailesglobal.com.
            </p>
            <p className="mt-3 text-xs text-[var(--text-3)]">
              <Link href="/legal-notice" className="font-semibold text-[var(--amber)] hover:underline">
                Read our legal notice
              </Link>
              {" "}to understand what Ailes Global is and what we do.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}