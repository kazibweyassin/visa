"use client";

import { FileText, Plane, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Share your trip profile",
    description: "Complete a 5-minute form that captures your route, purpose, and timeline.",
    icon: FileText,
  },
  {
    title: "Pay securely",
    description: "Settle the service fee with card, transfer, or mobile-friendly payments.",
    icon: Wallet,
  },
  {
    title: "Document prep & audit",
    description: "We review your documents, align them with consulate rules, and flag gaps.",
    icon: ShieldCheck,
  },
  {
    title: "Consulate appointment",
    description: "Attend your appointment with a complete packet and clear interview prep.",
    icon: Plane,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#0B1324] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.18),_transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#F4C15D]">How it works</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            A guided, verified route to your Schengen visa.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Every step is designed to reduce mistakes and improve your submission quality.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-white/10 lg:block" />
          <div className="grid gap-6 lg:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
              >
                <div className="absolute -left-1 top-6 hidden h-3 w-3 rounded-full bg-[#F4C15D] shadow-lg shadow-[#F4C15D]/40 lg:block" />
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C15D]/10 text-[#F4C15D]">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Step {index + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
