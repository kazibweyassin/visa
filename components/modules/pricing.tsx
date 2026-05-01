"use client";

import Link from "next/link";
import { CheckCircle2, X, ArrowUpRight, Zap, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { pricingPlans } from "@/lib/visa-data";

const planMatrix = {
  basic: {
    included: [
      "Document checklist guidance",
      "Application form review",
      "Email support (24hr response)",
    ],
    excluded: [
      "Interview preparation",
      "Resubmission support",
      "Priority queue",
      "48-hr turnaround",
    ],
  },
  pro: {
    included: [
      "Everything in Basic",
      "Cover letter assistance",
      "Interview preparation",
      "Resubmission support",
      "WhatsApp support",
    ],
    excluded: ["Priority queue", "48-hr turnaround"],
  },
  express: {
    included: [
      "Everything in Pro",
      "Priority processing queue",
      "48-hour turnaround",
      "Dedicated case handler",
      "Same-day document audit",
    ],
    excluded: [],
  },
};

const planMeta = {
  basic: {
    icon: Star,
    badge: null,
    highlight: false,
    cardStyle: "bg-white border-stone-200",
    priceColor: "text-stone-900",
    ctaStyle: "bg-stone-900 text-white hover:bg-stone-800 shadow-md shadow-stone-900/15",
    tagStyle: null,
  },
  pro: {
    icon: Sparkles,
    badge: "Most popular",
    highlight: true,
    cardStyle: "bg-stone-900 border-stone-800",
    priceColor: "text-white",
    ctaStyle: "bg-emerald-500 text-white hover:bg-emerald-400 shadow-md shadow-emerald-500/30",
    tagStyle: "bg-emerald-500 text-white",
  },
  express: {
    icon: Zap,
    badge: "Fastest",
    highlight: false,
    cardStyle: "bg-white border-stone-200",
    priceColor: "text-stone-900",
    ctaStyle: "bg-stone-900 text-white hover:bg-stone-800 shadow-md shadow-stone-900/15",
    tagStyle: "bg-amber-400 text-stone-900",
  },
};

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#faf9f7] py-24 sm:py-32"
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #d6d3ce 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/50 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-emerald-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Transparent pricing
          </span>
          <h2
            className="mt-5 text-4xl font-black text-stone-900 sm:text-5xl leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Simple, honest
            <br />
            <span className="italic font-bold text-stone-400">pricing.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-stone-400 leading-relaxed">
            Government and consulate fees are paid separately. Our fee covers preparation and guidance only.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid gap-5 lg:grid-cols-3 items-stretch">
          {pricingPlans.map((plan, index) => {
            const meta = planMeta[plan.key as keyof typeof planMeta];
            const features = planMatrix[plan.key as keyof typeof planMatrix];
            const Icon = meta.icon;
            const dark = meta.highlight;

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col rounded-3xl border p-8 ${meta.cardStyle} ${
                  dark ? "shadow-2xl shadow-stone-900/30" : "shadow-sm"
                }`}
              >
                {/* Badge */}
                {meta.badge && meta.tagStyle && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[11px] font-bold shadow-md whitespace-nowrap ${meta.tagStyle}`}>
                    {meta.badge}
                  </span>
                )}

                {/* Plan header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${
                      dark ? "bg-white/10" : "bg-stone-100"
                    }`}>
                      <Icon className={`h-4 w-4 ${dark ? "text-white/70" : "text-stone-500"}`} />
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${
                      dark ? "text-white/40" : "text-stone-400"
                    }`}>
                      {plan.name}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span
                    className={`text-5xl font-black tracking-tight leading-none ${meta.priceColor}`}
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className={`ml-2 text-sm ${dark ? "text-white/30" : "text-stone-400"}`}>
                    one-time
                  </span>
                </div>
                <p className={`mb-7 text-sm leading-relaxed ${dark ? "text-white/45" : "text-stone-400"}`}>
                  {plan.description}
                </p>

                {/* Divider */}
                <div className={`mb-6 h-px ${dark ? "bg-white/10" : "bg-stone-100"}`} />

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {features.included.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.04 + 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        dark ? "bg-emerald-500/20" : "bg-emerald-50"
                      }`}>
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className={`text-sm leading-snug ${dark ? "text-white/75" : "text-stone-700"}`}>
                        {f}
                      </span>
                    </motion.li>
                  ))}
                  {features.excluded.map((f) => (
                    <li key={f} className="flex items-start gap-3 opacity-30">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        dark ? "bg-white/8" : "bg-stone-100"
                      }`}>
                        <X className={`h-3 w-3 ${dark ? "text-white" : "text-stone-400"}`} />
                      </div>
                      <span className={`text-sm leading-snug line-through ${dark ? "text-white/50" : "text-stone-400"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/apply?plan=${encodeURIComponent(plan.key)}`}
                  className={`group relative overflow-hidden flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold transition-all duration-300 ${meta.ctaStyle} hover:-translate-y-0.5 active:scale-[0.98]`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start with {plan.name}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left"
        >
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-3 text-xs text-stone-400">
            {[
              "No hidden charges",
              "Embassy fees paid separately",
              "Cancel anytime before we start",
              "WhatsApp updates included",
            ].map((note) => (
              <span key={note} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                {note}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}