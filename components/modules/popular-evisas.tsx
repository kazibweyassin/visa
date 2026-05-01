"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const popularVisas = [
  {
    title: "France",
    subtitle: "Schengen Visa",
    country: "France",
    flagSrc: "https://flagcdn.com/w40/fr.png",
    stay: "90 days",
    entries: "Multiple",
    processing: "15–21 days",
    fee: "€90",
    href: "/apply?visa=france-schengen",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    accent: "#4A6CF7",
    tag: "Most popular",
  },
  {
    title: "Germany",
    subtitle: "Schengen Visa",
    country: "Germany",
    flagSrc: "https://flagcdn.com/w40/de.png",
    stay: "90 days",
    entries: "Multiple",
    processing: "10–15 days",
    fee: "€90",
    href: "/apply?visa=germany-schengen",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=85",
    accent: "#10b981",
    tag: "Fast processing",
  },
  {
    title: "Netherlands",
    subtitle: "Schengen Visa",
    country: "Netherlands",
    flagSrc: "https://flagcdn.com/w40/nl.png",
    stay: "90 days",
    entries: "Multiple",
    processing: "10–15 days",
    fee: "€90",
    href: "/apply?visa=netherlands-schengen",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=85",
    accent: "#f59e0b",
    tag: "High approval",
  },
];

/* ── Parallax image card ── */
function VisaCard({
  item,
  index,
}: {
  item: (typeof popularVisas)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-stone-900"
      style={{ minHeight: 480 }}
    >
      {/* Full-bleed parallax image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.country}
          style={{ y: imgY }}
          className="absolute inset-0 h-[115%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Multi-stop gradient overlay — heavy at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-stone-950/10" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/20 to-transparent" />
      </div>

      {/* Top strip — tag + flag */}
      <div className="relative flex items-start justify-between p-6">
        {/* Tag pill */}
        <span className="rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
          {item.tag}
        </span>

        {/* Flag */}
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 backdrop-blur-md px-3 py-1.5">
          <img
            src={item.flagSrc}
            alt={item.country}
            className="h-3.5 w-5 rounded-sm object-cover shadow-sm"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
            {item.country}
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom content */}
      <div className="relative p-6 pt-0">
        {/* Country name — big serif */}
        <div className="mb-4">
          <h3
            className="text-5xl font-black text-white leading-none tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {item.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/40 tracking-wide">
            {item.subtitle}
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-5 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Clock className="h-3.5 w-3.5 text-white/30" />
            {item.processing}
          </div>
          <div className="h-3 w-px bg-white/15" />
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Users className="h-3.5 w-3.5 text-white/30" />
            {item.entries} entry
          </div>
          <div className="h-3 w-px bg-white/15" />
          <div className="text-xs font-bold text-white/70">
            {item.stay}
          </div>
        </div>

        {/* Price + CTA row */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Embassy fee
            </span>
            <span
              className="text-xl font-black text-white leading-none mt-0.5"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {item.fee}
            </span>
          </div>

          <Link
            href={item.href}
            className="group/btn ml-auto flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-stone-900 transition-all duration-300 hover:bg-stone-100 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
          >
            Apply now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${item.accent}, transparent)` }}
      />
    </motion.article>
  );
}

/* ── Main section ── */
export function PopularEvisas() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f7] py-24 sm:py-32">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #d6d3ce 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-emerald-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Popular routes
            </span>

            <h2
              className="mt-5 text-4xl font-black text-stone-900 sm:text-5xl leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Top Schengen visas
              <br />
              <span className="italic font-bold text-stone-400">for Ugandan passports.</span>
            </h2>
          </div>

          <Link
            href="/apply"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-600 shadow-sm hover:border-stone-300 hover:text-stone-900 transition-all"
          >
            All visa routes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularVisas.map((item, index) => (
            <VisaCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* ── Bottom strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-3xl border border-stone-200 bg-white px-8 py-6 shadow-sm"
        >
          <div className="text-center sm:text-left">
            <p
              className="text-base font-bold text-stone-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Not seeing your destination?
            </p>
            <p className="mt-0.5 text-sm text-stone-400">
              We cover 15+ countries — UK, Canada, Ireland and more.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="https://wa.me/256704833021"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50 transition-all"
            >
              Ask us
            </Link>
            <Link
              href="/apply"
              className="group flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-stone-800 transition-colors shadow-md shadow-stone-900/15"
            >
              Start application
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Mobile "see all" */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 transition-colors"
          >
            All visa routes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}