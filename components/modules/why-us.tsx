"use client";

import { Check, X } from "lucide-react";
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
    label: "Local payment options",
    selfApply: false,
    brand: true,
    western: false,
  },
  {
    label: "Consulate-specific guidance",
    selfApply: false,
    brand: true,
    western: true,
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
    label: "Document audit with expert review",
    selfApply: false,
    brand: true,
    western: false,
  },
];

const iconClasses = {
  yes: "text-emerald-300",
  no: "text-rose-300",
};

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-[#0B1324] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(120,119,198,0.16),_transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#F4C15D]">Why {siteConfig.name}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            A modern alternative to self-applying or western-only platforms.
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="grid grid-cols-[1.2fr_repeat(3,0.9fr)] border-b border-white/10 text-xs uppercase tracking-[0.3em] text-slate-400">
            <div className="px-5 py-4">Capability</div>
            <div className="px-5 py-4 text-center">On your own</div>
            <div className="px-5 py-4 text-center">{siteConfig.name}</div>
            <div className="px-5 py-4 text-center">Western platforms</div>
          </div>
          {comparisonRows.map((row, index) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="grid grid-cols-[1.2fr_repeat(3,0.9fr)] border-b border-white/10 text-sm last:border-b-0"
            >
              <div className="px-5 py-4 text-slate-200">{row.label}</div>
              <div className="flex items-center justify-center px-5 py-4">
                {row.selfApply ? (
                  <Check className={`h-5 w-5 ${iconClasses.yes}`} />
                ) : (
                  <X className={`h-5 w-5 ${iconClasses.no}`} />
                )}
              </div>
              <div className="flex items-center justify-center px-5 py-4">
                {row.brand ? (
                  <Check className={`h-5 w-5 ${iconClasses.yes}`} />
                ) : (
                  <X className={`h-5 w-5 ${iconClasses.no}`} />
                )}
              </div>
              <div className="flex items-center justify-center px-5 py-4">
                {row.western ? (
                  <Check className={`h-5 w-5 ${iconClasses.yes}`} />
                ) : (
                  <X className={`h-5 w-5 ${iconClasses.no}`} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
