"use client";

import Link from "next/link";
import { MessageCircle, Mail, ArrowUpRight, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

/* ── Social icon SVGs ── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Study Abroad", href: "http://scholarships.ailesglobal.com/", external: true },
  { label: "Visa Support", href: "#visa-checker" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

const services = [
  { label: "Schengen Visa", href: "#visa-checker" },
  { label: "UK Visa", href: "#visa-checker" },
  { label: "Canada Study Permit", href: "#visa-checker" },
  { label: "Business Travel", href: "/apply" },
  { label: "Document Review", href: "#how-it-works" },
];

const socials = [
  { label: "X / Twitter", href: "https://x.com/ailesglobal", Icon: XIcon },
  { label: "Facebook", href: "https://www.facebook.com/ailestravels/", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/ailesoverseaseducation/", Icon: InstagramIcon },
];

export function SiteFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#faf9f7] border-t border-stone-200 overflow-hidden">
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `radial-gradient(circle, #d6d3ce 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── BIG EDITORIAL HEADLINE BAND ── */}
      <div className="relative border-b border-stone-200 py-14 px-6 sm:px-10 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-100/50 rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600 mb-3">
              Ready to travel?
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Your visa.
              <br />
              <span className="text-stone-400 italic font-bold">Our expertise.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="https://wa.me/256704833021"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 rounded-full border border-stone-200 bg-white text-sm font-medium text-stone-600 hover:border-stone-300 hover:text-stone-900 hover:bg-stone-50 transition-all shadow-sm"
            >
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              Talk to an advisor
            </Link>
            <Link
              href="/apply"
              className="group relative flex items-center gap-2 overflow-hidden px-6 py-3 rounded-full bg-stone-900 text-sm font-bold text-white shadow-md shadow-stone-900/20 hover:bg-stone-800 transition-colors"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start application
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="group w-fit">
              <div className="flex items-baseline gap-2 leading-none select-none">
                <span
                  className="text-[2rem] font-black tracking-[-0.04em] text-stone-900 leading-none transition-colors duration-200 group-hover:text-stone-700"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Ailes
                  <span className="text-emerald-500">.</span>
                </span>
                <span
                  className="text-[0.7rem] font-semibold tracking-[0.32em] uppercase text-stone-400 transition-colors duration-200 group-hover:text-stone-500"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Global
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-500 leading-relaxed max-w-xs">
              Professional visa &amp; study abroad support for ambitious African travelers.
              From documents to approval — done right.
            </p>

            {/* Trust indicator */}
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              1,247+ applicants · 98% success rate
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-1 mt-1">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-900 hover:bg-stone-50 transition-all shadow-sm"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer on lg */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Quick links */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    {link.label}
                    {link.external && (
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-5">
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-5">
              Get in touch
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/256704833021"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">WhatsApp</p>
                  <p className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors mt-0.5">
                    +256 704 833021
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">Fastest response</p>
                </div>
              </a>

              <a
                href="mailto:hello@ailesglobal.com"
                className="group flex items-start gap-3"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-100 border border-stone-200">
                  <Mail className="h-4 w-4 text-stone-500" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">Email</p>
                  <p className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors mt-0.5">
                    hello@ailesglobal.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative border-t border-stone-200 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-400 order-2 sm:order-1">
            © {new Date().getFullYear()} AILES Global · Independent visa assistance · Not affiliated with any government
          </p>

          <div className="flex items-center gap-5 order-1 sm:order-2">
            <Link href="/privacy" className="text-[11px] text-stone-400 hover:text-stone-700 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[11px] text-stone-400 hover:text-stone-700 transition-colors">
              Terms
            </Link>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.93 }}
              className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-500 hover:border-stone-300 hover:text-stone-900 transition-all shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3 w-3" />
              Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}