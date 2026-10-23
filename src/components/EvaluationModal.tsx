import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, CheckCircle2, Send, Settings, Download, Sparkles, MessageSquare, X, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  week: number;
  phase: string;
  healthyChoices?: number;
  actionsTaken?: number;
  isPostGame?: boolean;
}

const RATING_LABELS: Record<number, { title: string; subtitle: string; color: string }> = {
  5: { title: 'Excelente!', subtitle: 'Aprendi muito e me senti muito acolhida.', color: 'text-amber-500' },
  4: { title: 'Muito Bom!', subtitle: 'Recomendo para outras gestantes e famílias.', color: 'text-emerald-600' },
  3: { title: 'Bom', subtitle: 'Ajudou a entender os cuidados gestacionais.', color: 'text-teal-600' },
  2: { title: 'Regular', subtitle: 'Achei interessante, mas pode melhorar.', color: 'text-amber-600' },
  1: { title: 'Precisa Melhorar', subtitle: 'Tive dificuldades durante a simulação.', color: 'text-rose-600' },
};

const SUGGESTED_TAGS = [
  '🌸 Muito Didático',
  '📱 Fácil de Jogar no Celular',
  '💡 Aprendi sobre Pré-Natal',
  '👶 Recomendo para Gestantes',
  '🎨 Visual Lindo & Acolhedor',
  '✨ Linguagem Clara',
  '❤️ Fortalece o Cuidado Materno',
  '🏥 Relevante para o SUS'
];

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  onClose,
  week,
  phase,
  healthyChoices = 0,
  actionsTaken = 0,
  isPostGame = false
}) => {
  const [stars, setStars] = useState<number>(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(['🌸 Muito Didático', '👶 Recomendo para Gestantes']);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [savedCount, setSavedCount] = useState<number>(0);

  // Load configured webhook from localStorage or env
  useEffect(() => {
    const envUrl = (import.meta as any).env?.VITE_FEEDBACK_WEBHOOK_URL || '';
    const savedUrl = localStorage.getItem('mamaegotchi_feedback_webhook') || envUrl || '';
    setWebhookUrl(savedUrl);

    try {
      const stored = JSON.parse(localStorage.getItem('mamaegotchi_evaluations') || '[]');
      setSavedCount(stored.length);
    } catch {
      setSavedCount(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const activeRating = hoveredStar || stars;
  const ratingInfo = RATING_LABELS[activeRating] || RATING_LABELS[5];

  const toggleTag = (tag: string) => {
    playSound('click');
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mamaegotchi_feedback_webhook', webhookUrl.trim());
    setShowSettings(false);
    playSound('pop');
  };

  const handleExportCSV = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('mamaegotchi_evaluations') || '[]');
      if (stored.length === 0) {
        alert('Nenhuma avaliação armazenada localmente ainda.');
        return;
      }

      const headers = ['Data', 'Estrelas', 'Satisfacao', 'Tags', 'Comentario', 'Semana', 'Fase', 'DecisoesSaudaveis', 'Dispositivo'];
      const rows = stored.map((item: any) => [
        `"${item.timestamp || ''}"`,
        item.stars,
        `"${item.ratingLabel || ''}"`,
        `"${(item.tags || []).join('; ')}"`,
        `"${(item.feedback || '').replace(/"/g, '""')}"`,
        `"Semana ${item.week || ''}"`,
        `"${item.phase === 'POSTPARTUM' ? 'Puerpério' : 'Gestação'}"`,
        item.healthyChoices,
        `"${item.device || ''}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r: string[]) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mamaegotchi_avaliacoes_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting CSV:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Maceio' }),
      stars,
      ratingLabel: ratingInfo.title,
      tags: selectedTags,
      feedback: feedback.trim(),
      week,
      phase,
      healthyChoices,
      actionsTaken,
      device: window.innerWidth < 768 ? 'Celular / Mobile' : 'Computador / Desktop'
    };

    // 1. Always save a copy to localStorage as resilient offline backup
    try {
      const existing = JSON.parse(localStorage.getItem('mamaegotchi_evaluations') || '[]');
      existing.unshift(payload);
      localStorage.setItem('mamaegotchi_evaluations', JSON.stringify(existing));
      setSavedCount(existing.length);
    } catch (err) {
      console.warn('Could not save to localStorage:', err);
    }

    // 2. If Google Apps Script webhook URL is provided, send via POST
    const envUrl = (import.meta as any).env?.VITE_FEEDBACK_WEBHOOK_URL || '';
    const targetUrl = webhookUrl.trim() || envUrl || '';
    if (targetUrl) {
      try {
        await fetch(targetUrl, {
          method: 'POST',
          mode: 'no-cors', // Required for Google Apps Script Web App redirects
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Network webhook error (saved locally as backup):', err);
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    playSound('fanfare');

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div
      id="evaluation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        id="evaluation-modal-dialog"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-4 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-xl shadow-inner shrink-0">
              ⭐
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose-100 block">
                Pesquisa & Avaliação de Usuárias
              </span>
              <h2 className="text-base sm:text-lg font-black leading-tight">
                Avalie o MamãeGotchi
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {isSubmitted ? (
            /* Success confirmation view */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-inner">
                💖
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Muito Obrigada pela sua Avaliação!
              </h3>
              <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                Sua resposta foi registrada com sucesso! Sua contribuição é fundamental para o fortalecimento da pesquisa científica da <strong>UNCISAL</strong> e para o aprimoramento contínuo desta ferramenta de saúde materno-infantil.
              </p>

              {webhookUrl ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sincronizado diretamente com a Planilha Google Sheets!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-semibold text-[11px]">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Salvo no dispositivo ({savedCount} registros). Configure o Google Sheets para sincronizar em nuvem.</span>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="py-2.5 px-8 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  {isPostGame ? 'Iniciar Nova Jornada 🔄' : 'Continuar Jogando'}
                </button>
              </div>
            </motion.div>
          ) : (
            /* Rating Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Section */}
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 text-center space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Como você avalia sua experiência com o jogo?
                </span>

                {/* Stars Row */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHoveredStar(s)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() => {
                        setStars(s);
                        playSound('click');
                      }}
                      className="transition-transform transform hover:scale-125 active:scale-95 cursor-pointer focus:outline-none p-1"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                          s <= activeRating
                            ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Dynamic Rating Label */}
                <div className="h-9 flex flex-col justify-center">
                  <div className={`font-black text-sm sm:text-base ${ratingInfo.color}`}>
                    {ratingInfo.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {ratingInfo.subtitle}
                  </div>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-[11px] block">
                  O que mais chamou sua atenção? (Toque para selecionar)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-rose-500 text-white border-rose-500 shadow-2xs font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Open Feedback Textarea */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                    <span>Deixe seu comentário, elogio ou sugestão:</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Opcional</span>
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Conte para a equipe da UNCISAL o que você achou, o que mais gostou ou sugestões para futuras versões..."
                  rows={3}
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-slate-700 text-xs transition-all outline-none resize-none"
                />
              </div>

              {/* Simulation Context Badge */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
                <span>Progresso atual: <strong>Semana {week}</strong> ({phase === 'POSTPARTUM' ? 'Puerpério' : 'Gestação'})</span>
                <span>Decisões saudáveis: <strong className="text-emerald-600">{healthyChoices}</strong></span>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Avaliação à Equipe'}</span>
                </button>

                {isPostGame && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                    >
                      Pular avaliação e reiniciar agora
                    </button>
                  </div>
                )}
              </div>

              {/* Researcher Google Sheets Config Toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-1 hover:text-slate-700 cursor-pointer font-medium"
                >
                  <Settings className="w-3 h-3" />
                  <span>{showSettings ? 'Ocultar Configuração' : '⚙️ Conectar com Planilha Google Sheets'}</span>
                </button>

                {savedCount > 0 && (
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 cursor-pointer font-bold"
                    title="Exportar dados salvos localmente em formato Excel/CSV"
                  >
                    <Download className="w-3 h-3" />
                    <span>Baixar CSV ({savedCount})</span>
                  </button>
                )}
              </div>

              {/* Settings Box for Google Apps Script Webhook */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 text-[11px]">
                          URL do Google Apps Script (Webhook)
                        </span>
                        <a
                          href="/INTEGRACAO_GOOGLE_SHEETS.md"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-indigo-600 hover:underline font-semibold"
                        >
                          Ver Passo a Passo ↗
                        </a>
                      </div>
                      <input
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className="w-full p-2 bg-white rounded-xl border border-slate-300 text-slate-700 font-mono text-[11px] focus:outline-none focus:border-rose-400"
                      />
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500">
                          {webhookUrl ? '✅ Conexão ativa com o Google Sheets.' : 'ℹ️ Cole a URL gerada pelo Apps Script para receber em tempo real.'}
                        </span>
                        <button
                          type="button"
                          onClick={handleSaveWebhook}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                        >
                          Salvar URL
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
