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
        <div className="absolute inset-0 bg-[rgba(59,130,246,0.06)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[url('/bg_premium.png')] bg-no-repeat bg-center bg-cover" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-[var(--primary)]/30" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-6 pt-6 sm:px-6 lg:px-8">

        <section className="grid items-center gap-6 py-6 lg:gap-8 lg:py-8">

          {/* LEFT */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            {/* Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--gold)]/25 bg-[rgba(248,180,62,0.1)] px-3 py-2 text-xs text-slate-800 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
              Trusted visa advisory for business travel
            </div>

            {/* Title */}
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Visa-ready business travel for African professionals.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              We prepare, review, and position your visa application for approval so you can travel with confidence.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">

              {/* PRIMARY CTA */}
              <Link
                href="/apply"
                className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
              >
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

            <p className="mt-4 max-w-xl text-sm font-medium uppercase tracking-[0.24em] text-slate-500 sm:block hidden">
              High approval focus • Professional documentation • End-to-end guidance
            </p>
          </motion.div>


        </section>
      </div>
    </main>
  );
}