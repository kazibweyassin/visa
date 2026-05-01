"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Globe, Plane, Flag, ArrowUpRight } from "lucide-react";

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
  "France Tourist", "Family Reunification",
];

/* ─────────────────────────────────────────
   TICKER
───────────────────────────────────────── */
function Ticker() {
  return (
    <div className="overflow-hidden w-full py-3 border-y border-[rgba(245,240,232,0.06)] relative">
      <div className="flex gap-12 whitespace-nowrap w-max" style={{ animation: "ticker 30s linear infinite" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="text-[10px] tracking-[0.22em] uppercase flex items-center gap-4" style={{ color: "var(--text-3)" }}>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--green)" }} />
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
        className="w-full h-12 flex items-center gap-3 px-4 rounded-xl text-left transition-all"
        style={{
          background: "var(--bg-3)",
          border: `1px solid ${open ? "var(--border-3)" : "var(--border-2)"}`,
        }}
      >
        <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--text-3)" }} />
        <span className="flex-1 text-sm truncate" style={{ color: selected ? "var(--text-1)" : "var(--text-3)" }}>
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
          className="text-xs"
          style={{ color: "var(--text-3)" }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scaleY: 0.97 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 mt-1.5 w-full rounded-xl overflow-hidden origin-top"
            style={{
              background: "var(--bg-4)",
              border: "1px solid var(--border-3)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            }}
          >
            {options.map((opt) => (
              <li key={opt.label}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.label); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors"
                  style={{
                    color: value === opt.label ? "var(--text-1)" : "var(--text-2)",
                    background: value === opt.label ? "rgba(34,197,94,0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (value !== opt.label) (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-3)";
                  }}
                  onMouseLeave={(e) => {
                    if (value !== opt.label) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <span className="w-5">{opt.flag ?? opt.icon}</span>
                  {opt.label}
                  {value === opt.label && <span className="ml-auto text-xs" style={{ color: "var(--green)" }}>✓</span>}
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
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !purpose || !nationality) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/apply");
  };

  const canSubmit = destination && purpose && nationality;
  const filledCount = [destination, purpose, nationality].filter(Boolean).length;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "var(--bg)" }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%", left: "-8%",
            width: 560, height: 560,
            background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-10%", right: "0%",
            width: 480, height: 480,
            background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* TICKER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-20 mt-8"
      >
        <Ticker />
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex-1 grid lg:grid-cols-2 gap-0 items-center px-6 sm:px-10 py-16 max-w-[1360px] mx-auto w-full">

        {/* LEFT — HEADLINE */}
        <motion.div style={{ y: headingY }} className="lg:pr-16 xl:pr-20">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--green)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--green)" }} />
            </span>
            <span className="text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ color: "var(--text-3)" }}>
              Visa facilitation for African passports
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.55, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.88] tracking-[-0.04em]"
              style={{
                fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)",
                fontFamily: "var(--font-serif)",
                color: "var(--text-1)",
              }}
            >
              The world<br />
              <span style={{ color: "var(--text-3)", fontStyle: "italic" }}>is open</span><br />
              <span style={{ color: "var(--green)" }}>for you.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-8 text-base leading-relaxed max-w-md"
            style={{ color: "var(--text-2)", fontFamily: "var(--font-serif)" }}
          >
            End-to-end visa support built for East African passport holders.
            Expert-reviewed documents. Local payments. Human guidance.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center gap-8 flex-wrap"
          >
            {[
              { n: "1,200+", label: "Applications" },
              { n: "15", label: "Countries" },
              { n: "98%", label: "Doc-ready approval" },
            ].map(({ n, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="text-3xl font-black tracking-tight leading-none"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}
                >
                  {n}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase mt-1.5" style={{ color: "var(--text-3)" }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35 }}
            className="mt-10 hidden lg:flex items-center gap-4"
          >
            <Link href="/apply">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide transition-colors"
                style={{ background: "var(--green)", color: "#000" }}
              >
                Start application
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <a
              href="#testimonials"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-3)")}
            >
              Read client stories →
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "var(--bg-2)",
                border: "1px solid var(--border-2)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.04)",
              }}
            >
              {/* Top accent */}
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--green), transparent)" }} />

              <div className="p-7 sm:p-9">
                <div className="mb-7">
                  <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-1)" }}>
                    Get matched in 60 seconds
                  </h2>
                  <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--text-3)" }}>
                    Tell us your journey — we'll find the fastest path forward.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-3)" }}>
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
                    <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-3)" }}>
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
                    <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-3)" }}>
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

                  {/* Progress bar */}
                  <div className="flex gap-1.5 pt-1">
                    {[destination, purpose, nationality].map((v, i) => (
                      <motion.div
                        key={i}
                        animate={{ background: v ? "var(--green)" : "var(--border-2)" }}
                        transition={{ duration: 0.3 }}
                        className="h-0.5 flex-1 rounded-full"
                      />
                    ))}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    whileHover={canSubmit ? { scale: 1.02 } : {}}
                    whileTap={canSubmit ? { scale: 0.98 } : {}}
                    className="w-full h-12 mt-1 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 transition-all"
                    style={{
                      background: canSubmit ? "var(--green)" : "var(--bg-3)",
                      color: canSubmit ? "#000" : "var(--text-3)",
                      cursor: canSubmit ? "pointer" : "not-allowed",
                      boxShadow: canSubmit ? "0 0 40px rgba(34,197,94,0.2)" : "none",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Finding your path…
                      </>
                    ) : (
                      <>
                        Continue
                        {filledCount > 0 && (
                          <span className="text-[11px] font-normal opacity-70">
                            ({filledCount}/3)
                          </span>
                        )}
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-[10px] mt-5 tracking-wide" style={{ color: "var(--text-3)" }}>
                  No card required · Expert-reviewed · 100% confidential
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-4 flex items-center justify-center gap-5 text-[10px] tracking-wide"
              style={{ color: "var(--text-3)" }}
            >
              <span>🔒 Encrypted</span>
              <span className="w-px h-3" style={{ background: "var(--border-1)" }} />
              <span>📋 Human-reviewed</span>
              <span className="w-px h-3" style={{ background: "var(--border-1)" }} />
              <span>✅ Consulate-ready</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="lg:hidden relative z-20 px-6 pb-10"
      >
        <Link href="/apply">
          <button
            className="w-full py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2"
            style={{ background: "var(--green)", color: "#000" }}
          >
            Start Your Application
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>

      <style jsx global>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}