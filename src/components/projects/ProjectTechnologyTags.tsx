interface ProjectTechnologyTagsProps {
  items: readonly string[];
  variant?: "compact" | "full";
}

export function ProjectTechnologyTags({
  items,
  variant = "compact",
}: ProjectTechnologyTagsProps) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-md border font-mono transition-colors ${
            variant === "compact"
              ? "border-[#D6A15B]/25 bg-[#2A1D15]/85 px-2 py-0.5 text-[10px] text-warm-cream/90"
              : "border-warm-cream/18 bg-[#211914] px-2.5 py-1 text-[11px] text-warm-cream"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
