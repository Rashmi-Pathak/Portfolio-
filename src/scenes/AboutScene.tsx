"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { BookOpen, Code2, Cpu, Sparkles } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { PROFILE } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".about-portrait-zoom",
            ".about-standing-card",
            ".about-reveal",
          ],
          { clearProps: "all", opacity: 1, y: 0, x: 0, scale: 1 }
        );
        return;
      }

      // Reversible camera-like zoom into the character portrait on scroll
      gsap.fromTo(
        ".about-portrait-zoom",
        { scale: 1.12, yPercent: 4 },
        {
          scale: 1,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        }
      );

      // Counter-parallax on the standing full-body inset
      gsap.fromTo(
        ".about-standing-card",
        { y: 40 },
        {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      // Editorial copy reveal
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-warm-cream/10 bg-midnight py-24 sm:py-32 px-6 sm:px-10 lg:px-14"
    >
      {/* Subtle dusty mauve & forest green ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 28%, rgba(165,141,145,0.12) 0%, transparent 50%), radial-gradient(circle at 82% 72%, rgba(63,96,73,0.13) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: Visual Composition (Close-up Portrait + Standing Full-Body Card) */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-2xl border border-warm-cream/15 bg-dark-walnut/40 shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
              <div className="about-portrait-zoom relative aspect-[1024/935] w-full will-change-transform">
                <Image
                  src="/assets/character/character-closeup.jpg"
                  alt="Close-up illustrated portrait of Rashmi Pathak leaning thoughtfully near her laptop inside her warm studio"
                  width={1024}
                  height={935}
                  loading="eager"
                  sizes="(max-width: 1024px) 92vw, 620px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/85 via-transparent to-midnight/20"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                <span className="rounded-md border border-warm-cream/20 bg-midnight/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-amber backdrop-blur-sm">
                  Scene 04 · Perspective
                </span>
                <span className="font-mono text-[11px] text-warm-cream/75">
                  IT Engineering · 2024–2028
                </span>
              </div>
            </div>

            {/* Secondary Standing Full-Body Portrait (Desktop asymmetric overlap, preserved 2:3 ratio) */}
            <div className="about-standing-card hidden sm:block lg:absolute lg:-bottom-10 lg:-right-6 lg:w-[215px] mt-6 lg:mt-0 overflow-hidden rounded-xl border border-amber/30 bg-midnight shadow-[0_20px_50px_rgba(0,0,0,0.65)] will-change-transform">
              <div className="relative aspect-[682/1024] w-full">
                <Image
                  src="/assets/character/character-standing.jpg"
                  alt="Full-body illustration of Rashmi Pathak standing in her studio with arms crossed, wearing her olive-green sweater, cream trousers, and white sneakers"
                  width={682}
                  height={1024}
                  loading="eager"
                  sizes="220px"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Biography */}
          <div className="lg:col-span-6 lg:pl-6">
            <p className="about-reveal font-mono text-xs tracking-[0.2em] uppercase text-amber">
              04 // Developer Profile
            </p>

            <h2
              id="about-heading"
              className="about-reveal mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
            >
              WHO AM I?
            </h2>

            <p className="about-reveal mt-6 font-serif text-xl sm:text-2xl italic leading-relaxed text-warm-cream/95">
              &ldquo;Curious about how software thinks, renders, scales, and
              feels—from neural architectures to the last interactive pixel.&rdquo;
            </p>

            <div className="about-reveal mt-6 space-y-4 text-base leading-relaxed text-warm-cream/85">
              <p>
                I&apos;m <strong className="font-semibold text-off-white">Rashmi Pathak</strong>,
                an undergraduate pursuing a{" "}
                <strong className="font-semibold text-amber">
                  Bachelor of Technology in Information Technology (2024–2028)
                </strong>
                . My work centers on building practical applications that unite
                solid software engineering with intelligent data-driven systems.
              </p>
              <p>
                Across full-stack web development, backend services, data
                analytics, and AI/ML experimentation, I enjoy unpacking how
                complex systems actually operate under the hood—then turning
                those concepts into clean, interactive projects.
              </p>
            </div>

            {/* Technical Pillars */}
            <div className="about-reveal mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-warm-cream/12 bg-graphite/65 p-4">
                <Code2 className="h-4 w-4 text-amber" aria-hidden="true" />
                <h3 className="mt-2.5 font-display text-sm font-semibold text-off-white">
                  Full-Stack Web
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-warm-cream/70">
                  React, Next.js, TypeScript, and modular REST APIs.
                </p>
              </div>

              <div className="rounded-xl border border-warm-cream/12 bg-graphite/65 p-4">
                <Cpu className="h-4 w-4 text-muted-sage" aria-hidden="true" />
                <h3 className="mt-2.5 font-display text-sm font-semibold text-off-white">
                  AI &amp; ML Labs
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-warm-cream/70">
                  Python, NumPy, Pandas, Scikit-learn, and predictive modeling.
                </p>
              </div>

              <div className="rounded-xl border border-warm-cream/12 bg-graphite/65 p-4">
                <BookOpen className="h-4 w-4 text-warm-mauve" aria-hidden="true" />
                <h3 className="mt-2.5 font-display text-sm font-semibold text-off-white">
                  Build &amp; Iterate
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-warm-cream/70">
                  Hands-on FinTech, analytics, and interactive system builds.
                </p>
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="about-reveal mt-8">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-sage">
                <Sparkles className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                <span>Core Areas of Interest</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PROFILE.interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-md border border-warm-cream/12 bg-graphite/80 px-3 py-1.5 font-mono text-xs text-warm-cream/85"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
