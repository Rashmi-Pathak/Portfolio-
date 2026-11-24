interface ProjectsHeaderProps {
  totalCount: number;
}

export function ProjectsHeader({ totalCount }: ProjectsHeaderProps) {
  return (
    <div className="proj-reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#8C6245]/55 bg-[#2A1D15]/85 px-3.5 py-1 shadow-sm">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
            05 / PROJECT LAB
          </span>
        </div>

        <h2
          id="projects-heading"
          className="mt-3.5 font-serif text-3xl sm:text-4xl lg:text-[3.1rem] font-semibold tracking-tight leading-[1.06] text-off-white"
        >
          THE PROJECT <span className="text-amber">ARCHIVE.</span>
        </h2>

        <p className="mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed text-warm-cream/85">
          A collection of systems, products and experiments I&apos;ve built.
        </p>
      </div>

      {/* Hanging Cream Paper Label with Pin */}
      <div className="shrink-0 self-start sm:self-end">
        <div className="animate-ambient-float relative -rotate-2 rounded-md border border-[#8C6245]/45 bg-gradient-to-b from-[#F2E5CF] to-[#E2CEAE] px-6 py-3.5 text-center shadow-[0_14px_30px_rgba(0,0,0,0.48)]">
          {/* Metallic Top Pin / Clip */}
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-1/2 h-4 w-2.5 -translate-x-1/2 rounded-sm border border-[#736454] bg-gradient-to-b from-[#D9D1C5] to-[#7D7165] shadow"
          />
          <p className="font-serif text-3xl sm:text-4xl font-bold leading-none text-[#231812]">
            {totalCount}
          </p>
          <p className="mt-1 font-serif text-xs sm:text-sm font-semibold tracking-wide text-[#453125]">
            Public Projects
          </p>
        </div>
      </div>
    </div>
  );
}
