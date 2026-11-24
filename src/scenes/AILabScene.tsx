"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Play, Sparkles } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { SKILL_CATEGORIES } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AI_SKILLS = SKILL_CATEGORIES.find((c) => c.id === "ai-ml")?.items ?? [];

interface NetworkLayer {
  id: number;
  name: string;
  nodes: readonly { id: string; y: number; label?: string }[];
}

const LAYERS: readonly NetworkLayer[] = [
  {
    id: 0,
    name: "Inputs",
    nodes: [
      { id: "in-1", y: 70, label: "x₁" },
      { id: "in-2", y: 150, label: "x₂" },
      { id: "in-3", y: 230, label: "x₃" },
    ],
  },
  {
    id: 1,
    name: "Hidden 1",
    nodes: [
      { id: "h1-1", y: 50 },
      { id: "h1-2", y: 115 },
      { id: "h1-3", y: 185 },
      { id: "h1-4", y: 250 },
    ],
  },
  {
    id: 2,
    name: "Hidden 2",
    nodes: [
      { id: "h2-1", y: 50 },
      { id: "h2-2", y: 115 },
      { id: "h2-3", y: 185 },
      { id: "h2-4", y: 250 },
    ],
  },
  {
    id: 3,
    name: "Output",
    nodes: [
      { id: "out-1", y: 105, label: "ŷ₀" },
      { id: "out-2", y: 195, label: "ŷ₁" },
    ],
  },
];

const LAYER_X = [90, 260, 440, 610] as const;

const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Data Preparation",
    detail: "Cleaning records & inspecting distributions with Pandas & NumPy.",
  },
  {
    step: "02",
    title: "Feature Engineering",
    detail: "Encoding domain signals and normalizing feature scales.",
  },
  {
    step: "03",
    title: "Model Training",
    detail: "Fitting supervised & classification baselines via Scikit-learn.",
  },
  {
    step: "04",
    title: "Evaluation & Plots",
    detail: "Visualizing feature behavior and predictions in Matplotlib.",
  },
] as const;

export function AILabScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState<number>(3);
  const [signalStrength, setSignalStrength] = useState<number>(0.72);
  const [isPulsing, setIsPulsing] = useState(false);

  const runForwardPass = () => {
    if (prefersReducedMotion) {
      setActiveLayer(3);
      return;
    }
    setIsPulsing(true);
    setActiveLayer(0);
  };

  useEffect(() => {
    if (!isPulsing) return;
    if (activeLayer >= 3) {
      const doneTimer = window.setTimeout(() => setIsPulsing(false), 350);
      return () => window.clearTimeout(doneTimer);
    }
    const stepTimer = window.setTimeout(() => {
      setActiveLayer((prev) => prev + 1);
    }, 340);
    return () => window.clearTimeout(stepTimer);
  }, [isPulsing, activeLayer]);

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".ai-reveal", { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".ai-reveal",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const classAScore = Math.round(signalStrength * 100);
  const classBScore = 100 - classAScore;

  return (
    <section
      ref={sectionRef}
      id="ai-lab"
      aria-labelledby="ai-heading"
      className="relative overflow-hidden border-t border-warm-cream/10 bg-[#121517] py-24 sm:py-32 px-6 sm:px-10 lg:px-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 75% 32%, rgba(214,161,91,0.11) 0%, transparent 48%), radial-gradient(circle at 20% 72%, rgba(165,141,145,0.1) 0%, transparent 45%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT: Thinking Illustration (radially feathered so black bg dissolves cleanly) + Pipeline */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="ai-reveal font-mono text-xs tracking-[0.2em] uppercase text-amber">
                09 // The AI / ML Laboratory
              </p>
              <h2
                id="ai-heading"
                className="ai-reveal mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
              >
                EXPERIMENTS IN INTELLIGENCE
              </h2>
              <p className="ai-reveal mt-4 text-base leading-relaxed text-warm-cream/85">
                Exploring machine learning workflows, feature representations,
                and predictive modeling in Python—turning raw datasets into
                interpretable signals.
              </p>
            </div>

            {/* Character Thinking Portrait seamlessly blended on dark backdrop */}
            <div className="ai-reveal flex justify-center lg:justify-start">
              <div
                className="relative w-full max-w-[330px] overflow-hidden rounded-2xl bg-[#000000]"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 84% 84% at 50% 48%, black 56%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 84% 84% at 50% 48%, black 56%, transparent 100%)",
                }}
              >
                <div className="relative aspect-[1024/935] w-full">
                  <Image
                    src="/assets/character/character-thinking.jpg"
                    alt="Illustration of Rashmi Pathak thinking at her desk with a glowing lightbulb idea bubble"
                    width={1024}
                    height={935}
                    loading="eager"
                    sizes="330px"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Skill Badges */}
            <ul className="ai-reveal flex flex-wrap gap-2">
              {AI_SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-amber/25 bg-graphite/80 px-3 py-1.5 font-mono text-xs text-warm-cream/90"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Interactive SVG Neural Network + ML Pipeline */}
          <div className="ai-reveal lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-warm-cream/15 bg-graphite/65 p-5 sm:p-7 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-warm-cream/10 pb-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
                    Interactive Forward Pass Simulation
                  </p>
                  <p className="mt-0.5 text-xs text-warm-cream/70">
                    Conceptual 3 → 4 → 4 → 2 network visualization (illustrative
                    weights, not a benchmark score)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={runForwardPass}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-amber px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-midnight transition-colors hover:bg-soft-gold"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Run Forward Pass</span>
                </button>
              </div>

              {/* Neural Network SVG */}
              <div className="mt-4 overflow-hidden rounded-xl border border-warm-cream/10 bg-midnight/85 p-3">
                <svg
                  role="img"
                  aria-label="Interactive multi-layer neural network diagram showing input, two hidden layers, and output nodes"
                  viewBox="0 0 700 300"
                  className="w-full h-auto"
                >
                  {/* Connections */}
                  {LAYERS.slice(0, -1).map((layer, lIdx) => {
                    const nextLayer = LAYERS[lIdx + 1];
                    const isEdgeActive = activeLayer > lIdx;
                    return layer.nodes.map((srcNode) =>
                      nextLayer.nodes.map((dstNode) => (
                        <line
                          key={`${srcNode.id}-${dstNode.id}`}
                          x1={LAYER_X[lIdx]}
                          y1={srcNode.y}
                          x2={LAYER_X[lIdx + 1]}
                          y2={dstNode.y}
                          stroke={
                            isEdgeActive
                              ? `rgba(214, 161, 91, ${0.2 + signalStrength * 0.45})`
                              : "rgba(145, 165, 141, 0.16)"
                          }
                          strokeWidth={isEdgeActive ? 1.8 : 1}
                        />
                      ))
                    );
                  })}

                  {/* Nodes */}
                  {LAYERS.map((layer, lIdx) => {
                    const isNodeActive = activeLayer >= lIdx;
                    return (
                      <g key={layer.id}>
                        <text
                          x={LAYER_X[lIdx]}
                          y={22}
                          textAnchor="middle"
                          fill="#91A58D"
                          fontSize="11"
                          fontFamily="monospace"
                        >
                          {layer.name}
                        </text>

                        {layer.nodes.map((node) => (
                          <g key={node.id}>
                            <circle
                              cx={LAYER_X[lIdx]}
                              cy={node.y}
                              r={16}
                              fill={isNodeActive ? "#25292B" : "#171A1C"}
                              stroke={isNodeActive ? "#D6A15B" : "#3F6049"}
                              strokeWidth={isNodeActive ? 2.5 : 1.5}
                            />
                            {node.label && (
                              <text
                                x={LAYER_X[lIdx]}
                                y={node.y + 4}
                                textAnchor="middle"
                                fill="#F5F1E9"
                                fontSize="12"
                                fontFamily="monospace"
                              >
                                {node.label}
                              </text>
                            )}
                          </g>
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Interactive Input Feature Signal Slider & Output Split */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 items-center rounded-xl border border-warm-cream/10 bg-midnight/75 p-4">
                <div>
                  <label
                    htmlFor="ai-signal-slider"
                    className="flex items-center justify-between font-mono text-xs text-warm-cream/85"
                  >
                    <span>Input Feature Signal</span>
                    <span className="text-amber">{signalStrength.toFixed(2)}</span>
                  </label>
                  <input
                    id="ai-signal-slider"
                    type="range"
                    min={0.1}
                    max={0.95}
                    step={0.05}
                    value={signalStrength}
                    onChange={(e) => {
                      setSignalStrength(Number(e.target.value));
                      setActiveLayer(3);
                    }}
                    className="mt-2.5 h-2 w-full cursor-pointer accent-amber"
                  />
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-sage">Output Node ŷ₀</span>
                    <span className="text-off-white">{classAScore}% weight</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-graphite">
                    <div
                      style={{ width: `${classAScore}%` }}
                      className="h-full rounded-full bg-amber transition-[width] duration-200"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-muted-sage">Output Node ŷ₁</span>
                    <span className="text-warm-cream/80">{classBScore}% weight</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Step ML Pipeline */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PIPELINE_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-warm-cream/12 bg-graphite/55 p-4"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-amber">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Stage {item.step}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-off-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-warm-cream/75">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
