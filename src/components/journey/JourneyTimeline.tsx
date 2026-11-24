"use client";

import type { JourneyMilestone } from "@/data/journeyData";

import { TimelineCard } from "./TimelineCard";
import { TimelineNode } from "./TimelineNode";

interface JourneyTimelineProps {
  milestones: readonly JourneyMilestone[];
  onSelectMilestone: (milestone: JourneyMilestone) => void;
}

export function JourneyTimeline({
  milestones,
  onSelectMilestone,
}: JourneyTimelineProps) {
  if (milestones.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-[#8C6245]/50 bg-[#1B1511]/90 p-8 text-center">
        <p className="font-mono text-xs tracking-[0.16em] text-[#D6A15B] uppercase">
          No entries in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-5xl py-4">
      {/* Desktop Center Vertical Glowing Spine */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-[#8C6245]/35 md:block"
      >
        <div className="journey-spine-glow h-full w-full origin-top bg-gradient-to-b from-[#D6A15B]/35 via-[#E3B270] to-[#D6A15B]/35 shadow-[0_0_18px_rgba(214,161,91,0.7)]" />
      </div>

      {/* Mobile Left Vertical Glowing Spine */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 left-4 w-[2px] bg-gradient-to-b from-[#D6A15B]/35 via-[#E3B270] to-[#D6A15B]/35 shadow-[0_0_14px_rgba(214,161,91,0.55)] md:hidden"
      />

      <ol className="relative space-y-8 md:space-y-10">
        {milestones.map((milestone, index) => {
          const side: "left" | "right" = index % 2 === 0 ? "left" : "right";

          return (
            <li
              key={milestone.id}
              className="journey-row relative pl-10 md:grid md:grid-cols-[1fr_64px_1fr] md:items-center md:pl-0"
            >
              {/* Mobile node + badge */}
              <div className="md:hidden">
                <TimelineNode badgeLabel={milestone.badgeLabel} side={side} />
                <TimelineCard
                  milestone={milestone}
                  onSelect={onSelectMilestone}
                />
              </div>

              {/* Desktop Left Slot */}
              <div className="hidden md:block">
                {side === "left" && (
                  <TimelineCard
                    milestone={milestone}
                    onSelect={onSelectMilestone}
                  />
                )}
              </div>

              {/* Desktop Center Node */}
              <div className="hidden md:flex md:justify-center">
                <TimelineNode badgeLabel={milestone.badgeLabel} side={side} />
              </div>

              {/* Desktop Right Slot */}
              <div className="hidden md:block">
                {side === "right" && (
                  <TimelineCard
                    milestone={milestone}
                    onSelect={onSelectMilestone}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
