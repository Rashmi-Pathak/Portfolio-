"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ensureScrollTriggerRegistered } from "@/animation/scrollController";
import { BOOK_VOLUMES, type BookVolume } from "@/data/books";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BookshelfSceneProps {
  onBookOpen?: () => void;
}

export function BookshelfScene({ onBookOpen }: BookshelfSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const activeBookIndex = BOOK_VOLUMES.findIndex(
    (b) => b.id === selectedBookId
  );
  const activeBook: BookVolume | null =
    activeBookIndex >= 0 ? BOOK_VOLUMES[activeBookIndex] : null;

  // ScrollTrigger camera approach toward the bookshelf
  useEffect(() => {
    if (!sectionRef.current) return;
    ensureScrollTriggerRegistered();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".bookshelf-bg-zoom", ".bookshelf-reveal", ".book-spine-card"], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.fromTo(
        ".bookshelf-bg-zoom",
        { scale: 1.15, yPercent: -5 },
        {
          scale: 1.0,
          yPercent: 4,
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

      gsap.fromTo(
        ".bookshelf-reveal",
        { opacity: 0, y: 18 },
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

      gsap.fromTo(
        ".book-spine-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bookshelf-rack",
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

  // Escape key & arrow key support when a book is open
  useEffect(() => {
    if (!activeBook) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedBookId(null);
      } else if (event.key === "ArrowRight") {
        const next = BOOK_VOLUMES[(activeBookIndex + 1) % BOOK_VOLUMES.length];
        setSelectedBookId(next.id);
      } else if (event.key === "ArrowLeft") {
        const prev =
          BOOK_VOLUMES[
            (activeBookIndex - 1 + BOOK_VOLUMES.length) % BOOK_VOLUMES.length
          ];
        setSelectedBookId(prev.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeBook, activeBookIndex]);

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    onBookOpen?.();
  };

  return (
    <section
      ref={sectionRef}
      id="bookshelf"
      aria-labelledby="bookshelf-heading"
      className="relative overflow-hidden border-t border-warm-cream/10 bg-midnight py-24 sm:py-32 px-6 sm:px-10 lg:px-14"
    >
      {/* Workspace Bookshelf Illustration Background with scrubbed camera motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="bookshelf-bg-zoom relative h-full w-full will-change-transform">
          <Image
            src="/assets/illustrations/workspace-bookshelf.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #171A1C 0%, rgba(23,26,28,0.72) 25%, rgba(23,26,28,0.78) 75%, #171A1C 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px]">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="bookshelf-reveal font-mono text-xs tracking-[0.2em] uppercase text-amber">
            05 // The Studio Shelf
          </p>
          <h2
            id="bookshelf-heading"
            className="bookshelf-reveal mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-off-white"
          >
            FIVE VOLUMES OF THE SPACE
          </h2>
          <p className="bookshelf-reveal mt-4 text-base leading-relaxed text-warm-cream/85">
            Select any volume from the walnut shelf to inspect the chapters
            inside—or keep scrolling smoothly into the interactive 3D laptop.
          </p>
        </div>

        {/* Interactive Walnut Shelf Rack */}
        <div className="bookshelf-rack mt-12 rounded-2xl border border-amber/20 bg-dark-walnut/55 p-6 sm:p-10 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
          {/* Top LED Strip Glow mimicking the studio shelf */}
          <div
            aria-hidden="true"
            className="mb-8 h-1 w-full rounded-full bg-gradient-to-r from-transparent via-amber/75 to-transparent shadow-[0_0_24px_rgba(214,161,91,0.6)]"
          />

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5 items-end">
            {BOOK_VOLUMES.map((book) => {
              const isSelected = book.id === selectedBookId;
              return (
                <li key={book.id} className="book-spine-card">
                  <button
                    type="button"
                    onClick={() => handleSelectBook(book.id)}
                    aria-expanded={isSelected}
                    className={`group relative flex h-[280px] sm:h-[320px] w-full flex-col justify-between overflow-hidden rounded-lg border border-soft-gold/30 p-5 text-left transition-all duration-300 ease-out will-change-transform hover:-translate-y-4 hover:scale-[1.03] hover:shadow-[0_24px_45px_rgba(0,0,0,0.65)] focus-visible:-translate-y-3 ${
                      isSelected
                        ? "-translate-y-4 scale-[1.03] ring-2 ring-amber"
                        : ""
                    }`}
                    style={{
                      backgroundColor: book.spineColor,
                      boxShadow:
                        "inset 6px 0 14px rgba(255,255,255,0.08), inset -8px 0 16px rgba(0,0,0,0.45), 0 14px 28px rgba(0,0,0,0.45)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Gold Foil Top & Bottom Spine Rules */}
                    <div
                      aria-hidden="true"
                      className="space-y-1 border-b border-soft-gold/35 pb-3"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-soft-gold">
                        <span>VOL. {book.number}</span>
                        <BookOpen className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Center Spine Title */}
                    <div className="my-auto py-4">
                      <h3 className="font-serif text-2xl font-semibold leading-tight text-warm-cream group-hover:text-off-white">
                        {book.title}
                      </h3>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-warm-cream/75">
                        {book.subtitle}
                      </p>
                    </div>

                    {/* Spine Footer Prompt */}
                    <div className="border-t border-soft-gold/35 pt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-soft-gold">
                      <span>Open Book</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Walnut Shelf Plank Base */}
          <div
            aria-hidden="true"
            className="mt-6 h-4 w-full rounded-sm border-t border-amber/30 bg-gradient-to-b from-walnut to-dark-walnut shadow-lg"
          />
        </div>
      </div>

      {/* Interactive Open Book Modal Overlay */}
      <AnimatePresence>
        {activeBook && (
          <motion.div
            key="book-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/85 p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedBookId(null)}
          >
            <motion.div
              key={activeBook.id}
              role="dialog"
              aria-modal="true"
              aria-labelledby="open-book-title"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.94, y: 20 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 12 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-soft-gold/40 bg-warm-cream text-midnight shadow-[0_35px_90px_rgba(0,0,0,0.85)]"
            >
              {/* Book Header Bar */}
              <div
                className="flex items-center justify-between gap-4 px-6 py-4 text-off-white"
                style={{ backgroundColor: activeBook.spineColor }}
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-soft-gold">
                    Volume {activeBook.number} · {activeBook.subtitle}
                  </p>
                  <h3
                    id="open-book-title"
                    className="font-serif text-2xl sm:text-3xl font-semibold"
                  >
                    {activeBook.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBookId(null)}
                  aria-label="Close open book and return to shelf"
                  className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-warm-cream/25 bg-midnight/30 text-off-white transition-colors hover:bg-midnight/60"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Two-Page Book Spread */}
              <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-y-0 md:divide-x divide-walnut/20">
                {/* Left Page */}
                <div className="p-6 sm:p-8 space-y-5">
                  <h4 className="font-display text-xl font-bold text-dark-walnut">
                    {activeBook.leftPage.heading}
                  </h4>

                  {activeBook.leftPage.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base leading-relaxed text-graphite"
                    >
                      {p}
                    </p>
                  ))}

                  <div className="pt-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-walnut font-semibold">
                      {activeBook.leftPage.highlightsLabel}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {activeBook.leftPage.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-midnight"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-green"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Page */}
                <div className="p-6 sm:p-8 flex flex-col justify-between bg-off-white/70">
                  <div>
                    <h4 className="font-display text-xl font-bold text-dark-walnut">
                      {activeBook.rightPage.heading}
                    </h4>

                    <dl className="mt-5 space-y-4">
                      {activeBook.rightPage.entries.map((entry) => (
                        <div
                          key={entry.label}
                          className="rounded-lg border border-walnut/15 bg-warm-cream/80 p-3.5"
                        >
                          <dt className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-forest-green">
                            {entry.label}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-graphite">
                            {entry.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <p className="mt-6 border-t border-walnut/15 pt-4 font-mono text-xs text-walnut">
                    {activeBook.rightPage.footnote}
                  </p>
                </div>
              </div>

              {/* Footer Controls: Previous / Return / Next */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-walnut/20 bg-warm-cream px-6 py-4">
                <button
                  type="button"
                  onClick={() => {
                    const prev =
                      BOOK_VOLUMES[
                        (activeBookIndex - 1 + BOOK_VOLUMES.length) %
                          BOOK_VOLUMES.length
                      ];
                    setSelectedBookId(prev.id);
                  }}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-walnut/25 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-dark-walnut transition-colors hover:bg-walnut/10"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Prev Volume</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBookId(null)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-midnight px-4 py-2 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-graphite"
                >
                  <span>Return to Shelf</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const next =
                      BOOK_VOLUMES[(activeBookIndex + 1) % BOOK_VOLUMES.length];
                    setSelectedBookId(next.id);
                  }}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-walnut/25 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-dark-walnut transition-colors hover:bg-walnut/10"
                >
                  <span>Next Volume</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
