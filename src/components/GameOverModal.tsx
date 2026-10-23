import React from 'react';
import { motion } from 'motion/react';
import { GameStatsRecord } from '../types';
import { Heart, RefreshCw, Award, Sparkles, AlertCircle, ShieldCheck, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

interface GameOverModalProps {
  isVictory: boolean;
  statsRecord: GameStatsRecord;
  onRestart: () => void;
  onOpenEvaluation?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVictory,
  statsRecord,
  onRestart,
  onOpenEvaluation
}) => {
  React.useEffect(() => {
    if (isVictory) {
      playSound('fanfare');
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.4 }
      });
    } else {
      playSound('warning');
    }
  }, [isVictory]);

  return (
    <div
      id="game-over-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        id="game-over-modal-dialog"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-6"
      >
        {/* Header */}
        <div className={`p-6 text-white text-center flex flex-col items-center ${
          isVictory
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600'
            : 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600'
        }`}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-4xl mb-3 shadow-inner">
            {isVictory ? '🏆' : '🌸'}
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-white/90">
            {isVictory ? 'Jornada Concluída com Excelência!' : 'Um Lembrete Acolhedor de Cuidado'}
          </span>
          <h2 className="text-2xl font-black mt-1">
            {isVictory ? 'Parabéns, Mamãe!' : 'A Maternidade Exige Rede de Apoio'}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-slate-700 text-xs leading-relaxed">
          {isVictory ? (
            <div className="space-y-3">
              <p className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-emerald-950 font-medium">
                Você completou com sucesso as <strong>40 semanas de gestação</strong> e as <strong>8 semanas de puerpério</strong>! Suas decisões baseadas em evidências científicas nutriram e protegeram a vida com carinho e sabedoria.
              </p>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Ações Realizadas</div>
                  <div className="text-lg font-black text-slate-800">{statsRecord.actionsTaken}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Decisões Saudáveis</div>
                  <div className="text-lg font-black text-emerald-600">{statsRecord.healthyChoices}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-rose-950 font-medium">
                A sobrecarga física e emocional na gestação é um desafio real. Lembre-se: <strong>nenhuma mãe precisa dar conta de tudo sozinha</strong>. Pedir ajuda, descansar e buscar acompanhamento profissional de pré-natal são gestos de amor e coragem.
              </p>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Dica para a próxima jornada:</strong> Mantenha os níveis de fome, sede e descanso sempre acima de 30% para proteger a saúde geral contra desgastes contínuos.
                </div>
              </div>
            </div>
          )}

          {/* Restart button */}
          <div className="pt-2 space-y-2">
            <button
              id="restart-game-btn"
              onClick={onRestart}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isVictory ? 'Iniciar Nova Jornada' : 'Recomeçar com Carinho'}</span>
            </button>
            <p className="text-center text-[11px] text-slate-400">
              Ao avançar, avalie sua experiência com estrelas para a pesquisa da UNCISAL ⭐
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
