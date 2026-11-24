"use client";

interface TimelineNodeProps {
  badgeLabel: string;
  side: "left" | "right";
}

export function TimelineNode({ badgeLabel, side }: TimelineNodeProps) {
  return (
    <>
      {/* Mobile Left Spine Node + Pill */}
      <div className="mb-2.5 flex items-center gap-2.5 md:hidden">
        <span
          aria-hidden="true"
          className="relative -ml-[34px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#E3B270] bg-[#1A1410] shadow-[0_0_16px_rgba(214,161,91,0.75)]"
        >
          <span className="h-2 w-2 rounded-full bg-[#F7D7A8]" />
        </span>
        <span
          aria-hidden="true"
          className="h-[2px] w-4 bg-gradient-to-r from-[#D6A15B] to-[#D6A15B]/30"
        />
        <span className="rounded-full border border-[#8C6245]/75 bg-[#231A14]/95 px-3 py-0.5 font-mono text-[10px] tracking-[0.18em] text-[#F0E7D9] uppercase shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
          {badgeLabel}
        </span>
      </div>

      {/* Desktop Center Node + Opposite Category Pill */}
      <div className="relative hidden items-center justify-center md:flex">
        {/* Horizontal connector toward card */}
        <span
          aria-hidden="true"
          className={`absolute top-1/2 h-[2px] w-8 -translate-y-1/2 lg:w-10 ${
            side === "left"
              ? "right-1/2 bg-gradient-to-l from-[#D6A15B] to-[#8C6245]/45"
              : "left-1/2 bg-gradient-to-r from-[#D6A15B] to-[#8C6245]/45"
          }`}
        />

        {/* Circular Illuminated Node */}
        <span
          aria-hidden="true"
          className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#E3B270] bg-[#1A1410] shadow-[0_0_18px_rgba(214,161,91,0.8)]"
        >
          <span className="h-2 w-2 rounded-full bg-[#F7D7A8]" />
        </span>

        {/* Opposite-Side Category Pill */}
        <div
          className={`absolute top-1/2 flex -translate-y-1/2 items-center ${
            side === "left" ? "left-full pl-2" : "right-full pr-2"
          }`}
        >
          {side === "left" && (
            <span
              aria-hidden="true"
              className="mr-1.5 h-[1.5px] w-3 bg-[#D6A15B]/75"
            />
          )}
          <span className="rounded-full border border-[#8C6245]/80 bg-[#231A14]/95 px-3 py-1 font-mono text-[10px] tracking-[0.18em] whitespace-nowrap text-[#F0E7D9] uppercase shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
            {badgeLabel}
          </span>
          {side === "right" && (
            <span
              aria-hidden="true"
              className="ml-1.5 h-[1.5px] w-3 bg-[#D6A15B]/75"
            />
          )}
        </div>
      </div>
    </>
  );
}
