"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <Link
      href="https://wa.me/000000000000"
      className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-0.5"
      target="_blank"
      rel="noreferrer"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-emerald-400/40 blur-xl" />
      <span className="absolute inset-0 -z-10 rounded-full bg-emerald-400/30 animate-ping" />
      <MessageCircle className="h-5 w-5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm transition-all duration-300 group-hover:max-w-[140px]">
        Chat with us
      </span>
    </Link>
  );
}
