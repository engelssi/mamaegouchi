/**
 * Gestational Age & DUM (Data da Última Menstruação) Obstetric Calculator
 * Based on Brazilian Ministry of Health guidelines (Ministério da Saúde / FEBRASGO) and Naegele's Rule.
 */

export interface GestationalCalculationResult {
  isValid: boolean;
  errorMessage?: string;
  dumDate: Date;
  formattedDum: string;
  gestationalWeeks: number;
  gestationalDays: number;
  totalDays: number;
  dppDate: Date;
  formattedDpp: string;
  trimester: 1 | 2 | 3 | 'postpartum';
  trimesterLabel: string;
  monthEquivalent: number;
  monthLabel: string;
  summaryText: string;
  scientificExplanation: string;
}

/**
 * Calculates gestational age, estimated due date (DPP / Naegele's rule), trimester, and clinical month from DUM.
 * @param dumInput Date string (YYYY-MM-DD) or Date object representing the 1st day of last menstrual period.
 * @param referenceDate The reference date (defaults to current date).
 */
export function calculateFromDUM(
  dumInput: string | Date,
  referenceDate: Date = new Date()
): GestationalCalculationResult {
  const dum = typeof dumInput === 'string' ? new Date(dumInput + 'T12:00:00') : new Date(dumInput);
  
  if (isNaN(dum.getTime())) {
    return {
      isValid: false,
      errorMessage: 'Data da última menstruação inválida.',
      dumDate: new Date(),
      formattedDum: '',
      gestationalWeeks: 1,
      gestationalDays: 0,
      totalDays: 0,
      dppDate: new Date(),
      formattedDpp: '',
      trimester: 1,
      trimesterLabel: '1º Trimestre',
      monthEquivalent: 1,
      monthLabel: '1º Mês',
      summaryText: 'Data inválida.',
      scientificExplanation: ''
    };
  }

  // Calculate elapsed time in days
  const ref = new Date(referenceDate);
  ref.setHours(12, 0, 0, 0);
  dum.setHours(12, 0, 0, 0);

  const diffTime = ref.getTime() - dum.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      isValid: false,
      errorMessage: 'A DUM não pode ser uma data futura.',
      dumDate: dum,
      formattedDum: formatDateBR(dum),
      gestationalWeeks: 1,
      gestationalDays: 0,
      totalDays: 0,
      dppDate: new Date(),
      formattedDpp: '',
      trimester: 1,
      trimesterLabel: '1º Trimestre',
      monthEquivalent: 1,
      monthLabel: '1º Mês',
      summaryText: 'A data informada está no futuro.',
      scientificExplanation: 'A DUM deve corresponder ao primeiro dia do sangramento menstrual anterior à concepção.'
    };
  }

  // Max realistic pregnancy period ~315 days (45 weeks)
  const totalDays = diffDays;
  let weeks = Math.floor(totalDays / 7);
  let days = totalDays % 7;

  // Cap initial week at 1 if 0
  if (weeks < 1) {
    weeks = 1;
    days = Math.max(1, days);
  }

  // Calculate DPP using Naegele's Rule: DUM + 7 days + 9 months (or DUM + 280 days)
  const dpp = new Date(dum);
  dpp.setDate(dpp.getDate() + 280);

  let trimester: 1 | 2 | 3 | 'postpartum' = 1;
  let trimesterLabel = '1º Trimestre (Semanas 1 a 13)';

  if (weeks > 40) {
    trimester = 'postpartum';
    trimesterLabel = 'Pós-Termo / Puerpério';
  } else if (weeks >= 28) {
    trimester = 3;
    trimesterLabel = '3º Trimestre (Semanas 28 a 40)';
  } else if (weeks >= 14) {
    trimester = 2;
    trimesterLabel = '2º Trimestre (Semanas 14 a 27)';
  }

  // Clinical month approximation
  let monthEquivalent = 1;
  if (weeks <= 4) monthEquivalent = 1;
  else if (weeks <= 8) monthEquivalent = 2;
  else if (weeks <= 13) monthEquivalent = 3;
  else if (weeks <= 17) monthEquivalent = 4;
  else if (weeks <= 22) monthEquivalent = 5;
  else if (weeks <= 27) monthEquivalent = 6;
  else if (weeks <= 31) monthEquivalent = 7;
  else if (weeks <= 35) monthEquivalent = 8;
  else monthEquivalent = 9;

  const monthLabel = `${monthEquivalent}º Mês de Gestação`;

  const formattedDum = formatDateBR(dum);
  const formattedDpp = formatDateBR(dpp);

  const clampedWeek = Math.min(40, Math.max(1, weeks));

  const summaryText = `Com a DUM em ${formattedDum}, sua Idade Gestacional estimada é de ${clampedWeek} semanas e ${days} dias (${monthLabel}, ${trimesterLabel}). Data Provável do Parto (DPP): ${formattedDpp}.`;

  const scientificExplanation = `A contagem obstétrica médica inicia no primeiro dia da última menstruação (DUM), cerca de 14 dias antes da fecundação real. A Regra de Naegele padroniza a gestação humana a termo em 40 semanas (280 dias).`;

  return {
    isValid: true,
    dumDate: dum,
    formattedDum,
    gestationalWeeks: clampedWeek,
    gestationalDays: days,
    totalDays,
    dppDate: dpp,
    formattedDpp,
    trimester,
    trimesterLabel,
    monthEquivalent,
    monthLabel,
    summaryText,
    scientificExplanation
  };
}

/**
 * Formats date into DD/MM/YYYY
 */
export function formatDateBR(d: Date): string {
  if (!d || isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Returns a suggestion for DUM date based on a given gestational week
 */
export function calculateEstimatedDumFromWeek(week: number): string {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - (week * 7));
  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
  const dd = String(targetDate.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Information regarding each gestational milestone group for selection
 */
export const GESTATIONAL_PHASES_SUMMARY = [
  {
    phase: 'TRIMESTER_1',
    name: '1º Trimestre',
    weeksRange: 'Semanas 1 a 13',
    weeks: [1, 2, 4, 6, 8, 10, 12, 13],
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Início da gestação, teste positivo, formação dos órgãos primitivos, primeiros batimentos e ultrassom de translucência nucal.',
    emoji: '🌱'
  },
  {
    phase: 'TRIMESTER_2',
    name: '2º Trimestre',
    weeksRange: 'Semanas 14 a 27',
    weeks: [14, 16, 18, 20, 22, 24, 26, 27],
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    description: 'Fase de ouro: diminuição de náuseas, percepção dos primeiros chutes, ultrassom morfológico e desenvolvimento da audição fetal.',
    emoji: '🌸'
  },
  {
    phase: 'TRIMESTER_3',
    name: '3º Trimestre',
    weeksRange: 'Semanas 28 a 40',
    weeks: [28, 30, 32, 34, 36, 38, 39, 40],
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Reta final: ganho de peso do bebê, maturação pulmonar, preparação do plano de parto e reconhecimento dos sinais de trabalho de parto.',
    emoji: '👶'
  },
  {
    phase: 'POSTPARTUM',
    name: 'Pós-Parto / Puerpério',
    weeksRange: 'Semanas 1 a 8 Pós-Parto',
    weeks: [1, 2, 3, 4, 5, 6, 7, 8],
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    description: 'A chegada do recém-nascido, amamentação, cuidados com o coto umbilical, recuperação materna e adaptação familiar.',
    emoji: '🍼'
  }
];
