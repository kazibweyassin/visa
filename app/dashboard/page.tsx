import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";
import { ApplicationCard } from "@/components/modules/application-card";

const sampleApplications = [
  {
    id: "app_uganda_001",
    destination: "Schengen Visa",
    origin: "Uganda",
    visaType: "Short-stay (Type C)",
    status: "DRAFT",
    progress: 20,
    createdAt: "Today",
  },
  {
    id: "app_uganda_002",
    destination: "Germany",
    origin: "Uganda",
    visaType: "Tourism",
    status: "UNDER_REVIEW",
    progress: 78,
    createdAt: "2 days ago",
  },
  {
    id: "app_uganda_003",
    destination: "France",
    origin: "Uganda",
    visaType: "Business",
    status: "DOCUMENTS_READY",
    progress: 94,
    createdAt: "1 week ago",
  },
];

const stats = [
  { label: "Applications", value: "3", icon: FileText },
  { label: "Documents ready", value: "1", icon: CheckCircle2 },
  { label: "Needs review", value: "1", icon: Clock3 },
  { label: "Success rate", value: "98%", icon: ShieldCheck },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <section className="rounded-3xl border border-[var(--border-2)] p-5 sm:p-6 lg:p-8" style={{ background: "var(--bg-2)" }}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Dashboard</span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--text-1)] sm:text-4xl">
              Welcome back — your visa workspace is ready.
            </h1>
            <p className="mt-3 text-base text-[var(--text-2)]">
              Track applications, upload documents, and keep every step in one place.
              This is the shell we’ll connect to live user data next.
            </p>
          </div>

          <Link
            href="/dashboard/applications/new"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--green)] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[var(--green-dim)]" style={{ color: "#fff" }}
          >
            Start new application
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-[var(--border-2)] bg-[var(--bg-2)] p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--text-3)]">{stat.label}</p>
                <Icon className="h-4 w-4 text-[var(--green)]" />
              </div>
              <p className="mt-4 text-3xl font-black text-[var(--text-1)]">{stat.value}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-10 grid gap-4 sm:gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-1)]">Your applications</h2>
            <Link href="/apply" className="text-sm font-semibold text-[var(--green)]">Open old flow</Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {sampleApplications.map((application) => (
              <ApplicationCard key={application.id} {...application} />
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-[var(--border-2)] bg-[var(--bg-2)] p-6 shadow-sm">
          <span className="eyebrow">Next steps</span>
          <h2 className="mt-4 text-xl font-bold text-[var(--text-1)]">What to do next</h2>
          <ol className="mt-5 space-y-4 text-sm text-[var(--text-2)]">
            <li className="rounded-2xl bg-[var(--bg-3)] p-4">1. Complete your profile.</li>
            <li className="rounded-2xl bg-[var(--bg-3)] p-4">2. Start a new application.</li>
            <li className="rounded-2xl bg-[var(--bg-3)] p-4">3. Upload passport and financial docs.</li>
            <li className="rounded-2xl bg-[var(--bg-3)] p-4">4. Pay once the file is complete.</li>
          </ol>
        </aside>
      </section>
    </div>
  );
}
