import { Status, BabyStatus, GamePhase, GameStatsRecord, AvatarConfig, AccessibilitySettings } from '../types';

export interface GameSaveState {
  version: number;
  status: Status;
  babyStatus: BabyStatus;
  week: number;
  day: number;
  phase: GamePhase;
  statsRecord: GameStatsRecord;
  avatarConfig?: AvatarConfig;
  accessibility?: AccessibilitySettings;
  dumDate?: string;
  lastUpdated: number;
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  fontSize: 'normal',
  colorMode: 'default',
  reducedMotion: false,
  ttsEnabled: false,
  ttsSpeechRate: 1.0
};

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  skinTone: 'fair',
  hairStyle: 'wavy',
  hairColor: 'brunette',
  outfit: 'rose',
  accessory: 'flower',
  backdrop: 'nursery'
};

export const INITIAL_STATUS: Status = {
  hunger: 80,
  thirst: 80,
  sleep: 80,
  happiness: 80,
  hygiene: 80,
  energy: 80,
  health: 100,
};

export const INITIAL_BABY_STATUS: BabyStatus = {
  hunger: 80,
  sleep: 80,
  hygiene: 80,
  happiness: 80,
  health: 100,
};

export const INITIAL_STATS_RECORD: GameStatsRecord = {
  actionsTaken: 0,
  eventsCompleted: 0,
  healthyChoices: 0,
  currentDay: 1,
  currentWeek: 1,
};

const STORAGE_KEY = 'mamaegotchi_save_v1';

export function saveGameState(state: GameSaveState): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
}

export function loadGameState(): GameSaveState | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.week === 'number') {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to load from localStorage', e);
  }
  return null;
}

export function clearGameState(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Failed to clear localStorage', e);
  }
}
