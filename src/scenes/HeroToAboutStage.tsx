"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Code2,
  Cpu,
  FileText,
  Mail,
  Sparkles,
} from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { PROFILE, type PortfolioLink } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroDeskLaptopCanvas = dynamic(
  () =>
    import("@/three/HeroDeskLaptopCanvas").then(
      (mod) => mod.HeroDeskLaptopCanvas
    ),
  { ssr: false }
);

interface HeroToAboutStageProps {
  revealed: boolean;
}

const AMBIENT_DUST_MOTES = [
  { left: "14%", top: "24%", size: "h-1 w-1", duration: "8.2s", delay: "0.2s" },
  { left: "28%", top: "68%", size: "h-1.5 w-1.5", duration: "9.4s", delay: "1.1s" },
  { left: "41%", top: "32%", size: "h-1 w-1", duration: "7.6s", delay: "0.6s" },
  { left: "54%", top: "74%", size: "h-1 w-1", duration: "8.8s", delay: "1.8s" },
  { left: "66%", top: "22%", size: "h-1.5 w-1.5", duration: "7.2s", delay: "0.4s" },
  { left: "79%", top: "38%", size: "h-1 w-1", duration: "9.1s", delay: "1.5s" },
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

export function HeroToAboutStage({ revealed }: HeroToAboutStageProps) {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const laptopProgressRef = useRef<number>(prefersReducedMotion ? 0.85 : 0);

  const [placeholderNotice, setPlaceholderNotice] = useState<string | null>(
    null
  );
  const [stagePhase, setStagePhase] = useState<"hero" | "room" | "about">(
    "hero"
  );
  const [isStageInView, setIsStageInView] = useState<boolean>(true);
  const [typedLength, setTypedLength] = useState<number>(0);

  // Pause WebGL render loop cleanly whenever HeroToAboutStage scrolls offscreen
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsStageInView(entry.isIntersecting);
        }
      },
      { rootMargin: "20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typewriter effect for the Hero intro paragraph once scene reveals
  useEffect(() => {
    if (!revealed) return;

    if (prefersReducedMotion) {
      const doneId = window.setTimeout(() => {
        setTypedLength(PROFILE.bio.length);
      }, 0);
      return () => window.clearTimeout(doneId);
    }

    let cancelled = false;
    let index = 0;
    const timers: number[] = [];

    const resetTimer = window.setTimeout(() => {
      if (!cancelled) setTypedLength(0);
    }, 0);
    timers.push(resetTimer);

    const step = () => {
      if (cancelled) return;
      index += 1;
      setTypedLength(index);
      if (index < PROFILE.bio.length) {
        const t = window.setTimeout(step, 17);
        timers.push(t);
      }
    };

    const startTimer = window.setTimeout(step, 420);
    timers.push(startTimer);

    return () => {
      cancelled = true;
      for (const id of timers) {
        window.clearTimeout(id);
      }
    };
  }, [revealed, prefersReducedMotion]);

  // GSAP Entrance + Continuous 4-Beat Scroll Choreography (Desktop 768px+)
  useEffect(() => {
    if (!revealed || !stageRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        laptopProgressRef.current = 0.85;
        gsap.set(
          [
            ".hero-stagger",
            ".hero-foreground-layer",
            ".room-zoom-stage",
            ".hero-scrim-layer",
          ],
          { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      gsap.fromTo(
        ".hero-stagger",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollDriver = { p: 0 };

        const masterTl = gsap.timeline({
          onUpdate: () => {
            const p = masterTl.progress();
            laptopProgressRef.current = p;
            const nextPhase =
              p < 0.24 ? "hero" : p < 0.7 ? "room" : "about";
            setStagePhase((prev) => (prev === nextPhase ? prev : nextPhase));
          },
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Beat 1->2 (0.00 - 0.24): Intro text fades slowly out; only room + 3D laptop on desk mat remain
        // Beat 2->3 (0.24 - 0.50): Camera zooms smoothly toward the 3D laptop on the desk mat
        // Beat 3->4 (0.50 - 0.78): Room dims, 3D laptop pops forward in full 360° spin & expands LARGE & CENTERED with About Me on its screen
        // Beat 4->5 (0.78 - 1.00): Hold on giant interactive About Me laptop screen
        masterTl
          .to(scrollDriver, { p: 1, duration: 1, ease: "none" }, 0)
          .to(
            ".hero-foreground-layer",
            {
              opacity: 0,
              y: -24,
              force3D: true,
              duration: 0.23,
              ease: "power1.out",
            },
            0
          )
          .to(
            ".hero-scrim-layer",
            { opacity: 0.08, duration: 0.23, ease: "none" },
            0
          )
          .to(
            ".hero-scroll-cue",
            { opacity: 0, duration: 0.16, ease: "none" },
            0
          )
          .to(
            ".room-zoom-stage",
            { scale: 1.68, force3D: true, duration: 0.26, ease: "power1.inOut" },
            0.24
          )
          .to(
            ".room-zoom-stage",
            { opacity: 0.14, duration: 0.26, ease: "power1.inOut" },
            0.5
          )
          .to(
            ".hero-scrim-layer",
            { opacity: 0.82, duration: 0.24, ease: "none" },
            0.5
          )
          .to(
            ".hero-laptop-fade-layer",
            {
              opacity: 0,
              scale: 0.94,
              force3D: true,
              duration: 0.12,
              ease: "power1.inOut",
            },
            0.88
          );
      });
    }, stageRef);

    return () => {
      ctx.revert();
    };
  }, [revealed, prefersReducedMotion]);

  const handlePlaceholderAction = (link: PortfolioLink) => {
    setPlaceholderNotice(
      link.placeholderHint ??
        `${link.label} link can be updated in src/data/profile.ts.`
    );
  };

  const displayedBio = prefersReducedMotion
    ? PROFILE.bio
    : PROFILE.bio.slice(0, typedLength);
  const isTyping = !prefersReducedMotion && typedLength < PROFILE.bio.length;

  return (
    <section
      ref={stageRef}
      id="hero"
      aria-labelledby="hero-heading"
      className={`relative w-full bg-midnight ${
        prefersReducedMotion ? "min-h-screen" : "min-h-screen md:h-[360vh]"
      }`}
    >
      {/* Invisible scroll target for #about anchor right at center of Beat 4 (~81% progress) */}
      <div
        id="about"
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute left-0 top-[59%] h-1 w-1"
      />

      {/* Sticky Cinematic Viewport on Desktop (md+) */}
      <div className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pt-24 pb-16 md:pt-24 md:pb-12 md:sticky md:top-0 md:h-screen">
        {/* Layer 1: Empty-Desk Studio Room Background (1024x576, 16:9) */}
        <div
          aria-hidden="true"
          className="room-zoom-stage pointer-events-none absolute inset-0 z-[1] origin-[52%_75%] will-change-transform"
        >
          <Image
            src="/assets/illustrations/workspace-hero-empty-desk.jpg"
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center select-none"
          />
        </div>

        {/* Layer 2: Soft Left Editorial Scrim */}
        <div
          aria-hidden="true"
          className="hero-scrim-layer pointer-events-none absolute inset-0 z-[2] will-change-[opacity]"
          style={{
            background:
              "linear-gradient(95deg, rgba(23,26,28,0.92) 0%, rgba(23,26,28,0.75) 28%, rgba(23,26,28,0.18) 50%, rgba(23,26,28,0.06) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(23,26,28,0.48) 0%, transparent 22%, transparent 80%, rgba(23,26,28,0.92) 100%)",
          }}
        />

        {/* Ambient Dust Motes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
        >
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
              className={`animate-ambient-float absolute rounded-full bg-amber/50 shadow-[0_0_8px_rgba(214,161,91,0.45)] ${mote.size}`}
            />
          ))}
        </div>

        {/* Layer 3: Live 3D GLB Laptop seated on Desk Mat -> Zooms -> 360° Spins -> Giant Centered About Screen */}
        <div className="hero-laptop-fade-layer pointer-events-none absolute inset-0 z-[5] hidden md:block will-change-transform">
          <HeroDeskLaptopCanvas
            progressRef={laptopProgressRef}
            reducedMotion={prefersReducedMotion}
            interactive={stagePhase === "about" || prefersReducedMotion}
            active={revealed && isStageInView}
          />
        </div>

        {/* Layer 4: Beat 1 — Hero Intro Copy on Left (clean clearance below Navbar + Typewriter bio) */}
        <div
          className={`hero-foreground-layer relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14 will-change-transform ${
            stagePhase === "hero"
              ? "pointer-events-auto"
              : "md:pointer-events-none"
          }`}
        >
          <div className="max-w-md lg:max-w-[460px] flex flex-col items-start">
            <div className="hero-stagger inline-flex items-center gap-2.5 rounded-full border border-amber/30 bg-midnight/90 px-3.5 py-1.5">
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
              className="mt-4 font-display font-bold tracking-[-0.03em] text-off-white focus:outline-none"
            >
              <span className="hero-stagger block text-lg sm:text-xl lg:text-2xl font-medium tracking-[0.12em] text-amber">
                {PROFILE.headline.prefix}
              </span>
              <span className="hero-stagger block mt-1 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[0.98] text-off-white">
                {PROFILE.headline.primary}
              </span>
            </h1>

            <p className="hero-stagger mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs sm:text-[13px] tracking-[0.1em] uppercase text-muted-sage">
              {PROFILE.roles.map((role, index) => (
                <span key={role} className="inline-flex items-center gap-2.5">
                  <span>{role}</span>
                  {index < PROFILE.roles.length - 1 && (
                    <span aria-hidden="true" className="text-amber/70">
                      /
                    </span>
                  )}
                </span>
              ))}
            </p>

            {/* Typewriter Intro Paragraph (zero CLS via invisible sizing copy) */}
            <p
              aria-label={PROFILE.bio}
              className="hero-stagger relative mt-4 text-sm sm:text-base leading-relaxed text-warm-cream/90"
            >
              <span aria-hidden="true" className="invisible select-none">
                {PROFILE.bio}
              </span>
              <span aria-hidden="true" className="absolute inset-0">
                {displayedBio}
                {isTyping && (
                  <span className="animate-cursor-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-amber" />
                )}
              </span>
            </p>

            {/* CTA & Social Links */}
            <div className="hero-stagger mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href="#about"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-amber px-4.5 py-2.5 font-display text-sm font-semibold tracking-[0.03em] text-midnight shadow-[0_10px_28px_rgba(214,161,91,0.28)] transition-all hover:bg-soft-gold hover:-translate-y-0.5"
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
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-warm-cream/25 bg-midnight/90 px-3.5 py-2 text-sm font-medium text-off-white transition-all hover:border-amber/70 hover:text-amber"
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
                    aria-describedby="hero-placeholder-notice"
                    onClick={() => handlePlaceholderAction(link)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-warm-cream/15 bg-midnight/65 px-3.5 py-2 text-sm font-medium text-warm-cream/75 backdrop-blur-sm transition-colors hover:border-warm-mauve/45"
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
              id="hero-placeholder-notice"
              aria-live="polite"
              className="mt-2 min-h-5 font-mono text-xs text-warm-mauve"
            >
              {placeholderNotice}
            </div>
          </div>
        </div>

        {/* Accessible Desktop Summary for Screen Readers (visual About renders inside giant 3D laptop screen) */}
        <div className="visually-hidden hidden md:block">
          <h2 id="about-heading">WHO AM I?</h2>
          <p>{PROFILE.bio}</p>
        </div>

        {/* Mobile-Only Stacked About Card (<768px where 3D canvas is hidden) */}
        <div className="relative z-[15] mt-12 px-6 md:hidden">
          <div className="rounded-2xl border border-warm-cream/12 bg-midnight/90 p-6 shadow-2xl">
            <div className="mb-5 overflow-hidden rounded-xl border border-amber/30">
              <div className="relative aspect-[1024/935] w-full">
                <Image
                  src="/assets/character/character-closeup.jpg"
                  alt="Illustrated portrait of Rashmi Pathak inside her studio"
                  width={1024}
                  height={935}
                  sizes="90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <p className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
              04 // Developer Profile
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-off-white">
              WHO AM I?
            </h2>
            <p className="mt-3 font-serif text-lg italic leading-relaxed text-warm-cream/95">
              &ldquo;Curious about how software thinks, renders, scales, and
              feels—from neural architectures to the last interactive
              pixel.&rdquo;
            </p>
            <p className="mt-3 text-sm leading-relaxed text-warm-cream/85">
              I&apos;m{" "}
              <strong className="font-semibold text-off-white">
                Rashmi Pathak
              </strong>
              , pursuing a{" "}
              <strong className="font-semibold text-amber">
                Bachelor of Technology in Information Technology (2024–2028)
              </strong>
              . My work focuses on building practical applications that unite
              clean software engineering with intelligent data-driven systems.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-warm-cream/12 bg-graphite/65 p-3.5">
                <Code2 className="h-4 w-4 text-amber" aria-hidden="true" />
                <h3 className="mt-2 font-display text-sm font-semibold text-off-white">
                  Full-Stack Web
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-warm-cream/70">
                  React, Next.js, TypeScript, and modular REST APIs.
                </p>
              </div>
              <div className="rounded-xl border border-warm-cream/12 bg-graphite/65 p-3.5">
                <Cpu className="h-4 w-4 text-muted-sage" aria-hidden="true" />
                <h3 className="mt-2 font-display text-sm font-semibold text-off-white">
                  AI &amp; ML Labs
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-warm-cream/70">
                  Python, NumPy, Pandas, Scikit-learn, and modeling.
                </p>
              </div>
              <div className="rounded-xl border border-warm-cream/12 bg-graphite/65 p-3.5">
                <BookOpen
                  className="h-4 w-4 text-warm-mauve"
                  aria-hidden="true"
                />
                <h3 className="mt-2 font-display text-sm font-semibold text-off-white">
                  Build &amp; Iterate
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-warm-cream/70">
                  FinTech, analytics, and interactive system builds.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-sage">
                <Sparkles
                  className="h-3.5 w-3.5 text-amber"
                  aria-hidden="true"
                />
                <span>Core Areas of Interest</span>
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {PROFILE.interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-md border border-warm-cream/12 bg-graphite/80 px-2.5 py-1 font-mono text-[11px] text-warm-cream/85"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue (Beat 1) */}
        <div className="hero-scroll-cue pointer-events-auto hidden md:block absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 px-4 py-1 text-warm-cream/80 transition-colors hover:text-amber"
          >
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase">
              Scroll to zoom into the desk
            </span>
            <span
              aria-hidden="true"
              className="animate-scroll-line block h-6 w-px bg-gradient-to-b from-amber via-warm-cream/60 to-transparent"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
