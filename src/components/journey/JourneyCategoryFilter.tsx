"use client";

import { Award, BriefcaseBusiness, Layers, Trophy } from "lucide-react";

import {
  getJourneyCategoryCount,
  JOURNEY_FILTERS,
  type JourneyFilterId,
  type JourneyFilterOption,
} from "@/data/journeyData";

interface JourneyCategoryFilterProps {
  activeFilter: JourneyFilterId;
  onFilterChange: (filterId: JourneyFilterId) => void;
}

function FilterIcon({
  iconKey,
  isActive,
}: {
  iconKey: JourneyFilterOption["iconKey"];
  isActive: boolean;
}) {
  const className = `h-4 w-4 shrink-0 ${
    isActive ? "text-[#17120E]" : "text-[#D6A15B]"
  }`;

  switch (iconKey) {
    case "layers":
      return <Layers className={className} aria-hidden="true" />;
    case "briefcase-business":
      return <BriefcaseBusiness className={className} aria-hidden="true" />;
    case "trophy":
      return <Trophy className={className} aria-hidden="true" />;
    case "award":
      return <Award className={className} aria-hidden="true" />;
  }
}

export function JourneyCategoryFilter({
  activeFilter,
  onFilterChange,
}: JourneyCategoryFilterProps) {
  return (
    <div className="mb-12 flex justify-center">
      <div
        role="tablist"
        aria-label="Filter journey milestones by category"
        className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-[#8C6245]/55 bg-gradient-to-b from-[#6A452D] via-[#4D3220] to-[#3B2517] p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
      >
        {JOURNEY_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          const count = getJourneyCategoryCount(filter.id);

          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilterChange(filter.id)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-xs tracking-[0.12em] uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6A15B] ${
                isActive
                  ? "bg-gradient-to-b from-[#E3B270] to-[#C88E46] font-semibold text-[#17120E] shadow-[0_4px_14px_rgba(214,161,91,0.35)]"
                  : "text-[#F0E7D9]/85 hover:bg-white/5 hover:text-[#F5F1E9]"
              }`}
            >
              <FilterIcon iconKey={filter.iconKey} isActive={isActive} />
              <span>{filter.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  isActive
                    ? "bg-[#17120E]/15 text-[#17120E]"
                    : "bg-[#17120E]/45 text-[#D6A15B]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
