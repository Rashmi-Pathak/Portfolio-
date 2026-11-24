"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { JourneyCategoryFilter } from "@/components/journey/JourneyCategoryFilter";
import { JourneyFooter } from "@/components/journey/JourneyFooter";
import { JourneyHeader } from "@/components/journey/JourneyHeader";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { MilestoneDetailsModal } from "@/components/journey/MilestoneDetailsModal";
import {
  JOURNEY_MILESTONES,
  type JourneyFilterId,
  type JourneyMilestone,
} from "@/data/journeyData";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] = useState<JourneyFilterId>("all");
  const [selectedMilestone, setSelectedMilestone] =
    useState<JourneyMilestone | null>(null);

  const filteredMilestones = useMemo(() => {
    if (activeFilter === "all") {
      return JOURNEY_MILESTONES;
    }
    return JOURNEY_MILESTONES.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || reducedMotion) return;

    const ScrollTrigger = ensureScrollTriggerRegistered();
    if (!ScrollTrigger) return;

    const ctx = gsap.context(() => {
      const spine = sectionEl.querySelector(".journey-spine-glow");
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0.12 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 65%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          },
        );
      }

      const rows = sectionEl.querySelectorAll(".journey-row");
      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 72%",
              once: true,
            },
          },
        );
      }
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-[#14100E] pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      {/* Wooden Room Continuation Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
        style={{
          backgroundImage: "url('/assets/illustrations/projects-archive-bg.jpg')",
        }}
      />

      {/* Warm Dark Overlay & Seamless Section Edge Blends */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#14100E] via-[#1A130F]/72 to-[#171A1C]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,161,91,0.08)_0%,rgba(20,16,14,0.65)_72%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <JourneyHeader />

        <JourneyCategoryFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <JourneyTimeline
          milestones={filteredMilestones}
          onSelectMilestone={setSelectedMilestone}
        />

        <JourneyFooter />
      </div>

      <MilestoneDetailsModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </section>
  );
}
