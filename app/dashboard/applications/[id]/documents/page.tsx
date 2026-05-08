import Link from "next/link";
import { ArrowLeft, Upload, ShieldCheck } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ApplicationDocumentsPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link href={`/dashboard/applications/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green)]">
        <ArrowLeft className="h-4 w-4" />
        Back to application
      </Link>

      <div className="mt-5 rounded-3xl border border-[var(--border-2)] bg-[var(--bg-2)] p-6 shadow-sm sm:p-8">
        <span className="eyebrow">Documents</span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--text-1)]">Upload documents</h1>
        <p className="mt-2 text-[var(--text-2)]">
          This is the document workspace shell for application <strong className="text-[var(--text-1)]">{id}</strong>.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-dashed border-[var(--border-3)] bg-[var(--bg-3)] p-8 text-center">
            <Upload className="mx-auto h-10 w-10 text-[var(--green)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--text-1)]">Drop files here</h2>
            <p className="mt-2 text-sm text-[var(--text-2)]">We’ll connect this to Supabase storage and Prisma records next.</p>
            <button className="mt-5 rounded-full bg-[var(--green)] px-5 py-3 text-sm font-semibold" style={{ color: "#000" }}>
              Choose files
            </button>
          </div>

          <aside className="rounded-2xl border border-[var(--border-2)] bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--green-dim)]">
              <ShieldCheck className="h-4 w-4" />
              Accepted formats
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text-2)]">
              <li>PDF</li>
              <li>JPG / JPEG</li>
              <li>PNG</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
