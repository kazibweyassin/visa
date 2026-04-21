"use client";

import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { pricingPlans } from "@/lib/visa-data";

const planFeatures: Record<string, string[]> = {
  basic: ["Checklist guidance", "Form review", "Email support"],
  pro: ["Everything in Basic", "Interview preparation", "Resubmission support"],
  express: ["Everything in Pro", "Priority queue", "48-hour turnaround"],
};

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[var(--surface)] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,209,102,0.10),_transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--muted)] bg-[var(--muted)] px-4 py-2 text-xs text-[var(--primary)]">
            <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
            Transparent pricing
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">Choose the right support tier.</h2>
          <p className="mt-3 text-base text-[var(--primary)]/80">
            Government or consulate fees are paid separately and are not included below.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={
                plan.key === "pro"
                  ? "relative rounded-[2rem] border border-[var(--gold)]/35 bg-[linear-gradient(135deg,var(--gold),var(--secondary),var(--surface))] p-7 shadow-2xl shadow-[var(--gold)]/20"
                  : "rounded-[2rem] border border-[var(--muted)] bg-[var(--muted)] p-7 shadow-2xl shadow-black/10"
              }
            >
              {plan.key === "pro" && (
                <span className="absolute -top-3 right-6 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                  Best Value
                </span>
              )}
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]/80">{plan.name}</p>
              <p className="mt-4 text-4xl font-semibold text-[var(--foreground)]">{plan.price}</p>
              <p className="mt-3 text-sm text-[var(--primary)]/80">{plan.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-[var(--primary)]/90">
                {planFeatures[plan.key].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/apply?plan=${encodeURIComponent(plan.key)}`}
                className={
                  plan.key === "pro"
                    ? "mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950 transition hover:bg-[#F7E2A2]"
                    : "mt-6 inline-flex h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white transition hover:bg-white/10"
                }
              >
                Start with {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
