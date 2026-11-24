"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers GSAP ScrollTrigger once on the client and sets sane defaults
 * so fast scrolling and window resizes never leave stale states.
 */
export function ensureScrollTriggerRegistered(): typeof ScrollTrigger | null {
  if (typeof window === "undefined") return null;

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    registered = true;
  }

  return ScrollTrigger;
}

/**
 * Safely schedules a ScrollTrigger refresh after dynamic layout or font changes.
 */
export function refreshScrollTriggers(): void {
  if (typeof window === "undefined") return;
  const st = ensureScrollTriggerRegistered();
  if (!st) return;
  window.requestAnimationFrame(() => {
    st.refresh();
  });
}
