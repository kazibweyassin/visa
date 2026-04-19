import Link from "next/link";

const quickLinks = [
  { label: "Visa checker", href: "#visa-checker" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1324] py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-sm font-semibold">Ailes Global</p>
          <p className="mt-2 text-sm text-slate-300">
            Premium visa assistance for global travelers seeking Schengen destinations.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Quick links</p>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block transition hover:text-[#F4C15D]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Contact</p>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <p>WhatsApp: +256704833021</p>
            <p>Email: hello@ailesglobal.com</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Legal</p>
          <p className="mt-3 text-xs text-slate-400">
            Ailes Global is an independent visa assistance service and is not affiliated with any
            government or embassy. Final decisions are made by consular authorities.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Ailes Global. All rights reserved.
      </div>
    </footer>
  );
}
