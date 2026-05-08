"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  CheckCircle2,
  Clock,
  FileCheck2,
  ShieldCheck,
  X,
  IdCard,
  Camera,
  FileText,
  Plane,
  Building2,
  Coins,
  Briefcase,
  FileEdit,
  PenLine,
} from "lucide-react";
import { DocumentRequirement } from "@/lib/types/document";
import { schengenDocumentRequirements } from "@/lib/document-requirements";
import { DocumentUpload } from "@/components/modules/document-upload";

// ─── Fonts (add to your global CSS or layout) ─────────────────────────────────
// @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

// ─── Design tokens ────────────────────────────────────────────────────────────
const blue = {
  50: "#EFF5FF",
  100: "#DBEAFE",
  200: "#BFDBFE",
  400: "#60A5FA",
  600: "#2563EB",
  700: "#1D4ED8",
  900: "#1E3A8A",
} as const;

// ─── Document metadata ────────────────────────────────────────────────────────
const DOC_META: Record<string, { icon: React.ElementType; label: string }> = {
  passport:    { icon: IdCard,     label: "Valid passport" },
  photo:       { icon: Camera,     label: "Passport photographs" },
  form:        { icon: FileEdit,   label: "Application form" },
  insurance:   { icon: ShieldCheck,label: "Travel insurance" },
  flight:      { icon: Plane,      label: "Flight itinerary" },
  hotel:       { icon: Building2,  label: "Accommodation proof" },
  finance:     { icon: Coins,      label: "Financial means" },
  employment:  { icon: Briefcase,  label: "Employment / enrolment letter" },
  cover:       { icon: PenLine,    label: "Cover letter" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressRing({ pct }: { pct: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="rotate-[-90deg]">
      <circle cx="34" cy="34" r={r} fill="none" stroke="#E5E9F2" strokeWidth="5" />
      <motion.circle
        cx="34" cy="34" r={r}
        fill="none"
        stroke={blue[600]}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

function DocRow({
  req,
  done,
  index,
  onSelect,
}: {
  req: DocumentRequirement;
  done: boolean;
  index: number;
  onSelect: () => void;
}) {
  const meta = DOC_META[req.id] ?? { icon: FileText, label: req.name };
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-150"
      style={{
        background: done ? blue[50] : "#FFFFFF",
        borderColor: done ? blue[200] : "#E5E9F2",
      }}
    >
      {/* Icon bubble */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors"
        style={{
          background: done ? blue[600] : blue[50],
          color: done ? "#fff" : blue[600],
        }}
      >
        {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className="truncate text-[13.5px] font-[500]"
          style={{ color: done ? blue[900] : "#1A1A18",
            fontFamily: "'DM Sans', sans-serif" }}
        >
          {req.name}
        </p>
        {req.description && (
          <p
            className="mt-0.5 truncate text-[11.5px]"
            style={{ color: "#9AA1B2", fontFamily: "'DM Sans', sans-serif" }}
          >
            {req.description}
          </p>
        )}
      </div>

      {/* Action */}
      {done ? (
        <span
          className="flex shrink-0 items-center gap-1.5 text-[12px] font-[500]"
          style={{ color: blue[600], fontFamily: "'DM Sans', sans-serif" }}
        >
          <FileCheck2 size={14} /> Uploaded
        </span>
      ) : (
        <button
          onClick={onSelect}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-[600] transition-all active:scale-95"
          style={{
            background: blue[600],
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Upload size={12} /> Upload
        </button>
      )}
    </motion.div>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex gap-3 rounded-xl border bg-white p-4"
      style={{ borderColor: "#E5E9F2" }}
    >
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: blue[50], color: blue[600] }}
      >
        <Icon size={15} />
      </div>
      <div>
        <p
          className="text-[13px] font-[600]"
          style={{ color: "#1A1A18", fontFamily: "'DM Sans', sans-serif" }}
        >
          {title}
        </p>
        <p
          className="mt-0.5 text-[11.5px] leading-[1.55]"
          style={{ color: "#9AA1B2", fontFamily: "'DM Sans', sans-serif" }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function PrepareSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F6F3" }}>
      <div className="border-b bg-white px-8 py-5">
        <div className="mx-auto max-w-5xl space-y-3">
          <div className="h-3 w-20 animate-pulse rounded-full bg-[#E5E9F2]" />
          <div className="h-7 w-64 animate-pulse rounded-lg bg-[#E5E9F2]" />
          <div className="h-3 w-80 animate-pulse rounded-lg bg-[#E5E9F2]" />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-8 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-white" />
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-36 animate-pulse rounded-2xl bg-white" />
            <div className="h-48 animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────
function PrepareContent() {
  const [selectedRequirement, setSelectedRequirement] =
    useState<DocumentRequirement | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Map<string, unknown>>(
    new Map()
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("uploadedDocs");
      if (saved) setUploadedDocs(new Map<string, unknown>(JSON.parse(saved)));
    } catch {
      localStorage.removeItem("uploadedDocs");
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const hydratedRef = useRef(false);
  useEffect(() => {
    if (!hydratedRef.current) { hydratedRef.current = true; return; }
    try {
      localStorage.setItem("uploadedDocs", JSON.stringify(Array.from(uploadedDocs.entries())));
    } catch {
      console.warn("localStorage quota exceeded.");
    }
  }, [uploadedDocs]);

  const handleUploadSuccess = (docId: string) => {
    if (!selectedRequirement) return;
    setUploadedDocs((prev) => {
      const next = new Map(prev);
      next.set(selectedRequirement.id, { id: docId, timestamp: new Date() });
      return next;
    });
    setSelectedRequirement(null);
  };

  if (!isHydrated) return <PrepareSkeleton />;

  const total = schengenDocumentRequirements.length;
  const completed = schengenDocumentRequirements.filter((r) => uploadedDocs.has(r.id)).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const pending = schengenDocumentRequirements.filter((r) => !uploadedDocs.has(r.id));
  const done    = schengenDocumentRequirements.filter((r) =>  uploadedDocs.has(r.id));

  return (
    <main
      className="relative min-h-screen"
      style={{ background: "#F7F6F3", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Sticky header ── */}
      <header
        className="sticky top-0 z-40 border-b bg-white"
        style={{ borderColor: "#E5E9F2" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-4 sm:px-8">
          {/* Back + badges row */}
          <div className="flex items-center justify-between">
            <Link
              href="/apply"
              className="inline-flex items-center gap-1.5 text-[12px] font-[500] transition-colors"
              style={{ color: "#9AA1B2" }}
            >
              <ArrowLeft size={14} />
              Back to application
            </Link>
            <div className="flex items-center gap-2">
              {["Secure upload", "Expert review", "24h feedback"].map((t, i) => (
                <span
                  key={t}
                  className="hidden rounded-full px-3 py-1 text-[10.5px] font-[600] uppercase tracking-wider sm:inline-block"
                  style={
                    i === 0
                      ? { background: blue[50], color: blue[600] }
                      : { background: "#F3F4F6", color: "#9AA1B2" }
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Title + progress */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                className="mb-1 text-[11px] font-[700] uppercase tracking-[0.16em]"
                style={{ color: blue[600] }}
              >
                Document centre · Schengen visa
              </p>
              <h1
                className="text-[26px] font-[400] leading-tight tracking-tight"
                style={{ color: "#0F0F0D", fontFamily: "'DM Serif Display', serif" }}
              >
                Prepare your documents
              </h1>
              <p className="mt-1 text-[12.5px]" style={{ color: "#9AA1B2" }}>
                Upload every required file before you visit the embassy
              </p>
            </div>

            {/* Ring + counter */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <ProgressRing pct={pct} />
                <span
                  className="absolute text-[13px] font-[700]"
                  style={{ color: blue[700], fontFamily: "'DM Sans', sans-serif" }}
                >
                  {pct}%
                </span>
              </div>
              <div>
                <p className="text-[18px] font-[700]" style={{ color: "#0F0F0D" }}>
                  {completed}/{total}
                </p>
                <p className="text-[11px]" style={{ color: "#9AA1B2" }}>
                  documents
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* ── Left: doc list ── */}
          <div className="min-w-0">
            {/* Pending */}
            {pending.length > 0 && (
              <section className="mb-8">
                <p
                  className="mb-3 text-[10.5px] font-[700] uppercase tracking-[0.16em]"
                  style={{ color: "#B0B7C8" }}
                >
                  Still needed — {pending.length}
                </p>
                <div className="flex flex-col gap-2">
                  {pending.map((req, i) => (
                    <DocRow
                      key={req.id}
                      req={req}
                      done={false}
                      index={i}
                      onSelect={() => setSelectedRequirement(req)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Done */}
            {done.length > 0 && (
              <section>
                <p
                  className="mb-3 text-[10.5px] font-[700] uppercase tracking-[0.16em]"
                  style={{ color: "#B0B7C8" }}
                >
                  Uploaded — {done.length}
                </p>
                <div className="flex flex-col gap-2">
                  {done.map((req, i) => (
                    <DocRow
                      key={req.id}
                      req={req}
                      done={true}
                      index={i}
                      onSelect={() => setSelectedRequirement(req)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* CTA banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 overflow-hidden rounded-2xl border"
              style={{ borderColor: "#E5E9F2", background: "#fff" }}
            >
              <div className="grid lg:grid-cols-[240px_1fr]">
                {/* Image panel */}
                <div className="relative hidden h-full min-h-[200px] lg:block">
                  <Image
                    src="/ETA_Article_Photo.jpg"
                    alt="Professional reviewing visa documents"
                    fill
                    className="object-cover"
                    sizes="240px"
                    priority={false}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, transparent 60%, #fff 100%)`,
                    }}
                  />
                </div>

                {/* Copy */}
                <div className="px-7 py-8">
                  <p
                    className="mb-2 text-[10.5px] font-[700] uppercase tracking-[0.16em]"
                    style={{ color: blue[600] }}
                  >
                    Final review
                  </p>
                  <h2
                    className="text-[20px] font-[400]"
                    style={{ color: "#0F0F0D", fontFamily: "'DM Serif Display', serif" }}
                  >
                    Ready to submit?
                  </h2>
                  <p className="mt-2 text-[12.5px] leading-[1.65]" style={{ color: "#9AA1B2" }}>
                    Our team reviews your complete document set, checks consistency,
                    and prepares you for the next step — feedback within 24 hours.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {["Document completeness review", "Clear next-step guidance", "Feedback within 24 hours"].map((t) => (
                      <li key={t} className="flex items-center gap-2 text-[12px]" style={{ color: "#6B7280" }}>
                        <CheckCircle2 size={13} color={blue[600]} />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/apply"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-[600] text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: blue[600] }}
                  >
                    Continue with application
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Stat card */}
            <div
              className="rounded-2xl border bg-white px-6 py-6 text-center"
              style={{ borderColor: "#E5E9F2" }}
            >
              <div
                className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: blue[50], color: blue[600] }}
              >
                <ShieldCheck size={20} />
              </div>
              <p
                className="text-[34px] font-[400] leading-none"
                style={{ color: "#0F0F0D", fontFamily: "'DM Serif Display', serif" }}
              >
                9 in 10
              </p>
              <p
                className="mt-1 text-[10.5px] font-[700] uppercase tracking-wider"
                style={{ color: "#B0B7C8" }}
              >
                Applications succeed
              </p>
              <p className="mt-2 text-[11.5px] leading-[1.6]" style={{ color: "#B0B7C8" }}>
                When documents are complete and aligned to requirements.
              </p>
            </div>

            {/* Benefit cards */}
            <BenefitCard
              icon={FileCheck2}
              title="Complete checklist"
              desc="Know exactly what to upload before visiting the embassy."
              delay={0.2}
            />
            <BenefitCard
              icon={CheckCircle2}
              title="Quality review"
              desc="Every document checked for consistency before submission."
              delay={0.25}
            />
            <BenefitCard
              icon={Clock}
              title="Fast turnaround"
              desc="Feedback within 24 hours. Reduce your rejection risk."
              delay={0.3}
            />
          </motion.aside>
        </div>
      </div>

      {/* ── Upload modal ── */}
      <DocumentUpload
        requirement={selectedRequirement}
        onClose={() => setSelectedRequirement(null)}
        onUploadSuccess={handleUploadSuccess}
      />
    </main>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function PreparePage() {
  return (
    <Suspense fallback={<PrepareSkeleton />}>
      <PrepareContent />
    </Suspense>
  );
}