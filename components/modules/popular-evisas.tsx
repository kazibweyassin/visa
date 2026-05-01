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
    tag: "Most popular",
    tagColor: "var(--green)",
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
    tag: "Fast processing",
    tagColor: "var(--amber)",
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
    tag: "High approval",
    tagColor: "var(--green)",
  },
];

function VisaCard({ item, index }: { item: (typeof popularVisas)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        minHeight: 460,
        background: "var(--bg-2)",
        border: "1px solid var(--border-2)",
      }}
    >
      {/* Parallax image */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.img
          src={item.image}
          alt={item.country}
          style={{ y: imgY }}
          className="absolute inset-0 h-[115%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Progressive overlay — dark at bottom */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(10,10,8,0.97) 0%, rgba(10,10,8,0.55) 50%, rgba(10,10,8,0.15) 100%)"
        }} />
      </div>

      {/* Top: tag + flag */}
      <div className="relative flex items-start justify-between p-5">
        <span
          className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{
            border: `1px solid ${item.tagColor}33`,
            background: `${item.tagColor}18`,
            color: item.tagColor,
            backdropFilter: "blur(8px)",
          }}
        >
          {item.tag}
        </span>

        <div
          className="flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{
            border: "1px solid var(--border-2)",
            background: "rgba(10,10,8,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <img src={item.flagSrc} alt={item.country} className="h-3.5 w-5 rounded-sm object-cover" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--text-3)" }}>
            {item.country}
          </span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Bottom content */}
      <div className="relative p-5 pt-0">
        <div className="mb-4">
          <h3
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "3.2rem", fontFamily: "var(--font-serif)", color: "var(--text-1)" }}
          >
            {item.title}
          </h3>
          <p className="mt-1 text-sm font-medium tracking-wide" style={{ color: "var(--text-3)" }}>
            {item.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-5 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-3)" }}>
            <Clock className="h-3.5 w-3.5" style={{ color: "var(--text-3)" }} />
            {item.processing}
          </div>
          <div className="h-3 w-px" style={{ background: "var(--border-2)" }} />
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-3)" }}>
            <Users className="h-3.5 w-3.5" style={{ color: "var(--text-3)" }} />
            {item.entries} entry
          </div>
          <div className="h-3 w-px" style={{ background: "var(--border-2)" }} />
          <div className="text-xs font-bold" style={{ color: "var(--text-2)" }}>
            {item.stay}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
              Embassy fee
            </span>
            <span
              className="text-2xl font-black leading-none mt-0.5"
              style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}
            >
              {item.fee}
            </span>
          </div>

          <Link
            href={item.href}
            className="ml-auto flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--text-1)", color: "#0a0a08" }}
          >
            Apply now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to right, transparent, var(--green), transparent)" }}
      />
    </motion.article>
  );
}

export function PopularEvisas() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--bg)" }}>
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-100" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-lg">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Popular routes
            </span>

            <h2
              className="mt-5 font-black leading-[0.92] tracking-tight"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                fontFamily: "var(--font-serif)",
                color: "var(--text-1)",
              }}
            >
              Top Schengen visas
              <br />
              <span style={{ color: "var(--text-3)", fontStyle: "italic", fontWeight: 700 }}>
                for Ugandan passports.
              </span>
            </h2>
          </div>

          <Link
            href="/apply"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
            style={{
              border: "1px solid var(--border-2)",
              background: "var(--bg-2)",
              color: "var(--text-2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-3)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-2)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)";
            }}
          >
            All visa routes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularVisas.map((item, index) => (
            <VisaCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-7 py-5"
          style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)" }}
        >
          <div className="text-center sm:text-left">
            <p className="font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}>
              Not seeing your destination?
            </p>
            <p className="mt-0.5 text-sm" style={{ color: "var(--text-3)" }}>
              We cover 15+ countries — UK, Canada, Ireland and more.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="https://wa.me/256704833021"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 text-sm font-medium transition-all"
              style={{
                border: "1px solid var(--border-2)",
                color: "var(--text-2)",
              }}
            >
              Ask us
            </Link>
            <Link
              href="/apply"
              className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all"
              style={{ background: "var(--text-1)", color: "#0a0a08" }}
            >
              Start application
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Mobile see all */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
            style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)", color: "var(--text-2)" }}
          >
            All visa routes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}