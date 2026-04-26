"use client";

import { CheckCircle2, FileText, MessageCircle, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const signals = [
  {
    title: "Document vault",
    description: "Secure uploads with structured checklists.",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Human review",
    description: "Every packet checked before submission.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    title: "Local payments",
    description: "Pay in UGX, KES, NGN, or USD.",
    icon: Wallet,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "WhatsApp support",
    description: "Real humans, every step of the way.",
    icon: MessageCircle,
    color: "text-[#25D366]",
    bg: "bg-green-50",
  },
  {
    title: "Consulate-ready",
    description: "Aligned with Schengen requirements.",
    icon: CheckCircle2,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[var(--surface)] py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${signal.bg}`}>
                <signal.icon className={`h-4 w-4 ${signal.color}`} />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-slate-800">{signal.title}</p>
                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">{signal.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}