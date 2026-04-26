"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aisha N.",
    meta: "Uganda · Tourism",
    flag: "🇺🇬",
    quote: "I finally got my tourist visa approved after two failed attempts. The guidance was practical and clear.",
    outcome: "Approved — France Schengen",
  },
  {
    name: "Chinedu O.",
    meta: "Nigeria · Business",
    flag: "🇳🇬",
    quote: "As a founder traveling for meetings, I needed speed and confidence. Everything felt professional and human.",
    outcome: "Approved — Germany Schengen",
  },
  {
    name: "Wanjiku M.",
    meta: "Kenya · Student",
    flag: "🇰🇪",
    quote: "They prepared every document and interview point I needed. The process felt organized and reassuring.",
    outcome: "Approved — Netherlands Schengen",
  },
  {
    name: "Kwame A.",
    meta: "Ghana · Traveler",
    flag: "🇬🇭",
    quote: "WhatsApp support was fast and personal. I always knew the next step and exactly what to submit.",
    outcome: "Approved — Spain Schengen",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[var(--surface)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,209,102,0.10),_transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
              Real outcomes from African travelers.
            </h2>
            <p className="mt-2 text-base text-slate-500">
              Authentic stories from people who needed a reliable, fast visa experience.
            </p>
          </div>
          {/* Aggregate signal */}
          <div className="mt-4 shrink-0 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center shadow-sm sm:mt-0">
            <p className="text-2xl font-bold text-slate-900">98%</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Approval rate when document-ready</p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.09 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Stars */}
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#F4C15D] text-[#F4C15D]" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">"{item.quote}"</p>
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.meta}</p>
                  </div>
                </div>
                {/* Outcome badge */}
                <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:inline-flex">
                  ✓ {item.outcome}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}