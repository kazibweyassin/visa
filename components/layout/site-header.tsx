"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck } from "lucide-react";

const navLinks: Array<{ label: string; href: string; target?: string }> = [
  { label: "Home", href: "/" },
  {
    label: "Study Abroad",
    href: "http://scholarships.ailesglobal.com/",
    target: "_blank",
  },
  { label: "Visa Support", href: "#visa-checker" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open (nice UX win)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("http") || href.startsWith("#")) return false;
    return pathname === href;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="AILES Global homepage"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-black text-white shadow-md transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg text-gray-900 tracking-tight">
            AILES Global
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target ? "noopener noreferrer" : undefined}
              className={`transition-colors ${
                isActive(link.href)
                  ? "text-black font-semibold"
                  : "hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://wa.me/256704833021"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Speak to advisor
          </Link>

          <Link
            href="/apply"
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
          >
            Start Application
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 -mr-2 text-gray-700 hover:text-black transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 bg-white border-t">
          <div className="max-w-7xl mx-auto flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.target}
                rel={link.target ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className={`py-3 px-4 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors ${
                  isActive(link.href) ? "bg-gray-100 text-black" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-4 mt-4 border-t flex flex-col gap-3">
              <Link
                href="https://wa.me/256704833021"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="py-3 px-4 text-center text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Speak to advisor
              </Link>

              <Link
                href="/apply"
                onClick={closeMenu}
                className="py-3 px-4 bg-black text-white text-center font-semibold rounded-2xl hover:opacity-90 transition-all active:scale-[0.97]"
              >
                Start Application
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}