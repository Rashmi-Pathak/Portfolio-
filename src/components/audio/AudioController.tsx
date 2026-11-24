"use client";

import { Volume2, VolumeX } from "lucide-react";

interface AudioControllerProps {
  enabled: boolean;
  volume: number;
  visible: boolean;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export function AudioController({
  enabled,
  volume,
  visible,
  onToggle,
  onVolumeChange,
}: AudioControllerProps) {
  if (!visible) return null;

  return (
    <aside
      aria-label="Audio controls"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 rounded-full border border-warm-cream/15 bg-midnight/85 px-3 py-1.5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Mute ambient studio sound" : "Enable ambient studio sound"}
        className={`inline-flex min-h-9 items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
          enabled
            ? "bg-amber text-midnight font-semibold"
            : "bg-graphite/80 text-warm-cream/85 hover:text-amber"
        }`}
      >
        {enabled ? (
          <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">
          {enabled ? "Sound On" : "Ambient Sound"}
        </span>
      </button>

      {enabled && (
        <div className="flex items-center gap-2 pr-1">
          <label htmlFor="studio-volume-slider" className="visually-hidden">
            Ambient sound volume
          </label>
          <input
            id="studio-volume-slider"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="h-1.5 w-16 cursor-pointer accent-amber"
          />
        </div>
      )}
    </aside>
  );
}
