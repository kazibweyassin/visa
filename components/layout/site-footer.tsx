"use client";

import Link from "next/link";
import { ShieldCheck, MessageCircle, Mail, Link as LinkIcon, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const quickLinks: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Study Abroad", href: "http://scholarships.ailesglobal.com/", external: true },
  { label: "Visa Support", href: "#visa-checker" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-8 gap-y-10">
          {/* LOGO + DESCRIPTION */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="h-9 w-9 flex items-center justify-center rounded-2xl bg-black text-white shadow-inner transition-transform group-hover:scale-105">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-semibold text-2xl tracking-tight text-gray-900">AILES Global</span>
            </Link>
            
            <p className="text-gray-600 max-w-xs text-[15px] leading-relaxed">
              Professional visa &amp; study abroad support for ambitious African travelers. 
              From documents to approval — done right.
            </p>

            {/* Trust line */}
            <div className="mt-auto pt-8 text-xs text-emerald-600 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Trusted by 1,247+ applicants • 98% success rate
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">Quick Links</p>
            <div className="flex flex-col gap-3 text-sm">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-gray-600 hover:text-black transition-colors flex items-center gap-1 group"
                >
                  {link.label}
                  {link.external && (
                    <span className="text-[10px] text-gray-400 group-hover:text-black">↗</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div className="lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">Services</p>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <Link href="#visa-checker" className="hover:text-black transition-colors">Schengen Visa</Link>
              <Link href="#visa-checker" className="hover:text-black transition-colors">UK Visa</Link>
              <Link href="#visa-checker" className="hover:text-black transition-colors">Canada Study Permit</Link>
              <Link href="/apply" className="hover:text-black transition-colors">Business Travel</Link>
              <Link href="#how-it-works" className="hover:text-black transition-colors">Document Review</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">Get in touch</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">WhatsApp (fastest)</p>
                  <Link
                    href="https://wa.me/256704833021"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    +256 704 833021
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <Link
                    href="mailto:hello@ailesglobal.com"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    hello@ailesglobal.com
                  </Link>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">Follow our journey</p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://x.com/ailesglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors"
                  aria-label="Follow us on X"
                >
                  <LinkIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/ailestravels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <LinkIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/ailesoverseaseducation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <LinkIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-100 bg-gray-50 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} AILES Global. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3 w-3" />
              <span className="text-[10px] font-medium">TOP</span>
            </motion.button>
          </div>

          <p className="text-[10px] text-gray-400">
            Independent visa assistance • Not affiliated with any government
          </p>
        </div>
      </div>
    </footer>
  );
}