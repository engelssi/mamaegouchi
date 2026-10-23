import React from 'react';
import { motion } from 'motion/react';
import { BabyInfo, PostpartumWeekInfo, GamePhase } from '../types';
import { Award, Sparkles, ArrowRight, Heart, Ruler, Weight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

interface MilestoneModalProps {
  phase: GamePhase;
  week: number;
  babyInfo: BabyInfo;
  postpartumInfo?: PostpartumWeekInfo;
  onAdvance: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  phase,
  week,
  babyInfo,
  postpartumInfo,
  onAdvance
}) => {
  React.useEffect(() => {
    playSound('fanfare');
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#38bdf8', '#34d399', '#fbbf24', '#a855f7']
    });
  }, []);

  const isBirthWeek = phase === 'PREGNANCY' && week === 40;

  return (
    <div
      id="milestone-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        id="milestone-modal-dialog"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-6"
      >
        {/* Header */}
        <div className={`p-6 text-white text-center flex flex-col items-center ${
          isBirthWeek
            ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600'
            : phase === 'PREGNANCY'
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600'
            : 'bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500'
        }`}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-4xl mb-3 shadow-inner">
            {isBirthWeek ? '🎉' : phase === 'PREGNANCY' ? babyInfo.emoji : '👶'}
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-white/90">
            {isBirthWeek ? 'Momento Mágico do Nascimento!' : phase === 'PREGNANCY' ? 'Novo Marco Gestacional Alcançado' : 'Semana de Puerpério Concluída'}
          </span>
          <h2 className="text-2xl font-black mt-1">
            {isBirthWeek
              ? '40 Semanas — Hora do Parto!'
              : phase === 'PREGNANCY'
              ? `Semana ${week}: Tamanho de um(a) ${babyInfo.comparison}`
              : `Semana ${week}: ${postpartumInfo?.title || 'Adaptação Neonatal'}`}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {phase === 'PREGNANCY' ? (
            <>
              {/* Pregnancy Stats Card */}
              <div className="flex items-center justify-around p-3.5 rounded-2xl bg-rose-50 border border-rose-100 text-xs">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-rose-600" />
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Comprimento</div>
                    <div className="font-bold text-slate-800 text-sm">{babyInfo.size}</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-rose-200" />
                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-rose-600" />
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Peso Médio</div>
                    <div className="font-bold text-slate-800 text-sm">{babyInfo.weight}</div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase">
                  <Award className="w-4 h-4 text-pink-600" />
                  <span>Conquistas do Desenvolvimento:</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {babyInfo.milestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Postpartum Progress Card */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-sky-950 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-sky-600" />
                    Desenvolvimento do Bebê:
                  </h4>
                  <p className="text-sky-900 mt-1 leading-relaxed">
                    {postpartumInfo?.babyDevelopment}
                  </p>
                </div>
                <div className="pt-2 border-t border-sky-200">
                  <h4 className="font-bold text-sky-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    Recuperação da Mãe:
                  </h4>
                  <p className="text-sky-900 mt-1 leading-relaxed">
                    {postpartumInfo?.motherRecovery}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Action button */}
          <div className="pt-2">
            <button
              id="advance-milestone-btn"
              onClick={onAdvance}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isBirthWeek ? 'Acolher o Bebê & Iniciar Puerpério' : 'Continuar Simulador'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
