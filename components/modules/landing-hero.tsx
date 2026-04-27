"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function LandingHero() {
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/25 bg-[rgba(248,180,62,0.12)] px-3 py-2 text-xs text-slate-900">
              <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
              Schengen visa preparation for African professionals
            </div>

            {/* Title */}
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Schengen visa approval support for African professionals.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              We prepare your documents, review your case, and position your application for approval while you focus on deals and international travel.
            </p>

            {/* CTA */}
            <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">

              {/* PRIMARY CTA */}
              <Link
                href="/apply"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                <span className="relative flex items-center gap-2">
                  Start your visa preparation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

            </div>

            <p className="mt-6 max-w-xl text-sm leading-6 text-slate-600">
              Trusted by African professionals for document-ready Schengen visa submissions, consulate-aware guidance, and local payment support.
            </p>
          </motion.div>


        </section>
      </div>
    </main>
  );
}