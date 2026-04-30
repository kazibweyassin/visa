"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Info,
  Stamp,
  Clock,
  BadgePercent,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { africanCountries, schengenCountries } from "@/lib/visa-data";

const visaResult = {
  visaType: "Schengen short-stay (Type C)",
  processingTime: "10–15 business days",
  serviceFee: "$79",
  approvalRate: "98%",
  bookingNote: "Apply at the embassy of the country you'll stay longest in.",
};

/* ── Custom Select ── */
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
  return (
    <div className="group relative">
      <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-400">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-emerald-500" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-stone-200 bg-white py-4 pl-11 pr-10 text-sm text-stone-800 shadow-sm outline-none ring-0 transition-all duration-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 hover:border-stone-300"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-2 rounded-2xl p-4 ${
        accent
          ? "bg-emerald-50 border border-emerald-100"
          : "bg-stone-50 border border-stone-100"
      }`}
    >
      <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${accent ? "bg-emerald-100" : "bg-white border border-stone-100"}`}>
        <Icon className={`h-4 w-4 ${accent ? "text-emerald-600" : "text-stone-400"}`} />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">{label}</p>
        <p className={`mt-0.5 text-sm font-bold ${accent ? "text-emerald-700" : "text-stone-800"}`}>{value}</p>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export function VisaChecker() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = () => {
    if (!fromCountry || !toCountry) {
      setError("Please select both your country and destination.");
      setShowResult(false);
      return;
    }
    setError("");
    setShowResult(true);
  };

  const applyLink = showResult
    ? `/apply?from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}`
    : "/apply";

  return (
    <section
      id="visa-checker"
      className="relative overflow-hidden bg-[#faf9f7] py-24 sm:py-32"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle, #d6d3ce 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Warm glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-100/40 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-600 shadow-sm">
            <Stamp className="h-3.5 w-3.5" />
            Visa Checker
          </span>
          <h2
            className="mt-5 text-4xl font-bold text-stone-900 sm:text-5xl leading-tight tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Know before you go.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-stone-500 leading-relaxed">
            Get an instant visa requirement summary, timeline, and our service fee — in seconds.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-900/5"
        >
          <div className="grid lg:grid-cols-[1fr_1.1fr]">

            {/* ── LEFT: Form ── */}
            <div className="border-b border-stone-100 p-8 sm:p-10 lg:border-b-0 lg:border-r">
              <h3
                className="text-2xl font-bold text-stone-900 leading-snug"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Check your visa requirements
              </h3>
              <p className="mt-2 text-sm text-stone-400 leading-relaxed">
                Select your passport country and destination to get started.
              </p>

              <div className="mt-8 space-y-5">
                <NiceSelect
                  label="I am from"
                  icon={MapPin}
                  value={fromCountry}
                  onChange={setFromCountry}
                  options={africanCountries}
                  placeholder="Select your country"
                />
                <NiceSelect
                  label="I want to visit"
                  icon={Globe2}
                  value={toCountry}
                  onChange={setToCountry}
                  options={schengenCountries}
                  placeholder="Select destination"
                />

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl bg-rose-50 border border-rose-100 px-4 py-3 text-xs font-medium text-rose-600"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="button"
                  onClick={handleCheck}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full overflow-hidden rounded-2xl bg-stone-900 py-4 text-sm font-bold text-white shadow-lg shadow-stone-900/20 transition-all hover:bg-stone-800"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Check my visa requirements
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  {/* Shine sweep */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                </motion.button>
              </div>

              {/* Trust line */}
              <div className="mt-8 flex items-center gap-6 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Instant results
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Confidential
                </span>
              </div>
            </div>

            {/* ── RIGHT: Result ── */}
            <div className="relative p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {/* Route header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                        <Globe2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400">Visa Summary</p>
                        <p className="text-base font-bold text-stone-900">
                          {fromCountry} → {toCountry}
                        </p>
                      </div>
                    </div>

                    {/* Visa type banner */}
                    <div className="mb-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">Visa Required</p>
                      <p className="text-base font-bold text-blue-900">{visaResult.visaType}</p>
                    </div>

                    {/* Stats 2×2 grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <StatCard icon={Clock} label="Processing" value={visaResult.processingTime} />
                      <StatCard icon={BadgePercent} label="Approval rate" value={visaResult.approvalRate} accent />
                      <StatCard icon={MapPin} label="Your country" value={fromCountry} />
                      <StatCard icon={Stamp} label="Service fee" value={visaResult.serviceFee} accent />
                    </div>

                    {/* Note */}
                    <div className="mb-5 flex items-start gap-2.5 rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <p className="text-xs leading-relaxed text-amber-800">{visaResult.bookingNote}</p>
                    </div>

                    {/* CTA */}
                    <Link href={applyLink}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600"
                      >
                        Start my application
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full min-h-[360px] flex-col items-center justify-center text-center"
                  >
                    {/* Passport illustration placeholder */}
                    <div className="relative mb-6">
                      <div className="h-24 w-20 rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 border-2 border-stone-200 flex items-center justify-center shadow-inner">
                        <Globe2 className="h-8 w-8 text-stone-300" />
                      </div>
                      <div className="absolute -right-3 -top-2 h-8 w-7 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center">
                        <Stamp className="h-4 w-4 text-emerald-400" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-stone-700" style={{ fontFamily: "'Georgia', serif" }}>
                      Your results will appear here
                    </p>
                    <p className="mt-2 max-w-xs text-sm text-stone-400 leading-relaxed">
                      Select your passport country and destination to see processing times, fees, and next steps.
                    </p>

                    {/* Skeleton preview */}
                    <div className="mt-8 w-full space-y-2.5 opacity-40">
                      <div className="h-14 w-full animate-pulse rounded-2xl bg-stone-100" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-16 animate-pulse rounded-2xl bg-stone-100" />
                        <div className="h-16 animate-pulse rounded-2xl bg-stone-100" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-stone-400"
        >
          {[
            "1,247 applications processed",
            "15 countries covered",
            "98% first-time approval rate",
            "Expert document review included",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}