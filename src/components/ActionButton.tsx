import React from 'react';
import { motion } from 'motion/react';
import { playSound } from '../utils/sound';

export type SoundType = 'click' | 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk' | 'baby' | 'fanfare' | 'warning' | 'pop';

interface ActionButtonProps {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  variant: 'emerald' | 'sky' | 'indigo' | 'purple' | 'amber' | 'rose' | 'teal';
  disabled?: boolean;
  isUrgent?: boolean;
  onClick: () => void;
  soundType?: SoundType;
  recipientTag?: string;
}

const variantStyles = {
  emerald: {
    bg: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white',
    ring: 'focus:ring-emerald-300',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    border: 'border-emerald-600/30'
  },
  sky: {
    bg: 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white',
    ring: 'focus:ring-sky-300',
    badge: 'bg-sky-100 text-sky-800 border-sky-200',
    border: 'border-sky-600/30'
  },
  indigo: {
    bg: 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white',
    ring: 'focus:ring-indigo-300',
    badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    border: 'border-indigo-600/30'
  },
  purple: {
    bg: 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white',
    ring: 'focus:ring-purple-300',
    badge: 'bg-purple-100 text-purple-800 border-purple-200',
    border: 'border-purple-600/30'
  },
  amber: {
    bg: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white',
    ring: 'focus:ring-amber-300',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    border: 'border-amber-600/30'
  },
  rose: {
    bg: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white',
    ring: 'focus:ring-rose-300',
    badge: 'bg-rose-100 text-rose-800 border-rose-200',
    border: 'border-rose-600/30'
  },
  teal: {
    bg: 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white',
    ring: 'focus:ring-teal-300',
    badge: 'bg-teal-100 text-teal-800 border-teal-200',
    border: 'border-teal-600/30'
  }
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  id,
  label,
  sublabel,
  icon,
  variant,
  disabled = false,
  isUrgent = false,
  onClick,
  soundType = 'click' as SoundType,
  recipientTag = 'Mamãe'
}) => {
  const styles = variantStyles[variant];

  const handleClick = () => {
    if (disabled) return;
    playSound(soundType);
    onClick();
  };

  return (
    <motion.button
      id={id}
      whileHover={!disabled ? { scale: 1.02, translateY: -1 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onClick={handleClick}
      disabled={disabled}
      className={`relative group flex items-center justify-between p-3.5 rounded-2xl shadow-sm transition-all border ${styles.border} ${
        disabled
          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
          : `${styles.bg} cursor-pointer shadow-md hover:shadow-lg`
      }`}
    >
      {isUrgent && !disabled && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600 border-2 border-white"></span>
        </span>
      )}

      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${disabled ? 'bg-slate-200 text-slate-400' : 'bg-white/20 text-white backdrop-blur-xs'}`}>
          {icon}
        </div>
        <div className="text-left">
          <div className="font-bold text-sm tracking-wide leading-tight">{label}</div>
          <div className={`text-xs ${disabled ? 'text-slate-400' : 'text-white/85'}`}>{sublabel}</div>
        </div>
      </div>

      <div className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border whitespace-nowrap ${disabled ? 'bg-slate-200 text-slate-400 border-slate-300' : 'bg-white/25 text-white border-white/25 shadow-xs'}`}>
        {recipientTag}
      </div>
    </motion.button>
  );
};
