"use client";
import { useState } from "react";

/**
 * TravelAdvisoryNews
 *
 * SEO NOTES:
 * - Each news item should link to a real slug page: /blog/[slug]
 * - Replace `news` array with a fetch from your CMS / API / MDX files
 * - The category filter helps internal linking and crawlability
 * - Add structured data (JSON-LD NewsArticle) on the individual slug pages
 */

const news = [
  {
    slug: "france-schengen-visa-requirements-2026",
    title: "France updates Schengen visa requirements for 2026",
    date: "2026-04-10",
    category: "Policy Update",
    country: "France",
    flag: "🇫🇷",
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
    summary:
      "Italy's consulate now mandates biometric enrollment for all first-time applicants from Uganda regardless of prior Schengen history. Book biometrics before submitting documents.",
  },
];

const CATEGORIES = ["All", "Policy Update", "Travel Advisory", "Operational"];

const CATEGORY_STYLES = {
  "Policy Update": { background: "rgba(201,168,76,.12)", color: "#8B6914" },
  "Travel Advisory": { background: "rgba(220,38,38,.08)", color: "#991B1B" },
  "Operational": { background: "rgba(59,130,246,.08)", color: "#1D4ED8" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-UG", {
    day: "numeric", month: "long", year: "numeric",
  });
}

const styles = `
  .advisory-wrap { font-family: 'DM Sans', system-ui, sans-serif; }
  .advisory-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .filter-btn {
    font-size: 12px; font-weight: 500; padding: 6px 14px;
    border-radius: 3px; border: 1px solid #E5E7EB;
    background: transparent; color: #6B7280;
    cursor: pointer; transition: all .18s; letter-spacing: .03em;
  }
  .filter-btn:hover { border-color: #C9A84C; color: #1A1A14; }
  .filter-btn.active { background: #C9A84C; border-color: #C9A84C; color: #0B1C2D; }
  .advisory-list { display: flex; flex-direction: column; gap: 1px; }
  .advisory-item {
    display: grid; grid-template-columns: auto 1fr auto;
    gap: 20px; align-items: start;
    padding: 20px 0;
    border-bottom: 1px solid #F3F0E8;
    text-decoration: none; color: inherit;
    transition: background .15s;
  }
  .advisory-item:last-child { border-bottom: none; }
  .advisory-item:hover .advisory-title { color: #C9A84C; }
  .advisory-flag { font-size: 24px; margin-top: 2px; }
  .advisory-body { }
  .advisory-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap; }
  .advisory-category {
    font-size: 10px; font-weight: 600; padding: 3px 8px;
    border-radius: 2px; letter-spacing: .08em; text-transform: uppercase;
  }
  .advisory-date { font-size: 12px; color: #9CA3AF; }
  .advisory-title {
    font-size: 15px; font-weight: 500; color: #0B1C2D;
    margin-bottom: 6px; line-height: 1.4;
    transition: color .18s;
  }
  .advisory-summary { font-size: 13px; color: #6B7280; line-height: 1.65; font-weight: 300; }
  .advisory-arrow { font-size: 16px; color: #D6C9A8; margin-top: 4px; transition: color .18s; }
  .advisory-item:hover .advisory-arrow { color: #C9A84C; }
  .advisory-empty { font-size: 14px; color: #9CA3AF; padding: 32px 0; text-align: center; }
  .advisory-footer { margin-top: 24px; padding-top: 20px; border-top: 1px solid #F3F0E8; display: flex; justify-content: space-between; align-items: center; }
  .advisory-count { font-size: 12px; color: #9CA3AF; }
  .advisory-cta {
    font-size: 13px; font-weight: 500; color: #C9A84C;
    text-decoration: none; display: flex; align-items: center; gap: 6px;
    transition: gap .2s;
  }
  .advisory-cta:hover { gap: 10px; }
`;

export default function TravelAdvisoryNews() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? news
    : news.filter((n) => n.category === activeCategory);

  return (
    <aside className="advisory-wrap">
      <style>{styles}</style>

      {/* Filters */}
      <div className="advisory-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="advisory-list">
        {filtered.length === 0 ? (
          <div className="advisory-empty">No advisories in this category yet.</div>
        ) : (
          filtered.map((item) => (
            <a
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="advisory-item"
            >
              <div className="advisory-flag">{item.flag}</div>
              <div className="advisory-body">
                <div className="advisory-meta">
                  <span
                    className="advisory-category"
                    style={CATEGORY_STYLES[item.category as keyof typeof CATEGORY_STYLES] ?? {}}
                  >
                    {item.category}
                  </span>
                  <span className="advisory-date">{formatDate(item.date)}</span>
                </div>
                <div className="advisory-title">{item.title}</div>
                <div className="advisory-summary">{item.summary}</div>
              </div>
              <div className="advisory-arrow">→</div>
            </a>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="advisory-footer">
        <span className="advisory-count">{filtered.length} update{filtered.length !== 1 ? "s" : ""}</span>
        <a href="/blog" className="advisory-cta">
          All advisories →
        </a>
      </div>
    </aside>
  );
}