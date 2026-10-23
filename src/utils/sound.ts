// Web Audio API Sound Synthesizer for MamãeGotchi
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound(enabled?: boolean): boolean {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function playSound(type: 'click' | 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk' | 'baby' | 'fanfare' | 'warning' | 'pop') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }
      case 'pop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }
      case 'eat': {
        [0, 0.08, 0.16].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(320 + idx * 80, now + delay);
          osc.frequency.exponentialRampToValueAtTime(520 + idx * 60, now + delay + 0.06);
          gain.gain.setValueAtTime(0.14, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.07);
        });
        break;
      }
      case 'drink': {
        [0, 0.07, 0.14].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(650 - idx * 70, now + delay);
          osc.frequency.exponentialRampToValueAtTime(900 - idx * 50, now + delay + 0.05);
          gain.gain.setValueAtTime(0.15, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.06);
        });
        break;
      }
      case 'sleep': {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.1, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.28);
        });
        break;
      }
      case 'hygiene': {
        [0, 0.05, 0.1, 0.15].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(700 + idx * 120, now + delay);
          gain.gain.setValueAtTime(0.1, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.07);
        });
        break;
      }
      case 'relax': {
        const freqs = [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + idx * 0.1);
          gain.gain.setValueAtTime(0.08, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.38);
        });
        break;
      }
      case 'walk': {
        [0, 0.12].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(idx === 0 ? 300 : 360, now + delay);
          gain.gain.setValueAtTime(0.12, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
        break;
      }
      case 'baby': {
        [0, 0.1, 0.2].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800 + idx * 150, now + delay);
          osc.frequency.exponentialRampToValueAtTime(1200 + idx * 100, now + delay + 0.08);
          gain.gain.setValueAtTime(0.12, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
        break;
      }
      case 'fanfare': {
        const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.15, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.45);
        });
        break;
      }
      case 'warning': {
        [0, 0.15].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(260, now + delay);
          gain.gain.setValueAtTime(0.1, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.12);
        });
        break;
      }
    }
  } catch (e) {
    console.warn('Audio feedback failed:', e);
  }
}
