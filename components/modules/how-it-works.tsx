"use client";

import { FileText, Plane, ShieldCheck, Wallet, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const steps = [
  {
    title: "Share your trip profile",
    description:
      "Complete a 5-minute form that captures your route, purpose, and timeline.",
    icon: FileText,
    accent: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    title: "Pay securely",
    description:
      "Settle the service fee with card, bank transfer, or mobile money (MTN, Airtel, M-Pesa).",
    icon: Wallet,
    accent: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
  {
    title: "Document prep & audit",
    description:
      "We review your documents, align them with consulate rules, and flag any gaps before submission.",
    icon: ShieldCheck,
    accent: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    title: "Consulate appointment",
    description:
      "Attend your appointment with a complete packet and clear interview preparation.",
    icon: Plane,
    accent: "bg-purple-50 text-purple-600",
    border: "border-purple-100",
  },
];

// ✅ Properly typed variants
const connectorVariant: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* Background radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.06),_transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--gold)]">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            A guided, verified route to your Schengen visa.
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Every step is designed to reduce mistakes and improve your submission
            quality.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="relative mt-16 hidden lg:block">
          {/* Connector line */}
          <motion.div
            className="absolute left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] top-[2.75rem] h-px bg-gradient-to-r from-blue-200 via-amber-200 to-purple-200"
            style={{ originX: 0 }} // ✅ critical for correct animation
            variants={connectorVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className={`flex gap-4 rounded-2xl border ${step.border} bg-white p-5 shadow-sm`}
              >
                {/* Icon */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${step.accent} border ${step.border} shadow-sm`}
                >
                  <step.icon className="h-6 w-6" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-bold text-slate-900 shadow">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="mt-12 space-y-4 lg:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
              }}
              className={`flex gap-4 rounded-2xl border ${step.border} bg-white p-5 shadow-sm`}
            >
              <div
                className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${step.accent} border ${step.border}`}
              >
                <step.icon className="h-5 w-5" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-bold text-slate-900">
                  {index + 1}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/apply"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--secondary)]"
          >
            Start your application
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          <p className="mt-3 text-xs text-slate-400">
            Takes 5 minutes. No obligation until payment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}