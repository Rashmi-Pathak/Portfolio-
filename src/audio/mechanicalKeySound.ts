"use client";

let sharedAudioCtx: AudioContext | null = null;
let lastClickMs = 0;
let lastHoverMs = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx.state === "suspended") {
    void sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Unlocks the Web Audio context cleanly on the user's very first pointer/keyboard
 * interaction so subsequent key hover & key click SFX play reliably without autoplay.
 */
export function initMechanicalAudioUnlock(): () => void {
  if (typeof window === "undefined") return () => {};
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      void ctx.resume().catch(() => {});
    }
  };
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
  return () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
}

/**
 * Subtle high-crisp mechanical micro-switch tick when pointer glides onto a key.
 * Only plays once the AudioContext is unlocked by a prior user gesture and enforces
 * a 55ms cooldown so fast mouse sweeps never buzz or stack.
 */
export function playMechanicalHoverClick(muted: boolean): void {
  if (muted) return;

  const nowMs = performance.now();
  if (nowMs - lastHoverMs < 55) return;
  lastHoverMs = nowMs;

  if (!sharedAudioCtx || sharedAudioCtx.state !== "running") return;
  const ctx = sharedAudioCtx;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1180, now);
  osc.frequency.exponentialRampToValueAtTime(340, now + 0.014);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.04, now + 0.0015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.02);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

/**
 * Tactile mechanical key press sound (warm keycap "thock" + crisp stem contact click)
 * with a 60ms cooldown so rapid clicks stay clean.
 */
export function playMechanicalKeyPress(muted: boolean): void {
  if (muted) return;

  const nowMs = performance.now();
  if (nowMs - lastClickMs < 60) return;
  lastClickMs = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const thockOsc = ctx.createOscillator();
  const thockGain = ctx.createGain();
  thockOsc.type = "triangle";
  thockOsc.frequency.setValueAtTime(195, now);
  thockOsc.frequency.exponentialRampToValueAtTime(76, now + 0.044);

  thockGain.gain.setValueAtTime(0.0001, now);
  thockGain.gain.linearRampToValueAtTime(0.15, now + 0.004);
  thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.058);

  thockOsc.connect(thockGain);
  thockGain.connect(ctx.destination);
  thockOsc.start(now);
  thockOsc.stop(now + 0.062);

  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "sine";
  clickOsc.frequency.setValueAtTime(1520, now);
  clickOsc.frequency.exponentialRampToValueAtTime(430, now + 0.016);

  clickGain.gain.setValueAtTime(0.0001, now);
  clickGain.gain.linearRampToValueAtTime(0.065, now + 0.0015);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(now);
  clickOsc.stop(now + 0.026);

  thockOsc.onended = () => {
    thockOsc.disconnect();
    thockGain.disconnect();
  };
  clickOsc.onended = () => {
    clickOsc.disconnect();
    clickGain.disconnect();
  };
}

export function disposeMechanicalAudio(): void {
  if (sharedAudioCtx) {
    void sharedAudioCtx.close().catch(() => {});
    sharedAudioCtx = null;
  }
}
