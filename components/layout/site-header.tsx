"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Visa checker", href: "#visa-checker" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Study Abroad", href: "/study-abroad" },
  ];

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[var(--muted)] bg-[var(--surface)]/90 px-4 py-3 backdrop-blur-xl shadow-2xl shadow-black/10">
        <Link href="/" className="flex items-center gap-3 text-[var(--foreground)]">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--gold),var(--secondary))] text-[var(--foreground)] shadow-lg shadow-[var(--gold)]/15">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">{siteConfig.name}</span>
            <span className="text-xs text-[var(--primary)]/70">{siteConfig.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--primary)] md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--gold)]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="https://wa.me/000000000000"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--muted)] bg-[var(--muted)] px-4 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--secondary)]/30"
            target="_blank"
            rel="noreferrer"
          >
            Speak to advisor
          </Link>
          <Link
            href="/apply"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--gold)] px-5 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            {siteConfig.ctaLabel}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--muted)] bg-[var(--muted)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]/30 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-white/10 bg-[#111A2E]/90 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://wa.me/000000000000"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white"
              target="_blank"
              rel="noreferrer"
            >
              Speak to advisor
            </Link>
            <Link
              href="/apply"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950 transition hover:bg-[#F7E2A2]"
            >
              {siteConfig.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
