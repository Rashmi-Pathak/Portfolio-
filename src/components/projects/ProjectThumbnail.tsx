import type { ProjectItem } from "@/data/projects";

interface ProjectThumbnailProps {
  project: ProjectItem;
  className?: string;
}

/**
 * Displays a verified repository screenshot when available, or a distinct
 * custom architectural UI illustration tailored to that project's domain.
 */
export function ProjectThumbnail({ project, className = "" }: ProjectThumbnailProps) {
  const primaryImage = project.screenshots[0];

  if (primaryImage) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden bg-[#0D1013] ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={primaryImage}
          alt={`${project.name} interface preview`}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120F0D]/45 via-transparent to-transparent"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0E1114] p-2.5 transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
    >
      {/* Top Mini Window Chrome */}
      <div className="flex items-center justify-between border-b border-warm-cream/10 pb-1.5">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D97736]" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-sage" />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-widest text-warm-cream/55">
          {project.id}
        </span>
      </div>

      {/* Domain-Specific Bespoke Preview Artwork */}
      {project.visualTheme === "aegis" && (
        <div className="my-auto flex flex-col gap-1.5 pt-1">
          <div className="grid grid-cols-3 gap-1">
            <div className="rounded bg-[#191D21] p-1">
              <div className="h-1 w-5 rounded bg-amber/60" />
              <div className="mt-1 h-2 w-8 rounded bg-off-white/80" />
            </div>
            <div className="rounded bg-[#191D21] p-1">
              <div className="h-1 w-4 rounded bg-muted-sage/60" />
              <div className="mt-1 h-2 w-7 rounded bg-amber/80" />
            </div>
            <div className="rounded bg-[#191D21] p-1">
              <div className="h-1 w-6 rounded bg-[#D97736]/60" />
              <div className="mt-1 h-2 w-6 rounded bg-[#F4A261]" />
            </div>
          </div>
          <svg viewBox="0 0 180 62" className="h-14 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="aegis-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D6A15B" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#D6A15B" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 52 C28 46, 46 24, 72 28 C98 32, 114 14, 140 18 C158 21, 170 8, 180 12 L180 62 L0 62 Z"
              fill="url(#aegis-fill)"
            />
            <path
              d="M0 52 C28 46, 46 24, 72 28 C98 32, 114 14, 140 18 C158 21, 170 8, 180 12"
              fill="none"
              stroke="#E5B56B"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}

      {project.visualTheme === "investra" && (
        <div className="my-auto flex flex-col gap-1.5 pt-1">
          <svg viewBox="0 0 180 68" className="h-16 w-full" aria-hidden="true">
            {[
              { x: 14, h: 18, y: 38, up: true },
              { x: 34, h: 24, y: 30, up: true },
              { x: 54, h: 14, y: 34, up: false },
              { x: 74, h: 28, y: 22, up: true },
              { x: 94, h: 20, y: 26, up: false },
              { x: 114, h: 30, y: 14, up: true },
              { x: 134, h: 24, y: 12, up: true },
              { x: 154, h: 32, y: 8, up: true },
            ].map((bar, idx) => (
              <g key={idx}>
                <line
                  x1={bar.x + 4}
                  y1={bar.y - 5}
                  x2={bar.x + 4}
                  y2={bar.y + bar.h + 5}
                  stroke={bar.up ? "#91A58D" : "#D97736"}
                  strokeWidth="1.2"
                />
                <rect
                  x={bar.x}
                  y={bar.y}
                  width="8"
                  height={bar.h}
                  rx="1.5"
                  fill={bar.up ? "#3F6049" : "#B77D70"}
                  stroke={bar.up ? "#91A58D" : "#F4A261"}
                  strokeWidth="0.8"
                />
              </g>
            ))}
          </svg>
        </div>
      )}

      {project.visualTheme === "fraudshield" && (
        <div className="my-auto grid grid-cols-5 gap-1.5 pt-1">
          <div className="col-span-2 flex flex-col items-center justify-center rounded border border-[#D97736]/45 bg-[#1B1412] p-1.5">
            <span className="h-3 w-3 rounded-full bg-[#D97736] shadow-[0_0_8px_#D97736]" />
            <span className="mt-1 font-mono text-[8px] font-bold text-[#F4A261]">
              RISK ENGINE
            </span>
          </div>
          <div className="col-span-3 space-y-1">
            <div className="h-3 rounded bg-[#1A1D21] px-1.5 py-0.5">
              <div className="h-full w-4/5 rounded bg-[#D97736]/75" />
            </div>
            <div className="h-3 rounded bg-[#1A1D21] px-1.5 py-0.5">
              <div className="h-full w-3/5 rounded bg-amber/70" />
            </div>
            <div className="h-3 rounded bg-[#1A1D21] px-1.5 py-0.5">
              <div className="h-full w-2/3 rounded bg-muted-sage/75" />
            </div>
          </div>
        </div>
      )}

      {project.visualTheme === "veridex" && (
        <div className="my-auto flex flex-col items-center justify-center gap-1.5 py-2">
          <div className="rounded-md border border-muted-sage/60 bg-forest-green/35 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-off-white shadow-[0_0_16px_rgba(63,96,73,0.45)]">
            C2PA VERIFIED
          </div>
          <div className="flex items-center gap-1 font-mono text-[8px] text-amber/85">
            <span>SOFT BINDING</span>
            <span>·</span>
            <span>MERKLE LOG</span>
          </div>
        </div>
      )}

      {project.visualTheme === "neuramesh" && (
        <div className="my-auto flex items-center justify-center py-1">
          <svg viewBox="0 0 180 70" className="h-16 w-full" aria-hidden="true">
            <g stroke="#B69B96" strokeOpacity="0.45" strokeWidth="1.3">
              <line x1="90" y1="35" x2="34" y2="16" />
              <line x1="90" y1="35" x2="146" y2="16" />
              <line x1="90" y1="35" x2="34" y2="54" />
              <line x1="90" y1="35" x2="146" y2="54" />
              <line x1="34" y1="16" x2="146" y2="16" />
            </g>
            {[
              { x: 90, y: 35, r: 9, fill: "#D6A15B" },
              { x: 34, y: 16, r: 6, fill: "#91A58D" },
              { x: 146, y: 16, r: 6, fill: "#D97736" },
              { x: 34, y: 54, r: 6, fill: "#A58D91" },
              { x: 146, y: 54, r: 6, fill: "#91A58D" },
            ].map((node, i) => (
              <circle
                key={i}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.fill}
                fillOpacity="0.88"
              />
            ))}
          </svg>
        </div>
      )}

      {project.visualTheme === "attendlink" && (
        <div className="my-auto flex items-center justify-center py-1">
          <svg viewBox="0 0 160 70" className="h-16 w-full" aria-hidden="true">
            <circle cx="80" cy="35" r="28" fill="none" stroke="#91A58D" strokeOpacity="0.28" strokeDasharray="3 3" />
            <circle cx="80" cy="35" r="18" fill="none" stroke="#D6A15B" strokeOpacity="0.45" />
            <circle cx="80" cy="35" r="6" fill="#D97736" />
          </svg>
        </div>
      )}

      {project.visualTheme === "supportdesk" && (
        <div className="my-auto space-y-1.5 pt-1">
          {[
            { tag: "CRM", color: "bg-amber/80", w: "w-3/4" },
            { tag: "AI", color: "bg-[#D97736]/80", w: "w-2/3" },
            { tag: "SLA", color: "bg-muted-sage/80", w: "w-4/5" },
          ].map((row) => (
            <div
              key={row.tag}
              className="flex items-center gap-1.5 rounded bg-[#181B1F] px-1.5 py-1"
            >
              <span className={`h-2 w-2 rounded-full ${row.color}`} />
              <div className={`h-1.5 ${row.w} rounded bg-warm-cream/45`} />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-1 font-mono text-[8px] text-warm-cream/50">
        <span>{project.category[0]}</span>
        <span className="text-amber/80">#{project.number}</span>
      </div>
    </div>
  );
}
