import { WeeklyFocus, GameEventOption } from '../types';

export const WEEKLY_FOOD_EVENTS: Record<number, WeeklyFocus> = {
  2: {
    week: 2,
    title: 'Nutrição Inicial & Pequenas Porções',
    description: 'Nesta fase inicial, a divisão celular exige aporte constante de energia e nutrientes balanceados sem sobrecarregar a digestão.',
    options: [
      {
        id: 'food_2_positive',
        label: 'Refeição leve com ovos, aveia e frutas cítricas',
        description: 'Proteína de alto valor biológico com fibras solúveis e vitamina C.',
        impact: { hunger: 30, energy: 20, health: 5, happiness: 10 },
        feedback: 'Excelente escolha! Refeições fracionadas ajudam a manter a glicemia estável e fornecem nutrientes essenciais.',
        scientificFact: 'Fracionar a alimentação em 5 a 6 pequenas refeições ao dia previne hipoglicemia e reduz o desconforto gástrico inicial.'
      },
      {
        id: 'food_2_neutral',
        label: 'Prato rápido de massa branca com queijo simples',
        description: 'Energia rápida, porém com poucas fibras e micronutrientes.',
        impact: { hunger: 25, energy: 10, health: 0, happiness: 5 },
        feedback: 'Saciou a fome, mas os carboidratos refinados geram picos glicêmicos rápidos seguidos de cansaço.',
        scientificFact: 'Carboidratos complexos (como grãos integrais) liberam glicose de forma gradual, sustentando melhor a energia da gestante.'
      },
      {
        id: 'food_2_negative',
        label: 'Pular a refeição por falta de tempo e comer ultraprocessados depois',
        description: 'Snacks ricos em sódio e gorduras saturadas.',
        impact: { hunger: 10, energy: -10, health: -5, happiness: -5 },
        feedback: 'Longos períodos em jejum aumentam a sensação de náusea e fadiga.',
        scientificFact: 'O jejum prolongado na gestação induz cetogênese leve, o que pode acentuar náuseas e cefaleias.'
      }
    ]
  },
  4: {
    week: 4,
    title: 'Manejo de Enjoos & Náuseas Matinais',
    description: 'A elevação do hormônio hCG e da progesterona pode provocar sensibilidade olfativa e enjoos matinais.',
    options: [
      {
        id: 'food_4_positive',
        label: 'Biscoito integral seco ao acordar + chá de gengibre suave',
        description: 'Estratégia clínica consagrada contra êmese gravídica.',
        impact: { hunger: 25, energy: 15, health: 8, happiness: 12 },
        feedback: 'Sensação de alívio imediato! O estômago assentou suavemente.',
        scientificFact: 'O gengibre possui gingeróis com ação antiemética comprovada em ensaios clínicos, sendo seguro em doses culinárias moderadas.'
      },
      {
        id: 'food_4_neutral',
        label: 'Torrada simples com manteiga e água gelada',
        description: 'Opção neutra de fácil tolerância.',
        impact: { hunger: 20, energy: 10, health: 2, happiness: 5 },
        feedback: 'Acalmou o estômago razoavelmente bem.',
        scientificFact: 'Alimentos secos e ricos em amido consumidos ainda na cama evitam a estimulação ácida brusca do estômago vazio.'
      },
      {
        id: 'food_4_negative',
        label: 'Café da manhã gorduroso com frituras e condimentos fortes',
        description: 'Gorduras pesadas que retardam o esvaziamento gástrico.',
        impact: { hunger: 10, energy: -15, health: -8, happiness: -10 },
        feedback: 'O estômago ficou pesado e as náuseas pioraram significativamente.',
        scientificFact: 'Alimentos gordurosos lentificam o esvaziamento gástrico (já reduzido pela progesterona), exacerbando náuseas e refluxo.'
      }
    ]
  },
  6: {
    week: 6,
    title: 'Ácido Fólico & Fechamento do Tubo Neural',
    description: 'Nesta semana crítica, o tubo neural do embrião está se completando para formar o cérebro e a medula espinhal.',
    options: [
      {
        id: 'food_6_positive',
        label: 'Salada de espinafre, brócolis cozido no vapor, feijão e suplemento com metilfolato',
        description: 'Rico em folatos bioativos e antioxidantes.',
        impact: { hunger: 28, energy: 20, health: 10, happiness: 10 },
        feedback: 'Nutrição celular impecável para o desenvolvimento do sistema nervoso do bebê!',
        scientificFact: 'A ingestão recomendada de ácido fólico é de 400 a 600 µg/dia no período periconcepcional, reduzindo defeitos do tubo neural em até 70%.'
      },
      {
        id: 'food_6_neutral',
        label: 'Arroz com feijão e salada simples de alface',
        description: 'Aporte modesto de folato alimentar tradicional.',
        impact: { hunger: 25, energy: 12, health: 4, happiness: 5 },
        feedback: 'Alimentação saudável, embora o aporte de folato possa exigir complementação vitamínica prescrita.',
        scientificFact: 'Folatos naturais em vegetais escuros são termossensíveis; o cozimento a vapor preserva maior teor do que o cozimento em água abundante.'
      },
      {
        id: 'food_6_negative',
        label: 'Fast-food com batata frita e refrigerante',
        description: 'Calorias vazias sem micronutrientes essenciais.',
        impact: { hunger: 15, energy: -5, health: -6, happiness: 2 },
        feedback: 'Calorias vazias não supriram as altas demandas biológicas de embriogênese.',
        scientificFact: 'Dietas deficientes em micronutrientes nos primeiros meses aumentam riscos metabólicos e inflamatórios na gestação.'
      }
    ]
  },
  8: {
    week: 8,
    title: 'Proteínas de Alto Valor & Construção dos Tecidos',
    description: 'O feto inicia a diferenciação de músculos, cartilagens e órgãos vitais, demandando aminoácidos essenciais.',
    options: [
      {
        id: 'food_8_positive',
        label: 'Filé de peixe bem cozido (salmão/tilápia) com quinoa e legumes coloridos',
        description: 'Proteínas completas, zinco, ômega-3 e fibras.',
        impact: { hunger: 35, energy: 25, health: 8, happiness: 12 },
        feedback: 'Refeição riquíssima! Energia duradoura e tijolos biológicos para o crescimento fetal.',
        scientificFact: 'A demanda proteica aumenta em média 25 g/dia na gestação para apoiar o crescimento placentário e fetal.'
      },
      {
        id: 'food_8_neutral',
        label: 'Sanduíche de queijo branco com pão integral',
        description: 'Opção leve e prática.',
        impact: { hunger: 25, energy: 15, health: 3, happiness: 6 },
        feedback: 'Refeição equilibrada e rápida para a rotina diária.',
        scientificFact: 'Laticínios pasteurizados são fontes confiáveis de proteína e cálcio; evite queijos não pasteurizados pelo risco de listeriose.'
      },
      {
        id: 'food_8_negative',
        label: 'Carne crua / malpassada ou carpaccio',
        description: 'Alto risco microbiológico de toxoplasmose.',
        impact: { hunger: 15, energy: -10, health: -15, happiness: -5 },
        feedback: 'Alerta! Carnes cruas ou malpassadas oferecem grave risco infeccioso.',
        scientificFact: 'A toxoplasmose congênita pode causar lesões neurológicas e oculares fetais. Toda carne na gravidez deve ser bem cozida (>71°C).'
      }
    ]
  },
  10: {
    week: 10,
    title: 'Ferro, Prevenção de Anemia & Vitamina C',
    description: 'O volume sanguíneo materno está se expandindo em até 50%, aumentando drasticamente a necessidade de hemoglobina.',
    options: [
      {
        id: 'food_10_positive',
        label: 'Feijão preto com couve refogada e suco de laranja natural',
        description: 'Ferro não-heme com potencializador de absorção (vitamina C).',
        impact: { hunger: 32, energy: 22, health: 10, happiness: 10 },
        feedback: 'Sinergia nutricional perfeita! A vitamina C triplicou a biodisponibilidade do ferro.',
        scientificFact: 'O ácido ascórbico (vitamina C) reduz o ferro férrico (Fe3+) a ferro ferroso (Fe2+), facilitando sua absorção no duodeno materno.'
      },
      {
        id: 'food_10_neutral',
        label: 'Prato de carne com café com leite logo em seguida',
        description: 'Inibidores de ferro consumidos na mesma refeição.',
        impact: { hunger: 25, energy: 10, health: 2, happiness: 5 },
        feedback: 'O cálcio e os polifenóis do café/chá competem com a absorção do ferro.',
        scientificFact: 'Tanninos e cálcio reduzem a absorção de ferro em até 60%; recomenda-se espaçar café e laticínios das refeições ricas em ferro por 1-2h.'
      },
      {
        id: 'food_10_negative',
        label: 'Apenas bolachas recheadas e refrigerante de cola',
        description: 'Açúcar puro e conservantes químicos.',
        impact: { hunger: 10, energy: -12, health: -8, happiness: -2 },
        feedback: 'Queda de energia após pico de insulina e nenhum aporte mineral para a volemia.',
        scientificFact: 'A anemia ferropriva na gravidez está associada a fadiga materna severa, parto prematuro e baixo peso ao nascer.'
      }
    ]
  },
  12: {
    week: 12,
    title: 'DHA / Ômega-3 & Formação da Retina e Cérebro',
    description: 'Final do 1º trimestre: os hemisférios cerebrais fetais e as conexões ópticas expandem-se rapidamente.',
    options: [
      {
        id: 'food_12_positive',
        label: 'Sardinha assada com azeite extravirgem, sementes de linhaça e batata-doce',
        description: 'Ácido docosa-hexaenoico (DHA) e baixo teor de mercúrio.',
        impact: { hunger: 35, energy: 25, health: 10, happiness: 12 },
        feedback: 'Excelente! A sardinha é riquíssima em DHA, fósforo e cálcio, com baixíssimo teor de mercúrio.',
        scientificFact: 'O DHA é o principal ácido graxo estrutural do cérebro e da retina fetal. Peixes pequenos como sardinha são mais seguros que peixes predadores grandes.'
      },
      {
        id: 'food_12_neutral',
        label: 'Mix de castanhas e nozes com iogurte natural',
        description: 'Fonte vegetal de ALA (precursor de ômega-3).',
        impact: { hunger: 24, energy: 15, health: 5, happiness: 8 },
        feedback: 'Lanche saudável rico em gorduras boas e magnésio.',
        scientificFact: 'Oleaginosas fornecem ácido alfa-linolênico (ALA), vitamina E e selênio, importantes protetores celulares.'
      },
      {
        id: 'food_12_negative',
        label: 'Peixe-espada ou cação grelhado em excesso',
        description: 'Grandes peixes com acúmulo de metilmercúrio.',
        impact: { hunger: 20, energy: 5, health: -10, happiness: -2 },
        feedback: 'Atenção com peixes de topo de cadeia: acumulam metais pesados tóxicos para o neurodesenvolvimento.',
        scientificFact: 'Peixes como cação, peixe-espada e cavala contêm altos níveis de metilmercúrio que ultrapassam a barreira placentária.'
      }
    ]
  },
  14: {
    week: 14,
    title: 'Cálcio & Mineralização Óssea Fetal',
    description: 'No início do 2º trimestre, o esqueleto cartilaginoso do bebê começa a se ossificar gradativamente.',
    options: [
      {
        id: 'food_14_positive',
        label: 'Iogurte com gergelim preto torrado, queijo branco e brócolis',
        description: 'Cálcio biodisponível e cofatores minerais.',
        impact: { hunger: 30, energy: 20, health: 8, happiness: 10 },
        feedback: 'Ótima absorção de cálcio para a formação dos 300 ossinhos do bebê!',
        scientificFact: 'A gestante necessita de cerca de 1.000 mg de cálcio/dia. Na falta alimentar, o organismo mobiliza cálcio dos ossos maternos.'
      },
      {
        id: 'food_14_neutral',
        label: 'Copo de leite simples com torrada integral',
        description: 'Fonte prática de cálcio alimentar.',
        impact: { hunger: 22, energy: 12, health: 4, happiness: 5 },
        feedback: 'Boa fonte de cálcio rápida.',
        scientificFact: 'A vitamina D obtida através de banhos de sol seguros é essencial para a fixação do cálcio no organismo materno-fetal.'
      },
      {
        id: 'food_14_negative',
        label: 'Consumo excessivo de refrigerantes e salgadinhos ultraprocessados',
        description: 'Ácido fosfórico e sódio que aumentam excreção urinária de cálcio.',
        impact: { hunger: 12, energy: -8, health: -6, happiness: 0 },
        feedback: 'Refrigerantes à base de cola contêm ácido fosfórico, que prejudica a absorção do cálcio.',
        scientificFact: 'O excesso de fósforo e sódio acelera a perda de cálcio pelos rins, favorecendo cãibras musculares na gestante.'
      }
    ]
  },
  16: {
    week: 16,
    title: 'Magnésio, Fibras & Alívio de Cãibras',
    description: 'O útero cresce rapidamente e os músculos das pernas começam a suportar maior sobrecarga.',
    options: [
      {
        id: 'food_16_positive',
        label: 'Banana com sementes de abóbora, aveia e cacau 70%',
        description: 'Rico em magnésio, potássio, triptofano e flavonoides.',
        impact: { hunger: 28, energy: 22, health: 8, happiness: 15 },
        feedback: 'Delicioso e relaxante! O magnésio previne contrações precoces e cãibras noturnas.',
        scientificFact: 'O magnésio atua como relaxante da musculatura lisa uterina e esquelética, além de regular a pressão arterial materna.'
      },
      {
        id: 'food_16_neutral',
        label: 'Fruta fresca da estação (maçã ou pera)',
        description: 'Fibras e hidratação leve.',
        impact: { hunger: 18, energy: 10, health: 3, happiness: 6 },
        feedback: 'Boa opção para a digestão diária.',
        scientificFact: 'Fibras insolúveis combatem a constipação intestinal, comum pela redução do peristaltismo causada pela progesterona.'
      },
      {
        id: 'food_16_negative',
        label: 'Alimentos altamente açucarados e doces refinados em jejum',
        description: 'Picos de hiperglicemia e glicação.',
        impact: { hunger: 12, energy: -10, health: -6, happiness: 2 },
        feedback: 'Pico e queda súbita de energia, aumentando a sonolência e irritabilidade.',
        scientificFact: 'A instabilidade glicêmica agrava oscilações de humor e aumenta o risco de ganho de peso excessivo gestacional.'
      }
    ]
  },
  20: {
    week: 20,
    title: 'Equilíbrio Glicêmico & Teste de Tolerância à Glicose',
    description: 'Na metade da gestação, o lactogênio placentário aumenta a resistência insulínica fisiológica.',
    options: [
      {
        id: 'food_20_positive',
        label: 'Prato colorido com vegetais variados, arroz integral, lentilha e peito de frango grelhado',
        description: 'Baixo índice glicêmico e alta densidade de micronutrientes.',
        impact: { hunger: 35, energy: 25, health: 10, happiness: 10 },
        feedback: 'Glicemia sob controle perfeito e energia sustentada para a mãe e o bebê!',
        scientificFact: 'Entre as semanas 24 e 28 realiza-se o TOTG (curva glicêmica). Alimentos de baixo índice glicêmico previnem diabetes gestacional.'
      },
      {
        id: 'food_20_neutral',
        label: 'Macarronada com molho de tomate caseiro',
        description: 'Carboidratos tradicionais bem tolerados.',
        impact: { hunger: 25, energy: 12, health: 3, happiness: 7 },
        feedback: 'Refeição reconfortante; combinar com salada ajuda a diminuir o índice glicêmico.',
        scientificFact: 'Adicionar azeite e folhas verdes à massa reduz a velocidade de absorção da glicose.'
      },
      {
        id: 'food_20_negative',
        label: 'Bolos confeitados, refrigerantes e doces em grandes quantidades',
        description: 'Excesso de açúcares simples.',
        impact: { hunger: 15, energy: -12, health: -10, happiness: 4 },
        feedback: 'Sobrecarga no pâncreas materno e risco de macrossomia fetal.',
        scientificFact: 'O diabetes gestacional não controlado pode levar ao crescimento fetal excessivo (macrossomia) e hipoglicemia neonatal.'
      }
    ]
  },
  28: {
    week: 28,
    title: 'Refeições Fracionadas & Combate ao Refluxo',
    description: 'No 3º trimestre, o fundo do útero comprime o estômago contra o diafragma, facilitando azia e refluxo.',
    options: [
      {
        id: 'food_28_positive',
        label: 'Pequena porção de sopa de legumes com mandioquinha e frango desfiado (sem pimenta)',
        description: 'Digestão fácil e alta hidratação sem distender a cavidade gástrica.',
        impact: { hunger: 28, energy: 20, health: 8, happiness: 12 },
        feedback: 'Digestão suave sem sensação de queimação no esôfago!',
        scientificFact: 'Comer volumes menores mais vezes ao dia e não deitar logo após comer (esperar 2h) previne a azia sem necessidade de medicamentos.'
      },
      {
        id: 'food_28_neutral',
        label: 'Prato normal com porção moderada',
        description: 'Refeição padrão sem condimentos fortes.',
        impact: { hunger: 25, energy: 14, health: 4, happiness: 6 },
        feedback: 'Saciou bem, com leve sensação de plenitude gástrica.',
        scientificFact: 'Evitar líquidos durante a própria refeição previne o excesso de volume no estômago gravídico.'
      },
      {
        id: 'food_28_negative',
        label: 'Refeição volumosa muito condimentada com pimentas e molho ácido antes de deitar',
        description: 'Gatilho clássico de refluxo gastroesofágico severo.',
        impact: { hunger: 20, energy: -15, health: -12, happiness: -8 },
        feedback: 'Azia intensa e desconforto esofágico que prejudicam o descanso!',
        scientificFact: 'Pimentas, cítricos em excesso, chocolate e café relaxam o esfíncter esofágico inferior, facilitando o refluxo ácido.'
      }
    ]
  },
  36: {
    week: 36,
    title: 'Energia Pré-Parto & Nutrientes para o Colostro',
    description: 'As mamas já produzem colostro e o corpo acumula reservas energéticas para o trabalho de parto.',
    options: [
      {
        id: 'food_36_positive',
        label: 'Tâmara com pasta de amendoim, aveia e água de coco natural',
        description: 'Frutas secas com fibras, energia rápida e micronutrientes uterotônicos.',
        impact: { hunger: 32, energy: 28, health: 10, happiness: 14 },
        feedback: 'Excelente aporte de energia sustentável e preparo do corpo para o nascimento!',
        scientificFact: 'Estudos clínicos indicam que o consumo de 6 tâmaras/dia nas últimas semanas pode favorecer a dilatação e maturação cervical espontânea.'
      },
      {
        id: 'food_36_neutral',
        label: 'Frutas picadas com granola tradicional',
        description: 'Lanche saudável e prático.',
        impact: { hunger: 22, energy: 15, health: 4, happiness: 7 },
        feedback: 'Energia revigorante para a reta final.',
        scientificFact: 'O colostro é riquíssimo em imunoglobulina A secretória (IgA-s), o primeiro escudo imunológico do recém-nascido.'
      },
      {
        id: 'food_36_negative',
        label: 'Dieta restritiva drástica com medo do ganho de peso final',
        description: 'Privação nutricional em momento de alta demanda biológica.',
        impact: { hunger: -5, energy: -20, health: -15, happiness: -15 },
        feedback: 'Perigoso! O trabalho de parto consome milhares de calorias e requer reservas energéticas maternas plenas.',
        scientificFact: 'Dietas restritivas no final da gestação causam fadiga materna severa e diminuem a resistência física durante as contrações de parto.'
      }
    ]
  }
};

export const WEEKLY_DRINK_EVENTS: Record<number, WeeklyFocus> = {
  2: {
    week: 2,
    title: 'Hidratação Plasmática & Renovação Amniótica',
    description: 'A água é o meio onde todas as trocas bioquímicas entre mãe e concepto ocorrem.',
    options: [
      {
        id: 'drink_2_positive',
        label: 'Água fresca filtrada com rodelas de limão e hortelã (garrafinha sempre por perto)',
        description: 'Hidratação contínua e refrescante.',
        impact: { thirst: 35, energy: 15, health: 8, happiness: 10 },
        feedback: 'Corpo hidratado, circulação otimizada e rins trabalhando com fluidez!',
        scientificFact: 'A gestante deve consumir cerca de 2,3 a 3 litros de líquidos por dia para manter o volume sanguíneo e o líquido amniótico.'
      },
      {
        id: 'drink_2_neutral',
        label: 'Água mineral simples quando a sede apertar',
        description: 'Reposição pontual.',
        impact: { thirst: 25, energy: 8, health: 3, happiness: 4 },
        feedback: 'Aliviou a sede; ideal é beber antes mesmo de sentir a boca seca.',
        scientificFact: 'A sensação de sede já é um sinal precoce de desidratação celular inicial.'
      },
      {
        id: 'drink_2_negative',
        label: 'Refrigerante açucarado e chá preto muito concentrado',
        description: 'Açúcar em excesso e cafeína estimulante.',
        impact: { thirst: 10, energy: -5, health: -6, happiness: 2 },
        feedback: 'Açúcar não hidrata com eficiência e aumenta a carga osmótica renal.',
        scientificFact: 'Bebidas com alto teor de açúcar podem piorar a retenção hídrica e a sobrecarga de glicose.'
      }
    ]
  },
  6: {
    week: 6,
    title: 'Limite Seguro de Cafeína & Vasoconstrição Placentária',
    description: 'A cafeína atravessa livremente a barreira placentária, e o fígado fetal imaturo não consegue metabolizá-la com facilidade.',
    options: [
      {
        id: 'drink_6_positive',
        label: 'Chá de camomila suave ou água saborizada com frutas vermelhas',
        description: 'Livre de estimulantes e naturalmente calmante.',
        impact: { thirst: 30, energy: 15, health: 8, happiness: 12 },
        feedback: 'Pausa deliciosa e 100% segura para o coraçãozinho fetal!',
        scientificFact: 'Organizações mundiais (OMS e FEBRASGO) recomendam limitar a cafeína a no máximo 200 mg/dia (aprox. 1 xícara pequena de café coado).'
      },
      {
        id: 'drink_6_neutral',
        label: '1 xícara pequena de café com bastante leite após o café da manhã',
        description: 'Dose moderada dentro da faixa recomendada.',
        impact: { thirst: 20, energy: 18, health: 2, happiness: 8 },
        feedback: 'Consumo dentro do limite seguro diário.',
        scientificFact: 'Doses moderadas (<200mg) são toleradas, mas o excesso está associado a restrição de crescimento intrauterino e taquicardia fetal.'
      },
      {
        id: 'drink_6_negative',
        label: '3 cafés expressos duplos + energético para combater a fadiga',
        description: 'Altíssima dose de estimulantes e taurina.',
        impact: { thirst: 5, energy: 5, health: -15, happiness: -10 },
        feedback: 'Alerta! Palpitações maternas, ansiedade e vasoconstrição dos vasos umbilicais.',
        scientificFact: 'Energéticos são contraindicados na gravidez por combinarem doses perigosas de cafeína, taurina e outras substâncias não testadas.'
      }
    ]
  },
  12: {
    week: 12,
    title: 'Água de Coco & Reposição de Eletrólitos Naturais',
    description: 'A água de coco fornece potássio, magnésio e sódio em proporção isotônica natural.',
    options: [
      {
        id: 'drink_12_positive',
        label: 'Água de coco verde gelada e água mineral',
        description: 'Isotônico natural sem aditivos químicos.',
        impact: { thirst: 38, energy: 20, health: 10, happiness: 12 },
        feedback: 'Hidratação profunda! Repôs eletrólitos e aliviou qualquer sensação de moleza.',
        scientificFact: 'A água de coco contém eletrólitos que ajudam na manutenção da volemia materna e no equilíbrio osmótico do líquido amniótico.'
      },
      {
        id: 'drink_12_neutral',
        label: 'Suco de maracujá diluído com pouquíssimo açúcar',
        description: 'Refrescante e calmante.',
        impact: { thirst: 28, energy: 12, health: 4, happiness: 8 },
        feedback: 'Saboroso e relaxante para o final de tarde.',
        scientificFact: 'Sucos naturais de frutas fornecem vitaminas, mas devem ser consumidos sem adição exagerada de açúcar refinado.'
      },
      {
        id: 'drink_12_negative',
        label: 'Chás fitoterápicos caseiros de ervas desconhecidas (canela forte, boldo, hibisco)',
        description: 'Plantas com propriedades emenagogas ou abortivas comprovadas.',
        impact: { thirst: 10, energy: -10, health: -20, happiness: -15 },
        feedback: 'Perigo grave! Diversas ervas medicinais estimulam contrações uterinas.',
        scientificFact: 'Chás de canela concentrada, boldo, hibisco e carqueja são contraindicados na gravidez devido ao potencial emenagogo e toxicidade hepática fetal.'
      }
    ]
  },
  24: {
    week: 24,
    title: 'Prevenção de Infecções Urinárias (ITU) pela Água',
    description: 'Na gestação, a dilatação dos ureteres pela progesterona predispõe à estase urinária e bactérias.',
    options: [
      {
        id: 'drink_24_positive',
        label: 'Copos regulares de água ao longo do dia + suco de cranberry/mirtilo puro',
        description: 'Lavagem contínua do trato urinário e antiadesão bacteriana.',
        impact: { thirst: 35, energy: 18, health: 10, happiness: 10 },
        feedback: 'Urina clarinha e rins desobstruídos! A hidratação frequente é a melhor prevenção de ITU.',
        scientificFact: 'A infecção do trato urinário assintomática é uma das principais causas tratáveis de trabalho de parto prematuro.'
      },
      {
        id: 'drink_24_neutral',
        label: 'Água com gás e umas gotas de limão',
        description: 'Alternativa gaseificada refrescante.',
        impact: { thirst: 25, energy: 10, health: 4, happiness: 6 },
        feedback: 'Boa opção para variar a rotina hídrica.',
        scientificFact: 'A água gaseificada hidrata tanto quanto a sem gás, embora em algumas gestantes possa aumentar a sensação de estufamento.'
      },
      {
        id: 'drink_24_negative',
        label: 'Prender a urina e evitar beber água para não ter que ir ao banheiro com frequência',
        description: 'Estase urinária e proliferação bacteriana.',
        impact: { thirst: -10, energy: -12, health: -18, happiness: -12 },
        feedback: 'Muito perigoso! Risco alto de cistite e pielonefrite.',
        scientificFact: 'A bexiga deve ser esvaziada completamente e com frequência para evitar a colonização por bactérias como Escherichia coli.'
      }
    ]
  },
  34: {
    week: 34,
    title: 'Líquido Amniótico & Circulação nos Dias Quentes',
    description: 'No final da gestação, o feto urina e deglute cerca de 500 a 700 ml de líquido amniótico por dia.',
    options: [
      {
        id: 'drink_34_positive',
        label: 'Água gelada com fatias de pepino, hortelã e água de coco ao longo de todo o dia',
        description: 'Hidratação contínua e auxílio na redução de inchaços nos tornozelos.',
        impact: { thirst: 40, energy: 22, health: 10, happiness: 12 },
        feedback: 'Renovação do líquido amniótico e alívio do calor gestacional!',
        scientificFact: 'O volume do líquido amniótico é renovado constantemente a cada poucas horas graças ao aporte hídrico materno adequado.'
      },
      {
        id: 'drink_34_neutral',
        label: 'Garrafinha de água mineral na bolsa para goles frequentes',
        description: 'Prática e constante.',
        impact: { thirst: 28, energy: 12, health: 5, happiness: 6 },
        feedback: 'Mantendo o equilíbrio hidroelétrolítico.',
        scientificFact: 'A desidratação materna no 3º trimestre pode desencadear contrações uterinas de Braxton Hicks mais dolorosas.'
      },
      {
        id: 'drink_34_negative',
        label: 'Consumo de bebidas alcoólicas ("apenas um brinde")',
        description: 'Nenhum nível de álcool é considerado seguro na gestação.',
        impact: { thirst: -15, energy: -25, health: -30, happiness: -20 },
        feedback: 'ALERTA MÁXIMO! O álcool atravessa a placenta integralmente.',
        scientificFact: 'A Síndrome Alcoólica Fetal (SAF) causa anomalias faciais, microcefalia e deficiência intelectual irreversível. Tolerância zero para álcool.'
      }
    ]
  }
};

export const WEEKLY_SLEEP_EVENTS: Record<number, WeeklyFocus> = {
  16: {
    week: 16,
    title: 'Posição de Sono: O Decúbito Lateral Esquerdo',
    description: 'Com o útero mais pesado, a posição ao dormir afeta diretamente o fluxo sanguíneo da veia cava inferior.',
    options: [
      {
        id: 'sleep_16_positive',
        label: 'Dormir virada para o lado esquerdo com travesseiro entre as pernas',
        description: 'Descomprime a veia cava e a aorta materna.',
        impact: { sleep: 40, energy: 25, health: 10, happiness: 12 },
        feedback: 'Sono profundo e oxigenação placentária máxima durante toda a noite!',
        scientificFact: 'Dormir sobre o lado esquerdo (DLE) otimiza o fluxo de sangue e oxigênio para a placenta e alivia a pressão nos rins maternos.'
      },
      {
        id: 'sleep_16_neutral',
        label: 'Dormir sobre o lado direito com apoio nas costas',
        description: 'Alternativa aceitável para variar de posição.',
        impact: { sleep: 30, energy: 18, health: 5, happiness: 8 },
        feedback: 'Boa noite de descanso, aliviando a coluna.',
        scientificFact: 'Se houver desconforto do lado esquerdo, o lado direito também é seguro; o importante é evitar ficar deitada de costas por longos períodos.'
      },
      {
        id: 'sleep_16_negative',
        label: 'Dormir de barriga para cima (decúbito dorsal plano)',
        description: 'Síndrome da hipotensão supina e compressão vascular.',
        impact: { sleep: 15, energy: -10, health: -12, happiness: -8 },
        feedback: 'Acordou com tonturas, palpitação e falta de ar devido à compressão da veia cava.',
        scientificFact: 'O peso do útero sobre a veia cava em decúbito dorsal reduz o retorno venoso ao coração materno, provocando hipotensão e hipóxia fetal relativa.'
      }
    ]
  },
  28: {
    week: 28,
    title: 'Higiene do Sono & Combate à Insônia do 3º Trimestre',
    description: 'Os chutes noturnos do bebê e a ansiedade podem dificultar o início do sono.',
    options: [
      {
        id: 'sleep_28_positive',
        label: 'Banho morno, quarto escuro/fresco, sem telas eletrônicas e leitura relaxante',
        description: 'Indução natural da melatonina e desaceleração do sistema nervoso.',
        impact: { sleep: 42, energy: 26, health: 10, happiness: 15 },
        feedback: 'Relaxamento muscular total e noite regeneradora!',
        scientificFact: 'A luz azul de celulares e tablets bloqueia a síntese de melatonina no cérebro, prejudicando os ciclos de sono REM e profundo.'
      },
      {
        id: 'sleep_28_neutral',
        label: 'Ouvir sons da natureza ou ruído branco na cama',
        description: 'Estímulo auditivo relaxante.',
        impact: { sleep: 32, energy: 18, health: 5, happiness: 10 },
        feedback: 'Acalmou os pensamentos e facilitou o adormecer.',
        scientificFact: 'Sons suaves desaceleram as ondas cerebrais para o ritmo alfa e teta, facilitando a transição para o sono reparador.'
      },
      {
        id: 'sleep_28_negative',
        label: 'Ficar até tarde rolando feed de redes sociais com a tela colada nos olhos',
        description: 'Estimulação dopaminérgica e hiperalerta cerebral.',
        impact: { sleep: 10, energy: -15, health: -8, happiness: -10 },
        feedback: 'Sono fragmentado e sensação de exaustão na manhã seguinte.',
        scientificFact: 'A privação crônica de sono na gravidez está associada a elevação de cortisol e aumento da percepção de dor durante o trabalho de parto.'
      }
    ]
  }
};

export const WEEKLY_HYGIENE_EVENTS: Record<number, WeeklyFocus> = {
  8: {
    week: 8,
    title: 'Saúde Bucal, Gengivite Gravídica & Parto Prematuro',
    description: 'O aumento da progesterona aumenta a vascularização gengival, tornando-a mais propensa a inflamações.',
    options: [
      {
        id: 'hygiene_8_positive',
        label: 'Escovação cuidadosa, fio dental diário e enxágue suave (com consulta ao dentista agendada)',
        description: 'Prevenção de periodontite e biofilme bacteriano.',
        impact: { hygiene: 35, happiness: 10, health: 10, energy: 5 },
        feedback: 'Boca saudável e gengivas protegidas! O pré-natal odontológico é fundamental.',
        scientificFact: 'Bactérias da doença periodontal podem cair na corrente sanguínea e atingir a placenta, aumentando o risco de parto prematuro e pré-eclâmpsia.'
      },
      {
        id: 'hygiene_8_neutral',
        label: 'Escovação rápida matinal apenas',
        description: 'Higiene básica essencial.',
        impact: { hygiene: 20, happiness: 5, health: 3, energy: 0 },
        feedback: 'Higiene razoável, mas o uso de fio dental não pode ser esquecido.',
        scientificFact: 'O fio dental remove bactérias interdentais inacessíveis à escova convencional, prevenindo sangramento gengival.'
      },
      {
        id: 'hygiene_8_negative',
        label: 'Deixar de escovar por causa de ânsia provocada pela pasta de dente',
        description: 'Acúmulo de placa e desmineralização dental pelos ácidos estomacais.',
        impact: { hygiene: -10, happiness: -8, health: -10, energy: -5 },
        feedback: 'Gengivas inflamadas e risco de cáries aceleradas pelo refluxo gástrico.',
        scientificFact: 'Se a pasta de dente der ânsia, use escova apenas com água ou pasta sem sabor, mas nunca abandone a limpeza mecânica diária.'
      }
    ]
  },
  20: {
    week: 20,
    title: 'Hidratação Cutânea & Cuidados com o Assoalho Pélvico',
    description: 'A pele do abdômen e das mamas estica progressivamente.',
    options: [
      {
        id: 'hygiene_20_positive',
        label: 'Banho morno com sabonete neutro + hidratação com óleo vegetal e massagem suave no abdômen',
        description: 'Melhora da elasticidade dérmica e momento de conexão com o bebê.',
        impact: { hygiene: 35, happiness: 15, health: 8, energy: 10 },
        feedback: 'Pele hidratada, sensação de conforto e alívio do prurido abdominal!',
        scientificFact: 'Banhos excessivamente quentes desidratam a pele e podem causar vasodilatação súbita com queda de pressão arterial.'
      },
      {
        id: 'hygiene_20_neutral',
        label: 'Banho comum com sabonete regular',
        description: 'Higiene corporal padrão.',
        impact: { hygiene: 25, happiness: 8, health: 4, energy: 5 },
        feedback: 'Corpo limpo e renovado para o dia.',
        scientificFact: 'Evite duchas vaginais internas; a flora vaginal possui lactobacilos protetores essenciais para prevenir infecções ascendentes.'
      },
      {
        id: 'hygiene_20_negative',
        label: 'Banho em água fervendo de banheira ou sauna prolongada',
        description: 'Hipertermia materna de risco.',
        impact: { hygiene: 10, happiness: -5, health: -15, energy: -15 },
        feedback: 'Sensação de fraqueza extrema e tontura pela vasodilatação excessiva.',
        scientificFact: 'Saunas e banheiras muito quentes (>39°C) aumentam a temperatura corporal central materna, associando-se a risco de anomalias no desenvolvimento.'
      }
    ]
  }
};

export const WEEKLY_RELAX_EVENTS: Record<number, WeeklyFocus> = {
  12: {
    week: 12,
    title: 'Vínculo Pré-Natal, Respiração & Redução de Cortisol',
    description: 'O estresse crônico materno eleva hormônios como cortisol e adrenalina, que cruzam a barreira placentária.',
    options: [
      {
        id: 'relax_12_positive',
        label: '15 minutos de meditação guiada, respiração diafragmática e mãos na barriga conversando com o bebê',
        description: 'Estímulo do sistema parassimpático e liberação de ocitocina.',
        impact: { happiness: 35, energy: 20, health: 10, sleep: 15 },
        feedback: 'Calmaria profunda! O batimento cardíaco materno desacelera e tranquiliza o bebê.',
        scientificFact: 'Práticas de mindfulness reduzem os níveis circulantes de cortisol materno, promovendo melhor vascularização uterina e bem-estar fetal.'
      },
      {
        id: 'relax_12_neutral',
        label: 'Ouvir uma playlist de músicas tranquilas deitada no sofá',
        description: 'Momento de lazer e descanso passivo.',
        impact: { happiness: 22, energy: 12, health: 5, sleep: 8 },
        feedback: 'Mente mais leve após um momento agradável.',
        scientificFact: 'Ouvir música agradável libera dopamina e endorfinas, aliviando tensões musculares.'
      },
      {
        id: 'relax_12_negative',
        label: 'Ler relatos de parto traumáticos e notícias alarmistas na internet sem filtro',
        description: 'Gatilho de ansiedade aguda e hiperalerta.',
        impact: { happiness: -20, energy: -15, health: -10, sleep: -15 },
        feedback: 'Pico de ansiedade, aperto no peito e preocupações desnecessárias.',
        scientificFact: 'A busca compulsiva por relatos negativos na internet aumenta o medo irracional do parto (tocofobia) e piora a qualidade de vida gestacional.'
      }
    ]
  },
  32: {
    week: 32,
    title: 'Plano de Parto & Fortalecimento da Rede de Apoio',
    description: 'Aproximando-se do termo, organizar as preferências de parto traz segurança e protagonismo à gestante.',
    options: [
      {
        id: 'relax_32_positive',
        label: 'Elaborar o Plano de Parto com a equipe de saúde e alinhar o suporte com o parceiro/família',
        description: 'Informação baseada em evidências científicas e autonomia.',
        impact: { happiness: 38, energy: 15, health: 10, sleep: 15 },
        feedback: 'Sensação de empoderamento e tranquilidade! Seus direitos e preferências estão claros.',
        scientificFact: 'Gestantes com plano de parto estruturado e apoio contínuo relatam menor taxa de intervenções desnecessárias e maior satisfação com a experiência.'
      },
      {
        id: 'relax_32_neutral',
        label: 'Conversar informalmente com uma amiga que já teve bebê',
        description: 'Troca de experiências afetuosa.',
        impact: { happiness: 25, energy: 10, health: 4, sleep: 6 },
        feedback: 'Bom acolhimento emocional com quem compreende as vivências da maternidade.',
        scientificFact: 'O suporte emocional entre pares é um fator protetor crucial contra a ansiedade perinatal.'
      },
      {
        id: 'relax_32_negative',
        label: 'Assumir todas as tarefas domésticas e profissionais sozinha sem pedir ajuda',
        description: 'Sobrecarga física e emocional extrema.',
        impact: { happiness: -15, energy: -25, health: -15, sleep: -12 },
        feedback: 'Exaustão acumulada! A gestante precisa de acolhimento e divisão de responsabilidades.',
        scientificFact: 'O esgotamento materno no final da gravidez eleva a percepção de fadiga e dificulta a recuperação pós-parto.'
      }
    ]
  }
};

export const WEEKLY_WALK_EVENTS: Record<number, WeeklyFocus> = {
  14: {
    week: 14,
    title: 'Atividade Física Aeróbica & Fortalecimento Pélvico (Kegel)',
    description: 'Praticar exercícios seguros na gestação previne pré-eclâmpsia, diabetes gestacional e lombalgias.',
    options: [
      {
        id: 'walk_14_positive',
        label: 'Caminhada leve ao ar livre (30 min) + exercícios de contração do assoalho pélvico (Kegel)',
        description: 'Capacidade cardiorrespiratória e tônus perineal.',
        impact: { energy: 25, health: 12, happiness: 18, hunger: 10 },
        feedback: 'Sensação maravilhosa de vigor físico! Circulação das pernas ativada e músculos pélvicos treinados.',
        scientificFact: 'Exercícios de fortalecimento do assoalho pélvico (Kegel) reduzem em mais de 50% o risco de incontinência urinária na gestação e puerpério.'
      },
      {
        id: 'walk_14_neutral',
        label: 'Alongamento suave em casa no tapete de yoga',
        description: 'Alívio de tensões articulares.',
        impact: { energy: 15, health: 6, happiness: 10, hunger: 5 },
        feedback: 'Coluna lombar relaxada e respiração ampla.',
        scientificFact: 'Alongamentos suaves aliviam a pressão do ligamento redondo do útero e diminuem a dor no quadril.'
      },
      {
        id: 'walk_14_negative',
        label: 'Exercício de altíssimo impacto com saltos ou manobra de Valsalva (prender a respiração)',
        description: 'Sobrecarga articular excessiva e aumento perigoso da pressão intra-abdominal.',
        impact: { energy: -20, health: -18, happiness: -10, hunger: 15 },
        feedback: 'Dores nas articulações (afetadas pela relaxina) e falta de ar!',
        scientificFact: 'O hormônio relaxina afrouxa os ligamentos articulares para o parto; exercícios com saltos e paradas bruscas aumentam muito o risco de entorses e quedas.'
      }
    ]
  },
  26: {
    week: 26,
    title: 'Mobilidade Pélvica & Bola Suíça (Pilates Gestacional)',
    description: 'Movimentos circulares na pelve ajudam a aliviar a compressão do nervo ciático e preparam o quadril.',
    options: [
      {
        id: 'walk_26_positive',
        label: 'Exercícios de mobilidade pélvica na bola suíça (movimentos em "8" e círculos)',
        description: 'Abertura dos diâmetros pélvicos e relaxamento da musculatura sacroilíaca.',
        impact: { energy: 22, health: 10, happiness: 15, sleep: 12 },
        feedback: 'Alívio instantâneo do peso nas costas e na bacia!',
        scientificFact: 'A mobilidade na bola suíça melhora o encaixe fetal e estimula a circulação da região lombossacral sem impacto articular.'
      },
      {
        id: 'walk_26_neutral',
        label: 'Passeio a passos tranquilos no parque',
        description: 'Banho de luz natural e caminhada agradável.',
        impact: { energy: 16, health: 6, happiness: 10, sleep: 8 },
        feedback: 'Bom contato com a natureza e respiração ao ar livre.',
        scientificFact: 'A exposição matinal à luz solar auxilia na síntese de vitamina D e sincroniza o ciclo biológico de sono/vigília.'
      },
      {
        id: 'walk_26_negative',
        label: 'Sedentarismo total permanecendo horas na mesma posição sentada com pernas cruzadas',
        description: 'Estase venosa e compressão das veias poplíteas.',
        impact: { energy: -15, health: -10, happiness: -8, sleep: -5 },
        feedback: 'Tornozelos inchados, sensação de peso nas pernas e dor lombar.',
        scientificFact: 'Ficar sentada por longos períodos sem pausas aumenta a estase venosa e eleva o risco de trombose venosa profunda (TVP).'
      }
    ]
  }
};
