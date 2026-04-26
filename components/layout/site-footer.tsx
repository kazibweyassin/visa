import Link from "next/link";

const quickLinks = [
  { label: "Business journeys", href: "/study-abroad" },
  { label: "Visa support", href: "#visa-checker" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];


export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--surface)] py-12 text-[var(--foreground)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-sm font-semibold">Ailes Global</p>
          <p className="mt-2 text-sm text-[var(--foreground)]/70">
            Business travel, visa support, and curated journeys for ambitious travelers.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]/80">Quick links</p>
          <div className="mt-3 space-y-2 text-sm text-[var(--primary)]/80">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block transition hover:text-[var(--gold)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]/80">Contact</p>
          <div className="mt-3 space-y-2 text-sm text-[var(--foreground)]/80">
            <p>
              WhatsApp: <Link href="https://wa.me/256704833021" className="text-[var(--primary)]">+256 704 833021</Link>
            </p>
            <p>
              Email: <Link href="mailto:hello@ailesglobal.com" className="text-[var(--primary)]">hello@ailesglobal.com</Link>
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]/80">Legal</p>
          <p className="mt-3 text-xs text-[var(--secondary)]/80">
            Ailes Global is an independent visa assistance service and is not affiliated with any
            government or embassy. Final decisions are made by consular authorities.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4 text-xs text-[var(--secondary)]/70 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Ailes Global. All rights reserved.
      </div>
    </footer>
  );
}
