"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "Do you guarantee visa approval?",
    answer:
      "No — and any service that does is misleading you. Final visa decisions are made solely by consular authorities. Our role is to maximise your submission quality so you give yourself the best possible chance.",
    category: "Approvals",
  },
  {
    question: "How is this different from applying myself?",
    answer:
      "We provide structured checklists tailored to your passport and destination, identify weak points in your documentation before you submit, and prepare you for the interview. Self-applicants often miss consulate-specific nuances that lead to unnecessary rejections.",
    category: "Service",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept cards, bank transfers, MTN Mobile Money, Airtel Money, M-Pesa, and Flutterwave-supported options. You can pay in UGX, KES, NGN, or USD.",
    category: "Payments",
  },
  {
    question: "How long does the Schengen visa process take?",
    answer:
      "Consulate processing typically takes 10–15 business days after submission. Factor in time for document preparation (3–5 days with our support) and appointment wait times, which can be 2–4 weeks at busy embassies. Apply early.",
    category: "Timelines",
  },
  {
    question: "What if my visa is rejected?",
    answer:
      "Pro and Express plans include resubmission support with a deeper document review and an updated cover letter. We analyse the refusal reason and build a stronger case. Basic plan clients can upgrade for resubmission support.",
    category: "Rejections",
  },
  {
    question: "Do you help with consulate appointments?",
    answer:
      "Yes. We provide guidance on booking VFS or embassy appointments, what to bring, and how to prepare. We don't book on your behalf, but you'll have a clear step-by-step checklist.",
    category: "Appointments",
  },
];

const categoryColors: Record<string, string> = {
  Approvals: "bg-rose-50 text-rose-600",
  Service: "bg-emerald-50 text-emerald-600",
  Payments: "bg-amber-50 text-amber-600",
  Timelines: "bg-purple-50 text-purple-600",
  Rejections: "bg-orange-50 text-orange-600",
  Appointments: "bg-teal-50 text-teal-600",
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[var(--surface)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[rgba(255,209,102,0.08)]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-[var(--gold)]" />
            Frequently asked questions
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Answers to common questions.
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Get clarity on timelines, approvals, and what to expect from our service.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-2.5">
          {faqItems.map((item, index) => (
            <div
              key={item.question}
              className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${openIndex === index ? "border-slate-300 shadow-md" : "border-slate-200 shadow-sm"}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start gap-3 px-5 py-4 text-left"
              >
                <span className={`mt-0.5 shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-semibold ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
                <span className="flex-1 text-sm font-semibold text-slate-800">{item.question}</span>
                <ChevronDown
                  className={`mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="px-5"
                  >
                    <p className="pb-5 text-sm leading-7 text-slate-600">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom nudge */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Still have questions?{" "}
          <a
            href="https://wa.me/256XXXXXXXXX"
            className="font-semibold text-[var(--primary)] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}