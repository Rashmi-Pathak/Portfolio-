"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  ArrowUp,
  ArrowUpRight,
  FileText,
  Mail,
} from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { PROFILE, type PortfolioLink } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function getContactIcon(id: PortfolioLink["id"]) {
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

export function ContactScene() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [contactNotice, setContactNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".outro-bg-zoom", ".outro-reveal"], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Camera gracefully pulls back into the warm studio workspace
      gsap.fromTo(
        ".outro-bg-zoom",
        { scale: 1.14, yPercent: -4 },
        {
          scale: 1.0,
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        ".outro-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
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
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-midnight pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 sm:px-10 lg:px-14"
    >
      {/* Workspace Outro Background with scrubbed pullback + editorial right-side panel scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="outro-bg-zoom relative h-full w-full will-change-transform">
          <Image
            src="/assets/illustrations/workspace-outro.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-left lg:object-center opacity-55"
          />
        </div>

        {/* Directional dark editorial gradient covering the baked placeholder text on the right wall cleanly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(23,26,28,0.58) 0%, rgba(23,26,28,0.84) 44%, rgba(23,26,28,0.96) 72%, rgba(23,26,28,0.98) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #171A1C 0%, transparent 20%, transparent 80%, #171A1C 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT: Character Portrait seamlessly integrated into the studio workspace */}
          <div className="outro-reveal lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative flex flex-col items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 rounded-full bg-amber/12 blur-2xl"
              />
              <div className="relative w-[270px] sm:w-[360px] lg:w-[400px]">
                <Image
                  src="/assets/character/contact-portrait.png"
                  alt="Illustration of Rashmi Pathak working at her wooden desk with a laptop"
                  width={900}
                  height={820}
                  loading="eager"
                  sizes="(max-width: 640px) 270px, (max-width: 1024px) 360px, 400px"
                  className="relative h-auto w-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.72)]"
                />
              </div>
              <p className="mt-3 rounded-full border border-amber/25 bg-midnight/85 px-4 py-1 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
                See you in the next build
              </p>
            </div>
          </div>

          {/* RIGHT: Editorial Farewell & Functional Contact Panel */}
          <div className="lg:col-span-7 rounded-2xl border border-warm-cream/15 bg-midnight/95 p-6 sm:p-10 shadow-2xl">
            <p className="outro-reveal font-mono text-xs tracking-[0.2em] uppercase text-amber">
              13 // Contact &amp; Farewell
            </p>

            <h2
              id="contact-heading"
              className="outro-reveal mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
            >
              LET&apos;S BUILD SOMETHING INTERESTING.
            </h2>

            <p className="outro-reveal mt-4 max-w-xl text-base leading-relaxed text-warm-cream/85">
              Open to collaborating on software engineering, full-stack web
              apps, AI/ML experiments, and creative interactive experiences.
            </p>

            {/* Contact Actions */}
            <div className="outro-reveal mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PROFILE.links.map((link) => {
                const Icon = getContactIcon(link.id);

                if (link.href && !link.isPlaceholder) {
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={
                        link.isExternal ? "noopener noreferrer" : undefined
                      }
                      className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-amber/50 bg-amber px-4 py-3 font-display text-sm font-semibold text-midnight transition-colors hover:bg-soft-gold"
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{link.label}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                }

                return (
                  <button
                    key={link.id}
                    type="button"
                    aria-disabled="true"
                    aria-describedby="contact-placeholder-status"
                    onClick={() =>
                      setContactNotice(
                        link.placeholderHint ??
                          `${link.label} is an editable placeholder in src/data/profile.ts.`
                      )
                    }
                    className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-warm-cream/15 bg-graphite/75 px-4 py-3 text-sm font-medium text-warm-cream/80 transition-colors hover:border-warm-mauve/45"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Icon
                        className="h-4 w-4 text-warm-mauve"
                        aria-hidden="true"
                      />
                      <span>{link.label}</span>
                    </span>
                    <span className="rounded border border-warm-cream/15 bg-midnight px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warm-mauve">
                      Pending
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id="contact-placeholder-status"
              aria-live="polite"
              className="mt-3 min-h-5 font-mono text-xs text-warm-mauve"
            >
              {contactNotice}
            </div>

            {/* Closing Line + Return to Top */}
            <div className="outro-reveal mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-warm-cream/12 pt-6">
              <p className="font-serif text-lg italic text-warm-cream/90">
                &ldquo;Thanks for exploring my space. See you in the next
                build.&rdquo;
              </p>

              <a
                href="#hero"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-warm-cream/20 bg-graphite/80 px-4 py-2 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:border-amber hover:text-amber"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Back to Top</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
