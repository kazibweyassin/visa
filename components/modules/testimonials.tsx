"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    name: "Aisha N.",
    meta: "Uganda · Tourism",
    flag: "🇺🇬",
    quote: "I finally got my tourist visa approved after two failed attempts. The guidance was practical and clear — they knew exactly what the embassy wanted to see.",
    outcome: "France Schengen · Approved",
  },
  {
    name: "Chinedu O.",
    meta: "Nigeria · Business",
    flag: "🇳🇬",
    quote: "As a founder traveling for meetings, I needed speed and confidence. The process felt thorough, professional, and genuinely personal.",
    outcome: "Germany Schengen · Approved",
  },
  {
    name: "Wanjiku M.",
    meta: "Kenya · Student",
    flag: "🇰🇪",
    quote: "They prepared every document and every interview talking point. I walked into the consulate knowing exactly what to say.",
    outcome: "Netherlands Schengen · Approved",
  },
  {
    name: "Kwame A.",
    meta: "Ghana · Traveler",
    flag: "🇬🇭",
    quote: "WhatsApp support was fast and responsive. I always knew the next step and exactly what to submit without any confusion.",
    outcome: "Spain Schengen · Approved",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--bg)" }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid" />

      {/* Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full"
        style={{
          width: 600, height: 400,
          background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Client stories
            </span>
            <h2
              className="mt-5 font-black leading-[0.92] tracking-tight"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                fontFamily: "var(--font-serif)",
                color: "var(--text-1)",
              }}
            >
              Real outcomes from
              <br />
              <span style={{ color: "var(--text-3)", fontStyle: "italic", fontWeight: 700 }}>
                African travelers.
              </span>
            </h2>
          </div>

          {/* Approval stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="shrink-0 rounded-2xl px-8 py-6 text-center lg:text-left"
            style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)" }}
          >
            <p
              className="text-5xl font-black leading-none"
              style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}
            >
              98<span style={{ color: "var(--green)" }}>%</span>
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--text-3)" }}>
              Approval rate
            </p>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-3)" }}>
              when document-ready
            </p>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--border-2)",
                background: "var(--bg-2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-3)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-2)";
              }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-4 right-5 text-6xl font-black leading-none select-none pointer-events-none opacity-[0.04]"
                style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}
                aria-hidden
              >
                "
              </span>

              {/* Quote */}
              <p
                className="relative text-base leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-serif)", color: "var(--text-2)" }}
              >
                "{item.quote}"
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg"
                    style={{ border: "1px solid var(--border-2)", background: "var(--bg-3)" }}
                  >
                    {item.flag}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{item.name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-3)" }}>{item.meta}</p>
                  </div>
                </div>

                {/* Outcome badge */}
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 shrink-0"
                  style={{
                    background: "var(--green-muted)",
                    border: "1px solid rgba(34,197,94,0.15)",
                  }}
                >
                  <CheckCircle2 className="h-3 w-3 shrink-0" style={{ color: "var(--green)" }} />
                  <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: "var(--green)" }}>
                    {item.outcome}
                  </span>
                </div>
              </div>

              {/* Hover accent */}
              <div
                className="absolute bottom-0 left-5 right-5 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to right, transparent, var(--green), transparent)" }}
              />
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-7 py-6"
          style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)" }}
        >
          {/* Stars */}
          <div className="flex items-center gap-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="var(--amber)" className="h-4 w-4">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
                Trusted across East Africa
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
                Uganda, Kenya, Nigeria, Ghana & beyond
              </p>
            </div>
          </div>

          <Link
            href="https://wa.me/256704833021?text=Hi%2C%20I'd%20like%20help%20with%20my%20Schengen%20visa%20application."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shrink-0 transition-all"
            style={{ background: "var(--text-1)", color: "#0a0a08" }}
          >
            Chat on WhatsApp
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}