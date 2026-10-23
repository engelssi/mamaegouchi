import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  X, 
  GraduationCap,
  Clock,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
  onOpenManual?: (tab?: 'user' | 'dev') => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose, onOpenManual }) => {
  return (
    <div
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        id="about-modal-dialog"
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/20">
              🌸
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight brand-font">
                MamãeGotchi
              </h2>
              <span className="text-xs text-rose-100 font-medium">
                Guia Educacional & Contexto Científico Institucional
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          
          {/* Institutional Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/80 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <GraduationCap className="w-4 h-4 text-rose-600" />
              <span>Contexto Institucional & Acadêmico</span>
            </div>
            <p className="text-slate-600">
              O <strong>MamãeGotchi</strong> é um projeto de Iniciação em Desenvolvimento Tecnológico e Inovação (<strong>PIBITI / PROPEP</strong>) vinculado à <strong>Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL)</strong> — Edital nº 01/2026, em conformidade com as diretrizes do <strong>CNPq</strong> e <strong>FAPEAL</strong>.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-rose-200 font-semibold text-rose-800 text-[11px]">
                🏛️ UNCISAL / PROPEP 2026
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-rose-200 font-semibold text-rose-800 text-[11px]">
                🔬 PIBITI / Inovação em Saúde
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-rose-200 font-semibold text-rose-800 text-[11px]">
                💡 Saúde Materna Lúdica
              </span>
            </div>
          </div>

          {/* Objective & Gameplay */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Objetivo & Mecânica do Simulador</span>
            </div>
            <p className="text-slate-600">
              Inspirado na consagrada mecânica do Tamagotchi, o simulador promove a educação em saúde de forma lúdica, imersiva e livre de tabus. O jogador acompanha o ciclo completo:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Gestação (1 a 40 Semanas):</strong> Nutrição, hidratação, sono em DLE, higiene bucal, saúde mental e exercícios seguros.</span>
              </li>
              <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Puerpério (1 a 8 Semanas):</strong> Colostro, livre demanda, pega correta, coto umbilical, sono seguro e prevenção de mastite.</span>
              </li>
            </ul>
          </div>

          {/* Clinical Guidelines */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Fundamentação Científica & Fontes Oficiais</span>
            </div>
            <p className="text-slate-600">
              Todas as decisões e fatos científicos exibidos no sistema são estritamente alinhados com os protocolos clínicos baseados em evidências:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
              <div className="p-2 bg-teal-50/50 rounded-xl border border-teal-100">
                • Caderneta da Gestante (Ministério da Saúde / SUS)
              </div>
              <div className="p-2 bg-teal-50/50 rounded-xl border border-teal-100">
                • Diretrizes da FEBRASGO
              </div>
              <div className="p-2 bg-teal-50/50 rounded-xl border border-teal-100">
                • Sociedade Brasileira de Pediatria (SBP)
              </div>
              <div className="p-2 bg-teal-50/50 rounded-xl border border-teal-100">
                • Organização Mundial da Saúde (OMS)
              </div>
            </div>
          </div>

          {/* Simulation Time Engine */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-indigo-950 text-xs">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Motor de Tempo & Decaimento de Status</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Os status vitais decaem continuamente de forma realista a cada 5 segundos. O tempo do jogo avança 1 dia a cada 15 segundos (7 dias por semana gestacional). Você pode pausar ou alterar a velocidade a qualquer momento pelos controles superiores.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          {onOpenManual && (
            <button
              onClick={() => {
                onClose();
                onOpenManual('user');
              }}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Ver Manuais (Usuário & Dev)</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Entendido, Voltar ao Simulador
          </button>
        </div>
      </motion.div>
    </div>
  );
};
