"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Globe, Plane, Flag, ArrowUpRight, MoveRight } from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const DESTINATIONS = [
  { code: "GB", flag: "🇬🇧", label: "United Kingdom" },
  { code: "CA", flag: "🇨🇦", label: "Canada" },
  { code: "DE", flag: "🇩🇪", label: "Germany" },
  { code: "FR", flag: "🇫🇷", label: "France" },
  { code: "NL", flag: "🇳🇱", label: "Netherlands" },
  { code: "IE", flag: "🇮🇪", label: "Ireland" },
];

const PURPOSES = [
  { icon: "📚", label: "Study" },
  { icon: "💼", label: "Work" },
  { icon: "✈️", label: "Tourism" },
  { icon: "🤝", label: "Business" },
  { icon: "👨‍👩‍👧", label: "Family Visit" },
];

const NATIONALITIES = [
  { flag: "🇺🇬", label: "Uganda" },
  { flag: "🇰🇪", label: "Kenya" },
  { flag: "🇳🇬", label: "Nigeria" },
  { flag: "🇬🇭", label: "Ghana" },
  { flag: "🇷🇼", label: "Rwanda" },
  { flag: "🇹🇿", label: "Tanzania" },
];

const TICKER_ITEMS = [
  "UK Student Visa", "Canada PR", "German Work Permit",
  "Schengen Visa", "Ireland Study", "Netherlands Visa",
  "France Student", "Family Reunification",
];

/* ─────────────────────────────────────────
   TICKER
───────────────────────────────────────── */
function Ticker() {
  return (
    <div className="overflow-hidden w-full py-3 border-y border-white/10 relative">
      <div className="flex gap-12 animate-ticker whitespace-nowrap w-max">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="text-xs tracking-[0.2em] uppercase text-white/40 flex items-center gap-4">
            <span className="w-1 h-1 rounded-full bg-[#C8F04A] inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CUSTOM SELECT
───────────────────────────────────────── */
function CustomSelect({
  icon: Icon,
  placeholder,
  options,
  value,
  onChange,
}: {
  icon: React.ElementType;
  placeholder: string;
  options: { label: string; flag?: string; icon?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.label === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-14 flex items-center gap-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors text-left group"
      >
        <Icon className="w-4 h-4 text-white/30 shrink-0" />
        <span className={`flex-1 text-sm truncate ${selected ? "text-white" : "text-white/35"}`}>
          {selected ? (
            <span className="flex items-center gap-2">
              <span>{selected.flag ?? selected.icon}</span>
              {selected.label}
            </span>
          ) : placeholder}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/30 text-xs"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-full rounded-xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden origin-top"
          >
            {options.map((opt) => (
              <li key={opt.label}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.label); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors text-left"
                >
                  <span className="w-5">{opt.flag ?? opt.icon}</span>
                  {opt.label}
                  {value === opt.label && <span className="ml-auto text-[#C8F04A]">✓</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   PASSPORT CARD (decorative)
───────────────────────────────────────── */
function PassportCard({ delay = 0, label, sub, rotate }: { delay?: number; label: string; sub: string; rotate: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="absolute bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl w-52"
    >
      <div className="flex items-start justify-between mb-6">
        <Globe className="w-5 h-5 text-[#C8F04A]" />
        <span className="text-[10px] text-white/30 tracking-widest uppercase">Approved</span>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 w-20 rounded-full bg-white/10" />
        <div className="h-1.5 w-16 rounded-full bg-white/6" />
      </div>
      <div className="mt-6 pt-4 border-t border-white/8 flex items-end justify-between">
        <div>
          <p className="text-white/90 font-semibold text-sm">{label}</p>
          <p className="text-white/35 text-xs mt-0.5">{sub}</p>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#C8F04A]/15 flex items-center justify-center">
          <span className="text-[#C8F04A] text-xs">↗</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────── */
export default function LandingHero() {
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [nationality, setNationality] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !purpose || !nationality) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    router.push("/apply");
  };

  const canSubmit = destination && purpose && nationality;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#080808] text-white overflow-hidden flex flex-col"
    >
      {/* ── animated grain overlay ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] z-10"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />

      {/* ── glow blobs ── */}
      <motion.div style={{ scale: bgScale }} className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#C8F04A]/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#3b82f6]/6 blur-[120px]" />
      </motion.div>

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-8"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#C8F04A] flex items-center justify-center">
            <Globe className="w-4 h-4 text-black" />
          </div>
          <span className="font-bold text-lg tracking-tight">VisaPath</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#" className="hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-white transition-colors">Countries</a>
          <a href="#" className="hover:text-white transition-colors">Reviews</a>
        </div>
        <Link href="/apply">
          <span className="text-sm px-5 py-2.5 rounded-full border border-white/15 hover:border-white/40 text-white/70 hover:text-white transition-all cursor-pointer">
            Apply now ↗
          </span>
        </Link>
      </motion.nav>

      {/* ── TICKER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-20 mt-8"
      >
        <Ticker />
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-20 flex-1 grid lg:grid-cols-2 gap-0 items-center px-6 sm:px-10 py-16 max-w-[1400px] mx-auto w-full">

        {/* LEFT — BIG TYPE */}
        <motion.div style={{ y: headingY }} className="lg:pr-16 xl:pr-24">
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8F04A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8F04A]" />
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-white/45">98% first-time approval</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(3.5rem,8vw,7rem)] text-white"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              The world<br />
              <span className="italic text-white/40">is your</span><br />
              <span className="text-[#C8F04A]">destination.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-10 text-white/45 text-lg leading-relaxed max-w-md"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            End-to-end visa &amp; study abroad support. Built for Africa.
            Trusted by 1,200+ applicants across 15 countries.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-14 flex items-center gap-10 flex-wrap"
          >
            {[
              { n: "1,247", label: "Applicants" },
              { n: "15", label: "Countries" },
              { n: "4.98", label: "Rating", accent: true },
            ].map(({ n, label, accent }) => (
              <div key={label} className="flex flex-col">
                <span
                  className={`text-4xl font-black tracking-tight leading-none ${accent ? "text-[#C8F04A]" : "text-white"}`}
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {n}
                </span>
                <span className="text-xs text-white/35 mt-1.5 tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA — desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-12 hidden lg:flex items-center gap-4"
          >
            <Link href="/apply">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[#C8F04A] text-black font-bold rounded-full text-sm tracking-wide hover:bg-white transition-colors"
              >
                Start application
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </Link>
            <a href="#reviews" className="text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5">
              Read reviews <MoveRight className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — FORM + FLOATING CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Floating passport cards — desktop only */}
          <div className="hidden xl:block absolute pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute -top-16 -left-28">
                <PassportCard delay={1.2} label="UK Tier 4 Student" sub="Approved · 2024" rotate="-6deg" />
              </div>
              <div className="absolute -bottom-14 -left-20">
                <PassportCard delay={1.5} label="Canada Study Permit" sub="Approved · 2025" rotate="4deg" />
              </div>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="w-full max-w-md">
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#C8F04A] via-[#a8d43a] to-[#6ee7b7]" />

              <div className="p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    Get matched in 60s
                  </h2>
                  <p className="text-white/40 text-sm mt-2 leading-relaxed">
                    Tell us your journey — we'll find the fastest path forward.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-white/30 mb-2">
                      Destination
                    </label>
                    <CustomSelect
                      icon={Globe}
                      placeholder="Where are you going?"
                      options={DESTINATIONS}
                      value={destination}
                      onChange={setDestination}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-white/30 mb-2">
                      Purpose
                    </label>
                    <CustomSelect
                      icon={Plane}
                      placeholder="Why are you travelling?"
                      options={PURPOSES}
                      value={purpose}
                      onChange={setPurpose}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-white/30 mb-2">
                      Nationality
                    </label>
                    <CustomSelect
                      icon={Flag}
                      placeholder="Your passport country"
                      options={NATIONALITIES}
                      value={nationality}
                      onChange={setNationality}
                    />
                  </div>

                  {/* Progress dots */}
                  <div className="flex gap-1.5 pt-1">
                    {[destination, purpose, nationality].map((v, i) => (
                      <motion.div
                        key={i}
                        animate={{ backgroundColor: v ? "#C8F04A" : "rgba(255,255,255,0.1)" }}
                        className="h-1 flex-1 rounded-full"
                      />
                    ))}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    whileHover={canSubmit ? { scale: 1.02 } : {}}
                    whileTap={canSubmit ? { scale: 0.98 } : {}}
                    className={`w-full h-14 mt-2 rounded-2xl text-sm font-bold tracking-wide flex items-center justify-center gap-3 transition-all
                      ${canSubmit
                        ? "bg-[#C8F04A] text-black hover:bg-white cursor-pointer shadow-[0_0_40px_rgba(200,240,74,0.25)]"
                        : "bg-white/5 text-white/20 cursor-not-allowed"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Finding your path…
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-[11px] text-white/20 mt-6 tracking-wide">
                  47 seconds · No card required · 100% confidential
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-5 flex items-center justify-center gap-6 text-[11px] text-white/25 tracking-wide"
            >
              <span>🔒 Encrypted</span>
              <span className="w-px h-3 bg-white/10" />
              <span>📋 Expert reviewed</span>
              <span className="w-px h-3 bg-white/10" />
              <span>✅ Consulate-ready</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="lg:hidden relative z-20 px-6 pb-10"
      >
        <Link href="/apply">
          <button className="w-full py-4 bg-[#C8F04A] text-black font-bold rounded-full text-sm tracking-wide flex items-center justify-center gap-2">
            Start Your Application
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>

      {/* ── Ticker animation keyframes ── */}
      <style jsx global>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </section>
  );
}