"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { RotateCcw } from "lucide-react";
import {
  HeroDeskLaptop,
  type LaptopOrbitOffset,
} from "@/three/HeroDeskLaptop";

interface HeroDeskLaptopCanvasProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  interactive: boolean;
  active: boolean;
}

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

export function HeroDeskLaptopCanvas({
  progressRef,
  reducedMotion,
  interactive,
  active,
}: HeroDeskLaptopCanvasProps) {
  const [webglSupported] = useState<boolean>(() => checkWebGLAvailable());
  const userOrbitRef = useRef<LaptopOrbitOffset>({ rotY: 0, rotX: 0 });
  const dragStartRef = useRef<{ x: number; y: number; rotY: number; rotX: number } | null>(
    null
  );
  const [hasCustomAngle, setHasCustomAngle] = useState(false);

  if (!webglSupported) {
    return null;
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if ((event.target as HTMLElement).closest("button")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      rotY: userOrbitRef.current.rotY,
      rotX: userOrbitRef.current.rotX,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const dx = event.clientX - dragStartRef.current.x;
    const dy = event.clientY - dragStartRef.current.y;
    userOrbitRef.current.rotY = dragStartRef.current.rotY + dx * 0.011;
    userOrbitRef.current.rotX = Math.max(
      -0.65,
      Math.min(0.65, dragStartRef.current.rotX + dy * 0.008)
    );
    if (!hasCustomAngle && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      setHasCustomAngle(true);
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      dragStartRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }
  };

  const resetOrbit = () => {
    userOrbitRef.current.rotY = 0;
    userOrbitRef.current.rotX = 0;
    setHasCustomAngle(false);
  };

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <Canvas
          frameloop={active ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 0.86], fov: 35, near: 0.02, far: 20 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
        >
          <ambientLight intensity={0.85} color="#f5e6d3" />
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
            position={[0.4, 0.6, 0.4]}
            intensity={0.95}
            color="#d6a15b"
          />

          <Suspense fallback={null}>
            <HeroDeskLaptop
              progressRef={progressRef}
              userOrbitRef={userOrbitRef}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Unoccluded Interactive 360° Drag Zone covering centered giant laptop in Beat 4 */}
      {interactive && (
        <>
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="region"
            aria-label="Interactive 3D laptop rotation zone"
            className="pointer-events-auto absolute inset-x-[12%] top-20 bottom-20 z-[22] cursor-grab active:cursor-grabbing select-none"
          />

          <div className="pointer-events-auto absolute bottom-6 left-16 sm:left-20 z-[23] flex items-center gap-2">
            <span className="rounded-full border border-amber/30 bg-midnight/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-amber backdrop-blur-sm">
              Drag laptop to inspect 360°
            </span>
            {hasCustomAngle && (
              <button
                type="button"
                onClick={resetOrbit}
                aria-label="Reset 3D laptop angle"
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-warm-cream/20 bg-graphite/90 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-warm-cream hover:border-amber hover:text-amber"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
