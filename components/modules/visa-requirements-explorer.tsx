"use client";

import React, { useState } from "react";
import { AlertCircle, ArrowRight, ChevronDown, ChevronUp, FileText, Info, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type PassportCode = "UG" | "KE" | "TZ" | "RW" | "ET";
type VisaType = "free" | "evisa" | "required" | "arrival";
type Difficulty = "easy" | "medium" | "hard";

interface PassportRule {
  type: VisaType;
  fee: string;
  processing: string;
}

interface VisaEntry {
  country: string;
  region: string;
  passportRules: Record<PassportCode, PassportRule>;
  defaultType: VisaType;
  docs: string[];
  tip: string;
  difficulty: Difficulty;
  notes?: string;
}

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const PASSPORT_LABELS: Record<PassportCode, string> = {
  UG: "Uganda",
  KE: "Kenya",
  TZ: "Tanzania",
  RW: "Rwanda",
  ET: "Ethiopia",
};

const PASSPORT_FLAGS: Record<PassportCode, string> = {
  UG: "🇺🇬", KE: "🇰🇪", TZ: "🇹🇿", RW: "🇷🇼", ET: "🇪🇹",
};

const TYPE_LABEL: Record<VisaType, string> = {
  free: "Visa-free",
  evisa: "E-Visa",
  required: "Visa required",
  arrival: "Visa on arrival",
};

const TYPE_STYLES: Record<VisaType, string> = {
  free: "bg-emerald-50 text-emerald-700 border-emerald-200",
  evisa: "bg-blue-50 text-blue-700 border-blue-200",
  required: "bg-rose-50 text-rose-700 border-rose-200",
  arrival: "bg-amber-50 text-amber-700 border-amber-200",
};

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string; bg: string }> = {
  easy:   { label: "Easy",        color: "bg-emerald-400", bg: "bg-emerald-50 text-emerald-700" },
  medium: { label: "Moderate",    color: "bg-amber-400",   bg: "bg-amber-50 text-amber-700"   },
  hard:   { label: "Challenging", color: "bg-rose-400",    bg: "bg-rose-50 text-rose-700"     },
};

const REGION_STYLES: Record<string, string> = {
  "Europe":       "bg-blue-50 text-blue-600",
  "Middle East":  "bg-orange-50 text-orange-600",
  "Asia":         "bg-purple-50 text-purple-600",
  "Americas":     "bg-teal-50 text-teal-600",
  "Africa":       "bg-green-50 text-green-600",
  "Europe / Asia":"bg-indigo-50 text-indigo-600",
};

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const data: VisaEntry[] = [
  {
    country: "United Arab Emirates",
    region: "Middle East",
    passportRules: {
      UG: { type: "required", fee: "$90",  processing: "5–10 business days" },
      KE: { type: "evisa",    fee: "$65",  processing: "3–5 business days"  },
      TZ: { type: "required", fee: "$90",  processing: "5–10 business days" },
      RW: { type: "evisa",    fee: "$65",  processing: "3–5 business days"  },
      ET: { type: "required", fee: "$95",  processing: "7–14 business days" },
    },
    defaultType: "required",
    docs: ["Valid passport (6+ months)", "Bank statement (3 months)", "Hotel booking", "Return ticket", "Passport photo (white bg)", "Travel insurance"],
    tip: "UAE requires proof of accommodation for every night of your stay. Book refundable hotels and include confirmation printouts.",
    difficulty: "medium",
    notes: "Schengen visa holders may qualify for visa on arrival.",
  },
  {
    country: "United Kingdom",
    region: "Europe",
    passportRules: {
      UG: { type: "required", fee: "£115", processing: "15–20 business days" },
      KE: { type: "required", fee: "£115", processing: "15–20 business days" },
      TZ: { type: "required", fee: "£115", processing: "15–20 business days" },
      RW: { type: "required", fee: "£115", processing: "15–20 business days" },
      ET: { type: "required", fee: "£115", processing: "15–20 business days" },
    },
    defaultType: "required",
    docs: ["Valid passport", "Proof of funds (6 months bank statements)", "Employer / sponsorship letter", "Hotel bookings", "Travel history evidence", "Ties to home country evidence"],
    tip: "Strong ties to home country (employment, property, family) are critical. Refusals are common for first-time applicants without a strong financial profile.",
    difficulty: "hard",
    notes: "High refusal rate for East African applicants. Recommend professional cover letter support.",
  },
  {
    country: "Schengen Area",
    region: "Europe",
    passportRules: {
      UG: { type: "required", fee: "€90", processing: "15 business days" },
      KE: { type: "required", fee: "€90", processing: "15 business days" },
      TZ: { type: "required", fee: "€90", processing: "15 business days" },
      RW: { type: "required", fee: "€90", processing: "15 business days" },
      ET: { type: "required", fee: "€90", processing: "15 business days" },
    },
    defaultType: "required",
    docs: ["Valid passport (3 months beyond travel)", "Schengen insurance (min €30k)", "Round-trip tickets", "Hotel/accommodation proof", "Bank statements (3 months)", "Employment/student letter", "Itinerary"],
    tip: "Apply at the embassy of the country where you'll spend the most nights. Book insurance first — it's often required to complete the application.",
    difficulty: "hard",
    notes: "Covers 27 EU countries with a single visa. Apply 3–4 weeks in advance.",
  },
  {
    country: "China",
    region: "Asia",
    passportRules: {
      UG: { type: "required", fee: "$140", processing: "4–7 business days" },
      KE: { type: "required", fee: "$140", processing: "4–7 business days" },
      TZ: { type: "required", fee: "$140", processing: "4–7 business days" },
      RW: { type: "required", fee: "$140", processing: "4–7 business days" },
      ET: { type: "required", fee: "$140", processing: "4–7 business days" },
    },
    defaultType: "required",
    docs: ["Valid passport", "Completed visa form", "Bank statement", "Invitation letter (if business)", "Hotel bookings", "Round-trip ticket", "Business registration (if applicable)"],
    tip: "Business visa (M-type) requires an invitation letter from a Chinese company. For trade visits to Guangzhou, coordinate with your supplier to provide the letter.",
    difficulty: "medium",
    notes: "Multiple entry visas available for frequent business travelers.",
  },
  {
    country: "Canada",
    region: "Americas",
    passportRules: {
      UG: { type: "required", fee: "CAD $185", processing: "20–40 business days" },
      KE: { type: "required", fee: "CAD $185", processing: "20–40 business days" },
      TZ: { type: "required", fee: "CAD $185", processing: "20–40 business days" },
      RW: { type: "required", fee: "CAD $185", processing: "20–40 business days" },
      ET: { type: "required", fee: "CAD $185", processing: "20–40 business days" },
    },
    defaultType: "required",
    docs: ["Valid passport", "IMM 5257 form", "Financial proof (bank statements)", "Employment letter", "Purpose of travel letter", "Biometrics enrollment", "Ties to home country"],
    tip: "Biometrics are mandatory. Book the biometrics appointment before submitting your application — slots fill up fast in East Africa.",
    difficulty: "hard",
    notes: "Processing times vary widely. Apply 2–3 months in advance.",
  },
  {
    country: "Rwanda",
    region: "Africa",
    passportRules: {
      UG: { type: "free",     fee: "Free", processing: "On arrival"   },
      KE: { type: "free",     fee: "Free", processing: "On arrival"   },
      TZ: { type: "free",     fee: "Free", processing: "On arrival"   },
      RW: { type: "free",     fee: "—",    processing: "Citizen"      },
      ET: { type: "arrival",  fee: "$30",  processing: "On arrival"   },
    },
    defaultType: "free",
    docs: ["Valid passport or national ID (EAC citizens)"],
    tip: "East African Community passport holders get visa-free or visa-on-arrival. Uganda, Kenya, and Tanzania citizens can use national IDs at Kigali airport.",
    difficulty: "easy",
    notes: "Part of EAC free movement. Most African Union members get visa on arrival.",
  },
  {
    country: "Turkey",
    region: "Europe / Asia",
    passportRules: {
      UG: { type: "evisa",    fee: "$50", processing: "Instant–48 hours"   },
      KE: { type: "evisa",    fee: "$50", processing: "Instant–48 hours"   },
      TZ: { type: "evisa",    fee: "$50", processing: "Instant–48 hours"   },
      RW: { type: "evisa",    fee: "$50", processing: "Instant–48 hours"   },
      ET: { type: "required", fee: "$50", processing: "3–5 business days"  },
    },
    defaultType: "evisa",
    docs: ["Valid passport (6+ months)", "Return ticket", "Hotel booking or host letter", "Proof of funds"],
    tip: "Apply online at evisa.gov.tr at least 3 days before travel. The process is fast and straightforward for most East African passports.",
    difficulty: "easy",
    notes: "Ethiopia requires a sticker visa from embassy. All other listed passports qualify for e-Visa.",
  },
  {
    country: "South Africa",
    region: "Africa",
    passportRules: {
      UG: { type: "required", fee: "Free",        processing: "Apply 6+ weeks in advance"   },
      KE: { type: "arrival",  fee: "Free",         processing: "On arrival (30 days)"       },
      TZ: { type: "arrival",  fee: "Free",         processing: "On arrival (30 days)"       },
      RW: { type: "required", fee: "Free",         processing: "Apply in advance"           },
      ET: { type: "required", fee: "Free",         processing: "Apply in advance"           },
    },
    defaultType: "required",
    docs: ["Valid passport (30+ days beyond travel)", "Return ticket", "Proof of accommodation", "Proof of sufficient funds", "Yellow fever certificate (if applicable)", "Two blank pages in passport"],
    tip: "Uganda passport holders must apply at the South African High Commission — one of the slower processes in the region. Start early.",
    difficulty: "medium",
    notes: "Kenya and Tanzania get visa on arrival. Other EAC members still require advance application.",
  },
];

/* ─────────────────────────────────────────
   VisaCard sub-component
───────────────────────────────────────── */
function VisaCard({ entry, passport }: { entry: VisaEntry; passport: string }) {
  const [expanded, setExpanded] = useState(false);

  const pInfo = passport && entry.passportRules[passport as PassportCode]
    ? entry.passportRules[passport as PassportCode]
    : null;
  const visaType: VisaType = pInfo ? pInfo.type : entry.defaultType;
  const diff = DIFFICULTY_CONFIG[entry.difficulty];
  const regionStyle = REGION_STYLES[entry.region] ?? "bg-slate-50 text-slate-600";

  return (
    <motion.div
      layout
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {/* Card top */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 truncate">{entry.country}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TYPE_STYLES[visaType]}`}>
                {TYPE_LABEL[visaType]}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${regionStyle}`}>
                {entry.region}
              </span>
            </div>
          </div>
          <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${diff.bg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${diff.color}`} />
            {diff.label}
          </span>
        </div>

        {/* Fee / Processing row */}
        {pInfo ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Fee", value: pInfo.fee },
              { label: "Processing", value: pInfo.processing },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-slate-50 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
            Select your passport above to see fees &amp; processing times.
          </p>
        )}
      </div>

      {/* Expandable details */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between border-t border-slate-100 px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
      >
        <span className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          Documents &amp; tips
        </span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-5 pb-5 pt-2">
              {/* Docs */}
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-wider text-slate-400">Required documents</p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.docs.map((doc) => (
                    <span
                      key={doc}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="flex gap-2.5 rounded-xl bg-blue-50 p-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <p className="text-xs leading-relaxed text-blue-800">{entry.tip}</p>
              </div>

              {/* Notes */}
              {entry.notes && (
                <p className="flex items-start gap-1.5 text-xs text-slate-400">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {entry.notes}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <a
                  href="/apply"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[var(--secondary)]"
                >
                  Apply now <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/apply?service=cover-letter"
                  className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cover letter help
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main export
───────────────────────────────────────── */
export default function VisaRequirementsExplorer() {
  const [search, setSearch] = useState("");
  const [passport, setPassport] = useState<string>("");

  const filtered = data.filter(
    (d) =>
      d.country.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search + Passport filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/10"
            placeholder="Search destination or region…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[var(--primary)]/50 sm:w-48"
        >
          <option value="">All passports</option>
          {(Object.entries(PASSPORT_LABELS) as [PassportCode, string][]).map(([code, label]) => (
            <option key={code} value={code}>
              {PASSPORT_FLAGS[code]} {label}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="mt-3 text-xs text-slate-400">
        {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
        {passport && PASSPORT_LABELS[passport as PassportCode]
          ? ` · ${PASSPORT_FLAGS[passport as PassportCode]} ${PASSPORT_LABELS[passport as PassportCode]} passport`
          : ""}
      </p>

      {/* Cards */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="col-span-2 py-10 text-center text-sm text-slate-400">
            No destinations found. Try a different search.
          </p>
        ) : (
          filtered.map((entry) => (
            <VisaCard key={entry.country} entry={entry} passport={passport} />
          ))
        )}
      </div>
    </div>
  );
}