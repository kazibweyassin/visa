"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { africanCountries, schengenCountries } from "@/lib/visa-data";

const visaResult = {
  visaType: "Schengen short-stay (Type C)",
  processingTime: "10-15 business days",
  serviceFee: "$79",
  approvalRate: "98% when document-ready",
};

export function VisaChecker() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = () => {
    if (!fromCountry || !toCountry) {
      setError("Select both origin and destination countries to continue.");
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
    <section id="visa-checker" className="relative overflow-hidden bg-[#0B1324] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(247,213,111,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.14),_transparent_35%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">
            <ShieldCheck className="h-4 w-4 text-[#F4C15D]" />
            Visa checker
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
            Confirm your Schengen visa requirements in seconds.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Pick your citizenship and destination to get an instant requirement summary, timeline,
            and estimated service fee.
          </p>
          <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                I am from
              </label>
              <select
                value={fromCountry}
                onChange={(event) => setFromCountry(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-[#F4C15D]/60"
              >
                <option value="">Select country</option>
                {africanCountries.map((country) => (
                  <option key={country} value={country} className="text-slate-950">
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                I want to visit
              </label>
              <select
                value={toCountry}
                onChange={(event) => setToCountry(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-[#F4C15D]/60"
              >
                <option value="">Select destination</option>
                {schengenCountries.map((country) => (
                  <option key={country} value={country} className="text-slate-950">
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleCheck}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#F4C15D,#E8A949)] text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              Check my visa
              <ArrowRight className="h-4 w-4" />
            </button>
            {error && <p className="text-xs font-semibold text-rose-200">{error}</p>}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#F4C15D]/20 via-transparent to-[#3CC7A6]/12 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4C15D]/10 text-[#F4C15D]">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Instant summary</p>
                <p className="text-lg font-semibold text-white">Results preview</p>
              </div>
            </div>

            <AnimatePresence>
              {showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 space-y-4"
                >
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p className="text-sm font-semibold text-emerald-100">Visa required</p>
                    <p className="mt-2 text-sm text-slate-200">
                      {visaResult.visaType} for {toCountry} departures.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {[
                      { label: "Processing time", value: visaResult.processingTime },
                      { label: "Service fee", value: visaResult.serviceFee },
                      { label: "Approval rate", value: visaResult.approvalRate },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
                      >
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-semibold text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    Document audit included for Pro and Express plans.
                  </div>
                  <Link
                    href={applyLink}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950 transition hover:bg-[#F7E2A2]"
                  >
                    Start application
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-6 text-center"
                >
                  <p className="text-sm text-slate-300">
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
