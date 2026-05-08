import Link from "next/link";
import { AlertTriangle, ArrowRight, Clock3, ShieldCheck } from "lucide-react";

const updates = [
  {
    title: "Fee changes and service updates",
    description: "We surface live updates when embassy fees, appointment windows, or document rules change.",
    href: "/faq",
    label: "Read updates",
    icon: AlertTriangle,
  },
  {
    title: "Document checks before submission",
    description: "Upload your papers early so we can flag missing items before you book an appointment.",
    href: "/prepare",
    label: "Prepare docs",
    icon: ShieldCheck,
  },
  {
    title: "Fast response channels",
    description: "Need help now? Use WhatsApp or the contact form for a quick next step.",
    href: "/faq",
    label: "Get support",
    icon: Clock3,
  },
];

export function ImportantUpdates() {
  return (
    <section className="relative border-y border-[var(--border-1)] bg-[var(--bg-2)]">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 sm:px-8 lg:grid-cols-3 lg:gap-6">
        {updates.map((update) => {
          const Icon = update.icon;
          return (
            <Link
              key={update.title}
              href={update.href}
              className="group flex items-start gap-3 rounded-2xl border border-[var(--border-2)] bg-[var(--bg)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--border-3)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--green-muted)" }}>
                <Icon className="h-5 w-5" style={{ color: "var(--green)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[var(--text-1)]">{update.title}</p>
                  <span className="rounded-full bg-[var(--amber-muted)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--amber)]">
                    Live
                  </span>
                </div>
                <p className="mt-1 text-xs leading-6 text-[var(--text-3)]">{update.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--green)] transition-transform group-hover:translate-x-0.5">
                  {update.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}