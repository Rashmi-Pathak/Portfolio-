"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectItem } from "@/data/projects";
import { ProjectThumbnail } from "./ProjectThumbnail";

interface ProjectScreenshotGalleryProps {
  project: ProjectItem;
}

export function ProjectScreenshotGallery({
  project,
}: ProjectScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenshots = project.screenshots;
  const hasMultiple = screenshots.length > 1;
  const currentSrc = screenshots[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-amber/30 bg-[#0D1013] shadow-[inset_0_2px_12px_rgba(0,0,0,0.65)]">
        {currentSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSrc}
              alt={`${project.name} screenshot ${activeIndex + 1} of ${screenshots.length}`}
              className="h-full w-full object-cover object-center"
            />

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0 ? screenshots.length - 1 : prev - 1
                    )
                  }
                  aria-label="Previous screenshot"
                  className="absolute top-1/2 left-2.5 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-cream/25 bg-midnight/85 text-off-white backdrop-blur-sm transition-colors hover:border-amber hover:text-amber"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % screenshots.length)
                  }
                  aria-label="Next screenshot"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-cream/25 bg-midnight/85 text-off-white backdrop-blur-sm transition-colors hover:border-amber hover:text-amber"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </>
            )}
          </>
        ) : (
          <ProjectThumbnail project={project} />
        )}
      </div>

      {hasMultiple && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {screenshots.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${project.name} screenshot ${index + 1}`}
                aria-pressed={isActive}
                className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition-all ${
                  isActive
                    ? "border-amber ring-2 ring-amber/35"
                    : "border-warm-cream/15 opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
