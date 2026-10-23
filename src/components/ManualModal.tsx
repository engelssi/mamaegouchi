import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Code2, 
  X, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Heart, 
  GraduationCap, 
  Copy, 
  Check, 
  Sliders, 
  ShieldCheck, 
  Cpu, 
  FileText,
  Calendar,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { playSound } from '../utils/sound';

interface ManualModalProps {
  initialTab?: 'user' | 'dev';
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ 
  initialTab = 'user', 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'user' | 'dev'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    playSound('pop');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div
      id="manual-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        id="manual-modal-dialog"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-4 sm:my-6 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/20 shrink-0">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold leading-tight brand-font">
                  Manuais do MamãeGotchi
                </h2>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  UNCISAL • PIBITI
                </span>
              </div>
              <p className="text-xs text-rose-100 font-medium">
                Documentação oficial para usuários, gestantes, acadêmicos e desenvolvedores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer active:scale-95"
              title="Fechar Manual"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection Bar & Search */}
        <div className="bg-slate-50 border-b border-slate-200/80 p-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab('user');
                playSound('click');
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'user'
                  ? 'bg-white text-rose-700 shadow-sm shadow-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>Manual do Usuário</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('dev');
                playSound('click');
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dev'
                  ? 'bg-white text-indigo-700 shadow-sm shadow-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-4 h-4 text-indigo-600" />
              <span>Manual do Desenvolvedor</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar no manual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed flex-1">
          {activeTab === 'user' ? (
            /* ============================================================== */
            /*                       MANUAL DO USUÁRIO                        */
            /* ============================================================== */
            <div className="space-y-6">
              {/* Highlight Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    <span>Bem-vinda ao MamãeGotchi!</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    O simulador lúdico que ensina cuidados com a gestação e o puerpério através de mecânicas interativas baseadas nos protocolos oficiais do <strong>Ministério da Saúde / SUS</strong> e <strong>FEBRASGO</strong>.
                  </p>
                </div>
                <div className="shrink-0 text-[11px] font-semibold text-rose-700 bg-white/80 px-3 py-1 rounded-xl border border-rose-200">
                  Arquivo: MANUAL_DO_USUARIO.md
                </div>
              </div>

              {/* Section 1: Interface */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold">1</span>
                  Interface & Navegação Intuitiva
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="font-bold text-xs text-rose-700">📊 1. Sinais Vitais da Mãe</span>
                    <p className="text-xs text-slate-600">
                      Acompanhe 6 necessidades básicas: Fome, Sede, Sono, Felicidade, Higiene e Disposição. O coração (❤️) indica a Saúde Geral da gestante.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="font-bold text-xs text-rose-700">👩 2. Avatar & Ações</span>
                    <p className="text-xs text-slate-600">
                      O avatar expressa o humor da mãe em tempo real. Os botões inferiores abrem escolhas clínicas reais com explicações científicas educativas.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="font-bold text-xs text-rose-700">👶 3. Bebê & Desenvolvimento</span>
                    <p className="text-xs text-slate-600">
                      Na gravidez, acompanhe tamanho, peso, comparações lúdicas e marcos fetais. No pós-parto, assuma ações de amamentação e sono seguro.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Game Mechanics */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold">2</span>
                  Mecânicas da Simulação & Como Jogar
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Decaimento Natural:</strong> A cada 5 segundos, os status sofrem decaimento fisiológico realista. Hidratação e fome caem constantemente!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Passagem dos Dias:</strong> 1 dia passa a cada 15 segundos (na velocidade 1x). Ao completar 7 dias, a semana pode ser avançada com celebração.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Zona Crítica:</strong> Se a Saúde Geral cair abaixo de 30%, um alerta vermelho pulsante avisará para você cuidar da mãe imediatamente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Vitória & Esgotamento:</strong> Conclua 40 semanas gestacionais e 8 semanas do puerpério para vencer. Se a saúde zerar, o jogo traz reflexão educativa acolhedora.</span>
                  </li>
                </ul>
              </div>

              {/* Section 3: DUM Calculator */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold">3</span>
                  Calculadora Gestacional por DUM & Regra de Naegele
                </h3>
                <p className="text-xs text-slate-600">
                  Clique no botão <strong>📅 DUM</strong> no cabeçalho ou painel lateral para calcular sua idade gestacional real pelo primeiro dia da última menstruação. O sistema calcula semanas, dias, trimestre e a <strong>Data Provável do Parto (DPP)</strong> e permite sincronizar o simulador com a sua gravidez real!
                </p>
              </div>

              {/* Section 4: Accessibility */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold">4</span>
                  Acessibilidade & Inclusão
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold block text-slate-800">🔠 Tamanho de Fonte</span>
                    <span className="text-[11px] text-slate-500">Normal, Grande e Extra Grande.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold block text-slate-800">👁️ Daltonismo</span>
                    <span className="text-[11px] text-slate-500">Protanopia, Deuteranopia, Tritanopia e Monocromático.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold block text-slate-800">🌓 Alto Contraste</span>
                    <span className="text-[11px] text-slate-500">Bordas escuras e legibilidade otimizada.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold block text-slate-800">🗣️ Síntese de Voz (TTS)</span>
                    <span className="text-[11px] text-slate-500">Leitor de tela em áudio em português.</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /*                   MANUAL DO DESENVOLVEDOR                      */
            /* ============================================================== */
            <div className="space-y-6">
              {/* Highlight Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <span>Engenharia & Arquitetura de Software</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Stack: <strong>React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS v4 + Web Audio / Speech APIs</strong>. Execução 100% autônoma no cliente (`Client-Side Only`).
                  </p>
                </div>
                <div className="shrink-0 text-[11px] font-semibold text-indigo-800 bg-white/80 px-3 py-1 rounded-xl border border-indigo-200">
                  Arquivo: MANUAL_DO_DESENVOLVEDOR.md
                </div>
              </div>

              {/* Terminal Quick Start */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  Comandos de Terminal & Execução
                </h3>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs space-y-2 relative">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 text-[11px]">
                    <span>bash / zsh</span>
                    <button
                      onClick={() => handleCopy('npm install && npm run dev', 'terminal-cmds')}
                      className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
                    >
                      {copiedCode === 'terminal-cmds' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'terminal-cmds' ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <p className="text-emerald-400"># Instalar dependências e iniciar servidor local</p>
                  <p className="text-slate-200">npm install</p>
                  <p className="text-slate-200">npm run dev <span className="text-slate-500"># Roda em http://localhost:3000</span></p>
                  <p className="text-emerald-400 pt-1"># Verificação de tipos e compilação para produção</p>
                  <p className="text-slate-200">npm run lint <span className="text-slate-500"># tsc --noEmit</span></p>
                  <p className="text-slate-200">npm run build <span className="text-slate-500"># vite build</span></p>
                </div>
              </div>

              {/* Architecture & Motors */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  Mecanismos Centrais do Simulador (`src/App.tsx`)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-xs text-indigo-900">⏱️ decayTimer (5000ms / speed)</span>
                    <p className="text-xs text-slate-600">
                      Loop de decaimento natural contínuo. Aplica deltas negativos realistas em fome, sede, sono, higiene e energia, além dos atributos do recém-nascido no puerpério.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-xs text-indigo-900">📅 timeTimer (15000ms / speed)</span>
                    <p className="text-xs text-slate-600">
                      Avanço dos dias no calendário obstétrico (1 a 7 dias por semana). Gatilho de transição automática da semana 40 para a fase puerperal.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-xs text-indigo-900">❤️ calculateHealth()</span>
                    <p className="text-xs text-slate-600">
                      Média ponderada com penalidades ativas se qualquer necessidade vital decair abaixo do limiar de segurança de 30%.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-xs text-indigo-900">💾 storage.ts (Persistência)</span>
                    <p className="text-xs text-slate-600">
                      Serialização automática com versionamento (`mamaegotchi_state_v1`), garantindo persistência sem perda de progresso ao fechar o navegador.
                    </p>
                  </div>
                </div>
              </div>

              {/* How to add new events */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Como Adicionar Novos Eventos Clínicos
                </h3>
                <p className="text-xs text-slate-600">
                  Para cadastrar um novo dilema médico, basta adicionar uma entrada no dicionário da semana em <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono">src/constants/pregnancyEvents.ts</code> ou <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono">postpartumEvents.ts</code>. A fábrica <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono">eventGenerators.ts</code> cuidará da injeção no jogo automaticamente.
                </p>
              </div>

              {/* Hosting at UNCISAL */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  Hospedagem & Infraestrutura na UNCISAL
                </h3>
                <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-200/80 space-y-1.5 text-xs text-slate-700">
                  <p>
                    O MamãeGotchi é uma <strong>Single Page Application (SPA) estática</strong>. Ele não requer banco de dados relacional pesado no servidor, pois toda a simulação, síntese de áudio (Web Audio API) e leitor de voz (Web Speech API) rodam no próprio navegador do usuário.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2 bg-white rounded-xl border border-indigo-100 font-mono text-[11px]">
                      <strong>Requisitos Mínimos:</strong> 1 vCPU, 1 GB RAM, 10 GB disco, Linux + Nginx ou Docker.
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-indigo-100 font-mono text-[11px]">
                      <strong>Deploy com 1 comando:</strong> <span className="text-indigo-600">docker compose up -d</span> (imagem Alpine de ~25MB).
                    </div>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <a
                      href="/SOLICITACAO_INFRAESTRUTURA_SUTIN.docx"
                      download="SOLICITACAO_INFRAESTRUTURA_SUTIN.docx"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <span>📥 Baixar Solicitação para SUTIN (.docx)</span>
                    </a>
                    <a
                      href="/SOLICITACAO_INFRAESTRUTURA_SUTIN.doc"
                      download="SOLICITACAO_INFRAESTRUTURA_SUTIN.doc"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <span>📄 Formato Word (.doc)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Coleta de Avaliações com Google Sheets */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <Heart className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Coleta de Avaliações & Pesquisa Científica (Google Sheets)
                </h3>
                <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-2 text-xs text-slate-700">
                  <p>
                    As usuárias podem avaliar o jogo com <strong>estrelas (1 a 5)</strong>, tags rápidas e comentários abertos ao final da jornada ou pelo botão <strong>⭐ Avaliar</strong> no cabeçalho.
                  </p>
                  <p>
                    Para receber as avaliações diretamente em uma <strong>planilha do Google Sheets no seu Google Drive institucional (`@uncisal.edu.br`)</strong> em tempo real, consulte o guia passo a passo em <code className="px-1.5 py-0.5 bg-white rounded text-amber-900 font-mono font-bold">INTEGRACAO_GOOGLE_SHEETS.md</code> na raiz do projeto.
                  </p>
                  <div className="p-2 bg-white rounded-xl border border-amber-200 font-mono text-[11px] text-amber-900">
                    <strong>Resiliência Offline:</strong> Toda avaliação é gravada simultaneamente no navegador (<code className="text-rose-600">localStorage</code>) com botão de exportar em CSV para garantir que nenhum dado de pesquisa seja perdido!
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            Os manuais completos em Markdown estão disponíveis na raiz do projeto: <code className="font-mono text-slate-700 font-semibold">MANUAL_DO_USUARIO.md</code> e <code className="font-mono text-slate-700 font-semibold">MANUAL_DO_DESENVOLVEDOR.md</code>.
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
          >
            Fechar Manual
          </button>
        </div>
      </motion.div>
    </div>
  );
};
