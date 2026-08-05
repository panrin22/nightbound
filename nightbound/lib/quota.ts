import { FREE_DAILY_LIMIT } from '@/constants/moods';
import { getPrefs, setPrefs, todayKey } from '@/lib/storage';

export async function canGenerate(): Promise<{
  allowed: boolean;
  remaining: number;
  isPremium: boolean;
}> {
  const prefs = await getPrefs();
  if (prefs.isPremium) {
    return { allowed: true, remaining: 999, isPremium: true };
  }

  const today = todayKey();
  const count =
    prefs.freeUsageDate === today ? prefs.freeUsageCount : 0;
  const remaining = Math.max(0, FREE_DAILY_LIMIT - count);
  return {
    allowed: remaining > 0,
    remaining,
    isPremium: false,
  };
}

export async function consumeFreeGeneration(): Promise<void> {
  const prefs = await getPrefs();
  if (prefs.isPremium) return;

  const today = todayKey();
  if (prefs.freeUsageDate === today) {
    await setPrefs({ freeUsageCount: prefs.freeUsageCount + 1 });
  } else {
    await setPrefs({ freeUsageDate: today, freeUsageCount: 1 });
  }
}
