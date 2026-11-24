"use client";

import {
  BrainCircuit,
  ChartNoAxesCombined,
  Code,
  Gamepad2,
  Layers,
  ShieldCheck,
} from "lucide-react";
import {
  getCategoryCount,
  type ProjectCategoryId,
  type ProjectCategoryMeta,
} from "@/data/projects";

interface ProjectCategoryFilterProps {
  categories: readonly ProjectCategoryMeta[];
  activeCategory: ProjectCategoryId;
  onSelectCategory: (id: ProjectCategoryId) => void;
}

function CategoryIcon({
  iconName,
  className,
}: {
  iconName: ProjectCategoryMeta["iconName"];
  className: string;
}) {
  switch (iconName) {
    case "layers":
      return <Layers className={className} aria-hidden="true" />;
    case "brain-circuit":
      return <BrainCircuit className={className} aria-hidden="true" />;
    case "chart-no-axes-combined":
      return <ChartNoAxesCombined className={className} aria-hidden="true" />;
    case "shield-check":
      return <ShieldCheck className={className} aria-hidden="true" />;
    case "code":
      return <Code className={className} aria-hidden="true" />;
    case "gamepad-2":
      return <Gamepad2 className={className} aria-hidden="true" />;
  }
}

export function ProjectCategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: ProjectCategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="proj-reveal mt-7 overflow-x-auto rounded-2xl border border-[#8C6245]/45 bg-gradient-to-b from-[#5C3C28] via-[#482E1E] to-[#362216] p-2 shadow-[0_14px_34px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,222,180,0.18)]"
    >
      <div className="flex min-w-max items-center justify-between gap-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const count = getCategoryCount(cat);

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-amber text-[#171A1C] font-semibold shadow-[0_4px_14px_rgba(214,161,91,0.35)]"
                  : "border border-transparent bg-[#241811]/70 text-warm-cream/90 hover:border-amber/45 hover:bg-[#2F1F16] hover:text-off-white"
              }`}
            >
              <CategoryIcon
                iconName={cat.iconName}
                className={`h-4 w-4 ${
                  isSelected ? "text-[#171A1C]" : "text-amber/85"
                }`}
              />
              <span>{cat.label}</span>
              <span
                className={`font-mono text-[11px] ${
                  isSelected ? "text-[#171A1C]/80" : "text-amber/80"
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
