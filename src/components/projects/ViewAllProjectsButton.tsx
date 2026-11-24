import { ArrowRight, ArrowUp } from "lucide-react";

interface ViewAllProjectsButtonProps {
  expanded: boolean;
  totalCount: number;
  onToggle: () => void;
}

export function ViewAllProjectsButton({
  expanded,
  totalCount,
  onToggle,
}: ViewAllProjectsButtonProps) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-amber/55 bg-[#231913]/90 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-warm-cream shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-all hover:border-amber hover:bg-[#332319] hover:text-amber"
      >
        <span>
          {expanded
            ? "SHOW LESS"
            : `VIEW ALL PROJECTS (${totalCount})`}
        </span>
        {expanded ? (
          <ArrowUp className="h-4 w-4 text-amber" aria-hidden="true" />
        ) : (
          <ArrowRight className="h-4 w-4 text-amber" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
