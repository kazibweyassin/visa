"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Business journeys", href: "/study-abroad" },
    { label: "Visa support", href: "#visa-checker" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--gold)] to-[var(--secondary)] shadow-lg shadow-[var(--gold)]/20">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>

          <div className="space-y-0.5">
            <p className="text-sm font-semibold tracking-tight text-slate-950">
              {siteConfig.name}
            </p>
            <p className="text-xs text-slate-500">
              {siteConfig.tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative transition-colors duration-200 hover:text-slate-950 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--gold)] after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="https://wa.me/256704833021"
            target="_blank"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Speak to advisor
          </Link>

          <Link
            href="/apply"
            className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:opacity-95"
          >
            {siteConfig.ctaLabel}
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="https://wa.me/256704833021"
                target="_blank"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-center text-xs font-semibold text-slate-700"
              >
                Speak to advisor
              </Link>

              <Link
                href="/apply"
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                {siteConfig.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}