import React from 'react';
import { motion } from 'motion/react';

interface StatsBarProps {
  id: string;
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  critical?: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  id,
  label,
  value,
  icon,
  colorClass,
  bgClass,
  critical = false
}) => {
  const clampedValue = Math.max(0, Math.min(100, Math.round(value)));
  const isLow = clampedValue <= 25;

  return (
    <div id={id} className="flex flex-col gap-1 w-full text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className={`p-1 rounded-md ${bgClass} text-slate-700`}>
            {icon}
          </span>
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-1">
          {isLow && (
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
          <span className={`font-semibold tabular-nums ${isLow ? 'text-rose-600 font-bold' : 'text-slate-600'}`}>
            {clampedValue}%
          </span>
        </div>
      </div>

      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/70 shadow-inner">
        <motion.div
          className={`h-full rounded-full ${colorClass} ${critical && isLow ? 'animate-pulse' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
