"use client";

import { CheckCircle2, FileText, MessageCircle, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const signals = [
  {
    title: "Document vault",
    description: "Secure uploads with structured checklists.",
    icon: FileText,
  },
  {
    title: "Human review",
    description: "Every packet checked before submission.",
    icon: ShieldCheck,
  },
  {
    title: "Local payments",
    description: "Pay in your preferred currency.",
    icon: Wallet,
  },
  {
    title: "WhatsApp support",
    description: "Guidance on every step.",
    icon: MessageCircle,
  },
  {
    title: "Consulate-ready",
    description: "Aligned with Schengen requirements.",
    icon: CheckCircle2,
  },
];

export function TrustBar() {
  return (
    <section className="bg-[var(--surface)] py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-[2rem] border border-[var(--muted)] bg-[var(--muted)] p-4 text-sm text-[var(--primary)] shadow-2xl shadow-black/10 sm:grid-cols-2 lg:grid-cols-5">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-2xl bg-[var(--surface)] px-3 py-3"
            >
              <signal.icon className="h-4 w-4 text-[var(--gold)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{signal.title}</p>
              <p className="mt-1 text-xs text-[var(--primary)]/70">{signal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
