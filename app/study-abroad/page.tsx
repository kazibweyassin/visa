"use client";
import { useState } from "react";

const DESTINATIONS = [
  {
    flag: "🇬🇧", country: "United Kingdom",
    intake: "September / January", duration: "3–4 years (UG)",
    visa: "Student visa (Tier 4)", cost: "£12,000–£26,000/yr",
    slug: "/study/uk",
  },
  {
    flag: "🇨🇦", country: "Canada",
    intake: "September / January", duration: "2–4 years",
    visa: "Study Permit", cost: "CAD $15,000–$35,000/yr",
    slug: "/study/canada",
  },
  {
    flag: "🇩🇪", country: "Germany",
    intake: "October / April", duration: "3–4 years",
    visa: "National Visa (D)", cost: "€0–€3,000/yr (public unis)",
    slug: "/study/germany",
  },
  {
    flag: "🇳🇱", country: "Netherlands",
    intake: "September", duration: "3–4 years",
    visa: "MVV + Residence Permit", cost: "€8,000–€20,000/yr",
    slug: "/study/netherlands",
  },
  {
    flag: "🇦🇺", country: "Australia",
    intake: "February / July", duration: "3–4 years",
    visa: "Student Visa (subclass 500)", cost: "AUD $20,000–$45,000/yr",
    slug: "/study/australia",
  },
  {
    flag: "🇫🇷", country: "France",
    intake: "September", duration: "3–5 years",
    visa: "VLS-TS Student Visa", cost: "€170–€15,000/yr",
    slug: "/study/france",
  },
];

const SERVICES = [
  { icon: "◈", title: "University selection", desc: "Matched to your grades, budget, and career goals." },
  { icon: "✦", title: "Application support", desc: "Personal statements, forms, and submission timelines." },
  { icon: "⬡", title: "Scholarship guidance", desc: "Identifying funding options that fit your profile." },
  { icon: "◎", title: "Student visa preparation", desc: "Full document prep and consulate-ready packet." },
  { icon: "▲", title: "Interview preparation", desc: "Mock sessions for visa and university interviews." },
  { icon: "✿", title: "Pre-departure checklist", desc: "Everything you need before you board the flight." },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .sa-wrap { font-family: 'DM Sans', system-ui, sans-serif; background: #F7F3EC; min-height: 100vh; }

  .sa-hero {
    background: #0B1C2D; padding: 80px 6vw 72px;
    position: relative; overflow: hidden;
  }
  .sa-hero::after {
    content: ''; position: absolute; top: 0; right: 0;
    width: 40%; height: 100%;
    background: radial-gradient(ellipse at 80% 50%, rgba(201,168,76,.08) 0%, transparent 65%);
    pointer-events: none;
  }
  .sa-hero-inner { max-width: 1100px; margin: 0 auto; }
  .sa-eyebrow {
    font-size: 11px; font-weight: 500; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C;
    margin-bottom: 20px; display: block;
  }
  .sa-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 6vw, 64px); font-weight: 400;
    color: #fff; line-height: 1.1; margin-bottom: 20px;
  }
  .sa-hero-title em { font-style: italic; color: #C9A84C; }
  .sa-hero-sub {
    font-size: 15px; color: rgba(255,255,255,.5); line-height: 1.75;
    font-weight: 300; max-width: 520px; margin-bottom: 36px;
  }
  .sa-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .sa-btn-gold {
    display: inline-flex; align-items: center; gap: 8px;
    background: #C9A84C; color: #0B1C2D;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    padding: 13px 28px; border-radius: 3px; border: none;
    cursor: pointer; text-decoration: none; transition: background .2s;
  }
  .sa-btn-gold:hover { background: #E8C97A; }
  .sa-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: rgba(255,255,255,.7);
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
    padding: 12px 26px; border-radius: 3px;
    border: 1px solid rgba(255,255,255,.2);
    cursor: pointer; text-decoration: none; transition: border-color .2s, color .2s;
  }
  .sa-btn-outline:hover { border-color: #C9A84C; color: #C9A84C; }

  .sa-section { padding: 80px 6vw; }
  .sa-section-inner { max-width: 1100px; margin: 0 auto; }
  .sa-label {
    font-size: 11px; font-weight: 500; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; margin-bottom: 14px; display: block;
  }
  .sa-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4vw, 44px); font-weight: 400;
    color: #0B1C2D; line-height: 1.15; margin-bottom: 10px;
  }
  .sa-sub { font-size: 14px; color: #8A8A7A; line-height: 1.7; font-weight: 300; max-width: 520px; margin-bottom: 40px; }

  /* Destinations */
  .sa-dest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .sa-dest-card {
    background: #fff; border: 1px solid #EDE8DF;
    border-radius: 6px; padding: 22px;
    text-decoration: none; color: inherit;
    transition: border-color .2s, box-shadow .2s;
    display: block;
  }
  .sa-dest-card:hover { border-color: #C9A84C; box-shadow: 0 4px 24px rgba(11,28,45,.07); }
  .sa-dest-flag { font-size: 26px; margin-bottom: 12px; }
  .sa-dest-country { font-size: 16px; font-weight: 500; color: #0B1C2D; margin-bottom: 14px; }
  .sa-dest-rows { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
  .sa-dest-row { display: flex; justify-content: space-between; font-size: 12px; }
  .sa-dest-row-label { color: #9CA3AF; }
  .sa-dest-row-value { color: #1A1A14; font-weight: 500; text-align: right; max-width: 55%; }
  .sa-dest-link { font-size: 12px; color: #C9A84C; font-weight: 500; }

  /* Services */
  .sa-services-bg { background: #fff; }
  .sa-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .sa-service-card { padding: 24px; border: 1px solid #EDE8DF; border-radius: 6px; background: #F7F3EC; }
  .sa-service-icon { font-size: 20px; color: #C9A84C; margin-bottom: 12px; }
  .sa-service-title { font-size: 14px; font-weight: 500; color: #0B1C2D; margin-bottom: 6px; }
  .sa-service-desc { font-size: 13px; color: #8A8A7A; line-height: 1.6; font-weight: 300; }

  /* CTA band */
  .sa-cta-band {
    background: #C9A84C; padding: 56px 6vw;
    text-align: center;
  }
  .sa-cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4vw, 44px); font-weight: 400;
    color: #0B1C2D; margin-bottom: 12px;
  }
  .sa-cta-sub { font-size: 14px; color: rgba(11,28,45,.6); margin-bottom: 28px; font-weight: 300; }
  .sa-btn-navy {
    display: inline-flex; align-items: center; gap: 8px;
    background: #0B1C2D; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    padding: 13px 32px; border-radius: 3px; border: none;
    cursor: pointer; text-decoration: none; transition: background .2s;
  }
  .sa-btn-navy:hover { background: #122338; }

  @media (max-width: 860px) {
    .sa-dest-grid, .sa-services-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .sa-dest-grid, .sa-services-grid { grid-template-columns: 1fr; }
    .sa-section { padding: 56px 4vw; }
    .sa-hero { padding: 64px 4vw 56px; }
  }
`;

export default function StudyAbroadPage() {
  return (
    <div className="sa-wrap">
      <style>{styles}</style>

      {/* Hero */}
      <section className="sa-hero">
        <div className="sa-hero-inner">
          <span className="sa-eyebrow">Study abroad · Ailes Global</span>
          <h1 className="sa-hero-title">
            Your degree abroad,<br /><em>without the guesswork.</em>
          </h1>
          <p className="sa-hero-sub">
            From university selection to your student visa — we guide East African students through every step of studying internationally.
          </p>
          <div className="sa-hero-actions">
            <a href="/apply" className="sa-btn-gold">Start your application →</a>
            <a href="https://wa.me/256704833021" target="_blank" rel="noopener" className="sa-btn-outline">Speak to an advisor</a>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="sa-section">
        <div className="sa-section-inner">
          <span className="sa-label">Destinations</span>
          <h2 className="sa-title">Popular study destinations</h2>
          <p className="sa-sub">Country guides, visa requirements, and cost breakdowns for East African students.</p>
          <div className="sa-dest-grid">
            {DESTINATIONS.map((d) => (
              <a href={d.slug} className="sa-dest-card" key={d.country}>
                <div className="sa-dest-flag">{d.flag}</div>
                <div className="sa-dest-country">{d.country}</div>
                <div className="sa-dest-rows">
                  <div className="sa-dest-row">
                    <span className="sa-dest-row-label">Intake</span>
                    <span className="sa-dest-row-value">{d.intake}</span>
                  </div>
                  <div className="sa-dest-row">
                    <span className="sa-dest-row-label">Student visa</span>
                    <span className="sa-dest-row-value">{d.visa}</span>
                  </div>
                  <div className="sa-dest-row">
                    <span className="sa-dest-row-label">Avg. tuition</span>
                    <span className="sa-dest-row-value">{d.cost}</span>
                  </div>
                </div>
                <span className="sa-dest-link">View full guide →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="sa-section sa-services-bg">
        <div className="sa-section-inner">
          <span className="sa-label">What we do</span>
          <h2 className="sa-title">Full support, start to finish</h2>
          <p className="sa-sub">We handle the complexity so you can focus on choosing the right university.</p>
          <div className="sa-services-grid">
            {SERVICES.map((s) => (
              <div className="sa-service-card" key={s.title}>
                <div className="sa-service-icon">{s.icon}</div>
                <div className="sa-service-title">{s.title}</div>
                <div className="sa-service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sa-cta-band">
        <h2 className="sa-cta-title">Ready to study abroad?</h2>
        <p className="sa-cta-sub">Tell us your goals and we'll map out the right path for you.</p>
        <a href="/apply" className="sa-btn-navy">Start your application →</a>
      </section>
    </div>
  );
}