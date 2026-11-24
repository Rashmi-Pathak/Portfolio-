"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollProps {
  paused: boolean;
}

/**
 * Provides butter-smooth inertia wheel/touch gliding synced frame-for-frame
 * with GSAP ScrollTrigger via gsap.ticker, disabled under reduced motion.
 */
export function SmoothScroll({ paused }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (paused) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [paused]);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      return;
    }

    const ScrollTrigger = ensureScrollTriggerRegistered();
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      smoothWheel: true,
      anchors: true,
    });

    lenisRef.current = lenis;

    if (pausedRef.current) {
      lenis.stop();
    }

    if (ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return null;
}
