"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aisha N.",
    meta: "Uganda · Tourism",
    flag: "🇺🇬",
    quote: "I finally got my tourist visa approved after two failed attempts. The guidance was practical and clear.",
  },
  {
    name: "Chinedu O.",
    meta: "Nigeria · Business",
    flag: "🇳🇬",
    quote: "As a founder traveling for meetings, I needed speed and confidence. Everything felt professional.",
  },
  {
    name: "Wanjiku M.",
    meta: "Kenya · Student",
    flag: "🇰🇪",
    quote: "They prepared every document and interview point I needed. The process felt human and organized.",
  },
  {
    name: "Kwame A.",
    meta: "Ghana · Traveler",
    flag: "🇬🇭",
    quote: "WhatsApp support was fast and personal. I always knew the next step and what to submit.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#0B1324] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(247,213,111,0.14),_transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#F4C15D]">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Global travelers sharing real outcomes.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Authentic stories from people who needed a reliable, fast visa experience.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <div className="flex items-center gap-1 text-[#F4C15D]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-[#F4C15D]" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-200">“{item.quote}”</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.meta}</p>
                </div>
                <span className="text-2xl">{item.flag}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
