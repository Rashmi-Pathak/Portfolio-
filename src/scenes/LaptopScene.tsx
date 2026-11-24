"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Monitor, RotateCcw } from "lucide-react";
import {
  ensureScrollTriggerRegistered,
  refreshScrollTriggers,
} from "@/animation/scrollController";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LaptopModel } from "@/three/LaptopModel";

function checkWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function LaptopScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<number>(prefersReducedMotion ? 0.55 : 0.08);
  const [webglSupported] = useState<boolean>(() => checkWebGLAvailable());
  const [hudProgress, setHudProgress] = useState<number>(
    prefersReducedMotion ? 55 : 8
  );

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      const triggerObj = { progress: 0 };

      gsap.to(triggerObj, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            const pct = Math.round(self.progress * 100);
            setHudProgress((prev) => (Math.abs(prev - pct) >= 2 ? pct : prev));
          },
        },
      });
    }, sectionRef);

    refreshScrollTriggers();

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="laptop"
      aria-labelledby="laptop-heading"
      className={`relative w-full border-t border-warm-cream/10 bg-midnight ${
        prefersReducedMotion ? "min-h-screen py-20" : "min-h-[180vh]"
      }`}
    >
      <div className="sticky top-0 flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 sm:px-10 lg:px-14">
        {/* Desk Transition Backdrop (workspace-desk.jpg) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <Image
            src="/assets/illustrations/workspace-desk.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-25 transition-opacity duration-500"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(23,26,28,0.45) 0%, rgba(23,26,28,0.92) 72%, #171A1C 100%)",
            }}
          />
        </div>

        {/* Scene Header */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pointer-events-none">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
              06 // Interactive 3D Workstation
            </p>
            <h2
              id="laptop-heading"
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
            >
              ENTERING THE MACHINE
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto rounded-lg border border-warm-cream/15 bg-graphite/75 px-3.5 py-2 font-mono text-xs text-warm-cream/85 backdrop-blur-sm">
            <Monitor className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>Hinge Sequence · {hudProgress}%</span>
          </div>
        </div>

        {/* 3D Canvas Stage */}
        <div className="relative z-10 mx-auto my-auto h-[420px] sm:h-[520px] lg:h-[560px] w-full max-w-[1160px]">
          {webglSupported ? (
            <Canvas
              dpr={[1, 1.75]}
              camera={{ position: [0, 0.16, 0.68], fov: 36, near: 0.02, far: 20 }}
              gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
            >
              <ambientLight intensity={0.75} color="#f5e6d3" />
              <directionalLight
                position={[1.4, 2.2, 1.8]}
                intensity={1.65}
                color="#fff3e0"
              />
              <directionalLight
                position={[-1.5, 0.8, 1.0]}
                intensity={0.75}
                color="#91a58d"
              />
              <pointLight
                position={[0, 0.6, -0.5]}
                intensity={0.9}
                color="#d6a15b"
              />

              <Suspense fallback={null}>
                <LaptopModel
                  progressRef={progressRef}
                  reducedMotion={prefersReducedMotion}
                />
              </Suspense>
            </Canvas>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-warm-cream/15 bg-graphite/80 p-8 text-center">
              <RotateCcw className="h-8 w-8 text-amber" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-semibold text-off-white">
                3D Laptop Preview Unavailable
              </h3>
              <p className="mt-2 max-w-md text-sm text-warm-cream/75">
                WebGL is disabled in this browser context. Continue scrolling to
                explore Rashmi&apos;s frontend, backend, AI/ML, and database
                engineering environments.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Caption */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-wrap items-center justify-between gap-3 font-mono text-xs text-warm-cream/70 pointer-events-none">
          <span>
            Model: 15.6&quot; Workstation · Programmatic Hinge Axis Rig
          </span>
          <span className="text-muted-sage">
            Scroll down to zoom through the display into Scene 07 →
          </span>
        </div>
      </div>
    </section>
  );
}
