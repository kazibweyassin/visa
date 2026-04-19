"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Do you guarantee visa approval?",
    answer:
      "No. Final decisions are made solely by consular authorities. We focus on preparation quality.",
  },
  {
    question: "How is this different from applying myself?",
    answer:
      "We organize your documents, highlight issues early, and guide you through interview readiness.",
  },
  {
    question: "Which payment methods do you accept?",
    answer: "Cards, bank transfers, and mobile-friendly payments depending on your region.",
  },
  {
    question: "How long does the Schengen visa process take?",
    answer: "Typical processing is 10-15 business days after submission, depending on the consulate.",
  },
  {
    question: "What if my visa is rejected?",
    answer: "Pro and Express plans include resubmission support with a deeper document review.",
  },
  {
    question: "Do you help with consulate appointments?",
    answer: "Yes. We provide appointment guidance and checklist preparation for your visit.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#0B1324] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(247,213,111,0.12),_transparent_40%)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#F4C15D]">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Answers to common questions.</h2>
          <p className="mt-3 text-base text-slate-300">
            Get clarity on timelines, approvals, and support expectations.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={item.question}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] backdrop-blur-xl"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white"
              >
                {item.question}
                <ChevronDown
                  className={`h-5 w-5 transition ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5"
                  >
                    <p className="pb-4 text-sm leading-6 text-slate-300">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
