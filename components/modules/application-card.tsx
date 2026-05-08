import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, FileText } from "lucide-react";

type ApplicationCardProps = {
  id: string;
  destination: string;
  origin?: string;
  visaType: string;
  status: string;
  progress: number;
  createdAt?: string;
};

const statusStyles: Record<string, string> = {
  DRAFT: "bg-stone-100 text-stone-700 border-stone-200",
  DOCUMENTS_READY: "bg-emerald-50 text-emerald-700 border-emerald-100",
  SUBMITTED: "bg-sky-50 text-sky-700 border-sky-100",
  UNDER_REVIEW: "bg-amber-50 text-amber-700 border-amber-100",
  APPROVED: "bg-green-50 text-green-700 border-green-100",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-100",
  NEEDS_REVISION: "bg-orange-50 text-orange-700 border-orange-100",
};

export function ApplicationCard({
  id,
  destination,
  origin,
  visaType,
  status,
  progress,
  createdAt,
}: ApplicationCardProps) {
  const badge = statusStyles[status] || statusStyles.DRAFT;

  return (
    <div className="rounded-2xl border border-[var(--border-2)] bg-[var(--bg-2)] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">
            <FileText className="h-3.5 w-3.5 text-[var(--green)]" />
            Application
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[var(--text-1)]">{destination}</h3>
          <p className="mt-1 text-sm text-[var(--text-2)]">{visaType}</p>
        </div>

        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badge}`}>
          {status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-[var(--text-2)]">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[var(--green)]" />
          <span>{origin ? `${origin} → ${destination}` : destination}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[var(--green)]" />
          <span>{createdAt || "Recently created"}</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-[var(--text-3)]">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--bg-4)]">
          <div
            className="h-2 rounded-full bg-[var(--green)] transition-all"
            style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Link href={`/dashboard/applications/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green)]">
          View details
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <span className="text-xs text-[var(--text-3)]">ID: {id.slice(0, 8)}</span>
      </div>
    </div>
  );
}
