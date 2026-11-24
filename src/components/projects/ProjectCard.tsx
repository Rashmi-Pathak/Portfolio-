"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import type { ProjectItem } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProjectTechnologyTags } from "./ProjectTechnologyTags";
import { ProjectThumbnail } from "./ProjectThumbnail";

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const displayTags = project.category.slice(0, 2);
  const extraTag =
    displayTags.length < 3 && project.technologies[0]
      ? project.technologies[0]
      : null;
  const cardTags = extraTag ? [...displayTags, extraTag] : displayTags;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / Math.max(1, rect.width);
    const py = (event.clientY - rect.top) / Math.max(1, rect.height);

    // Tilt smoothly in any direction toward cursor edge (±8deg)
    const rotateY = (px - 0.5) * 16;
    const rotateX = (0.5 - py) * 14;

    el.style.transform = `perspective(1050px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;

    if (sheenRef.current) {
      sheenRef.current.style.opacity = "1";
      sheenRef.current.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(229, 181, 107, 0.2), transparent 58%)`;
    }
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (el) {
      el.style.transform =
        "perspective(1050px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
    }
    if (sheenRef.current) {
      sheenRef.current.style.opacity = "0";
    }
  };

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect(project)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform:
          "perspective(1050px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
        transformStyle: "preserve-3d",
      }}
      className="group relative flex w-full cursor-pointer flex-col rounded-2xl border border-[#8C6245]/55 bg-gradient-to-br from-[#6A452D] via-[#4D3220] to-[#3B2517] p-[9px] shadow-[0_18px_40px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,224,185,0.22)] transition-[transform,border-color,box-shadow] duration-200 ease-out will-change-transform hover:border-amber/75 hover:shadow-[0_28px_58px_rgba(0,0,0,0.68),0_0_28px_rgba(214,161,91,0.22)]"
    >
      {/* Dynamic Pointer-Following Warm Amber Sheen */}
      <div
        ref={sheenRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-2xl opacity-0 transition-opacity duration-200"
      />

      {/* Featured Corner Pill */}
      {project.featuredLabel && (
        <span className="pointer-events-none absolute -top-2.5 right-4 z-30 inline-flex items-center gap-1 rounded-md border border-[#F4C983]/50 bg-gradient-to-r from-[#E2B26B] to-[#C88E42] px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.14em] text-[#171A1C] shadow-md">
          <span>{project.featuredLabel}</span>
          <Star className="h-2.5 w-2.5 fill-[#171A1C]" aria-hidden="true" />
        </span>
      )}

      {/* Full-Card Clickable Trigger Overlay */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect(project);
        }}
        aria-label={`Open ${project.name} project details`}
        className="absolute inset-0 z-20 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-amber"
      />

      {/* Inner Deep Charcoal / Espresso Technical Panel */}
      <div className="relative flex flex-1 flex-col sm:flex-row items-stretch gap-3.5 rounded-xl border border-amber/25 bg-gradient-to-br from-[#1C1613] via-[#171310] to-[#120F0D] p-3.5 transition-colors duration-300 group-hover:border-amber/55">
        {/* Left Project Preview Frame */}
        <div className="relative h-36 w-full sm:h-auto sm:w-[44%] shrink-0 overflow-hidden rounded-lg border border-warm-cream/15 bg-[#0D1013] shadow-[inset_0_1px_6px_rgba(0,0,0,0.6)]">
          <ProjectThumbnail project={project} />
        </div>

        {/* Right Project Summary & Actions */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-off-white transition-colors group-hover:text-amber truncate">
                {project.name}
              </h3>

              <div className="relative z-30 flex shrink-0 items-center gap-1.5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`Open ${project.name} GitHub repository`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-warm-cream/15 bg-[#261D17] text-warm-cream/85 transition-colors hover:border-amber hover:text-amber"
                >
                  <GitHubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    aria-label={`Open ${project.name} live website`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-warm-cream/15 bg-[#261D17] text-warm-cream/85 transition-colors hover:border-amber hover:text-amber"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-1.5 text-xs leading-relaxed text-warm-cream/75 line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex items-end justify-between gap-2 pt-1">
            <ProjectTechnologyTags items={cardTags} variant="compact" />

            <span
              aria-hidden="true"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber/55 bg-[#231912] text-amber transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-amber group-hover:bg-amber group-hover:text-[#171A1C]"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
