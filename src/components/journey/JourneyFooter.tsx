"use client";

import { ChevronDown } from "lucide-react";

export function JourneyFooter() {
  return (
    <div className="mt-14 flex flex-col items-center gap-4">
      <div className="flex w-full max-w-xl items-center gap-4">
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D6A15B]/55 to-[#D6A15B]/80"
        />
        <span className="font-mono text-[11px] tracking-[0.26em] whitespace-nowrap text-[#F0E7D9]/80 uppercase">
          A CONTINUOUS WORK IN PROGRESS
        </span>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D6A15B]/55 to-[#D6A15B]/80"
        />
      </div>

      <a
        href="#contact"
        aria-label="Scroll to contact section"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#8C6245]/50 bg-[#211914]/80 text-[#D6A15B] transition-all hover:translate-y-0.5 hover:border-[#D6A15B] hover:text-[#F7D7A8] focus-visible:outline-2 focus-visible:outline-[#D6A15B]"
      >
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
