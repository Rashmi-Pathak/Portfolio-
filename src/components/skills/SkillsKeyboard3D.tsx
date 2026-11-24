"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  KEYBOARD_ROWS,
  TECHNICAL_SKILLS,
  type SkillDefinition,
} from "@/data/skills";
import { SkillKey } from "./SkillKey";

interface SkillsKeyboard3DProps {
  selectedSkillId: string | null;
  hoveredSkillId: string | null;
  reducedMotion: boolean;
  active: boolean;
  revealProgressRef: React.MutableRefObject<number>;
  onHover: (skill: SkillDefinition) => void;
  onHoverEnd: (skill: SkillDefinition) => void;
  onSelect: (skill: SkillDefinition) => void;
}

interface PositionedKey {
  skill: SkillDefinition;
  x: number;
  z: number;
  width: number;
  depth: number;
  index: number;
}

const TOTAL_ROW_UNITS = 9.6;
const PITCH_X = 1.0;
const PITCH_Z = 0.96;
const KEY_DEPTH = 0.84;
const KEY_GAP = 0.085;

function checkWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function createRoundedRect(width: number, depth: number, radius: number) {
  const hw = width / 2;
  const hd = depth / 2;
  const r = Math.min(radius, hw * 0.4, hd * 0.4);
  const shape = new THREE.Shape();
  shape.moveTo(-hw + r, -hd);
  shape.lineTo(hw - r, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + r);
  shape.lineTo(hw, hd - r);
  shape.quadraticCurveTo(hw, hd, hw - r, hd);
  shape.lineTo(-hw + r, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - r);
  shape.lineTo(-hw, -hd + r);
  shape.quadraticCurveTo(-hw, -hd, -hw + r, -hd);
  return shape;
}

function createWalnutTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#523726";
  ctx.fillRect(0, 0, 512, 256);

  for (let y = 0; y < 256; y += 3) {
    const alpha = 0.06 + (Math.sin(y * 0.14) + 1) * 0.045;
    ctx.fillStyle =
      y % 6 === 0 ? `rgba(28, 17, 11, ${alpha})` : `rgba(116, 80, 54, ${alpha})`;
    ctx.fillRect(0, y, 512, 2);
  }

  for (let i = 0; i < 42; i += 1) {
    const yy = (i * 29) % 256;
    ctx.strokeStyle =
      i % 2 === 0 ? "rgba(38, 24, 15, 0.22)" : "rgba(128, 89, 60, 0.14)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, yy);
    ctx.bezierCurveTo(
      170,
      yy + (i % 3) * 6 - 6,
      340,
      yy - (i % 4) * 5 + 5,
      512,
      yy
    );
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function createFloatingFloorShadowTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(128, 128, 28, 128, 128, 124);
  grad.addColorStop(0, "rgba(7, 8, 9, 0.72)");
  grad.addColorStop(0.55, "rgba(7, 8, 9, 0.34)");
  grad.addColorStop(1, "rgba(7, 8, 9, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function WalnutChassis({
  positionedKeys,
  selectedPos,
}: {
  positionedKeys: readonly PositionedKey[];
  selectedPos: [number, number] | null;
}) {
  const { size, camera } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const scaleDist =
      aspect < 1.55 ? Math.min(1.42, 1.55 / Math.max(0.85, aspect)) : 1;
    camera.position.set(
      1.85 * scaleDist,
      9.1 * scaleDist,
      10.3 * scaleDist
    );
    camera.lookAt(0, -0.02, 0.05);
  }, [camera, size.height, size.width]);

  const caseMeshRef = useRef<THREE.Mesh>(null);
  const bezelMeshRef = useRef<THREE.Mesh>(null);
  const plateMeshRef = useRef<THREE.Mesh>(null);
  const accentStripRef = useRef<THREE.Mesh>(null);
  const floorShadowRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const caseMesh = caseMeshRef.current;
    const bezelMesh = bezelMeshRef.current;
    const plateMesh = plateMeshRef.current;
    const accentStrip = accentStripRef.current;
    const floorShadow = floorShadowRef.current;
    if (!caseMesh || !bezelMesh || !plateMesh || !accentStrip || !floorShadow) {
      return;
    }

    const walnutTex = createWalnutTexture();
    const floorShadowTex = createFloatingFloorShadowTexture();

    const outerShape = createRoundedRect(10.45, 5.55, 0.36);
    const caseGeo = new THREE.ExtrudeGeometry(outerShape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 4,
      curveSegments: 8,
    });
    caseGeo.rotateX(-Math.PI / 2);

    const walnutMat = new THREE.MeshStandardMaterial({
      map: walnutTex,
      color: new THREE.Color("#7B573E"),
      roughness: 0.62,
      metalness: 0.06,
    });

    const rimOuter = createRoundedRect(10.45, 5.55, 0.35);
    const rimHole = createRoundedRect(9.78, 4.88, 0.2);
    rimOuter.holes.push(rimHole);
    const bezelGeo = new THREE.ExtrudeGeometry(rimOuter, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
      curveSegments: 8,
    });
    bezelGeo.rotateX(-Math.PI / 2);

    const rimMat = new THREE.MeshStandardMaterial({
      map: walnutTex,
      color: new THREE.Color("#63432F"),
      roughness: 0.58,
      metalness: 0.08,
    });

    const plateGeo = new THREE.BoxGeometry(9.78, 0.08, 4.88);
    const plateMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#181A1C"),
      roughness: 0.84,
      metalness: 0.14,
    });

    const stripGeo = new THREE.BoxGeometry(1.4, 0.035, 0.06);
    const stripMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E07A38"),
      emissive: new THREE.Color("#E07A38"),
      emissiveIntensity: 0.78,
      roughness: 0.3,
      metalness: 0.2,
    });

    const floorGeo = new THREE.PlaneGeometry(13.6, 8.4);
    const floorMat = new THREE.MeshBasicMaterial({
      map: floorShadowTex,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    });

    caseMesh.geometry = caseGeo;
    caseMesh.material = walnutMat;
    caseMesh.receiveShadow = true;
    caseMesh.castShadow = true;

    bezelMesh.geometry = bezelGeo;
    bezelMesh.material = rimMat;
    bezelMesh.position.set(0, 0.42, 0);
    bezelMesh.castShadow = true;
    bezelMesh.receiveShadow = true;

    plateMesh.geometry = plateGeo;
    plateMesh.material = plateMat;
    plateMesh.position.set(0, 0.47, 0);
    plateMesh.receiveShadow = true;

    accentStrip.geometry = stripGeo;
    accentStrip.material = stripMat;
    accentStrip.position.set(-4.05, 0.66, -2.59);

    floorShadow.geometry = floorGeo;
    floorShadow.material = floorMat;
    floorShadow.position.set(0.1, -0.35, 0.25);
    floorShadow.rotation.set(-Math.PI / 2, 0, 0);

    return () => {
      caseGeo.dispose();
      walnutMat.dispose();
      bezelGeo.dispose();
      rimMat.dispose();
      plateGeo.dispose();
      plateMat.dispose();
      stripGeo.dispose();
      stripMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      walnutTex?.dispose();
      floorShadowTex?.dispose();
    };
  }, [positionedKeys.length]);

  const activeLightRef = useRef<THREE.PointLight>(null);
  useFrame((_, delta) => {
    const light = activeLightRef.current;
    if (!light) return;
    const damp = 1 - Math.exp(-12 * Math.min(delta, 0.05));
    if (selectedPos) {
      light.position.x = THREE.MathUtils.lerp(light.position.x, selectedPos[0], damp);
      light.position.z = THREE.MathUtils.lerp(light.position.z, selectedPos[1], damp);
      light.intensity = THREE.MathUtils.lerp(light.intensity, 0.65, damp);
    } else {
      light.intensity = THREE.MathUtils.lerp(light.intensity, 0, damp);
    }
  });

  return (
    <group>
      <mesh ref={floorShadowRef} />
      <mesh ref={caseMeshRef} />
      <mesh ref={bezelMeshRef} />
      <mesh ref={plateMeshRef} />
      <mesh ref={accentStripRef} />
      <pointLight
        ref={activeLightRef}
        position={[0, 1.1, 0]}
        color="#F4A261"
        intensity={0}
        distance={2.6}
        decay={2}
      />
    </group>
  );
}

function KeyboardSceneContent({
  selectedSkillId,
  hoveredSkillId,
  reducedMotion,
  revealProgressRef,
  onHover,
  onHoverEnd,
  onSelect,
}: Omit<SkillsKeyboard3DProps, "active">) {
  const boardGroupRef = useRef<THREE.Group>(null);

  const positionedKeys = useMemo<PositionedKey[]>(() => {
    const items: PositionedKey[] = [];
    let runningIndex = 0;

    for (const { row } of KEYBOARD_ROWS) {
      const rowSkills = TECHNICAL_SKILLS.filter((s) => s.row === row);
      let cursorX = -TOTAL_ROW_UNITS / 2;
      const z = (row - 2) * PITCH_Z;

      for (const skill of rowSkills) {
        const slotW = skill.widthUnits * PITCH_X;
        const centerX = cursorX + slotW / 2;
        items.push({
          skill,
          x: centerX,
          z,
          width: slotW - KEY_GAP,
          depth: KEY_DEPTH,
          index: runningIndex,
        });
        cursorX += slotW;
        runningIndex += 1;
      }
    }

    return items;
  }, []);

  const selectedEntry = positionedKeys.find(
    (entry) => entry.skill.id === selectedSkillId
  );

  // Scroll-driven rotation entrance into center + pronounced buoyant studio float
  useFrame((state, delta) => {
    const board = boardGroupRef.current;
    if (!board) return;
    const dt = Math.min(delta, 0.05);
    const damp = reducedMotion ? 1 : 1 - Math.exp(-8 * dt);

    const entrance = reducedMotion
      ? 1
      : THREE.MathUtils.clamp(revealProgressRef.current, 0, 1);
    const easeEnt = 1 - Math.pow(1 - entrance, 3);

    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const swayY = Math.sin(t * 0.5) * 0.025;
    const floatY = Math.sin(t * 0.95) * 0.085;
    const floatRotX = Math.cos(t * 0.75) * 0.018;
    const floatRotZ = Math.sin(t * 0.65) * 0.014;

    const targetRotY = THREE.MathUtils.lerp(-Math.PI * 0.72, 0.12, easeEnt) + swayY;
    const targetRotX = THREE.MathUtils.lerp(0.32, 0.14, easeEnt) + floatRotX;
    const targetRotZ = -0.015 + floatRotZ;
    const targetY = THREE.MathUtils.lerp(0.65, 0.08, easeEnt) + floatY;
    const targetScale = THREE.MathUtils.lerp(0.54, 0.94, easeEnt);

    board.rotation.y = THREE.MathUtils.lerp(board.rotation.y, targetRotY, damp);
    board.rotation.x = THREE.MathUtils.lerp(board.rotation.x, targetRotX, damp);
    board.rotation.z = THREE.MathUtils.lerp(board.rotation.z, targetRotZ, damp);
    board.position.y = THREE.MathUtils.lerp(board.position.y, targetY, damp);

    const nextS = THREE.MathUtils.lerp(board.scale.x, targetScale, damp);
    board.scale.setScalar(nextS);
  });

  return (
    <group
      ref={boardGroupRef}
      rotation={[0.13, 0.14, -0.02]}
      position={[0, -0.14, 0]}
    >
      <WalnutChassis
        positionedKeys={positionedKeys}
        selectedPos={selectedEntry ? [selectedEntry.x, selectedEntry.z] : null}
      />

      <group position={[0, 0.52, 0]}>
        {positionedKeys.map(({ skill, x, z, width, depth, index }) => (
          <SkillKey
            key={skill.id}
            skill={skill}
            position={[x, 0, z]}
            keyWidth={width}
            keyDepth={depth}
            selected={selectedSkillId === skill.id}
            hovered={hoveredSkillId === skill.id}
            revealIndex={index}
            revealProgressRef={revealProgressRef}
            reducedMotion={reducedMotion}
            onHover={onHover}
            onHoverEnd={onHoverEnd}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}

/**
 * Floating frameless 3D mechanical keyboard rendered transparently directly over
 * the workspace scene. Falls back cleanly to a 2.5D tactile keycap deck on <640px
 * mobile screens or environments without WebGL.
 */
export function SkillsKeyboard3D({
  active,
  ...props
}: SkillsKeyboard3DProps) {
  const [webglSupported] = useState<boolean>(() => checkWebGLAvailable());
  const [isMobileLayout, setIsMobileLayout] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 639px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobileLayout(event.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!webglSupported || isMobileLayout) {
    return (
      <div
        role="group"
        aria-label="Interactive mechanical keyboard skill deck"
        className="rounded-2xl border-2 border-[#694832]/85 bg-gradient-to-b from-[#453125] via-[#3A291F] to-[#2B1E17] p-3.5 shadow-[0_22px_50px_rgba(0,0,0,0.55)]"
      >
        <div className="mb-2.5 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-6 rounded-full bg-[#E07A38] shadow-[0_0_8px_#E07A38]"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-warm-cream/80">
              WALNUT DECK // 25 KEYS
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-sage">
            TACTILE MODE
          </span>
        </div>

        <div className="space-y-2 rounded-xl border border-midnight bg-[#181A1C] p-2.5">
          {KEYBOARD_ROWS.map(({ row, label }) => {
            const rowSkills = TECHNICAL_SKILLS.filter((s) => s.row === row);
            return (
              <div key={row} aria-label={label} className="grid grid-cols-2 gap-2">
                {rowSkills.map((skill) => {
                  const isSelected = props.selectedSkillId === skill.id;
                  const roleStyle = isSelected
                    ? "translate-y-[3px] border-[#F4A261] bg-[#D97736] text-[#FFFDF9] shadow-[0_2px_0_#9A4D1B]"
                    : skill.keyRole === "special"
                    ? "border-warm-cream/25 bg-[#9E675B] text-[#F5F1E9] shadow-[0_5px_0_#6B443B] hover:-translate-y-0.5"
                    : skill.keyRole === "function"
                    ? "border-warm-cream/20 bg-[#5E412F] text-warm-cream shadow-[0_5px_0_#3B281C] hover:-translate-y-0.5"
                    : "border-warm-cream/15 bg-[#27292D] text-warm-cream shadow-[0_5px_0_#141517] hover:-translate-y-0.5";

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => props.onSelect(skill)}
                      aria-pressed={isSelected}
                      className={`min-h-11 rounded-lg border px-2.5 py-2 font-mono text-[11px] font-bold tracking-wider transition-all active:translate-y-[3px] last:odd:col-span-2 ${roleStyle}`}
                    >
                      {skill.abbreviation}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[1160px] sm:h-[520px] lg:h-[600px]">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.25]}
        camera={{ position: [1.85, 9.1, 10.3], fov: 32, near: 0.1, far: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.82} color="#EFE3D3" />
        <directionalLight
          position={[4.5, 9.5, 6.2]}
          intensity={1.65}
          color="#FFF1DC"
        />
        <directionalLight
          position={[-6, 5, -3]}
          intensity={0.55}
          color="#91A58D"
        />
        <pointLight
          position={[0, 4.5, 2.2]}
          intensity={0.95}
          distance={16}
          decay={2}
          color="#D6A15B"
        />

        <Suspense fallback={null}>
          <KeyboardSceneContent {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
