export const MOOD_IDS = [
  'cozy',
  'soft_romance',
  'mystery',
  'nature',
  'scifi_calm',
  'comfort',
  'adventure_soft',
  'literary',
] as const;

export type MoodId = (typeof MOOD_IDS)[number];
export type StoryLength = 'short' | 'medium';

export const MOOD_GUIDANCE: Record<MoodId, string> = {
  cozy:
    'Warm indoor night: lamps, tea, rain outside, ordinary objects arranged into peace. Second person or close third, intimate and domestic.',
  soft_romance:
    'Tender almost-love between adults: glances, almost-touch, shared weather, unspoken understanding. No explicit sex, no crude language. Emotional warmth only.',
  mystery:
    'Gentle curiosity: a soft puzzle, an envelope, a light left on. No gore, no jump scares, no crime violence. Wonder that invites rest, not adrenaline.',
  nature:
    'Forest, rain, tide, wind. Sensory and slow. Human presence optional and quiet. No survival horror.',
  scifi_calm:
    'Quiet near-future or orbital life: soft tech, moss under artificial dusk, messages from home. No war, no dystopian panic.',
  comfort:
    'Grief held gently, company without fixing, tea and silence. Validating, never preachy. No self-harm detail.',
  adventure_soft:
    'A road at dusk, a village lighting windows, a pack that feels lighter when you stop measuring distance. Low stakes wander.',
  literary:
    'Memory, language, dusk. Slightly elevated prose, still readable aloud. Metaphoric but clear. Adult literary short-story tone.',
};

export const LENGTH_GUIDANCE: Record<
  StoryLength,
  { words: string; minutes: string; maxTokens: number }
> = {
  short: {
    words: '650–900 words',
    minutes: 'about 8 minutes read-aloud',
    maxTokens: 1400,
  },
  medium: {
    words: '1000–1400 words',
    minutes: 'about 12 minutes read-aloud',
    maxTokens: 2000,
  },
};
