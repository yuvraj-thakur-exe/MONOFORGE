'use client';

/**
 * Lightweight, zero-dependency Web Audio API synthesizer.
 * Generates futuristic sci-fi sound effects, chimes, clicks, and celebrations.
 * Automatically checks for browser support and mute preferences.
 */

const STORAGE_KEY = 'monoforge_sound_enabled';

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === null ? true : stored === 'true';
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, String(enabled));
}

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Play a synthesized tone or chord
 */
export function playTone(
  freq = 880,
  type: OscillatorType = 'sine',
  duration = 0.12,
  volume = 0.06
): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio permission or context errors
  }
}

/**
 * Futuristic Welcome Chord (played upon initial loading completion)
 */
export function playWelcomeChord(): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 major chord
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 'sine', 0.25, 0.04);
      }, idx * 60);
    });
  } catch {
    // Ignore
  }
}

/**
 * Tactile button click chime
 */
export function playClickSound(): void {
  playTone(1200, 'sine', 0.06, 0.04);
}

/**
 * Celebratory banana munch chime
 */
export function playBananaSound(): void {
  playTone(987.77, 'triangle', 0.15, 0.08); // B5
  setTimeout(() => {
    playTone(1318.51, 'triangle', 0.2, 0.07); // E6
  }, 90);
}

/**
 * Cyber terminal hack chirp
 */
export function playHackChirp(): void {
  playTone(440, 'sawtooth', 0.08, 0.03);
  setTimeout(() => {
    playTone(880, 'sawtooth', 0.1, 0.03);
  }, 60);
}

/**
 * Advice chime
 */
export function playAdviceChime(): void {
  playTone(784, 'sine', 0.18, 0.05);
  setTimeout(() => {
    playTone(987.77, 'sine', 0.22, 0.05);
  }, 100);
}
