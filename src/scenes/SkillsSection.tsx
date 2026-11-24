"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Volume2, VolumeX } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import {
  disposeMechanicalAudio,
  initMechanicalAudioUnlock,
  playMechanicalHoverClick,
  playMechanicalKeyPress,
} from "@/audio/mechanicalKeySound";
import { SkillTooltip } from "@/components/skills/SkillTooltip";
import {
  KEYBOARD_ROWS,
  TECHNICAL_SKILLS,
  type SkillDefinition,
} from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SkillsKeyboard3D = dynamic(
  () =>
    import("@/components/skills/SkillsKeyboard3D").then(
      (mod) => mod.SkillsKeyboard3D
    ),
  { ssr: false }
);

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const revealProgressRef = useRef<number>(prefersReducedMotion ? 1 : 0);
  const lastHoveredIdRef = useRef<string | null>(null);

  const [selectedSkill, setSelectedSkill] = useState<SkillDefinition | null>(
    null
  );
  const [hoveredSkill, setHoveredSkill] = useState<SkillDefinition | null>(
    null
  );
  const [typedLength, setTypedLength] = useState<number>(0);
  const [sfxMuted, setSfxMuted] = useState<boolean>(false);
  const [shouldLoadKeyboard, setShouldLoadKeyboard] = useState<boolean>(false);
  const [isSectionInView, setIsSectionInView] = useState<boolean>(false);

  // Lazy-mount the 3D WebGL scene when approaching viewport & pause offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => {
        setShouldLoadKeyboard(true);
        setIsSectionInView(true);
      }, 0);
      return () => window.clearTimeout(id);
    }

    const mountObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadKeyboard(true);
          mountObserver.disconnect();
        }
      },
      { rootMargin: "360px 0px" }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsSectionInView(entry.isIntersecting);
        }
      },
      { rootMargin: "20px 0px" }
    );

    mountObserver.observe(el);
    activeObserver.observe(el);

    return () => {
      mountObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  // Unlock mechanical Web Audio context cleanly on first user interaction & clean up
  useEffect(() => {
    const cleanupUnlock = initMechanicalAudioUnlock();
    return () => {
      cleanupUnlock();
      disposeMechanicalAudio();
    };
  }, []);

  // Cancellable single-sentence typewriter readout when a key is clicked
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    if (!selectedSkill) {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setTypedLength(0);
        }, 0)
      );
      return () => {
        cancelled = true;
        for (const id of timers) window.clearTimeout(id);
      };
    }

    const fullText = selectedSkill.description;

    if (prefersReducedMotion) {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setTypedLength(fullText.length);
        }, 0)
      );
      return () => {
        cancelled = true;
        for (const id of timers) window.clearTimeout(id);
      };
    }

    timers.push(
      window.setTimeout(() => {
        if (!cancelled) setTypedLength(0);
      }, 0)
    );

    const startTimer = window.setTimeout(() => {
      if (cancelled) return;
      let idx = 0;
      const tick = () => {
        if (cancelled) return;
        idx += 1;
        setTypedLength(idx);
        if (idx < fullText.length) {
          timers.push(window.setTimeout(tick, idx % 14 === 0 ? 18 : 11));
        }
      };
      tick();
    }, 60);

    timers.push(startTimer);

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
    };
  }, [selectedSkill, prefersReducedMotion]);

  // Smooth GSAP ScrollTrigger choreography: keyboard fades & rotates into center after laptop fades out
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        revealProgressRef.current = 1;
        gsap.set(
          [".arsenal-header", ".arsenal-keyboard-stage", ".arsenal-sentence"],
          { clearProps: "all", opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      gsap.fromTo(
        ".arsenal-header",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            end: "top 58%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const keyDriver = { p: 0 };
      gsap.fromTo(
        ".arsenal-keyboard-stage",
        { opacity: 0, y: 52, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 30%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.to(keyDriver, {
        p: 1,
        ease: "none",
        onUpdate: () => {
          revealProgressRef.current = keyDriver.p;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 26%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        ".arsenal-sentence",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 34%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const handleSelectSkill = useCallback(
    (skill: SkillDefinition) => {
      playMechanicalKeyPress(sfxMuted);
      setSelectedSkill(skill);
    },
    [sfxMuted]
  );

  const handleHoverSkill = useCallback(
    (skill: SkillDefinition) => {
      if (lastHoveredIdRef.current !== skill.id) {
        lastHoveredIdRef.current = skill.id;
        playMechanicalHoverClick(sfxMuted);
      }
      setHoveredSkill(skill);
    },
    [sfxMuted]
  );

  const handleHoverEnd = useCallback((skill: SkillDefinition) => {
    if (lastHoveredIdRef.current === skill.id) {
      lastHoveredIdRef.current = null;
      setHoveredSkill(null);
    }
  }, []);

  const displayedSentence = selectedSkill
    ? selectedSkill.description.slice(0, typedLength)
    : "";
  const isTyping =
    Boolean(selectedSkill) &&
    !prefersReducedMotion &&
    typedLength < (selectedSkill?.description.length ?? 0);

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="arsenal-heading"
      className="relative overflow-hidden bg-[#14100E] pt-28 pb-20 sm:pt-32 sm:pb-24 px-6 sm:px-10 lg:px-14"
    >
      {/* Warm Wooden Studio Background connecting About Me and the Wooden Project Archive */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.42]"
      >
        <Image
          src="/assets/illustrations/workspace-desk.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_54%,rgba(105,72,50,0.28)_0%,rgba(20,15,12,0.72)_62%,rgba(16,13,11,0.92)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-midnight to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-[#14100E] to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        {/* Centered Header */}
        <div className="arsenal-header flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D97736]/40 bg-graphite/95 px-3.5 py-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#E07A38] ring-2 ring-[#F4A261]/40"
            />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
              THE ARSENAL · EVERY KEY HAS A PURPOSE
            </span>
          </div>

          <h2
            id="arsenal-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
          >
            MY TECHNICAL KEYBOARD.
          </h2>

          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-warm-cream/80">
            Explore the technologies, tools and frameworks I use to turn ideas
            into working software.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <SkillTooltip skill={hoveredSkill} />

            <button
              type="button"
              onClick={() => setSfxMuted((prev) => !prev)}
              aria-pressed={sfxMuted}
              aria-label={
                sfxMuted
                  ? "Unmute mechanical keyboard sound effects"
                  : "Mute mechanical keyboard sound effects"
              }
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-warm-cream/20 bg-graphite/95 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-off-white transition-colors hover:border-[#F4A261]"
            >
              {sfxMuted ? (
                <VolumeX
                  className="h-3.5 w-3.5 text-warm-mauve"
                  aria-hidden="true"
                />
              ) : (
                <Volume2
                  className="h-3.5 w-3.5 text-[#F4A261]"
                  aria-hidden="true"
                />
              )}
              <span>{sfxMuted ? "Muted" : "Click SFX"}</span>
            </button>
          </div>
        </div>

        {/* Centered, Enlarged Floating Frameless 3D Keyboard */}
        <div className="arsenal-keyboard-stage mt-4 will-change-transform">
          {shouldLoadKeyboard ? (
            <SkillsKeyboard3D
              selectedSkillId={selectedSkill?.id ?? null}
              hoveredSkillId={hoveredSkill?.id ?? null}
              reducedMotion={prefersReducedMotion}
              active={isSectionInView}
              revealProgressRef={revealProgressRef}
              onHover={handleHoverSkill}
              onHoverEnd={handleHoverEnd}
              onSelect={handleSelectSkill}
            />
          ) : (
            <div
              aria-hidden="true"
              className="mx-auto h-[420px] w-full max-w-[1160px] sm:h-[520px] lg:h-[600px]"
            />
          )}
        </div>

        {/* Clean Single-Sentence Readout Beneath the Keyboard (No Side Cards) */}
        <div
          aria-live="polite"
          className="arsenal-sentence mx-auto mt-3 max-w-3xl text-center min-h-[4.25rem]"
        >
          {selectedSkill ? (
            <p className="text-sm sm:text-base leading-relaxed text-warm-cream/92">
              <span className="mr-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#F4A261]/45 bg-[#D97736]/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4A261]">
                {selectedSkill.name}
              </span>
              <span>{displayedSentence}</span>
              {isTyping && (
                <span
                  aria-hidden="true"
                  className="animate-cursor-blink ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] bg-[#D97736]"
                />
              )}
            </p>
          ) : (
            <p className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.2em] text-warm-cream/65">
              PRESS A KEY ON THE KEYBOARD TO EXPLORE.
            </p>
          )}
        </div>

        {/* Screen-Reader & Keyboard-Only Navigation Controls */}
        <nav aria-label="Keyboard skill buttons" className="sr-only">
          {KEYBOARD_ROWS.flatMap(({ row }) =>
            TECHNICAL_SKILLS.filter((skill) => skill.row === row)
          ).map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => handleSelectSkill(skill)}
            >
              {skill.name}: {skill.description}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
