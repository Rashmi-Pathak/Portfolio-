"use client";

import { useEffect, useState } from "react";

export type NavSectionId =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "journey"
  | "contact";

const TRACKED_SECTIONS: readonly NavSectionId[] = [
  "hero",
  "about",
  "skills",
  "projects",
  "journey",
  "contact",
];

export interface ScrollProgressState {
  activeSection: NavSectionId;
}

/**
 * Tracks only the currently active section ID using requestAnimationFrame throttling.
 * React state only updates when the active section crosses a threshold (~8 times per page),
 * preventing full-app re-renders while scrolling.
 */
export function useScrollProgress(): ScrollProgressState {
  const [activeSection, setActiveSection] = useState<NavSectionId>("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const computeActiveSection = () => {
      rafId = 0;
      const probeY = window.innerHeight * 0.35;
      let nextSection: NavSectionId = "hero";

      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (id === "about") {
          // #about is an anchor marker inside HeroToAboutStage at ~76% scroll depth
          if (rect.top <= window.innerHeight * 0.6) {
            nextSection = "about";
          }
          continue;
        }
        if (rect.top <= probeY && rect.bottom > probeY * 0.4) {
          nextSection = id;
        }
      }

      setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(computeActiveSection);
    };

    computeActiveSection();
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

  return { activeSection };
}
