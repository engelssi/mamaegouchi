import React from 'react';
import { motion } from 'motion/react';
import { AvatarConfig } from '../types';
import { Sparkles, X, Check, Palette, Smile, Shirt, Flower2, Image, Heart } from 'lucide-react';
import { playSound } from '../utils/sound';

interface AvatarCustomizerModalProps {
  config: AvatarConfig;
  onChangeConfig: (newConfig: AvatarConfig) => void;
  onClose: () => void;
}

const SKIN_OPTIONS: { id: AvatarConfig['skinTone']; label: string; preview: string; desc: string }[] = [
  { id: 'fair', label: 'Pêssego Claro', preview: '#fed7aa', desc: 'Tom suave & iluminado' },
  { id: 'tan', label: 'Morena Canela', preview: '#e5aa70', desc: 'Tom dourado caloroso' },
  { id: 'rich', label: 'Morena Cacau', preview: '#a76b41', desc: 'Tom bronze aconchegante' },
  { id: 'deep', label: 'Negra Radiante', preview: '#63391e', desc: 'Tom ébano luminoso' },
];

const HAIR_STYLE_OPTIONS: { id: AvatarConfig['hairStyle']; label: string; icon: string }[] = [
  { id: 'wavy', label: 'Ondas Longas', icon: '🌊' },
  { id: 'bun', label: 'Coque Alto & Mechas', icon: '👱‍♀️' },
  { id: 'braids', label: 'Tranças Afro Elegantes', icon: '✨' },
  { id: 'bob', label: 'Chanel Moderno', icon: '💇‍♀️' },
  { id: 'curls', label: 'Cachos Volumosos', icon: '🌀' },
];

const HAIR_COLOR_OPTIONS: { id: AvatarConfig['hairColor']; label: string; color: string }[] = [
  { id: 'brunette', label: 'Castanho Avelã', color: '#4a2e18' },
  { id: 'black', label: 'Preto Ébano', color: '#1c1917' },
  { id: 'blonde', label: 'Loiro Dourado', color: '#d4a373' },
  { id: 'red', label: 'Ruivo Acobreado', color: '#993d18' },
  { id: 'caramel', label: 'Caramelo Quente', color: '#7c4a27' },
];

const OUTFIT_OPTIONS: { id: AvatarConfig['outfit']; label: string; primary: string; secondary: string; tag: string }[] = [
  { id: 'rose', label: 'Rosa Quartz Floral', primary: '#f472b6', secondary: '#ec4899', tag: 'Clássico Romântico' },
  { id: 'lavender', label: 'Lavanda Relaxante', primary: '#a78bfa', secondary: '#8b5cf6', tag: 'Acolhedor' },
  { id: 'sage', label: 'Verde Sálvia Puro', primary: '#34d399', secondary: '#059669', tag: 'Natural & Zen' },
  { id: 'sky', label: 'Azul Céu Maternidade', primary: '#38bdf8', secondary: '#0284c7', tag: 'Fresco & Serena' },
  { id: 'terracotta', label: 'Terracota Confort', primary: '#fb923c', secondary: '#ea580c', tag: 'Moderno' },
  { id: 'pajama', label: 'Pijama Macio Noturno', primary: '#818cf8', secondary: '#4f46e5', tag: 'Ultradescanso' },
];

const ACCESSORY_OPTIONS: { id: AvatarConfig['accessory']; label: string; icon: string }[] = [
  { id: 'flower', label: 'Flor de Cerejeira', icon: '🌸' },
  { id: 'headband', label: 'Tiara Perolada', icon: '👑' },
  { id: 'bow', label: 'Laço Delicado', icon: '🎀' },
  { id: 'glasses', label: 'Óculos Dourados', icon: '👓' },
  { id: 'none', label: 'Sem Acessório', icon: '✨' },
];

const BACKDROP_OPTIONS: { id: AvatarConfig['backdrop']; label: string; icon: string; desc: string }[] = [
  { id: 'nursery', label: 'Quarto do Bebê', icon: '🧸', desc: 'Mobiliário fofo & tons pastéis' },
  { id: 'garden', label: 'Jardim Ensolarado', icon: '🌿', desc: 'Natureza, flores & ar puro' },
  { id: 'night', label: 'Noite Aconchegante', icon: '🌙', desc: 'Luzes suaves & sono sereno' },
  { id: 'minimal', label: 'Estúdio Clean Zen', icon: '☁️', desc: 'Espaço minimalista focado' },
];

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  config,
  onChangeConfig,
  onClose
}) => {
  const [activeTab, setActiveTab] = React.useState<'skin' | 'hair' | 'outfit' | 'accessories' | 'backdrop'>('skin');

  const updateSetting = <K extends keyof AvatarConfig>(key: K, val: AvatarConfig[K]) => {
    playSound('pop');
    onChangeConfig({ ...config, [key]: val });
  };

  return (
    <div
      id="avatar-customizer-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        id="avatar-customizer-dialog"
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-4 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/20">
              💄
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight brand-font">
                Personalizar Mamãe
              </h2>
              <span className="text-xs text-rose-100 font-medium">
                Escolha o tom de pele, estilo de cabelo, roupas e cenário
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

        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 bg-rose-50/40 px-3 pt-2 gap-1 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('skin')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'skin'
                ? 'bg-white text-rose-600 border-t-2 border-rose-500 shadow-2xs'
                : 'text-slate-600 hover:text-rose-500'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Pele</span>
          </button>

          <button
            onClick={() => setActiveTab('hair')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'hair'
                ? 'bg-white text-rose-600 border-t-2 border-rose-500 shadow-2xs'
                : 'text-slate-600 hover:text-rose-500'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Cabelo</span>
          </button>

          <button
            onClick={() => setActiveTab('outfit')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'outfit'
                ? 'bg-white text-rose-600 border-t-2 border-rose-500 shadow-2xs'
                : 'text-slate-600 hover:text-rose-500'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Roupas</span>
          </button>

          <button
            onClick={() => setActiveTab('accessories')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'accessories'
                ? 'bg-white text-rose-600 border-t-2 border-rose-500 shadow-2xs'
                : 'text-slate-600 hover:text-rose-500'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>Acessórios</span>
          </button>

          <button
            onClick={() => setActiveTab('backdrop')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-2xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'backdrop'
                ? 'bg-white text-rose-600 border-t-2 border-rose-500 shadow-2xs'
                : 'text-slate-600 hover:text-rose-500'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Cenário</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* TAB 1: SKIN TONES */}
          {activeTab === 'skin' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Selecione o Tom de Pele:
              </div>
              <div className="grid grid-cols-2 gap-3">
                {SKIN_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => updateSetting('skinTone', opt.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                      config.skinTone === opt.id
                        ? 'border-rose-500 bg-rose-50/50 shadow-sm ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl shadow-xs border border-black/10 shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: opt.preview }}
                    >
                      {config.skinTone === opt.id && <Check className="w-5 h-5 text-slate-800" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800">{opt.label}</div>
                      <div className="text-[11px] text-slate-500">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: HAIR (STYLE & COLOR) */}
          {activeTab === 'hair' && (
            <div className="space-y-5">
              {/* Hair Style */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Estilo de Corte / Penteado:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {HAIR_STYLE_OPTIONS.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => updateSetting('hairStyle', style.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                        config.hairStyle === style.id
                          ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-sm ring-2 ring-rose-200'
                          : 'border-slate-200 hover:border-rose-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{style.icon}</span>
                      <span className="text-xs font-bold text-center leading-tight">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Cor do Cabelo:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {HAIR_COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => updateSetting('hairColor', color.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                        config.hairColor === color.id
                          ? 'border-rose-500 bg-rose-50 shadow-sm ring-2 ring-rose-200'
                          : 'border-slate-200 hover:border-rose-300 bg-white'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full shadow-inner border border-black/10 shrink-0"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="text-xs font-semibold text-slate-800">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OUTFITS */}
          {activeTab === 'outfit' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Coleção de Vestuário Maternidade:
              </div>
              <div className="grid grid-cols-2 gap-3">
                {OUTFIT_OPTIONS.map((outfit) => (
                  <button
                    key={outfit.id}
                    onClick={() => updateSetting('outfit', outfit.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                      config.outfit === outfit.id
                        ? 'border-rose-500 bg-rose-50/50 shadow-sm ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl shadow-xs shrink-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${outfit.primary}, ${outfit.secondary})` }}
                    >
                      {config.outfit === outfit.id && <Check className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800">{outfit.label}</div>
                      <div className="text-[10px] text-rose-700 font-semibold">{outfit.tag}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ACCESSORIES */}
          {activeTab === 'accessories' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Acessórios & Detalhes Especiais:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ACCESSORY_OPTIONS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => updateSetting('accessory', acc.id)}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      config.accessory === acc.id
                        ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-sm ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-rose-300 bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-3xl mb-1.5">{acc.icon}</span>
                    <span className="text-xs font-bold text-center leading-tight">{acc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BACKDROP ENVIRONMENT */}
          {activeTab === 'backdrop' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cenário de Fundo do Avatar:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BACKDROP_OPTIONS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => updateSetting('backdrop', bg.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                      config.backdrop === bg.id
                        ? 'border-rose-500 bg-rose-50/50 shadow-sm ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl p-2 rounded-xl bg-slate-100 shrink-0">{bg.icon}</span>
                    <div>
                      <div className="font-bold text-xs text-slate-800">{bg.label}</div>
                      <div className="text-[11px] text-slate-500 leading-snug">{bg.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Salvo automaticamente</span>
          </div>

          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Concluir & Voltar
          </button>
        </div>
      </motion.div>
    </div>
  );
};
