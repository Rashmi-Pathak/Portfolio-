"use client";

import type { JourneyIllustrationType } from "@/data/journeyData";

interface TimelineIllustrationProps {
  type: JourneyIllustrationType;
  size?: "sm" | "md";
}

export function TimelineIllustration({
  type,
  size = "sm",
}: TimelineIllustrationProps) {
  const dimensions =
    size === "md" ? "h-24 w-24 sm:h-28 sm:w-28" : "h-16 w-16 sm:h-20 sm:w-20";

  return (
    <div
      aria-hidden="true"
      className={`${dimensions} flex shrink-0 items-center justify-center rounded-xl border border-[#8C6245]/45 bg-gradient-to-b from-[#1B1511] to-[#110D0A] p-2.5 shadow-[inset_0_1px_0_rgba(240,231,217,0.06)]`}
    >
      {type === "laptop" && (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect
            x="12"
            y="14"
            width="40"
            height="26"
            rx="3"
            fill="#241B15"
            stroke="#D6A15B"
            strokeWidth="2"
          />
          <rect
            x="16"
            y="18"
            width="32"
            height="18"
            rx="1.5"
            fill="#14100D"
          />
          <path
            d="M20 31 L27 25 L33 28 L43 21"
            fill="none"
            stroke="#E3B270"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="43" cy="21" r="2" fill="#F7D7A8" />
          <path
            d="M7 44 L57 44 L53 49 L11 49 Z"
            fill="#8C6245"
            stroke="#D6A15B"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {type === "trophy" && (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <path
            d="M20 14 H44 V26 C44 33 38.5 38 32 38 C25.5 38 20 33 20 26 Z"
            fill="#D6A15B"
            stroke="#F7D7A8"
            strokeWidth="1.8"
          />
          <path
            d="M20 18 H13 C13 26 16 29 20 29"
            fill="none"
            stroke="#E3B270"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M44 18 H51 C51 26 48 29 44 29"
            fill="none"
            stroke="#E3B270"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="29" y="38" width="6" height="8" fill="#B57E3C" />
          <rect
            x="21"
            y="46"
            width="22"
            height="6"
            rx="2"
            fill="#694832"
            stroke="#D6A15B"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {type === "medal" && (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <path
            d="M22 12 L28 26 L36 26 L42 12"
            fill="none"
            stroke="#B95D3A"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="32"
            cy="37"
            r="14"
            fill="#D6A15B"
            stroke="#F7D7A8"
            strokeWidth="2"
          />
          <circle
            cx="32"
            cy="37"
            r="9.5"
            fill="#9F6A2E"
            stroke="#F7D7A8"
            strokeWidth="1.2"
          />
          <polygon
            points="32,31 33.9,34.8 38,35.4 35,38.3 35.7,42.4 32,40.5 28.3,42.4 29,38.3 26,35.4 30.1,34.8"
            fill="#F7D7A8"
          />
        </svg>
      )}

      {type === "certificate" && (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect
            x="10"
            y="14"
            width="44"
            height="34"
            rx="3"
            fill="#E7D6BC"
            stroke="#8C6245"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="18"
            width="36"
            height="26"
            rx="1.5"
            fill="none"
            stroke="#694832"
            strokeWidth="1"
          />
          <line
            x1="19"
            y1="25"
            x2="45"
            y2="25"
            stroke="#453125"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="19"
            y1="31"
            x2="37"
            y2="31"
            stroke="#694832"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="19"
            y1="36"
            x2="32"
            y2="36"
            stroke="#694832"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle
            cx="43"
            cy="38"
            r="5.5"
            fill="#D6A15B"
            stroke="#453125"
            strokeWidth="1.4"
          />
          <path d="M40.5 43 L40 52 L43 49 L46 52 L45.5 43" fill="#B95D3A" />
        </svg>
      )}
    </div>
  );
}
