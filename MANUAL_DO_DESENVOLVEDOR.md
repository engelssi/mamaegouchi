# 💻 Manual do Desenvolvedor — MamãeGotchi

> **Simulador Educacional e Interativo de Gestação e Puerpério**  
> **Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL)**  
> **Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação (PIBITI / PROPEP)**  
> *Edital nº 01/2026 — Apoio: CNPq e FAPEAL*

---

## 📑 Sumário

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Stack Tecnológico & Dependências](#2-stack-tecnológico--dependências)
3. [Estrutura de Diretórios & Responsabilidades](#3-estrutura-de-diretórios--responsabilidades)
4. [Modelagem de Dados & Tipos TypeScript (`src/types.ts`)](#4-modelagem-de-dados--tipos-typescript-srctypests)
5. [Motores de Simulação & Ciclo de Vida (`src/App.tsx`)](#5-motores-de-simulação--ciclo-de-vida-srcapptsx)
   - [Motor de Decaimento Natural (`decayTimer`)](#motor-de-decaimento-natural-decaytimer)
   - [Motor de Avanço Temporal (`timeTimer`)](#motor-de-avanço-temporal-timetimer)
   - [Cálculo do Indicador de Saúde Geral](#cálculo-do-indicador-de-saúde-geral)
   - [Persistência de Estado Local (`storage.ts`)](#persistência-de-estado-local-storagets)
6. [Sistema de Eventos Clínicos & Tomada de Decisão](#6-sistema-de-eventos-clínicos--tomada-de-decisão)
   - [Geração Dinâmica de Eventos (`eventGenerators.ts`)](#geração-dinâmica-de-eventos-eventgeneratorsts)
   - [Eventos Gestacionais (`pregnancyEvents.ts`)](#eventos-gestacionais-pregnancyeventsts)
   - [Eventos Puerperais (`postpartumEvents.ts`)](#eventos-puerperais-postpartumeventsts)
   - [Passo a Passo: Como Adicionar um Novo Evento Clínico](#passo-a-passo-como-adicionar-um-novo-evento-clínico)
7. [Calculadora Obstétrica & Regra de Naegele (`src/utils/gestationalCalculator.ts`)](#7-calculadora-obstétrica--regra-de-naegele-srcutilsgestationalcalculatorts)
8. [Motor de Som Procedural via Web Audio API (`src/utils/sound.ts`)](#8-motor-de-som-procedural-via-web-audio-api-srcutilssoundts)
9. [Acessibilidade Digital, TTS & Filtros SVG](#9-acessibilidade-digital-tts--filtros-svg)
   - [Síntese de Voz (TTS) com Web Speech API (`tts.ts`)](#síntese-de-voz-tts-com-web-speech-api-ttsts)
   - [Filtros de Daltonismo Matriciais SVG (`AccessibilityFilters.tsx`)](#filtros-de-daltonismo-matriciais-svg-accessibilityfilterstsx)
10. [Design System, Tailwind CSS v4 & Responsividade](#10-design-system-tailwind-css-v4--responsividade)
11. [Instalação, Execução & Comandos do Projeto](#11-instalação-execução--comandos-do-projeto)
12. [Hospedagem & Infraestrutura para a UNCISAL](#12-hospedagem--infraestrutura-para-a-uncisal)
13. [Diretrizes de Contribuição & Roteiro de Extensões](#13-diretrizes-de-contribuição--roteiro-de-extensões)

---

## 1. Visão Geral da Arquitetura

O **MamãeGotchi** é construído como uma aplicação web moderna do tipo **Single Page Application (SPA)**, estritamente tipada com **TypeScript 5.8** e renderizada via **React 19** e **Vite 6**.

### Diretrizes de Engenharia:
* **Zero Backend Dependency**: A simulação funciona de forma autônoma no navegador cliente (`Client-Side Only`). Não há necessidade de chamadas de rede ou APIs proprietárias pagas para que a lógica central do jogo funcione.
* **Resiliência e Determinismo**: O estado da simulação é serializado deterministicamente em `localStorage` a cada alteração relevante, permitindo retomada instantânea de sessão sem perda de dados.
* **Performance e Acessibilidade**:
  - Efeitos sonoros são sintetizados matematicamente em tempo real via **Web Audio API** (evitando o consumo de banda com downloads de arquivos `.mp3`/`.wav`).
  - Acessibilidade visual é implementada com **filtros matriciais SVG padrão W3C**, permitindo simulação fidedigna de discromatopsias (daltonismo).
  - Narração por voz nativa através da **Web Speech API** configurada para o português brasileiro (`pt-BR`).
* **Clean Code & Modularidade**: Separação clara entre camada de apresentação (`components/`), regras de negócio e cálculos obstétricos (`utils/`), e base de conhecimento científico (`constants/`).

---

## 2. Stack Tecnológico & Dependências

A aplicação utiliza as versões mais modernas do ecossistema front-end:

| Tecnologia | Versão | Função Principal |
| :--- | :--- | :--- |
| **React** | `^19.0.1` | Biblioteca de renderização declarativa e gerenciamento de componentes. |
| **TypeScript** | `~5.8.2` | Tipagem estática rigorosa para garantir segurança nos modelos clínicos. |
| **Vite** | `^6.2.3` | Bundler e servidor de desenvolvimento ultra-rápido com HMR. |
| **Tailwind CSS** | `^4.1.14` | Framework CSS utilitário de última geração para estilização atômica responsiva. |
| **Motion (`motion/react`)**| `^12.23.24` | Animações fluidas de microinterações, transições de modais e reatividade física. |
| **Lucide React** | `^0.546.0` | Conjunto consistente e semântico de ícones vetoriais em SVG. |
| **Canvas Confetti** | `^1.9.4` | Feedback comemorativo de transição de semanas e trimestres. |
| **Web Audio API** | *Nativo do Browser* | Sintetizador de ondas sonoras para efeitos lúdicos. |
| **Web Speech API** | *Nativo do Browser* | Síntese de fala para acessibilidade de usuários com deficiência visual. |

---

## 3. Estrutura de Diretórios & Responsabilidades

```
/
├── assets/                    # Ativos estáticos complementares
├── index.html                 # Ponto de entrada HTML com meta-tags e fontes
├── package.json               # Configurações de pacotes e scripts npm
├── tsconfig.json              # Configurações do compilador TypeScript
├── vite.config.ts             # Configuração do bundler Vite e plugins
├── metadata.json              # Metadados institucionais da aplicação
├── MANUAL_DO_USUARIO.md       # Manual oficial para o usuário final
├── MANUAL_DO_DESENVOLVEDOR.md  # Este manual técnico de engenharia
└── src/
    ├── main.tsx               # Ponto de entrada do React DOM
    ├── App.tsx                # Orquestrador central, loop da simulação e modais
    ├── index.css              # Importação do Tailwind CSS e regras de fontes
    ├── types.ts               # Definições completas de interfaces e tipos
    │
    ├── components/            # Componentes de interface reutilizáveis
    │   ├── AboutModal.tsx             # Modal institucional UNCISAL/PROPEP
    │   ├── AccessibilityBar.tsx       # Barra de controle de acessibilidade superior
    │   ├── AccessibilityFilters.tsx   # Filtros matriciais SVG para daltonismo
    │   ├── ActionButton.tsx           # Botão de ação com feedback e tags
    │   ├── AvatarCustomizerModal.tsx  # Modal de customização do avatar
    │   ├── BabyPanel.tsx              # Painel de desenvolvimento fetal / puerpério
    │   ├── DumSelectorModal.tsx       # Modal da calculadora obstétrica por DUM
    │   ├── EventModal.tsx             # Modal interativo de dilemas clínicos
    │   ├── GameOverModal.tsx          # Modal de encerramento da simulação
    │   ├── Header.tsx                 # Cabeçalho responsivo com modo compacto
    │   ├── MilestoneModal.tsx         # Modal comemorativo de avanço de semana
    │   ├── MotherAvatar.tsx           # Renderização vetorial SVG do avatar da mãe
    │   └── StatsBar.tsx               # Barra de progresso individual de status
    │
    ├── constants/             # Banco de dados clínico e geradores
    │   ├── pregnancyData.ts           # Marcos fetais das 40 semanas gestacionais
    │   ├── pregnancyEvents.ts         # Banco de eventos clínicos da gravidez
    │   ├── postpartumEvents.ts        # Banco de eventos do puerpério e do bebê
    │   └── eventGenerators.ts         # Fábrica de eventos contextuais dinâmicos
    │
    └── utils/                 # Utilitários e serviços de infraestrutura
        ├── gestationalCalculator.ts   # Algoritmo de Naegele e cálculos obstétricos
        ├── sound.ts                   # Sintetizador procedural Web Audio API
        ├── storage.ts                 # Camada de abstração e serialização do localStorage
        └── tts.ts                     # Utilitário da Web Speech API para pt-BR
```

---

## 4. Modelagem de Dados & Tipos TypeScript (`src/types.ts`)

Todos os modelos de dados da aplicação estão centralizados em `src/types.ts`. Os tipos principais são:

### 🔹 Indicadores de Status Materno (`Status`)
```typescript
export interface Status {
  hunger: number;     // Fome / Nutrição (0-100)
  thirst: number;     // Sede / Hidratação (0-100)
  sleep: number;      // Sono / Descanso (0-100)
  happiness: number;  // Felicidade / Bem-estar emocional (0-100)
  hygiene: number;    // Higiene / Autocuidado (0-100)
  energy: number;     // Energia / Disposição física (0-100)
  health: number;     // Saúde Geral (0-100, indicador agregado)
}
```

### 🔹 Indicadores de Status do Bebê no Puerpério (`BabyStatus`)
```typescript
export interface BabyStatus {
  hunger: number;     // Fome do recém-nascido (0-100)
  sleep: number;      // Sono seguro do bebê (0-100)
  hygiene: number;    // Higiene / Fralda / Coto (0-100)
  happiness: number;  // Conforto / Afeto / Acalanto (0-100)
  health: number;     // Saúde agregada do bebê (0-100)
}
```

### 🔹 Estrutura de Dilemas Clínicos & Decisões (`GameEvent` & `GameEventOption`)
```typescript
export interface GameEventOption {
  id: string;
  label: string;
  description?: string;
  impact: StatusImpact;         // Impacto diferencial nos atributos (+/-)
  feedback: string;             // Mensagem imediata exibida ao jogador
  scientificFact: string;       // Evidência do Ministério da Saúde / FEBRASGO
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: 
    | 'eat' | 'drink' | 'sleep' | 'hygiene' | 'relax' | 'walk' 
    | 'baby_feed' | 'baby_sleep' | 'baby_diaper' | 'baby_comfort';
  options: GameEventOption[];
  imageEmoji?: string;
  isEmergency?: boolean;
}
```

---

## 5. Motores de Simulação & Ciclo de Vida (`src/App.tsx`)

O arquivo `src/App.tsx` atua como o coração reativo do simulador, orquestrando dois motores baseados em intervalos temporais independentes e o cálculo de estado composto:

### Motor de Decaimento Natural (`decayTimer`)
Executado a cada `5000ms / gameSpeed`:
* Reduz os parâmetros vitais da mãe de acordo com coeficientes fisiológicos realistas:
  - `hunger`: -0.5 a cada ciclo
  - `thirst`: -0.8 a cada ciclo
  - `sleep`: -0.3 a cada ciclo
  - `happiness`: -0.3 a cada ciclo
  - `hygiene`: -0.2 a cada ciclo
  - `energy`: -0.4 a cada ciclo
* Na fase de **Puerpério (`POSTPARTUM`)**, adiciona o decaimento das necessidades do bebê:
  - `babyHunger`: -0.9 a cada ciclo (estômago pequeno exige mamadas frequentes)
  - `babySleep`: -0.7 a cada ciclo
  - `babyHygiene`: -0.5 a cada ciclo
  - `babyHappiness`: -0.6 a cada ciclo

### Motor de Avanço Temporal (`timeTimer`)
Executado a cada `15000ms / gameSpeed`:
* Incrementa o contador de dias (`day`).
* Quando `day > 7`:
  - Se na gravidez (`PREGNANCY`): avança para a próxima semana (`week + 1`). Ao ultrapassar a 40ª semana, aciona a transição para o `POSTPARTUM`.
  - Se no pós-parto (`POSTPARTUM`): avança até a semana 8. Ao completar a 8ª semana puerperal com saúde, dispara o modal de Vitória!

### Cálculo do Indicador de Saúde Geral
A função `calculateHealth(prevStatus)` computa o valor agregado de 0 a 100%:
$$\text{Média Base} = \frac{\text{fome} \times 1.2 + \text{sede} \times 1.5 + \text{sono} \times 1.3 + \text{humor} \times 1.0 + \text{higiene} \times 0.9 + \text{energia} \times 1.1}{7.0}$$
* **Penalidade Crítica**: Se qualquer atributo vital cair abaixo do limiar de segurança de **30%**, uma penalidade progressiva é deduzida da saúde final, simulando o efeito deletério da negligência de necessidades básicas.

### Persistência de Estado Local (`storage.ts`)
* A chave `mamaegotchi_state_v1` armazena o snapshot serializado em formato JSON.
* A persistência inclui versão do schema para permitir futuras migrações seguras sem corromper estados de usuários anteriores.

---

## 6. Sistema de Eventos Clínicos & Tomada de Decisão

### Geração Dinâmica de Eventos (`eventGenerators.ts`)
A função `generateEvent(category, week, phase, status, babyStatus)` avalia:
1. Se o status correspondente está abaixo de 30% (`isEmergency = true`).
2. Se existe um evento cadastrado sob medida para aquela semana específica em `pregnancyEvents.ts` ou `postpartumEvents.ts`.
3. Se não houver evento específico cadastrado, gera um evento contextual dinâmico correspondente ao trimestre e à necessidade fisiológica imediata.

### Passo a Passo: Como Adicionar um Novo Evento Clínico

Para adicionar um novo dilema sobre nutrição na Semana 12 de gestação:
1. Abra `src/constants/pregnancyEvents.ts`.
2. Localize ou insira a chave da semana no objeto `WEEKLY_FOOD_EVENTS`:

```typescript
export const WEEKLY_FOOD_EVENTS: Record<number, WeeklyFocus> = {
  // ...
  12: {
    week: 12,
    title: 'Nutrição no Fim do 1º Trimestre: Suporte ao Feto',
    description: 'A placenta assume plenamente a nutrição fetal. O que escolher para o almoço?',
    options: [
      {
        id: 'w12_opt_healthy',
        label: 'Prato rico em zinco, ferro e folhas verdes escuras',
        description: 'Feijão carioca, arroz integral, couve refogada e peixe grelhado bem passado.',
        impact: { hunger: 35, health: 8, energy: 10, thirst: -5 },
        feedback: 'Excelente escolha! O aporte de ferro previne a anemia gestacional.',
        scientificFact: 'Na 12ª semana, o volume sanguíneo materno começa a aumentar expressivamente, exigindo suporte de ferro e ácido fólico (Ministério da Saúde).'
      },
      {
        id: 'w12_opt_poor',
        label: 'Lanche frito de rua com maionese caseira crua',
        description: 'Opção rápida e calórica, mas com riscos sanitários.',
        impact: { hunger: 20, health: -8, hygiene: -10 },
        feedback: 'Cuidado! Alimentos com ovos crus apresentam alto risco de contaminação por Salmonella.',
        scientificFact: 'A FEBRASGO contraindica terminantemente o consumo de ovos e carnes malcozidas na gravidez para evitar salmonelose e toxoplasmose.'
      }
    ]
  }
};
```
3. O gerador em `eventGenerators.ts` reconhecerá automaticamente a nova entrada sem necessidade de alterar o componente de interface!

---

## 7. Calculadora Obstétrica & Regra de Naegele (`src/utils/gestationalCalculator.ts`)

A calculadora implementa os algoritmos padronizados pelo Ministério da Saúde e FEBRASGO:

### 1. Regra de Naegele para Cálculo da Data Provável do Parto (DPP):
$$\text{DPP} = \text{DUM} + 7 \text{ dias} + 9 \text{ meses (ou } + 280 \text{ dias)}$$

### 2. Cálculo da Idade Gestacional (IG):
$$\text{Dias Decorridos} = \text{Data Atual} - \text{DUM}$$
$$\text{Semanas Gestacionais} = \lfloor \text{Dias Decorridos} / 7 \rfloor$$
$$\text{Dias Restantes} = \text{Dias Decorridos} \pmod 7$$

### 3. Validações Implementadas:
* Rejeição de datas futuras com mensagens semânticas claras.
* Limite anatômico máximo de 45 semanas antes de sugerir transição puerperal.
* Enquadramento automático no trimestre correto (`1º Trimestre: 1-13`, `2º Trimestre: 14-27`, `3º Trimestre: 28-40`).

---

## 8. Motor de Som Procedural via Web Audio API (`src/utils/sound.ts`)

Para evitar carregar dezenas de arquivos de áudio pesados via HTTP, o MamãeGotchi sintetiza os efeitos sonoros proceduralmente:

```typescript
// Exemplo: Síntese de som de deglutição / hidratação
case 'drink': {
  [0, 0.07, 0.14].forEach((delay, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650 - idx * 70, now + delay);
    osc.frequency.exponentialRampToValueAtTime(900 - idx * 50, now + delay + 0.05);
    gain.gain.setValueAtTime(0.15, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + delay);
    osc.stop(now + delay + 0.06);
  });
  break;
}
```

* **Vantagens**: Execução síncrona com latência inferior a 5 milissegundos, consumo nulo de tráfego de rede e compatibilidade universal com políticas de autoplay dos navegadores através de inicialização condicional sob evento de clique.

---

## 9. Acessibilidade Digital, TTS & Filtros SVG

### Síntese de Voz (TTS) com Web Speech API (`tts.ts`)
* A função `cleanTextForSpeech(text)` limpa emojis Unicode e sintaxe Markdown antes de enviar para a API, prevenindo pronúncias confusas.
* Prioriza automaticamente vozes brasileiras (`pt-BR`).
* Permite controle granular de taxa de fala (`rate`) e cancelamento imediato de falas anteriores (`stopSpeaking`).

### Filtros de Daltonismo Matriciais SVG (`AccessibilityFilters.tsx`)
Em vez de simples filtros de escala de cinza, o componente injeta matrizes de interpolação de cores em conformidade com as pesquisas de Machado et al. para:
* **Protanopia** (cegueira ao vermelho).
* **Deuteranopia** (cegueira ao verde).
* **Tritanopia** (cegueira ao azul/amarelo).
* **Monocromático** (conversão ponderada de luminância conforme ITU-R BT.601).

---

## 10. Design System, Tailwind CSS v4 & Responsividade

* **Paleta Principal**:
  - Rosa & Framboesa (`rose-500`, `rose-600`): Calor materno, acolhimento e identidade visual.
  - Sálvia & Esmeralda (`emerald-500`, `teal-600`): Indicadores de estabilidade e saúde.
  - Âmbar & Laranja (`amber-500`, `orange-500`): Alertas de carência e advertências de segurança.
* **Prevenção de Quebras em Dispositivos Móveis**:
  - Uso estrito de `box-border`, `max-w-full` e `overflow-x-hidden`.
  - Cabeçalho dinâmico com modo compacto em rolagem para garantir que o título `🌸 MamãeGotchi` permaneça visível sem sobreposição em telas pequenas (320px - 375px).

---

## 11. Instalação, Execução & Comandos do Projeto

### Pré-requisitos:
* **Node.js** versão 18.0.0 ou superior (recomendado 20.x ou 22.x LTS).
* **npm** ou **yarn** instalado.

### Comandos de Terminal:

```bash
# 1. Clonar ou acessar o repositório
cd mamaegotchi

# 2. Instalar todas as dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev

# 4. Executar verificação de tipos e lint estático
npm run lint

# 5. Compilar para produção (gera pasta dist/)
npm run build

# 6. Pré-visualizar a compilação de produção localmente
npm run preview
```

O servidor de desenvolvimento inicializará por padrão na porta `3000` (`http://localhost:3000`).

---

## 12. Hospedagem & Infraestrutura para a UNCISAL

Como o **MamãeGotchi** é uma aplicação de arquitetura **Client-Side SPA (Single Page Application)** com processamento autônomo no navegador do usuário, **sua demanda de infraestrutura de servidor é extremamente baixa**. Não é necessário banco de dados relacional (PostgreSQL/MySQL) nem runtime de servidor pesado para a simulação principal.

### 📋 Requisitos Mínimos de Infraestrutura (NTI / UNCISAL)
* **Processamento (CPU)**: 1 vCPU (mínimo) / 2 vCPUs (recomendado para tráfego simultâneo intenso).
* **Memória RAM**: 1 GB RAM (mínimo) / 2 GB RAM (recomendado).
* **Armazenamento em Disco**: 10 GB (espaço suficiente para o sistema operacional, Docker e logs).
* **Sistema Operacional**: Qualquer distribuição Linux de servidor (Ubuntu 22.04 LTS / 24.04 LTS ou Debian 12 recomendados).
* **Rede**: Porta 80 (HTTP) e 443 (HTTPS) liberadas no firewall do Data Center da universidade.
* **Certificado SSL/TLS**: Obrigatório (HTTPS) para habilitar as APIs de áudio (`Web Audio API`), leitor de voz (`Web Speech API`) e armazenamento seguro de sessão. Pode-se utilizar o **Let's Encrypt (Certbot)** gratuito institucional.

---

### 🚀 Opções de Implantação na UNCISAL

#### Opção A: Container Docker com Nginx Alpine (Altamente Recomendado)
O repositório já inclui um `Dockerfile` multi-stage e um `docker-compose.yml` otimizados. A imagem final gerada possui apenas **~25 MB**, com servidor Nginx ultra-rápido, compressão Gzip ativada e tratamento de rotas SPA (`try_files $uri /index.html;`).

```bash
# 1. No servidor da UNCISAL, clonar o projeto
git clone <url-do-repositorio> /opt/mamaegotchi
cd /opt/mamaegotchi

# 2. Subir o container em segundo plano
docker compose up -d --build

# 3. O aplicativo estará respondendo na porta 8080 (ou mapeada para a 80)
curl http://localhost:8080
```

#### Opção B: Servidor Web Nativo (Nginx ou Apache no Linux)
Caso a equipe de infraestrutura da UNCISAL prefira hospedar diretamente no Nginx da instituição:

```bash
# 1. Compilar os arquivos estáticos na máquina de build
npm install
npm run build
# A pasta /dist será gerada contendo os arquivos finais (HTML, JS, CSS, Assets).

# 2. Copiar a pasta dist para o diretório web do servidor
sudo cp -r dist/* /var/www/mamaegotchi/

# 3. Configurar o bloco de servidor Nginx (/etc/nginx/sites-available/mamaegotchi.uncisal.edu.br):
server {
    listen 80;
    server_name mamaegotchi.uncisal.edu.br;
    root /var/www/mamaegotchi;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
}

# 4. Habilitar SSL com Certbot
sudo certbot --nginx -d mamaegotchi.uncisal.edu.br
```

#### Opção C: Plataforma Jamstack / Nuvem Gratuita para Universidades
Caso a UNCISAL opte por não consumir recursos de seus servidores locais, o MamãeGotchi pode ser publicado com custo zero no **Cloudflare Pages**, **GitHub Pages** ou **Vercel**, bastando apontar um registro DNS `CNAME` do domínio `mamaegotchi.uncisal.edu.br`.

---

### 🌐 Configuração de DNS & Domínio Institucional
Solicitar ao NTI (Núcleo de Tecnologia da Informação) da UNCISAL:
* **Entrada DNS**: Criar entrada do tipo `A` (apontando para o IP do servidor) ou `CNAME`.
* **Sugestão de URL**: 
  - `https://mamaegotchi.uncisal.edu.br` ou
  - `https://propep.uncisal.edu.br/mamaegotchi`

---

## 13. Diretrizes de Contribuição & Roteiro de Extensões

Contribuições acadêmicas e técnicas são calorosamente bem-vindas no âmbito do PIBITI/UNCISAL:

### Boas Práticas:
1. **Evidências em Primeiro Lugar**: Toda nova opção de escolha ou fato científico deve citar ou derivar de documento oficial (MS, SBP, FEBRASGO, OMS).
2. **Tipagem Estrita**: Não utilize `any`. Adicione interfaces claras em `src/types.ts`.
3. **Imutabilidade**: Ao atualizar o estado dos status vitais, sempre faça cópias imutáveis (`setStatus(prev => ({ ...prev, ... }))`).
4. **Respeito aos Critérios de Acessibilidade**: Certifique-se de que novos botões possuam tags `title`, `aria-label` e contraste cromático adequado.

### Ideias para Extensões Futuras:
* 📄 **Exportação de Relatório Clínico**: Gerar um PDF com o diário de escolhas da gestante para discussão pedagógica ou com a equipe de saúde.
* 🍼 **Extensão do Puerpério Tardio**: Acompanhar o bebê até o 1º ano de vida, abordando introdução alimentar (6 meses) e vacinação do Programa Nacional de Imunizações (PNI).
* 🌐 **Internacionalização (i18n)**: Suporte para Espanhol e Inglês para alcance pan-americano.

---

*Repositório mantido com rigor acadêmico pelo projeto PIBITI/UNCISAL 2026.*
