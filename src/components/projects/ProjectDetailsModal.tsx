"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Server, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import type { ProjectItem } from "@/data/projects";
import { ProjectScreenshotGallery } from "./ProjectScreenshotGallery";
import { ProjectTechnologyTags } from "./ProjectTechnologyTags";

interface ProjectDetailsModalProps {
  project: ProjectItem | null;
  reducedMotion: boolean;
  onClose: () => void;
}

export function ProjectDetailsModal({
  project,
  reducedMotion,
  onClose,
}: ProjectDetailsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          data-lenis-prevent="true"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/85 p-0 sm:p-6 backdrop-blur-md"
        >
          <motion.div
            data-lenis-prevent="true"
            initial={
              reducedMotion ? false : { opacity: 0, scale: 0.96, y: 14 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reducedMotion
                ? undefined
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex h-full w-full sm:h-[min(88vh,860px)] sm:max-w-5xl flex-col overflow-hidden sm:rounded-2xl border border-[#8C6245]/60 bg-gradient-to-br from-[#5E3E29] via-[#452C1D] to-[#321F14] p-2 sm:p-2.5 shadow-[0_32px_90px_rgba(0,0,0,0.75)]"
          >
            {/* Inner Scrollable Deep Charcoal Dossier Container (data-lenis-prevent allows native mouse/trackpad wheel scroll) */}
            <div
              data-lenis-prevent="true"
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain sm:rounded-xl border border-amber/35 bg-gradient-to-b from-[#1A1512] to-[#120F0D] p-5 sm:p-7"
            >
              {/* Top Dossier Header with Primary Action Links Immediately Visible */}
              <div className="flex flex-col gap-4 border-b border-warm-cream/12 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
                      PROJECT {project.number} / SYSTEM DOSSIER
                    </p>
                    <h3
                      id="project-modal-title"
                      className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-off-white"
                    >
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-warm-cream/80">
                      {project.shortDescription}
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close project details"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-warm-cream/20 bg-[#241A14] text-warm-cream transition-colors hover:border-amber hover:text-amber"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Primary Links Bar right at the top */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-warm-cream/25 bg-[#241A14] px-3.5 py-2 text-xs sm:text-sm font-medium text-off-white transition-colors hover:border-amber hover:text-amber"
                  >
                    <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-amber px-4 py-2 text-xs sm:text-sm font-semibold text-[#171A1C] shadow-[0_6px_18px_rgba(214,161,91,0.28)] transition-colors hover:bg-soft-gold"
                    >
                      <span>Live Website</span>
                      <ArrowUpRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  )}

                  {project.apiUrl && (
                    <a
                      href={project.apiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-muted-sage/40 bg-forest-green/25 px-3.5 py-2 text-xs sm:text-sm font-medium text-warm-cream transition-colors hover:border-amber hover:text-amber"
                    >
                      <Server className="h-4 w-4" aria-hidden="true" />
                      <span>API Endpoint</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </div>

              {/* Main 2-Column Dossier Content */}
              <div className="mt-6 grid grid-cols-1 gap-7 lg:grid-cols-12">
                {/* LEFT: Screenshot Gallery + Categories */}
                <div className="lg:col-span-6 space-y-4">
                  <ProjectScreenshotGallery
                    key={project.id}
                    project={project}
                  />

                  <div className="rounded-xl border border-warm-cream/10 bg-[#1B1511]/90 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-sage">
                      CATEGORIES
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.category.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full border border-amber/35 bg-amber/10 px-3 py-1 font-mono text-[11px] text-amber"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Overview, Features, Tech Stack */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">
                      OVERVIEW
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-warm-cream/90">
                      {project.fullDescription}
                    </p>
                    {project.contributionNote && (
                      <p className="mt-2.5 rounded-lg border border-muted-sage/30 bg-forest-green/15 px-3 py-2 text-xs leading-relaxed text-warm-cream/85">
                        {project.contributionNote}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-sage">
                      KEY FEATURES
                    </h4>
                    <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs leading-relaxed text-warm-cream/85"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-mauve">
                      TECH STACK
                    </h4>
                    <div className="mt-2.5">
                      <ProjectTechnologyTags
                        items={project.technologies}
                        variant="full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
