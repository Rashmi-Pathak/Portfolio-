"use client";

export function JourneyHeader() {
  return (
    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8C6245]/55 bg-[#211914]/90 px-3.5 py-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D6A15B] shadow-[0_0_8px_#D6A15B]" />
          <span className="font-mono text-[11px] tracking-[0.22em] text-[#D6A15B] uppercase">
            06 / THE JOURNEY
          </span>
        </div>

        <h2
          id="journey-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-[#F5F1E9] sm:text-5xl lg:text-[54px]"
        >
          THE JOURNEY{" "}
          <span className="text-[#D6A15B] drop-shadow-[0_0_24px_rgba(214,161,91,0.28)]">
            ARCHIVE.
          </span>
        </h2>

        <p className="mt-3 text-base leading-relaxed text-[#F0E7D9]/80 sm:text-lg">
          Experience, milestones &amp; credentials that shaped my path.
        </p>
      </div>

      {/* Hanging Wooden / Paper Category Label */}
      <div className="hidden self-start md:block">
        <div className="animate-ambient-float relative mt-2 rotate-[5deg] rounded-lg border-2 border-[#694832] bg-gradient-to-b from-[#EADAC2] via-[#DEC8A8] to-[#CEB38D] px-6 py-4 text-center shadow-[0_18px_36px_rgba(0,0,0,0.55)]">
          {/* Brass Pin */}
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-[#453125] bg-gradient-to-b from-[#F4CF92] to-[#A77435] shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          />
          <div className="font-serif text-3xl leading-none font-bold text-[#251A13]">
            03
          </div>
          <div className="mt-1 font-mono text-[10px] font-semibold tracking-[0.22em] text-[#453125] uppercase">
            CATEGORIES
          </div>
        </div>
      </div>
    </div>
  );
}
