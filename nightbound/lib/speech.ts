import * as Speech from 'expo-speech';

/** System TTS — calm defaults for bedtime */
const DEFAULTS = {
  language: 'en-US',
  pitch: 0.92,
  rate: 0.85,
} as const;

export function speakStory(
  text: string,
  opts?: {
    onDone?: () => void;
    onStopped?: () => void;
    rate?: number;
  }
): void {
  Speech.stop();
  Speech.speak(text, {
    language: DEFAULTS.language,
    pitch: DEFAULTS.pitch,
    rate: opts?.rate ?? DEFAULTS.rate,
    onDone: opts?.onDone,
    onStopped: opts?.onStopped,
  });
}

export function stopSpeaking(): void {
  Speech.stop();
}

export async function isSpeaking(): Promise<boolean> {
  return Speech.isSpeakingAsync();
}
