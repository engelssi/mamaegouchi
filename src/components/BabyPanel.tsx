import React from 'react';
import { motion } from 'motion/react';
import { BabyInfo, PostpartumWeekInfo, BabyStatus, GamePhase } from '../types';
import { StatsBar } from './StatsBar';
import { 
  Heart, 
  Sparkles, 
  Ruler, 
  Weight, 
  Award, 
  Baby, 
  Utensils, 
  Moon, 
  Bath, 
  Smile, 
  Activity,
  Info,
  CalendarDays
} from 'lucide-react';
import { playSound } from '../utils/sound';
import { calculateFromDUM } from '../utils/gestationalCalculator';

interface BabyPanelProps {
  phase: GamePhase;
  week: number;
  babyInfo: BabyInfo;
  postpartumInfo?: PostpartumWeekInfo;
  babyStatus: BabyStatus;
  onBabyAction: (type: 'baby_feed' | 'baby_sleep' | 'baby_diaper' | 'baby_comfort') => void;
  onOpenDumModal?: () => void;
  dumDate?: string;
  disabled?: boolean;
}

export const BabyPanel: React.FC<BabyPanelProps> = ({
  phase,
  week,
  babyInfo,
  postpartumInfo,
  babyStatus,
  onBabyAction,
  onOpenDumModal,
  dumDate,
  disabled = false
}) => {
  const dumResult = dumDate ? calculateFromDUM(dumDate) : null;
  return (
    <div 
      id="baby-panel-container" 
      className={`rounded-3xl p-5 shadow-sm flex flex-col justify-between h-full transition-all ${
        phase === 'POSTPARTUM' 
          ? 'bg-gradient-to-b from-rose-50/40 via-pink-50/20 to-white border-2 border-rose-200' 
          : 'bg-white border border-rose-200/80'
      }`}
    >
      {phase === 'PREGNANCY' ? (
        // PREGNANCY MODE: Fetal Development & Fruit Comparison
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100 text-pink-700">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight">
                  Desenvolvimento Fetal
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {babyInfo.trimester}º Trimestre — Semana {week} de 40
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {onOpenDumModal && (
                <button
                  onClick={onOpenDumModal}
                  title="Calcular Idade Gestacional por DUM ou Alterar Semana"
                  className="px-2 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <CalendarDays className="w-3 h-3 text-rose-500" />
                  <span>DUM</span>
                </button>
              )}
              <div className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                {babyInfo.trimester === 1 ? 'Formação Inicial' : babyInfo.trimester === 2 ? 'Crescimento Rápido' : 'Maturação Final'}
              </div>
            </div>
          </div>

          {/* Optional DUM / DPP Quick Summary if calculated */}
          {dumResult?.isValid && (
            <div className="px-3 py-1.5 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">
                DUM: <strong>{dumResult.formattedDum}</strong>
              </span>
              <span className="text-rose-700 font-bold">
                DPP Prevista: {dumResult.formattedDpp}
              </span>
            </div>
          )}

          {/* Fruit/Vegetable Comparison Card */}
          <motion.div
            key={babyInfo.comparison}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50/50 to-orange-50/40 border border-rose-100 shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-rose-100 flex items-center justify-center text-3xl">
                {babyInfo.emoji}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
                  Tamanho Comparativo
                </span>
                <h4 className="font-bold text-slate-800 text-base leading-snug">
                  {babyInfo.comparison}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5 text-rose-500" />
                    {babyInfo.size}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <Weight className="w-3.5 h-3.5 text-rose-500" />
                    {babyInfo.weight}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Milestones list */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-pink-600" />
              <span>Marcos desta Semana</span>
            </div>
            <ul className="space-y-2">
              {babyInfo.milestones.map((m, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fun Fact Pearl */}
          <div className="mt-1 p-3 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-xs text-teal-900 leading-relaxed">
              <strong className="font-semibold text-teal-950">Fato Científico: </strong>
              {babyInfo.funFact}
            </p>
          </div>
        </div>
      ) : (
        // POSTPARTUM MODE: Newborn Baby Status & Care Controls (Harmonious Nursery Palette)
        <div className="flex flex-col gap-4">
          {/* Header with explicit Baby identity */}
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-xs">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-800 text-base leading-tight">
                    Recém-Nascido
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    Bebê
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Semana {week} de 8 do Pós-Parto
                </span>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold shadow-2xs">
              {postpartumInfo?.title || 'Fase Neonatal'}
            </div>
          </div>

          {/* Newborn Avatar & Mood Display */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-rose-50/80 via-pink-50/50 to-purple-50/40 border border-rose-200/80 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-rose-200 flex items-center justify-center text-3xl shrink-0">
              {babyStatus.sleep > 80 ? '😴' : babyStatus.hunger < 30 ? '🥺' : babyStatus.hygiene < 30 ? '👶' : '🥰'}
            </div>
            <div className="text-xs flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm">
                  {babyStatus.sleep > 80 ? 'Dormindo Tranquilo' : babyStatus.hunger < 30 ? 'Chorando por Leite' : babyStatus.hygiene < 30 ? 'Precisando Trocar Fralda' : 'Calmo & Aconchegado'}
                </h4>
                <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-200">
                  Status do Bebê
                </span>
              </div>
              <p className="text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {postpartumInfo?.babyDevelopment || 'O bebê responde com amor e tranquilidade a cada cuidado.'}
              </p>
            </div>
          </div>

          {/* Baby Status Bars */}
          <div className="space-y-2.5 bg-rose-50/30 p-3.5 rounded-2xl border border-rose-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center justify-between mb-1">
              <span>Necessidades do Bebê</span>
              <span className="text-[10px] font-normal text-slate-500">Mantenha acima de 30%</span>
            </div>
            <StatsBar
              id="baby-hunger-bar"
              label="Saciedade do Bebê"
              value={babyStatus.hunger}
              icon={<Utensils className="w-3.5 h-3.5" />}
              colorClass="bg-gradient-to-r from-amber-400 to-amber-500"
              bgClass="bg-amber-100 text-amber-700"
            />
            <StatsBar
              id="baby-sleep-bar"
              label="Sono do Bebê"
              value={babyStatus.sleep}
              icon={<Moon className="w-3.5 h-3.5" />}
              colorClass="bg-gradient-to-r from-indigo-400 to-indigo-500"
              bgClass="bg-indigo-100 text-indigo-700"
            />
            <StatsBar
              id="baby-hygiene-bar"
              label="Higiene / Fralda"
              value={babyStatus.hygiene}
              icon={<Bath className="w-3.5 h-3.5" />}
              colorClass="bg-gradient-to-r from-teal-400 to-teal-500"
              bgClass="bg-teal-100 text-teal-700"
            />
            <StatsBar
              id="baby-happiness-bar"
              label="Conforto & Afeto"
              value={babyStatus.happiness}
              icon={<Smile className="w-3.5 h-3.5" />}
              colorClass="bg-gradient-to-r from-pink-400 to-pink-500"
              bgClass="bg-pink-100 text-pink-700"
            />
            <StatsBar
              id="baby-health-bar"
              label="Saúde Geral do Bebê"
              value={babyStatus.health}
              icon={<Heart className="w-3.5 h-3.5 text-rose-500" />}
              colorClass="bg-gradient-to-r from-rose-500 to-emerald-500"
              bgClass="bg-rose-100 text-rose-700"
              critical={true}
            />
          </div>

          {/* Dedicated Baby Actions Section with clear visual separation */}
          <div className="flex flex-col gap-2 pt-1 border-t border-rose-100">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5 text-rose-600" />
                Cuidados com o Bebê
              </span>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                Ações do Bebê
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                id="action-baby-feed"
                whileHover={!disabled ? { scale: 1.02, translateY: -1 } : {}}
                whileTap={!disabled ? { scale: 0.97 } : {}}
                disabled={disabled}
                onClick={() => {
                  playSound('baby');
                  onBabyAction('baby_feed');
                }}
                className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left shadow-xs ${
                  disabled 
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-amber-50 hover:bg-amber-100/90 active:bg-amber-200 border-amber-300 text-amber-950 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shadow-2xs">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs leading-tight">Amamentar Bebê</div>
                    <div className="text-[10px] text-amber-800/80 font-medium">Livre Demanda</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-900 border border-amber-300">
                  Bebê
                </span>
              </motion.button>

              <motion.button
                id="action-baby-sleep"
                whileHover={!disabled ? { scale: 1.02, translateY: -1 } : {}}
                whileTap={!disabled ? { scale: 0.97 } : {}}
                disabled={disabled}
                onClick={() => {
                  playSound('baby');
                  onBabyAction('baby_sleep');
                }}
                className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left shadow-xs ${
                  disabled 
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-50 hover:bg-indigo-100/90 active:bg-indigo-200 border-indigo-300 text-indigo-950 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500 text-white shadow-2xs">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs leading-tight">Ninar o Bebê</div>
                    <div className="text-[10px] text-indigo-800/80 font-medium">Sono Seguro</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-200 text-indigo-900 border border-indigo-300">
                  Bebê
                </span>
              </motion.button>

              <motion.button
                id="action-baby-diaper"
                whileHover={!disabled ? { scale: 1.02, translateY: -1 } : {}}
                whileTap={!disabled ? { scale: 0.97 } : {}}
                disabled={disabled}
                onClick={() => {
                  playSound('baby');
                  onBabyAction('baby_diaper');
                }}
                className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left shadow-xs ${
                  disabled 
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-teal-50 hover:bg-teal-100/90 active:bg-teal-200 border-teal-300 text-teal-950 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-500 text-white shadow-2xs">
                    <Bath className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs leading-tight">Trocar Fralda</div>
                    <div className="text-[10px] text-teal-800/80 font-medium">Coto & Higiene</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-200 text-teal-900 border border-teal-300">
                  Bebê
                </span>
              </motion.button>

              <motion.button
                id="action-baby-comfort"
                whileHover={!disabled ? { scale: 1.02, translateY: -1 } : {}}
                whileTap={!disabled ? { scale: 0.97 } : {}}
                disabled={disabled}
                onClick={() => {
                  playSound('baby');
                  onBabyAction('baby_comfort');
                }}
                className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left shadow-xs ${
                  disabled 
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-pink-50 hover:bg-pink-100/90 active:bg-pink-200 border-pink-300 text-pink-950 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-pink-500 text-white shadow-2xs">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs leading-tight">Carinho & Colo</div>
                    <div className="text-[10px] text-pink-800/80 font-medium">Pele a Pele</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-pink-200 text-pink-900 border border-pink-300">
                  Bebê
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
