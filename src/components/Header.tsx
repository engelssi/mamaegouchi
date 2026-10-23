import React, { useState, useEffect } from 'react';
import { GamePhase } from '../types';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  FastForward, 
  Info, 
  RotateCcw, 
  Calendar, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  SlidersHorizontal,
  BookOpen,
  Star
} from 'lucide-react';
import { toggleSound, isSoundEnabled, playSound } from '../utils/sound';

interface HeaderProps {
  phase: GamePhase;
  week: number;
  day: number;
  isPaused: boolean;
  gameSpeed: number;
  onTogglePause: () => void;
  onChangeSpeed: (speed: number) => void;
  onAdvanceWeek: () => void;
  onOpenAbout: () => void;
  onOpenManual: (tab?: 'user' | 'dev') => void;
  onOpenDumModal: () => void;
  onOpenEvaluation?: () => void;
  onResetGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  phase,
  week,
  day,
  isPaused,
  gameSpeed,
  onTogglePause,
  onChangeSpeed,
  onAdvanceWeek,
  onOpenAbout,
  onOpenManual,
  onOpenDumModal,
  onOpenEvaluation,
  onResetGame
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playSound('click');
  };

  const dayProgress = ((day - 1) / 7) * 100;
  const isDay7 = day >= 7;

  // Compact single-line mode when scrolled down (unless user expanded)
  const isCompactMode = isScrolled && !isExpanded;

  return (
    <header className="w-full max-w-full bg-white/95 backdrop-blur-md border-b border-rose-200/80 sticky top-0 z-40 shadow-xs transition-all duration-200 overflow-x-hidden box-border">
      {isCompactMode ? (
        /* ================= COMPACT SCROLLED VIEW (Single Clean Row) ================= */
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-2 w-full box-border">
          {/* Left: 🌸 MamãeGotchi - Always clear, complete, and vertically comfortable */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-sm shadow-rose-200 font-bold text-sm sm:text-base shrink-0">
              🌸
            </div>
            <h1 className="font-semibold brand-font text-rose-600 tracking-tight leading-normal whitespace-nowrap pt-0.5 text-base sm:text-xl">
              MamãeGotchi
            </h1>
          </div>

          {/* Right: Sem. {week} + Expand Button - Sized to never overflow */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Week Pill (clickable to open DUM/Week calculator) */}
            <button
              onClick={onOpenDumModal}
              title="Calcular Idade Gestacional ou Escolher Semana"
              className="flex items-center gap-1 px-2 py-1 rounded-lg sm:rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-[11px] sm:text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 shrink-0" />
              <span>Sem. {week}</span>
            </button>

            {/* Expand Controls Button */}
            <button
              onClick={() => {
                setIsExpanded(true);
                playSound('click');
              }}
              title="Expandir controles completos do simulador"
              className="flex items-center gap-1 px-2 py-1 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] sm:text-xs font-bold border border-slate-200 shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600 shrink-0" />
              <span className="hidden xs:inline">Expandir</span>
              <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
            </button>
          </div>
        </div>
      ) : (
        /* ================= FULL HEADER VIEW ================= */
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 w-full box-border">
          {/* Top / Left Bar: Brand Logo, Title & Phase Badge + Quick Utility Icons */}
          <div className="flex items-center justify-between w-full md:w-auto gap-1.5 sm:gap-2 shrink-0">
            {/* Logo & Title */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-sm shadow-rose-200 font-bold transition-all shrink-0 text-base sm:text-lg">
                🌸
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-semibold brand-font text-rose-600 tracking-tight leading-normal whitespace-nowrap pt-0.5 text-lg sm:text-2xl">
                    MamãeGotchi
                  </h1>
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200/60 hidden sm:inline-block shrink-0">
                    UNCISAL • PIBITI
                  </span>
                </div>
              </div>
            </div>

            {/* Right side on mobile / top bar: Phase Badge, Collapse Toggle (if scrolled), and Utilities */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Collapse button if user manually expanded while scrolled */}
              {isScrolled && isExpanded && (
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    playSound('click');
                  }}
                  title="Recolher para barra compacta"
                  className="flex items-center gap-0.5 px-2 py-1 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] sm:text-xs font-bold border border-slate-200 cursor-pointer shrink-0"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Recolher</span>
                </button>
              )}

              {/* Phase Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 border border-rose-200 text-rose-900 font-bold text-[10px] sm:text-xs shadow-2xs shrink-0">
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                <span>{phase === 'PREGNANCY' ? 'Gestação' : 'Puerpério'}</span>
              </div>

              {/* Sound Mute/Unmute */}
              <button
                id="control-sound"
                onClick={handleSoundToggle}
                title={soundOn ? 'Desativar Sons' : 'Ativar Sons'}
                className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 transition-all cursor-pointer shrink-0"
              >
                {soundOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />}
              </button>

              {/* About / Institutional Info */}
              <button
                id="control-about"
                onClick={onOpenAbout}
                title="Sobre o Projeto & Guia de Cuidados"
                className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 transition-all cursor-pointer flex items-center gap-1 text-[10px] sm:text-xs font-bold shrink-0"
              >
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">Sobre</span>
              </button>

              {/* User and Developer Manuals */}
              <button
                id="control-manuals"
                onClick={() => onOpenManual('user')}
                title="Manuais do Usuário e do Desenvolvedor"
                className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition-all cursor-pointer flex items-center gap-1 text-[10px] sm:text-xs font-bold shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                <span className="hidden xs:inline sm:inline">Manuais</span>
              </button>

              {/* Research Rating / Evaluation */}
              {onOpenEvaluation && (
                <button
                  id="control-evaluation"
                  onClick={onOpenEvaluation}
                  title="Avaliar o Jogo para a Pesquisa da UNCISAL"
                  className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 transition-all cursor-pointer flex items-center gap-1 text-[10px] sm:text-xs font-bold shrink-0"
                >
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                  <span className="hidden xs:inline sm:inline">Avaliar</span>
                </button>
              )}

              {/* Reset / New Game */}
              <button
                id="control-reset"
                onClick={() => setShowResetConfirm(true)}
                title="Reiniciar Simulação"
                className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-rose-50 border border-slate-200 text-slate-400 hover:text-rose-600 transition-all cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Center / Row 2: Simulation Controls, Week, Progress & Advance */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-center gap-1.5 sm:gap-2.5 bg-slate-50 p-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-inner w-full md:w-auto box-border">
            {/* Clickable Week & Day Indicator */}
            <button
              id="btn-open-dum-indicator"
              onClick={onOpenDumModal}
              title="Calcular Idade Gestacional por DUM ou Mudar Semana"
              className="flex items-center gap-1.5 p-1 rounded-lg sm:rounded-xl hover:bg-white transition-all text-left cursor-pointer group bg-white/80 sm:bg-transparent border border-slate-100 sm:border-transparent shadow-2xs sm:shadow-none min-w-0"
            >
              <div className="p-1 sm:p-1.5 rounded-lg bg-white group-hover:bg-rose-50 text-rose-600 border border-slate-200 group-hover:border-rose-300 shadow-xs transition-colors shrink-0">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold text-slate-800 flex items-center gap-1 sm:gap-1.5 group-hover:text-rose-600 transition-colors whitespace-nowrap">
                  <span>Semana {week}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">Dia {day}/7</span>
                </div>
                {/* Day Progress Mini Bar */}
                <div className="w-16 sm:w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-0.5 sm:mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${dayProgress}%` }}
                  />
                </div>
              </div>
            </button>

            {/* Action buttons group: DUM / Semana + Próx. Sem. */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Dedicated DUM / Choose Week Button */}
              <button
                id="btn-open-dum-modal"
                onClick={onOpenDumModal}
                title="Calcular por DUM (Data da Última Menstruação) ou Escolher Semana"
                className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-rose-50 border border-rose-200 hover:border-rose-300 text-rose-700 text-[11px] sm:text-xs font-bold shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <span>📅 DUM</span>
              </button>

              {/* Advance Week Button */}
              <button
                id="btn-advance-week-top"
                onClick={onAdvanceWeek}
                className={`flex items-center justify-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 ${
                  isDay7
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-bounce shadow-md shadow-rose-200'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{isDay7 ? 'Avançar 🎉' : 'Próx. Sem.'}</span>
                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </button>
            </div>

            {/* Pause & Speed Controls integrated */}
            <div className="flex items-center gap-1 shrink-0 ml-auto sm:ml-0">
              {/* Pause / Play */}
              <button
                id="control-play-pause"
                onClick={onTogglePause}
                title={isPaused ? 'Retomar Simulação' : 'Pausar Simulação'}
                className={`p-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer shrink-0 ${
                  isPaused
                    ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-600 text-amber-600" /> : <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              {/* Speed selector */}
              <div className="flex items-center bg-slate-100 rounded-lg sm:rounded-xl p-0.5 border border-slate-200 text-[10px] sm:text-xs font-semibold shrink-0">
                {[1, 2, 5].map((spd) => (
                  <button
                    key={spd}
                    id={`speed-btn-${spd}x`}
                    onClick={() => onChangeSpeed(spd)}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer ${
                      gameSpeed === spd
                        ? 'bg-white text-rose-600 shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-rose-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl">
              🔄
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Reiniciar Simulador?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O progresso atual será reiniciado para a Semana 1 da Gestação. Deseja começar uma nova jornada?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetGame();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Sim, Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
