export interface AvatarConfig {
  skinTone: 'fair' | 'tan' | 'rich' | 'deep';
  hairStyle: 'wavy' | 'bun' | 'braids' | 'bob' | 'curls';
  hairColor: 'brunette' | 'blonde' | 'black' | 'red' | 'caramel';
  outfit: 'rose' | 'lavender' | 'sage' | 'sky' | 'terracotta' | 'pajama';
  accessory: 'flower' | 'headband' | 'bow' | 'glasses' | 'none';
  backdrop: 'nursery' | 'garden' | 'night' | 'minimal';
}

export interface Status {
  hunger: number;     // Fome (0-100)
  thirst: number;     // Sede (0-100)
  sleep: number;      // Sono/Descanso (0-100)
  happiness: number;  // Felicidade/Bem-estar (0-100)
  hygiene: number;    // Higiene/Autocuidado (0-100)
  energy: number;     // Energia/Disposição (0-100)
  health: number;     // Saúde Geral (0-100, indicador agregado)
}

export interface BabyStatus {
  hunger: number;     // Fome do bebê (0-100)
  sleep: number;      // Sono do bebê (0-100)
  hygiene: number;    // Higiene/Fralda (0-100)
  happiness: number;  // Conforto/Afeto (0-100)
  health: number;     // Saúde do bebê (0-100)
}

export type GamePhase = 'PREGNANCY' | 'POSTPARTUM';

export interface BabyInfo {
  week: number;
  size: string;
  weight: string;
  comparison: string;
  emoji: string;
  milestones: string[];
  trimester: 1 | 2 | 3;
  funFact: string;
}

export interface PostpartumWeekInfo {
  week: number;
  title: string;
  babyDevelopment: string;
  motherRecovery: string;
  milestones: string[];
}

export interface StatusImpact extends Partial<Status> {
  babyHunger?: number;
  babySleep?: number;
  babyHygiene?: number;
  babyHappiness?: number;
  babyHealth?: number;
}

export interface GameEventOption {
  id: string;
  label: string;
  description?: string;
  impact: StatusImpact;
  feedback: string;
  scientificFact: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk' | 'baby_feed' | 'baby_sleep' | 'baby_diaper' | 'baby_comfort';
  options: GameEventOption[];
  imageEmoji?: string;
  isEmergency?: boolean;
}

export interface WeeklyFocus {
  week: number;
  title: string;
  description: string;
  options: GameEventOption[];
}

export interface GameStatsRecord {
  actionsTaken: number;
  eventsCompleted: number;
  healthyChoices: number;
  currentDay: number;
  currentWeek: number;
  dumDate?: string;
}

export type FontSizeSetting = 'normal' | 'large' | 'extra-large';
export type ColorModeSetting = 'default' | 'high-contrast' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome';

export interface AccessibilitySettings {
  fontSize: FontSizeSetting;
  colorMode: ColorModeSetting;
  reducedMotion: boolean;
  ttsEnabled: boolean;
  ttsSpeechRate: number;
}
