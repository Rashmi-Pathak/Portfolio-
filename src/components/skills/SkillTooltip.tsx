import type { SkillDefinition } from "@/data/skills";

interface SkillTooltipProps {
  skill: SkillDefinition | null;
}

/**
 * Floating pill showing the currently hovered 3D keycap's technology name and domain.
 */
export function SkillTooltip({ skill }: SkillTooltipProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none transition-all duration-200 ${
        skill ? "translate-y-0 opacity-100" : "translate-y-0.5 opacity-85"
      }`}
    >
      {skill ? (
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F4A261]/50 bg-[#1B1E21]/95 px-3.5 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[#E07A38] shadow-[0_0_8px_#E07A38]"
          />
          <span className="text-xs font-semibold tracking-wide text-off-white">
            {skill.name}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-warm-cream/20" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-sage">
            {skill.category}
          </span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-full border border-warm-cream/15 bg-graphite/80 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-cream/75">
          Hover or click any 3D keycap
        </div>
      )}
    </div>
  );
}
