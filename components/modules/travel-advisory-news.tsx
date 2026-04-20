"use client";
import { useState } from "react";

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
    live: false,
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
      "Effective February 2026, the standard Schengen visa fee has increased from €80 to €90. The change applies to all 27 Schengen member states including France, Germany, and Netherlands.",
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
      "Italy's consulate now mandates biometric enrollment for all first-time applicants from Uganda regardless of prior Schengen history. Book biometrics before submitting documents.",
  },
];

const CATEGORIES = ["All", "Policy Update", "Travel Advisory", "Operational"];

const CATEGORY_STYLES: Record<string, string> = {
  "Policy Update":   "bg-amber-100 text-amber-800",
  "Travel Advisory": "bg-red-50 text-red-700",
  "Operational":     "bg-blue-50 text-blue-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-UG", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function TravelAdvisoryNews() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? news
      : news.filter((n) => n.category === activeCategory);

  return (
    <aside className="w-full">

      {/* ── Category filters ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-medium px-4 py-2 rounded border transition-colors
              ${activeCategory === cat
                ? "bg-amber-500 border-amber-500 text-white"
                : "bg-white border-gray-200 text-gray-500 hover:border-amber-400 hover:text-gray-800"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── List ── */}
      <div className="divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">
            No advisories in this category yet.
          </p>
        ) : (
          filtered.map((item) => {
            const Wrapper = item.live ? "a" : "div";
            const wrapperProps = item.live
              ? { href: `/blog/${item.slug}` }
              : {};

            return (
              <Wrapper
                key={item.slug}
                {...wrapperProps}
                className={`flex items-start gap-4 py-5 group
                  ${item.live ? "cursor-pointer" : "cursor-default opacity-80"}`}
              >
                {/* Flag */}
                <span className="text-2xl mt-0.5 shrink-0">{item.flag}</span>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${CATEGORY_STYLES[item.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
                    {!item.live && (
                      <span className="text-[10px] font-medium text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                        Coming soon
                      </span>
                    )}
                  </div>

                  <p className={`text-sm font-medium text-gray-900 mb-1 leading-snug
                    ${item.live ? "group-hover:text-amber-600 transition-colors" : ""}`}>
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                {/* Arrow — only shown for live items */}
                {item.live && (
                  <span className="text-gray-300 group-hover:text-amber-500 transition-colors text-lg shrink-0 mt-1">
                    →
                  </span>
                )}
              </Wrapper>
            );
          })
        )}
      </div>

      {/* ── Footer ── */}
      <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {filtered.length} update{filtered.length !== 1 ? "s" : ""}
        </span>
        <a
          href="/blog"
          className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
        >
          All advisories →
        </a>
      </div>
    </aside>
  );
}