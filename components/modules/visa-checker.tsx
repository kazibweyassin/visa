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
  bookingNote:
    "Apply at the embassy of the country you'll stay longest in.",
};

// Helper function to determine visa type and get info
function getVisaInfo(fromCountry: string, toCountry: string) {
  const isUganda = toCountry === "Uganda";
  const isUgandaSource = ugandaTouristCountries.includes(fromCountry);
  const isSchengenDest = schengenCountries.includes(toCountry);
  const isSchengenSource = africanCountries.includes(fromCountry);

  if (isUganda && isUgandaSource) {
    return {
      type: "uganda_tourist",
      info: visaRoutes["uganda_tourist"],
      icon: "🇺🇬"
    };
  } else if (isSchengenDest && isSchengenSource) {
    return {
      type: "schengen",
      info: visaRoutes["schengen"],
      icon: "🇪🇺"
    };
  }
  return null;
}

/* ─────────────────────────────────────────
   CUSTOM SELECT
───────────────────────────────────────── */
function NiceSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
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
      <label className="mb-2 block text-[10px] font-bold tracking-[0.22em] uppercase text-stone-400">
        {label}
      </label>
      <div className="relative">
        <Icon
          className={`pointer-events-none absolute left-4 top-1/2 h-[15px] w-[15px] -translate-y-1/2 transition-colors duration-200 ${
            hasValue ? "text-emerald-500" : "text-stone-300"
          }`}
        />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-2xl border bg-white py-[14px] pl-10 pr-9 text-sm outline-none ring-0 transition-all duration-200 shadow-sm
            ${hasValue
              ? "border-emerald-300 text-stone-900 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
              : "border-stone-200 text-stone-400 focus:border-stone-300 focus:ring-4 focus:ring-stone-50 hover:border-stone-300"
            }`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-stone-900">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
            hasValue ? "text-emerald-400" : "text-stone-300"
          }`}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   RESULT PILL ROW
───────────────────────────────────────── */
function ResultPill({
  icon: Icon,
  label,
  value,
  accent,
  delay,
}: {
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
      className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
        accent
          ? "bg-emerald-50 border border-emerald-100"
          : "bg-stone-50 border border-stone-100"
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          accent ? "bg-emerald-100" : "bg-white border border-stone-150"
        }`}
      >
        <Icon className={`h-3.5 w-3.5 ${accent ? "text-emerald-600" : "text-stone-400"}`} />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400 shrink-0">
          {label}
        </span>
        <span
          className={`text-sm font-bold truncate text-right ${
            accent ? "text-emerald-700" : "text-stone-800"
          }`}
        >
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
    if (!fromCountry || !toCountry) {
      setError("Pick both a country and a destination.");
      setShowResult(false);
      return;
    }
    setError("");
    setShowResult(true);
  };

  const bothSelected = fromCountry && toCountry;

  const applyLink = showResult
    ? `/apply?from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}`
    : "/apply";

  return (
    <section
      id="visa-checker"
      className="relative overflow-hidden bg-stone-900 py-24 sm:py-32"
    >
      {/* ── Background texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Glow blobs ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-teal-500/8 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Visa Checker
            </span>
            <h2
              className="mt-5 text-4xl font-black text-white sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Know before
              <br />
              <span className="italic font-bold text-white/40">you go.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm text-white/40 leading-relaxed lg:text-right">
            Instant visa requirements, timelines, and fees — just pick your countries.
          </p>
        </motion.div>

        {/* ── Main layout ── */}
        <div className="grid lg:grid-cols-2 gap-5">

          {/* LEFT — Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10 flex flex-col"
          >
            <div className="mb-8">
              <p className="text-base font-semibold text-white">
                Where are you travelling?
              </p>
              <p className="mt-1 text-sm text-white/35">
                Select your passport and destination country.
              </p>
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
              
              {/* Smart destination selector based on source */}
              {fromCountry && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <NiceSelect
                    label="I want to visit"
                    icon={Plane}
                    value={toCountry}
                    onChange={(v) => { setToCountry(v); setShowResult(false); setError(""); }}
                    options={
                      ugandaTouristCountries.includes(fromCountry)
                        ? ["Uganda", ...schengenCountries]
                        : schengenCountries
                    }
                    placeholder="Select destination"
                  />
                </motion.div>
              )}
              
              {!fromCountry && (
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-center">
                  <p className="text-xs text-white/40">Select your country first</p>
                </div>
              )}

              {/* Route preview pill */}
              <AnimatePresence>
                {bothSelected && !showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/8 px-4 py-3"
                  >
                    <Globe2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs text-white/50 truncate">
                      <span className="text-white font-medium">{fromCountry}</span>
                      <span className="mx-1.5">→</span>
                      <span className="text-white font-medium">{toCountry}</span>
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
                    className="rounded-xl bg-rose-900/30 border border-rose-500/20 px-4 py-3 text-xs font-medium text-rose-300"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 space-y-3">
              <motion.button
                type="button"
                onClick={handleCheck}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-full overflow-hidden rounded-2xl py-4 text-sm font-bold transition-all duration-300 ${
                  bothSelected
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400"
                    : "bg-white/8 text-white/30 cursor-not-allowed"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Check visa requirements
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                {bothSelected && (
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                )}
              </motion.button>

              {/* Trust micro-row */}
              <div className="flex items-center justify-center gap-5 text-[11px] text-white/25">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500/60" />
                  Free
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500/60" />
                  Instant
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500/60" />
                  Confidential
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Result card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10 flex flex-col"
          >
            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30 mb-2">
                      Visa Summary
                    </p>
                    <h3
                      className="text-2xl font-black text-white leading-tight tracking-tight"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {getVisaInfo(fromCountry, toCountry)?.icon}{" "}
                      {fromCountry}
                      <span className="text-white/25 font-normal italic mx-2">to</span>
                      {toCountry}
                    </h3>
                  </motion.div>

                  {/* Visa type big banner */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border border-emerald-500/20 p-5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/70 mb-1.5">
                      Visa Required
                    </p>
                    <p
                      className="text-lg font-black text-white leading-snug"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {getVisaInfo(fromCountry, toCountry)?.info.visaType || visaResult.visaType}
                    </p>
                  </motion.div>

                  {/* Stat pills */}
                  <div className="space-y-2 flex-1">
                    <ResultPill 
                      icon={Clock} 
                      label="Processing" 
                      value={getVisaInfo(fromCountry, toCountry)?.info.processingTime || visaResult.processingTime} 
                      delay={0.15} 
                    />
                    <ResultPill 
                      icon={BadgePercent} 
                      label="Approval rate" 
                      value={getVisaInfo(fromCountry, toCountry)?.info.approvalRate || visaResult.approvalRate} 
                      accent 
                      delay={0.2} 
                    />
                    <ResultPill 
                      icon={Stamp} 
                      label="Our service fee" 
                      value={getVisaInfo(fromCountry, toCountry)?.info.serviceFee || visaResult.serviceFee} 
                      accent 
                      delay={0.25} 
                    />
                    <ResultPill icon={MapPin} label="Your passport" value={fromCountry} delay={0.3} />
                  </div>

                  {/* Advisory note */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/15 px-4 py-3"
                  >
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <p className="text-[11px] leading-relaxed text-amber-300/80">
                      {getVisaInfo(fromCountry, toCountry)?.info.notes || visaResult.bookingNote}
                    </p>
                  </motion.div>

                  {/* Collapsible Sections */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.37 }}
                    className="mt-4 space-y-2"
                  >
                    {/* Documents Accordion */}
                    <button
                      onClick={() => setExpandedDocs(!expandedDocs)}
                      className="w-full flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-left transition-colors hover:bg-white/8"
                    >
                      <span className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-emerald-400/70" />
                        <span className="text-xs font-semibold text-white/80">Documents needed</span>
                      </span>
                      <motion.div
                        animate={{ rotate: expandedDocs ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-3.5 w-3.5 text-white/40" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedDocs && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden rounded-lg bg-white/3 border border-white/8 px-4 py-3"
                        >
                          <ul className="space-y-1.5 text-xs text-white/60">
                            <li className="flex gap-2">
                              <span className="text-emerald-400/60 font-bold">•</span>
                              <span>Valid passport (6+ months)</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-emerald-400/60 font-bold">•</span>
                              <span>Bank statements (last 3 months)</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-emerald-400/60 font-bold">•</span>
                              <span>Accommodation proof</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-emerald-400/60 font-bold">•</span>
                              <span>Flight bookings / return ticket</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-emerald-400/60 font-bold">•</span>
                              <span>Travel insurance</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-emerald-400/60 font-bold">•</span>
                              <span>Proof of employment/studies</span>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Timeline Accordion */}
                    <button
                      onClick={() => setExpandedTimeline(!expandedTimeline)}
                      className="w-full flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-left transition-colors hover:bg-white/8"
                    >
                      <span className="flex items-center gap-2.5">
                        <ListChecks className="h-4 w-4 text-emerald-400/70" />
                        <span className="text-xs font-semibold text-white/80">Your timeline</span>
                      </span>
                      <motion.div
                        animate={{ rotate: expandedTimeline ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-3.5 w-3.5 text-white/40" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedTimeline && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden rounded-lg bg-white/3 border border-white/8 px-4 py-3"
                        >
                          <div className="space-y-2.5 text-xs text-white/60">
                            <div className="flex gap-2">
                              <span className="text-emerald-400/70 font-bold w-6">1.</span>
                              <div>
                                <p className="font-semibold text-white/80">Prepare documents</p>
                                <p className="text-white/40 text-[10px]">Recommended: 2 weeks</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-emerald-400/70 font-bold w-6">2.</span>
                              <div>
                                <p className="font-semibold text-white/80">Submit to us for review</p>
                                <p className="text-white/40 text-[10px]">We check everything</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-emerald-400/70 font-bold w-6">3.</span>
                              <div>
                                <p className="font-semibold text-white/80">Get feedback & refine</p>
                                <p className="text-white/40 text-[10px]">Fix any issues</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-emerald-400/70 font-bold w-6">4.</span>
                              <div>
                                <p className="font-semibold text-white/80">Submit to embassy</p>
                                <p className="text-white/40 text-[10px]">10–15 business days</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* CTA */}
                  <div className="mt-5 space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link href={applyLink}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-stone-900 shadow-lg transition-all hover:bg-stone-100"
                        >
                          Start my application
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.div>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <Link href="/prepare">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white/10 border border-white/20 py-4 text-sm font-bold text-white hover:bg-white/15 transition-all"
                        >
                          Prepare documents first
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[340px] flex-col items-center justify-center text-center"
                >
                  {/* Decorative passport stack */}
                  <div className="relative mb-8 h-28 w-24">
                    {/* Back card */}
                    <div className="absolute inset-0 translate-x-3 translate-y-2 rotate-6 rounded-2xl border border-white/8 bg-white/5" />
                    {/* Middle card */}
                    <div className="absolute inset-0 translate-x-1.5 translate-y-1 rotate-3 rounded-2xl border border-white/8 bg-white/5" />
                    {/* Front card */}
                    <div className="absolute inset-0 rounded-2xl border border-white/12 bg-white/8 flex flex-col items-center justify-center gap-2">
                      <Globe2 className="h-7 w-7 text-white/20" />
                      <div className="space-y-1.5 px-4 w-full">
                        <div className="h-1 w-full rounded-full bg-white/10" />
                        <div className="h-1 w-3/4 rounded-full bg-white/6" />
                      </div>
                    </div>
                    {/* Stamp badge */}
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                      <Stamp className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>

                  <p
                    className="text-lg font-bold text-white/60 leading-snug"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Your results
                    <br />
                    <span className="italic text-white/25 font-normal">appear here</span>
                  </p>
                  <p className="mt-3 max-w-[200px] text-xs text-white/25 leading-relaxed">
                    Select both countries on the left to see your visa summary.
                  </p>

                  {/* Skeleton shimmer */}
                  <div className="mt-8 w-full space-y-2 opacity-20">
                    {[100, 75, 75].map((w, i) => (
                      <div
                        key={i}
                        className="h-10 animate-pulse rounded-xl bg-white/10"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom stats strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 overflow-hidden rounded-2xl border border-white/8"
        >
          {[
            { n: "1,247+", label: "Applications" },
            { n: "15", label: "Countries" },
            { n: "98%", label: "Approval rate" },
            { n: "< 2h", label: "Response time" },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col items-center py-5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <span
                className="text-2xl font-black text-white tracking-tight leading-none"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {n}
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}