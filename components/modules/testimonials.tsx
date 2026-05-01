"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    name: "Aisha N.",
    meta: "Uganda · Tourism",
    flag: "🇺🇬",
    quote: "I finally got my tourist visa approved after two failed attempts. The guidance was practical and clear.",
    outcome: "France Schengen",
    span: "col-span-1",
  },
  {
    name: "Chinedu O.",
    meta: "Nigeria · Business",
    flag: "🇳🇬",
    quote: "As a founder traveling for meetings, I needed speed and confidence. Everything felt professional and human.",
    outcome: "Germany Schengen",
    span: "col-span-1",
  },
  {
    name: "Wanjiku M.",
    meta: "Kenya · Student",
    flag: "🇰🇪",
    quote: "They prepared every document and interview point I needed. The process felt organized and reassuring.",
    outcome: "Netherlands Schengen",
    span: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    name: "Kwame A.",
    meta: "Ghana · Traveler",
    flag: "🇬🇭",
    quote: "WhatsApp support was fast and personal. I always knew the next step and exactly what to submit.",
    outcome: "Spain Schengen",
    span: "col-span-1",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#faf9f7] py-24 sm:py-32"
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #d6d3ce 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-100/40 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-emerald-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Testimonials
            </span>
            <h2
              className="mt-5 text-4xl font-black text-stone-900 sm:text-5xl leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Real outcomes from
              <br />
              <span className="italic font-bold text-stone-400">African travelers.</span>
            </h2>
          </div>

          {/* Stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="shrink-0 rounded-3xl border border-stone-200 bg-white px-8 py-6 shadow-sm text-center lg:text-left"
          >
            <p
              className="text-5xl font-black text-stone-900 leading-none"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              98<span className="text-emerald-500">%</span>
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
              Approval rate
            </p>
            <p className="mt-0.5 text-[11px] text-stone-400">when document-ready</p>
          </motion.div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/5 hover:-translate-y-1"
            >
              {/* Opening quote mark */}
              <span
                className="absolute top-5 right-7 text-7xl font-black text-stone-100 leading-none select-none pointer-events-none"
                style={{ fontFamily: "'Georgia', serif" }}
                aria-hidden
              >
                "
              </span>

              {/* Quote */}
              <p
                className="relative text-base leading-relaxed text-stone-700 font-medium"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                "{item.quote}"
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between gap-4">
                {/* Person */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-100 bg-stone-50 text-xl">
                    {item.flag}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">{item.name}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{item.meta}</p>
                  </div>
                </div>

                {/* Outcome badge */}
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span className="text-[10px] font-bold text-emerald-700 whitespace-nowrap">
                    {item.outcome}
                  </span>
                </div>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-stone-200 bg-white px-8 py-7 shadow-sm"
        >
          {/* Stars + text */}
          <div className="flex items-center gap-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  fill="#f59e0b"
                  className="h-5 w-5"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">
                Trusted by 1,247+ travelers
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                Across Uganda, Kenya, Nigeria, Ghana & beyond
              </p>
            </div>
          </div>

          <Link
            href="https://wa.me/256704833021?text=Hi%2C%20I'd%20like%20help%20with%20my%20Schengen%20visa%20application."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white shadow-md shadow-stone-900/15 hover:bg-stone-800 transition-colors shrink-0"
          >
            Chat with us on WhatsApp
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}