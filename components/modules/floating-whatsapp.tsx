"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "256704833021";
const WHATSAPP_MESSAGE =
  "Hi, I'd like help with my Schengen visa application.";

export function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[var(--primary)] px-4 shadow-lg transition-all duration-300 hover:pr-6 hover:bg-[var(--secondary)]"
    >
      {/* Icon */}
      <MessageCircle className="h-5 w-5 shrink-0 text-white" />

      {/* Text */}
      <span className="whitespace-nowrap text-sm font-semibold text-white transition-all duration-300">
        Chat with us
      </span>
    </Link>
  );
}