"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { africanCountries, schengenCountries, travelPurposes } from "@/lib/visa-data";

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
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.12),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/world-map.svg')] bg-no-repeat bg-center bg-contain" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">

          {/* LEFT */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            {/* Badge */}
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-[var(--gold)]/25 bg-[rgba(248,180,62,0.1)] px-4 py-2 text-xs backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
              <span>Expert-reviewed applications</span>
              <span>Business travel planning</span>
              <span>Trusted across Africa</span>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Visa-ready business travel for African professionals.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
              We prepare, review, and position your visa application for approval — while you focus on international opportunities, deals, and growth.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">

              {/* PRIMARY CTA */}
              <Link
                href="/apply"
                className="
                  group relative inline-flex h-12 items-center justify-center gap-2
                  overflow-hidden rounded-xl
                  bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700
                  px-6 text-sm font-semibold text-white
                  shadow-md shadow-blue-500/20
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30
                  active:scale-[0.98]
                "
              >
                {/* Shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center gap-2">
                  Start your visa preparation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              {/* SECONDARY CTA */}
              <Link
                href="#visa-checker"
                className="
                  group inline-flex h-12 items-center justify-center gap-2
                  rounded-xl border border-slate-200 bg-white px-5
                  text-sm font-semibold text-slate-700
                  transition-all duration-300
                  hover:bg-slate-50 hover:-translate-y-0.5 hover:text-slate-900
                "
              >
                Check visa requirements
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

            </div>

            <p className="mt-6 max-w-xl text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              High approval focus • Professional documentation • End-to-end guidance
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.aside
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >

            {/* Glow */}
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-blue-200/40 to-yellow-100/40 blur-2xl opacity-60" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Visa assessment
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Start your visa assessment
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Get a personalized checklist and expert guidance.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">

                {/* Your existing inputs stay unchanged */}

                <button
                  type="submit"
                  className="
                    inline-flex h-12 items-center justify-center gap-2
                    rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
                    px-6 text-sm font-semibold text-slate-950
                    shadow-md shadow-amber-200/40
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:shadow-lg
                    active:scale-[0.98]
                  "
                >
                  Get my visa requirements
                  <ArrowRight className="h-4 w-4" />
                </button>

                {error && (
                  <p className="text-xs font-semibold text-rose-600">
                    {error}
                  </p>
                )}
              </form>

              {/* RESULT */}
              {showResult && (
                <div className="mt-4 rounded-2xl border border-amber-200/30 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    You will need a Schengen visa for {toCountry}.
                  </p>

                  <Link
                    href={applyLink}
                    className="
                      mt-4 inline-flex h-11 items-center justify-center gap-2
                      rounded-full bg-[var(--primary)] px-5
                      text-xs font-semibold text-white
                    "
                  >
                    Start application
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}

            </div>
          </motion.aside>

        </section>
      </div>
    </main>
  );
}