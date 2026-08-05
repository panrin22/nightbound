export type MoodId =
  | 'cozy'
  | 'soft_romance'
  | 'mystery'
  | 'nature'
  | 'scifi_calm'
  | 'comfort'
  | 'adventure_soft'
  | 'literary';

export type StoryLength = 'short' | 'medium';

export interface Mood {
  id: MoodId;
  label: string;
  subtitle: string;
  emoji: string;
  /** Free tier can use these */
  free: boolean;
}

export const MOODS: Mood[] = [
  {
    id: 'cozy',
    label: 'Cozy',
    subtitle: 'Warm rooms, quiet nights',
    emoji: '🕯️',
    free: true,
  },
  {
    id: 'soft_romance',
    label: 'Soft Romance',
    subtitle: 'Tender, unspoken feelings',
    emoji: '🌙',
    free: true,
  },
  {
    id: 'mystery',
    label: 'Gentle Mystery',
    subtitle: 'Curiosity without fear',
    emoji: '🔑',
    free: true,
  },
  {
    id: 'nature',
    label: 'Nature',
    subtitle: 'Forests, rain, open sky',
    emoji: '🌲',
    free: false,
  },
  {
    id: 'scifi_calm',
    label: 'Calm Sci‑Fi',
    subtitle: 'Quiet futures, soft light',
    emoji: '✨',
    free: false,
  },
  {
    id: 'comfort',
    label: 'Comfort',
    subtitle: 'Grief held gently',
    emoji: '🫖',
    free: false,
  },
  {
    id: 'adventure_soft',
    label: 'Soft Adventure',
    subtitle: 'Wandering, never rushing',
    emoji: '🗺️',
    free: false,
  },
  {
    id: 'literary',
    label: 'Literary',
    subtitle: 'Memory, language, dusk',
    emoji: '📖',
    free: false,
  },
];

export const LENGTHS: { id: StoryLength; label: string; minutes: string }[] = [
  { id: 'short', label: 'Short', minutes: '~8 min' },
  { id: 'medium', label: 'Medium', minutes: '~12 min' },
];

/** Free tier: stories per calendar day */
export const FREE_DAILY_LIMIT = 1;
