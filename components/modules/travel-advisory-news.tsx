"use client";

import { useState } from "react";
import { ArrowRight, Clock, Radio } from "lucide-react";

const news = [
  {
    slug: "france-schengen-visa-requirements-2026",
    title: "France updates Schengen visa requirements for 2026",
    date: "2026-04-10",
    category: "Policy Update",
    country: "France",
    flag: "🇫🇷",
    live: true,
    summary:
      "France has revised its proof-of-funds threshold and now requires a minimum of €65 per day for Ugandan and Kenyan applicants. Travel insurance must explicitly cover repatriation.",
  },
  {
    slug: "germany-travel-advisory-east-africa-2026",
    title: "Germany issues updated travel advisory for East African applicants",
    date: "2026-04-05",
    category: "Travel Advisory",
    country: "Germany",
    flag: "🇩🇪",
    live: true,
    summary:
      "Germany's embassy in Kampala has extended appointment wait times to 3–4 weeks due to high volume. Applicants are advised to submit at least 8 weeks before intended travel.",
  },
  {
    slug: "schengen-visa-fee-increase-2026",
    title: "Schengen visa fee increases to €90 across all member states",
    date: "2026-03-28",
    category: "Policy Update",
    country: "Schengen",
    flag: "🇪🇺",
    live: false,
    summary:
      "Effective February 2026, the standard Schengen visa fee increased from €80 to €90, applying to all 27 member states.",
  },
  {
    slug: "netherlands-vfs-kampala-extended-hours",
    title: "VFS Kampala extends operating hours for Netherlands applications",
    date: "2026-03-15",
    category: "Operational",
    country: "Netherlands",
    flag: "🇳🇱",
    live: false,
    summary:
      "VFS Global Kampala now accepts Netherlands Schengen visa applications on Saturdays from 9am to 1pm, reducing wait times for working applicants.",
  },
  {
    slug: "italy-schengen-biometrics-uganda-2026",
    title: "Italy requires fresh biometrics for all Ugandan first-time applicants",
    date: "2026-03-01",
    category: "Policy Update",
    country: "Italy",
    flag: "🇮🇹",
    live: false,
    summary:
      "Italy's consulate now mandates biometric enrollment for all first-time applicants from Uganda regardless of prior Schengen history.",
  },
];

const CATEGORIES = ["All", "Policy Update", "Travel Advisory", "Operational"];

const CATEGORY_STYLES: Record<string, string> = {
  "Policy Update":   "bg-amber-100 text-amber-800 border-amber-200",
  "Travel Advisory": "bg-rose-50 text-rose-700 border-rose-200",
  "Operational":     "bg-cyan-50 text-cyan-700 border-cyan-200",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-UG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TravelAdvisoryNews() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? news : news.filter((n) => n.category === activeCategory);

  return (
    <aside className="w-full">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150
              ${activeCategory === cat
                ? "border-amber-500 bg-amber-500 text-white"
                : "border-slate-200 bg-white text-slate-500 hover:border-amber-400 hover:text-slate-800"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Advisory list */}
      <div className="mt-5 divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">No advisories in this category yet.</p>
        ) : (
          filtered.map((item) => {
            const Tag = item.live ? "a" : "div";
            const tagProps = item.live ? { href: `/blog/${item.slug}` } : {};

            return (
              <Tag
                key={item.slug}
                {...(tagProps as Record<string, string>)}
                className={`flex items-start gap-4 py-5 transition-colors
                  ${item.live ? "group cursor-pointer hover:bg-slate-50/60 -mx-3 px-3 rounded-xl" : "cursor-default opacity-75"}`}
              >
                {/* Flag */}
                <span className="mt-0.5 shrink-0 text-xl">{item.flag}</span>

                {/* Body */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider
                        ${CATEGORY_STYLES[item.category] ?? "border-slate-200 bg-slate-100 text-slate-600"}`}
                    >
                      {item.category}
                    </span>

                    {item.live ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                        <Radio className="h-3 w-3" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock className="h-3 w-3" />
                        Coming soon
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400">{formatDate(item.date)}</span>
                  </div>

                  <p
                    className={`mt-1.5 text-sm font-medium leading-snug text-slate-900
                      ${item.live ? "group-hover:text-amber-600 transition-colors" : ""}`}
                  >
                    {item.title}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {item.summary}
                  </p>
                </div>

                {item.live && (
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-amber-500" />
                )}
              </Tag>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          {filtered.length} update{filtered.length !== 1 ? "s" : ""}
        </span>
        <a
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 transition-colors hover:text-amber-700"
        >
          All advisories <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>
  );
}