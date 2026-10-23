import { BabyInfo, PostpartumWeekInfo } from '../types';

export const PREGNANCY_DATA: Record<number, BabyInfo> = {
  1: {
    week: 1,
    size: '< 0,1 cm',
    weight: '< 1 g',
    comparison: 'Semente de Papoula',
    emoji: '🌱',
    trimester: 1,
    milestones: [
      'Concepção e início da divisão celular.',
      'O blastocisto se desloca em direção ao endométrio.',
      'Início da síntese de hormônios gestacionais (hCG).'
    ],
    funFact: 'O óvulo fertilizado contém todo o DNA único que definirá as características genéticas do bebê.'
  },
  2: {
    week: 2,
    size: '0,15 cm',
    weight: '< 1 g',
    comparison: 'Grãozinho de Mostarda',
    emoji: '🌾',
    trimester: 1,
    milestones: [
      'Nidação: fixação do embrião na parede uterina.',
      'Formação do saco vitelino para nutrição inicial.',
      'O blastocisto divide-se em duas camadas celulares.'
    ],
    funFact: 'A suplementação precoce com ácido fólico previne até 70% dos defeitos de fechamento do tubo neural.'
  },
  4: {
    week: 4,
    size: '0,2 cm',
    weight: '< 1 g',
    comparison: 'Semente de Gergelim',
    emoji: '🌱',
    trimester: 1,
    milestones: [
      'Início da formação do tubo neural (cérebro e medula).',
      'Esboço do sistema circulatório primitivo.',
      'Formação inicial da placenta e do cordão umbilical.'
    ],
    funFact: 'O coração primitivo é uma das primeiras estruturas a se formar e bater.'
  },
  6: {
    week: 6,
    size: '0,6 cm',
    weight: '< 1 g',
    comparison: 'Grão de Lentilha',
    emoji: '🫘',
    trimester: 1,
    milestones: [
      'Coração bate a cerca de 100-140 bpm.',
      'Brotos dos braços e pernas começam a surgir.',
      'Fechamento do tubo neural completo.'
    ],
    funFact: 'O coraçãozinho do embrião bate quase duas vezes mais rápido que o da mãe.'
  },
  8: {
    week: 8,
    size: '1,6 cm',
    weight: '1 g',
    comparison: 'Framboesa Fresca',
    emoji: '🫐',
    trimester: 1,
    milestones: [
      'Formação dos dedos das mãos e dos pés.',
      'Esboço dos olhos, pálpebras e pontinha do nariz.',
      'Transição de embrião para feto ao final desta semana.'
    ],
    funFact: 'O feto já faz micro-movimentos involuntários, imperceptíveis para a mãe.'
  },
  10: {
    week: 10,
    size: '3,1 cm',
    weight: '4 g',
    comparison: 'Azeitona Verde',
    emoji: '🫒',
    trimester: 1,
    milestones: [
      'Todos os órgãos vitais principais já foram iniciados.',
      'Dedinhos com pequenas unhas em formação.',
      'Rins começam a produzir urina no líquido amniótico.'
    ],
    funFact: 'A partir da 10ª semana, o período embrionário é concluído e o feto foca em rápido crescimento.'
  },
  12: {
    week: 12,
    size: '5,4 cm',
    weight: '14 g',
    comparison: 'Limão Siciliano Pequeno',
    emoji: '🍋',
    trimester: 1,
    milestones: [
      'Reflexo de sucção e deglutição primitivo.',
      'Perfil facial mais definido e órgãos genitais externos formados.',
      'Fim do 1º trimestre: redução comum de náuseas.'
    ],
    funFact: 'Momento ideal para o ultrassom morfológico de primeiro trimestre e translucência nucal.'
  },
  14: {
    week: 14,
    size: '8,7 cm',
    weight: '43 g',
    comparison: 'Pêssego Maduro',
    emoji: '🍑',
    trimester: 2,
    milestones: [
      'Início do 2º trimestre (o período da energia renovada).',
      'Rins ativos e tireoide produzindo hormônios.',
      'O bebê faz caretas e expressões com os músculos faciais.'
    ],
    funFact: 'O feto já consegue engolir líquido amniótico e filtrar pelos rins em ciclo contínuo.'
  },
  16: {
    week: 16,
    size: '11,6 cm',
    weight: '100 g',
    comparison: 'Abacate Pequeno',
    emoji: '🥑',
    trimester: 2,
    milestones: [
      'Olhos sensíveis à luz e ouvidos captando vibrações.',
      'Músculos das costas fortalecidos, corpo mais ereto.',
      'Possibilidade de sentir as primeiras "bolhas" de movimento (quickening).'
    ],
    funFact: 'O bebê já consegue ouvir a voz da mãe e os batimentos cardíacos através do corpo materno.'
  },
  18: {
    week: 18,
    size: '14,2 cm',
    weight: '190 g',
    comparison: 'Pimentão Doce',
    emoji: '🫑',
    trimester: 2,
    milestones: [
      'Mielinização das vias nervosas em ritmo acelerado.',
      'Impressões digitais únicas gravadas nos dedos.',
      'Boceja, chupa o dedão e soluça suavemente.'
    ],
    funFact: 'Os soluços fetais ajudam a treinar o diafragma para a respiração após o nascimento.'
  },
  20: {
    week: 20,
    size: '25,6 cm',
    weight: '300 g',
    comparison: 'Banana Média',
    emoji: '🍌',
    trimester: 2,
    milestones: [
      'Metade exata da gestação alcançada!',
      'Vernix caseosa protege a pele delicada do bebê.',
      'Ultrassom morfológico detalhado do 2º trimestre.'
    ],
    funFact: 'O útero agora atinge a altura da cicatriz umbilical da mãe.'
  },
  24: {
    week: 24,
    size: '30,0 cm',
    weight: '600 g',
    comparison: 'Espiga de Milho',
    emoji: '🌽',
    trimester: 2,
    milestones: [
      'Desenvolvimento de surfactante nos pulmões.',
      'Ciclos definidos de sono e vigília com movimentos vigorosos.',
      'Limite de viabilidade fetal com suporte intensivo neonatal.'
    ],
    funFact: 'O bebê reconhece melodias e a voz do parceiro ou pessoas próximas que conversam com a barriga.'
  },
  28: {
    week: 28,
    size: '37,6 cm',
    weight: '1.000 g (1 kg)',
    comparison: 'Berinjela Grande',
    emoji: '🍆',
    trimester: 3,
    milestones: [
      'Início oficial do 3º trimestre.',
      'Abre e fecha os olhos, com cílios completamente formados.',
      'Aumento da deposição de gordura corporal para regulação térmica.'
    ],
    funFact: 'O cérebro desenvolve bilhões de conexões e dobras corticais aceleradamente.'
  },
  32: {
    week: 32,
    size: '42,4 cm',
    weight: '1.700 g (1,7 kg)',
    comparison: 'Abacaxi Tropical',
    emoji: '🍍',
    trimester: 3,
    milestones: [
      'Unhas alcançam as pontas dos dedos.',
      'Maioria dos bebês assume a posição cefálica (de cabeça para baixo).',
      'Ossos totalmente formados, embora ainda macios e flexíveis.'
    ],
    funFact: 'O esqueleto acumula cálcio rapidamente — por isso a nutrição materna com cálcio é essencial.'
  },
  36: {
    week: 36,
    size: '47,4 cm',
    weight: '2.600 g (2,6 kg)',
    comparison: 'Melão Cantaloupe',
    emoji: '🍈',
    trimester: 3,
    milestones: [
      'Pulmões praticamente maduros com surfactante suficiente.',
      'Aparelho digestivo pronto para digerir leite materno.',
      'Espaço reduzido para cambalhotas, chutes mais focados.'
    ],
    funFact: 'A partir da semana 37, a gestação é considerada "a termo precoce".'
  },
  38: {
    week: 38,
    size: '49,8 cm',
    weight: '3.100 g (3,1 kg)',
    comparison: 'Abóbora Japonesa',
    emoji: '🎃',
    trimester: 3,
    milestones: [
      'Reflexo de preensão firme nas mãozinhas.',
      'O bebê ganha cerca de 25-30g de gordura protetora por dia.',
      'Cabeça encaixando na pelve materna.'
    ],
    funFact: 'Os hormônios maternos e fetais iniciam os diálogos bioquímicos para desencadear o trabalho de parto.'
  },
  40: {
    week: 40,
    size: '51,2 cm',
    weight: '3.400 g (3,4 kg)',
    comparison: 'Melancia Média',
    emoji: '🍉',
    trimester: 3,
    milestones: [
      'Desenvolvimento intrauterino completo!',
      '15% de gordura corporal para isolamento térmico.',
      'Pronto para o nascimento e para o primeiro choro respiratório.'
    ],
    funFact: 'Apenas cerca de 5% dos bebês nascem exatamente na Data Provável do Parto (DPP) — entre 37 e 42 semanas é normal.'
  }
};

// Fill missing weeks programmatically with smooth interpolation
export function getBabyInfoForWeek(week: number): BabyInfo {
  if (PREGNANCY_DATA[week]) {
    return PREGNANCY_DATA[week];
  }
  
  // Find nearest lower milestone
  const milestoneWeeks = Object.keys(PREGNANCY_DATA).map(Number).sort((a, b) => a - b);
  let baseWeek = 1;
  for (const m of milestoneWeeks) {
    if (m <= week) baseWeek = m;
    else break;
  }

  const baseInfo = PREGNANCY_DATA[baseWeek] || PREGNANCY_DATA[1];
  const trimester: 1 | 2 | 3 = week <= 13 ? 1 : week <= 27 ? 2 : 3;

  // Approximate growth
  const approxSize = (week * 1.25).toFixed(1);
  const approxWeight = week <= 12 ? Math.round(week * 1.5) : week <= 28 ? Math.round(week * 35) : Math.round(1000 + (week - 28) * 200);

  return {
    week,
    size: `${approxSize} cm`,
    weight: approxWeight > 999 ? `${(approxWeight / 1000).toFixed(1)} kg` : `${approxWeight} g`,
    comparison: baseInfo.comparison,
    emoji: baseInfo.emoji,
    trimester,
    milestones: [
      `Crescimento contínuo e refinamento celular na semana ${week}.`,
      ...baseInfo.milestones.slice(0, 2)
    ],
    funFact: baseInfo.funFact
  };
}

export const POSTPARTUM_DATA: Record<number, PostpartumWeekInfo> = {
  1: {
    week: 1,
    title: 'A Chegada & Colostro Dourado',
    babyDevelopment: 'O estômago do bebê tem tamanho de uma cereja (5-7ml). O colostro é o primeiro alimento concentrado em anticorpos.',
    motherRecovery: 'Apojadura (descida do leite) ocorre entre o 3º e 5º dia. Cólicas pós-parto auxiliam na involução uterina normal.',
    milestones: ['Primeira pega e eliminação do mecônio.', 'Queda fisiológica de peso inicial (até 10% é esperada).', 'Vínculo pele a pele contínuo.']
  },
  2: {
    week: 2,
    title: 'Adaptação & Coto Umbilical',
    babyDevelopment: 'O bebê recupera o peso de nascimento. O coto umbilical seca e cai entre 7 a 15 dias.',
    motherRecovery: 'Lóquios (sangramento pós-parto) mudam de vermelho para rosado/acastanhado. Descanso nos intervalos de mamadas.',
    milestones: ['Cicatrização do umbigo.', 'Reconhecimento do cheiro e voz dos pais.', 'Rotina de amamentação em livre demanda.']
  },
  3: {
    week: 3,
    title: 'Pico de Crescimento & Baby Blues',
    babyDevelopment: 'Primeiro pico de crescimento (salto): o bebê mama com maior frequência para estimular mais leite.',
    motherRecovery: 'Oscilações hormonais normais (Baby Blues). Rede de apoio é fundamental para acolhimento da puérpera.',
    milestones: ['Fixação visual em rostos próximos (20-30 cm).', 'Maior tempo de vigília tranquila.', 'Mamadas mais ritmadas.']
  },
  4: {
    week: 4,
    title: '1 Mês de Vida & Consulta Pediátrica',
    babyDevelopment: 'Acompanhamento do ganho de peso, perímetro cefálico e primeiras vacinas do 1º mês (Hepatite B / BCG).',
    motherRecovery: 'Útero retorna quase ao tamanho pré-gravídico. Cicatrização do períneo ou cesárea consolidada.',
    milestones: ['Primeiros sorrisos sociais reflexos.', 'Eleva brevemente a cabeça quando deitado de bruços.', 'Vocalização de sons guturais suaves.']
  },
  5: {
    week: 5,
    title: 'Conexões & Ritmo Circadiano',
    babyDevelopment: 'Bebê começa a diferenciar dia e noite se exposto à luz natural diurna e ambiente escuro à noite.',
    motherRecovery: 'Retorno gradual da energia física. Importância da hidratação contínua e alimentação balanceada.',
    milestones: ['Olhar atento que acompanha objetos em movimento.', 'Reação clara a sons familiares.', 'Alongamento dos membros com movimentos mais soltos.']
  },
  6: {
    week: 6,
    title: 'Consulta dos 42 Dias & Cuidados',
    babyDevelopment: 'Sorrisos sociais intencionais e resposta alegre a conversas e canções de ninar.',
    motherRecovery: 'Consulta de revisão pós-parto (42 dias): avaliação ginecológica, métodos contraceptivos seguros na amamentação e assoalho pélvico.',
    milestones: ['Sorriso social deliberado.', 'Vacinas do 2º mês se aproximando (Pentavalente, VIP, Rotavírus, Pneumo 10).', 'Maior controle da cabeça.']
  },
  7: {
    week: 7,
    title: 'Interação Lúdica & Tummy Time',
    babyDevelopment: 'Sessões breves de "Tummy Time" (bruços acordado sob supervisão) fortalecem pescoço, costas e braços.',
    motherRecovery: 'Ajuste da nova rotina com maior confiança na leitura dos sinais do bebê (choro de sono vs fome vs cólica).',
    milestones: ['Descoberta das próprias mãozinhas.', 'Emissão de sons de vogais (coos).', 'Apoio sobre os antebraços no chão.']
  },
  8: {
    week: 8,
    title: '2 Meses de Amor & Conclusão do Puerpério Imediato',
    babyDevelopment: 'O bebê demonstra padrões de sono mais previsíveis, interage com alegria e recebe as vacinas dos 2 meses.',
    motherRecovery: 'Fim do puerpério clínico de 8 semanas. A mãe conclui com sucesso a fase de transição inicial da maternidade!',
    milestones: ['Interação plena com os cuidadores.', 'Imunização do 2º mês realizada.', 'Maternidade vivida com amor, ciência e autocuidado!']
  }
};
