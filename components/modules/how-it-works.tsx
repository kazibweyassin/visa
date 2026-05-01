"use client";

import { FileText, Plane, ShieldCheck, Wallet, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const steps = [
  {
    title: "Share your trip profile",
    description: "Complete a 5-minute form that captures your route, purpose, and timeline.",
    icon: FileText,
    number: "01",
  },
  {
    title: "Pay securely",
    description: "Settle the service fee with card, bank transfer, or mobile money (MTN, Airtel, M-Pesa).",
    icon: Wallet,
    number: "02",
  },
  {
    title: "Document prep & audit",
    description: "We review your documents, align them with consulate rules, and flag any gaps before submission.",
    icon: ShieldCheck,
    number: "03",
  },
  {
    title: "Consulate appointment",
    description: "Attend your appointment with a complete packet and clear interview preparation.",
    icon: Plane,
    number: "04",
  },
];

const connectorVariant: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--bg)" }}>
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border-1)" }} />
      <div className="dot-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center mb-16"
        >
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            How it works
          </span>
          <h2
            className="mt-5 font-black leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3rem)", fontFamily: "var(--font-serif)", color: "var(--text-1)" }}
          >
            A guided, verified route
            <br />
            <span style={{ color: "var(--text-3)", fontStyle: "italic", fontWeight: 700 }}>
              to your visa.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
            Every step is designed to reduce mistakes and improve your submission quality.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="relative hidden lg:block">
          {/* Connector line */}
          <motion.div
            className="absolute top-[2.6rem] h-px"
            style={{
              left: "calc(12.5% + 1.5rem)",
              right: "calc(12.5% + 1.5rem)",
              background: "var(--border-2)",
              originX: 0,
            }}
            variants={connectorVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col rounded-2xl p-5 transition-all duration-300"
                style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)" }}
              >
                {/* Icon container with step number */}
                <div className="relative mb-5 w-fit">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)" }}
                  >
                    <step.icon className="h-5 w-5" style={{ color: "var(--text-2)" }} />
                  </div>
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black"
                    style={{ background: "var(--green)", color: "#000" }}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Step number label */}
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-3)" }}>
                  {step.number}
                </span>

                <h3 className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{step.title}</h3>
                <p className="mt-2 text-xs leading-5" style={{ color: "var(--text-3)" }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-3 lg:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex gap-4 rounded-2xl p-5"
              style={{ border: "1px solid var(--border-2)", background: "var(--bg-2)" }}
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)" }}>
                <step.icon className="h-5 w-5" style={{ color: "var(--text-2)" }} />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black" style={{ background: "var(--green)", color: "#000" }}>
                  {index + 1}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: "var(--text-3)" }}>{step.number}</p>
                <h3 className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{step.title}</h3>
                <p className="mt-1 text-sm leading-5" style={{ color: "var(--text-3)" }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/apply"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{ background: "var(--green)", color: "#000" }}
          >
            Start your application
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <p className="mt-3 text-xs" style={{ color: "var(--text-3)" }}>
            Takes 5 minutes. No obligation until payment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}