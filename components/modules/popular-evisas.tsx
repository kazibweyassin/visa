"use client";
import Link from "next/link";

const popularVisas = [
  {
    title: "France Schengen Visa",
    country: "France",
    flagSrc: "https://flagcdn.com/w40/fr.png",
    stay: "Up to 90 days",
    entries: "Single / Multiple",
    processing: "15–21 days",
    fee: "~$115 fee",
    href: "/apply?visa=france-schengen",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Germany Schengen Visa",
    country: "Germany",
    flagSrc: "https://flagcdn.com/w40/de.png",
    stay: "Up to 90 days",
    entries: "Single / Multiple",
    processing: "10–15 days",
    fee: "~$115 fee",
    href: "/apply?visa=germany-schengen",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Netherlands Schengen Visa",
    country: "Netherlands",
    flagSrc: "https://flagcdn.com/w40/nl.png",
    stay: "Up to 90 days",
    entries: "Single / Multiple",
    processing: "10–15 days",
    fee: "~$115 fee",
    href: "/apply?visa=netherlands-schengen",
    image:
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
  },
];

export function PopularEvisas() {
  return (
    <section className="bg-[#0B1324] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#F4C15D] font-medium">
            Popular routes
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-light leading-snug text-white sm:text-4xl"
              style={{ fontFamily: "'Fraunces', serif" }}>
            Top Schengen visas for Ugandan passport holders
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularVisas.map((item) => (
            <article
              key={item.title}
              className="group rounded-[1.25rem] overflow-hidden border border-white/10 bg-[#111827] transition-transform duration-300 hover:-translate-y-1 hover:border-[#F4C15D]/30"
            >
              {/* Image */}
              <div className="h-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.country} visa`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Flag + country */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={item.flagSrc}
                    alt={`${item.country} flag`}
                    className="h-[15px] w-[22px] rounded-sm object-cover"
                  />
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#F4C15D] font-medium">
                    {item.country}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-light text-white leading-snug mb-3"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {item.title}
                </h3>

                {/* Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[11px] px-3 py-1 rounded-full border border-[#F4C15D]/30 bg-[#F4C15D]/[0.06] text-[#F4C15D]">
                    {item.stay}
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-full border border-white/10 text-white/50">
                    {item.entries}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-white/[0.08] mb-4" />

                {/* Meta */}
                <div className="flex justify-between text-[12px] text-white/40 mb-4">
                  <span>Processing: {item.processing}</span>
                  <span>{item.fee}</span>
                </div>

                {/* Per-card CTA — hidden until hover */}
                <Link
                  href={item.href}
                  className="block w-full text-center text-[12px] font-medium text-[#F4C15D] border border-[#F4C15D]/30 bg-[#F4C15D]/[0.08] rounded-full py-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#F4C15D]/20"
                >
                  Apply now →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Global CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-[#F4C15D] px-7 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(244,193,93,0.25)]"
          >
            See all visa services →
          </Link>
        </div>
      </div>
    </section>
  );
}