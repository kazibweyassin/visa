import Link from "next/link";
import { ArrowLeft, FileText, CalendarDays, BadgeCheck, AlertCircle } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params;

  const sections = [
    { label: "Status", value: "Draft", icon: BadgeCheck },
    { label: "Progress", value: "20%", icon: AlertCircle },
    { label: "Created", value: "Today", icon: CalendarDays },
    { label: "Documents", value: "0 uploaded", icon: FileText },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green)]">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="mt-5 rounded-3xl border border-[var(--border-2)] bg-[var(--bg-2)] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="eyebrow">Application details</span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--text-1)]">{id}</h1>
            <p className="mt-2 text-[var(--text-2)]">This is the detail shell. Next step is binding it to Prisma data.</p>
          </div>
          <Link href={`/dashboard/applications/${id}/documents`} className="inline-flex items-center gap-2 rounded-full bg-[var(--green)] px-5 py-3 text-sm font-semibold hover:bg-[var(--green-dim)]" style={{ color: "#000" }}>
            Manage documents
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.label} className="rounded-2xl border border-[var(--border-2)] bg-[var(--bg-3)] p-4">
                <div className="flex items-center justify-between text-sm text-[var(--text-3)]">
                  <span>{section.label}</span>
                  <Icon className="h-4 w-4 text-[var(--green)]" />
                </div>
                <p className="mt-3 text-xl font-bold text-[var(--text-1)]">{section.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-[var(--border-2)] bg-white p-5">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Checklist</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-2)]">
              <li>Passport scan</li>
              <li>Bank statements</li>
              <li>Accommodation proof</li>
              <li>Travel itinerary</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border-2)] bg-[var(--bg-3)] p-5">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Actions</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link href={`/dashboard/applications/${id}/documents`} className="rounded-xl bg-[var(--bg-2)] px-4 py-3 text-sm font-semibold text-[var(--text-1)] border border-[var(--border-2)]">
                Upload documents
              </Link>
              <Link href="/pricing" className="rounded-xl bg-[var(--green)] px-4 py-3 text-sm font-semibold" style={{ color: "#000" }}>
                Review pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
