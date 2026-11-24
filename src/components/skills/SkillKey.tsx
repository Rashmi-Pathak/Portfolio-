"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { KeyRole, SkillDefinition } from "@/data/skills";

interface SkillKeyProps {
  skill: SkillDefinition;
  position: [number, number, number];
  keyWidth: number;
  keyDepth: number;
  selected: boolean;
  hovered: boolean;
  revealIndex: number;
  revealProgressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  onHover: (skill: SkillDefinition) => void;
  onHoverEnd: (skill: SkillDefinition) => void;
  onSelect: (skill: SkillDefinition) => void;
}

const KEY_BASE_COLORS: Record<KeyRole, THREE.Color> = {
  main: new THREE.Color("#27292D"),
  special: new THREE.Color("#B77D70"),
  function: new THREE.Color("#5E412F"),
};

const KEY_HOVER_COLORS: Record<KeyRole, THREE.Color> = {
  main: new THREE.Color("#33363C"),
  special: new THREE.Color("#C78D7F"),
  function: new THREE.Color("#73503A"),
};

// Aesthetic warm burnt/amber orange for clicked/active keycaps
const SELECTED_BODY_COLOR = new THREE.Color("#D97736");
const REST_EMISSIVE_COLOR = new THREE.Color("#000000");
const HOVER_EMISSIVE_COLOR = new THREE.Color("#D6A15B");
const SELECTED_EMISSIVE_COLOR = new THREE.Color("#E07A38");
const HOVER_RIM_COLOR = new THREE.Color("#E5B56B");
const SELECTED_RIM_COLOR = new THREE.Color("#F4A261");
const LEGEND_REST_COLOR = new THREE.Color("#EFE5D6");
const LEGEND_ACTIVE_COLOR = new THREE.Color("#FFFDF9");

let sharedKeyShadowTexture: THREE.CanvasTexture | null = null;
function getKeyShadowTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (sharedKeyShadowTexture) return sharedKeyShadowTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(64, 64, 14, 64, 64, 62);
  grad.addColorStop(0, "rgba(6, 7, 8, 0.86)");
  grad.addColorStop(0.58, "rgba(6, 7, 8, 0.45)");
  grad.addColorStop(1, "rgba(6, 7, 8, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  sharedKeyShadowTexture = tex;
  return tex;
}

function createRoundedRectShape(
  width: number,
  depth: number,
  radius: number
): THREE.Shape {
  const hw = width / 2;
  const hd = depth / 2;
  const r = Math.min(radius, hw * 0.42, hd * 0.42);
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

function createRimGeometry(
  width: number,
  depth: number,
  radius: number,
  thickness: number
): THREE.ExtrudeGeometry {
  const outer = createRoundedRectShape(width, depth, radius);
  const inner = createRoundedRectShape(
    Math.max(0.1, width - thickness * 2),
    Math.max(0.1, depth - thickness * 2),
    Math.max(0.02, radius - thickness * 0.6)
  );
  outer.holes.push(inner);

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth: 0.012,
    bevelEnabled: false,
    curveSegments: 6,
  });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function createLegendTexture(
  skill: SkillDefinition,
  width: number,
  depth: number
): THREE.CanvasTexture {
  const aspect = width / depth;
  const canvasH = 256;
  const canvasW = Math.max(256, Math.round(canvasH * aspect));

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, canvasW, canvasH);

    const pipColor =
      skill.categoryId === "ai-data" || skill.categoryId === "backend"
        ? "#91A58D"
        : skill.categoryId === "tools"
        ? "#D9C4A5"
        : "#E5B56B";

    ctx.fillStyle = pipColor;
    ctx.beginPath();
    ctx.arc(30, 34, 6, 0, Math.PI * 2);
    ctx.fill();

    const shortDomain =
      skill.categoryId === "languages"
        ? "LANG"
        : skill.categoryId === "frontend"
        ? "UI"
        : skill.categoryId === "backend"
        ? "API"
        : skill.categoryId === "database"
        ? "DB"
        : skill.categoryId === "ai-data"
        ? "AI"
        : "DEV";

    ctx.fillStyle = "rgba(240, 231, 217, 0.58)";
    ctx.font = "600 18px monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(shortDomain, canvasW - 24, 34);

    const label = skill.abbreviation;
    const words = label.split(" ");
    ctx.fillStyle = "#F5F1E9";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let fontSize = 54;
    const maxTextW = canvasW - 44;

    if (words.length > 1) {
      fontSize = 44;
      ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
      const longestWord = words.reduce((a, b) =>
        a.length >= b.length ? a : b
      );
      while (ctx.measureText(longestWord).width > maxTextW && fontSize > 26) {
        fontSize -= 2;
        ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
      }
      ctx.fillText(words[0], canvasW / 2, canvasH * 0.53);
      ctx.fillText(words.slice(1).join(" "), canvasW / 2, canvasH * 0.74);
    } else {
      ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
      while (ctx.measureText(label).width > maxTextW && fontSize > 26) {
        fontSize -= 2;
        ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
      }
      ctx.fillText(label, canvasW / 2, canvasH * 0.62);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export function SkillKey({
  skill,
  position,
  keyWidth,
  keyDepth,
  selected,
  hovered,
  revealIndex,
  revealProgressRef,
  reducedMotion,
  onHover,
  onHoverEnd,
  onSelect,
}: SkillKeyProps) {
  const capGroupRef = useRef<THREE.Group>(null);
  const bodyMeshRef = useRef<THREE.Mesh>(null);
  const legendMeshRef = useRef<THREE.Mesh>(null);
  const rimMeshRef = useRef<THREE.Mesh>(null);
  const shadowMeshRef = useRef<THREE.Mesh>(null);
  const bodyMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const legendMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const rimMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const shadowMatRef = useRef<THREE.MeshBasicMaterial | null>(null);

  useEffect(() => {
    const capGroup = capGroupRef.current;
    const bodyMesh = bodyMeshRef.current;
    const legendMesh = legendMeshRef.current;
    const rimMesh = rimMeshRef.current;
    const shadowMesh = shadowMeshRef.current;
    if (!capGroup || !bodyMesh || !legendMesh || !rimMesh || !shadowMesh) {
      return;
    }

    const bevelSize = 0.055;
    const bevelThickness = 0.065;
    const bodyHeight = 0.22;
    const topY = bodyHeight + bevelThickness * 2;

    const bodyShape = createRoundedRectShape(
      Math.max(0.25, keyWidth - bevelSize * 2),
      Math.max(0.25, keyDepth - bevelSize * 2),
      0.085
    );
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
      depth: bodyHeight,
      bevelEnabled: true,
      bevelThickness,
      bevelSize,
      bevelSegments: 4,
      curveSegments: 6,
    });
    bodyGeo.rotateX(-Math.PI / 2);
    bodyGeo.translate(0, bevelThickness, 0);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: KEY_BASE_COLORS[skill.keyRole].clone(),
      roughness: 0.56,
      metalness: 0.08,
      emissive: REST_EMISSIVE_COLOR.clone(),
      emissiveIntensity: 0,
    });

    const legendTex = createLegendTexture(skill, keyWidth, keyDepth);
    const legendGeo = new THREE.PlaneGeometry(
      keyWidth - bevelSize * 2.1,
      keyDepth - bevelSize * 2.1
    );
    const legendMat = new THREE.MeshBasicMaterial({
      map: legendTex,
      transparent: true,
      color: LEGEND_REST_COLOR.clone(),
      toneMapped: false,
      depthWrite: false,
    });

    const rimGeo = createRimGeometry(
      keyWidth - bevelSize * 1.65,
      keyDepth - bevelSize * 1.65,
      0.075,
      0.022
    );
    const rimMat = new THREE.MeshBasicMaterial({
      color: HOVER_RIM_COLOR.clone(),
      transparent: true,
      opacity: 0,
      toneMapped: false,
    });

    const shadowTex = getKeyShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(keyWidth * 1.06, keyDepth * 1.08);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
    });

    bodyMesh.geometry = bodyGeo;
    bodyMesh.material = bodyMat;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;

    legendMesh.geometry = legendGeo;
    legendMesh.material = legendMat;
    legendMesh.position.set(0, topY + 0.0025, 0);
    legendMesh.rotation.set(-Math.PI / 2, 0, 0);

    rimMesh.geometry = rimGeo;
    rimMesh.material = rimMat;
    rimMesh.position.set(0, topY - 0.006, 0);

    shadowMesh.geometry = shadowGeo;
    shadowMesh.material = shadowMat;
    shadowMesh.position.set(0, 0.005, 0);
    shadowMesh.rotation.set(-Math.PI / 2, 0, 0);

    bodyMatRef.current = bodyMat;
    legendMatRef.current = legendMat;
    rimMatRef.current = rimMat;
    shadowMatRef.current = shadowMat;

    return () => {
      document.body.style.cursor = "auto";
      bodyMatRef.current = null;
      legendMatRef.current = null;
      rimMatRef.current = null;
      shadowMatRef.current = null;
      bodyGeo.dispose();
      bodyMat.dispose();
      legendGeo.dispose();
      legendMat.dispose();
      legendTex.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, [keyDepth, keyWidth, skill]);

  useFrame((_, delta) => {
    const capGroup = capGroupRef.current;
    const bodyMat = bodyMatRef.current;
    const legendMat = legendMatRef.current;
    const rimMat = rimMatRef.current;
    const shadowMesh = shadowMeshRef.current;
    const shadowMat = shadowMatRef.current;
    if (!capGroup || !bodyMat || !legendMat || !rimMat || !shadowMesh || !shadowMat) {
      return;
    }

    const dt = Math.min(delta, 0.05);
    const damp = reducedMotion ? 1 : 1 - Math.exp(-18 * dt);

    const globalReveal = reducedMotion ? 1 : revealProgressRef.current;
    const keyStart = Math.min(0.65, revealIndex * 0.022);
    const localReveal = THREE.MathUtils.clamp(
      (globalReveal - keyStart) / 0.35,
      0,
      1
    );
    const easeReveal = 1 - Math.pow(1 - localReveal, 3);
    const entryOffsetY = (1 - easeReveal) * 0.85;

    const stateOffsetY = selected
      ? -0.155
      : hovered
      ? 0.075
      : 0;

    const targetY = entryOffsetY + stateOffsetY;
    capGroup.position.y = THREE.MathUtils.lerp(
      capGroup.position.y,
      targetY,
      damp
    );

    const targetScale = 0.72 + 0.28 * easeReveal;
    const nextScale = THREE.MathUtils.lerp(capGroup.scale.x, targetScale, damp);
    capGroup.scale.setScalar(nextScale);

    const targetTiltX = selected ? 0.055 : hovered ? 0.015 : 0.035;
    capGroup.rotation.x = THREE.MathUtils.lerp(
      capGroup.rotation.x,
      targetTiltX,
      damp
    );

    // Body material color -> rich burnt orange when clicked/selected
    const targetBodyCol = selected
      ? SELECTED_BODY_COLOR
      : hovered
      ? KEY_HOVER_COLORS[skill.keyRole]
      : KEY_BASE_COLORS[skill.keyRole];
    bodyMat.color.lerp(targetBodyCol, damp);

    const targetEmissive = selected
      ? SELECTED_EMISSIVE_COLOR
      : hovered
      ? HOVER_EMISSIVE_COLOR
      : REST_EMISSIVE_COLOR;
    bodyMat.emissive.lerp(targetEmissive, damp);

    const targetEmissiveInt = selected ? 0.22 : hovered ? 0.14 : 0;
    bodyMat.emissiveIntensity = THREE.MathUtils.lerp(
      bodyMat.emissiveIntensity,
      targetEmissiveInt,
      damp
    );

    // Legend brightens on hover or selection
    const targetLegendCol =
      selected || hovered ? LEGEND_ACTIVE_COLOR : LEGEND_REST_COLOR;
    legendMat.color.lerp(targetLegendCol, damp);

    // Rim shifts smoothly from golden hover to warm orange selected glow
    rimMat.color.lerp(selected ? SELECTED_RIM_COLOR : HOVER_RIM_COLOR, damp);
    const targetRimOpacity = selected ? 0.92 : hovered ? 0.55 : 0;
    rimMat.opacity = THREE.MathUtils.lerp(rimMat.opacity, targetRimOpacity, damp);

    // Dynamic ambient key-well shadow
    const targetShadowOpacity = selected ? 0.84 : hovered ? 0.68 : 0.48;
    shadowMat.opacity = THREE.MathUtils.lerp(
      shadowMat.opacity,
      targetShadowOpacity * easeReveal,
      damp
    );

    const targetShadowScale = selected ? 0.94 : hovered ? 1.08 : 1.0;
    const nextShadowS = THREE.MathUtils.lerp(
      shadowMesh.scale.x,
      targetShadowScale,
      damp
    );
    shadowMesh.scale.set(nextShadowS, nextShadowS, 1);
  });

  return (
    <group position={position}>
      <mesh ref={shadowMeshRef} />

      <group
        ref={capGroupRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(skill);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          onHoverEnd(skill);
          document.body.style.cursor = "auto";
        }}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(skill);
        }}
      >
        <mesh ref={bodyMeshRef} />
        <mesh ref={rimMeshRef} />
        <mesh ref={legendMeshRef} />
      </group>
    </group>
  );
}
