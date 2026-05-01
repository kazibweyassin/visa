"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  Info,
  Stamp,
  Clock,
  BadgePercent,
  MapPin,
  ChevronDown,
  Plane,
  FileText,
  ListChecks,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { africanCountries, schengenCountries, ugandaTouristCountries, visaRoutes } from "@/lib/visa-data";

const visaResult = {
  visaType: "Schengen short-stay (Type C)",
  processingTime: "10–15 business days",
  serviceFee: "$79",
  approvalRate: "98%",
  bookingNote: "Apply at the embassy of the country you'll stay longest in.",
};

function getVisaInfo(fromCountry: string, toCountry: string) {
  const isUganda = toCountry === "Uganda";
  const isUgandaSource = ugandaTouristCountries.includes(fromCountry);
  const isSchengenDest = schengenCountries.includes(toCountry);
  const isSchengenSource = africanCountries.includes(fromCountry);
  if (isUganda && isUgandaSource) return { type: "uganda_tourist", info: visaRoutes["uganda_tourist"], icon: "🇺🇬" };
  if (isSchengenDest && isSchengenSource) return { type: "schengen", info: visaRoutes["schengen"], icon: "🇪🇺" };
  return null;
}

/* ─────────────────────────────────────────
   SELECT
───────────────────────────────────────── */
function NiceSelect({
  label, value, onChange, options, placeholder, icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  icon: React.ElementType;
}) {
  const hasValue = !!value;
  return (
    <div className="relative group">
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors duration-200"
          style={{ color: hasValue ? "var(--green)" : "var(--text-3)" }}
        />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl py-3 pl-9 pr-8 text-sm outline-none transition-all duration-200"
          style={{
            background: "var(--bg-3)",
            border: `1px solid ${hasValue ? "rgba(34,197,94,0.25)" : "var(--border-2)"}`,
            color: hasValue ? "var(--text-1)" : "var(--text-3)",
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ background: "var(--bg-3)", color: "var(--text-1)" }}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors duration-200"
          style={{ color: hasValue ? "var(--green)" : "var(--text-3)" }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   RESULT PILL
───────────────────────────────────────── */
function ResultPill({ icon: Icon, label, value, accent, delay }: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay ?? 0 }}
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{
        background: accent ? "var(--green-muted)" : "var(--bg-3)",
        border: `1px solid ${accent ? "rgba(34,197,94,0.15)" : "var(--border-2)"}`,
      }}
    >
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: accent ? "rgba(34,197,94,0.15)" : "var(--bg-4)",
        }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: accent ? "var(--green)" : "var(--text-3)" }} />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] shrink-0" style={{ color: "var(--text-3)" }}>
          {label}
        </span>
        <span className="text-sm font-bold truncate text-right" style={{ color: accent ? "var(--green)" : "var(--text-1)" }}>
          {value}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export function VisaChecker() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const [expandedDocs, setExpandedDocs] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState(false);

  const handleCheck = () => {
    if (!fromCountry || !toCountry) { setError("Pick both a country and a destination."); setShowResult(false); return; }
    setError(""); setShowResult(true);
  };

  const bothSelected = fromCountry && toCountry;
  const applyLink = showResult ? `/apply?from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}` : "/apply";

  return (
    <section id="visa-checker" className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--bg)" }}>
      {/* Subtle separator line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-1)" }} />
      <div className="dot-grid pointer-events-none absolute inset-0" />

      {/* Glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 rounded-full" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" style={{ animation: "pulse 2s infinite" }} />
              Visa Checker
            </span>
            <h2
              className="mt-5 font-black leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)", fontFamily: "var(--font-serif)", color: "var(--text-1)" }}
            >
              Know before
              <br />
              <span style={{ color: "var(--text-3)", fontStyle: "italic", fontWeight: 700 }}>you go.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed lg:text-right" style={{ color: "var(--text-3)" }}>
            Instant visa requirements, timelines, and fees — just pick your countries.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-4">

          {/* LEFT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-7 sm:p-9 flex flex-col"
            style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)" }}
          >
            <div className="mb-7">
              <p className="text-base font-semibold" style={{ color: "var(--text-1)" }}>Where are you travelling?</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>Select your passport and destination.</p>
            </div>

            <div className="flex-1 space-y-4">
              <NiceSelect
                label="I'm from"
                icon={MapPin}
                value={fromCountry}
                onChange={(v) => { setFromCountry(v); setShowResult(false); setError(""); }}
                options={[...africanCountries, ...ugandaTouristCountries]}
                placeholder="Select your country"
              />

              {fromCountry && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                  <NiceSelect
                    label="I want to visit"
                    icon={Plane}
                    value={toCountry}
                    onChange={(v) => { setToCountry(v); setShowResult(false); setError(""); }}
                    options={ugandaTouristCountries.includes(fromCountry) ? ["Uganda", ...schengenCountries] : schengenCountries}
                    placeholder="Select destination"
                  />
                </motion.div>
              )}

              {!fromCountry && (
                <div className="rounded-xl px-4 py-4 text-center" style={{ border: "1px solid var(--border-1)", background: "var(--bg-3)" }}>
                  <p className="text-xs" style={{ color: "var(--text-3)" }}>Select your country first</p>
                </div>
              )}

              <AnimatePresence>
                {bothSelected && !showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl px-4 py-3"
                    style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)" }}
                  >
                    <Globe2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--green)" }} />
                    <span className="text-xs truncate" style={{ color: "var(--text-3)" }}>
                      <span style={{ color: "var(--text-1)", fontWeight: 600 }}>{fromCountry}</span>
                      <span className="mx-1.5">→</span>
                      <span style={{ color: "var(--text-1)", fontWeight: 600 }}>{toCountry}</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl px-4 py-3 text-xs font-medium"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171" }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-7 space-y-3">
              <motion.button
                type="button"
                onClick={handleCheck}
                whileHover={{ scale: bothSelected ? 1.02 : 1 }}
                whileTap={{ scale: bothSelected ? 0.98 : 1 }}
                className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold transition-all duration-300"
                style={{
                  background: bothSelected ? "var(--green)" : "var(--bg-3)",
                  color: bothSelected ? "#000" : "var(--text-3)",
                  cursor: bothSelected ? "pointer" : "not-allowed",
                  boxShadow: bothSelected ? "0 0 30px rgba(34,197,94,0.15)" : "none",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Check visa requirements
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                {bothSelected && (
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-5 text-[10px]" style={{ color: "var(--text-3)" }}>
                {["Free", "Instant", "Confidential"].map((label) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3" style={{ color: "var(--green)", opacity: 0.6 }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Result */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-7 sm:p-9 flex flex-col"
            style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)" }}
          >
            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col h-full">
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--text-3)" }}>Visa Summary</p>
                    <h3 className="text-xl font-black leading-tight tracking-tight" style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}>
                      {getVisaInfo(fromCountry, toCountry)?.icon} {fromCountry}
                      <span className="font-normal italic mx-2" style={{ color: "var(--text-3)" }}>to</span>
                      {toCountry}
                    </h3>
                  </motion.div>

                  {/* Visa type banner */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 rounded-xl p-4"
                    style={{ background: "var(--green-muted)", border: "1px solid rgba(34,197,94,0.15)" }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: "var(--green)", opacity: 0.7 }}>Visa Required</p>
                    <p className="text-base font-black leading-snug" style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}>
                      {getVisaInfo(fromCountry, toCountry)?.info.visaType || visaResult.visaType}
                    </p>
                  </motion.div>

                  <div className="space-y-2 flex-1">
                    <ResultPill icon={Clock} label="Processing" value={getVisaInfo(fromCountry, toCountry)?.info.processingTime || visaResult.processingTime} delay={0.15} />
                    <ResultPill icon={BadgePercent} label="Approval rate" value={getVisaInfo(fromCountry, toCountry)?.info.approvalRate || visaResult.approvalRate} accent delay={0.2} />
                    <ResultPill icon={Stamp} label="Our service fee" value={getVisaInfo(fromCountry, toCountry)?.info.serviceFee || visaResult.serviceFee} accent delay={0.25} />
                    <ResultPill icon={MapPin} label="Your passport" value={fromCountry} delay={0.3} />
                  </div>

                  {/* Advisory */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3"
                    style={{ background: "var(--amber-muted)", border: "1px solid rgba(245,158,11,0.15)" }}
                  >
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--amber)" }} />
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(245,158,11,0.8)" }}>
                      {getVisaInfo(fromCountry, toCountry)?.info.notes || visaResult.bookingNote}
                    </p>
                  </motion.div>

                  {/* Collapsibles */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.37 }} className="mt-4 space-y-2">
                    {/* Documents */}
                    <button
                      onClick={() => setExpandedDocs(!expandedDocs)}
                      className="w-full flex items-center justify-between rounded-lg px-4 py-3 text-left transition-colors"
                      style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)" }}
                    >
                      <span className="flex items-center gap-2.5">
                        <FileText className="h-3.5 w-3.5" style={{ color: "var(--green)", opacity: 0.7 }} />
                        <span className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Documents needed</span>
                      </span>
                      <motion.div animate={{ rotate: expandedDocs ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-3.5 w-3.5" style={{ color: "var(--text-3)" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedDocs && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden rounded-lg px-4 py-3" style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)" }}>
                          <ul className="space-y-1.5 text-xs" style={{ color: "var(--text-3)" }}>
                            {["Valid passport (6+ months)", "Bank statements (last 3 months)", "Accommodation proof", "Flight bookings / return ticket", "Travel insurance", "Proof of employment / studies"].map((doc) => (
                              <li key={doc} className="flex gap-2">
                                <span style={{ color: "var(--green)", opacity: 0.6, fontWeight: 700 }}>•</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Timeline */}
                    <button
                      onClick={() => setExpandedTimeline(!expandedTimeline)}
                      className="w-full flex items-center justify-between rounded-lg px-4 py-3 text-left transition-colors"
                      style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)" }}
                    >
                      <span className="flex items-center gap-2.5">
                        <ListChecks className="h-3.5 w-3.5" style={{ color: "var(--green)", opacity: 0.7 }} />
                        <span className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Your timeline</span>
                      </span>
                      <motion.div animate={{ rotate: expandedTimeline ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-3.5 w-3.5" style={{ color: "var(--text-3)" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedTimeline && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden rounded-lg px-4 py-3" style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)" }}>
                          <div className="space-y-2.5 text-xs" style={{ color: "var(--text-3)" }}>
                            {[
                              { n: "1", t: "Prepare documents", s: "Recommended: 2 weeks" },
                              { n: "2", t: "Submit for review", s: "We check everything" },
                              { n: "3", t: "Refine & finalise", s: "Fix any issues" },
                              { n: "4", t: "Submit to embassy", s: "10–15 business days" },
                            ].map(({ n, t, s }) => (
                              <div key={n} className="flex gap-2">
                                <span style={{ color: "var(--green)", opacity: 0.7, fontWeight: 700, width: 20 }}>{n}.</span>
                                <div>
                                  <p className="font-semibold" style={{ color: "var(--text-2)" }}>{t}</p>
                                  <p className="text-[10px]" style={{ color: "var(--text-3)" }}>{s}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* CTA */}
                  <div className="mt-5 space-y-2">
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      <Link href={applyLink}>
                        <motion.div
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all"
                          style={{ background: "var(--text-1)", color: "#0a0a08" }}
                        >
                          Start my application
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                      <Link href="/prepare">
                        <motion.div
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all"
                          style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)", color: "var(--text-2)" }}
                        >
                          Prepare documents first
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[340px] flex-col items-center justify-center text-center">
                  <div className="relative mb-7 h-24 w-20">
                    <div className="absolute inset-0 translate-x-3 translate-y-2 rotate-6 rounded-xl" style={{ border: "1px solid var(--border-1)", background: "var(--bg-3)" }} />
                    <div className="absolute inset-0 translate-x-1.5 translate-y-1 rotate-3 rounded-xl" style={{ border: "1px solid var(--border-1)", background: "var(--bg-3)" }} />
                    <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-2" style={{ border: "1px solid var(--border-2)", background: "var(--bg-4)" }}>
                      <Globe2 className="h-6 w-6" style={{ color: "var(--text-3)" }} />
                      <div className="space-y-1.5 px-4 w-full">
                        <div className="h-1 w-full rounded-full" style={{ background: "var(--border-2)" }} />
                        <div className="h-1 w-3/4 rounded-full" style={{ background: "var(--border-1)" }} />
                      </div>
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "var(--green-muted)", border: "1px solid rgba(34,197,94,0.2)" }}>
                      <Stamp className="h-3.5 w-3.5" style={{ color: "var(--green)" }} />
                    </div>
                  </div>

                  <p className="text-base font-bold leading-snug" style={{ fontFamily: "var(--font-serif)", color: "var(--text-3)" }}>
                    Your results
                    <br />
                    <span className="italic font-normal" style={{ color: "var(--text-3)", opacity: 0.5 }}>appear here</span>
                  </p>
                  <p className="mt-2 max-w-[180px] text-xs leading-relaxed" style={{ color: "var(--text-3)", opacity: 0.6 }}>
                    Select both countries to see your visa summary.
                  </p>

                  <div className="mt-7 w-full space-y-2 opacity-10">
                    {[100, 75, 75].map((w, i) => (
                      <div key={i} className="h-9 animate-pulse rounded-xl" style={{ width: `${w}%`, background: "var(--bg-3)" }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl"
          style={{ background: "var(--border-1)", border: "1px solid var(--border-2)" }}
        >
          {[
            { n: "1,200+", label: "Applications" },
            { n: "15", label: "Countries" },
            { n: "98%", label: "Approval rate" },
            { n: "< 2h", label: "Response time" },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col items-center py-5 transition-colors" style={{ background: "var(--bg-2)" }}>
              <span className="text-2xl font-black tracking-tight leading-none" style={{ fontFamily: "var(--font-serif)", color: "var(--text-1)" }}>
                {n}
              </span>
              <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-3)" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}