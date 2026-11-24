"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, Calendar, CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

import type { JourneyMilestone } from "@/data/journeyData";

import { TimelineIllustration } from "./TimelineIllustration";

interface MilestoneDetailsModalProps {
  milestone: JourneyMilestone | null;
  onClose: () => void;
}

export function MilestoneDetailsModal({
  milestone,
  onClose,
}: MilestoneDetailsModalProps) {
  useEffect(() => {
    if (!milestone) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [milestone, onClose]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          key="journey-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="journey-modal-title"
        >
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-2xl flex-col rounded-2xl border border-[#8C6245]/70 bg-gradient-to-b from-[#6A452D] via-[#4D3220] to-[#3B2517] p-[6px] shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
          >
            <div className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-[#D6A15B]/25 bg-gradient-to-b from-[#1D1815] to-[#120F0D]">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#8C6245]/35 px-5 py-4 sm:px-6 sm:py-5">
                <div className="min-w-0">
                  <span className="inline-block rounded-full border border-[#8C6245]/65 bg-[#241B15] px-3 py-0.5 font-mono text-[10px] tracking-[0.18em] text-[#D6A15B] uppercase">
                    {milestone.badgeLabel}
                  </span>
                  <h3
                    id="journey-modal-title"
                    className="mt-2 font-serif text-xl font-semibold tracking-wide text-[#F5F1E9] sm:text-2xl"
                  >
                    {milestone.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-xs tracking-[0.12em] text-[#D6A15B] uppercase">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {milestone.organization}
                    </span>
                    {milestone.dateLabel && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {milestone.dateLabel}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close milestone details"
                  className="shrink-0 cursor-pointer rounded-full border border-[#8C6245]/55 bg-[#241B15] p-2 text-[#F0E7D9]/80 transition-colors hover:border-[#D6A15B] hover:text-[#F5F1E9] focus-visible:outline-2 focus-visible:outline-[#D6A15B]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div
                data-lenis-prevent="true"
                className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <TimelineIllustration type={milestone.illustration} size="md" />
                  <p className="text-sm leading-relaxed text-[#F0E7D9]/90 sm:text-base">
                    {milestone.fullDescription}
                  </p>
                </div>

                {milestone.illustration === "certificate" && (
                  <div className="rounded-xl border border-[#8C6245]/60 bg-gradient-to-b from-[#EADAC2] via-[#E1CCA9] to-[#D2B68C] p-5 text-[#251A13] shadow-[inset_0_0_0_2px_rgba(105,72,50,0.28)]">
                    <div className="border border-[#694832]/45 p-4 text-center">
                      <div className="font-mono text-[10px] tracking-[0.24em] text-[#694832] uppercase">
                        VERIFIED TRAINING CREDENTIAL
                      </div>
                      <div className="mt-1.5 font-serif text-xl font-bold tracking-wide text-[#1D140E]">
                        {milestone.title}
                      </div>
                      <p className="mt-1.5 text-xs text-[#453125]">
                        {milestone.shortSummary}
                      </p>
                    </div>
                  </div>
                )}

                {milestone.highlights.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-mono text-xs tracking-[0.18em] text-[#D6A15B] uppercase">
                      KEY HIGHLIGHTS
                    </h4>
                    <ul className="space-y-2.5">
                      {milestone.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[#F0E7D9]/85"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A15B]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {milestone.tags.length > 0 && (
                  <div>
                    <h4 className="mb-2.5 font-mono text-xs tracking-[0.18em] text-[#D6A15B] uppercase">
                      SKILLS &amp; FOCUS AREAS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#8C6245]/55 bg-[#241B15] px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-[#E6C79C] uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
