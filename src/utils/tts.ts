/**
 * Web Speech API (TTS) Utility in Portuguese (pt-BR)
 * Provides accessible text-to-speech for maternal decisions, clinical facts, and interface content.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Strips emojis, markdown asterisks and formatting for natural speech synthesis
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[*_#`~[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if Speech Synthesis is supported in the browser
 */
export function isTtsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Checks if synthesis is currently speaking
 */
export function isSpeaking(): boolean {
  if (!isTtsSupported()) return false;
  return window.speechSynthesis.speaking;
}

/**
 * Stops any active speech
 */
export function stopSpeaking(): void {
  if (!isTtsSupported()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

/**
 * Speaks the given text in Portuguese (pt-BR)
 */
export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
): void {
  if (!isTtsSupported()) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel ongoing speech first
  stopSpeaking();

  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return;

  const utterance = new SpeechSynthesisUtterance(cleaned);
  utterance.lang = 'pt-BR';
  utterance.rate = options?.rate ?? 1.0;
  utterance.pitch = options?.pitch ?? 1.0;

  // Try to find a pt-BR or pt voice if available
  const voices = window.speechSynthesis.getVoices();
  const ptVoice = voices.find(
    (v) => v.lang === 'pt-BR' || v.lang === 'pt_BR' || v.lang.startsWith('pt')
  );
  if (ptVoice) {
    utterance.voice = ptVoice;
  }

  utterance.onstart = () => {
    if (options?.onStart) options.onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (options?.onEnd) options.onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (options?.onError) options.onError(e);
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
