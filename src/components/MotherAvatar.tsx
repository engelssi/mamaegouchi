import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Status, GamePhase, AvatarConfig } from '../types';
import { 
  Sparkles, 
  Heart, 
  AlertCircle, 
  CheckCircle2, 
  Palette, 
  Wand2,
  Utensils,
  Droplets,
  Moon,
  Zap,
  Smile,
  Bath,
  Footprints
} from 'lucide-react';
import { playSound } from '../utils/sound';

interface MotherAvatarProps {
  status: Status;
  week: number;
  phase: GamePhase;
  activeAnimation: string | null;
  floatingText: string | null;
  avatarConfig?: AvatarConfig;
  onOpenCustomizer?: () => void;
  onBellyTap?: () => void;
  onOpenAction?: (category: 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk' | 'baby_feed' | 'baby_sleep' | 'baby_diaper' | 'baby_comfort') => void;
}

// Color palettes for customization
const SKIN_TONES = {
  fair: { main: '#fed7aa', shadow: '#fba979', blush: '#fb7185', lip: '#e11d48', highlight: '#fff1e6' },
  tan: { main: '#e5aa70', shadow: '#c68345', blush: '#f43f5e', lip: '#be123c', highlight: '#fef3c7' },
  rich: { main: '#a76b41', shadow: '#854f2c', blush: '#e11d48', lip: '#9f1239', highlight: '#fed7aa' },
  deep: { main: '#63391e', shadow: '#44220e', blush: '#be123c', lip: '#881337', highlight: '#e5aa70' },
};

const HAIR_COLORS = {
  brunette: { main: '#4a2e18', shadow: '#2c1a0c', highlight: '#784d28' },
  black: { main: '#262626', shadow: '#0a0a0a', highlight: '#525252' },
  blonde: { main: '#d4a373', shadow: '#a97142', highlight: '#fae8b0' },
  red: { main: '#993d18', shadow: '#6c2207', highlight: '#c25827' },
  caramel: { main: '#7c4a27', shadow: '#502d14', highlight: '#b06f3e' },
};

const OUTFIT_COLORS = {
  rose: { top: '#f472b6', bottom: '#ec4899', accent: '#fbcfe8', shadow: '#be185d' },
  lavender: { top: '#a78bfa', bottom: '#8b5cf6', accent: '#ddd6fe', shadow: '#6d28d9' },
  sage: { top: '#34d399', bottom: '#059669', accent: '#a7f3d0', shadow: '#047857' },
  sky: { top: '#38bdf8', bottom: '#0284c7', accent: '#bae6fd', shadow: '#0369a1' },
  terracotta: { top: '#fb923c', bottom: '#ea580c', accent: '#fed7aa', shadow: '#c2410c' },
  pajama: { top: '#818cf8', bottom: '#4f46e5', accent: '#c7d2fe', shadow: '#3730a3' },
};

export const MotherAvatar: React.FC<MotherAvatarProps> = ({
  status,
  week,
  phase,
  activeAnimation,
  floatingText,
  avatarConfig = {
    skinTone: 'fair',
    hairStyle: 'wavy',
    hairColor: 'brunette',
    outfit: 'rose',
    accessory: 'flower',
    backdrop: 'nursery'
  },
  onOpenCustomizer,
  onBellyTap,
  onOpenAction
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [tapHeartEffect, setTapHeartEffect] = useState<{ id: number; x: number; y: number }[]>([]);
  const [bellyMessage, setBellyMessage] = useState<string | null>(null);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3800 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Guide animation showing where to customize avatar on page load / refresh
  const [showCustomizeHint, setShowCustomizeHint] = useState(true);

  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowCustomizeHint(false);
    }, 8500);
    return () => clearTimeout(hintTimer);
  }, []);

  // Determine avatar facial mood based on stats
  const isExhausted = status.sleep < 30 || status.energy < 25;
  const isHungry = status.hunger < 30;
  const isThirsty = status.thirst < 30;
  const isSick = status.health < 40;
  const isSad = status.happiness < 30;
  const isGlowing = status.health > 80 && status.happiness > 70 && status.sleep > 60;

  // Selected palettes
  const skin = SKIN_TONES[avatarConfig.skinTone] || SKIN_TONES.fair;
  const hair = HAIR_COLORS[avatarConfig.hairColor] || HAIR_COLORS.brunette;
  const outfit = OUTFIT_COLORS[avatarConfig.outfit] || OUTFIT_COLORS.rose;

  // Calculate belly scale based on pregnancy week (weeks 1 to 40)
  let bellyScale = 1;
  let bellyWidth = 26;
  let bellyHeight = 26;
  let bellyTranslateX = 0;
  let trimester = 1;

  if (phase === 'PREGNANCY') {
    const progress = Math.min(1, Math.max(0, (week - 1) / 39));
    trimester = week <= 13 ? 1 : week <= 27 ? 2 : 3;
    bellyScale = 1 + progress * 2.1;
    bellyWidth = 26 + progress * 48;
    bellyHeight = 26 + progress * 44;
    bellyTranslateX = progress * 20;
  } else {
    const postProgress = Math.max(0, 1 - (week - 1) / 7);
    bellyWidth = 38 + postProgress * 14;
    bellyHeight = 34 + postProgress * 10;
    bellyTranslateX = postProgress * 8;
  }

  // Interactive Belly Tap
  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newEffect = { id: Date.now(), x, y };
    setTapHeartEffect((prev) => [...prev.slice(-4), newEffect]);

    setTimeout(() => {
      setTapHeartEffect((prev) => prev.filter((item) => item.id !== newEffect.id));
    }, 1500);

    playSound('pop');

    if (phase === 'PREGNANCY') {
      const messages = [
        'Tum-tum! 💓 O bebê deu um chutinho!',
        'Sentindo todo o carinho da mamãe! ✨',
        'Vínculo afetivo fortalecido! 🌸',
        'Amor e ocitocina em alta! 🥰',
        'O bebê ouve sua voz com alegria! 🎵'
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setBellyMessage(randomMsg);
    } else {
      const babyMessages = [
        'Bebê aconchegado no colo da mamãe! 👶',
        'Sorrisinho reflexo de amor! 🥰',
        'Coração quentinho e protegido! 💖',
        'Aqueceu o coração da família! 🍼'
      ];
      const randomMsg = babyMessages[Math.floor(Math.random() * babyMessages.length)];
      setBellyMessage(randomMsg);
    }

    setTimeout(() => setBellyMessage(null), 2500);

    if (onBellyTap) {
      onBellyTap();
    }
  };

  // Expression title
  const getStatusBadge = () => {
    if (isSick) return { label: 'Saúde Frágil — Cuide-se!', color: 'bg-rose-100 text-rose-800 border-rose-200', icon: <AlertCircle className="w-3.5 h-3.5" /> };
    if (isHungry) return { label: 'Sentindo Muita Fome', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: <AlertCircle className="w-3.5 h-3.5" /> };
    if (isThirsty) return { label: 'Necessitando Hidratação', color: 'bg-sky-100 text-sky-800 border-sky-200', icon: <AlertCircle className="w-3.5 h-3.5" /> };
    if (isExhausted) return { label: 'Exausta — Precisa Descansar', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: <AlertCircle className="w-3.5 h-3.5" /> };
    if (isSad) return { label: 'Precisando de Carinho & Apoio', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: <Heart className="w-3.5 h-3.5" /> };
    if (isGlowing) return { label: 'Radiante & Saudável ✨', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: <Sparkles className="w-3.5 h-3.5" /> };
    return { label: 'Estável & Cuidada', color: 'bg-teal-50 text-teal-800 border-teal-200', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
  };

  const badge = getStatusBadge();

  interface CareButtonItem {
    id: string;
    category: 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk';
    label: string;
    sublabel: string;
    value: number;
    icon: React.ReactNode;
    sound: 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk';
    isCritical: boolean;
    theme: {
      bg: string;
      border: string;
      iconBg: string;
      barColor: string;
    };
  }

  // 6 Roomy Maternal Care Action Buttons
  const careButtons: CareButtonItem[] = [
    {
      id: 'action-eat',
      category: 'eat',
      label: phase === 'POSTPARTUM' ? 'Alimentar Mãe' : 'Comer',
      sublabel: phase === 'POSTPARTUM' ? 'Nutrição Pós-Parto' : 'Nutrição & Fibras',
      value: status.hunger,
      icon: <Utensils className="w-4 h-4 text-amber-700" />,
      sound: 'eat',
      isCritical: status.hunger < 30,
      theme: {
        bg: 'bg-white hover:bg-amber-50 active:bg-amber-100',
        border: 'border-amber-200 hover:border-amber-400',
        iconBg: 'bg-amber-100 text-amber-800',
        barColor: 'bg-gradient-to-r from-amber-400 to-amber-500'
      }
    },
    {
      id: 'action-drink',
      category: 'drink',
      label: phase === 'POSTPARTUM' ? 'Hidratar Mãe' : 'Beber',
      sublabel: phase === 'POSTPARTUM' ? 'Água para Lactação' : 'Água & Eletrólitos',
      value: status.thirst,
      icon: <Droplets className="w-4 h-4 text-sky-700" />,
      sound: 'drink',
      isCritical: status.thirst < 30,
      theme: {
        bg: 'bg-white hover:bg-sky-50 active:bg-sky-100',
        border: 'border-sky-200 hover:border-sky-400',
        iconBg: 'bg-sky-100 text-sky-800',
        barColor: 'bg-gradient-to-r from-sky-400 to-teal-400'
      }
    },
    {
      id: 'action-sleep',
      category: 'sleep',
      label: phase === 'POSTPARTUM' ? 'Descanso da Mãe' : 'Dormir',
      sublabel: phase === 'POSTPARTUM' ? 'Sono Reparador' : 'Sono em DLE',
      value: status.sleep,
      icon: <Moon className="w-4 h-4 text-indigo-700" />,
      sound: 'sleep',
      isCritical: status.sleep < 30,
      theme: {
        bg: 'bg-white hover:bg-indigo-50 active:bg-indigo-100',
        border: 'border-indigo-200 hover:border-indigo-400',
        iconBg: 'bg-indigo-100 text-indigo-800',
        barColor: 'bg-gradient-to-r from-indigo-400 to-purple-500'
      }
    },
    {
      id: 'action-hygiene',
      category: 'hygiene',
      label: phase === 'POSTPARTUM' ? 'Higiene da Mãe' : 'Higiene',
      sublabel: phase === 'POSTPARTUM' ? 'Cuidados do Corpo' : 'Bucal & Corporal',
      value: status.hygiene,
      icon: <Bath className="w-4 h-4 text-emerald-700" />,
      sound: 'hygiene',
      isCritical: status.hygiene < 30,
      theme: {
        bg: 'bg-white hover:bg-emerald-50 active:bg-emerald-100',
        border: 'border-emerald-200 hover:border-emerald-400',
        iconBg: 'bg-emerald-100 text-emerald-800',
        barColor: 'bg-gradient-to-r from-teal-400 to-emerald-500'
      }
    },
    {
      id: 'action-relax',
      category: 'relax',
      label: phase === 'POSTPARTUM' ? 'Relaxar a Mente' : 'Relaxar',
      sublabel: phase === 'POSTPARTUM' ? 'Saúde Mental & Apoio' : 'Saúde Mental',
      value: status.happiness,
      icon: <Smile className="w-4 h-4 text-pink-700" />,
      sound: 'relax',
      isCritical: status.happiness < 30,
      theme: {
        bg: 'bg-white hover:bg-pink-50 active:bg-pink-100',
        border: 'border-pink-200 hover:border-pink-400',
        iconBg: 'bg-pink-100 text-pink-800',
        barColor: 'bg-gradient-to-r from-pink-400 to-rose-500'
      }
    },
    {
      id: 'action-walk',
      category: 'walk',
      label: phase === 'POSTPARTUM' ? 'Movimento Leve' : 'Caminhar',
      sublabel: phase === 'POSTPARTUM' ? 'Recuperação Postural' : 'Exercício Seguro',
      value: status.energy,
      icon: <Footprints className="w-4 h-4 text-teal-700" />,
      sound: 'walk',
      isCritical: status.energy < 30,
      theme: {
        bg: 'bg-white hover:bg-teal-50 active:bg-teal-100',
        border: 'border-teal-200 hover:border-teal-400',
        iconBg: 'bg-teal-100 text-teal-800',
        barColor: 'bg-gradient-to-r from-teal-400 to-teal-500'
      }
    }
  ];

  const renderCareButton = (btn: CareButtonItem) => {
    const clamped = Math.max(0, Math.min(100, Math.round(btn.value)));
    return (
      <motion.button
        key={btn.id}
        id={btn.id}
        type="button"
        whileHover={{ scale: 1.02, translateY: -1 }}
        whileTap={{ scale: 0.96 }}
        onClick={(e) => {
          e.stopPropagation();
          playSound(btn.sound);
          onOpenAction?.(btn.category);
        }}
        className={`relative group flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl border transition-all text-left shadow-2xs hover:shadow-md cursor-pointer select-none h-full min-h-[64px] sm:min-h-[72px] touch-manipulation active:scale-[0.97] ${btn.theme.bg} ${btn.theme.border} ${
          btn.isCritical ? 'ring-2 ring-rose-400/80 animate-pulse bg-rose-50/90' : ''
        }`}
        title={`${btn.label} (${btn.sublabel}): ${clamped}%. Toque para abrir ação.`}
      >
        {btn.isCritical && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        )}

        <div className="flex items-center justify-between gap-1.5 w-full mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`p-1.5 sm:p-2 rounded-xl ${btn.theme.iconBg} shadow-2xs shrink-0`}>
              {btn.icon}
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-bold leading-tight block text-slate-800">
                {btn.label}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block">
                {btn.sublabel}
              </span>
            </div>
          </div>
          <span className={`text-xs sm:text-sm font-black tabular-nums shrink-0 ${btn.isCritical ? 'text-rose-600' : 'text-slate-700'}`}>
            {clamped}%
          </span>
        </div>

        {/* Mini Progress Bar */}
        <div className="h-1.5 sm:h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
          <motion.div
            className={`h-full rounded-full ${btn.theme.barColor}`}
            initial={false}
            animate={{ width: `${clamped}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </motion.button>
    );
  };

  // Backdrop background CSS classes
  const getBackdropStyles = () => {
    switch (avatarConfig.backdrop) {
      case 'garden':
        return 'from-emerald-100/70 via-teal-50/50 to-amber-50/40 border-emerald-200/80';
      case 'night':
        return 'from-indigo-950/80 via-slate-900/80 to-purple-950/90 text-white border-indigo-500/30';
      case 'minimal':
        return 'from-slate-100/80 via-white to-rose-50/50 border-slate-200';
      case 'nursery':
      default:
        return 'from-rose-100/70 via-pink-50/50 to-amber-50/30 border-rose-200/80';
    }
  };

  return (
    <div
      id="mother-avatar-container"
      onClick={handleAvatarClick}
      className={`relative group flex flex-col items-center justify-between p-4 bg-gradient-to-b ${getBackdropStyles()} rounded-3xl shadow-sm overflow-hidden min-h-[320px] cursor-pointer transition-colors duration-500`}
    >
      {/* Dynamic Backdrop Decor Elements */}
      {avatarConfig.backdrop === 'nursery' && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-3 left-4 text-sm">🧸</div>
          <div className="absolute top-3 right-12 text-sm">⭐</div>
          <div className="absolute top-8 left-1/4 text-xs text-rose-300 font-bold">✨</div>
        </div>
      )}
      {avatarConfig.backdrop === 'garden' && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-3 left-4 text-sm">🌿</div>
          <div className="absolute top-3 right-12 text-sm">🌸</div>
          <div className="absolute bottom-4 left-6 text-sm">🍃</div>
        </div>
      )}
      {avatarConfig.backdrop === 'night' && (
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-3 left-5 text-sm">🌙</div>
          <div className="absolute top-4 right-12 text-xs">✨</div>
          <div className="absolute top-10 left-1/3 text-[10px]">⭐</div>
        </div>
      )}

      {/* Background Soft Glow / Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-56 h-56 rounded-full blur-3xl transition-all duration-700 ${
            isGlowing
              ? 'bg-amber-300/40 animate-pulse'
              : isSick
              ? 'bg-rose-300/30'
              : isExhausted
              ? 'bg-indigo-300/25'
              : 'bg-pink-200/35'
          }`}
        />
      </div>

      {/* Floating Animated Reaction Text (+🥗, +💧, etc.) */}
      <AnimatePresence>
        {floatingText && (
          <motion.div
            key={floatingText}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -28, scale: 1.1 }}
            exit={{ opacity: 0, y: -45, scale: 0.9 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-8 z-30 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white font-bold text-xs tracking-wide shadow-lg border border-white/30 backdrop-blur-sm flex items-center gap-1.5 pointer-events-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>{floatingText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Belly Tap Message Toast */}
      <AnimatePresence>
        {bellyMessage && (
          <motion.div
            key={bellyMessage}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="absolute top-12 z-30 px-3 py-1.5 rounded-2xl bg-white/95 text-rose-700 font-bold text-xs shadow-md border border-rose-200 backdrop-blur-sm flex items-center gap-1.5 pointer-events-none"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{bellyMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap Heart Explosion Particles */}
      <AnimatePresence>
        {tapHeartEffect.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, scale: 0.5, x: item.x - 12, y: item.y - 12 }}
            animate={{ opacity: 0, scale: 1.6, y: item.y - 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute pointer-events-none z-30 text-rose-500"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Active Animation Overlay Icon */}
      <AnimatePresence>
        {activeAnimation && (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-2xl bg-white shadow-md border border-rose-200 flex items-center justify-center text-xl"
          >
            {activeAnimation === 'eat' && '🥗'}
            {activeAnimation === 'drink' && '💧'}
            {activeAnimation === 'sleep' && '💤'}
            {activeAnimation === 'hygiene' && '🧼'}
            {activeAnimation === 'relax' && '🌸'}
            {activeAnimation === 'walk' && '👟'}
            {activeAnimation === 'baby_feed' && '🤱'}
            {activeAnimation === 'baby_sleep' && '🌙'}
            {activeAnimation === 'baby_diaper' && '👶'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleeping 'Zzz' particles */}
      {(isExhausted || activeAnimation === 'sleep') && (
        <motion.div
          animate={{ y: [-5, -25, -45], opacity: [0, 1, 0], x: [0, 8, 16] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute top-16 right-16 z-20 text-indigo-500 font-black text-sm pointer-events-none"
        >
          Zzz...
        </motion.div>
      )}

      {/* Top Header Section: Status Badge, Saúde Geral %, Trimestre, and Tap Hint ABOVE the Avatar */}
      <div 
        className="w-full flex flex-col gap-2 mb-2 pb-2.5 border-b border-rose-200/70 z-20 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Row 1: Customize Button with Tutorial Animation + Status Badge + Saúde Geral */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {/* Customize Avatar Button with Animated Callout */}
            {onOpenCustomizer && (
              <div className="relative">
                <button
                  id="btn-customize-avatar"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCustomizeHint(false);
                    playSound('click');
                    onOpenCustomizer();
                  }}
                  title="Personalizar Cabelo, Pele, Roupas e Cenário"
                  className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer active:scale-95 touch-manipulation shadow-2xs ${
                    showCustomizeHint 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-300 ring-4 ring-pink-400/60 animate-pulse shadow-md' 
                      : 'bg-white/90 hover:bg-white text-rose-700 hover:text-rose-800 border-rose-200 hover:shadow-xs'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Personalizar</span>
                </button>

                {/* Animated Guide Callout that shows upon loading/updating page */}
                <AnimatePresence>
                  {showCustomizeHint && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.75, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                        opacity: { duration: 0.3 }
                      }}
                      className="absolute top-full left-0 mt-2 z-50 px-3 py-1.5 rounded-xl bg-slate-900 text-white font-extrabold text-[11px] shadow-2xl border border-white/30 flex items-center gap-1.5 whitespace-nowrap pointer-events-none"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                      <span>Personalize seu avatar aqui! 🎨</span>
                      <div className="absolute -top-1.5 left-4 w-3 h-3 bg-slate-900 rotate-45 border-t border-l border-white/30"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-xs ${badge.color}`}>
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-lg bg-rose-100 text-rose-700">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            </div>
            <span className="text-xs font-bold text-slate-700">Saúde Geral:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black shadow-2xs border ${
              status.health < 40 
                ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse' 
                : status.health < 70 
                ? 'bg-amber-100 text-amber-800 border-amber-300' 
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}>
              {Math.round(status.health)}%
            </span>
          </div>
        </div>

        {/* Row 2: Overall Health Progress Bar */}
        <div className="px-0.5">
          <div className="h-2 w-full bg-white/90 rounded-full overflow-hidden p-0.5 border border-rose-200/80 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-emerald-500"
              initial={false}
              animate={{ width: `${Math.max(0, Math.min(100, Math.round(status.health)))}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Row 3: Gestational Trimester & Tap Belly Affection Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
          <span>{phase === 'PREGNANCY' ? `Trimestre ${trimester} • Gestação` : 'Puerpério • Cuidado Pós-Parto'}</span>
          <span 
            className="text-rose-600 font-semibold cursor-pointer hover:underline flex items-center gap-1" 
            onClick={handleAvatarClick}
          >
            {phase === 'PREGNANCY' ? 'Toque na barriga para carinho 💓' : 'Toque no bebê para acarinhar 👶'}
          </span>
        </div>
      </div>

      {/* Interactive Care Stage: Character on Left + 6 Roomy Care Buttons on Right at the EXACT SAME HEIGHT */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-3 sm:gap-4 my-2 z-10 px-0 sm:px-1">
        {/* CHARACTER CANVAS (Left side) */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full sm:w-auto sm:min-w-[190px] md:min-w-[210px] lg:min-w-[220px]">
          <motion.div
            animate={{
              y: activeAnimation === 'walk' ? [0, -6, 0, -6, 0] : [0, -2.5, 0],
              scale: [1, 1.01, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: activeAnimation === 'walk' ? 0.6 : 3.5,
              ease: 'easeInOut'
            }}
            className="relative w-40 sm:w-44 md:w-48 lg:w-52 h-52 sm:h-60 md:h-64 flex items-center justify-center select-none"
          >
        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md overflow-visible">
          <defs>
            {/* Skin Gradients */}
            <linearGradient id="avatarSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={skin.highlight} />
              <stop offset="60%" stopColor={skin.main} />
              <stop offset="100%" stopColor={skin.shadow} />
            </linearGradient>

            {/* Hair Gradients */}
            <linearGradient id="avatarHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={hair.highlight} />
              <stop offset="50%" stopColor={hair.main} />
              <stop offset="100%" stopColor={hair.shadow} />
            </linearGradient>

            {/* Maternity Dress Gradients */}
            <linearGradient id="avatarDressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={outfit.accent} />
              <stop offset="35%" stopColor={outfit.top} />
              <stop offset="100%" stopColor={outfit.bottom} />
            </linearGradient>

            {/* Belly Soft Glow Gradient */}
            <radialGradient id="bellyShine" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="60%" stopColor={outfit.top} stopOpacity="0.1" />
              <stop offset="100%" stopColor={outfit.shadow} stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* 1. BACK HAIR LAYER */}
          {avatarConfig.hairStyle === 'wavy' && (
            <g>
              <path
                d="M 62,65 Q 42,120 48,185 Q 75,195 90,175 Q 78,120 76,65 Z"
                fill="url(#avatarHairGrad)"
              />
              <path
                d="M 138,65 Q 158,120 152,185 Q 125,195 110,175 Q 122,120 124,65 Z"
                fill="url(#avatarHairGrad)"
              />
            </g>
          )}

          {avatarConfig.hairStyle === 'braids' && (
            <g>
              <path d="M 58,60 Q 40,110 44,190 Q 62,195 72,175 Q 74,115 76,60 Z" fill="url(#avatarHairGrad)" />
              <path d="M 142,60 Q 160,110 156,190 Q 138,195 128,175 Q 126,115 124,60 Z" fill="url(#avatarHairGrad)" />
              {/* Gold Braid Rings */}
              <rect x="46" y="120" width="8" height="3" rx="1.5" fill="#facc15" />
              <rect x="44" y="150" width="8" height="3" rx="1.5" fill="#facc15" />
              <rect x="146" y="120" width="8" height="3" rx="1.5" fill="#facc15" />
              <rect x="148" y="150" width="8" height="3" rx="1.5" fill="#facc15" />
            </g>
          )}

          {avatarConfig.hairStyle === 'curls' && (
            <g>
              {/* Bouncy curls background volume */}
              <circle cx="56" cy="65" r="22" fill="url(#avatarHairGrad)" />
              <circle cx="144" cy="65" r="22" fill="url(#avatarHairGrad)" />
              <circle cx="50" cy="95" r="20" fill="url(#avatarHairGrad)" />
              <circle cx="150" cy="95" r="20" fill="url(#avatarHairGrad)" />
              <circle cx="56" cy="125" r="18" fill="url(#avatarHairGrad)" />
              <circle cx="144" cy="125" r="18" fill="url(#avatarHairGrad)" />
            </g>
          )}

          {avatarConfig.hairStyle === 'bun' && (
            <g>
              {/* High Bun / Topknot */}
              <circle cx="100" cy="18" r="19" fill="url(#avatarHairGrad)" />
              <circle cx="100" cy="18" r="17" fill="url(#avatarHairGrad)" stroke="#fbcfe8" strokeWidth="1.5" strokeDasharray="3 2" />
            </g>
          )}

          {/* 2. NECK & COLLARBONE */}
          <rect x="92" y="78" width="16" height="22" rx="5" fill="url(#avatarSkinGrad)" />
          {/* Subtle Neck shadow */}
          <path d="M 92,85 Q 100,90 108,85" stroke={skin.shadow} strokeWidth="1.5" fill="none" opacity="0.4" />

          {/* 3. MATERNITY DRESS / BODY */}
          <path
            d="M 76,95 Q 100,105 124,95 L 146,215 Q 100,230 54,215 Z"
            fill="url(#avatarDressGrad)"
          />
          {/* Soft Dress Folds & Highlights */}
          <path d="M 85,100 Q 82,160 70,215" stroke={outfit.shadow} strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M 115,100 Q 118,160 130,215" stroke={outfit.shadow} strokeWidth="1.5" fill="none" opacity="0.3" />

          {/* Pajama Stars Decal if pajama outfit */}
          {avatarConfig.outfit === 'pajama' && (
            <g opacity="0.6">
              <text x="82" y="125" fontSize="8" fill="#ffffff">✨</text>
              <text x="112" y="135" fontSize="7" fill="#ffffff">🌙</text>
              <text x="75" y="180" fontSize="8" fill="#ffffff">⭐</text>
            </g>
          )}

          {/* 4. PREGNANCY BELLY OR POSTPARTUM BELLY WITH GLOW */}
          <g>
            {/* Belly Shape */}
            <ellipse
              cx={100 + bellyTranslateX}
              cy="152"
              rx={bellyWidth / 2}
              ry={bellyHeight / 2}
              fill="url(#avatarDressGrad)"
              stroke={outfit.accent}
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            {/* Belly 3D Light Reflex */}
            <ellipse
              cx={96 + bellyTranslateX}
              cy="147"
              rx={(bellyWidth / 2) * 0.8}
              ry={(bellyHeight / 2) * 0.8}
              fill="url(#bellyShine)"
            />

            {/* Trimester 3 Linea Nigra (Delicate line on belly in 3rd trimester) */}
            {phase === 'PREGNANCY' && trimester === 3 && (
              <line
                x1={100 + bellyTranslateX}
                y1="135"
                x2={100 + bellyTranslateX}
                y2="168"
                stroke={skin.shadow}
                strokeWidth="1.2"
                strokeDasharray="2 2"
                opacity="0.45"
              />
            )}
          </g>

          {/* 5. LOVING MATERNAL ARMS & HANDS CRADLING BELLY */}
          {phase === 'PREGNANCY' ? (
            <g>
              {/* Left Arm & Hand */}
              <path
                d={`M 72,130 Q ${88 + bellyTranslateX * 0.5},${158} ${96 + bellyTranslateX},160`}
                fill="none"
                stroke="url(#avatarSkinGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Right Arm & Hand */}
              <path
                d={`M 128,130 Q ${112 + bellyTranslateX * 0.5},${158} ${104 + bellyTranslateX},160`}
                fill="none"
                stroke="url(#avatarSkinGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Cradling Heart Touch */}
              <circle cx={100 + bellyTranslateX} cy="160" r="3.5" fill="#fb7185" opacity="0.6" />
            </g>
          ) : (
            // POSTPARTUM: Mother Holding Swaddled Newborn Baby!
            <g>
              {/* Mother's Arm wrapping around baby */}
              <path
                d="M 68,135 Q 85,170 120,165"
                fill="none"
                stroke="url(#avatarSkinGrad)"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M 132,135 Q 115,170 80,165"
                fill="none"
                stroke="url(#avatarSkinGrad)"
                strokeWidth="9"
                strokeLinecap="round"
              />

              {/* Newborn Swaddle & Head */}
              <g transform="translate(85, 126) scale(0.72)">
                {/* Soft Swaddle Body */}
                <ellipse cx="28" cy="46" rx="20" ry="24" fill="#cffafe" stroke="#38bdf8" strokeWidth="1.8" />
                <path d="M 12,38 Q 28,52 44,38" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                <path d="M 10,48 Q 28,62 46,48" fill="none" stroke="#38bdf8" strokeWidth="1.5" />

                {/* Baby Head */}
                <circle cx="28" cy="20" r="17" fill="url(#avatarSkinGrad)" stroke={skin.shadow} strokeWidth="1" />

                {/* Baby Beanie */}
                <path d="M 12,20 Q 28,2 44,20 Z" fill="#67e8f9" />
                <circle cx="28" cy="2" r="3.5" fill="#ffffff" />

                {/* Baby Sleeping Face */}
                <path d="M 21,21 Q 24,24 27,21" fill="none" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M 29,21 Q 32,24 35,21" fill="none" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" />
                {/* Rosy Baby Cheeks */}
                <circle cx="18" cy="24" r="2.5" fill="#f43f5e" opacity="0.45" />
                <circle cx="38" cy="24" r="2.5" fill="#f43f5e" opacity="0.45" />
                {/* Pacifier / Little smile */}
                <circle cx="28" cy="27" r="2.5" fill="#fbcfe8" />
                <circle cx="28" cy="27" r="1" fill="#f43f5e" />
              </g>
            </g>
          )}

          {/* 6. HEAD & FACE */}
          <ellipse cx="100" cy="54" rx="30" ry="34" fill="url(#avatarSkinGrad)" />

          {/* Blushing Cheeks */}
          <ellipse cx="78" cy="62" rx="6" ry="3.5" fill={skin.blush} opacity={isGlowing ? 0.8 : 0.45} />
          <ellipse cx="122" cy="62" rx="6" ry="3.5" fill={skin.blush} opacity={isGlowing ? 0.8 : 0.45} />

          {/* 7. FRONT HAIR STYLES */}
          {avatarConfig.hairStyle === 'wavy' && (
            <path
              d="M 68,54 Q 68,20 100,20 Q 132,20 132,54 Q 116,38 100,40 Q 84,38 68,54 Z"
              fill="url(#avatarHairGrad)"
            />
          )}

          {avatarConfig.hairStyle === 'bob' && (
            <g>
              <path
                d="M 66,58 Q 66,20 100,20 Q 134,20 134,58 Q 136,80 130,95 Q 124,70 122,50 Q 100,42 78,50 Q 76,70 70,95 Q 64,80 66,58 Z"
                fill="url(#avatarHairGrad)"
              />
            </g>
          )}

          {avatarConfig.hairStyle === 'bun' && (
            <path
              d="M 70,54 Q 70,22 100,22 Q 130,22 130,54 Q 116,40 100,42 Q 84,40 70,54 Z"
              fill="url(#avatarHairGrad)"
            />
          )}

          {avatarConfig.hairStyle === 'braids' && (
            <g>
              <path
                d="M 68,54 Q 68,22 100,22 Q 132,22 132,54 Q 118,40 100,42 Q 82,40 68,54 Z"
                fill="url(#avatarHairGrad)"
              />
              <line x1="88" y1="24" x2="88" y2="44" stroke="#facc15" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="100" y1="22" x2="100" y2="42" stroke="#facc15" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="112" y1="24" x2="112" y2="44" stroke="#facc15" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          )}

          {avatarConfig.hairStyle === 'curls' && (
            <g>
              {/* Bouncy front curls */}
              <circle cx="78" cy="30" r="14" fill="url(#avatarHairGrad)" />
              <circle cx="100" cy="24" r="15" fill="url(#avatarHairGrad)" />
              <circle cx="122" cy="30" r="14" fill="url(#avatarHairGrad)" />
              <circle cx="68" cy="46" r="11" fill="url(#avatarHairGrad)" />
              <circle cx="132" cy="46" r="11" fill="url(#avatarHairGrad)" />
            </g>
          )}

          {/* 8. ACCESSORIES */}
          {avatarConfig.accessory === 'flower' && (
            <g transform="translate(126, 36) scale(0.9)">
              <circle cx="0" cy="0" r="6" fill="#fbcfe8" />
              <circle cx="5" cy="-3" r="5" fill="#fbcfe8" />
              <circle cx="-5" cy="-3" r="5" fill="#fbcfe8" />
              <circle cx="3" cy="5" r="5" fill="#fbcfe8" />
              <circle cx="-3" cy="5" r="5" fill="#fbcfe8" />
              <circle cx="0" cy="0" r="3" fill="#f43f5e" />
            </g>
          )}

          {avatarConfig.accessory === 'headband' && (
            <g>
              <path d="M 70,44 Q 100,28 130,44" fill="none" stroke="#fbcfe8" strokeWidth="3" />
              <circle cx="100" cy="35" r="2.5" fill="#ffffff" stroke="#f472b6" strokeWidth="0.8" />
              <circle cx="88" cy="38" r="2" fill="#ffffff" stroke="#f472b6" strokeWidth="0.8" />
              <circle cx="112" cy="38" r="2" fill="#ffffff" stroke="#f472b6" strokeWidth="0.8" />
            </g>
          )}

          {avatarConfig.accessory === 'bow' && (
            <g transform="translate(126, 36) scale(0.85)">
              <path d="M -10,-6 L 0,0 L -10,6 Z" fill="#f43f5e" />
              <path d="M 10,-6 L 0,0 L 10,6 Z" fill="#f43f5e" />
              <circle cx="0" cy="0" r="3" fill="#ffe4e6" />
            </g>
          )}

          {avatarConfig.accessory === 'glasses' && (
            <g>
              {/* Golden circular glasses */}
              <circle cx="83" cy="54" r="8" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="117" cy="54" r="8" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="91" y1="54" x2="109" y2="54" stroke="#ca8a04" strokeWidth="1.5" />
              {/* Lens shine */}
              <line x1="80" y1="50" x2="84" y2="56" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
              <line x1="114" y1="50" x2="118" y2="56" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
            </g>
          )}

          {/* 9. EYEBROWS */}
          <path
            d={isSick || isSad ? "M 75,45 Q 83,49 89,47" : isExhausted ? "M 75,47 Q 83,47 89,47" : "M 75,46 Q 83,42 89,46"}
            fill="none"
            stroke={hair.shadow}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d={isSick || isSad ? "M 111,47 Q 117,49 125,45" : isExhausted ? "M 111,47 Q 117,47 125,47" : "M 111,46 Q 117,42 125,46"}
            fill="none"
            stroke={hair.shadow}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* 10. EYES (WITH BLINKING & MOODS) */}
          {isBlinking || activeAnimation === 'sleep' || isExhausted ? (
            <>
              {/* Closed / Relaxed Eyes */}
              <path d="M 77,54 Q 83,60 89,54" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 111,54 Q 117,60 123,54" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : isGlowing || status.happiness > 70 ? (
            <>
              {/* Joyful Crescent Smiling Eyes with Eyelashes */}
              <path d="M 77,56 Q 83,49 89,56" fill="none" stroke="#1f2937" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M 89,53 L 92,51" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 111,56 Q 117,49 123,56" fill="none" stroke="#1f2937" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M 123,53 L 126,51" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Bright Beautiful Eyes with Catchlights & Eyelashes */}
              {/* Left Eye */}
              <circle cx="83" cy="54" r="4.2" fill="#1f2937" />
              <circle cx="84.8" cy="52.2" r="1.5" fill="#ffffff" />
              <circle cx="81.8" cy="55.5" r="0.8" fill="#ffffff" />
              <path d="M 87,51 L 90,49" stroke="#1f2937" strokeWidth="1.4" strokeLinecap="round" />

              {/* Right Eye */}
              <circle cx="117" cy="54" r="4.2" fill="#1f2937" />
              <circle cx="118.8" cy="52.2" r="1.5" fill="#ffffff" />
              <circle cx="115.8" cy="55.5" r="0.8" fill="#ffffff" />
              <path d="M 121,51 L 124,49" stroke="#1f2937" strokeWidth="1.4" strokeLinecap="round" />
            </>
          )}

          {/* 11. NOSE */}
          <path d="M 100,56 Q 102,61 98,63" fill="none" stroke={skin.shadow} strokeWidth="1.8" strokeLinecap="round" />

          {/* 12. LIPS & MOUTH */}
          {isExhausted || activeAnimation === 'sleep' ? (
            <ellipse cx="100" cy="71" rx="2.5" ry="3" fill={skin.lip} opacity="0.8" />
          ) : isSick || isSad ? (
            <path d="M 94,73 Q 100,69 106,73" fill="none" stroke={skin.lip} strokeWidth="2.4" strokeLinecap="round" />
          ) : isThirsty ? (
            <ellipse cx="100" cy="72" rx="3.5" ry="2.5" fill={skin.lip} />
          ) : (
            <g>
              <path d="M 93,69 Q 100,77 107,69" fill="none" stroke={skin.lip} strokeWidth="2.8" strokeLinecap="round" />
              {/* Gentle Upper Lip Tint */}
              <path d="M 95,68 Q 100,70 105,68" fill="none" stroke={skin.blush} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            </g>
          )}
        </svg>
          </motion.div>
        </div>

        {/* 6 ROOMY CARE ACTION BUTTONS (Right side, 2 columns x 3 rows at the same height) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full flex-1 self-center">
          {careButtons.map(renderCareButton)}
        </div>
      </div>
    </div>
  );
};
