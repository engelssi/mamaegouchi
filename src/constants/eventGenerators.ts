import { Status, BabyStatus, GamePhase, GameEvent, GameEventOption } from '../types';
import { 
  WEEKLY_FOOD_EVENTS, 
  WEEKLY_DRINK_EVENTS, 
  WEEKLY_SLEEP_EVENTS, 
  WEEKLY_HYGIENE_EVENTS, 
  WEEKLY_RELAX_EVENTS, 
  WEEKLY_WALK_EVENTS 
} from './pregnancyEvents';
import { 
  POSTPARTUM_FEED_EVENTS, 
  POSTPARTUM_SLEEP_EVENTS, 
  POSTPARTUM_HYGIENE_EVENTS 
} from './postpartumEvents';

export function generateEvent(
  category: 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk' | 'baby_feed' | 'baby_sleep' | 'baby_diaper' | 'baby_comfort',
  week: number,
  phase: GamePhase,
  status: Status,
  babyStatus?: BabyStatus
): GameEvent {
  const isEmergency = (
    (category === 'eat' && status.hunger < 30) ||
    (category === 'drink' && status.thirst < 30) ||
    (category === 'sleep' && status.sleep < 30) ||
    (category === 'hygiene' && status.hygiene < 30) ||
    (category === 'relax' && status.happiness < 30) ||
    (category === 'walk' && status.energy < 30) ||
    (category === 'baby_feed' && (babyStatus?.hunger ?? 50) < 30) ||
    (category === 'baby_sleep' && (babyStatus?.sleep ?? 50) < 30) ||
    (category === 'baby_diaper' && (babyStatus?.hygiene ?? 50) < 30) ||
    (category === 'baby_comfort' && (babyStatus?.happiness ?? 50) < 30)
  );

  const trimester: 1 | 2 | 3 = week <= 13 ? 1 : week <= 27 ? 2 : 3;

  // 1. Postpartum Phase Routing (Clearly segregated between Mother and Baby)
  if (phase === 'POSTPARTUM') {
    // BABY-SPECIFIC ACTIONS
    if (category === 'baby_feed') {
      const specific = POSTPARTUM_FEED_EVENTS[week];
      if (specific) {
        return {
          id: `post_feed_${week}`,
          title: `[Bebê — Semana ${week}] ${specific.title}`,
          description: specific.description,
          category,
          options: scaleOptions(specific.options, isEmergency),
          imageEmoji: '🍼',
          isEmergency
        };
      }
      return getGenericPostpartumFeedEvent(week, isEmergency);
    }

    if (category === 'baby_sleep') {
      const specific = POSTPARTUM_SLEEP_EVENTS[week];
      if (specific) {
        return {
          id: `post_sleep_${week}`,
          title: `[Bebê — Semana ${week}] ${specific.title}`,
          description: specific.description,
          category,
          options: scaleOptions(specific.options, isEmergency),
          imageEmoji: '🌙',
          isEmergency
        };
      }
      return getGenericPostpartumSleepEvent(week, isEmergency);
    }

    if (category === 'baby_diaper') {
      const specific = POSTPARTUM_HYGIENE_EVENTS[week];
      if (specific) {
        return {
          id: `post_hyg_${week}`,
          title: `[Bebê — Semana ${week}] ${specific.title}`,
          description: specific.description,
          category,
          options: scaleOptions(specific.options, isEmergency),
          imageEmoji: '🫧',
          isEmergency
        };
      }
      return getGenericPostpartumHygieneEvent(week, isEmergency);
    }

    if (category === 'baby_comfort') {
      return getPostpartumBabyComfortEvent(week, isEmergency);
    }

    // MOTHER-SPECIFIC ACTIONS IN POSTPARTUM
    if (category === 'eat') {
      return getPostpartumMotherFoodEvent(week, isEmergency);
    }
    if (category === 'drink') {
      return getPostpartumMotherDrinkEvent(week, isEmergency);
    }
    if (category === 'sleep') {
      return getPostpartumMotherSleepEvent(week, isEmergency);
    }
    if (category === 'hygiene') {
      return getPostpartumMotherHygieneEvent(week, isEmergency);
    }
    if (category === 'relax') {
      return getPostpartumMotherRelaxEvent(week, isEmergency);
    }
    if (category === 'walk') {
      return getPostpartumMotherWalkEvent(week, isEmergency);
    }
  }

  // 2. Pregnancy specific catalog events
  if (category === 'eat') {
    const specific = WEEKLY_FOOD_EVENTS[week];
    if (specific) {
      return {
        id: `food_${week}`,
        title: `[Semana ${week}] ${specific.title}`,
        description: specific.description,
        category,
        options: scaleOptions(specific.options, isEmergency),
        imageEmoji: '🥗',
        isEmergency
      };
    }
    return getGenericFoodEvent(trimester, week, isEmergency);
  }

  if (category === 'drink') {
    const specific = WEEKLY_DRINK_EVENTS[week];
    if (specific) {
      return {
        id: `drink_${week}`,
        title: `[Semana ${week}] ${specific.title}`,
        description: specific.description,
        category,
        options: scaleOptions(specific.options, isEmergency),
        imageEmoji: '💧',
        isEmergency
      };
    }
    return getGenericDrinkEvent(trimester, week, isEmergency);
  }

  if (category === 'sleep') {
    const specific = WEEKLY_SLEEP_EVENTS[week];
    if (specific) {
      return {
        id: `sleep_${week}`,
        title: `[Semana ${week}] ${specific.title}`,
        description: specific.description,
        category,
        options: scaleOptions(specific.options, isEmergency),
        imageEmoji: '🛌',
        isEmergency
      };
    }
    return getGenericSleepEvent(trimester, week, isEmergency);
  }

  if (category === 'hygiene') {
    const specific = WEEKLY_HYGIENE_EVENTS[week];
    if (specific) {
      return {
        id: `hygiene_${week}`,
        title: `[Semana ${week}] ${specific.title}`,
        description: specific.description,
        category,
        options: scaleOptions(specific.options, isEmergency),
        imageEmoji: '🧼',
        isEmergency
      };
    }
    return getGenericHygieneEvent(trimester, week, isEmergency);
  }

  if (category === 'relax') {
    const specific = WEEKLY_RELAX_EVENTS[week];
    if (specific) {
      return {
        id: `relax_${week}`,
        title: `[Semana ${week}] ${specific.title}`,
        description: specific.description,
        category,
        options: scaleOptions(specific.options, isEmergency),
        imageEmoji: '🧘‍♀️',
        isEmergency
      };
    }
    return getGenericRelaxEvent(trimester, week, isEmergency);
  }

  if (category === 'walk') {
    const specific = WEEKLY_WALK_EVENTS[week];
    if (specific) {
      return {
        id: `walk_${week}`,
        title: `[Semana ${week}] ${specific.title}`,
        description: specific.description,
        category,
        options: scaleOptions(specific.options, isEmergency),
        imageEmoji: '🚶‍♀️',
        isEmergency
      };
    }
    return getGenericWalkEvent(trimester, week, isEmergency);
  }

  return getGenericFoodEvent(trimester, week, isEmergency);
}

function scaleOptions(options: GameEventOption[], isEmergency: boolean): GameEventOption[] {
  if (!isEmergency) return options;
  return options.map(opt => ({
    ...opt,
    impact: Object.fromEntries(
      Object.entries(opt.impact).map(([k, v]) => [k, typeof v === 'number' && v > 0 ? Math.round(v * 1.35) : v])
    ) as GameEventOption['impact']
  }));
}

function getGenericFoodEvent(trimester: 1 | 2 | 3, week: number, isEmergency: boolean): GameEvent {
  const desc = isEmergency 
    ? `A gestante está com muita fome! A glicemia precisa ser estabilizada com alimentos de qualidade.`
    : `Hora da refeição na ${week}ª semana (${trimester}º trimestre). O feto necessita de fluxo contínuo de nutrientes.`;

  return {
    id: `generic_food_${week}`,
    title: `Nutrição Gestacional — Semana ${week}`,
    description: desc,
    category: 'eat',
    imageEmoji: '🥑',
    isEmergency,
    options: [
      {
        id: 'gen_food_pos',
        label: 'Prato equilibrado com vegetais verdes, grãos integrais, proteína magra e azeite',
        description: 'Densidade nutricional alta com micronutrientes variados.',
        impact: { hunger: isEmergency ? 42 : 32, energy: 20, health: 8, happiness: 10 },
        feedback: 'Excelente combinação alimentar! Fornece vitaminas, aminoácidos e minerais essenciais.',
        scientificFact: 'A variedade de cores no prato da gestante garante um leque amplo de fitoquímicos e antioxidantes protetores da barreira placentária.'
      },
      {
        id: 'gen_food_neu',
        label: 'Lanche rápido com tapioca de queijo ou pão com ovo',
        description: 'Prático e proteico.',
        impact: { hunger: isEmergency ? 30 : 22, energy: 12, health: 3, happiness: 6 },
        feedback: 'Saciou a fome e manteve a disposição para a rotina.',
        scientificFact: 'Ovos bem cozidos são uma das melhores fontes naturais de colina, nutriente vital para o desenvolvimento da memória e hipocampo fetal.'
      },
      {
        id: 'gen_food_neg',
        label: 'Comer apenas salgadinhos de pacote e refrigerante',
        description: 'Excesso de sódio, gorduras trans e aditivos artificiais.',
        impact: { hunger: 15, energy: -8, health: -8, happiness: -2 },
        feedback: 'Alimentos ultraprocessados causam inchaço, azia e retenção líquida.',
        scientificFact: 'O consumo frequente de ultraprocessados na gestação está associado a ganho excessivo de peso materno e alterações metabólicas neonatais.'
      }
    ]
  };
}

function getGenericDrinkEvent(trimester: 1 | 2 | 3, week: number, isEmergency: boolean): GameEvent {
  return {
    id: `generic_drink_${week}`,
    title: `Hidratação Materna — Semana ${week}`,
    description: isEmergency 
      ? `A gestante está com sede intensa e sensação de boca seca! Hidratar-se é prioridade máxima.`
      : `Manter a hidratação diária constante apoia a expansão do volume plasmático na ${week}ª semana.`,
    category: 'drink',
    imageEmoji: '🚰',
    isEmergency,
    options: [
      {
        id: 'gen_drink_pos',
        label: 'Água fresca mineral e água de coco verde',
        description: 'Hidratação pura e reposição eletrolítica.',
        impact: { thirst: isEmergency ? 45 : 35, energy: 18, health: 8, happiness: 10 },
        feedback: 'Hidratação renovadora! O volume sanguíneo materno flui com facilidade.',
        scientificFact: 'A água é o principal componente do líquido amniótico, que é engolido e reciclado pelo feto em ciclos contínuos de desenvolvimento pulmonar e digestivo.'
      },
      {
        id: 'gen_drink_neu',
        label: 'Suco natural de melancia ou limão com pouca água',
        description: 'Aporte de água e vitaminas.',
        impact: { thirst: isEmergency ? 32 : 24, energy: 12, health: 4, happiness: 7 },
        feedback: 'Muito refrescante e hidratante.',
        scientificFact: 'A melancia contém mais de 90% de água e licopeno, um antioxidante carotenoide seguro e benéfico na gestação.'
      },
      {
        id: 'gen_drink_neg',
        label: 'Refrigerante gelado e bebidas com estimulantes artificiais',
        description: 'Açúcares simples e acidificantes.',
        impact: { thirst: 10, energy: -5, health: -6, happiness: 2 },
        feedback: 'Não supriu a desidratação celular e causou sensação de sede pouco tempo depois.',
        scientificFact: 'Bebidas hiperosmolares como refrigerantes puxam água para o lúmen intestinal, retardando a hidratação sistêmica.'
      }
    ]
  };
}

function getGenericSleepEvent(trimester: 1 | 2 | 3, week: number, isEmergency: boolean): GameEvent {
  return {
    id: `generic_sleep_${week}`,
    title: `Descanso & Repouso — Semana ${week}`,
    description: isEmergency 
      ? `Cansaço acumulado e sonolência extrema! O corpo precisa de uma pausa reparadora imediatamente.`
      : `O sono de qualidade regenera os tecidos maternos e estimula o hormônio do crescimento fetal.`,
    category: 'sleep',
    imageEmoji: '🛏️',
    isEmergency,
    options: [
      {
        id: 'gen_sleep_pos',
        label: 'Soneca relaxante de lado com travesseiro de corpo e quarto bem ventilado',
        description: 'Alívio da coluna e descanso profundo.',
        impact: { sleep: isEmergency ? 50 : 38, energy: 26, health: 10, happiness: 12 },
        feedback: 'Sono restaurador! As células maternas e fetais se renovaram durante o descanso.',
        scientificFact: 'Durante as fases de sono profundo (NREM), ocorre o pico de liberação do hormônio somatotropina e prolactina, essenciais para o desenvolvimento fetal.'
      },
      {
        id: 'gen_sleep_neu',
        label: 'Descansar reclinada na poltrona ouvindo música ambiente',
        description: 'Pausa para diminuir o ritmo diário.',
        impact: { sleep: isEmergency ? 30 : 22, energy: 14, health: 4, happiness: 8 },
        feedback: 'Boa desaceleração do ritmo cardíaco.',
        scientificFact: 'Elevar as pernas durante momentos de descanso favorece o retorno venoso e reduz o edema nos membros inferiores.'
      },
      {
        id: 'gen_sleep_neg',
        label: 'Resistir ao sono e continuar trabalhando até o esgotamento total',
        description: 'Sobrecarga física e privação de descanso.',
        impact: { sleep: -10, energy: -20, health: -12, happiness: -15 },
        feedback: 'Exaustão intensa que enfraquece o sistema imunológico e aumenta a irritabilidade.',
        scientificFact: 'A privação persistente de sono aumenta a atividade do sistema nervoso simpático, elevando a pressão arterial e a vulnerabilidade a infecções.'
      }
    ]
  };
}

function getGenericHygieneEvent(trimester: 1 | 2 | 3, week: number, isEmergency: boolean): GameEvent {
  return {
    id: `generic_hyg_${week}`,
    title: `Autocuidado & Higiene — Semana ${week}`,
    description: `Manter a pele hidratada, a higiene bucal e o bem-estar corporal traz saúde e previne infecções.`,
    category: 'hygiene',
    imageEmoji: '🧴',
    isEmergency,
    options: [
      {
        id: 'gen_hyg_pos',
        label: 'Banho relaxante morno, escovação dental completa e hidratação da pele com creme neutro',
        description: 'Cuidado integral da cabeça aos pés.',
        impact: { hygiene: isEmergency ? 45 : 35, happiness: 15, health: 8, energy: 10 },
        feedback: 'Sensação maravilhosa de frescor, limpeza e acolhimento corporal!',
        scientificFact: 'A aplicação diária de emolientes neutros após o banho retém a umidade na epiderme, aliviando o prurido decorrente do estiramento da pele.'
      },
      {
        id: 'gen_hyg_neu',
        label: 'Lavagem rápida do rosto e mãos com troca de roupas confortáveis',
        description: 'Higiene prática para o dia a dia.',
        impact: { hygiene: 22, happiness: 8, health: 3, energy: 5 },
        feedback: 'Sensação agradável de conforto.',
        scientificFact: 'Roupas íntimas de algodão permitem a respiração da região genital e previnem a proliferação do fungo da candidíase.'
      },
      {
        id: 'gen_hyg_neg',
        label: 'Usar roupas sintéticas muito justas e esquecer a higiene íntima adequada',
        description: 'Abafamento e alteração do pH local.',
        impact: { hygiene: -10, happiness: -8, health: -10, energy: -5 },
        feedback: 'Desconforto, calor excessivo e irritação na pele.',
        scientificFact: 'Peças sintéticas apertadas acumulam calor e umidade na região perineal, facilitando vaginites e desconforto térmico.'
      }
    ]
  };
}

function getGenericRelaxEvent(trimester: 1 | 2 | 3, week: number, isEmergency: boolean): GameEvent {
  return {
    id: `generic_rel_${week}`,
    title: `Saúde Mental & Conexão Afetiva — Semana ${week}`,
    description: `A gestação envolve transformações emocionais intensas. Cuidar das emoções é cuidar do bebê.`,
    category: 'relax',
    imageEmoji: '🌸',
    isEmergency,
    options: [
      {
        id: 'gen_rel_pos',
        label: 'Momento de respiração profunda, conversa afetuosa com a barriga e escuta de meditação suave',
        description: 'Conexão direta com o bebê e liberação de endorfinas.',
        impact: { happiness: isEmergency ? 45 : 35, energy: 18, health: 10, sleep: 15 },
        feedback: 'Coração sereno e vínculo afetivo fortalecido! A ocitocina transmite paz ao feto.',
        scientificFact: 'O bebê percebe o estado emocional materno através das respostas neuroendócrinas; momentos de calma promovem batimentos cardíacos fetais mais estáveis.'
      },
      {
        id: 'gen_rel_neu',
        label: 'Passeio agradável no jardim ou leitura de um livro prazeroso',
        description: 'Distração saudável e lazer.',
        impact: { happiness: 24, energy: 12, health: 5, sleep: 8 },
        feedback: 'Mente tranquila e pensamentos positivos.',
        scientificFact: 'Atividades prazerosas ativam o circuito de recompensa do cérebro, diminuindo a reatividade ao estresse cotidiano.'
      },
      {
        id: 'gen_rel_neg',
        label: 'Entrar em discussões acaloradas e guardar angústias sem desabafar',
        description: 'Elevação aguda da pressão arterial e taquicardia.',
        impact: { happiness: -20, energy: -15, health: -12, sleep: -10 },
        feedback: 'Pico de estresse e tensão muscular na nuca e ombros.',
        scientificFact: 'Picos súbitos de catecolaminas (adrenalina) causam vasoconstrição temporária dos vasos uterinos; buscar diálogo calmo protege a gestante.'
      }
    ]
  };
}

function getGenericWalkEvent(trimester: 1 | 2 | 3, week: number, isEmergency: boolean): GameEvent {
  return {
    id: `generic_wlk_${week}`,
    title: `Atividade Física Segura — Semana ${week}`,
    description: `Manter o corpo em movimento com moderação fortalece o coração e a postura na ${week}ª semana.`,
    category: 'walk',
    imageEmoji: '👟',
    isEmergency,
    options: [
      {
        id: 'gen_wlk_pos',
        label: 'Caminhada leve ritmada em superfície plana com tênis macio (20-30 min) + hidratação',
        description: 'Exercício de baixo impacto que ativa a bomba muscular da panturrilha.',
        impact: { energy: 25, health: 12, happiness: 16, hunger: 10, sleep: 10 },
        feedback: 'Pernas leves, circulação ativa e disposição renovada!',
        scientificFact: 'Caminhar regularmente durante a gravidez previne o ganho excessivo de peso, melhora o trânsito intestinal e reduz em até 40% a taxa de diabetes gestacional.'
      },
      {
        id: 'gen_wlk_neu',
        label: 'Alongamento suave dos braços, ombros e pernas sentado em cadeira',
        description: 'Sem impacto articular.',
        impact: { energy: 15, health: 6, happiness: 10, sleep: 6 },
        feedback: 'Boa soltura da rigidez postural.',
        scientificFact: 'Alongar a musculatura peitoral e trapezoidal alivia a sobrecarga cervical causada pelo aumento do volume das mamas.'
      },
      {
        id: 'gen_wlk_neg',
        label: 'Caminhar sob sol escaldante do meio-dia sem água e com calçado desconfortável',
        description: 'Risco de desidratação, insolação e queda por perda de equilíbrio.',
        impact: { energy: -20, health: -18, happiness: -12, thirst: -25 },
        feedback: 'Tontura intensa por calor excessivo e bolhas nos pés.',
        scientificFact: 'A termorregulação materna é menos eficiente na gestação; atividades físicas devem sempre ocorrer em horários de sol ameno e com tênis antiderrapante.'
      }
    ]
  };
}

function getGenericPostpartumFeedEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `gen_post_feed_${week}`,
    title: `Amamentação & Nutrição do Bebê — Semana ${week}`,
    description: `O leite materno adapta sua composição a cada semana para atender ao crescimento acelerado do lactente.`,
    category: 'baby_feed',
    imageEmoji: '🤱',
    isEmergency,
    options: [
      {
        id: 'gen_post_feed_pos',
        label: 'Amamentar em ambiente calmo e confortável com apoio para os braços da mãe',
        description: 'Postura ergonômica e mamada tranquila.',
        impact: { happiness: 20, babyHunger: 40, babyHappiness: 25, babyHealth: 15 },
        feedback: 'Mamada farta e aconchegante! O bebê relaxou e mamou até saciar.',
        scientificFact: 'O leite materno contém anticorpos vivos, prebióticos e fatores de crescimento que protegem o intestino do bebê contra infecções virais e bacterianas.'
      },
      {
        id: 'gen_post_feed_neu',
        label: 'Amamentar em pé ou com pressa',
        description: 'Nutrição eficaz, mas com tensão muscular materna.',
        impact: { happiness: 10, babyHunger: 30, babyHappiness: 12, health: 2 },
        feedback: 'O bebê mamou, mas a mãe sentiu desconforto na coluna.',
        scientificFact: 'A mãe deve trazer o bebê até a sua mama, e não curvar as costas em direção ao bebê, para prevenir dores crônicas na coluna cervical e lombar.'
      },
      {
        id: 'gen_post_feed_neg',
        label: 'Atrasar a mamada quando o bebê já chora intensamente de fome',
        description: 'Choro tardio que dificulta a pega por irritabilidade.',
        impact: { happiness: -10, babyHunger: 15, babyHappiness: -15, babyHealth: -5 },
        feedback: 'O bebê ficou muito agitado e engoliu ar durante a mamada por chorar muito antes.',
        scientificFact: 'O choro é um sinal tardio de fome; sinais precoces incluem lamber os lábios, virar a cabeça procurando o peito e levar as mãozinhas à boca.'
      }
    ]
  };
}

function getGenericPostpartumSleepEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `gen_post_sleep_${week}`,
    title: `Aconchego & Sono Seguro — Semana ${week}`,
    description: `Criar rituais calmos de sono ajuda o bebê a se sentir seguro no mundo exterior.`,
    category: 'baby_sleep',
    imageEmoji: '😴',
    isEmergency,
    options: [
      {
        id: 'gen_post_sleep_pos',
        label: 'Ninar com voz suave, colocar no berço seguro de barriga para cima e manter luz baixa',
        description: 'Transição suave para o sono reparador.',
        impact: { sleep: 20, happiness: 18, babySleep: 40, babyHappiness: 25, babyHealth: 15 },
        feedback: 'O bebê adormeceu com segurança e tranquilidade no seu ninho protegido!',
        scientificFact: 'Rituais consistentes antes de dormir estimulam a produção endógena de melatonina e constroem referências de segurança no bebê.'
      },
      {
        id: 'gen_post_sleep_neu',
        label: 'Deixar o bebê adormecer no carrinho com supervisão',
        description: 'Soneca temporária.',
        impact: { sleep: 12, happiness: 10, babySleep: 25, babyHappiness: 12 },
        feedback: 'O bebê descansou por alguns períodos.',
        scientificFact: 'O carrinho deve ser travado e supervisionado para evitar que a cabeça do bebê tombe para a frente, o que poderia comprometer as vias aéreas.'
      },
      {
        id: 'gen_post_sleep_neg',
        label: 'Tentar fazer o bebê dormir em ambiente com televisão alta, luz forte e pessoas falando alto',
        description: 'Sobrecarga de estímulos sensoriais.',
        impact: { sleep: -5, happiness: -10, babySleep: 10, babyHappiness: -20, babyHealth: -5 },
        feedback: 'Choro de sobrecarga sensorial e dificuldade imensa para adormecer.',
        scientificFact: 'Bebês hiperestimulados sofrem estresse sensorial, o que eleva os níveis de cortisol e impede a transição suave para as fases profundas do sono.'
      }
    ]
  };
}

function getGenericPostpartumHygieneEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `gen_post_hyg_${week}`,
    title: `Troca de Fralda & Higiene do Bebê — Semana ${week}`,
    description: `Trocas de fraldas frequentes garantem conforto e protegem a barreira da pele delicada.`,
    category: 'baby_diaper',
    imageEmoji: '👶',
    isEmergency,
    options: [
      {
        id: 'gen_post_hyg_pos',
        label: 'Troca atenta com limpeza de frente para trás, secagem minuciosa das dobras e creme protetor',
        description: 'Técnica correta de prevenção de infecções urinárias e dermatites.',
        impact: { hygiene: 20, happiness: 18, babyHygiene: 45, babyHappiness: 25, babyHealth: 15 },
        feedback: 'Pele perfeitamente limpa, seca e perfumada com frescor natural!',
        scientificFact: 'Limpar sempre no sentido da frente para trás (da uretra em direção ao ânus) impede que coliformes fecais alcancem o meato uretral.'
      },
      {
        id: 'gen_post_hyg_neu',
        label: 'Troca simples rápida de fralda',
        description: 'Higiene básica essencial.',
        impact: { hygiene: 12, babyHygiene: 25, babyHappiness: 10 },
        feedback: 'Bebê com fralda sequinha e confortável.',
        scientificFact: 'Um recém-nascido saudável usa em média 6 a 8 fraldas por dia, o que é um excelente indicador indireto de boa hidratação e mamadas eficazes.'
      },
      {
        id: 'gen_post_hyg_neg',
        label: 'Limpar de trás para a frente levando resíduos em direção à região genital',
        description: 'Erro grave de contaminação bacteriana cruzada.',
        impact: { hygiene: -10, babyHygiene: 5, babyHealth: -20, babyHappiness: -15 },
        feedback: 'Risco sério de infecção urinária!',
        scientificFact: 'Em meninas e meninos, a higienização invertida é a principal causa evitável de infecções do trato urinário na primeira infância.'
      }
    ]
  };
}

function getPostpartumBabyComfortEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `post_baby_comfort_${week}`,
    title: `[Bebê] Carinho, Colo & Vínculo Afetivo — Semana ${week}`,
    description: isEmergency
      ? `O bebê está chorando e buscando aconchego! O contato pele a pele regula a frequência cardíaca do recém-nascido.`
      : `Momentos de carinho e colo desenvolvem a segurança emocional e estimulam a liberação mútua de ocitocina.`,
    category: 'baby_comfort',
    imageEmoji: '🧸',
    isEmergency,
    options: [
      {
        id: 'baby_comf_pos',
        label: 'Aconchegar no colo em contato pele a pele e fazer massagem Shantala suave',
        description: 'Liberação de ocitocina, relaxamento muscular e alívio de cólicas neonatais.',
        impact: { happiness: 22, energy: 10, babyHappiness: 45, babySleep: 20, babyHealth: 15 },
        feedback: 'O bebê suspirou aliviado e sorriu dormindo! Vínculo de amor incondicional fortalecido.',
        scientificFact: 'O método canguru e a massagem reduzem os níveis de cortisol circulante no bebê, melhoram a digestão e fortalecem o apego seguro.'
      },
      {
        id: 'baby_comf_neu',
        label: 'Ninar no colo com balanço suave e canção de ninar',
        description: 'Acalento com voz familiar e movimento ritmado.',
        impact: { happiness: 12, babyHappiness: 28, babySleep: 15 },
        feedback: 'O bebê acalmou os batimentos e ficou relaxado nos braços.',
        scientificFact: 'A voz materna e paterna é reconhecida pelo bebê desde o útero e tem efeito calmante imediato.'
      },
      {
        id: 'baby_comf_neg',
        label: 'Deixar o bebê chorando sozinho no quarto por medo de "acostumar mal com colo"',
        description: 'Mito prejudicial que sobrecarrega o sistema nervoso do bebê com estresse tóxico.',
        impact: { happiness: -15, babyHappiness: -30, babyHealth: -10, sleep: -10 },
        feedback: 'Choro desesperado de desamparo! Recém-nascidos não têm maturidade neurológica para autorregulação sozinhos.',
        scientificFact: 'Colo não "vicia" nem estraga o bebê. Responder prontamente ao choro nos primeiros meses cria crianças mais seguras e independentes no futuro.'
      }
    ]
  };
}

function getPostpartumMotherFoodEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `post_mom_food_${week}`,
    title: `[Mamãe] Nutrição Pós-Parto & Lactação — Semana ${week}`,
    description: isEmergency
      ? `A mãe está com fome intensa! O gasto calórico da produção de leite consome cerca de 500 kcal diárias adicionais.`
      : `Alimentar-se com densidade nutricional apoia a cicatrização dos tecidos maternos e a composição láctea.`,
    category: 'eat',
    imageEmoji: '🍲',
    isEmergency,
    options: [
      {
        id: 'post_mom_food_pos',
        label: 'Refeição farta com proteínas magras (frango/ovos), grãos (aveia/feijão), folhas verdes e frutas com vitamina C',
        description: 'Reposição de ferro, colágeno para cicatrização e suporte à lactação.',
        impact: { hunger: isEmergency ? 48 : 38, energy: 24, health: 12, happiness: 15 },
        feedback: 'Nutrição revitalizadora para a mamãe! Energia renovada para o corpo e para amamentar.',
        scientificFact: 'A aveia e as leguminosas são ricas em ferro e betaglucanas, auxiliando no combate à anemia pós-parto e na produção de leite materno.'
      },
      {
        id: 'post_mom_food_neu',
        label: 'Lanche rápido com sanduíche natural integral e iogurte',
        description: 'Prático para a rotina intensa com o bebê.',
        impact: { hunger: isEmergency ? 32 : 24, energy: 15, health: 5, happiness: 8 },
        feedback: 'Refeição rápida e prática que manteve os níveis de glicemia estáveis.',
        scientificFact: 'Fazer pequenas refeições nutritivas ao longo do dia evita quedas bruscas de energia na puérpera.'
      },
      {
        id: 'post_mom_food_neg',
        label: 'Fazer dietas restritivas extremas para "perder a barriga" imediatamente',
        description: 'Privação calórica perigosa no pós-parto que compromete a imunidade e o leite.',
        impact: { hunger: 10, energy: -20, health: -18, happiness: -15 },
        feedback: 'Fraqueza extrema e tontura! Dietas restritivas no puerpério prejudicam a recuperação física.',
        scientificFact: 'Dietas muito restritivas no pós-parto liberam toxinas na circulação e podem reduzir drasticamente o suprimento de leite materno.'
      }
    ]
  };
}

function getPostpartumMotherDrinkEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `post_mom_drink_${week}`,
    title: `[Mamãe] Hidratação Materna para Amamentação — Semana ${week}`,
    description: isEmergency
      ? `A mãe está com muita sede! O reflexo de descida do leite materno libera ocitocina, despertando sede intensa imediata.`
      : `Manter a ingestão hídrica de 2,5 a 3 litros diários é vital para a saúde materna e síntese do leite.`,
    category: 'drink',
    imageEmoji: '🚰',
    isEmergency,
    options: [
      {
        id: 'post_mom_drink_pos',
        label: 'Garrafa de água sempre ao lado na hora de amamentar, sucos naturais e água de coco',
        description: 'Hidratação contínua e reposição de eletrólitos.',
        impact: { thirst: isEmergency ? 50 : 38, energy: 20, health: 10, happiness: 12 },
        feedback: 'Hidratação exemplar! O corpo materno mantém a circulação fluida e a produção láctea equilibrada.',
        scientificFact: 'O leite materno é composto por aproximadamente 88% de água; a mãe deve beber sempre que sentir sede e manter uma garrafa ao alcance durante as mamadas.'
      },
      {
        id: 'post_mom_drink_neu',
        label: 'Copo de água fresca esporádico ao longo do dia',
        description: 'Hidratação regular.',
        impact: { thirst: isEmergency ? 30 : 22, energy: 10, health: 4, happiness: 6 },
        feedback: 'Manteve o equilíbrio hídrico mínimo.',
        scientificFact: 'A urina clara e inodora é o melhor sinal clínico visual de que a hidratação materna está adequada.'
      },
      {
        id: 'post_mom_drink_neg',
        label: 'Substituir a água por litros de café forte ou refrigerantes à base de cola para se manter acordada',
        description: 'Excesso de cafeína que passa para o leite materno e irrita o bebê.',
        impact: { thirst: 5, energy: -10, health: -12, happiness: -10, babySleep: -20, babyHappiness: -15 },
        feedback: 'A cafeína excessiva passou pelo leite e causou cólicas e insônia no bebê!',
        scientificFact: 'Doses elevadas de cafeína (>300mg/dia) acumulam-se no organismo do bebê, provocando irritabilidade, taquicardia e distúrbios de sono.'
      }
    ]
  };
}

function getPostpartumMotherSleepEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `post_mom_sleep_${week}`,
    title: `[Mamãe] Descanso Materno & Sono Reparador — Semana ${week}`,
    description: isEmergency
      ? `A puérpera está em estado de exaustão! A privação de sono crônica debilita a imunidade e a saúde emocional.`
      : `Dormir e descansar nos intervalos das mamadas é essencial para a recuperação física pós-parto.`,
    category: 'sleep',
    imageEmoji: '🛌',
    isEmergency,
    options: [
      {
        id: 'post_mom_sleep_pos',
        label: 'Aproveitar a soneca do bebê para dormir em quarto escuro e tranquilo, passando o monitor para o parceiro(a)',
        description: 'Sono REM restaurador com divisão de tarefas.',
        impact: { sleep: isEmergency ? 52 : 40, energy: 30, happiness: 22, health: 14 },
        feedback: 'Descanso profundo revigorante! A mente e o corpo da mãe ganharam fôlego novo.',
        scientificFact: 'Mesmo breves blocos de sono de 90 minutos completam um ciclo sono completo (NREM + REM), restaurando a clareza mental e a disposição materna.'
      },
      {
        id: 'post_mom_sleep_neu',
        label: 'Descansar deitada na cama com os olhos fechados sem dormir profundamente',
        description: 'Repouso muscular passivo.',
        impact: { sleep: isEmergency ? 28 : 20, energy: 14, happiness: 10, health: 5 },
        feedback: 'Aliviou a tensão na coluna e nos membros.',
        scientificFact: 'O repouso horizontal alivia a sobrecarga de peso sobre o assoalho pélvico no pós-parto imediato.'
      },
      {
        id: 'post_mom_sleep_neg',
        label: 'Ficar no celular nas redes sociais durante a madrugada enquanto o bebê dorme',
        description: 'Luz azul estimulante que inibe a melatonina e agrava a insônia.',
        impact: { sleep: -10, energy: -20, health: -15, happiness: -12 },
        feedback: 'Cansaço extremo acumulado e dor de cabeça pela luz de telas!',
        scientificFact: 'A luz azul de telas inibe a secreção de melatonina pela glândula pineal, fragmentando ainda mais o pouco tempo de sono disponível no puerpério.'
      }
    ]
  };
}

function getPostpartumMotherHygieneEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `post_mom_hyg_${week}`,
    title: `[Mamãe] Autocuidado & Higiene Pós-Parto — Semana ${week}`,
    description: isEmergency
      ? `A mãe precisa de cuidados corporais urgentes! A higiene pós-parto previne infecções de ferida operatória e loquiação.`
      : `O banho morno e a higiene cuidadosa promovem relaxamento muscular e aceleram a cicatrização.`,
    category: 'hygiene',
    imageEmoji: '🚿',
    isEmergency,
    options: [
      {
        id: 'post_mom_hyg_pos',
        label: 'Banho morno relaxante, lavagem da cicatriz com água e sabonete neutro, secagem delicada e troca de absorvente',
        description: 'Cuidado padrão ouro com a ferida cirúrgica/períneo e alívio do estresse.',
        impact: { hygiene: isEmergency ? 48 : 38, happiness: 24, health: 14, energy: 15 },
        feedback: 'Sensação maravilhosa de frescor, limpeza e alívio das tensões do corpo!',
        scientificFact: 'Manter a cicatriz cirúrgica e o períneo limpos e secos é o método mais eficaz para prevenir infecções pós-parto (deiscências e infecções puerperais).'
      },
      {
        id: 'post_mom_hyg_neu',
        label: 'Troca simples rápida de absorvente e lavagem rápida do rosto',
        description: 'Higiene básica.',
        impact: { hygiene: isEmergency ? 26 : 18, happiness: 10, health: 6 },
        feedback: 'Higiene básica mantida com sucesso.',
        scientificFact: 'A loquiação (sangramento pós-parto) dura em média de 3 a 6 semanas e requer trocas frequentes de absorventes para evitar proliferação bacteriana.'
      },
      {
        id: 'post_mom_hyg_neg',
        label: 'Passar pomadas caseiras, pós ou produtos perfumados sobre a cicatriz do parto',
        description: 'Prática caseira que irrita os tecidos e pode causar infecção bacteriana.',
        impact: { hygiene: 5, health: -18, happiness: -15 },
        feedback: 'Irritação na cicatriz! A ferida ficou vermelha e inflamada.',
        scientificFact: 'A ferida operatória da cesárea ou laceração perineal deve ser lavada apenas com água e sabonete neutro, sem aplicação de pomadas ou álcool não prescritos.'
      }
    ]
  };
}

function getPostpartumMotherRelaxEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `post_mom_relax_${week}`,
    title: `[Mamãe] Saúde Mental & Bem-Estar da Puérpera — Semana ${week}`,
    description: isEmergency
      ? `A mãe está sobrecarregada e emotiva! A queda hormonal pós-parto somada ao cansaço pode gerar choro e angústia (baby blues).`
      : `Cuidar das emoções, conversar com a rede de apoio e respirar fundo fortalece a resiliência materna.`,
    category: 'relax',
    imageEmoji: '🌸',
    isEmergency,
    options: [
      {
        id: 'post_mom_rel_pos',
        label: 'Desabafar com parceiro(a)/família, acolher os sentimentos sem culpa e fazer 10 minutos de respiração consciente',
        description: 'Acolhimento emocional, validação de sentimentos e regulação do sistema parassimpático.',
        impact: { happiness: isEmergency ? 45 : 32, health: 12, energy: 15, sleep: 10 },
        feedback: 'Alívio no peito e sensação de acolhimento! Sentir-se ouvida renova a força da mãe.',
        scientificFact: 'Cerca de 80% das mães vivenciam o "baby blues" entre o 3º e 14º dia pós-parto devido à queda abrupta de estrogênio e progesterona; apoio e escuta empática são o melhor remédio.'
      },
      {
        id: 'post_mom_rel_neu',
        label: 'Ouvir uma playlist de músicas relaxantes enquanto descansa no sofá',
        description: 'Distração auditiva suave.',
        impact: { happiness: isEmergency ? 24 : 16, energy: 8 },
        feedback: 'A música trouxe tranquilidade e serenidade para o ambiente.',
        scientificFact: 'A musicoterapia atua reduzindo os níveis de adrenalina e pressão arterial sistólica em puérperas.'
      },
      {
        id: 'post_mom_rel_neg',
        label: 'Tentar ser a "mãe perfeita", recusar toda ajuda e guardar a tristeza e o choro para si',
        description: 'Sobrecarga solitária que eleva o risco de depressão pós-parto.',
        impact: { happiness: -20, health: -15, energy: -15 },
        feedback: 'Angústia e sensação de solidão extrema! Nenhuma mãe precisa dar conta de tudo sozinha.',
        scientificFact: 'A romantização da maternidade e a falta de rede de apoio são os principais fatores de risco modificáveis para a depressão pós-parto.'
      }
    ]
  };
}

function getPostpartumMotherWalkEvent(week: number, isEmergency: boolean): GameEvent {
  return {
    id: `post_mom_walk_${week}`,
    title: `[Mamãe] Mobilidade & Recuperação Corporal — Semana ${week}`,
    description: isEmergency
      ? `Corpo rígido e sensação de fadiga postural! Pequenos movimentos e alongamentos aliviam as dores de amamentar.`
      : `Caminhar em ritmo leve e exercitar a respiração apoia o retorno venoso e a postura.`,
    category: 'walk',
    imageEmoji: '🚶‍♀️',
    isEmergency,
    options: [
      {
        id: 'post_mom_walk_pos',
        label: 'Passeio leve ao ar livre no início da manhã ou alongamento suave de ombros, coluna e assoalho pélvico',
        description: 'Ativação circulatória segura, vitamina D solar e alívio da dor nas costas.',
        impact: { energy: isEmergency ? 38 : 26, health: 14, happiness: 20, sleep: 10 },
        feedback: 'Ar fresco, postura alongada e disposição revigorada para o dia!',
        scientificFact: 'A mobilidade precoce e caminhadas leves reduzem em até 60% o risco de trombose venosa profunda no pós-parto e melhoram o trânsito intestinal.'
      },
      {
        id: 'post_mom_walk_neu',
        label: 'Alongamento suave na cadeira com respiração diafragmática',
        description: 'Alívio da tensão cervical acumulada nas mamadas.',
        impact: { energy: 15, health: 6, happiness: 10 },
        feedback: 'Ombros e trapézio relaxados.',
        scientificFact: 'A postura de amamentação frequentemente sobrecarrega a coluna torácica e os músculos paravertebrais.'
      },
      {
        id: 'post_mom_walk_neg',
        label: 'Fazer exercícios abdominais intensos e carregar pesos pesados logo nos primeiros dias de pós-parto',
        description: 'Pressão intra-abdominal excessiva com risco de deiscência cirúrgica e piora da diástase.',
        impact: { energy: -20, health: -22, happiness: -15 },
        feedback: 'Dor intensa na cicatriz e sangramento aumentado! Exercícios pesados são contraindicados no puerpério imediato.',
        scientificFact: 'O retorno a atividades físicas de alto impacto deve aguardar a liberação obstétrica na consulta de 6 semanas de puerpério.'
      }
    ]
  };
}
