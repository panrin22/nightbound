import type { MoodId, StoryLength } from '@/constants/moods';

export interface Story {
  id: string;
  title: string;
  body: string;
  mood: MoodId;
  length: StoryLength;
  createdAt: string;
  favorite?: boolean;
  /** Where the prose came from */
  source?: 'xai' | 'groq' | 'offline';
  model?: string;
}

export interface AppPrefs {
  ageConfirmed: boolean;
  isPremium: boolean;
  /** ISO date YYYY-MM-DD of last free story used */
  freeUsageDate: string | null;
  freeUsageCount: number;
}
