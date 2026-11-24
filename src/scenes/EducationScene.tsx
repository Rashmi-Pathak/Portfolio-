"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, GraduationCap, Milestone } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { EDUCATION_MILESTONES } from "@/data/education";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function EducationScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".edu-timeline-line", ".edu-item"], {
          clearProps: "all",
          opacity: 1,
          scaleY: 1,
          y: 0,
        });
        return;
      }

      // Draw timeline line smoothly as user scrolls
      gsap.fromTo(
        ".edu-timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".edu-timeline-container",
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        ".edu-item",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-timeline-container",
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

  return (
    <section
      ref={sectionRef}
      id="education"
      aria-labelledby="education-heading"
      className="relative overflow-hidden border-t border-warm-cream/10 bg-midnight py-24 sm:py-32 px-6 sm:px-10 lg:px-14"
    >
      <div className="relative z-10 mx-auto max-w-[1160px]">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
            12 // Education &amp; Milestones
          </p>
          <h2
            id="education-heading"
            className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
          >
            THE ACADEMIC JOURNEY
          </h2>
          <p className="mt-4 text-base leading-relaxed text-warm-cream/80">
            Grounded in Information Technology engineering fundamentals—with
            editable slots reserved exclusively for verified institutional and
            certification details.
          </p>
        </div>

        {/* Scroll-Drawn Timeline */}
        <div className="edu-timeline-container relative mt-14 pl-8 sm:pl-12">
          {/* Static background track */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-3 sm:left-4 w-px bg-warm-cream/15"
          />
          {/* Animated gold/amber progress line */}
          <div
            aria-hidden="true"
            className="edu-timeline-line absolute top-2 bottom-2 left-3 sm:left-4 w-[2px] origin-top bg-gradient-to-b from-amber via-muted-sage to-soft-gold will-change-transform"
          />

          <ol className="space-y-8">
            {EDUCATION_MILESTONES.map((item, idx) => {
              const Icon =
                idx === 0
                  ? GraduationCap
                  : idx === 1
                  ? Milestone
                  : Award;

              return (
                <li key={item.id} className="edu-item relative">
                  {/* Timeline Node Marker */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[29px] sm:-left-[41px] top-6 flex h-7 w-7 items-center justify-center rounded-full border ${
                      item.isPlaceholder
                        ? "border-warm-cream/25 bg-graphite text-warm-mauve"
                        : "border-amber bg-midnight text-amber shadow-[0_0_16px_rgba(214,161,91,0.45)]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>

                  <article
                    className={`rounded-2xl border p-6 sm:p-7 ${
                      item.isPlaceholder
                        ? "border-dashed border-warm-cream/20 bg-graphite/40"
                        : "border-amber/30 bg-graphite/75 shadow-xl"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-amber">
                        {item.period}
                      </span>
                      {item.isPlaceholder && (
                        <span className="rounded border border-warm-cream/15 bg-midnight/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warm-mauve">
                          Editable Placeholder
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-bold text-off-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-sage">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-warm-cream/85">
                      {item.details}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
