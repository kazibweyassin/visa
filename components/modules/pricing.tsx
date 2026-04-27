"use client";

import Link from "next/link";
import { CheckCircle2, HelpCircle, ShieldCheck, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { pricingPlans } from "@/lib/visa-data";

// Richer feature matrix — clearly shows what's included/excluded per tier
const planMatrix = {
  basic: {
    included: [
      "Document checklist guidance",
      "Application form review",
      "Email support (24hr response)",
    ],
    excluded: ["Interview preparation", "Resubmission support", "Priority queue", "48-hr turnaround"],
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

const planColors = {
  basic:   { badge: "", card: "border-slate-200", cta: "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white !text-white transition hover:-translate-y-0.5 hover:bg-[var(--secondary)]" },
  pro:     { badge: "Best Value", card: "border-[var(--primary)]/25 shadow-lg shadow-[var(--primary)]/8", cta: "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white !text-white transition hover:-translate-y-0.5 hover:bg-[var(--secondary)]" },
  express: { badge: "Fastest", card: "border-[var(--gold)]/30", cta: "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white !text-white transition hover:-translate-y-0.5 hover:bg-[var(--secondary)]" },
};

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[var(--surface)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[rgba(255,209,102,0.10)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-[var(--primary)] shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
            Transparent pricing — no surprises
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Choose the right support tier.
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Government and consulate fees are paid separately and are not included below.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const colors = planColors[plan.key as keyof typeof planColors];
            const features = planMatrix[plan.key as keyof typeof planMatrix];

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col rounded-[2rem] border bg-white p-7 shadow-sm ${colors.card}`}
              >
                {/* Badge */}
                {colors.badge && (
                  <span className="absolute -top-3 right-6 rounded-full bg-[var(--gold)] px-3 py-1 text-[11px] font-bold text-slate-900 shadow-md">
                    {colors.badge}
                  </span>
                )}

                {/* Plan name & price */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">{plan.name}</p>
                <p className="mt-3 text-5xl font-bold text-slate-900 tracking-tight">{plan.price}</p>
                <p className="mt-2 text-sm text-slate-500">{plan.description}</p>

                {/* Divider */}
                <div className="my-5 border-t border-slate-100" />

                {/* Included features */}
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {features.included.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                  {features.excluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 opacity-40">
                      <X className="mt-0.5 h-4 w-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/apply?plan=${encodeURIComponent(plan.key)}`}
                  className={`mt-7 ${colors.cta}`}
                >
                  Start with {plan.name}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-8 flex items-start justify-center gap-2 text-center text-xs text-slate-400">
          <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Consulate and government fees (€90 for Schengen, etc.) are paid directly to the embassy — not to us. Our fee covers preparation and guidance only.
          </span>
        </div>
      </div>
    </section>
  );
}