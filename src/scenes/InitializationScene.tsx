"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface InitializationSceneProps {
  isActive: boolean;
  onComplete: () => void;
}

const BOOT_LINES = [
  "> INITIALIZING RASHMI.PORTFOLIO",
  "> LOADING DEVELOPER PROFILE...",
  "> CONNECTING TO WORKSPACE...",
  "> LOADING PROJECT ARCHIVE...",
  "> INITIALIZING INTERACTIVE EXPERIENCE...",
  "> SYSTEM READY.",
] as const;

const WELCOME_LINE = "WELCOME TO MY SPACE.";

const TERMINAL_PARTICLES = [
  { left: "12%", top: "18%", duration: "6.5s", delay: "0s" },
  { left: "26%", top: "72%", duration: "8s", delay: "0.8s" },
  { left: "44%", top: "14%", duration: "7.2s", delay: "1.3s" },
  { left: "63%", top: "82%", duration: "6.8s", delay: "0.4s" },
  { left: "78%", top: "24%", duration: "7.8s", delay: "1.7s" },
  { left: "89%", top: "64%", duration: "6.2s", delay: "0.9s" },
  { left: "18%", top: "48%", duration: "7.5s", delay: "2.1s" },
  { left: "71%", top: "42%", duration: "8.4s", delay: "1.1s" },
] as const;

export function InitializationScene({
  isActive,
  onComplete,
}: InitializationSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Keyboard shortcut: Escape skips intro immediately
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        finishIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, finishIntro]);

  // Progressive terminal typing sequence
  useEffect(() => {
    if (!isActive) return;

    completedRef.current = false;

    if (prefersReducedMotion) {
      const staticTimer = window.setTimeout(() => {
        setVisibleLines([...BOOT_LINES]);
        setShowWelcome(true);
        setProgress(100);
      }, 0);
      return () => {
        window.clearTimeout(staticTimer);
      };
    }

    let cancelled = false;
    const timeouts: number[] = [];

    const totalChars = BOOT_LINES.reduce((sum, line) => sum + line.length, 0);
    let typedChars = 0;

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    // Reset state asynchronously at start of run
    schedule(() => {
      setVisibleLines([]);
      setShowWelcome(false);
      setProgress(4);
    }, 0);

    let lineIdx = 0;
    let charIdx = 0;
    const currentLines: string[] = [];

    const stepType = () => {
      if (cancelled) return;

      if (lineIdx >= BOOT_LINES.length) {
        setProgress(100);
        setShowWelcome(true);
        schedule(finishIntro, 820);
        return;
      }

      const targetLine = BOOT_LINES[lineIdx];

      if (charIdx === 0) {
        currentLines[lineIdx] = "";
      }

      charIdx += 1;
      typedChars += 1;
      currentLines[lineIdx] = targetLine.slice(0, charIdx);

      setVisibleLines([...currentLines]);
      setProgress(Math.min(96, Math.round((typedChars / totalChars) * 92) + 4));

      if (charIdx < targetLine.length) {
        schedule(stepType, 13);
      } else {
        lineIdx += 1;
        charIdx = 0;
        const pause = lineIdx === BOOT_LINES.length ? 220 : 120;
        schedule(stepType, pause);
      }
    };

    schedule(stepType, 180);

    return () => {
      cancelled = true;
      for (const id of timeouts) {
        window.clearTimeout(id);
      }
    };
  }, [isActive, prefersReducedMotion, finishIntro]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="initialization-scene"
          role="dialog"
          aria-modal="true"
          aria-labelledby="init-heading"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight terminal-grid px-4 sm:px-6"
        >
          {/* Ambient sage particles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {TERMINAL_PARTICLES.map((particle, index) => (
              <span
                key={index}
                style={
                  {
                    left: particle.left,
                    top: particle.top,
                    "--float-duration": particle.duration,
                    "--float-delay": particle.delay,
                  } as React.CSSProperties
                }
                className="animate-ambient-float absolute h-1.5 w-1.5 rounded-full bg-muted-sage/45 shadow-[0_0_10px_rgba(145,165,141,0.55)]"
              />
            ))}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(63,96,73,0.12)_0%,transparent_65%)]" />
          </div>

          {/* Skip Intro Button */}
          <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10">
            <button
              type="button"
              onClick={finishIntro}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-muted-sage/30 bg-graphite/80 px-4 py-2 font-mono text-xs tracking-[0.1em] uppercase text-warm-cream transition-colors hover:border-amber hover:text-amber"
            >
              <span>Skip Intro</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Minimal Terminal Container */}
          <div className="relative w-full max-w-2xl rounded-xl border border-muted-sage/25 bg-graphite/85 p-6 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between border-b border-warm-cream/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Terminal className="h-4 w-4 text-muted-sage" aria-hidden="true" />
                <span
                  id="init-heading"
                  className="font-mono text-xs tracking-[0.14em] uppercase text-muted-sage"
                >
                  RASHMI.PORTFOLIO // SYSTEM BOOT
                </span>
              </div>
              <span className="font-mono text-[11px] text-warm-cream/55">
                {progress}%
              </span>
            </div>

            {/* Progressive Terminal Output */}
            <div
              aria-live="off"
              className="min-h-[168px] space-y-2 font-mono text-xs sm:text-sm leading-relaxed"
            >
              {visibleLines.map((line, idx) => {
                const isLast = idx === visibleLines.length - 1 && !showWelcome;
                const isReady = line === "> SYSTEM READY.";
                return (
                  <p
                    key={idx}
                    className={
                      isReady
                        ? "text-amber font-medium tracking-wide"
                        : "text-muted-sage"
                    }
                  >
                    {line}
                    {isLast && (
                      <span
                        aria-hidden="true"
                        className="animate-cursor-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-muted-sage shadow-[0_0_8px_rgba(145,165,141,0.85)]"
                      />
                    )}
                  </p>
                );
              })}

              {visibleLines.length === 0 && (
                <p className="text-muted-sage">
                  <span
                    aria-hidden="true"
                    className="animate-cursor-blink inline-block h-4 w-2 bg-muted-sage shadow-[0_0_8px_rgba(145,165,141,0.85)]"
                  />
                </p>
              )}
            </div>

            {/* Welcome Reveal */}
            <div className="mt-6 min-h-[56px] border-t border-warm-cream/10 pt-5">
              {showWelcome && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="font-display text-xl sm:text-2xl font-semibold tracking-[0.14em] text-warm-cream">
                    {WELCOME_LINE}
                    <span
                      aria-hidden="true"
                      className="animate-cursor-blink ml-1.5 inline-block h-5 w-2.5 translate-y-0.5 bg-amber shadow-[0_0_12px_rgba(214,161,91,0.8)]"
                    />
                  </p>

                  {prefersReducedMotion && (
                    <button
                      type="button"
                      onClick={finishIntro}
                      className="inline-flex min-h-10 items-center gap-2 rounded-md bg-amber px-4 py-2 font-mono text-xs font-semibold tracking-[0.08em] uppercase text-midnight transition-colors hover:bg-soft-gold"
                    >
                      <span>Enter Workspace</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Minimal Progress Bar */}
            <div
              role="progressbar"
              aria-label="Portfolio initialization progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-4 h-1 w-full overflow-hidden rounded-full bg-midnight/80"
            >
              <div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-forest-green via-muted-sage to-amber transition-[width] duration-150 ease-out"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
