"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X, Menu, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks: Array<{ label: string; href: string; target?: string }> = [
  { label: "Home", href: "/" },
  { label: "Study Abroad", href: "http://scholarships.ailesglobal.com/", target: "_blank" },
  { label: "Visa Support", href: "#visa-checker" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    !href.startsWith("http") && !href.startsWith("#") && pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#e5e7eb,0_4px_24px_-4px_rgba(0,0,0,0.08)]"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center h-16 gap-8">

            {/* Logo */}
            <Link href="/" aria-label="Ailes Global" className="group shrink-0 flex items-baseline gap-2 select-none">
              <span
                className="text-[1.35rem] font-black tracking-[-0.03em] text-stone-900 leading-none transition-colors duration-200 group-hover:text-stone-700"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Ailes<span className="text-emerald-500">.</span>
              </span>
              <span
                className="text-[0.62rem] font-semibold tracking-[0.3em] uppercase text-stone-400 transition-colors duration-200 group-hover:text-stone-500"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Global
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target ? "noopener noreferrer" : undefined}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-150 group flex items-center gap-1 ${
                    isActive(link.href)
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {link.target && (
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity -mt-0.5" />
                  )}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto">
              <Link
                href="https://wa.me/256704833021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-[13px] font-medium text-gray-600 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                Talk to advisor
              </Link>

              <Link
                href="/apply"
                className="group relative flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-[13px] font-semibold rounded-full overflow-hidden transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20"
              >
                <span className="relative z-10">Start Application</span>
                <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="lg:hidden ml-auto flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="px-5 pt-3 pb-6 space-y-0.5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.06 }}
                  >
                    <Link
                      href={link.href}
                      target={link.target}
                      rel={link.target ? "noopener noreferrer" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {link.label}
                      {link.target
                        ? <ArrowUpRight className="w-3.5 h-3.5 opacity-30" />
                        : isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      }
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 mt-3 border-t border-gray-100 grid grid-cols-2 gap-2.5"
                >
                  <Link
                    href="https://wa.me/256704833021"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    Advisor
                  </Link>
                  <Link
                    href="/apply"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Apply now
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Layout spacer */}
      <div className="h-16" />
    </>
  );
}