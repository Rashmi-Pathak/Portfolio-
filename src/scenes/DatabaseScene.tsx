"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Database, Play } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { SKILL_CATEGORIES } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DB_SKILLS =
  SKILL_CATEGORIES.find((c) => c.id === "database")?.items ?? [];

interface QueryPreset {
  id: string;
  label: string;
  sql: string;
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}

const SQL_PRESETS: readonly QueryPreset[] = [
  {
    id: "projects",
    label: "Active Projects",
    sql: `SELECT title, domain, primary_stack\nFROM portfolio_projects\nORDER BY id ASC;`,
    caption: "Indexed portfolio projects overview",
    columns: ["title", "domain", "primary_stack"],
    rows: [
      ["TradeCore", "FinTech", "TypeScript · React · SQL"],
      ["FraudShield AI", "AI / ML", "Python · Scikit-learn · Pandas"],
      ["TripEase", "Web App", "React · Next.js · REST API"],
      ["Bluestock MF", "FinTech", "React · Tailwind · Analytics"],
      ["CyberPredict", "Security ML", "Python · NumPy · Matplotlib"],
    ],
  },
  {
    id: "databases",
    label: "Storage Engines",
    sql: `SELECT engine, paradigm, primary_use\nFROM data_stack\nWHERE verified = TRUE;`,
    caption: "Relational & data processing technologies",
    columns: ["engine", "paradigm", "primary_use"],
    rows: [
      ["PostgreSQL", "Relational SQL", "Structured app persistence"],
      ["MySQL", "Relational SQL", "Transactional schemas"],
      ["SQLite", "Embedded SQL", "Lightweight local datasets"],
      ["Pandas", "DataFrame ETL", "Cleaning & feature pipelines"],
    ],
  },
  {
    id: "education",
    label: "Academic Track",
    sql: `SELECT degree, graduation_year, focus\nFROM education_profile;`,
    caption: "Verified academic record",
    columns: ["degree", "graduation_year", "focus"],
    rows: [
      [
        "B.Tech Information Technology",
        "2028",
        "Software Systems · AI/ML · Full-Stack",
      ],
    ],
  },
];

const ETL_STAGES = [
  "Ingest Raw Data",
  "Clean & Transform",
  "Store in SQL",
  "Execute Query",
  "Render Insights",
] as const;

export function DatabaseScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("projects");

  const activePreset =
    SQL_PRESETS.find((p) => p.id === selectedPresetId) ?? SQL_PRESETS[0];

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".db-reveal", { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".db-reveal",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="database"
      aria-labelledby="database-heading"
      className="relative overflow-hidden border-t border-warm-cream/10 bg-midnight py-24 sm:py-32 px-6 sm:px-10 lg:px-14"
    >
      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="db-reveal font-mono text-xs tracking-[0.2em] uppercase text-muted-sage">
              10 // Database &amp; Data Engineering
            </p>
            <h2
              id="database-heading"
              className="db-reveal mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
            >
              DATA PIPELINES &amp; SQL QUERIES
            </h2>
            <p className="db-reveal mt-4 max-w-2xl text-base leading-relaxed text-warm-cream/80">
              From Python/Pandas preprocessing to normalized SQL schemas—run a
              preset query below to inspect how structured data flows through the
              storage layer.
            </p>
          </div>

          <ul className="db-reveal flex flex-wrap gap-2">
            {DB_SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-md border border-warm-cream/15 bg-graphite/80 px-3 py-1.5 font-mono text-xs text-warm-cream/90"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Animated ETL Pipeline Bar */}
        <div className="db-reveal mt-10 rounded-2xl border border-warm-cream/12 bg-graphite/60 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {ETL_STAGES.map((stage, idx) => (
              <div key={stage} className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 rounded-lg border border-warm-cream/15 bg-midnight/85 px-3.5 py-2.5">
                  {/* SVG Database Cylinder Accent on Storage Stage */}
                  <Database
                    className={`h-4 w-4 ${
                      idx === 2 ? "text-amber" : "text-muted-sage"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-off-white">
                    {stage}
                  </span>
                </div>
                {idx < ETL_STAGES.length - 1 && (
                  <ArrowRight
                    className="hidden sm:block h-4 w-4 text-amber/65"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Interactive SQL Query Workspace */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Query Presets & Editor */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                {SQL_PRESETS.map((preset) => {
                  const isActive = preset.id === selectedPresetId;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      aria-pressed={isActive}
                      className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                        isActive
                          ? "border-amber bg-amber text-midnight font-semibold"
                          : "border-warm-cream/15 bg-midnight/75 text-warm-cream/85 hover:border-amber/50"
                      }`}
                    >
                      <Play className="h-3 w-3" aria-hidden="true" />
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl border border-warm-cream/12 bg-midnight/90 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber">
                  SQL Console · Read-Only Demo
                </p>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-muted-sage">
                  <code>{activePreset.sql}</code>
                </pre>
              </div>
            </div>

            {/* Semantic Query Result Table */}
            <div className="lg:col-span-7 rounded-xl border border-warm-cream/12 bg-midnight/90 p-5 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className="mb-3 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-warm-cream/70">
                  {activePreset.caption} ({activePreset.rows.length} rows)
                </caption>
                <thead>
                  <tr className="border-b border-warm-cream/15 font-mono text-[11px] uppercase tracking-wider text-amber">
                    {activePreset.columns.map((col) => (
                      <th key={col} scope="col" className="py-2.5 pr-4 font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-cream/10 text-sm text-warm-cream/90">
                  {activePreset.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-2.5 pr-4 ${
                            cIdx === 0
                              ? "font-medium text-off-white"
                              : "font-mono text-xs text-warm-cream/75"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
