"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Database,
  Layers,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import { TECHNICAL_SKILLS, type SkillDefinition } from "@/data/skills";

interface SkillInformationPanelProps {
  selectedSkill: SkillDefinition | null;
  reducedMotion: boolean;
}

function DomainGlyph({
  shape,
  className,
}: {
  shape: SkillDefinition["logo"]["shape"];
  className: string;
}) {
  switch (shape) {
    case "code":
      return <Code2 className={className} />;
    case "layers":
      return <Layers className={className} />;
    case "server":
      return <Server className={className} />;
    case "database":
      return <Database className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "terminal":
      return <Terminal className={className} />;
  }
}

export function SkillInformationPanel({
  selectedSkill,
  reducedMotion,
}: SkillInformationPanelProps) {
  const [typedLength, setTypedLength] = useState(0);
  const [stagePhase, setStagePhase] = useState<
    "header" | "typing" | "details" | "links"
  >("header");

  // Typewriter effect for WHAT IS IT? — cancels cleanly whenever selection changes
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    if (!selectedSkill) {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) {
            setTypedLength(0);
            setStagePhase("header");
          }
        }, 0)
      );
      return () => {
        cancelled = true;
        for (const id of timers) window.clearTimeout(id);
      };
    }

    const fullText = selectedSkill.description;

    if (reducedMotion) {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) {
            setTypedLength(fullText.length);
            setStagePhase("links");
          }
        }, 0)
      );
      return () => {
        cancelled = true;
        for (const id of timers) window.clearTimeout(id);
      };
    }

    timers.push(
      window.setTimeout(() => {
        if (!cancelled) {
          setTypedLength(0);
          setStagePhase("header");
        }
      }, 0)
    );

    const startTypingTimer = window.setTimeout(() => {
      if (cancelled) return;
      setStagePhase("typing");

      let idx = 0;
      const tick = () => {
        if (cancelled) return;
        idx += 1;
        setTypedLength(idx);

        if (idx < fullText.length) {
          const nextDelay = idx % 14 === 0 ? 18 : 11;
          timers.push(window.setTimeout(tick, nextDelay));
        }
      };

      tick();
    }, 90);

    const detailsTimer = window.setTimeout(() => {
      if (!cancelled) setStagePhase("details");
    }, 260);

    const linksTimer = window.setTimeout(() => {
      if (!cancelled) setStagePhase("links");
    }, 420);

    timers.push(startTypingTimer, detailsTimer, linksTimer);

    return () => {
      cancelled = true;
      for (const timerId of timers) {
        window.clearTimeout(timerId);
      }
    };
  }, [selectedSkill, reducedMotion]);

  if (!selectedSkill) {
    return (
      <aside
        aria-label="Linux terminal skill inspector"
        className="relative flex min-h-[490px] flex-col overflow-hidden rounded-xl border border-warm-cream/16 bg-[#0D1013] font-mono shadow-[0_26px_65px_rgba(0,0,0,0.55)]"
      >
        {/* Linux Terminal Window Chrome */}
        <div className="flex items-center justify-between border-b border-warm-cream/12 bg-[#161A1F] px-4 py-2.5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D97736]" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-sage" />
          </div>
          <span className="text-[11px] text-warm-cream/75">
            rashmi@dev-space: ~/arsenal
          </span>
          <span className="text-[10px] text-muted-sage">bash</span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="text-xs text-muted-sage">
              <span className="text-[#F4A261]">rashmi@dev-space</span>:
              <span className="text-amber">~/arsenal</span>$ ./stackctl
              --interactive --keys {TECHNICAL_SKILLS.length}
            </p>

            <div className="mt-4 rounded-lg border border-warm-cream/10 bg-[#13171B] p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#F4A261]">
                [STATUS: STANDBY // {TECHNICAL_SKILLS.length} MODULES INDEXED]
              </p>

              <h3 className="mt-4 flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-off-white">
                <span aria-hidden="true" className="text-[#D97736]">
                  &gt;
                </span>
                <span>PRESS A KEY TO EXPLORE.</span>
                <span
                  aria-hidden="true"
                  className="animate-cursor-blink inline-block h-5 w-2.5 bg-[#D97736]"
                />
              </h3>

              <p className="mt-3 font-sans text-sm leading-relaxed text-warm-cream/80">
                Hover over the floating 3D mechanical keyboard for tactile sound
                and preview—or click any key to inspect its architecture inside
                this terminal.
              </p>
            </div>

            <div className="mt-5 space-y-1.5 text-xs text-warm-cream/70">
              <p className="text-muted-sage"># Loaded skill namespaces:</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "languages/",
                  "frontend/",
                  "backend/",
                  "database/",
                  "ai-ml/",
                  "dev-tools/",
                ].map((dir) => (
                  <span
                    key={dir}
                    className="rounded border border-warm-cream/12 bg-[#161A1F] px-2.5 py-1 text-[11px] text-[#F4A261]"
                  >
                    {dir}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-warm-cream/10 pt-3 text-[11px] text-warm-cream/55">
            <span className="text-[#91A58D]">hint:</span> click any switch on
            the walnut deck or tab through the key index below
          </div>
        </div>
      </aside>
    );
  }

  const displayedIntro = selectedSkill.description.slice(0, typedLength);
  const isTyping = typedLength < selectedSkill.description.length;
  const showDetails =
    reducedMotion || stagePhase === "details" || stagePhase === "links";
  const showLinks = reducedMotion || stagePhase === "links";

  return (
    <aside
      aria-label={`${selectedSkill.name} Linux terminal specification`}
      className="relative flex min-h-[490px] flex-col overflow-hidden rounded-xl border border-[#D97736]/35 bg-[#0D1013] font-mono shadow-[0_26px_65px_rgba(0,0,0,0.58)]"
    >
      {/* Linux Terminal Header Bar */}
      <div className="flex items-center justify-between border-b border-warm-cream/12 bg-[#161A1F] px-4 py-2.5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D97736]" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-sage" />
        </div>
        <span className="text-[11px] text-warm-cream/80">
          rashmi@dev-space: ~/arsenal/{selectedSkill.id}.md
        </span>
        <span className="rounded bg-[#D97736]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#F4A261]">
          {selectedSkill.abbreviation}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Executed Command Line */}
          <p className="text-xs text-warm-cream/80 break-all">
            <span className="text-[#F4A261]">rashmi@dev-space</span>:
            <span className="text-amber">~/arsenal</span>${" "}
            <span className="text-muted-sage">
              stackctl inspect --tech &quot;{selectedSkill.id}&quot;
            </span>
          </p>

          {/* Technology Header */}
          <div className="mt-4 flex items-center gap-3.5 border-b border-warm-cream/10 pb-4">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border border-[#D97736]/55 bg-[#161A1F]"
            >
              <DomainGlyph
                shape={selectedSkill.logo.shape}
                className="h-4 w-4 text-[#F4A261]"
              />
              <span className="mt-0.5 text-[10px] font-bold text-off-white">
                {selectedSkill.logo.glyph}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#F4A261]">
                SELECTED TECHNOLOGY
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-off-white">
                {selectedSkill.name}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-sage">
                [{selectedSkill.category}]
              </p>
            </div>
          </div>

          {/* WHAT IS IT? — Typewriter Terminal Block */}
          <div className="mt-4 rounded-lg border border-warm-cream/10 bg-[#13171B] p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4A261]">
              &gt; WHAT IS IT?
            </p>
            <p
              aria-label={selectedSkill.description}
              className="mt-1.5 min-h-[4.2rem] font-sans text-sm leading-relaxed text-off-white/95"
            >
              {displayedIntro}
              {isTyping && !reducedMotion && (
                <span
                  aria-hidden="true"
                  className="animate-cursor-blink ml-1 inline-block h-[1em] w-2 translate-y-[2px] bg-[#D97736]"
                />
              )}
            </p>
          </div>

          {/* WHAT DO I USE IT FOR? + MY EXPERIENCE */}
          <div
            className={`mt-4 space-y-3 transition-all duration-300 ${
              showDetails
                ? "translate-y-0 opacity-100"
                : "translate-y-1.5 opacity-25"
            }`}
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-sage">
                &gt; WHAT DO I USE IT FOR?
              </p>
              <p className="mt-1 font-sans text-[13px] sm:text-sm leading-relaxed text-warm-cream/85">
                {selectedSkill.purpose}
              </p>
            </div>

            <div className="rounded-lg border border-[#694832]/50 bg-[#181513]/85 px-3.5 py-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber">
                  &gt; MY EXPERIENCE
                </p>
                <span className="text-[10px] text-[#F4A261]">
                  [{selectedSkill.familiarity}]
                </span>
              </div>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-warm-cream/85">
                {selectedSkill.usage}
              </p>
            </div>
          </div>
        </div>

        {/* RELATED PROJECTS (No Official Docs link per user direction) */}
        <div
          className={`mt-4 border-t border-warm-cream/10 pt-3.5 transition-all duration-300 ${
            showLinks
              ? "translate-y-0 opacity-100"
              : "translate-y-1.5 opacity-25"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-mauve">
            &gt; RELATED PROJECTS
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selectedSkill.relatedProjects.map((project) => (
              <span
                key={project}
                className="rounded border border-warm-cream/15 bg-[#161A1F] px-2.5 py-1 text-[11px] text-off-white"
              >
                {project}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
