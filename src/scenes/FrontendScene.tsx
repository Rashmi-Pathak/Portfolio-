"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Code, Layout, Layers, Sparkles } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { SKILL_CATEGORIES } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FRONTEND_SKILLS =
  SKILL_CATEGORIES.find((c) => c.id === "frontend")?.items ?? [];

const CODE_SNIPPET = `interface SceneProps {
  title: string;
  interactive: boolean;
}

export function DeveloperCard({ title, interactive }: SceneProps) {
  return (
    <article className="rounded-xl border border-amber/20 bg-graphite p-5">
      <h3 className="font-display text-lg text-off-white">{title}</h3>
      <p className="mt-1 text-sm text-warm-cream/80">
        {interactive ? "Scroll-synchronized UI" : "Static Editorial View"}
      </p>
    </article>
  );
}`;

export function FrontendScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "structure">("preview");
  const [selectedSkill, setSelectedSkill] = useState<string>("React");

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".fe-assemble", ".fe-browser-part"], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.fromTo(
        ".fe-assemble",
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

      gsap.fromTo(
        ".fe-browser-part",
        { opacity: 0, y: 14, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fe-browser-shell",
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
      id="frontend"
      aria-labelledby="frontend-heading"
      className="relative overflow-hidden border-t border-warm-cream/10 bg-[#141719] py-24 sm:py-32 px-6 sm:px-10 lg:px-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 22%, rgba(214,161,91,0.09) 0%, transparent 45%), radial-gradient(circle at 18% 78%, rgba(63,96,73,0.12) 0%, transparent 48%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1380px]">
        {/* Header + Subtle Character Typing Vignette */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="fe-assemble font-mono text-xs tracking-[0.2em] uppercase text-amber">
              07 // The Technical World · Frontend Engineering
            </p>
            <h2
              id="frontend-heading"
              className="fe-assemble mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
            >
              CRAFTING INTERACTIVE INTERFACES
            </h2>
            <p className="fe-assemble mt-4 max-w-2xl text-base leading-relaxed text-warm-cream/80">
              Inside the browser environment: modular React components, semantic
              HTML, responsive Tailwind layouts, and strict TypeScript contracts
              assembled for smooth user interaction.
            </p>

            {/* Skill Chips */}
            <div className="fe-assemble mt-6 flex flex-wrap gap-2">
              {FRONTEND_SKILLS.map((skill) => {
                const isSelected = skill === selectedSkill;
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    aria-pressed={isSelected}
                    className={`min-h-9 rounded-md border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                      isSelected
                        ? "border-amber bg-amber text-midnight font-semibold"
                        : "border-warm-cream/15 bg-graphite/80 text-warm-cream/85 hover:border-amber/50 hover:text-amber"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Character Typing Illustration integrated seamlessly on dark background via radial mask */}
          <div className="fe-assemble lg:col-span-4 flex justify-start lg:justify-end">
            <div
              className="relative w-full max-w-[270px] overflow-hidden rounded-2xl bg-[#000000]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 84% 82% at 50% 48%, black 58%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 84% 82% at 50% 48%, black 58%, transparent 100%)",
              }}
            >
              <div className="relative aspect-[1024/935] w-full">
                <Image
                  src="/assets/character/character-typing.jpg"
                  alt="Illustration of Rashmi Pathak typing code on her laptop at her walnut desk"
                  width={1024}
                  height={935}
                  loading="eager"
                  sizes="270px"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Browser Assembly + Code Editor Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Assembling Browser Window */}
          <div className="fe-browser-shell lg:col-span-7 rounded-2xl border border-warm-cream/15 bg-graphite/75 p-4 sm:p-6 shadow-2xl">
            {/* Browser Chrome Header */}
            <div className="fe-browser-part flex flex-wrap items-center justify-between gap-3 border-b border-warm-cream/10 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-sage/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-dusty-mauve/75" />
                <span className="ml-2 rounded bg-midnight/80 px-3 py-1 font-mono text-[11px] text-warm-cream/75">
                  https://rashmi.space/ui-lab
                </span>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-warm-cream/12 bg-midnight/80 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  aria-pressed={activeTab === "preview"}
                  className={`inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    activeTab === "preview"
                      ? "bg-amber text-midnight font-semibold"
                      : "text-warm-cream/75 hover:text-off-white"
                  }`}
                >
                  <Layout className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>UI Assembly</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("structure")}
                  aria-pressed={activeTab === "structure"}
                  className={`inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    activeTab === "structure"
                      ? "bg-amber text-midnight font-semibold"
                      : "text-warm-cream/75 hover:text-off-white"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Component Tree</span>
                </button>
              </div>
            </div>

            {activeTab === "preview" ? (
              <div className="mt-4 space-y-4">
                {/* Simulated App Nav */}
                <div className="fe-browser-part flex items-center justify-between rounded-xl border border-warm-cream/10 bg-midnight/80 px-4 py-3">
                  <span className="font-display text-sm font-semibold text-off-white">
                    UI System · {selectedSkill}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-sage">
                    <Sparkles className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                    Responsive Grid
                  </span>
                </div>

                {/* Assembled Component Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="fe-browser-part rounded-xl border border-warm-cream/10 bg-midnight/75 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber">
                      01 · Design Tokens
                    </p>
                    <p className="mt-2 font-display text-base font-semibold text-off-white">
                      Consistent Visual Grammar
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-warm-cream/75">
                      Semantic color variables, fluid spacing scales, and
                      accessible contrast across desktop and mobile.
                    </p>
                  </div>

                  <div className="fe-browser-part rounded-xl border border-warm-cream/10 bg-midnight/75 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-sage">
                      02 · Motion Discipline
                    </p>
                    <p className="mt-2 font-display text-base font-semibold text-off-white">
                      Compositor-Friendly States
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-warm-cream/75">
                      Transform and opacity transitions paired with full
                      reduced-motion support.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-warm-cream/10 bg-midnight/85 p-5 font-mono text-xs leading-relaxed text-warm-cream/85">
                <p className="text-amber">{"<AppShell>"}</p>
                <p className="pl-4 text-muted-sage">{"<NavigationBar />"}</p>
                <p className="pl-4 text-off-white">{"<SceneOrchestrator>"}</p>
                <p className="pl-8 text-warm-mauve">{"<EditorialHero />"}</p>
                <p className="pl-8 text-warm-mauve">{"<InteractiveBookshelf />"}</p>
                <p className="pl-8 text-warm-mauve">{"<ThreeLaptopRig />"}</p>
                <p className="pl-8 text-soft-gold">
                  {`<ActiveSkillFocus name="${selectedSkill}" />`}
                </p>
                <p className="pl-4 text-off-white">{"</SceneOrchestrator>"}</p>
                <p className="text-amber">{"</AppShell>"}</p>
              </div>
            )}
          </div>

          {/* Readable TypeScript / React Code Panel */}
          <div className="fe-assemble lg:col-span-5 rounded-2xl border border-warm-cream/15 bg-midnight/90 p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-warm-cream/10 pb-3">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-amber" aria-hidden="true" />
                <span className="font-mono text-xs text-warm-cream/85">
                  DeveloperCard.tsx
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-sage">
                TypeScript + React
              </span>
            </div>

            <pre className="mt-4 overflow-x-auto font-mono text-xs leading-relaxed text-warm-cream/90">
              <code>{CODE_SNIPPET}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
