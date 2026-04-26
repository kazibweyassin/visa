"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

// TODO: Replace with your actual WhatsApp number (format: country code + number, no +)
const WHATSAPP_NUMBER = "256XXXXXXXXX";
const WHATSAPP_MESSAGE = "Hi, I'd like help with my Schengen visa application.";

export function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    return (
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-bold text-white shadow-lg transition hover:bg-[var(--secondary)]"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm transition-all duration-300 group-hover:max-w-[140px]">
          Chat with us
        </span>
      </Link>
    );
}