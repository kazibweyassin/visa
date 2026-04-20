"use client";
import React from "react";

const data: Array<{
  country: string;
  region: string;
  passportRules: Record<PassportCode, { type: VisaType; fee: string; processing: string }>;
  defaultType: VisaType;
  docs: string[];
  tip: string;
  difficulty: Difficulty;
  notes?: string;
}> = [
  {
    country: "United Arab Emirates",
    region: "Middle East",
    passportRules: {
      UG: { type: "required" as VisaType, fee: "$90", processing: "5–10 business days" },
      KE: { type: "evisa" as VisaType, fee: "$65", processing: "3–5 business days" },
      TZ: { type: "required" as VisaType, fee: "$90", processing: "5–10 business days" },
      RW: { type: "evisa" as VisaType, fee: "$65", processing: "3–5 business days" },
      ET: { type: "required" as VisaType, fee: "$95", processing: "7–14 business days" },
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
      UG: { type: "required" as VisaType, fee: "£115", processing: "15–20 business days" },
      KE: { type: "required" as VisaType, fee: "£115", processing: "15–20 business days" },
      TZ: { type: "required" as VisaType, fee: "£115", processing: "15–20 business days" },
      RW: { type: "required" as VisaType, fee: "£115", processing: "15–20 business days" },
      ET: { type: "required" as VisaType, fee: "£115", processing: "15–20 business days" },
    },
    defaultType: "required",
    docs: ["Valid passport", "Proof of funds (6 months bank statements)", "Employer letter / sponsorship letter", "Hotel bookings", "Travel history evidence", "Ties to home country evidence"],
    tip: "Strong ties to home country (employment, property, family) are critical. Refusals are common for first-time applicants without a strong financial profile.",
    difficulty: "hard",
    notes: "High refusal rate for East African applicants. Recommend professional cover letter support.",
  },
  {
    country: "Schengen Area",
    region: "Europe",
    passportRules: {
      UG: { type: "required" as VisaType, fee: "€90", processing: "15 business days" },
      KE: { type: "required" as VisaType, fee: "€90", processing: "15 business days" },
      TZ: { type: "required" as VisaType, fee: "€90", processing: "15 business days" },
      RW: { type: "required" as VisaType, fee: "€90", processing: "15 business days" },
      ET: { type: "required" as VisaType, fee: "€90", processing: "15 business days" },
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
      UG: { type: "required" as VisaType, fee: "$140", processing: "4–7 business days" },
      KE: { type: "required" as VisaType, fee: "$140", processing: "4–7 business days" },
      TZ: { type: "required" as VisaType, fee: "$140", processing: "4–7 business days" },
      RW: { type: "required" as VisaType, fee: "$140", processing: "4–7 business days" },
      ET: { type: "required" as VisaType, fee: "$140", processing: "4–7 business days" },
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
      UG: { type: "required" as VisaType, fee: "CAD$185", processing: "20–40 business days" },
      KE: { type: "required" as VisaType, fee: "CAD$185", processing: "20–40 business days" },
      TZ: { type: "required" as VisaType, fee: "CAD$185", processing: "20–40 business days" },
      RW: { type: "required" as VisaType, fee: "CAD$185", processing: "20–40 business days" },
      ET: { type: "required" as VisaType, fee: "CAD$185", processing: "20–40 business days" },
    },
    defaultType: "required",
    docs: ["Valid passport", "Completed IMM 5257 form", "Financial proof (bank statements)", "Employment letter", "Purpose of travel letter", "Biometrics enrollment", "Ties to home country"],
    tip: "Biometrics are mandatory. Book the biometrics appointment before submitting your application — slots fill up fast in East Africa.",
    difficulty: "hard",
    notes: "Processing times vary widely. Apply 2–3 months in advance.",
  },
  {
    country: "Rwanda",
    region: "Africa",
    passportRules: {
      UG: { type: "free" as VisaType, fee: "Free", processing: "On arrival" },
      KE: { type: "free" as VisaType, fee: "Free", processing: "On arrival" },
      TZ: { type: "free" as VisaType, fee: "Free", processing: "On arrival" },
      RW: { type: "free" as VisaType, fee: "—", processing: "Citizen" },
      ET: { type: "arrival" as VisaType, fee: "$30", processing: "On arrival" },
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
      UG: { type: "evisa" as VisaType, fee: "$50", processing: "Instant–48 hours" },
      KE: { type: "evisa" as VisaType, fee: "$50", processing: "Instant–48 hours" },
      TZ: { type: "evisa" as VisaType, fee: "$50", processing: "Instant–48 hours" },
      RW: { type: "evisa" as VisaType, fee: "$50", processing: "Instant–48 hours" },
      ET: { type: "required" as VisaType, fee: "$50", processing: "3–5 business days" },
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
      UG: { type: "required" as VisaType, fee: "Free (port of entry)", processing: "Apply 6+ weeks in advance" },
      KE: { type: "arrival" as VisaType, fee: "Free", processing: "On arrival (30 days)" },
      TZ: { type: "arrival" as VisaType, fee: "Free", processing: "On arrival (30 days)" },
      RW: { type: "required" as VisaType, fee: "Free", processing: "Apply in advance" },
      ET: { type: "required" as VisaType, fee: "Free", processing: "Apply in advance" },
    },
    defaultType: "required",
    docs: ["Valid passport (30+ days beyond travel)", "Return ticket", "Proof of accommodation", "Proof of sufficient funds", "Yellow fever certificate (if applicable)", "Two blank pages in passport"],
    tip: "Uganda passport holders must apply at the South African High Commission — one of the slower processes in the region. Start early.",
    difficulty: "medium",
    notes: "Kenya and Tanzania get visa on arrival. Other EAC members still require advance application.",
  },
];


type PassportCode = "UG" | "KE" | "TZ" | "RW" | "ET";
type VisaType = "free" | "evisa" | "required" | "arrival";
type Difficulty = "easy" | "medium" | "hard";

const PASSPORT_LABELS: Record<PassportCode, string> = { UG: "Uganda", KE: "Kenya", TZ: "Tanzania", RW: "Rwanda", ET: "Ethiopia" };
const TYPE_LABEL: Record<VisaType, string> = { free: "Visa-free", evisa: "E-Visa", required: "Visa required", arrival: "Visa on arrival" };
const DIFFICULTY_LABEL: Record<Difficulty, string> = { easy: "Easy", medium: "Moderate", hard: "Challenging" };

const BADGE_STYLES: Record<VisaType, { background: string; color: string }> = {
  free:     { background: "#EAF3DE", color: "#3B6D11" },
  evisa:    { background: "#E6F1FB", color: "#185FA5" },
  required: { background: "#FAECE7", color: "#993C1D" },
  arrival:  { background: "#FAEEDA", color: "#854F0B" },
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = { easy: "#639922", medium: "#BA7517", hard: "#A32D2D" };

import { CSSProperties } from "react";
const styles: Record<string, CSSProperties> = {
  wrapper: { fontFamily: "system-ui, sans-serif", padding: "1rem 0" },
  searchRow: { display: "flex", gap: 10, marginBottom: 12 },
  input: {
    flex: 1, padding: "8px 12px", fontSize: 14, borderRadius: 8,
    border: "1px solid #d1d5db", outline: "none",
  },
  select: {
    flex: "0 0 180px", padding: "8px 12px", fontSize: 14,
    borderRadius: 8, border: "1px solid #d1d5db", outline: "none",
  },
  meta: { fontSize: 13, color: "#6b7280", marginBottom: 12 },
  card: {
    background: "#fff", border: "1px solid #e5e7eb",
    borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 12,
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  countryName: { fontSize: 17, fontWeight: 500, marginBottom: 4 },
  badgesRow: { display: "flex", gap: 6, flexWrap: "wrap" as CSSProperties["flexWrap"] },
  badge: { fontSize: 11, padding: "3px 8px", borderRadius: 6, fontWeight: 500 },
  regionBadge: { fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "#f3f4f6", color: "#6b7280", fontWeight: 500 },
  difficulty: { display: "flex", alignItems: "center", gap: 5 },
  dot: { width: 8, height: 8, borderRadius: "50%" },
  diffLabel: { fontSize: 12, color: "#6b7280" },
  feeRow: { display: "flex", gap: 24, marginBottom: 12 },
  feeBlock: {},
  sectionLabel: { fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 },
  feeValue: { fontSize: 14, fontWeight: 500 },
  processingValue: { fontSize: 14 },
  docsWrap: { display: "flex", flexWrap: "wrap" as CSSProperties["flexWrap"], gap: 6, marginBottom: 12 },
  docPill: {
    fontSize: 12, padding: "3px 10px", borderRadius: 6,
    background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151",
  },
  tipBox: {
    borderLeft: "2px solid #3b82f6", padding: "8px 12px",
    marginBottom: 12, fontSize: 13, lineHeight: 1.6, color: "#374151",
    background: "#f0f9ff",
  },
  notes: { fontSize: 12, color: "#9ca3af", marginBottom: 12 },
  passportNote: { fontSize: 12, color: "#9ca3af", fontStyle: "italic", marginBottom: 12 },
  actionRow: { display: "flex", gap: 8 },
  btn: {
    fontSize: 13, padding: "6px 14px", borderRadius: 8,
    border: "1px solid #d1d5db", background: "transparent",
    cursor: "pointer", color: "#374151",
  },
  empty: { fontSize: 14, color: "#9ca3af", textAlign: "center" as CSSProperties["textAlign"], padding: "2rem 0" },
};

interface VisaCardProps {
  entry: {
    country: string;
    region: string;
    passportRules: Record<PassportCode, { type: VisaType; fee: string; processing: string }>;
    defaultType: VisaType;
    docs: string[];
    tip: string;
    difficulty: Difficulty;
    notes?: string;
  };
  passport: string;
}

function VisaCard({ entry, passport }: VisaCardProps) {
  const pInfo = passport && entry.passportRules[passport as PassportCode] ? entry.passportRules[passport as PassportCode] : null;
  const visaType: VisaType = pInfo ? pInfo.type : entry.defaultType;

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div>
          <div style={styles.countryName}>{entry.country}</div>
          <div style={styles.badgesRow}>
            <span style={{ ...styles.badge, ...BADGE_STYLES[visaType] }}>{TYPE_LABEL[visaType]}</span>
            <span style={styles.regionBadge}>{entry.region}</span>
          </div>
        </div>
        <div style={styles.difficulty}>
          <span style={{ ...styles.dot, background: DIFFICULTY_COLORS[entry.difficulty] }} />
          <span style={styles.diffLabel}>{DIFFICULTY_LABEL[entry.difficulty]}</span>
        </div>
      </div>

      {pInfo ? (
        <div style={styles.feeRow}>
          <div style={styles.feeBlock}>
            <div style={styles.sectionLabel}>Fee</div>
            <div style={styles.feeValue}>{pInfo.fee}</div>
          </div>
          <div style={styles.feeBlock}>
            <div style={styles.sectionLabel}>Processing</div>
            <div style={styles.processingValue}>{pInfo.processing}</div>
          </div>
        </div>
      ) : (
        <p style={styles.passportNote}>Select your passport above to see fees &amp; processing times</p>
      )}

      <div style={styles.sectionLabel}>Required documents</div>
      <div style={styles.docsWrap}>
        {entry.docs.map((doc: string) => (
          <span key={doc} style={styles.docPill}>{doc}</span>
        ))}
      </div>

      <div style={styles.tipBox}>{entry.tip}</div>

      {entry.notes && <div style={styles.notes}>{entry.notes}</div>}

      <div style={styles.actionRow}>
        <button style={styles.btn}>Cover letter help</button>
        <button style={styles.btn}>Refusal risks</button>
      </div>
    </div>
  );
}

export default function VisaRequirementsExplorer() {
  const [search, setSearch] = React.useState<string>("");
  const [passport, setPassport] = React.useState<string>("");

  const filtered = data.filter(
    (d) =>
      d.country.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.searchRow}>
        <input
          style={styles.input}
          placeholder="Search destination country or region..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          style={styles.select}
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
        >
          <option value="">All passports</option>
          {Object.entries(PASSPORT_LABELS).map(([code, label]) => (
            <option key={code} value={code}>{label}</option>
          ))}
        </select>
      </div>

      <p style={styles.meta}>
        {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
        {passport && PASSPORT_LABELS[passport as PassportCode] ? ` — ${PASSPORT_LABELS[passport as PassportCode]} passport` : ""}
      </p>

      {filtered.length === 0 ? (
        <p style={styles.empty}>No destinations found. Try a different search.</p>
      ) : (
        filtered.map((entry) => (
          <VisaCard key={entry.country} entry={entry} passport={passport} />
        ))
      )}
    </div>
  );
}