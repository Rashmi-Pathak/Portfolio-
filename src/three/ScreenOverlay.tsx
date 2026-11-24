"use client";

interface ScreenOverlayProps {
  bootProgress: number;
}

export function ScreenOverlay({ bootProgress }: ScreenOverlayProps) {
  const isAwake = bootProgress >= 0.28;
  const activeStep =
    bootProgress < 0.45
      ? "MOUNTING WORKSPACE..."
      : bootProgress < 0.72
      ? "COMPILING MODULES · 0 ERRORS"
      : "ENTERING TECHNICAL WORLD →";

  return (
    <div
      style={{ width: 720, height: 405 }}
      className="pointer-events-none relative overflow-hidden rounded-[6px] border border-warm-cream/15 bg-[#121517] text-off-white shadow-inner select-none"
    >
      {/* Screen Wake Fade */}
      <div
        style={{ opacity: isAwake ? 1 : 0.08 }}
        className="flex h-full w-full flex-col justify-between p-5 transition-opacity duration-300"
      >
        {/* Top IDE Window Bar */}
        <div className="flex items-center justify-between border-b border-warm-cream/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-sage/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-dusty-mauve/70" />
            <span className="ml-3 font-mono text-xs text-warm-cream/80">
              rashmi-space — src/scenes/TechnicalWorld.tsx
            </span>
          </div>
          <span className="rounded bg-forest-green/35 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-sage">
            LIVE WORKSPACE
          </span>
        </div>

        {/* Center Code + Telemetry Split */}
        <div className="my-3 grid flex-1 grid-cols-12 gap-4 overflow-hidden">
          <div className="col-span-7 rounded-lg border border-warm-cream/10 bg-[#171A1C] p-4 font-mono text-[11px] leading-relaxed">
            <p className="text-warm-mauve/80">
              {"// System Architecture · Rashmi Pathak"}
            </p>
            <p className="mt-2">
              <span className="text-amber">const</span>{" "}
              <span className="text-off-white">developerSpace</span> ={" "}
              <span className="text-muted-sage">{"{"}</span>
            </p>
            <p className="pl-4">
              <span className="text-warm-cream/75">frontend:</span>{" "}
              <span className="text-soft-gold">
                [&quot;React&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;]
              </span>
              ,
            </p>
            <p className="pl-4">
              <span className="text-warm-cream/75">backend:</span>{" "}
              <span className="text-soft-gold">
                [&quot;REST APIs&quot;, &quot;Node.js&quot;, &quot;Auth&quot;]
              </span>
              ,
            </p>
            <p className="pl-4">
              <span className="text-warm-cream/75">aiLab:</span>{" "}
              <span className="text-soft-gold">
                [&quot;Python&quot;, &quot;NumPy&quot;, &quot;Pandas&quot;, &quot;Scikit-learn&quot;]
              </span>
              ,
            </p>
            <p className="pl-4">
              <span className="text-warm-cream/75">databases:</span>{" "}
              <span className="text-soft-gold">
                [&quot;PostgreSQL&quot;, &quot;MySQL&quot;, &quot;SQLite&quot;]
              </span>
            </p>
            <p className="text-muted-sage">{"};"}</p>
          </div>

          <div className="col-span-5 flex flex-col justify-between rounded-lg border border-warm-cream/10 bg-[#1A1E21] p-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber">
                SCENE TRANSITION
              </p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug text-off-white">
                Entering the Engineering Stack
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-warm-cream/75">
                Frontend interfaces, API request flows, neural pipelines, and
                relational queries.
              </p>
            </div>

            <div className="space-y-2 border-t border-warm-cream/10 pt-3 font-mono text-[10px]">
              <div className="flex items-center justify-between text-muted-sage">
                <span>HINGE RIG</span>
                <span className="text-off-white">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between text-muted-sage">
                <span>STATUS</span>
                <span className="text-amber">{activeStep}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between border-t border-warm-cream/10 pt-2.5 font-mono text-[10px] text-warm-cream/65">
          <span>B.TECH IT · 2024–2028</span>
          <span>SCROLL PROGRESS: {Math.round(bootProgress * 100)}%</span>
        </div>
      </div>

      {/* Subtle glass reflection streak */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]"
      />
    </div>
  );
}
