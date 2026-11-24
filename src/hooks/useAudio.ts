"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface AudioControllerState {
  enabled: boolean;
  volume: number;
  toggleSound: () => void;
  setVolume: (value: number) => void;
  playSoftChime: (frequency?: number) => void;
}

/**
 * Optional, user-initiated ambient Web Audio soundscape + subtle interaction chime.
 * Never auto-plays before user interaction and cleans up audio nodes on unmount.
 */
export function useAudio(): AudioControllerState {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolumeState] = useState(0.28);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lastChimeTimeRef = useRef<number>(0);

  const stopAudioEngine = useCallback(() => {
    for (const osc of oscillatorsRef.current) {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore already-stopped nodes
      }
    }
    oscillatorsRef.current = [];
    if (ctxRef.current) {
      void ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    masterGainRef.current = null;
  }, []);

  const startAudioEngine = useCallback(
    (initialVol: number) => {
      if (typeof window === "undefined") return;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      stopAudioEngine();

      const ctx = new AudioCtx();
      const master = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(420, ctx.currentTime);
      filter.Q.setValueAtTime(0.6, ctx.currentTime);

      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(
        Math.max(0.001, initialVol * 0.12),
        ctx.currentTime + 1.1
      );

      filter.connect(master);
      master.connect(ctx.destination);

      // Warm cozy Dmaj9 ambient studio pad (D3, A3, E4, F#4)
      const freqs = [146.83, 220.0, 329.63, 369.99];
      const created: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const voiceGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime(idx === 1 ? -4 : idx === 2 ? 4 : 0, ctx.currentTime);

        voiceGain.gain.setValueAtTime(idx < 2 ? 0.35 : 0.16, ctx.currentTime);
        osc.connect(voiceGain);
        voiceGain.connect(filter);
        osc.start();
        created.push(osc);
      });

      ctxRef.current = ctx;
      masterGainRef.current = master;
      oscillatorsRef.current = created;
    },
    [stopAudioEngine]
  );

  const toggleSound = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        startAudioEngine(volume);
      } else {
        stopAudioEngine();
      }
      return next;
    });
  }, [startAudioEngine, stopAudioEngine, volume]);

  const setVolume = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setVolumeState(clamped);
    if (ctxRef.current && masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        Math.max(0.0001, clamped * 0.12),
        ctxRef.current.currentTime,
        0.08
      );
    }
  }, []);

  const playSoftChime = useCallback(
    (frequency = 523.25) => {
      if (!enabled || !ctxRef.current || !masterGainRef.current) return;
      const nowMs = Date.now();
      // Prevent rapid repeat triggers during fast scrolling
      if (nowMs - lastChimeTimeRef.current < 450) return;
      lastChimeTimeRef.current = nowMs;

      const ctx = ctxRef.current;
      const osc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(
        Math.max(0.005, volume * 0.08),
        ctx.currentTime + 0.03
      );
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.36);

      osc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.38);
    },
    [enabled, volume]
  );

  useEffect(() => {
    return () => {
      stopAudioEngine();
    };
  }, [stopAudioEngine]);

  return {
    enabled,
    volume,
    toggleSound,
    setVolume,
    playSoftChime,
  };
}
