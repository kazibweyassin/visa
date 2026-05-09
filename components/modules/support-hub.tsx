import Link from "next/link";
import { ArrowRight, FileText, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";

const supportItems = [
  {
    title: "Document checklist",
    description: "See exactly what to prepare before you apply.",
    href: "/prepare",
    icon: FileText,
  },
  {
    title: "Frequently asked questions",
    description: "Quick answers on timelines, rejections, and payments.",
    href: "/faq",
    icon: ShieldCheck,
  },
  {
    title: "Talk on WhatsApp",
    description: "Get quick help from an advisor when you need a human reply.",
    href: "https://wa.me/256704833021",
    icon: MessageCircle,
    external: true,
  },
  {
    title: "Call or email support",
    description: "Use the contact details in the footer if you prefer direct communication.",
    href: "/privacy",
    icon: PhoneCall,
  },
];

export function SupportHub() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--bg)" }}>
      <div className="dot-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Support hub
          </span>
          <h2 className="mt-5 font-black leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.1rem, 4vw, 3.2rem)", fontFamily: "var(--font-serif)", color: "var(--text-1)" }}>
            Get help fast.
            <br />
            <span style={{ color: "var(--text-3)", fontStyle: "italic", fontWeight: 700 }}>Stay on track.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-3)]">
            Whether you’re preparing documents or already in the queue, these shortcuts get you to the right next step.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportItems.map((item) => {
            const Icon = item.icon;
            const classes = "group rounded-2xl border border-[var(--border-2)] bg-[var(--bg-2)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--border-3)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.05)]";
            return item.external ? (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={classes}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--green-muted)" }}>
                  <Icon className="h-5 w-5" style={{ color: "var(--green)" }} />
                </div>
                <h3 className="mt-4 text-sm font-bold text-[var(--text-1)]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[var(--text-3)]">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--green)]">
                  Open channel <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={classes}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--green-muted)" }}>
                  <Icon className="h-5 w-5" style={{ color: "var(--green)" }} />
                </div>
                <h3 className="mt-4 text-sm font-bold text-[var(--text-1)]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[var(--text-3)]">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--green)]">
                  Open now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}