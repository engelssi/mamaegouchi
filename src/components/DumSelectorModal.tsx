import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GamePhase, AccessibilitySettings } from '../types';
import { 
  Calendar, 
  Clock, 
  HelpCircle, 
  Baby, 
  Heart, 
  Sparkles, 
  Check, 
  ArrowRight, 
  X, 
  Volume2, 
  Square,
  Info,
  CalendarDays,
  ListFilter
} from 'lucide-react';
import { 
  calculateFromDUM, 
  formatDateBR, 
  calculateEstimatedDumFromWeek,
  GESTATIONAL_PHASES_SUMMARY,
  GestationalCalculationResult
} from '../utils/gestationalCalculator';
import { getBabyInfoForWeek, POSTPARTUM_DATA } from '../constants/pregnancyData';
import { playSound } from '../utils/sound';
import { speakText, stopSpeaking, isSpeaking } from '../utils/tts';

interface DumSelectorModalProps {
  currentWeek: number;
  currentPhase: GamePhase;
  savedDumDate?: string;
  accessibilitySettings?: AccessibilitySettings;
  isOpen: boolean;
  onClose: () => void;
  onApplyWeekAndDum: (week: number, phase: GamePhase, dumDate?: string) => void;
}

export const DumSelectorModal: React.FC<DumSelectorModalProps> = ({
  currentWeek,
  currentPhase,
  savedDumDate,
  accessibilitySettings,
  isOpen,
  onClose,
  onApplyWeekAndDum
}) => {
  const [activeTab, setActiveTab] = useState<'DUM' | 'DIRECT_WEEK'>('DUM');
  
  // DUM Date picker state (defaults to saved DUM or estimated DUM from current week)
  const defaultDum = savedDumDate || calculateEstimatedDumFromWeek(currentPhase === 'PREGNANCY' ? currentWeek : 40);
  const [dumInput, setDumInput] = useState<string>(defaultDum);
  const [calcResult, setCalcResult] = useState<GestationalCalculationResult>(() => calculateFromDUM(defaultDum));
  
  // Direct Week Selection state
  const [selectedPhase, setSelectedPhase] = useState<GamePhase>(currentPhase);
  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);

  const [isTtsSpeaking, setIsTtsSpeaking] = useState(false);

  // Recalculate whenever DUM changes
  useEffect(() => {
    if (dumInput) {
      const res = calculateFromDUM(dumInput);
      setCalcResult(res);
    }
  }, [dumInput]);

  if (!isOpen) return null;

  // Max allowed date for DUM is today
  const todayStr = new Date().toISOString().split('T')[0];

  // Quick preset handlers
  const handleSetQuickWeeksAgo = (weeksAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - (weeksAgo * 7));
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDumInput(`${yyyy}-${mm}-${dd}`);
    playSound('pop');
  };

  const handleReadSummary = () => {
    if (isTtsSpeaking) {
      stopSpeaking();
      setIsTtsSpeaking(false);
      return;
    }

    let text = '';
    if (activeTab === 'DUM') {
      if (calcResult.isValid) {
        text = `Calculadora de DUM: ${calcResult.summaryText} ${calcResult.scientificExplanation}`;
      } else {
        text = 'Data da última menstruação inválida.';
      }
    } else {
      if (selectedPhase === 'PREGNANCY') {
        const info = getBabyInfoForWeek(selectedWeek);
        text = `Semana ${selectedWeek} da Gestação. Tamanho do feto: ${info.comparison}, peso aproximado: ${info.weight}. ${info.milestones[0] || ''}`;
      } else {
        const pInfo = POSTPARTUM_DATA[selectedWeek];
        text = `Semana ${selectedWeek} do Pós-Parto: ${pInfo?.title}. ${pInfo?.babyDevelopment}`;
      }
    }

    setIsTtsSpeaking(true);
    speakText(text, {
      rate: accessibilitySettings?.ttsSpeechRate ?? 1.0,
      onEnd: () => setIsTtsSpeaking(false),
      onError: () => setIsTtsSpeaking(false)
    });
  };

  const handleConfirmDUM = () => {
    stopSpeaking();
    playSound('fanfare');
    if (calcResult.isValid) {
      if (calcResult.trimester === 'postpartum') {
        onApplyWeekAndDum(1, 'POSTPARTUM', dumInput);
      } else {
        onApplyWeekAndDum(calcResult.gestationalWeeks, 'PREGNANCY', dumInput);
      }
    }
  };

  const handleConfirmDirectWeek = () => {
    stopSpeaking();
    playSound('fanfare');
    const estimatedDum = selectedPhase === 'PREGNANCY' ? calculateEstimatedDumFromWeek(selectedWeek) : undefined;
    onApplyWeekAndDum(selectedWeek, selectedPhase, estimatedDum);
  };

  const currentBabyInfo = calcResult.isValid ? getBabyInfoForWeek(calcResult.gestationalWeeks) : null;
  const directBabyInfo = selectedPhase === 'PREGNANCY' ? getBabyInfoForWeek(selectedWeek) : null;
  const directPostpartumInfo = selectedPhase === 'POSTPARTUM' ? POSTPARTUM_DATA[selectedWeek] : null;

  return (
    <div 
      id="dum-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dum-modal-title"
    >
      <motion.div
        id="dum-modal-container"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-4 max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-5 py-4 text-white flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-xs text-white">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h2 id="dum-modal-title" className="text-lg sm:text-xl font-bold leading-tight flex items-center gap-2">
                <span>Calculadora Obstétrica & Início da Jornada</span>
              </h2>
              <p className="text-xs text-rose-100 font-medium">
                Calcule pela DUM (Data da Última Menstruação) ou escolha em qual semana começar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReadSummary}
              title={isTtsSpeaking ? 'Parar Leitura' : 'Ouvir Informações (Voz)'}
              aria-label="Ouvir Resumo"
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                isTtsSpeaking ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {isTtsSpeaking ? <Square className="w-4 h-4 fill-slate-950" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isTtsSpeaking ? 'Parar' : 'Ouvir'}</span>
            </button>

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
          </div>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="px-5 pt-3 pb-2 bg-rose-50/50 border-b border-rose-100 flex gap-2 shrink-0">
          <button
            id="tab-btn-dum"
            onClick={() => {
              setActiveTab('DUM');
              playSound('click');
            }}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'DUM'
                ? 'bg-white text-rose-600 shadow-sm border border-rose-200'
                : 'bg-transparent text-slate-600 hover:bg-white/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>Calcular por DUM (Recomendado)</span>
          </button>

          <button
            id="tab-btn-direct-week"
            onClick={() => {
              setActiveTab('DIRECT_WEEK');
              playSound('click');
            }}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'DIRECT_WEEK'
                ? 'bg-white text-rose-600 shadow-sm border border-rose-200'
                : 'bg-transparent text-slate-600 hover:bg-white/60'
            }`}
          >
            <ListFilter className="w-4 h-4 text-rose-500" />
            <span>Escolher Semana Diretamente</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'DUM' ? (
            /* =========================================================================
               TAB 1: DUM CALCULATOR (Data da Última Menstruação)
               ========================================================================= */
            <div className="space-y-4">
              {/* Friendly Guide Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>O que é a DUM?</strong> É a data do <strong>primeiro dia</strong> do seu último sangramento menstrual. Como a fecundação costuma ocorrer 2 semanas depois, os médicos e o Ministério da Saúde usam a DUM como ponto de partida padrão para calcular a gestação em 40 semanas.
                </div>
              </div>

              {/* Date Input Field */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label htmlFor="dum-date-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Selecione o 1º dia da sua Última Menstruação:
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <input
                    id="dum-date-input"
                    type="date"
                    max={todayStr}
                    value={dumInput}
                    onChange={(e) => setDumInput(e.target.value)}
                    className="w-full sm:flex-1 px-4 py-2.5 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-white text-slate-800 font-bold text-sm outline-hidden transition-all"
                  />

                  {/* Preset quick buttons */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Exemplos:</span>
                    <button
                      type="button"
                      onClick={() => handleSetQuickWeeksAgo(6)}
                      className="px-2 py-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-[11px] font-semibold text-slate-700 cursor-pointer"
                    >
                      6 sem
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetQuickWeeksAgo(12)}
                      className="px-2 py-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-[11px] font-semibold text-slate-700 cursor-pointer"
                    >
                      12 sem
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetQuickWeeksAgo(24)}
                      className="px-2 py-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-[11px] font-semibold text-slate-700 cursor-pointer"
                    >
                      24 sem
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetQuickWeeksAgo(36)}
                      className="px-2 py-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-[11px] font-semibold text-slate-700 cursor-pointer"
                    >
                      36 sem
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Obstetric Calculation Card */}
              {calcResult.isValid ? (
                <div className="bg-gradient-to-br from-rose-50/70 via-pink-50/40 to-white p-4 sm:p-5 rounded-3xl border-2 border-rose-200 shadow-sm space-y-4">
                  {/* Big stats highlight banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    {/* Week + Day */}
                    <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-2xs">
                      <div className="text-[10px] font-extrabold uppercase text-rose-500 tracking-wider">
                        Idade Gestacional
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">
                        {calcResult.gestationalWeeks} Semanas
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">
                        + {calcResult.gestationalDays} {calcResult.gestationalDays === 1 ? 'dia' : 'dias'}
                      </div>
                    </div>

                    {/* DPP (Data Provável do Parto - Naegele) */}
                    <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-2xs">
                      <div className="text-[10px] font-extrabold uppercase text-rose-500 tracking-wider">
                        Data Prevista do Parto (DPP)
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-rose-600 leading-tight">
                        {calcResult.formattedDpp}
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">
                        Regra de Naegele (40 sem)
                      </div>
                    </div>

                    {/* Trimester & Month */}
                    <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-2xs">
                      <div className="text-[10px] font-extrabold uppercase text-rose-500 tracking-wider">
                        Fase da Gestação
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-slate-800 leading-tight">
                        {calcResult.monthLabel}
                      </div>
                      <div className="text-xs text-pink-600 font-bold">
                        {calcResult.trimesterLabel.split(' ')[0]} {calcResult.trimesterLabel.split(' ')[1]}
                      </div>
                    </div>
                  </div>

                  {/* Baby comparison at this calculated week */}
                  {currentBabyInfo && (
                    <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl shrink-0">
                        {currentBabyInfo.emoji}
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-slate-800 text-sm">
                          Tamanho do Bebê: {currentBabyInfo.comparison}
                        </div>
                        <p className="text-slate-600 leading-tight mt-0.5">
                          Comprimento: <strong>{currentBabyInfo.size}</strong> • Peso estimado: <strong>{currentBabyInfo.weight}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Didactic Explanation */}
                  <div className="p-3 bg-rose-100/50 rounded-xl text-[11px] text-rose-900 leading-relaxed border border-rose-200">
                    💡 <strong>Entendendo seu tempo:</strong> Com a DUM em <strong>{calcResult.formattedDum}</strong>, você já completou <strong>{calcResult.totalDays} dias</strong> de gestação. O simulador será configurado exatamente na <strong>Semana {calcResult.gestationalWeeks}</strong> para refletir seu momento clínico atual!
                  </div>

                  {/* Apply Button */}
                  <button
                    id="btn-apply-dum-week"
                    onClick={handleConfirmDUM}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Iniciar Simulador na Semana {calcResult.gestationalWeeks}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {calcResult.errorMessage || 'Por favor, selecione uma data válida.'}
                </div>
              )}
            </div>
          ) : (
            /* =========================================================================
               TAB 2: DIRECT WEEK SELECTOR (1 to 40 or Postpartum 1 to 8)
               ========================================================================= */
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Selecione o trimestre ou a fase desejada para começar o jogo exatamente na semana que você preferir:
              </div>

              {/* Phase and Trimester Categories */}
              <div className="space-y-3">
                {GESTATIONAL_PHASES_SUMMARY.map((group) => {
                  const isPostpartumGroup = group.phase === 'POSTPARTUM';
                  const isCurrentGroupActive = isPostpartumGroup 
                    ? selectedPhase === 'POSTPARTUM'
                    : selectedPhase === 'PREGNANCY' && group.weeks.includes(selectedWeek);

                  return (
                    <div 
                      key={group.phase}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrentGroupActive 
                          ? 'bg-rose-50/60 border-rose-300 shadow-xs' 
                          : 'bg-slate-50/80 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{group.emoji}</span>
                          <span className="font-bold text-slate-800 text-xs sm:text-sm">{group.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${group.badgeColor}`}>
                            {group.weeksRange}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-snug mb-2.5">
                        {group.description}
                      </p>

                      {/* Weeks buttons */}
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                        {group.weeks.map((w) => {
                          const isSelected = isPostpartumGroup 
                            ? (selectedPhase === 'POSTPARTUM' && selectedWeek === w)
                            : (selectedPhase === 'PREGNANCY' && selectedWeek === w);

                          const weekInfo = !isPostpartumGroup ? getBabyInfoForWeek(w) : null;

                          return (
                            <button
                              key={w}
                              onClick={() => {
                                setSelectedPhase(isPostpartumGroup ? 'POSTPARTUM' : 'PREGNANCY');
                                setSelectedWeek(w);
                                playSound('click');
                              }}
                              className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                                isSelected
                                  ? 'bg-rose-500 text-white border-rose-600 shadow-xs font-bold scale-105'
                                  : 'bg-white hover:bg-rose-50 text-slate-700 border-slate-200 hover:border-rose-200'
                              }`}
                            >
                              <span className="text-xs font-extrabold">Sem {w}</span>
                              <span className="text-sm">
                                {isPostpartumGroup ? '🍼' : weekInfo?.emoji || '🌱'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Week Preview Card */}
              <div className="bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {selectedPhase === 'PREGNANCY' ? directBabyInfo?.emoji : '🍼'}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {selectedPhase === 'PREGNANCY'
                          ? `Semana ${selectedWeek} da Gestação (${directBabyInfo?.comparison})`
                          : `Semana ${selectedWeek} do Pós-Parto (${directPostpartumInfo?.title})`
                        }
                      </h4>
                      <p className="text-xs text-slate-500">
                        {selectedPhase === 'PREGNANCY'
                          ? `Tamanho: ${directBabyInfo?.size} • Peso: ${directBabyInfo?.weight}`
                          : directPostpartumInfo?.babyDevelopment
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    Selecionada
                  </span>
                </div>

                {selectedPhase === 'PREGNANCY' && directBabyInfo && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    ✨ <strong>Marco Clínico:</strong> {directBabyInfo.milestones[0]}
                  </p>
                )}

                {/* Apply Button */}
                <button
                  id="btn-apply-direct-week"
                  onClick={handleConfirmDirectWeek}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    Começar na Semana {selectedWeek} {selectedPhase === 'POSTPARTUM' ? '(Pós-Parto)' : '(Gestação)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 shrink-0">
          Você pode alterar a semana ou recalcular a DUM a qualquer momento clicando em <strong>"📅 DUM / Semana"</strong> no cabeçalho.
        </div>
      </motion.div>
    </div>
  );
};
