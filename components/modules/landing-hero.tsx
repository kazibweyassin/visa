"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site";
import { africanCountries, schengenCountries, travelPurposes } from "@/lib/visa-data";

const paymentTags = ["UGX", "NGN", "KES"];

export function LandingHero() {
  const [purpose, setPurpose] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [travelStart, setTravelStart] = useState("");
  const [travelEnd, setTravelEnd] = useState("");
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);

  const applyLink = useMemo(() => {
    const params = new URLSearchParams({
      purpose,
      from: fromCountry,
      to: toCountry,
      start: travelStart,
      end: travelEnd,
    });
    return `/apply?${params.toString()}`;
  }, [purpose, fromCountry, toCountry, travelStart, travelEnd]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!purpose || !fromCountry || !toCountry || !travelStart || !travelEnd) {
      setError("Complete all fields to see requirements.");
      setShowResult(false);
      return;
    }
    if (travelEnd < travelStart) {
      setError("End date must be after start date.");
      setShowResult(false);
      return;
    }
    setError("");
    setShowResult(true);
  };

  return (
    <main className="relative overflow-hidden bg-[#0B1324] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,42,68,0.32),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(244,193,93,0.14),_transparent_26%),linear-gradient(180deg,#0b1324_0%,#0b1324_55%,#0a1020_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">

          {/* Left column — single motion wrapper */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-[#F4C15D]" />
              Ailes Global turns your documents into a consulate-ready packet
            </div>

            {/* Outcome-led headline */}
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Get your Schengen visa approved,the first time.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              {siteConfig.description} Upload your documents, let AI flag gaps before submission, and
              generate a consulate documents.
            </p>

            <div className="mt-8" id="start">
              <Link
                href="/apply"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#F4C15D,#E8A949)] px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-[#F4C15D]/25 transition hover:-translate-y-0.5"
              >
                {siteConfig.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right column — requirements card */}
          <motion.aside
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
              {/* Card header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Requirements check
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Find out what you need
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Live
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4"
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                  >
                    <option value="">Select purpose</option>
                    {travelPurposes.map((item) => (
                      <option key={item} value={item} className="text-slate-950">
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Where from?
                    </label>
                    <select
                      value={fromCountry}
                      onChange={(e) => setFromCountry(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="">Select country</option>
                      {africanCountries.map((c) => (
                        <option key={c} value={c} className="text-slate-950">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Where to?
                    </label>
                    <select
                      value={toCountry}
                      onChange={(e) => setToCountry(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="">Select destination</option>
                      {schengenCountries.map((c) => (
                        <option key={c} value={c} className="text-slate-950">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Start date
                    </label>
                    <input
                      type="date"
                      value={travelStart}
                      onChange={(e) => setTravelStart(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      End date
                    </label>
                    <input
                      type="date"
                      value={travelEnd}
                      onChange={(e) => setTravelEnd(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#F4C15D,#E8A949)] text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                >
                  See requirements
                  <ArrowRight className="h-4 w-4" />
                </button>

                {error && (
                  <p className="text-xs font-semibold text-rose-300">{error}</p>
                )}
              </form>

              {/* Result — only shown after valid submission */}
              {showResult && (
                <div className="mt-4 rounded-2xl border border-[#F4C15D]/20 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">
                    You will need a Schengen visa for {toCountry}.
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Estimated processing time: 10–15 business days. Purpose:{" "}
                    <span className="text-white">{purpose}</span>.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                      {fromCountry} → {toCountry}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                      {travelStart} → {travelEnd}
                    </span>
                  </div>
                  <Link
                    href={applyLink}
                    className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-slate-950 transition hover:bg-[#F7E2A2]"
                  >
                    Start application <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}

              {/* Payment currency tags — labelled */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">Pay in:</span>
                {paymentTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </section>
      </div>
    </main>
  );
}