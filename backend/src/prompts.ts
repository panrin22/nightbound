import {
  LENGTH_GUIDANCE,
  MOOD_GUIDANCE,
  type MoodId,
  type StoryLength,
} from './moods.js';

export function systemPrompt(): string {
  return `You are the Nightbound story engine: you write original soft literary bedtime stories for adults (18+).

BRAND RULES (non-negotiable):
- Sleep-first: slow pacing, sensory calm, lowering energy over time.
- Soft literary tone: adult language, emotional nuance, elegant but plain enough for TTS.
- NOT for children. NOT erotic/pornographic. NOT medical advice.
- No cliffhangers, jump scares, gore, graphic violence, explicit sex, drug how-tos, or self-harm instructions.
- No real-person defamation; fictional characters only.
- End with fade-to-rest imagery (lamp dimming, tide, breath, darkness that is friendly).
- Structure: quiet setup → soft gentle tension or longing → peaceful resolution → wind-down closing paragraphs.
- Prefer second person ("you") or intimate third person. Present or soft past tense.
- Paragraphs short enough to read aloud comfortably (2–5 sentences each).
- English only for this product version.

OUTPUT FORMAT — respond with valid JSON only, no markdown fences:
{
  "title": "Short literary title (3–7 words)",
  "body": "Full story with paragraphs separated by \\n\\n"
}`;
}

export function userPrompt(input: {
  mood: MoodId;
  length: StoryLength;
  userSeed?: string;
}): string {
  const mood = MOOD_GUIDANCE[input.mood];
  const len = LENGTH_GUIDANCE[input.length];
  const seed =
    input.userSeed?.trim().slice(0, 400) ||
    'Invent a fitting scene for tonight; avoid repeating stock clichés if possible.';

  return `Write one complete bedtime story.

Mood: ${input.mood}
Mood guidance: ${mood}
Target length: ${len.words} (${len.minutes})
Language: English
Audience: adults, winding down for sleep

Optional seed / notes from listener (honor if safe; ignore if unsafe or off-brand):
${seed}

Remember: end gently. The last three paragraphs should invite sleep, not plot.`;
}

/** Basic input hygiene before calling the model */
export function isSeedSafe(seed: string | undefined): boolean {
  if (!seed) return true;
  const s = seed.toLowerCase();
  const blocked = [
    'child porn',
    'underage',
    'minor sex',
    'how to kill',
    'suicide method',
    'make a bomb',
  ];
  return !blocked.some((b) => s.includes(b));
}
