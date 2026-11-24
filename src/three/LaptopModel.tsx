"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface LaptopModelProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

const MODEL_PATH = "/models/laptop-15-6-inch-open.glb";

// Exact Screen mesh surface coordinates inspected from laptop-15-6-inch-open.glb:
// Screen min=[-0.1727, 0.0585, -0.1961], max=[0.1727, 0.2411, -0.1294]
// Tilt angle backward from vertical = atan2(0.0667, 0.1826) = 0.3502 rad (~20.06 deg)
const SCREEN_CENTER_LOCAL = new THREE.Vector3(0, 0.1498, -0.16275);
const SCREEN_TILT_X = -0.3502;
const SCREEN_WIDTH = 0.338;
const SCREEN_HEIGHT = 0.188;

const LID_MESH_NAMES = new Set([
  "Lid",
  "Display bezel",
  "Screen",
  "Webcam",
]);

function drawLaptopScreenCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bootProgress: number
) {
  const isAwake = bootProgress >= 0.22;
  const wakeAlpha = isAwake
    ? Math.min(1, 0.25 + (bootProgress - 0.22) / 0.22)
    : 0.12;

  ctx.fillStyle = "#0D1114";
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = wakeAlpha;

  ctx.fillStyle = "#121619";
  ctx.fillRect(16, 16, width - 32, height - 32);

  ctx.strokeStyle = "rgba(240, 231, 217, 0.14)";
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  ctx.strokeStyle = "rgba(240, 231, 217, 0.12)";
  ctx.beginPath();
  ctx.moveTo(36, 74);
  ctx.lineTo(width - 36, 74);
  ctx.stroke();

  const dotColors = ["#D6A15B", "#91A58D", "#A58D91"];
  dotColors.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(48 + i * 22, 46, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(240, 231, 217, 0.85)";
  ctx.font = "500 18px monospace";
  ctx.fillText("rashmi-space — src/scenes/TechnicalWorld.tsx", 122, 52);

  ctx.fillStyle = "rgba(63, 96, 73, 0.45)";
  ctx.fillRect(width - 208, 30, 168, 30);
  ctx.fillStyle = "#91A58D";
  ctx.font = "600 14px monospace";
  ctx.fillText("LIVE WORKSPACE", width - 190, 50);

  ctx.fillStyle = "#171A1C";
  ctx.fillRect(38, 96, 540, 396);
  ctx.strokeStyle = "rgba(240, 231, 217, 0.1)";
  ctx.strokeRect(38, 96, 540, 396);

  const codeLines: ReadonlyArray<{ text: string; color: string; y: number }> = [
    { text: "// System Architecture · Rashmi Pathak", color: "#B69B96", y: 136 },
    { text: "const developerSpace = {", color: "#D6A15B", y: 184 },
    { text: '  frontend: ["React", "Next.js", "TypeScript"],', color: "#F5F1E9", y: 224 },
    { text: '  backend:  ["REST APIs", "Node.js", "Auth"],', color: "#F5F1E9", y: 264 },
    { text: '  aiLab:    ["Python", "NumPy", "Pandas", "ML"],', color: "#F5F1E9", y: 304 },
    { text: '  database: ["PostgreSQL", "MySQL", "SQLite"],', color: "#F5F1E9", y: 344 },
    { text: "};", color: "#91A58D", y: 384 },
    { text: "export default enterTechnicalWorld(developerSpace);", color: "#C5A66D", y: 444 },
  ];

  ctx.font = "400 17px monospace";
  for (const line of codeLines) {
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 62, line.y);
  }

  ctx.fillStyle = "#1A1E21";
  ctx.fillRect(600, 96, 386, 396);
  ctx.strokeStyle = "rgba(214, 161, 91, 0.25)";
  ctx.strokeRect(600, 96, 386, 396);

  ctx.fillStyle = "#D6A15B";
  ctx.font = "600 14px monospace";
  ctx.fillText("SCENE TRANSITION", 626, 138);

  ctx.fillStyle = "#F5F1E9";
  ctx.font = "700 28px sans-serif";
  ctx.fillText("Entering the", 626, 186);
  ctx.fillText("Engineering Stack", 626, 222);

  ctx.fillStyle = "rgba(240, 231, 217, 0.78)";
  ctx.font = "400 16px sans-serif";
  ctx.fillText("Frontend UI, API request flow,", 626, 268);
  ctx.fillText("AI/ML neural pipelines & SQL.", 626, 294);

  ctx.strokeStyle = "rgba(240, 231, 217, 0.12)";
  ctx.beginPath();
  ctx.moveTo(626, 344);
  ctx.lineTo(960, 344);
  ctx.stroke();

  const statusText =
    bootProgress < 0.45
      ? "MOUNTING WORKSPACE..."
      : bootProgress < 0.75
      ? "COMPILING MODULES · OK"
      : "ENTERING TECHNICAL WORLD →";

  ctx.fillStyle = "#91A58D";
  ctx.font = "500 14px monospace";
  ctx.fillText("HINGE RIG", 626, 382);
  ctx.fillStyle = "#F5F1E9";
  ctx.fillText("ACTIVE", 890, 382);

  ctx.fillStyle = "#91A58D";
  ctx.fillText("STATUS", 626, 418);
  ctx.fillStyle = "#D6A15B";
  ctx.fillText(statusText, 718, 418);

  const pct = Math.round(bootProgress * 100);
  ctx.fillStyle = "rgba(240, 231, 217, 0.1)";
  ctx.fillRect(626, 450, 334, 8);
  ctx.fillStyle = "#D6A15B";
  ctx.fillRect(626, 450, Math.round((334 * pct) / 100), 8);

  ctx.fillStyle = "rgba(240, 231, 217, 0.65)";
  ctx.font = "400 14px monospace";
  ctx.fillText("B.TECH IT · 2024–2028", 38, 534);
  ctx.fillText(`SCROLL SEQUENCE: ${pct}%`, width - 226, 534);

  ctx.restore();
}

export function LaptopModel({ progressRef, reducedMotion }: LaptopModelProps) {
  const gltf = useGLTF(MODEL_PATH);

  const rootGroupRef = useRef<THREE.Group>(null);
  const lidPivotRef = useRef<THREE.Group | null>(null);
  const screenGlowLightRef = useRef<THREE.PointLight>(null);
  const powerMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const screenCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const lastUiBucketRef = useRef<number>(-1);

  useEffect(() => {
    const mountGroup = rootGroupRef.current;
    if (!mountGroup) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      drawLaptopScreenCanvas(ctx, 1024, 576, reducedMotion ? 0.85 : 0.45);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;

    screenCtxRef.current = ctx;
    screenTextureRef.current = texture;

    const clonedScene = gltf.scene.clone(true);
    clonedScene.updateMatrixWorld(true);

    clonedScene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        if (Array.isArray(obj.material)) {
          obj.material = obj.material.map((m) => m.clone());
        } else if (obj.material) {
          obj.material = obj.material.clone();
        }
      }
    });

    const hingeObj = clonedScene.getObjectByName("Hinge");
    const hingeBox = new THREE.Box3();
    if (hingeObj) {
      hingeBox.setFromObject(hingeObj);
    } else {
      hingeBox.set(
        new THREE.Vector3(-0.09, 0.014, -0.124),
        new THREE.Vector3(0.09, 0.025, -0.114)
      );
    }
    const hingeCenter = new THREE.Vector3();
    hingeBox.getCenter(hingeCenter);

    const pivot = new THREE.Group();
    pivot.name = "ProgrammaticLidHingePivot";
    pivot.position.copy(hingeCenter);
    clonedScene.add(pivot);
    clonedScene.updateMatrixWorld(true);

    const lidParts: THREE.Object3D[] = [];
    let powerLightMesh: THREE.Mesh | null = null;
    let screenMesh: THREE.Mesh | null = null;

    clonedScene.traverse((obj) => {
      if (LID_MESH_NAMES.has(obj.name)) {
        lidParts.push(obj);
      }
      if (obj.name === "Power light" && obj instanceof THREE.Mesh) {
        powerLightMesh = obj;
      }
      if (obj.name === "Screen" && obj instanceof THREE.Mesh) {
        screenMesh = obj;
      }
    });

    for (const part of lidParts) {
      pivot.attach(part);
    }

    if (
      powerLightMesh &&
      (powerLightMesh as THREE.Mesh).material instanceof
        THREE.MeshStandardMaterial
    ) {
      const mat = (powerLightMesh as THREE.Mesh)
        .material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color("#D6A15B");
      mat.emissiveIntensity = 1.2;
      powerMaterialRef.current = mat;
    }

    if (
      screenMesh &&
      (screenMesh as THREE.Mesh).material instanceof THREE.MeshStandardMaterial
    ) {
      const mat = (screenMesh as THREE.Mesh)
        .material as THREE.MeshStandardMaterial;
      mat.transparent = false;
      mat.opacity = 1;
      mat.color = new THREE.Color("#0D1114");
      mat.emissive = new THREE.Color("#172026");
      mat.emissiveIntensity = 0.25;
      mat.needsUpdate = true;
      screenMaterialRef.current = mat;
    }

    const screenLocalToPivot = SCREEN_CENTER_LOCAL.clone()
      .sub(hingeCenter)
      .add(new THREE.Vector3(0, 0.0007, 0.002));

    const displayPlaneGeo = new THREE.PlaneGeometry(SCREEN_WIDTH, SCREEN_HEIGHT);
    const displayPlaneMat = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
    });
    const displayPlane = new THREE.Mesh(displayPlaneGeo, displayPlaneMat);
    displayPlane.name = "LaptopDisplaySurface";
    displayPlane.position.copy(screenLocalToPivot);
    displayPlane.rotation.set(SCREEN_TILT_X, 0, 0);
    pivot.add(displayPlane);

    lidPivotRef.current = pivot;
    mountGroup.add(clonedScene);

    return () => {
      mountGroup.remove(clonedScene);
      lidPivotRef.current = null;
      powerMaterialRef.current = null;
      screenMaterialRef.current = null;
      screenCtxRef.current = null;
      screenTextureRef.current = null;
      texture.dispose();
      displayPlaneGeo.dispose();
      displayPlaneMat.dispose();

      clonedScene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    };
  }, [gltf.scene, reducedMotion]);

  useFrame((state, delta) => {
    const p = reducedMotion ? 0.55 : progressRef.current;

    // 1. Laptop body entrance
    if (rootGroupRef.current) {
      const enterT = THREE.MathUtils.clamp(p / 0.35, 0, 1);
      const easeEnter = 1 - Math.pow(1 - enterT, 3);

      const targetY = THREE.MathUtils.lerp(-0.34, -0.09, easeEnter);
      const targetRotY = THREE.MathUtils.lerp(0.58, -0.14, easeEnter);
      const settleRotY = THREE.MathUtils.lerp(
        targetRotY,
        0.0,
        THREE.MathUtils.clamp((p - 0.35) / 0.35, 0, 1)
      );
      const targetRotX = THREE.MathUtils.lerp(0.18, 0.05, easeEnter);

      const damp = Math.min(1, delta * 9);
      rootGroupRef.current.position.y = THREE.MathUtils.lerp(
        rootGroupRef.current.position.y,
        targetY,
        damp
      );
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        settleRotY +
          (reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.6) * 0.015),
        damp
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        damp
      );
    }

    // 2. Programmatic hinge rotation around Hinge barrel centerline
    if (lidPivotRef.current) {
      const openT = THREE.MathUtils.clamp(p / 0.42, 0, 1);
      const easeOpen = 1 - Math.pow(1 - openT, 3);
      const targetHingeX = THREE.MathUtils.lerp(1.18, 0, easeOpen);
      lidPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        lidPivotRef.current.rotation.x,
        targetHingeX,
        Math.min(1, delta * 10)
      );
    }

    // 3. Screen & keyboard illumination
    const glowT = THREE.MathUtils.clamp((p - 0.2) / 0.45, 0, 1);
    if (screenGlowLightRef.current) {
      screenGlowLightRef.current.intensity = THREE.MathUtils.lerp(
        0.05,
        1.4,
        glowT
      );
    }
    if (powerMaterialRef.current) {
      powerMaterialRef.current.emissiveIntensity = 0.6 + glowT * 1.8;
    }
    if (screenMaterialRef.current) {
      screenMaterialRef.current.emissiveIntensity = 0.1 + glowT * 0.45;
    }

    // 4. Camera approach toward the screen
    const zoomT = THREE.MathUtils.clamp((p - 0.58) / 0.42, 0, 1);
    const easeZoom = zoomT * zoomT * (3 - 2 * zoomT);
    const targetCamZ = THREE.MathUtils.lerp(0.68, 0.34, easeZoom);
    const targetCamY = THREE.MathUtils.lerp(0.16, 0.08, easeZoom);

    const activeCamera = state.camera;
    const nextZ = THREE.MathUtils.lerp(
      activeCamera.position.z,
      targetCamZ,
      Math.min(1, delta * 8)
    );
    const nextY = THREE.MathUtils.lerp(
      activeCamera.position.y,
      targetCamY,
      Math.min(1, delta * 8)
    );
    activeCamera.position.set(activeCamera.position.x, nextY, nextZ);
    activeCamera.lookAt(0, THREE.MathUtils.lerp(0.04, 0.06, easeZoom), -0.1);

    // 5. Redraw CanvasTexture screen content cleanly when progress steps change
    const bucket = Math.round(p * 25);
    if (
      bucket !== lastUiBucketRef.current &&
      screenCtxRef.current &&
      screenTextureRef.current
    ) {
      lastUiBucketRef.current = bucket;
      drawLaptopScreenCanvas(screenCtxRef.current, 1024, 576, p);
      screenTextureRef.current.needsUpdate = true;
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, reducedMotion ? -0.09 : -0.34, 0]}>
      <pointLight
        ref={screenGlowLightRef}
        position={[0, 0.14, -0.05]}
        color="#f5d5a7"
        intensity={0.4}
        distance={0.9}
        decay={2}
      />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
