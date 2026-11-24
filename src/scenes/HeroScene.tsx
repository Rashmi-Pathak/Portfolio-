"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Mail,
} from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { PROFILE, type PortfolioLink } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSceneProps {
  revealed: boolean;
}

const AMBIENT_DUST_MOTES = [
  { left: "14%", top: "24%", size: "h-1 w-1", duration: "8.2s", delay: "0.2s" },
  { left: "28%", top: "68%", size: "h-1.5 w-1.5", duration: "9.4s", delay: "1.1s" },
  { left: "41%", top: "32%", size: "h-1 w-1", duration: "7.6s", delay: "0.6s" },
  { left: "54%", top: "74%", size: "h-1 w-1", duration: "8.8s", delay: "1.8s" },
  { left: "66%", top: "22%", size: "h-1.5 w-1.5", duration: "7.2s", delay: "0.4s" },
  { left: "79%", top: "38%", size: "h-1 w-1", duration: "9.1s", delay: "1.5s" },
  { left: "86%", top: "66%", size: "h-1.5 w-1.5", duration: "8.0s", delay: "0.9s" },
  { left: "61%", top: "52%", size: "h-1 w-1", duration: "7.4s", delay: "2.2s" },
] as const;

function getLinkIcon(id: PortfolioLink["id"]) {
  switch (id) {
    case "github":
      return GitHubIcon;
    case "linkedin":
      return LinkedInIcon;
    case "email":
      return Mail;
    case "resume":
      return FileText;
  }
}

export function HeroScene({ revealed }: HeroSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const characterWrapRef = useRef<HTMLDivElement>(null);
  const characterFloatRef = useRef<HTMLDivElement>(null);
  const [placeholderNotice, setPlaceholderNotice] = useState<string | null>(null);

  // GSAP Workspace Reveal + Hero Entrance + Scroll-Driven Room Camera Motion
  useEffect(() => {
    if (!revealed || !sectionRef.current) return;

    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-bg-layer",
            ".hero-bg-scroll-stage",
            ".hero-ambient-layer",
            ".hero-character-entrance",
            ".hero-char-scroll-stage",
            ".hero-text-scroll-stage",
            ".hero-stagger",
            ".hero-scroll-cue",
          ],
          { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".hero-bg-layer",
        { opacity: 0.25, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.15, ease: "power2.out" }
      )
        .fromTo(
          ".hero-ambient-layer",
          { opacity: 0 },
          { opacity: 1, duration: 0.85 },
          "-=0.85"
        )
        .fromTo(
          ".hero-character-entrance",
          { opacity: 0, x: 32, y: 18, scale: 0.97 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95 },
          "-=0.75"
        )
        .fromTo(
          ".hero-stagger",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.085 },
          "-=0.7"
        )
        .fromTo(
          ".hero-scroll-cue",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.3"
        );

      // Gentle breathing idle motion on the seated character
      if (characterFloatRef.current) {
        gsap.to(characterFloatRef.current, {
          y: -5,
          scale: 1.008,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.1,
        });
      }

      // Reversible scrubbed camera glide into the room as user scrolls
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        scrollTl
          .to(
            ".hero-bg-scroll-stage",
            {
              scale: 1.24,
              xPercent: -4,
              yPercent: -8,
              ease: "none",
            },
            0
          )
          .to(
            ".hero-char-scroll-stage",
            {
              x: 72,
              y: -36,
              scale: 1.09,
              opacity: 0.08,
              ease: "none",
            },
            0
          )
          .to(
            ".hero-text-scroll-stage",
            {
              y: -64,
              opacity: 0,
              ease: "none",
            },
            0
          )
          .to(
            ".hero-scroll-cue",
            {
              opacity: 0,
              y: 16,
              ease: "none",
            },
            0
          );
      });

      mm.add("(max-width: 767px)", () => {
        const mobileScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        mobileScrollTl.to(
          ".hero-bg-scroll-stage",
          {
            scale: 1.14,
            yPercent: -6,
            ease: "none",
          },
          0
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [revealed, prefersReducedMotion]);

  // Subtle pointer parallax on desktop (separate wrapper so it never conflicts with ScrollTrigger)
  useEffect(() => {
    if (!revealed || prefersReducedMotion || !sectionRef.current) return;

    const pointerMedia = window.matchMedia("(pointer: fine)");
    if (!pointerMedia.matches) return;

    const section = sectionRef.current;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const normX = (event.clientX - rect.left) / rect.width - 0.5;
      const normY = (event.clientY - rect.top) / rect.height - 0.5;

      if (bgParallaxRef.current) {
        gsap.to(bgParallaxRef.current, {
          x: -normX * 14,
          y: -normY * 10,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (characterWrapRef.current) {
        gsap.to(characterWrapRef.current, {
          x: normX * 10,
          y: normY * 6,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handlePointerLeave = () => {
      if (bgParallaxRef.current) {
        gsap.to(bgParallaxRef.current, {
          x: 0,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (characterWrapRef.current) {
        gsap.to(characterWrapRef.current, {
          x: 0,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [revealed, prefersReducedMotion]);

  const handlePlaceholderAction = (link: PortfolioLink) => {
    setPlaceholderNotice(
      link.placeholderHint ??
        `${link.label} link can be updated in src/data/profile.ts.`
    );
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className={`relative w-full bg-midnight ${
        prefersReducedMotion ? "min-h-screen" : "min-h-screen md:h-[170vh]"
      }`}
    >
      {/* Sticky Camera Stage so room zoom & parallax travel cleanly on scroll */}
      <div className="relative flex min-h-screen w-full items-center overflow-hidden pt-24 pb-20 lg:pt-24 lg:pb-16 md:sticky md:top-0 md:h-screen">
        {/* Layer 1: Workspace Background Illustration (1024x576, 16:9) */}
        <div
          aria-hidden="true"
          className="hero-bg-scroll-stage pointer-events-none absolute inset-0 will-change-transform"
        >
          <div
            ref={bgParallaxRef}
            className="hero-bg-layer pointer-events-none absolute -inset-4 will-change-transform"
          >
            <Image
              src="/assets/illustrations/workspace-hero.jpg"
              alt=""
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center select-none"
            />
          </div>
        </div>

        {/* Layer 2: Directional Editorial Scrim & Seamless Bottom Transition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(23,26,28,0.95) 0%, rgba(23,26,28,0.88) 34%, rgba(23,26,28,0.58) 58%, rgba(23,26,28,0.22) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(23,26,28,0.62) 0%, rgba(23,26,28,0.06) 24%, rgba(23,26,28,0.14) 68%, #171A1C 100%)",
          }}
        />

        {/* Layer 3: Ambient Warm Light & Floating Dust Motes */}
        <div
          aria-hidden="true"
          className="hero-ambient-layer pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute right-[10%] top-[22%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(214,161,91,0.16)_0%,rgba(197,166,109,0.05)_48%,transparent_72%)] blur-2xl" />
          <div className="hidden lg:block absolute left-[8%] bottom-[12%] h-[280px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(63,96,73,0.12)_0%,transparent_70%)] blur-2xl" />

          {AMBIENT_DUST_MOTES.map((mote, index) => (
            <span
              key={index}
              style={
                {
                  left: mote.left,
                  top: mote.top,
                  "--float-duration": mote.duration,
                  "--float-delay": mote.delay,
                } as React.CSSProperties
              }
              className={`animate-ambient-float absolute rounded-full bg-amber/55 shadow-[0_0_8px_rgba(214,161,91,0.45)] ${mote.size}`}
            />
          ))}
        </div>

        {/* Layer 4: Foreground Two-Column Editorial Composition */}
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* LEFT: Editorial Typography & Introduction */}
            <div className="hero-text-scroll-stage lg:col-span-6 flex flex-col items-start will-change-transform">
              <div className="hero-stagger inline-flex items-center gap-2.5 rounded-full border border-amber/30 bg-midnight/75 px-3.5 py-1.5 backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-forest-green ring-2 ring-muted-sage/40"
                />
                <span className="font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-warm-cream">
                  {PROFILE.education.degree} · {PROFILE.education.graduationLabel}
                </span>
              </div>

              <h1
                id="hero-heading"
                tabIndex={-1}
                className="mt-6 font-display font-bold tracking-[-0.03em] text-off-white focus:outline-none"
              >
                <span className="hero-stagger block text-xl sm:text-2xl lg:text-[1.85rem] font-medium tracking-[0.12em] text-amber">
                  {PROFILE.headline.prefix}
                </span>
                <span className="hero-stagger block mt-2 text-4xl sm:text-5xl lg:text-[4.15rem] xl:text-[4.65rem] leading-[0.98] text-off-white">
                  {PROFILE.headline.primary}
                </span>
              </h1>

              <p className="hero-stagger mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs sm:text-sm tracking-[0.1em] uppercase text-muted-sage">
                {PROFILE.roles.map((role, index) => (
                  <span key={role} className="inline-flex items-center gap-3">
                    <span>{role}</span>
                    {index < PROFILE.roles.length - 1 && (
                      <span aria-hidden="true" className="text-amber/70">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </p>

              <p className="hero-stagger mt-5 max-w-xl text-base sm:text-[1.0625rem] leading-relaxed text-warm-cream/90">
                {PROFILE.bio}
              </p>

              {/* Primary CTA & Social Controls */}
              <div className="hero-stagger mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#about"
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-lg bg-amber px-5 py-3 font-display text-sm font-semibold tracking-[0.04em] text-midnight shadow-[0_10px_28px_rgba(214,161,91,0.28)] transition-all hover:bg-soft-gold hover:-translate-y-0.5"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>

                {PROFILE.links.map((link) => {
                  const Icon = getLinkIcon(link.id);

                  if (link.href && !link.isPlaceholder) {
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={
                          link.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-warm-cream/25 bg-graphite/75 px-4 py-2.5 text-sm font-medium text-off-white backdrop-blur-sm transition-all hover:border-amber/70 hover:text-amber hover:-translate-y-0.5"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{link.label}</span>
                        {link.isExternal && (
                          <ArrowUpRight
                            className="h-3.5 w-3.5 opacity-75"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={link.id}
                      type="button"
                      aria-disabled="true"
                      aria-describedby="placeholder-link-status"
                      onClick={() => handlePlaceholderAction(link)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-warm-cream/15 bg-midnight/60 px-4 py-2.5 text-sm font-medium text-warm-cream/70 backdrop-blur-sm transition-colors hover:border-warm-mauve/45 hover:text-warm-cream"
                    >
                      <Icon
                        className="h-4 w-4 text-warm-mauve/80"
                        aria-hidden="true"
                      />
                      <span>{link.label}</span>
                      <span className="rounded border border-warm-cream/15 bg-graphite/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warm-mauve">
                        Soon
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                id="placeholder-link-status"
                aria-live="polite"
                className="mt-3 min-h-5 font-mono text-xs text-warm-mauve"
              >
                {placeholderNotice}
              </div>
            </div>

            {/* RIGHT: Transparent Character Cutout (1024x682, exact 3:2 aspect ratio) */}
            <div className="hero-char-scroll-stage lg:col-span-6 flex justify-center lg:justify-end will-change-transform">
              <div
                ref={characterWrapRef}
                className="hero-character-entrance relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[610px] lg:translate-y-4 will-change-transform"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[12%] inset-y-[10%] rounded-full bg-[radial-gradient(circle,rgba(214,161,91,0.22)_0%,rgba(63,96,73,0.1)_48%,transparent_72%)] blur-2xl"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[1%] left-1/2 h-9 w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,12,14,0.88)_0%,transparent_72%)] blur-sm"
                />

                <div
                  ref={characterFloatRef}
                  className="relative aspect-[1024/682] w-full will-change-transform"
                >
                  <Image
                    src="/assets/character/character-hero-cutout.png"
                    alt="Illustrated portrait of Rashmi Pathak seated in her studio chair, wearing round glasses, an olive-green knitted sweater, cream trousers, and white sneakers"
                    width={1024}
                    height={682}
                    preload
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 92vw, 610px"
                    className="h-full w-full object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.58)] select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="hero-scroll-cue pointer-events-auto absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 px-4 py-1 text-warm-cream/75 transition-colors hover:text-amber"
          >
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase">
              Scroll to explore
            </span>
            <span
              aria-hidden="true"
              className="animate-scroll-line block h-7 w-px bg-gradient-to-b from-amber via-warm-cream/60 to-transparent"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
