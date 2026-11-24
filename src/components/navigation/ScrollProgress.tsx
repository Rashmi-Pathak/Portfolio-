"use client";

import { useEffect, useRef } from "react";

interface ScrollProgressProps {
  visible: boolean;
}

/**
 * Top scroll indicator that updates its transform directly via DOM ref inside
 * requestAnimationFrame so scrolling causes zero React re-renders.
 */
export function ScrollProgress({ visible }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      bar.style.transform = `scaleX(${progress})`;
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 inset-x-0 z-50 h-[3px] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full w-full bg-midnight/40" />
      <div
        ref={barRef}
        style={{ transform: "scaleX(0)" }}
        className="absolute inset-0 origin-left bg-gradient-to-r from-forest-green via-amber to-soft-gold will-change-transform"
      />
    </div>
  );
}
