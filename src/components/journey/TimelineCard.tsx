"use client";

import { ArrowRight, Calendar } from "lucide-react";

import type { JourneyMilestone } from "@/data/journeyData";

import { TimelineIllustration } from "./TimelineIllustration";

interface TimelineCardProps {
  milestone: JourneyMilestone;
  onSelect: (milestone: JourneyMilestone) => void;
}

export function TimelineCard({ milestone, onSelect }: TimelineCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(milestone)}
      className="journey-card group w-full cursor-pointer rounded-2xl border border-[#8C6245]/60 bg-gradient-to-b from-[#6A452D] via-[#4D3220] to-[#3B2517] p-[5px] text-left shadow-[0_22px_48px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D6A15B]/75 hover:shadow-[0_28px_56px_rgba(0,0,0,0.68),0_0_24px_rgba(214,161,91,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6A15B]"
    >
      <div className="rounded-[12px] border border-[#D6A15B]/20 bg-gradient-to-b from-[#1D1815] to-[#120F0D] p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <TimelineIllustration type={milestone.illustration} size="sm" />

          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-base font-semibold tracking-wide text-[#F5F1E9] transition-colors group-hover:text-[#F7D7A8] sm:text-lg">
              {milestone.title}
            </h3>

            {milestone.dateLabel && (
              <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-[#D6A15B] uppercase">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{milestone.dateLabel}</span>
              </div>
            )}

            <p className="mt-2.5 text-xs leading-relaxed text-[#F0E7D9]/80 sm:text-sm">
              {milestone.shortSummary}
            </p>

            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {milestone.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#8C6245]/45 bg-[#241B15]/85 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-[#E6C79C] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] text-[#D6A15B] uppercase opacity-80 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                <span>Inspect</span>
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
