"use client";

import { Check, Minus, X } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

const comparisonRows = [
  {
    label: "Document checklist clarity",
    selfApply: false,
    brand: true,
    western: true,
  },
  {
    label: "Local payment options (MTN, Airtel, M-Pesa)",
    selfApply: false,
    brand: true,
    western: false,
  },
  {
    label: "Consulate-specific guidance",
    selfApply: false,
    brand: true,
    western: "partial" as const,
  },
  {
    label: "WhatsApp-first support",
    selfApply: false,
    brand: true,
    western: false,
  },
  {
    label: "Interview preparation",
    selfApply: false,
    brand: true,
    western: true,
  },
  {
    label: "Document audit by a human expert",
    selfApply: false,
    brand: true,
    western: false,
  },
  {
    label: "Resubmission support after rejection",
    selfApply: false,
    brand: true,
    western: "partial" as const,
  },
  {
    label: "East African passport expertise",
    selfApply: false,
    brand: true,
    western: false,
  },
];

type CellValue = boolean | "partial";

function Cell({ value }: { value: CellValue }) {
  if (value === "partial") {
    return (
      <div className="flex items-center justify-center">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
          <Minus className="h-3.5 w-3.5 text-amber-500" />
        </span>
      </div>
    );
  }
  if (value === true) {
    return (
      <div className="flex items-center justify-center">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50">
        <X className="h-3.5 w-3.5 text-rose-400" />
      </span>
    </div>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-[var(--surface)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[rgba(120,119,198,0.08)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
            Why {siteConfig.name}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            A modern alternative to going it alone or using platforms built for Western applicants.
          </h2>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_repeat(3,0.87fr)] border-b border-slate-200 bg-slate-50 px-1">
            <div className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Capability
            </div>
            {["On your own", siteConfig.name, "Western platforms"].map((col, i) => (
              <div
                key={col}
                className={`px-3 py-4 text-center text-xs font-semibold uppercase tracking-wider ${i === 1 ? "text-[var(--primary)]" : "text-slate-400"}`}
              >
                {col}
                {i === 1 && (
                  <span className="ml-1.5 rounded-full bg-[var(--primary)] px-1.5 py-0.5 text-[9px] font-bold text-white">US</span>
                )}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {comparisonRows.map((row, index) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="grid grid-cols-[1.4fr_repeat(3,0.87fr)] border-b border-slate-100 px-1 last:border-b-0 hover:bg-slate-50/60"
            >
              <div className="px-4 py-3.5 text-sm text-slate-700">{row.label}</div>
              <Cell value={row.selfApply} />
              <Cell value={row.brand} />
              <Cell value={row.western} />
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
          {[
            { icon: <Check className="h-3 w-3 text-emerald-600" />, label: "Included", bg: "bg-emerald-50" },
            { icon: <Minus className="h-3 w-3 text-amber-500" />, label: "Partial / limited", bg: "bg-amber-50" },
            { icon: <X className="h-3 w-3 text-rose-400" />, label: "Not available", bg: "bg-rose-50" },
          ].map(({ icon, label, bg }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full ${bg}`}>{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}