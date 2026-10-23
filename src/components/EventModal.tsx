import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameEvent, GameEventOption, AccessibilitySettings } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight, 
  X,
  TrendingUp,
  TrendingDown,
  Volume2,
  Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';
import { speakText, stopSpeaking, isSpeaking } from '../utils/tts';

interface EventModalProps {
  event: GameEvent | null;
  accessibilitySettings?: AccessibilitySettings;
  onSelectOption: (option: GameEventOption) => void;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  accessibilitySettings,
  onSelectOption,
  onClose
}) => {
  const [selectedOption, setSelectedOption] = useState<GameEventOption | null>(null);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);

  // Auto-read on open if TTS is enabled in accessibility settings
  useEffect(() => {
    if (!event) return;
    if (accessibilitySettings?.ttsEnabled) {
      handleReadEvent();
    }
    return () => {
      stopSpeaking();
    };
  }, [event?.id, accessibilitySettings?.ttsEnabled]);

  // Keyboard accessibility (Esc to close, 1/2/3 to choose, Enter to confirm)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !selectedOption) {
        stopSpeaking();
        onClose();
      } else if (e.key === 'Enter' && selectedOption) {
        stopSpeaking();
        onSelectOption(selectedOption);
      } else if (!selectedOption && event) {
        if (e.key === '1' && event.options[0]) handleChoose(event.options[0]);
        if (e.key === '2' && event.options[1]) handleChoose(event.options[1]);
        if (e.key === '3' && event.options[2]) handleChoose(event.options[2]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event, selectedOption, onClose, onSelectOption]);

  if (!event) return null;

  const handleReadEvent = () => {
    if (isTtsPlaying) {
      stopSpeaking();
      setIsTtsPlaying(false);
      return;
    }

    let textToSpeak = `Decisão de saúde: ${event.title}. ${event.description}. Escolha uma conduta: `;
    event.options.forEach((opt, idx) => {
      textToSpeak += ` Opção ${idx + 1}: ${opt.label}. ${opt.description || ''}. `;
    });

    setIsTtsPlaying(true);
    speakText(textToSpeak, {
      rate: accessibilitySettings?.ttsSpeechRate ?? 1.0,
      onEnd: () => setIsTtsPlaying(false),
      onError: () => setIsTtsPlaying(false)
    });
  };

  const handleReadOutcome = (opt: GameEventOption) => {
    setIsTtsPlaying(true);
    let impactText = '';
    const statLabels: Record<string, string> = {
      hunger: 'Nutrição',
      thirst: 'Hidratação',
      sleep: 'Sono',
      happiness: 'Bem-estar',
      hygiene: 'Higiene',
      energy: 'Energia',
      health: 'Saúde Geral',
      babyHunger: 'Nutrição do Bebê',
      babySleep: 'Sono do Bebê',
      babyHygiene: 'Higiene da Fralda',
      babyHappiness: 'Vínculo do Bebê',
      babyHealth: 'Saúde do Bebê',
    };
    Object.entries(opt.impact).forEach(([stat, val]) => {
      if (typeof val === 'number' && val !== 0) {
        impactText += ` ${statLabels[stat] || stat}: ${val > 0 ? 'aumentou' : 'diminuiu'} ${Math.abs(val)} por cento.`;
      }
    });

    const textToSpeak = `Resultado da escolha: ${opt.feedback}. Impacto nos sinais vitais: ${impactText}. Evidência clínica e científica: ${opt.scientificFact}`;
    speakText(textToSpeak, {
      rate: accessibilitySettings?.ttsSpeechRate ?? 1.0,
      onEnd: () => setIsTtsPlaying(false),
      onError: () => setIsTtsPlaying(false)
    });
  };

  const handleChoose = (opt: GameEventOption) => {
    setSelectedOption(opt);
    stopSpeaking();

    // If auto TTS is active, read outcome
    if (accessibilitySettings?.ttsEnabled) {
      handleReadOutcome(opt);
    }

    // If it is a positive choice, launch soft celebration confetti (if motion not reduced)
    const isPositive = (opt.impact.health && opt.impact.health > 0) || (opt.impact.happiness && opt.impact.happiness > 10);
    if (isPositive) {
      playSound('fanfare');
      if (!accessibilitySettings?.reducedMotion) {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f472b6', '#38bdf8', '#34d399', '#fbbf24']
        });
      }
    } else {
      playSound('pop');
    }
  };

  const handleConfirm = () => {
    stopSpeaking();
    if (selectedOption) {
      onSelectOption(selectedOption);
    }
  };

  return (
    <div
      id="event-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        id="event-modal-dialog"
        initial={accessibilitySettings?.reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={accessibilitySettings?.reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 15 }}
        className="relative w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-rose-200 flex flex-col overflow-hidden my-auto"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/20">
              {event.imageEmoji || '✨'}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-100">
                Decisão & Aprendizado em Saúde
              </span>
              <h2 className="text-lg font-bold leading-tight">
                {event.title}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* TTS Voice Reader Button */}
            <button
              id="event-tts-btn"
              onClick={selectedOption ? () => handleReadOutcome(selectedOption) : handleReadEvent}
              title={isTtsPlaying ? 'Parar Leitura em Voz Alta' : 'Ouvir este evento com voz (TTS)'}
              aria-label="Ouvir em Voz Alta"
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                isTtsPlaying
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {isTtsPlaying ? <Square className="w-4 h-4 fill-slate-950" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isTtsPlaying ? 'Parar' : 'Ouvir'}</span>
            </button>

            {!selectedOption && (
              <button
                onClick={() => {
                  stopSpeaking();
                  onClose();
                }}
                title="Fechar (Esc)"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1 overscroll-contain">
          {/* Emergency Alert Banner if status is critical */}
          {event.isEmergency && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Atenção ao indicador baixo:</strong> Suas decisões agora terão impacto regenerativo ampliado!
              </span>
            </div>
          )}

          {/* Dilemma Description */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100">
            {event.description}
          </p>

          {!selectedOption ? (
            // Phase 1: Choices Selection
            <div className="space-y-2.5 sm:space-y-3 pt-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  <span>Escolha uma Conduta:</span>
                </span>
                <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">Teclas 1, 2 ou 3</span>
              </div>

              {event.options.map((opt, idx) => (
                <motion.button
                  key={opt.id}
                  id={`event-option-${idx}`}
                  whileHover={!accessibilitySettings?.reducedMotion ? { scale: 1.01, translateY: -1 } : {}}
                  whileTap={!accessibilitySettings?.reducedMotion ? { scale: 0.98 } : {}}
                  onClick={() => handleChoose(opt)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 bg-white transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col gap-2 group focus-visible:ring-4 focus-visible:ring-rose-400 touch-manipulation active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                        {idx + 1}
                      </span>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-rose-900 leading-snug">
                        {opt.label}
                      </div>
                    </div>
                    <div className="p-1 rounded-lg bg-slate-100 group-hover:bg-rose-200 text-slate-500 group-hover:text-rose-800 transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {opt.description && (
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      {opt.description}
                    </p>
                  )}

                </motion.button>
              ))}
            </div>
          ) : (
            // Phase 2: Educational Outcome, Revealed Health Impacts & Evidence-Based Scientific Fact
            <motion.div
              initial={accessibilitySettings?.reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3.5 sm:space-y-4 pt-1"
            >
              {/* Feedback Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    Resultado da Escolha:
                  </h4>
                  <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                    {selectedOption.feedback}
                  </p>
                </div>
              </div>

              {/* IMPACTOS REVELADOS APENAS APÓS A DECISÃO */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Impacto nos Sinais Vitais:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedOption.impact).map(([stat, val]) => {
                    if (typeof val !== 'number' || val === 0) return null;
                    const isPositive = val > 0;
                    const statLabels: Record<string, string> = {
                      hunger: 'Nutrição (Fome)',
                      thirst: 'Hidratação (Sede)',
                      sleep: 'Sono (Descanso)',
                      happiness: 'Bem-Estar Mental',
                      hygiene: 'Higiene & Autocuidado',
                      energy: 'Energia & Disposição',
                      health: 'Saúde Geral da Mãe',
                      babyHunger: 'Nutrição do Bebê',
                      babySleep: 'Sono do Bebê',
                      babyHygiene: 'Higiene da Fralda',
                      babyHappiness: 'Vínculo & Afeto',
                      babyHealth: 'Saúde Geral do Bebê',
                    };
                    return (
                      <span
                        key={stat}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-2xs transition-all ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span>{statLabels[stat] || stat}:</span>
                        <span className="font-extrabold text-sm">{isPositive ? `+${val}%` : `${val}%`}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Specific Evidence-based Scientific Fact tailored to chosen option */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-200/70 text-indigo-900 text-[10px] font-bold uppercase tracking-wider">
                      Evidência Clínica & Científica
                    </span>
                  </div>
                  <p className="text-xs text-indigo-950 mt-2 leading-relaxed font-medium">
                    {selectedOption.scientificFact}
                  </p>
                </div>
              </div>

              {/* Action Confirmation Button */}
              <div className="pt-2 sm:pt-3">
                <button
                  id="confirm-event-choice"
                  onClick={handleConfirm}
                  className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-4 focus-visible:ring-rose-400 touch-manipulation active:scale-[0.98]"
                >
                  <span>Aplicar Cuidados e Continuar Jornada (Enter)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
