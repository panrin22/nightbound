import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppPrefs, Story } from '@/lib/types';

const KEYS = {
  prefs: '@nightbound/prefs',
  stories: '@nightbound/stories',
} as const;

const defaultPrefs: AppPrefs = {
  ageConfirmed: false,
  isPremium: false,
  freeUsageDate: null,
  freeUsageCount: 0,
};

export async function getPrefs(): Promise<AppPrefs> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.prefs);
    if (!raw) return { ...defaultPrefs };
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return { ...defaultPrefs };
  }
}

export async function setPrefs(patch: Partial<AppPrefs>): Promise<AppPrefs> {
  const current = await getPrefs();
  const next = { ...current, ...patch };
  await AsyncStorage.setItem(KEYS.prefs, JSON.stringify(next));
  return next;
}

export async function getStories(): Promise<Story[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.stories);
    if (!raw) return [];
    return JSON.parse(raw) as Story[];
  } catch {
    return [];
  }
}

export async function saveStory(story: Story): Promise<Story[]> {
  const list = await getStories();
  const next = [story, ...list.filter((s) => s.id !== story.id)];
  await AsyncStorage.setItem(KEYS.stories, JSON.stringify(next));
  return next;
}

export async function updateStory(
  id: string,
  patch: Partial<Story>
): Promise<Story[]> {
  const list = await getStories();
  const next = list.map((s) => (s.id === id ? { ...s, ...patch } : s));
  await AsyncStorage.setItem(KEYS.stories, JSON.stringify(next));
  return next;
}

export async function deleteStory(id: string): Promise<Story[]> {
  const list = await getStories();
  const next = list.filter((s) => s.id !== id);
  await AsyncStorage.setItem(KEYS.stories, JSON.stringify(next));
  return next;
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}
