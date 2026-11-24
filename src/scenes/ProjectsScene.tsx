"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCategoryFilter } from "@/components/projects/ProjectCategoryFilter";
import { ProjectDetailsModal } from "@/components/projects/ProjectDetailsModal";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ViewAllProjectsButton } from "@/components/projects/ViewAllProjectsButton";
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  type ProjectCategoryId,
  type ProjectItem,
} from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProjectsScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategoryId>("all");
  const [expandedAll, setExpandedAll] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".proj-reveal", { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".proj-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
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

  const activeCategoryMeta = useMemo(
    () =>
      PROJECT_CATEGORIES.find((cat) => cat.id === activeCategory) ??
      PROJECT_CATEGORIES[0],
    [activeCategory]
  );

  const matchingProjects = useMemo(() => {
    if (!activeCategoryMeta.matchCategory) {
      return PROJECTS;
    }
    return PROJECTS.filter((project) =>
      project.category.includes(activeCategoryMeta.matchCategory!)
    );
  }, [activeCategoryMeta]);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "all" && !expandedAll) {
      return matchingProjects.filter((p) => p.featured).slice(0, 6);
    }
    return matchingProjects;
  }, [activeCategory, expandedAll, matchingProjects]);

  const handleSelectCategory = (id: ProjectCategoryId) => {
    setActiveCategory(id);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-[#14100E] pt-28 pb-24 sm:pt-32 sm:pb-28 px-5 sm:px-10 lg:px-14"
    >
      {/* Supplied Wooden Room Archive Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/illustrations/projects-archive-bg.jpg')",
        }}
      />

      {/* Balanced Dark Scrim keeping Shelves/Plants/Lamp Visible & Center High-Contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 44%, rgba(20, 15, 12, 0.54) 0%, rgba(16, 12, 10, 0.68) 72%, rgba(18, 15, 14, 0.88) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-[#14100E] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-midnight to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <ProjectsHeader totalCount={PROJECTS.length} />

        <ProjectCategoryFilter
          categories={PROJECT_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Dynamic Result Status for Filtered Views */}
        {activeCategory !== "all" && (
          <p
            aria-live="polite"
            className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-amber/90"
          >
            Showing {visibleProjects.length}{" "}
            {visibleProjects.length === 1 ? "project" : "projects"} in{" "}
            {activeCategoryMeta.label}
          </p>
        )}

        {/* 3-Column Desktop / 2-Column Tablet / 1-Column Mobile Wooden Card Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${expandedAll ? "all" : "featured"}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="proj-reveal mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {visibleProjects.map((project) => (
              <div key={project.id} className="flex">
                <ProjectCard
                  project={project}
                  onSelect={setSelectedProject}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Expand / Collapse All 16 Projects when viewing All Projects */}
        {activeCategory === "all" && matchingProjects.length > 6 && (
          <ViewAllProjectsButton
            expanded={expandedAll}
            totalCount={matchingProjects.length}
            onToggle={() => setExpandedAll((prev) => !prev)}
          />
        )}
      </div>

      {/* Centered Project Details Dossier Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        reducedMotion={prefersReducedMotion}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
