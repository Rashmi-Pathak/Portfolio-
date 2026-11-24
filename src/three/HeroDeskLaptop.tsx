"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { PROFILE } from "@/data/profile";

export interface LaptopOrbitOffset {
  rotY: number;
  rotX: number;
}

interface HeroDeskLaptopProps {
  progressRef: React.MutableRefObject<number>;
  userOrbitRef: React.MutableRefObject<LaptopOrbitOffset>;
  reducedMotion: boolean;
}

const MODEL_PATH = "/models/laptop-v1-lod0.glb";

function createSoftShadowTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 124);
  grad.addColorStop(0, "rgba(8, 9, 10, 0.72)");
  grad.addColorStop(0.55, "rgba(8, 9, 10, 0.36)");
  grad.addColorStop(0.85, "rgba(8, 9, 10, 0.08)");
  grad.addColorStop(1, "rgba(8, 9, 10, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let i = 0; i < words.length; i += 1) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

function drawDeskWorkspaceScreen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) {
  const wakeAlpha =
    progress < 0.2 ? 0.8 : Math.min(1, 0.8 + (progress - 0.2) / 0.22);

  ctx.fillStyle = "#0D1114";
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = wakeAlpha;

  ctx.fillStyle = "#121619";
  ctx.fillRect(28, 28, width - 56, height - 56);

  ctx.strokeStyle = "rgba(240, 231, 217, 0.16)";
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  ctx.strokeStyle = "rgba(240, 231, 217, 0.12)";
  ctx.beginPath();
  ctx.moveTo(64, 130);
  ctx.lineTo(width - 64, 130);
  ctx.stroke();

  const dotColors = ["#D6A15B", "#91A58D", "#A58D91"];
  dotColors.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(88 + i * 38, 82, 11, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(240, 231, 217, 0.88)";
  ctx.font = "500 32px monospace";
  ctx.fillText("rashmi-space — workspace.tsx", 224, 92);

  ctx.fillStyle = "rgba(63, 96, 73, 0.45)";
  ctx.fillRect(width - 370, 56, 300, 52);
  ctx.fillStyle = "#91A58D";
  ctx.font = "600 24px monospace";
  ctx.fillText("LIVE WORKSPACE", width - 336, 90);

  // Left Code Panel
  ctx.fillStyle = "#171A1C";
  ctx.fillRect(68, 174, 1020, 740);
  ctx.strokeStyle = "rgba(240, 231, 217, 0.1)";
  ctx.strokeRect(68, 174, 1020, 740);

  const codeLines: ReadonlyArray<{ text: string; color: string; y: number }> = [
    { text: "// Rashmi Pathak · Developer Space", color: "#B69B96", y: 256 },
    { text: "const profile = {", color: "#D6A15B", y: 344 },
    { text: '  role: "Software & AI/ML Developer",', color: "#F5F1E9", y: 416 },
    { text: '  degree: "B.Tech IT (2024–2028)",', color: "#F5F1E9", y: 488 },
    { text: '  stack: ["React", "Next.js", "Python"],', color: "#F5F1E9", y: 560 },
    { text: '  focus: ["Full-Stack", "ML", "FinTech"]', color: "#F5F1E9", y: 632 },
    { text: "};", color: "#91A58D", y: 704 },
    { text: "export default launchScene(profile);", color: "#C5A66D", y: 814 },
  ];

  ctx.font = "400 31px monospace";
  for (const line of codeLines) {
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 114, line.y);
  }

  // Right Focus Panel
  ctx.fillStyle = "#1A1E21";
  ctx.fillRect(1130, 174, 722, 740);
  ctx.strokeStyle = "rgba(214, 161, 91, 0.25)";
  ctx.strokeRect(1130, 174, 722, 740);

  const phaseTitle = progress < 0.24 ? "STUDIO DESK" : "ZOOMING TO WORKSPACE";
  ctx.fillStyle = "#D6A15B";
  ctx.font = "600 26px monospace";
  ctx.fillText(phaseTitle, 1180, 256);

  ctx.fillStyle = "#F5F1E9";
  ctx.font = "700 54px sans-serif";
  ctx.fillText("Build. Learn.", 1180, 352);
  ctx.fillText("Experiment.", 1180, 420);

  ctx.fillStyle = "rgba(240, 231, 217, 0.78)";
  ctx.font = "400 30px sans-serif";
  ctx.fillText("Exploring how software systems,", 1180, 506);
  ctx.fillText("AI models & web craft connect.", 1180, 552);

  const pct = Math.round(progress * 100);
  ctx.fillStyle = "#91A58D";
  ctx.font = "500 26px monospace";
  ctx.fillText("SCENE CAMERA", 1180, 720);
  ctx.fillStyle = "#D6A15B";
  ctx.fillText(`${pct}%`, 1712, 720);

  ctx.fillStyle = "rgba(240, 231, 217, 0.12)";
  ctx.fillRect(1180, 772, 620, 16);
  ctx.fillStyle = "#D6A15B";
  ctx.fillRect(1180, 772, Math.round((620 * pct) / 100), 16);

  ctx.fillStyle = "rgba(240, 231, 217, 0.68)";
  ctx.font = "400 25px monospace";
  ctx.fillText("B.TECH IT · CLASS OF 2028", 68, 996);
  ctx.fillText("GITHUB.COM/RASHMI-PATHAK", width - 480, 996);

  ctx.restore();
}

function drawAboutMeScreen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Base warm midnight studio surface inside laptop screen
  ctx.fillStyle = "#121518";
  ctx.fillRect(0, 0, width, height);

  // Subtle ambient warm glows across full screen
  const glowA = ctx.createRadialGradient(340, 260, 40, 340, 260, 620);
  glowA.addColorStop(0, "rgba(214, 161, 91, 0.16)");
  glowA.addColorStop(1, "rgba(214, 161, 91, 0)");
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, width, height);

  const glowB = ctx.createRadialGradient(1560, 820, 40, 1560, 820, 520);
  glowB.addColorStop(0, "rgba(145, 165, 141, 0.11)");
  glowB.addColorStop(1, "rgba(145, 165, 141, 0)");
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, width, height);

  // Inner Window Chrome
  drawRoundedRectPath(ctx, 16, 16, width - 32, height - 32, 20);
  ctx.fillStyle = "#161A1D";
  ctx.fill();
  ctx.strokeStyle = "rgba(240, 231, 217, 0.14)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Top Header Strip
  ctx.strokeStyle = "rgba(240, 231, 217, 0.12)";
  ctx.beginPath();
  ctx.moveTo(48, 88);
  ctx.lineTo(width - 48, 88);
  ctx.stroke();

  ["#D6A15B", "#91A58D", "#A58D91"].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(68 + i * 34, 52, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(240, 231, 217, 0.85)";
  ctx.font = "600 28px monospace";
  ctx.fillText("rashmi.space // about-me.mdx", 184, 62);

  ctx.textAlign = "right";
  ctx.fillStyle = "#91A58D";
  ctx.font = "700 26px monospace";
  ctx.fillText("B.TECH IT · CLASS OF 2028", width - 64, 62);
  ctx.textAlign = "left";

  // Full-width Editorial "WHO AM I?" Biography + Pillars + Interests
  const padX = 76;
  const contentW = width - padX * 2;

  ctx.fillStyle = "#D6A15B";
  ctx.font = "700 26px monospace";
  ctx.fillText("04 // DEVELOPER PROFILE", padX, 144);

  ctx.fillStyle = "#F5F1E9";
  ctx.font = "800 92px sans-serif";
  ctx.fillText("WHO AM I?", padX, 236);

  ctx.textAlign = "right";
  ctx.fillStyle = "#F0E7D9";
  ctx.font = "600 32px sans-serif";
  ctx.fillText("Rashmi Pathak", width - padX, 192);
  ctx.fillStyle = "#D6A15B";
  ctx.font = "500 25px monospace";
  ctx.fillText("github.com/Rashmi-Pathak", width - padX, 232);
  ctx.textAlign = "left";

  // Italic editorial quote
  ctx.fillStyle = "#F0E7D9";
  ctx.font = "italic 38px Georgia, serif";
  let nextY = drawWrappedText(
    ctx,
    "“Curious about how software thinks, renders, scales, and feels—from neural architectures to the last interactive pixel.”",
    padX,
    296,
    contentW,
    48
  );

  // Main biography paragraphs
  nextY += 12;
  ctx.fillStyle = "rgba(240, 231, 217, 0.94)";
  ctx.font = "400 34px sans-serif";
  nextY = drawWrappedText(
    ctx,
    "I'm Rashmi Pathak, pursuing a Bachelor of Technology in Information Technology (2024–2028). My work centers on building practical applications that unite solid software engineering with intelligent data-driven systems.",
    padX,
    nextY,
    contentW,
    45
  );

  nextY += 12;
  nextY = drawWrappedText(
    ctx,
    "Across full-stack web development, backend services, data analytics, and AI/ML experimentation, I love understanding how technology works under the hood and turning those concepts into interactive projects.",
    padX,
    nextY,
    contentW,
    45
  );

  // 3 Full-Width Pillar Cards
  const cardY = Math.max(nextY + 20, 646);
  const cardGap = 28;
  const cardW = (contentW - cardGap * 2) / 3;
  const cardH = 184;

  const pillars: ReadonlyArray<{ title: string; desc: string; tag: string; color: string }> = [
    {
      tag: "</> WEB",
      title: "Full-Stack Web",
      desc: "React, Next.js, TypeScript & modular REST APIs.",
      color: "#D6A15B",
    },
    {
      tag: "AI / ML",
      title: "AI & ML Labs",
      desc: "Python, NumPy, Pandas, Scikit-learn & modeling.",
      color: "#91A58D",
    },
    {
      tag: "SYSTEMS",
      title: "Build & Iterate",
      desc: "FinTech, data analytics & interactive UI craft.",
      color: "#C5A66D",
    },
  ];

  pillars.forEach((pillar, idx) => {
    const cx = padX + idx * (cardW + cardGap);
    drawRoundedRectPath(ctx, cx, cardY, cardW, cardH, 18);
    ctx.fillStyle = "#1E2225";
    ctx.fill();
    ctx.strokeStyle = "rgba(240, 231, 217, 0.16)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = pillar.color;
    ctx.font = "700 24px monospace";
    ctx.fillText(pillar.tag, cx + 26, cardY + 44);

    ctx.fillStyle = "#F5F1E9";
    ctx.font = "700 36px sans-serif";
    ctx.fillText(pillar.title, cx + 26, cardY + 92);

    ctx.fillStyle = "rgba(240, 231, 217, 0.85)";
    ctx.font = "400 27px sans-serif";
    drawWrappedText(ctx, pillar.desc, cx + 26, cardY + 132, cardW - 52, 34);
  });

  // Core Areas of Interest Chips
  const chipLabelY = cardY + cardH + 40;
  ctx.fillStyle = "#91A58D";
  ctx.font = "700 24px monospace";
  ctx.fillText("CORE AREAS OF INTEREST", padX, chipLabelY);

  let chipX = padX;
  let chipY = chipLabelY + 18;
  ctx.font = "600 25px monospace";

  for (const interest of PROFILE.interests) {
    const textW = ctx.measureText(interest).width;
    const pillW = textW + 44;
    const pillH = 48;

    if (chipX + pillW > padX + contentW) {
      chipX = padX;
      chipY += 60;
    }

    drawRoundedRectPath(ctx, chipX, chipY, pillW, pillH, 12);
    ctx.fillStyle = "#1E2225";
    ctx.fill();
    ctx.strokeStyle = "rgba(214, 161, 91, 0.3)";
    ctx.lineWidth = 1.75;
    ctx.stroke();

    ctx.fillStyle = "rgba(245, 241, 233, 0.94)";
    ctx.fillText(interest, chipX + 22, chipY + 33);

    chipX += pillW + 16;
  }
}

export function HeroDeskLaptop({
  progressRef,
  userOrbitRef,
  reducedMotion,
}: HeroDeskLaptopProps) {
  const gl = useThree((state) => state.gl);

  const rootGroupRef = useRef<THREE.Group>(null);
  const lidNodeRef = useRef<THREE.Object3D | null>(null);
  const baseLidRotXRef = useRef<number>(-1.919);
  const shadowMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const screenGlowLightRef = useRef<THREE.PointLight>(null);
  const displayPlaneMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const deskTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const aboutTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const activeScreenRef = useRef<"desk" | "about">(
    reducedMotion ? "about" : "desk"
  );

  useEffect(() => {
    const mountGroup = rootGroupRef.current;
    if (!mountGroup) return;

    let cancelled = false;

    const deskCanvas = document.createElement("canvas");
    deskCanvas.width = 1280;
    deskCanvas.height = 720;
    const deskCtx = deskCanvas.getContext("2d");
    if (deskCtx) {
      deskCtx.save();
      deskCtx.scale(1280 / 1920, 720 / 1080);
      drawDeskWorkspaceScreen(deskCtx, 1920, 1080, 0.25);
      deskCtx.restore();
    }

    const deskTexture = new THREE.CanvasTexture(deskCanvas);
    deskTexture.colorSpace = THREE.SRGBColorSpace;
    deskTexture.anisotropy = 8;
    deskTexture.needsUpdate = true;

    const aboutCanvas = document.createElement("canvas");
    aboutCanvas.width = 1920;
    aboutCanvas.height = 1080;
    const aboutCtx = aboutCanvas.getContext("2d");
    if (aboutCtx) {
      drawAboutMeScreen(aboutCtx, 1920, 1080);
    }

    const aboutTexture = new THREE.CanvasTexture(aboutCanvas);
    aboutTexture.colorSpace = THREE.SRGBColorSpace;
    aboutTexture.anisotropy = 8;
    aboutTexture.needsUpdate = true;

    deskTextureRef.current = deskTexture;
    aboutTextureRef.current = aboutTexture;

    const initialScreen: "desk" | "about" = reducedMotion ? "about" : "desk";
    activeScreenRef.current = initialScreen;

    const shadowTex = createSoftShadowTexture();

    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath("/basis/")
      .detectSupport(gl);

    const loader = new GLTFLoader();
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);

    let loadedWrapper: THREE.Group | null = null;
    let displayPlaneGeo: THREE.PlaneGeometry | null = null;
    let displayPlaneMat: THREE.MeshBasicMaterial | null = null;
    let shadowGeo: THREE.PlaneGeometry | null = null;
    let shadowMat: THREE.MeshBasicMaterial | null = null;

    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (cancelled) {
          gltf.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry?.dispose();
            }
          });
          return;
        }

        const model = gltf.scene;
        model.updateMatrixWorld(true);

        const rawBox = new THREE.Box3().setFromObject(model);
        const rawSize = new THREE.Vector3();
        rawBox.getSize(rawSize);
        const normScale = rawSize.x > 0 ? 0.36 / rawSize.x : 1;

        model.scale.setScalar(normScale);
        model.updateMatrixWorld(true);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);

        model.position.set(
          -scaledCenter.x,
          -scaledBox.min.y,
          -scaledCenter.z
        );

        const wrapper = new THREE.Group();
        wrapper.name = "NormalizedHeroLaptop";
        wrapper.add(model);

        const lidNode = model.getObjectByName("lid");
        if (lidNode) {
          lidNodeRef.current = lidNode;
          baseLidRotXRef.current = lidNode.rotation.x;

          const screenObj = lidNode.getObjectByName("screen");
          const screenX = screenObj ? screenObj.position.x : 0;
          const screenY = screenObj ? screenObj.position.y - 0.0007 : -0.0004;
          const screenZ = screenObj ? screenObj.position.z : 0.1195;

          displayPlaneGeo = new THREE.PlaneGeometry(0.295, 0.186);
          displayPlaneMat = new THREE.MeshBasicMaterial({
            map: initialScreen === "about" ? aboutTexture : deskTexture,
            toneMapped: false,
          });
          displayPlaneMatRef.current = displayPlaneMat;
          const displayPlane = new THREE.Mesh(displayPlaneGeo, displayPlaneMat);
          displayPlane.name = "LaptopDisplaySurface";
          displayPlane.position.set(screenX, screenY, screenZ);
          displayPlane.rotation.set(Math.PI / 2, 0, 0);
          lidNode.add(displayPlane);
        }

        shadowGeo = new THREE.PlaneGeometry(0.4, 0.28);
        shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
        });
        const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.set(0, -0.001, 0);
        wrapper.add(shadowPlane);

        shadowMatRef.current = shadowMat;
        loadedWrapper = wrapper;
        mountGroup.add(wrapper);
      },
      undefined,
      (err) => {
        if (!cancelled) {
          console.error("Failed to load laptop-v1-lod0.glb:", err);
        }
      }
    );

    return () => {
      cancelled = true;
      if (loadedWrapper) {
        mountGroup.remove(loadedWrapper);
        loadedWrapper.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material?.dispose();
            }
          }
        });
      }
      lidNodeRef.current = null;
      shadowMatRef.current = null;
      displayPlaneMatRef.current = null;
      deskTextureRef.current = null;
      aboutTextureRef.current = null;
      deskTexture.dispose();
      aboutTexture.dispose();
      shadowTex?.dispose();
      displayPlaneGeo?.dispose();
      displayPlaneMat?.dispose();
      shadowGeo?.dispose();
      shadowMat?.dispose();
      ktx2Loader.dispose();
    };
  }, [gl, reducedMotion]);

  useFrame((state, delta) => {
    const p = reducedMotion ? 0.85 : progressRef.current;

    // 4 Continuous Scroll Beats:
    // 0.00 - 0.24: Laptop sits flat on the black desk mat (rotX = 0, rotZ = 0, rotY = -0.44)
    // 0.24 - 0.50: Camera zooms smoothly toward laptop on desk
    // 0.50 - 0.78: Laptop pops off desk, performs full 360° spin & expands LARGE & CENTERED for About Me
    // 0.78 - 1.00: Holds big, full-screen About Me right on the laptop display + interactive 360° drag
    const zoomT = THREE.MathUtils.clamp((p - 0.24) / 0.26, 0, 1);
    const easeZoom = zoomT * zoomT * (3 - 2 * zoomT);

    const popT = THREE.MathUtils.clamp((p - 0.5) / 0.28, 0, 1);
    const easePop = 1 - Math.pow(1 - popT, 3);
    const popArc = Math.sin(popT * Math.PI);

    // Desk seat -> centered zoom -> centered BIG display for About Me
    const deskX = 0.036;
    const zoomX = 0.0;
    const aboutX = 0.0;
    const targetX =
      p < 0.5
        ? THREE.MathUtils.lerp(deskX, zoomX, easeZoom)
        : THREE.MathUtils.lerp(zoomX, aboutX, easePop);

    const deskY = -0.168;
    const zoomY = -0.075;
    const aboutY = -0.218;
    const hoverFloat =
      p >= 0.74 && !reducedMotion
        ? Math.sin(state.clock.elapsedTime * 0.75) * 0.003
        : 0;
    const targetY =
      (p < 0.5
        ? THREE.MathUtils.lerp(deskY, zoomY, easeZoom)
        : THREE.MathUtils.lerp(zoomY, aboutY, easePop)) + hoverFloat;

    const targetZ = p < 0.5 ? 0 : popArc * 0.09;

    const deskScale = 0.54;
    const zoomScale = 0.88;
    const aboutScale = 1.66;
    const targetScale =
      p < 0.5
        ? THREE.MathUtils.lerp(deskScale, zoomScale, easeZoom)
        : THREE.MathUtils.lerp(zoomScale, aboutScale, easePop);

    // Clear user drag offset when scrolled back to Hero/Desk
    if (
      p < 0.5 &&
      (userOrbitRef.current.rotY !== 0 || userOrbitRef.current.rotX !== 0)
    ) {
      userOrbitRef.current.rotY = 0;
      userOrbitRef.current.rotX = 0;
    }
    const userY = p >= 0.68 ? userOrbitRef.current.rotY : 0;
    const userX = p >= 0.68 ? userOrbitRef.current.rotX : 0;

    // 360° turntable spin landing straight facing viewer (Math.PI * 2) in Beat 4
    const deskRotY = -0.44;
    const zoomRotY = 0.28;
    const aboutRotY = Math.PI * 2;

    const targetRotY =
      (p < 0.5
        ? THREE.MathUtils.lerp(deskRotY, zoomRotY, easeZoom)
        : THREE.MathUtils.lerp(zoomRotY, aboutRotY, easePop)) + userY;

    const targetRotX =
      (p < 0.5
        ? THREE.MathUtils.lerp(0.0, 0.03, easeZoom)
        : THREE.MathUtils.lerp(0.03, 0.02, easePop) + popArc * 0.2) + userX;

    const targetRotZ = p < 0.5 ? 0 : popArc * 0.08;

    const damp = 1 - Math.exp(-16 * Math.min(delta, 0.05));

    if (rootGroupRef.current) {
      rootGroupRef.current.position.x = THREE.MathUtils.lerp(
        rootGroupRef.current.position.x,
        targetX,
        damp
      );
      rootGroupRef.current.position.y = THREE.MathUtils.lerp(
        rootGroupRef.current.position.y,
        targetY,
        damp
      );
      rootGroupRef.current.position.z = THREE.MathUtils.lerp(
        rootGroupRef.current.position.z,
        targetZ,
        damp
      );

      const nextS = THREE.MathUtils.lerp(
        rootGroupRef.current.scale.x,
        targetScale,
        damp
      );
      rootGroupRef.current.scale.setScalar(nextS);

      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        damp
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        damp
      );
      rootGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.z,
        targetRotZ,
        damp
      );
    }

    // Open lid slightly upright in Beat 4 so the entire About Me screen faces cleanly forward
    if (lidNodeRef.current) {
      const targetLidX =
        p < 0.5
          ? baseLidRotXRef.current + THREE.MathUtils.lerp(0.08, -0.02, easeZoom)
          : baseLidRotXRef.current + THREE.MathUtils.lerp(-0.02, 0.14, easePop);
      lidNodeRef.current.rotation.x = THREE.MathUtils.lerp(
        lidNodeRef.current.rotation.x,
        targetLidX,
        damp
      );
    }

    if (shadowMatRef.current) {
      shadowMatRef.current.opacity =
        p < 0.48 ? 0.65 : Math.max(0, 0.65 * (1 - (p - 0.48) / 0.14));
    }

    if (screenGlowLightRef.current) {
      screenGlowLightRef.current.intensity = THREE.MathUtils.lerp(
        0.55,
        1.5,
        easeZoom
      );
    }

    // Smoothly zoom camera closely as the giant laptop settles in Beat 4 (keeping clear of Navbar!)
    const targetCamZ = THREE.MathUtils.lerp(0.86, 0.56, easePop);
    const targetCamY = THREE.MathUtils.lerp(0.0, 0.045, easePop);
    const activeCamera = state.camera;
    activeCamera.position.set(
      0,
      THREE.MathUtils.lerp(activeCamera.position.y, targetCamY, damp),
      THREE.MathUtils.lerp(activeCamera.position.z, targetCamZ, damp)
    );
    activeCamera.lookAt(0, targetCamY, 0);

    const nextScreen: "desk" | "about" = p >= 0.54 ? "about" : "desk";
    if (nextScreen !== activeScreenRef.current && displayPlaneMatRef.current) {
      const nextTex =
        nextScreen === "about"
          ? aboutTextureRef.current
          : deskTextureRef.current;
      if (nextTex) {
        displayPlaneMatRef.current.map = nextTex;
        displayPlaneMatRef.current.needsUpdate = true;
        activeScreenRef.current = nextScreen;
      }
    }
  });

  return (
    <group
      ref={rootGroupRef}
      position={[0.036, -0.168, 0]}
      scale={0.54}
      rotation={[0, -0.44, 0]}
    >
      <pointLight
        ref={screenGlowLightRef}
        position={[0, 0.14, -0.05]}
        color="#f5d5a7"
        intensity={0.75}
        distance={0.9}
        decay={2}
      />
    </group>
  );
}
