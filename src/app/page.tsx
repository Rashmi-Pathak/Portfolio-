"use client";

import { useEffect, useState } from "react";
import { refreshScrollTriggers } from "@/animation/scrollController";
import { AudioController } from "@/components/audio/AudioController";
import { Navbar } from "@/components/navigation/Navbar";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { PROFILE } from "@/data/profile";
import { useAudio } from "@/hooks/useAudio";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { ContactScene } from "@/scenes/ContactScene";
import { HeroToAboutStage } from "@/scenes/HeroToAboutStage";
import { InitializationScene } from "@/scenes/InitializationScene";
import { JourneySection } from "@/scenes/JourneySection";
import { ProjectsScene } from "@/scenes/ProjectsScene";
import { SkillsSection } from "@/scenes/SkillsSection";

export default function Home() {
  const [introActive, setIntroActive] = useState(true);
  const { activeSection } = useScrollProgress();
  const audio = useAudio();

  useEffect(() => {
    if (!introActive) {
      refreshScrollTriggers();
    }
  }, [introActive]);

  const handleIntroComplete = () => {
    setIntroActive(false);
    audio.playSoftChime(523.25);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIntroActive(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-midnight text-off-white">
      <SmoothScroll paused={introActive} />
      <ScrollProgress visible={!introActive} />

      <InitializationScene
        isActive={introActive}
        onComplete={handleIntroComplete}
      />

      <Navbar
        visible={!introActive}
        activeSection={activeSection}
        onReplayIntro={handleReplayIntro}
      />

      <main
        id="main-content"
        inert={introActive ? true : undefined}
        className="flex-1"
      >
        <HeroToAboutStage revealed={!introActive} />
        <SkillsSection />
        <ProjectsScene />
        <JourneySection />
        <ContactScene />
      </main>

      <footer
        inert={introActive ? true : undefined}
        className="bg-midnight py-6 px-6 sm:px-10 lg:px-14"
      >
        <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-3 text-xs text-warm-cream/60 sm:flex-row sm:items-center">
          <p className="font-mono">
            {PROFILE.siteTitle} · {PROFILE.education.years}
          </p>
          <p>
            Next.js, TypeScript, Tailwind CSS, GSAP ScrollTrigger &amp; Three.js.
          </p>
        </div>
      </footer>

      <AudioController
        enabled={audio.enabled}
        volume={audio.volume}
        visible={!introActive}
        onToggle={audio.toggleSound}
        onVolumeChange={audio.setVolume}
      />
    </div>
  );
}
