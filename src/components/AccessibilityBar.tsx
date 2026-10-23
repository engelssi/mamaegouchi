import React, { useState, useEffect } from 'react';
import { 
  AccessibilitySettings, 
  FontSizeSetting, 
  ColorModeSetting 
} from '../types';
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  Type, 
  Sparkles, 
  SunMedium, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Check,
  ZapOff,
  SquareAsterisk,
  Mic,
  Square
} from 'lucide-react';
import { isSpeaking, stopSpeaking, speakText } from '../utils/tts';

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  currentSummaryText?: string;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  settings,
  onUpdateSettings,
  currentSummaryText
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      setSpeaking(isSpeaking());
    }, 400);
    return () => clearInterval(checkInterval);
  }, []);

  const handleReadCurrentScreen = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }

    const textToRead = currentSummaryText || 
      "Você está no MamãeGotchi, simulador educacional de saúde materno-infantil. Utilize os botões de ação na tela ou atalhos do teclado para cuidar da saúde da mãe e do bebê.";
    
    setSpeaking(true);
    speakText(textToRead, {
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false)
    });
  };

  return (
    <div 
      id="accessibility-bar-region" 
      role="region" 
      aria-label="Barra de Ferramentas de Acessibilidade"
      className="w-full bg-stone-900 text-stone-100 text-xs border-b border-stone-800 select-none z-50 transition-all shadow-xs overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
        {/* Main Quick Access Left Side */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Main accessibility trigger */}
          <button
            id="btn-toggle-accessibility-menu"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="accessibility-detailed-panel"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold border border-stone-700 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Acessibilidade</span>
            {isOpen ? <ChevronUp className="w-3 h-3 text-stone-400" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
          </button>

          {/* Quick Font Sizer Buttons */}
          <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
            <button
              id="font-size-btn-normal"
              onClick={() => onUpdateSettings({ fontSize: 'normal' })}
              title="Tamanho de Fonte Padrão (100%)"
              aria-label="Fonte Padrão"
              className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                settings.fontSize === 'normal'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              id="font-size-btn-large"
              onClick={() => onUpdateSettings({ fontSize: 'large' })}
              title="Tamanho de Fonte Grande (115%)"
              aria-label="Fonte Grande"
              className={`px-2 py-0.5 rounded font-bold text-sm transition-colors cursor-pointer ${
                settings.fontSize === 'large'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              A
            </button>
            <button
              id="font-size-btn-xlarge"
              onClick={() => onUpdateSettings({ fontSize: 'extra-large' })}
              title="Tamanho de Fonte Extragrande (130%)"
              aria-label="Fonte Extragrande"
              className={`px-2 py-0.5 rounded font-bold text-base transition-colors cursor-pointer ${
                settings.fontSize === 'extra-large'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              A+
            </button>
          </div>

          {/* Quick High Contrast Toggle */}
          <button
            id="toggle-high-contrast"
            onClick={() => 
              onUpdateSettings({ 
                colorMode: settings.colorMode === 'high-contrast' ? 'default' : 'high-contrast' 
              })
            }
            aria-pressed={settings.colorMode === 'high-contrast'}
            title="Alternar Modo Alto Contraste (WCAG AAA)"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
              settings.colorMode === 'high-contrast'
                ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-xs font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
            }`}
          >
            <SunMedium className="w-3.5 h-3.5 text-amber-400" />
            <span>Alto Contraste</span>
          </button>

          {/* Quick TTS Voice Reader Button */}
          <button
            id="btn-accessibility-tts-speak"
            onClick={handleReadCurrentScreen}
            aria-label={speaking ? 'Parar Leitura em Voz Alta' : 'Ler Tela em Voz Alta'}
            title={speaking ? 'Parar Leitura de Voz' : 'Ouvir resumo da tela em voz alta (TTS)'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
              speaking
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-rose-200 border-stone-700'
            }`}
          >
            {speaking ? (
              <>
                <Square className="w-3 h-3 fill-white" />
                <span>Parar Leitura</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-300" />
                <span>Ouvir Tela (Voz)</span>
              </>
            )}
          </button>
        </div>

        {/* Right Info Tag */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-stone-400">
          <span>Diretrizes WCAG 2.1 & e-MAG</span>
          <span className="text-stone-600">•</span>
          <span>Atalhos: <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 font-mono text-[10px] text-stone-300">Tab</kbd> para navegar</span>
        </div>
      </div>

      {/* Expanded Detailed Accessibility Panel */}
      {isOpen && (
        <div 
          id="accessibility-detailed-panel"
          className="border-t border-stone-800 bg-stone-950 px-4 py-4 max-w-7xl mx-auto space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Column 1: Color & Daltonism Mode */}
            <div className="bg-stone-900/95 p-3.5 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <SunMedium className="w-4 h-4" />
                  Modo de Cores e Visão
                </span>
                <span className="text-[10px] text-stone-400 font-normal">Daltonismo & Contraste</span>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={() => onUpdateSettings({ colorMode: 'default' })}
                  className={`p-2 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                    settings.colorMode === 'default'
                      ? 'bg-stone-800 text-amber-300 border-amber-400'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-900'
                  }`}
                >
                  <span>Padrão</span>
                  {settings.colorMode === 'default' && <Check className="w-3 h-3 text-amber-400" />}
                </button>

                <button
                  onClick={() => onUpdateSettings({ colorMode: 'high-contrast' })}
                  className={`p-2 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                    settings.colorMode === 'high-contrast'
                      ? 'bg-stone-800 text-amber-300 border-amber-400'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-900'
                  }`}
                >
                  <span>Alto Contraste</span>
                  {settings.colorMode === 'high-contrast' && <Check className="w-3 h-3 text-amber-400" />}
                </button>

                <button
                  onClick={() => onUpdateSettings({ colorMode: 'protanopia' })}
                  className={`p-2 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                    settings.colorMode === 'protanopia'
                      ? 'bg-stone-800 text-amber-300 border-amber-400'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-900'
                  }`}
                >
                  <span>Protanopia (s/ Vermelho)</span>
                  {settings.colorMode === 'protanopia' && <Check className="w-3 h-3 text-amber-400" />}
                </button>

                <button
                  onClick={() => onUpdateSettings({ colorMode: 'deuteranopia' })}
                  className={`p-2 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                    settings.colorMode === 'deuteranopia'
                      ? 'bg-stone-800 text-amber-300 border-amber-400'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-900'
                  }`}
                >
                  <span>Deuteranopia (s/ Verde)</span>
                  {settings.colorMode === 'deuteranopia' && <Check className="w-3 h-3 text-amber-400" />}
                </button>

                <button
                  onClick={() => onUpdateSettings({ colorMode: 'tritanopia' })}
                  className={`p-2 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                    settings.colorMode === 'tritanopia'
                      ? 'bg-stone-800 text-amber-300 border-amber-400'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-900'
                  }`}
                >
                  <span>Tritanopia (s/ Azul)</span>
                  {settings.colorMode === 'tritanopia' && <Check className="w-3 h-3 text-amber-400" />}
                </button>

                <button
                  onClick={() => onUpdateSettings({ colorMode: 'monochrome' })}
                  className={`p-2 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                    settings.colorMode === 'monochrome'
                      ? 'bg-stone-800 text-amber-300 border-amber-400'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-900'
                  }`}
                >
                  <span>Monocromático</span>
                  {settings.colorMode === 'monochrome' && <Check className="w-3 h-3 text-amber-400" />}
                </button>
              </div>
            </div>

            {/* Column 2: Text-to-Speech & Voice Reader Settings */}
            <div className="bg-stone-900/95 p-3.5 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-rose-300 font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" />
                  Leitura por Voz (TTS)
                </span>
                <span className="text-[10px] text-stone-400 font-normal">Web Speech API</span>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <label className="flex items-center justify-between p-2 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer hover:bg-stone-900">
                  <span className="text-stone-200">Leitura Automática de Eventos & Fatos</span>
                  <input
                    type="checkbox"
                    checked={settings.ttsEnabled}
                    onChange={(e) => onUpdateSettings({ ttsEnabled: e.target.checked })}
                    className="rounded border-stone-700 text-rose-500 focus:ring-rose-400 w-4 h-4 cursor-pointer"
                  />
                </label>

                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="flex items-center justify-between text-stone-300 text-[11px]">
                    <span>Velocidade da Voz:</span>
                    <span className="font-bold text-amber-300">{settings.ttsSpeechRate}x</span>
                  </div>
                  <div className="flex gap-1">
                    {[0.8, 1.0, 1.2, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => onUpdateSettings({ ttsSpeechRate: rate })}
                        className={`flex-1 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                          settings.ttsSpeechRate === rate
                            ? 'bg-rose-500 text-white border-rose-400'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Cognitive, Motor & Motion Settings */}
            <div className="bg-stone-900/95 p-3.5 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <ZapOff className="w-4 h-4" />
                  Sensibilidade & Movimento
                </span>
                <span className="text-[10px] text-stone-400 font-normal">Prevenção de Estresse</span>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <label className="flex items-center justify-between p-2 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer hover:bg-stone-900">
                  <div>
                    <div className="text-stone-200 font-medium">Reduzir Movimento e Animações</div>
                    <div className="text-[10px] text-stone-400">Desativa pulsações, confetes e balanços</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
                    className="rounded border-stone-700 text-emerald-500 focus:ring-emerald-400 w-4 h-4 cursor-pointer"
                  />
                </label>

                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  💡 <strong>Dica de Navegação:</strong> Você pode usar a tecla <kbd className="px-1 py-0.5 bg-stone-800 rounded text-stone-200 font-mono text-[10px]">Esc</kbd> para fechar modais e <kbd className="px-1 py-0.5 bg-stone-800 rounded text-stone-200 font-mono text-[10px]">Espaço</kbd> para pausar a qualquer momento.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
