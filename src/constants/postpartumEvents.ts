import { WeeklyFocus } from '../types';

export const POSTPARTUM_FEED_EVENTS: Record<number, WeeklyFocus> = {
  1: {
    week: 1,
    title: 'Colostro Dourado & Pega Correta',
    description: 'Nos primeiros dias, as mamas produzem colostro — líquido rico em anticorpos com volume ideal para o pequeno estômago do recém-nascido.',
    options: [
      {
        id: 'post_feed_1_pos',
        label: 'Oferecer o peito em livre demanda ajustando a boca do bebê como "boquinha de peixinho"',
        description: 'Boca bem aberta, lábios evertidos, cobrindo a maior parte da aréola inferior.',
        impact: { happiness: 20, babyHunger: 40, babyHappiness: 25, babyHealth: 15 },
        feedback: 'Pega perfeita e indolor! O bebê mamou o colostro concentrado e adormeceu tranquilo.',
        scientificFact: 'A pega correta (boca abocanhando grande parte da aréola e não apenas o mamilo) previne fissuras e garante a drenagem eficiente dos seios lactíferos.'
      },
      {
        id: 'post_feed_1_neu',
        label: 'Amamentar cronometrando exatamente 15 minutos em cada peito',
        description: 'Tentativa de impor horários rígidos.',
        impact: { happiness: 10, babyHunger: 25, babyHappiness: 10, babyHealth: 5 },
        feedback: 'O bebê mamou, mas ficou um pouco inquieto por interromper a sucção antes da saciedade.',
        scientificFact: 'A amamentação deve ser em livre demanda: o bebê regula o tempo e a quantidade necessária para extrair o leite inicial e o leite posterior (rico em gorduras).'
      },
      {
        id: 'post_feed_1_neg',
        label: 'Oferecer água, chás ou fórmula infantil sem indicação médica por achar o colostro "pouco"',
        description: 'Interferência precoce com bicos artificiais e líquidos desnecessários.',
        impact: { happiness: -10, health: -5, babyHunger: 15, babyHealth: -15, babyHappiness: -10 },
        feedback: 'Alerta! O bebê pode sofrer confusão de bicos e redução da produção natural de leite materno.',
        scientificFact: 'O colostro é suficiente para o estômago de 5-7 ml do recém-nascido. Chás e água são contraindicados para bebês em aleitamento exclusivo nos primeiros 6 meses.'
      }
    ]
  },
  2: {
    week: 2,
    title: 'Apojadura (Descida do Leite) & Alívio de Ingurgitamento',
    description: 'Com a descida do leite maduro, os seios podem ficar muito cheios, quentes e tensos (ingurgitamento fisiológico).',
    options: [
      {
        id: 'post_feed_2_pos',
        label: 'Massagens circulares suaves antes da mamada e ordenha manual da aréola para amolecê-la',
        description: 'Técnica de alívio da pressão periareolar.',
        impact: { hygiene: 15, happiness: 22, health: 10, babyHunger: 45, babyHappiness: 20 },
        feedback: 'Alívio imediato da tensão mamária! A aréola ficou macia e facilitou a sucção do bebê.',
        scientificFact: 'A massagem suave e a drenagem manual da aréola antes de posicionar o bebê evitam lesões no mamilo e previnem a evolução para mastite.'
      },
      {
        id: 'post_feed_2_neu',
        label: 'Deixar o bebê mamar diretamente mesmo com a mama endurecida e tensa',
        description: 'Sucção sobre aréola rígida.',
        impact: { happiness: 8, babyHunger: 30, health: 0, babyHappiness: 8 },
        feedback: 'O bebê teve dificuldade de acoplar e a mãe sentiu leve desconforto no bico.',
        scientificFact: 'Quando a aréola está muito turgida, o bebê escorrega para a ponta do mamilo, causando dor e lesão por fricção.'
      },
      {
        id: 'post_feed_2_neg',
        label: 'Aplicar compressas quentes ou água do chuveiro fervendo diretamente nos seios ingurgitados',
        description: 'Erro comum que aumenta a inflamação e vasodilatação local.',
        impact: { happiness: -15, health: -15, babyHunger: 10, babyHealth: -5 },
        feedback: 'Piora intensa do inchaço e dor! O calor excessivo aumentou a produção de leite descontroladamente.',
        scientificFact: 'O calor excessivo dilata os vasos e intensifica o edema e a produção de leite na mama já ingurgitada; recomenda-se massagem e esvaziamento, e compressas frias apenas se indicadas.'
      }
    ]
  },
  3: {
    week: 3,
    title: 'Salto de Crescimento dos 21 Dias & Livre Demanda',
    description: 'Por volta das 3 semanas, o bebê passa pelo primeiro grande salto de crescimento e quer mamar quase sem parar.',
    options: [
      {
        id: 'post_feed_3_pos',
        label: 'Acolher a livre demanda, descansar junto com o bebê e manter hidratação materna abundante',
        description: 'Confiança na fisiologia e apoio familiar.',
        impact: { sleep: 15, happiness: 25, thirst: 20, babyHunger: 50, babyHappiness: 30, babyHealth: 15 },
        feedback: 'O corpo respondeu à sucção frequente aumentando o suprimento de leite na medida exata!',
        scientificFact: 'Os picos de crescimento duram de 2 a 4 dias; a sucção mais frequente envia sinais hormonais de prolactina para ajustar a produção de leite.'
      },
      {
        id: 'post_feed_3_neu',
        label: 'Dar chupeta para espaçar as mamadas a cada 3 horas fixas',
        description: 'Inibição do estímulo natural da prolactina.',
        impact: { happiness: 5, babyHunger: 15, babyHappiness: 5, babyHealth: 0 },
        feedback: 'O bebê acalmou momentaneamente com a chupeta, mas acordou faminto logo depois.',
        scientificFact: 'O uso precoce de chupeta pode mascarar sinais de fome e levar a ganho de peso insuficiente nos saltos de crescimento.'
      },
      {
        id: 'post_feed_3_neg',
        label: 'Acreditar no mito do "leite fraco" e introduzir mamadeiras de mingau',
        description: 'Prática perigosa de sobrecarga gástrica em recém-nascidos.',
        impact: { happiness: -12, health: -10, babyHunger: 10, babyHealth: -20, babyHappiness: -15 },
        feedback: 'Perigo! O sistema gastrointestinal do bebê de 3 semanas não digere amidos complexos.',
        scientificFact: 'Não existe leite materno fraco. A composição do leite é perfeita e ajustada dinamicamente para as necessidades nutricionais e imunológicas do lactente.'
      }
    ]
  },
  6: {
    week: 6,
    title: 'Prevenção de Mastite & Esvaziamento Adequado',
    description: 'Canais galactóforos obstruídos podem causar febre, dor local em cunha e vermelhidão na mama.',
    options: [
      {
        id: 'post_feed_6_pos',
        label: 'Variar as posições de amamentação (tradicional, invertida e deitada) garantindo esvaziamento completo',
        description: 'Drenagem de todos os quadrantes mamários.',
        impact: { health: 15, happiness: 20, hygiene: 10, babyHunger: 40, babyHappiness: 20 },
        feedback: 'Mamas leves e sem nódulos dolorosos! Todas as regiões da glândula foram bem drenadas.',
        scientificFact: 'O queixo do bebê aponta para a área da mama que é drenada com maior intensidade. Variar as posições desobstrui diferentes ductos mamários.'
      },
      {
        id: 'post_feed_6_neu',
        label: 'Amamentar sempre na mesma posição deitada',
        description: 'Drenagem repetitiva do mesmo quadrante.',
        impact: { health: 5, happiness: 10, babyHunger: 30, babyHappiness: 10 },
        feedback: 'Alimentou o bebê, mas acumulou leve tensão na lateral da mama.',
        scientificFact: 'Sutiãs muito apertados com aros de ferro podem comprimir ductos e favorecer a estase do leite.'
      },
      {
        id: 'post_feed_6_neg',
        label: 'Suspender a amamentação na mama dolorida por medo da inflamação',
        description: 'Estase láctea com risco de abscesso mamário bacteriano.',
        impact: { health: -20, happiness: -18, babyHunger: 10, babyHealth: -10 },
        feedback: 'Febre súbita e piora acentuada da dor! A estase de leite alimenta a proliferação bacteriana.',
        scientificFact: 'Mesmo em caso de mastite, a amamentação na mama afetada é segura para o bebê e é a medida terapêutica mais importante para desobstruir o canal.'
      }
    ]
  }
};

export const POSTPARTUM_SLEEP_EVENTS: Record<number, WeeklyFocus> = {
  1: {
    week: 1,
    title: 'Sono Seguro do Recém-Nascido: Os 3 Pilares (ABC)',
    description: 'A posição do bebê para dormir é o fator isolado mais importante na prevenção da Síndrome da Morte Súbita do Lactente (SMSL).',
    options: [
      {
        id: 'post_sleep_1_pos',
        label: 'Colocar o bebê para dormir de barriga para cima (decúbito dorsal), em colchão firme no berço ao lado dos pais, sem travesseiros ou bichos soltos',
        description: 'Recomendação unânime da Sociedade Brasileira de Pediatria (SBP) e Academia Americana de Pediatria (AAP).',
        impact: { sleep: 25, happiness: 20, babySleep: 40, babyHealth: 20, babyHappiness: 20 },
        feedback: 'Padrão ouro de segurança! As vias aéreas do bebê permanecem abertas e desobstruídas.',
        scientificFact: 'Dormir de barriga para cima reduz em até 70% o risco de morte súbita, pois a traqueia fica posicionada anatomicamente acima do esôfago.'
      },
      {
        id: 'post_sleep_1_neu',
        label: 'Colocar o bebê de lado com rolinhos de apoio',
        description: 'Prática antiga hoje não recomendada.',
        impact: { sleep: 15, happiness: 10, babySleep: 25, babyHealth: 5 },
        feedback: 'O bebê dormiu, mas a posição de lado é instável e facilita a virada acidental para bruços.',
        scientificFact: 'A posição lateral é instável; a SBP não recomenda o uso de rolinhos ou protetores fofos dentro do berço.'
      },
      {
        id: 'post_sleep_1_neg',
        label: 'Colocar o bebê de bruços ou dormir com ele no sofá fofo após exaustão materna',
        description: 'Altíssimo risco de asfixia posicional.',
        impact: { sleep: -10, happiness: -15, babySleep: 10, babyHealth: -25, babyHappiness: -15 },
        feedback: 'PERIGO EXTREMO! Sofás fofos e posição prona são as causas mais frequentes de asfixia acidental.',
        scientificFact: 'Bebês de bruços têm maior dificuldade para despertar de episódios de hipóxia e podem reinalar o próprio ar rico em gás carbônico.'
      }
    ]
  },
  3: {
    week: 3,
    title: 'Privação de Sono & Estratégia de "Dormir Quando o Bebê Dorme"',
    description: 'Os ciclos de sono do recém-nascido duram de 50 a 60 minutos e não diferenciam o dia da noite.',
    options: [
      {
        id: 'post_sleep_3_pos',
        label: 'Aproveitar as sonecas do bebê durante o dia para descansar e delegar tarefas domésticas à rede de apoio',
        description: 'Recuperação física da puérpera e regulação hormonal.',
        impact: { sleep: 45, energy: 30, happiness: 20, health: 12, babySleep: 30 },
        feedback: 'Corpo e mente renovados! A mãe descansada cuida com maior serenidade e paciência.',
        scientificFact: 'Sonecas diurnas curtas de 30 a 60 minutos reduzem a pressão de sono homeostática e restauram funções cognitivas em puérperas.'
      },
      {
        id: 'post_sleep_3_neu',
        label: 'Ficar arrumando a casa enquanto o bebê dorme',
        description: 'Priorização de tarefas materiais sobre a saúde física.',
        impact: { sleep: -5, energy: -15, happiness: 5, hygiene: 15 },
        feedback: 'A casa ficou limpa, mas a mãe acumulou exaustão para a noite.',
        scientificFact: 'A exaustão extrema materno-paterna diminui os reflexos e aumenta o risco de acidentes domésticos e depressão pós-parto.'
      },
      {
        id: 'post_sleep_3_neg',
        label: 'Tomar medicamentos sedativos fortes por conta própria para forçar o sono da mãe',
        description: 'Risco de sedação profunda e incapacidade de responder ao choro do bebê.',
        impact: { sleep: 10, energy: -20, health: -20, happiness: -15 },
        feedback: 'Alerta! Medicamentos sedativos passam pelo leite materno e prejudicam o despertar de segurança.',
        scientificFact: 'Benzodiazepínicos e sedativos sem prescrição médica durante a amamentação causam letargia, hipotonia e depressão respiratória neonatal.'
      }
    ]
  }
};

export const POSTPARTUM_HYGIENE_EVENTS: Record<number, WeeklyFocus> = {
  1: {
    week: 1,
    title: 'Cuidados com o Coto Umbilical & Prevenção de Onfalite',
    description: 'O cordão umbilical gelatinoso está em processo de mumificação e cicatrização (queda prevista em 7 a 15 dias).',
    options: [
      {
        id: 'post_hyg_1_pos',
        label: 'Higienizar a base do coto com álcool a 70% ou manter limpo e seco a cada troca de fralda, deixando o umbigo fora da fralda',
        description: 'Antissepsia segura e ventilação natural.',
        impact: { hygiene: 25, happiness: 15, babyHygiene: 45, babyHealth: 20, babyHappiness: 15 },
        feedback: 'Coto umbilical sequinho e sem odores! Cicatrização em ritmo excelente.',
        scientificFact: 'Manter o coto limpo, seco e arejado (sem cobrir com a fralda) acelera a queda natural e previne a onfalite (infecção bacteriana do umbigo).'
      },
      {
        id: 'post_hyg_1_neu',
        label: 'Limpar apenas com água durante o banho sem secar bem a base',
        description: 'Limpeza básica, mas com umidade residual.',
        impact: { hygiene: 15, babyHygiene: 25, babyHealth: 5 },
        feedback: 'O umbigo ficou limpo, mas a umidade na base pode atrasar a queda natural.',
        scientificFact: 'Secar delicadamente com haste flexível de algodão após o banho evita a proliferação de fungos e bactérias na base do coto.'
      },
      {
        id: 'post_hyg_1_neg',
        label: 'Colocar moedas, faixas apertadas, pós caseiros ou ervas no umbigo',
        description: 'Mitos e crendices populares com alto risco infeccioso e de tétano neonatal.',
        impact: { hygiene: -15, happiness: -10, babyHygiene: -20, babyHealth: -30, babyHappiness: -20 },
        feedback: 'GRAVE RISCO DE INFECÇÃO! Faixas e pós contaminados podem causar infecções sistêmicas.',
        scientificFact: 'Faixas umbilicais e moedas não previnem hérnias (que são fechamentos musculares congênitos) e acumulam urina e fezes diretamente na ferida umbilical.'
      }
    ]
  },
  2: {
    week: 2,
    title: 'O Primeiro Banho de Imersão & Temperatura da Água',
    description: 'A pele do recém-nascido é fina e perde calor com muita rapidez.',
    options: [
      {
        id: 'post_hyg_2_pos',
        label: 'Banho rápido em banheira com água morna (36,5°C a 37°C testada no antebraço), em ambiente fechado sem correntes de ar',
        description: 'Conforto térmico e relaxamento sensorial.',
        impact: { hygiene: 30, happiness: 22, babyHygiene: 40, babyHappiness: 25, babySleep: 20 },
        feedback: 'O bebê relaxou como se estivesse no ambiente uterino e adormeceu suavemente!',
        scientificFact: 'A água na temperatura corporal evita hipotermia neonatal e acalma os reflexos involuntários (como o reflexo de Moro).'
      },
      {
        id: 'post_hyg_2_neu',
        label: 'Banho de esponja suave com toalha úmida',
        description: 'Higiene rápida sem imersão.',
        impact: { hygiene: 20, babyHygiene: 25, babyHappiness: 10 },
        feedback: 'Prático e seguro para dias mais frios.',
        scientificFact: 'Banhos curtos (5 a 8 minutos) preservam o manto lipídico natural que protege a barreira cutânea do recém-nascido.'
      },
      {
        id: 'post_hyg_2_neg',
        label: 'Usar água muito quente ou sabonetes bactericidas fortes perfumados',
        description: 'Agressão à microbiota cutânea e risco de queimaduras.',
        impact: { hygiene: 5, babyHygiene: 10, babyHealth: -15, babyHappiness: -20 },
        feedback: 'Choro intenso do bebê por ardência na pele e vermelhidão!',
        scientificFact: 'Sabonetes perfumados ou bactericidas destroem o pH ácido natural da pele infantil, facilitando dermatites e alergias de contato.'
      }
    ]
  },
  4: {
    week: 4,
    title: 'Prevenção de Dermatite de Fralda (Assaduras)',
    description: 'O contato prolongado da pele do bebê com urina e fezes altera o pH e facilita a proliferação do fungo Candida albicans.',
    options: [
      {
        id: 'post_hyg_4_pos',
        label: 'Trocas frequentes, limpeza com algodão e água morna (evitando lenços umedecidos perfumados) e pomada de barreira com óxido de zinco',
        description: 'Barreira física protetora e pele sempre sequinha.',
        impact: { hygiene: 25, happiness: 18, babyHygiene: 45, babyHealth: 15, babyHappiness: 25 },
        feedback: 'Bumbum saudável e sem irritações! O bebê fica muito mais sorridente.',
        scientificFact: 'Lenços umedecidos com álcool ou conservantes removem a camada lipídica protetora; algodão com água morna é a opção mais segura no primeiro mês.'
      },
      {
        id: 'post_hyg_4_neu',
        label: 'Trocar a fralda apenas quando estiver muito cheia e pesada',
        description: 'Exposição prolongada à acidez urinária.',
        impact: { hygiene: 10, babyHygiene: 15, babyHappiness: 0, babyHealth: -5 },
        feedback: 'Pele com leve vermelhidão nas dobrinhas da virilha.',
        scientificFact: 'A ureia da urina é decomposta em amônia pelas bactérias fecais, tornando o pH cáustico para a epiderme infantil.'
      },
      {
        id: 'post_hyg_4_neg',
        label: 'Usar talco em pó solto diretamente na região genital e nas coxas',
        description: 'Risco respiratório por inalação de micropartículas e irritação fúngica.',
        impact: { hygiene: -5, babyHygiene: 5, babyHealth: -20, babyHappiness: -15 },
        feedback: 'Tosse do bebê pelo pó suspenso no ar e acúmulo de pasta úmida nas dobras!',
        scientificFact: 'Talcos em pó são expressamente desaconselhados por sociedades pediátricas devido ao risco de aspiração pulmonar e pneumonite química.'
      }
    ]
  }
};
