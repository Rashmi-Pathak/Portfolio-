"use client";

import { useState } from "react";
import { Menu, RotateCcw, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/data/profile";
import type { NavSectionId } from "@/hooks/useScrollProgress";

interface NavbarProps {
  visible: boolean;
  activeSection: NavSectionId;
  onReplayIntro: () => void;
}

const NAV_ITEMS: ReadonlyArray<{
  id: string;
  label: string;
  href: string;
  matchIds: readonly NavSectionId[];
}> = [
  { id: "home", label: "Home", href: "#hero", matchIds: ["hero"] },
  { id: "about", label: "About", href: "#about", matchIds: ["about"] },
  { id: "skills", label: "Skills", href: "#skills", matchIds: ["skills"] },
  { id: "projects", label: "Projects", href: "#projects", matchIds: ["projects"] },
  { id: "journey", label: "Journey", href: "#journey", matchIds: ["journey"] },
  { id: "contact", label: "Contact", href: "#contact", matchIds: ["contact"] },
];

export function Navbar({
  visible,
  activeSection,
  onReplayIntro,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const githubLink = PROFILE.links.find((link) => link.id === "github");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-opacity duration-500 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="#hero-heading"
        className="visually-hidden fixed top-3 left-3 z-50 rounded-md bg-amber px-4 py-2 font-mono text-xs font-semibold text-midnight shadow-lg"
      >
        Skip to main content
      </a>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-warm-cream/12 bg-midnight/80 px-4 py-2.5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            className="inline-flex min-h-10 items-center gap-1.5 font-display text-sm sm:text-base font-bold tracking-[0.14em] text-off-white"
          >
            <span>RASHMI</span>
            <span className="font-mono text-xs font-medium tracking-[0.08em] text-amber">
              .SPACE
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.matchIds.includes(activeSection);
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium tracking-[0.08em] uppercase transition-colors ${
                        isActive
                          ? "bg-warm-cream/10 text-amber"
                          : "text-warm-cream/75 hover:bg-warm-cream/5 hover:text-off-white"
                      }`}
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-amber"
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReplayIntro}
              aria-label="Replay intro animation"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-warm-cream/15 bg-graphite/70 px-3 py-2 font-mono text-[11px] tracking-[0.06em] uppercase text-warm-cream/85 transition-colors hover:border-amber/50 hover:text-amber"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Replay Intro</span>
            </button>

            {githubLink?.href && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rashmi Pathak on GitHub"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-warm-cream/15 bg-graphite/70 text-warm-cream/85 transition-colors hover:border-amber/50 hover:text-amber"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-warm-cream/15 bg-graphite/70 text-warm-cream md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile"
            className="mt-2 rounded-xl border border-warm-cream/12 bg-midnight/95 p-3 backdrop-blur-md shadow-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.matchIds.includes(activeSection);
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-10 items-center justify-between rounded-lg px-3.5 py-2 text-xs font-medium tracking-[0.08em] uppercase transition-colors ${
                        isActive
                          ? "bg-warm-cream/10 text-amber"
                          : "text-warm-cream/80 hover:bg-warm-cream/5 hover:text-off-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-amber"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
