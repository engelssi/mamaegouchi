import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Status, 
  BabyStatus, 
  GamePhase, 
  GameEvent, 
  GameEventOption, 
  GameStatsRecord,
  AvatarConfig,
  AccessibilitySettings
} from './types';
import { 
  INITIAL_STATUS, 
  INITIAL_BABY_STATUS, 
  INITIAL_STATS_RECORD, 
  DEFAULT_AVATAR_CONFIG,
  DEFAULT_ACCESSIBILITY_SETTINGS,
  saveGameState, 
  loadGameState, 
  clearGameState 
} from './utils/storage';
import { getBabyInfoForWeek, POSTPARTUM_DATA } from './constants/pregnancyData';
import { generateEvent } from './constants/eventGenerators';
import { playSound } from './utils/sound';

import { AccessibilityBar } from './components/AccessibilityBar';
import { AccessibilityFilters } from './components/AccessibilityFilters';
import { Header } from './components/Header';
import { MotherAvatar } from './components/MotherAvatar';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';
import { StatsBar } from './components/StatsBar';
import { ActionButton } from './components/ActionButton';
import { BabyPanel } from './components/BabyPanel';
import { EventModal } from './components/EventModal';
import { MilestoneModal } from './components/MilestoneModal';
import { GameOverModal } from './components/GameOverModal';
import { AboutModal } from './components/AboutModal';
import { DumSelectorModal } from './components/DumSelectorModal';
import { ManualModal } from './components/ManualModal';
import { EvaluationModal } from './components/EvaluationModal';

import { 
  Heart, 
  Utensils, 
  Droplets, 
  Moon, 
  Smile, 
  Sparkles, 
  Bath, 
  Zap, 
  Footprints, 
  Baby, 
  ShieldAlert, 
  TrendingUp,
  Info,
  BookOpen
} from 'lucide-react';

export default function App() {
  // Load saved state or default
  const [savedData] = useState(() => loadGameState());

  const [status, setStatus] = useState<Status>(savedData?.status || INITIAL_STATUS);
  const [babyStatus, setBabyStatus] = useState<BabyStatus>(savedData?.babyStatus || INITIAL_BABY_STATUS);
  const [week, setWeek] = useState<number>(savedData?.week || 1);
  const [day, setDay] = useState<number>(savedData?.day || 1);
  const [phase, setPhase] = useState<GamePhase>(savedData?.phase || 'PREGNANCY');
  const [statsRecord, setStatsRecord] = useState<GameStatsRecord>(savedData?.statsRecord || INITIAL_STATS_RECORD);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(savedData?.avatarConfig || DEFAULT_AVATAR_CONFIG);
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(
    savedData?.accessibility || DEFAULT_ACCESSIBILITY_SETTINGS
  );

  // Modal and animation states
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [showMilestone, setShowMilestone] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<{ isVictory: boolean } | null>(null);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualTab, setManualTab] = useState<'user' | 'dev'>('user');
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState<boolean>(false);
  const [showDumModal, setShowDumModal] = useState<boolean>(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState<boolean>(false);

  const handleOpenManual = (tab: 'user' | 'dev' = 'user') => {
    setManualTab(tab);
    setShowManualModal(true);
  };

  // Time & Simulation controls
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(1);
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const [floatingText, setFloatingText] = useState<string | null>(null);

  const animationTimeoutRef = useRef<number | null>(null);

  // Auto-save on meaningful updates
  useEffect(() => {
    saveGameState({
      version: 1,
      status,
      babyStatus,
      week,
      day,
      phase,
      statsRecord,
      avatarConfig,
      accessibility,
      lastUpdated: Date.now()
    });
  }, [status, babyStatus, week, day, phase, statsRecord, avatarConfig, accessibility]);

  // Check Game Over Condition
  useEffect(() => {
    if (status.health <= 0 && !gameOver) {
      setGameOver({ isVictory: false });
    }
  }, [status.health, gameOver]);

  // 1. Natural Decay Engine (runs every 5000ms / gameSpeed)
  useEffect(() => {
    if (isPaused || gameOver) return;

    const intervalTime = Math.max(800, 5000 / gameSpeed);
    const decayTimer = setInterval(() => {
      setStatus((prev) => {
        // Mother natural decay
        const hungerDecay = 0.5;
        const thirstDecay = 0.8;
        const sleepDecay = 0.3;
        const energyDecay = 0.4;
        const happinessDecay = 0.2;
        const hygieneDecay = 0.3;

        const newHunger = Math.max(0, prev.hunger - hungerDecay);
        const newThirst = Math.max(0, prev.thirst - thirstDecay);
        const newSleep = Math.max(0, prev.sleep - sleepDecay);
        const newEnergy = Math.max(0, prev.energy - energyDecay);
        const newHappiness = Math.max(0, prev.happiness - happinessDecay);
        const newHygiene = Math.max(0, prev.hygiene - hygieneDecay);

        // Health damage or regeneration
        let newHealth = prev.health;
        if (newHunger < 20 || newThirst < 20 || newSleep < 20) {
          newHealth = Math.max(0, prev.health - 1.0);
        } else if (newHunger >= 40 && newThirst >= 40 && newSleep >= 40 && newHappiness >= 40) {
          newHealth = Math.min(100, prev.health + 0.2);
        }

        return {
          hunger: Number(newHunger.toFixed(1)),
          thirst: Number(newThirst.toFixed(1)),
          sleep: Number(newSleep.toFixed(1)),
          energy: Number(newEnergy.toFixed(1)),
          happiness: Number(newHappiness.toFixed(1)),
          hygiene: Number(newHygiene.toFixed(1)),
          health: Number(newHealth.toFixed(1))
        };
      });

      // Baby natural decay during postpartum phase
      if (phase === 'POSTPARTUM') {
        setBabyStatus((prev) => {
          const babyHunger = Math.max(0, prev.hunger - 0.7);
          const babySleep = Math.max(0, prev.sleep - 0.4);
          const babyHygiene = Math.max(0, prev.hygiene - 0.6);
          const babyHappiness = Math.max(0, prev.happiness - 0.3);

          let babyHealth = prev.health;
          if (babyHunger < 20 || babyHygiene < 20) {
            babyHealth = Math.max(0, prev.health - 1.0);
          } else if (babyHunger >= 40 && babyHygiene >= 40 && babySleep >= 40) {
            babyHealth = Math.min(100, prev.health + 0.25);
          }

          return {
            hunger: Number(babyHunger.toFixed(1)),
            sleep: Number(babySleep.toFixed(1)),
            hygiene: Number(babyHygiene.toFixed(1)),
            happiness: Number(babyHappiness.toFixed(1)),
            health: Number(babyHealth.toFixed(1))
          };
        });
      }
    }, intervalTime);

    return () => clearInterval(decayTimer);
  }, [isPaused, gameOver, gameSpeed, phase]);

  // 2. Day Progression Engine (runs every 15000ms / gameSpeed)
  useEffect(() => {
    if (isPaused || gameOver) return;

    const dayIntervalTime = Math.max(2000, 15000 / gameSpeed);
    const dayTimer = setInterval(() => {
      setDay((prevDay) => {
        if (prevDay < 7) {
          return prevDay + 1;
        }
        // At day 7, it stays at 7 awaiting player's advance to celebrate milestone!
        return 7;
      });
    }, dayIntervalTime);

    return () => clearInterval(dayTimer);
  }, [isPaused, gameOver, gameSpeed]);

  // Open an educational action event modal
  const handleOpenAction = useCallback((category: 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk' | 'baby_feed' | 'baby_sleep' | 'baby_diaper' | 'baby_comfort') => {
    const event = generateEvent(category, week, phase, status, babyStatus);
    setActiveEvent(event);
  }, [week, phase, status, babyStatus]);

  // Apply chosen decision outcome
  const handleSelectOption = (option: GameEventOption) => {
    // 1. Update Mother Status
    setStatus((prev) => {
      const clamp = (val: number) => Math.min(100, Math.max(0, Math.round(val)));
      return {
        hunger: clamp(prev.hunger + (option.impact.hunger || 0)),
        thirst: clamp(prev.thirst + (option.impact.thirst || 0)),
        sleep: clamp(prev.sleep + (option.impact.sleep || 0)),
        happiness: clamp(prev.happiness + (option.impact.happiness || 0)),
        hygiene: clamp(prev.hygiene + (option.impact.hygiene || 0)),
        energy: clamp(prev.energy + (option.impact.energy || 0)),
        health: clamp(prev.health + (option.impact.health || 0))
      };
    });

    // 2. Update Baby Status (if postpartum action or hybrid impact)
    if (phase === 'POSTPARTUM') {
      setBabyStatus((prev) => {
        const clamp = (val: number) => Math.min(100, Math.max(0, Math.round(val)));
        return {
          hunger: clamp(prev.hunger + (option.impact.babyHunger || 0)),
          sleep: clamp(prev.sleep + (option.impact.babySleep || 0)),
          hygiene: clamp(prev.hygiene + (option.impact.babyHygiene || 0)),
          happiness: clamp(prev.happiness + (option.impact.babyHappiness || 0)),
          health: clamp(prev.health + (option.impact.babyHealth || 0))
        };
      });
    }

    // 3. Set Action Reaction Animation & Floating Particle
    const category = activeEvent?.category || 'eat';
    setActiveAnimation(category);

    const feedbackEmojis: Record<string, string> = {
      eat: '🥗 +Nutrição Mamãe',
      drink: '💧 +Hidratação Mamãe',
      sleep: '💤 +Descanso Mamãe',
      hygiene: '🧼 +Autocuidado Mamãe',
      relax: '🌸 +Ocitocina Mamãe',
      walk: '👟 +Disposição Mamãe',
      baby_feed: '🤱 +Nutrição do Bebê',
      baby_sleep: '🌙 +Sono do Bebê',
      baby_diaper: '👶 +Fralda do Bebê',
      baby_comfort: '🧸 +Afeto & Colo'
    };
    setFloatingText(feedbackEmojis[category] || '✨ Bem-estar');

    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = window.setTimeout(() => {
      setActiveAnimation(null);
      setFloatingText(null);
    }, 2400);

    // 4. Update Game Records
    const isHealthy = (option.impact.health && option.impact.health > 0) || (option.impact.happiness && option.impact.happiness > 5);
    setStatsRecord((prev) => ({
      ...prev,
      actionsTaken: prev.actionsTaken + 1,
      eventsCompleted: prev.eventsCompleted + 1,
      healthyChoices: isHealthy ? prev.healthyChoices + 1 : prev.healthyChoices,
      currentDay: day,
      currentWeek: week
    }));

    setActiveEvent(null);
  };

  // Advance week manually or after day 7
  const handleAdvanceWeek = () => {
    if (phase === 'PREGNANCY') {
      if (week < 40) {
        setWeek((w) => w + 1);
        setDay(1);
        setShowMilestone(true);
      } else {
        // Week 40 -> Transition to Postpartum!
        setPhase('POSTPARTUM');
        setWeek(1);
        setDay(1);
        setShowMilestone(true);
      }
    } else {
      // Postpartum Phase (Weeks 1 to 8)
      if (week < 8) {
        setWeek((w) => w + 1);
        setDay(1);
        setShowMilestone(true);
      } else {
        // Completed 8 weeks of Postpartum -> Victory!
        setGameOver({ isVictory: true });
      }
    }
  };

  // Apply starting week or week calculated from DUM
  const handleApplyWeekAndDum = (targetWeek: number, targetPhase: GamePhase, dumDate?: string) => {
    setWeek(targetWeek);
    setDay(1);
    setPhase(targetPhase);
    
    // Set healthy baseline stats when starting or jumping
    setStatus((prev) => ({
      ...prev,
      hunger: Math.max(70, prev.hunger),
      thirst: Math.max(70, prev.thirst),
      sleep: Math.max(70, prev.sleep),
      energy: Math.max(70, prev.energy),
      happiness: Math.max(70, prev.happiness),
      health: Math.max(80, prev.health)
    }));

    if (targetPhase === 'POSTPARTUM') {
      setBabyStatus((prev) => ({
        ...prev,
        hunger: Math.max(70, prev.hunger),
        sleep: Math.max(70, prev.sleep),
        hygiene: Math.max(70, prev.hygiene),
        happiness: Math.max(70, prev.happiness),
        health: Math.max(85, prev.health)
      }));
    }

    setStatsRecord((prev) => ({
      ...prev,
      currentWeek: targetWeek,
      currentDay: 1,
      dumDate: dumDate || prev.dumDate
    }));

    setShowDumModal(false);
    setShowMilestone(true);
  };

  // Reset / New Game
  const handleResetGame = () => {
    clearGameState();
    setStatus(INITIAL_STATUS);
    setBabyStatus(INITIAL_BABY_STATUS);
    setWeek(1);
    setDay(1);
    setPhase('PREGNANCY');
    setStatsRecord(INITIAL_STATS_RECORD);
    setActiveEvent(null);
    setShowMilestone(false);
    setGameOver(null);
    playSound('pop');
  };

  const [pendingRestart, setPendingRestart] = useState<boolean>(false);

  const handleGameOverRestart = () => {
    setGameOver(null);
    setPendingRestart(true);
    setShowEvaluationModal(true);
  };

  const handleCloseEvaluation = () => {
    setShowEvaluationModal(false);
    if (pendingRestart) {
      setPendingRestart(false);
      handleResetGame();
    }
  };

  // Interactive Belly / Baby Tap (Carinho & Ocitocina)
  const handleBellyTap = () => {
    setStatus((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 2),
      energy: Math.min(100, prev.energy + 1)
    }));
    if (phase === 'POSTPARTUM') {
      setBabyStatus((prev) => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 3)
      }));
    }
  };

  const currentBabyInfo = getBabyInfoForWeek(week);
  const currentPostpartumInfo = POSTPARTUM_DATA[week];

  // Accessibility screen summary narration string
  const screenSummaryText = `Simulador MamãeGotchi. ${
    phase === 'PREGNANCY' ? 'Fase de Gestação' : 'Fase de Puerpério'
  }, Semana ${week}, Dia ${day} de 7. Saúde materna em ${Math.round(status.health)} por cento. Indicadores da mãe: Nutrição ${Math.round(status.hunger)} por cento, Hidratação ${Math.round(status.thirst)} por cento, Descanso ${Math.round(status.sleep)} por cento, Bem-estar ${Math.round(status.happiness)} por cento. ${
    phase === 'POSTPARTUM'
      ? `Indicadores do bebê: Nutrição ${Math.round(babyStatus.hunger)} por cento, Sono ${Math.round(babyStatus.sleep)} por cento, Fralda e higiene ${Math.round(babyStatus.hygiene)} por cento, Afeto ${Math.round(babyStatus.happiness)} por cento.`
      : `Desenvolvimento do feto: ${currentBabyInfo.comparison}.`
  }`;

  return (
    <div 
      id="app-root"
      className={`min-h-screen flex flex-col selection:bg-rose-200 transition-colors duration-150 ${
        accessibility.fontSize === 'large'
          ? 'font-size-large'
          : accessibility.fontSize === 'extra-large'
          ? 'font-size-extra-large'
          : 'font-size-normal'
      } ${
        accessibility.colorMode !== 'default'
          ? `theme-${accessibility.colorMode}`
          : 'bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-slate-50'
      } ${accessibility.reducedMotion ? 'reduced-motion' : ''}`}
    >
      {/* Invisible Colorblind SVG Filters for CSS url(#id) bindings */}
      <AccessibilityFilters />

      {/* Accessibility Bar at top */}
      <AccessibilityBar
        settings={accessibility}
        onUpdateSettings={(newSettings) =>
          setAccessibility((prev) => ({ ...prev, ...newSettings }))
        }
        currentSummaryText={screenSummaryText}
      />

      {/* 1. Header with Controls & Progress */}
      <Header
        phase={phase}
        week={week}
        day={day}
        isPaused={isPaused}
        gameSpeed={gameSpeed}
        onTogglePause={() => {
          setIsPaused((p) => !p);
          playSound('click');
        }}
        onChangeSpeed={(spd) => {
          setGameSpeed(spd);
          playSound('click');
        }}
        onAdvanceWeek={handleAdvanceWeek}
        onOpenAbout={() => setShowAbout(true)}
        onOpenManual={handleOpenManual}
        onOpenDumModal={() => setShowDumModal(true)}
        onOpenEvaluation={() => setShowEvaluationModal(true)}
        onResetGame={handleResetGame}
      />

      {/* 2. Main Simulation Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 flex flex-col gap-6">
        
        {/* Critical Health Warning Banner */}
        {status.health <= 30 && !gameOver && (
          <div className="p-3.5 rounded-2xl bg-rose-500 text-white flex items-center justify-between shadow-lg animate-pulse">
            <div className="flex items-center gap-2 text-xs font-bold">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>Saúde Crítica ({Math.round(status.health)}%): Alimente-se, beba água e descanse imediatamente para evitar esgotamento!</span>
            </div>
            <button
              onClick={() => handleOpenAction('eat')}
              className="px-3 py-1 bg-white text-rose-600 rounded-xl font-black text-xs hover:bg-rose-50 cursor-pointer shadow-sm shrink-0"
            >
              Cuidar Agora
            </button>
          </div>
        )}

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Mother Vital Status (3 cols on desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
            <div className="bg-white rounded-3xl p-5 border border-rose-200/80 shadow-sm flex flex-col gap-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-rose-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 text-base leading-tight">
                      Sinais Vitais da Mãe
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">
                      Equilíbrio & Bem-Estar Diário
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{status.health > 70 ? 'Estável' : 'Atenção'}</span>
                </div>
              </div>

              {/* Status Bars List */}
              <div className="space-y-3">
                {/* Aggregate Health */}
                <StatsBar
                  id="stat-health"
                  label="Saúde Geral (Indicador Agregado)"
                  value={status.health}
                  icon={<Heart className="w-4 h-4 text-rose-500 fill-rose-500" />}
                  colorClass="bg-gradient-to-r from-rose-500 via-pink-500 to-emerald-500"
                  bgClass="bg-rose-100 text-rose-700"
                  critical={true}
                />

                {/* Hunger */}
                <StatsBar
                  id="stat-hunger"
                  label="Nutrição / Saciedade"
                  value={status.hunger}
                  icon={<Utensils className="w-4 h-4" />}
                  colorClass="bg-gradient-to-r from-amber-400 to-emerald-500"
                  bgClass="bg-amber-100 text-amber-700"
                />

                {/* Thirst */}
                <StatsBar
                  id="stat-thirst"
                  label="Hidratação / Sede"
                  value={status.thirst}
                  icon={<Droplets className="w-4 h-4" />}
                  colorClass="bg-gradient-to-r from-teal-400 to-teal-500"
                  bgClass="bg-teal-100 text-teal-700"
                />

                {/* Sleep */}
                <StatsBar
                  id="stat-sleep"
                  label="Sono & Repouso"
                  value={status.sleep}
                  icon={<Moon className="w-4 h-4" />}
                  colorClass="bg-gradient-to-r from-indigo-400 to-purple-500"
                  bgClass="bg-indigo-100 text-indigo-700"
                />

                {/* Energy */}
                <StatsBar
                  id="stat-energy"
                  label="Energia & Disposição"
                  value={status.energy}
                  icon={<Zap className="w-4 h-4" />}
                  colorClass="bg-gradient-to-r from-yellow-400 to-amber-500"
                  bgClass="bg-yellow-100 text-yellow-700"
                />

                {/* Happiness */}
                <StatsBar
                  id="stat-happiness"
                  label="Saúde Mental & Bem-Estar"
                  value={status.happiness}
                  icon={<Smile className="w-4 h-4" />}
                  colorClass="bg-gradient-to-r from-pink-400 to-rose-500"
                  bgClass="bg-pink-100 text-pink-700"
                />

                {/* Hygiene */}
                <StatsBar
                  id="stat-hygiene"
                  label="Higiene & Autocuidado"
                  value={status.hygiene}
                  icon={<Bath className="w-4 h-4" />}
                  colorClass="bg-gradient-to-r from-teal-400 to-emerald-500"
                  bgClass="bg-teal-100 text-teal-700"
                />
              </div>

              {/* Clinical Care Hint */}
              <div className="mt-1 p-3 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-2.5 text-xs text-rose-900">
                <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Dica de Saúde:</strong> Manter a sede, fome e descanso acima de 30% protege a saúde materna e evita perda de pontos de saúde contínua.
                </p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Mother Avatar flanked by Care Buttons at same height (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Visual Avatar Card with Integrated Flanking Care Actions */}
            <MotherAvatar
              status={status}
              week={week}
              phase={phase}
              activeAnimation={activeAnimation}
              floatingText={floatingText}
              avatarConfig={avatarConfig}
              onOpenCustomizer={() => setShowAvatarCustomizer(true)}
              onBellyTap={handleBellyTap}
              onOpenAction={handleOpenAction}
            />
          </div>

          {/* RIGHT COLUMN: Fetal Development / Postpartum Baby Panel (3 cols on desktop) */}
          <div className="lg:col-span-3 flex flex-col">
            <BabyPanel
              phase={phase}
              week={week}
              babyInfo={currentBabyInfo}
              postpartumInfo={currentPostpartumInfo}
              babyStatus={babyStatus}
              onBabyAction={handleOpenAction}
              onOpenDumModal={() => setShowDumModal(true)}
              dumDate={statsRecord.dumDate}
            />
          </div>

        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-white/80 border-t border-rose-100 py-3 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>MamãeGotchi</strong> — Iniciação Tecnológica e Inovação em Saúde Materna (UNCISAL / PROPEP Edital 01/2026 PIBITI)
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenManual('user')}
              className="text-indigo-600 hover:underline font-semibold cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Manuais (Usuário & Dev)</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setShowAbout(true)}
              className="text-rose-600 hover:underline font-semibold cursor-pointer"
            >
              Protocolos & Referências Clínicas
            </button>
            <span className="text-slate-300">•</span>
            <span>Evidências MS/SUS & FEBRASGO</span>
          </div>
        </div>
      </footer>

      {/* 4. Modals */}
      {/* Event Decision Modal */}
      {activeEvent && (
        <EventModal
          event={activeEvent}
          accessibilitySettings={accessibility}
          onSelectOption={handleSelectOption}
          onClose={() => setActiveEvent(null)}
        />
      )}

      {/* Weekly Milestone Transition Celebration Modal */}
      {showMilestone && (
        <MilestoneModal
          phase={phase}
          week={week}
          babyInfo={currentBabyInfo}
          postpartumInfo={currentPostpartumInfo}
          onAdvance={() => setShowMilestone(false)}
        />
      )}

      {/* DUM (Data da Última Menstruação) & Week Selection Modal */}
      {showDumModal && (
        <DumSelectorModal
          isOpen={showDumModal}
          currentWeek={week}
          currentPhase={phase}
          savedDumDate={statsRecord.dumDate}
          accessibilitySettings={accessibility}
          onClose={() => setShowDumModal(false)}
          onApplyWeekAndDum={handleApplyWeekAndDum}
        />
      )}

      {/* Game Over / Victory Modal */}
      {gameOver && (
        <GameOverModal
          isVictory={gameOver.isVictory}
          statsRecord={statsRecord}
          onRestart={handleGameOverRestart}
        />
      )}

      {/* User Experience & Scientific Research Evaluation Modal */}
      {showEvaluationModal && (
        <EvaluationModal
          isOpen={showEvaluationModal}
          onClose={handleCloseEvaluation}
          week={week}
          phase={phase}
          healthyChoices={statsRecord.healthyChoices}
          actionsTaken={statsRecord.actionsTaken}
          isPostGame={pendingRestart}
        />
      )}

      {/* About & Institutional Guidelines Modal */}
      {showAbout && (
        <AboutModal 
          onClose={() => setShowAbout(false)} 
          onOpenManual={handleOpenManual}
        />
      )}

      {/* User and Developer Interactive Manuals Modal */}
      {showManualModal && (
        <ManualModal
          initialTab={manualTab}
          onClose={() => setShowManualModal(false)}
        />
      )}

      {/* Avatar Customizer Wardrobe & Styling Modal */}
      {showAvatarCustomizer && (
        <AvatarCustomizerModal
          config={avatarConfig}
          onChangeConfig={(newCfg) => setAvatarConfig(newCfg)}
          onClose={() => setShowAvatarCustomizer(false)}
        />
      )}

    </div>
  );
}
