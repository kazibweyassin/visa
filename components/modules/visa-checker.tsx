"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, Info, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { africanCountries, schengenCountries } from "@/lib/visa-data";

// Static result — replace with real API when available
const visaResult = {
  visaType: "Schengen short-stay (Type C)",
  processingTime: "10–15 business days",
  serviceFee: "$79",
  approvalRate: "98% when document-ready",
  bookingNote: "Apply at the embassy of the country you'll stay longest in.",
};

export function VisaChecker() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = () => {
    if (!fromCountry || !toCountry) {
      setError("Select both your country and destination to continue.");
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
    <section id="visa-checker" className="relative overflow-hidden bg-[var(--surface)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[rgba(255,209,102,0.06)]" />

      <div className="relative mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* ── Left: heading + form ── */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-[var(--primary)] shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
            Visa checker
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Confirm your Schengen visa requirements in seconds.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-500">
            Pick your citizenship and destination to get an instant requirement summary, timeline, and service fee.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {[
              {
                id: "from",
                label: "I am from",
                value: fromCountry,
                set: setFromCountry,
                options: africanCountries,
                placeholder: "Select country",
              },
              {
                id: "to",
                label: "I want to visit",
                value: toCountry,
                set: setToCountry,
                options: schengenCountries,
                placeholder: "Select destination",
              },
            ].map(({ id, label, value, set, options, placeholder }) => (
              <div key={id}>
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {label}
                </label>
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/10"
                >
                  <option value="">{placeholder}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}

            <button
              type="button"
              onClick={handleCheck}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            >
              <span className="flex items-center gap-2">
                Check my visa
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>

            {error && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</p>
            )}
          </div>
        </div>

        {/* ── Right: result panel ── */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[var(--primary)]/10 blur-2xl" />
          <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Instant summary</p>
                <p className="text-lg font-semibold text-slate-900">Results preview</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-3"
                >
                  {/* Visa type banner */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm font-semibold text-blue-800">Visa required — {toCountry}</p>
                    <p className="mt-1 text-xs text-blue-600">{visaResult.visaType}</p>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: "Processing time", value: visaResult.processingTime },
                      { label: "Service fee", value: visaResult.serviceFee },
                      { label: "Approval rate", value: visaResult.approvalRate },
                      { label: "Origin", value: fromCountry },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
                      >
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">{item.label}</p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-900 truncate">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Info note */}
                  <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {visaResult.bookingNote}
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                    Document audit included in Pro and Express plans.
                  </div>

                  <Link
                    href={applyLink}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                  >
                    <span className="flex items-center gap-2">
                      Start application
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center"
                >
                  <Globe className="h-8 w-8 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-400">
                    Select your countries to see processing timelines, fees, and next steps.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}