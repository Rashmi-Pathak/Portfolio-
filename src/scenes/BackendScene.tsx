"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Database, Globe, Lock, Server } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { SKILL_CATEGORIES } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BackendNode {
  id: "client" | "gateway" | "service" | "database";
  title: string;
  subtitle: string;
  role: string;
  requestSample: string;
  responseSample: string;
}

const BACKEND_NODES: readonly BackendNode[] = [
  {
    id: "client",
    title: "Frontend Client",
    subtitle: "Browser / React UI",
    role: "Dispatches typed REST requests with session headers and validates form inputs before transmission.",
    requestSample: `POST /api/v1/projects/query\nContent-Type: application/json\n{ "domain": "fintech", "limit": 5 }`,
    responseSample: `200 OK · Rendered 5 structured records in UI state`,
  },
  {
    id: "gateway",
    title: "API Gateway / Auth",
    subtitle: "Routing & Verification",
    role: "Validates authentication tokens, enforces rate limits, parses request schemas, and routes traffic safely.",
    requestSample: `Authorization: Bearer <verified_session_token>\nRoute Match -> /projects/query`,
    responseSample: `Auth Verified · Forwarded request to Domain Service`,
  },
  {
    id: "service",
    title: "Backend Services",
    subtitle: "Server-Side Logic",
    role: "Executes core business rules, transforms payloads, coordinates ML/analytics calls, and handles error states.",
    requestSample: `service.fetchPortfolioEntries({ domain: "fintech" })`,
    responseSample: `{\n  "status": "ok",\n  "items": ["TradeCore", "FraudShield AI", "Bluestock MF"]\n}`,
  },
  {
    id: "database",
    title: "Database Layer",
    subtitle: "SQL & Persistence",
    role: "Executes parameterized queries with indexed lookups and returns normalized relational records.",
    requestSample: `SELECT id, title, stack FROM projects WHERE domain = $1;`,
    responseSample: `Rows returned: 3 · Parameterized query complete`,
  },
];

const BACKEND_SKILLS =
  SKILL_CATEGORIES.find((c) => c.id === "backend")?.items ?? [];

function getNodeIcon(id: BackendNode["id"]) {
  switch (id) {
    case "client":
      return Globe;
    case "gateway":
      return Lock;
    case "service":
      return Server;
    case "database":
      return Database;
  }
}

export function BackendScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<BackendNode["id"]>("gateway");

  const activeNode =
    BACKEND_NODES.find((n) => n.id === selectedId) ?? BACKEND_NODES[0];

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".be-reveal", { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".be-reveal",
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
      id="backend"
      aria-labelledby="backend-heading"
      className="relative overflow-hidden border-t border-warm-cream/10 bg-midnight py-24 sm:py-32 px-6 sm:px-10 lg:px-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 30%, rgba(145,165,141,0.11) 0%, transparent 48%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="be-reveal font-mono text-xs tracking-[0.2em] uppercase text-muted-sage">
              08 // Backend Engineering · Request Lifecycle
            </p>
            <h2
              id="backend-heading"
              className="be-reveal mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
            >
              SERVER ARCHITECTURE &amp; APIS
            </h2>
            <p className="be-reveal mt-4 max-w-2xl text-base leading-relaxed text-warm-cream/80">
              Select any tier in the architecture flow below to inspect how
              REST requests move from client UI through authentication, server
              logic, and database persistence.
            </p>
          </div>

          <ul className="be-reveal flex flex-wrap gap-2">
            {BACKEND_SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-md border border-muted-sage/25 bg-graphite/75 px-3 py-1.5 font-mono text-xs text-muted-sage"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Architecture Flow */}
        <div className="be-reveal mt-12 rounded-2xl border border-warm-cream/12 bg-graphite/60 p-5 sm:p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 items-stretch relative">
            {BACKEND_NODES.map((node, index) => {
              const Icon = getNodeIcon(node.id);
              const isSelected = node.id === selectedId;

              return (
                <div key={node.id} className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    aria-pressed={isSelected}
                    className={`flex h-full w-full flex-col justify-between rounded-xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-amber bg-midnight shadow-[0_0_28px_rgba(214,161,91,0.16)]"
                        : "border-warm-cream/12 bg-midnight/65 hover:border-muted-sage/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                          isSelected
                            ? "border-amber/50 bg-amber/15 text-amber"
                            : "border-warm-cream/15 bg-graphite text-muted-sage"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-warm-cream/55">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3 className="font-display text-lg font-semibold text-off-white">
                        {node.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-muted-sage">
                        {node.subtitle}
                      </p>
                    </div>
                  </button>

                  {index < BACKEND_NODES.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden md:flex items-center justify-center px-1 text-amber/75"
                    >
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Animated SVG Pulse Track connecting the 4 layers */}
          <div aria-hidden="true" className="mt-6 hidden md:block">
            <svg viewBox="0 0 1000 36" className="w-full h-9">
              <line
                x1="40"
                y1="18"
                x2="960"
                y2="18"
                stroke="rgba(145, 165, 141, 0.25)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {!prefersReducedMotion && (
                <>
                  <circle r="5" cy="18" fill="#D6A15B">
                    <animate
                      attributeName="cx"
                      values="40;960;40"
                      dur="4.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="4" cy="18" fill="#91A58D">
                    <animate
                      attributeName="cx"
                      values="960;40;960"
                      dur="4.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
            </svg>
          </div>

          {/* Live Tier Inspector */}
          <div className="mt-6 grid grid-cols-1 gap-5 rounded-xl border border-warm-cream/12 bg-midnight/90 p-5 sm:p-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
                Inspecting Layer · {activeNode.title}
              </p>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-warm-cream/85">
                {activeNode.role}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-warm-cream/10 bg-graphite/70 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-sage">
                  Inbound Request
                </p>
                <pre className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-off-white">
                  {activeNode.requestSample}
                </pre>
              </div>
              <div className="rounded-lg border border-warm-cream/10 bg-graphite/70 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber">
                  Outbound Response
                </p>
                <pre className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-warm-cream/90">
                  {activeNode.responseSample}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
