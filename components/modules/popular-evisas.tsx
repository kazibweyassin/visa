"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const popularVisas = [
  {
    title: "France Schengen Visa",
    country: "France",
    flagSrc: "https://flagcdn.com/w40/fr.png",
    stay: "Up to 90 days",
    entries: "Single / Multiple",
    processing: "15–21 days",
    fee: "~€90",
    href: "/apply?visa=france-schengen",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Germany Schengen Visa",
    country: "Germany",
    flagSrc: "https://flagcdn.com/w40/de.png",
    stay: "Up to 90 days",
    entries: "Single / Multiple",
    processing: "10–15 days",
    fee: "~€90",
    href: "/apply?visa=germany-schengen",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Netherlands Schengen Visa",
    country: "Netherlands",
    flagSrc: "https://flagcdn.com/w40/nl.png",
    stay: "Up to 90 days",
    entries: "Single / Multiple",
    processing: "10–15 days",
    fee: "~€90",
    href: "/apply?visa=netherlands-schengen",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
  },
];

export function PopularEvisas() {
  return (
    <section className="bg-[var(--surface)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Popular routes
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-light leading-snug text-[var(--foreground)] sm:text-4xl">
              Top Schengen visas for{" "}
              <span className="font-semibold">Ugandan passport holders</span>
            </h2>
          </div>
          <Link
            href="/apply"
            className="hidden items-center gap-1.5 text-sm font-semibold text-[var(--primary)] underline-offset-4 hover:underline sm:inline-flex"
          >
            See all routes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularVisas.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.09 }}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-slate-200/60"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.country} cityscape`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Flag badge on image */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <img
                    src={item.flagSrc}
                    alt={`${item.country} flag`}
                    className="h-4 w-6 rounded-sm object-cover shadow-sm"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/90 drop-shadow">
                    {item.country}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-base font-semibold leading-snug text-slate-900">
                  {item.title}
                </h3>

                {/* Pill badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/8 px-3 py-1 text-[11px] font-medium text-[var(--primary)]">
                    {item.stay}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
                    {item.entries}
                  </span>
                </div>

                {/* Meta row — FIXED: was text-white/40 on white bg, now visible slate */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span>⏱ {item.processing}</span>
                  <span className="font-semibold text-slate-700">{item.fee} fee</span>
                </div>

                {/* CTA — visible always (not hover-only) for mobile accessibility */}
                <Link
                  href={item.href}
                  className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#F4C15D]/40 bg-[#F4C15D]/10 text-xs font-semibold text-[#9A6D10] transition-all duration-200 hover:bg-[#F4C15D]/20 hover:border-[#F4C15D]/70 sm:opacity-0 sm:translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
                >
                  Apply now <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--secondary)]"
          >
            See all visa services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}