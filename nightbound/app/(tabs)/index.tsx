import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  AppState,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { LENGTHS, MOODS, type MoodId, type StoryLength } from '@/constants/moods';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { canGenerate } from '@/lib/quota';

export default function HomeScreen() {
  const [mood, setMood] = useState<MoodId>('cozy');
  const [length, setLength] = useState<StoryLength>('short');
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const refreshQuota = useCallback(() => {
    canGenerate().then((q) => {
      setRemaining(q.remaining);
      setIsPremium(q.isPremium);
    });
  }, []);

  useEffect(() => {
    refreshQuota();
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') refreshQuota();
    });
    return () => sub.remove();
  }, [refreshQuota]);

  const selectedMood = MOODS.find((m) => m.id === mood)!;

  const onBegin = async () => {
    const q = await canGenerate();
    if (!q.allowed) {
      router.push('/paywall');
      return;
    }
    if (!selectedMood.free && !q.isPremium) {
      router.push('/paywall');
      return;
    }
    router.push({
      pathname: '/generate',
      params: { mood, length },
    });
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>NIGHTBOUND</Text>
      <Text style={styles.heading}>How should the night feel?</Text>
      <Text style={styles.sub}>
        Soft literary stories for adults. Pick a mood. We’ll write something
        calm—and end gently.
      </Text>

      <View style={styles.quota}>
        <Text style={styles.quotaText}>
          {isPremium
            ? 'Premium · unlimited stories'
            : remaining === null
              ? '…'
              : `${remaining} free stor${remaining === 1 ? 'y' : 'ies'} left today`}
        </Text>
      </View>

      <Text style={styles.section}>Mood</Text>
      <View style={styles.grid}>
        {MOODS.map((m) => {
          const active = m.id === mood;
          const locked = !m.free && !isPremium;
          return (
            <Pressable
              key={m.id}
              onPress={() => setMood(m.id)}
              style={[
                styles.card,
                active && styles.cardActive,
                locked && styles.cardLocked,
              ]}
            >
              <Text style={styles.emoji}>{m.emoji}</Text>
              <Text style={styles.cardTitle}>{m.label}</Text>
              <Text style={styles.cardSub}>{m.subtitle}</Text>
              {locked ? <Text style={styles.lock}>PREMIUM</Text> : null}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.section}>Length</Text>
      <View style={styles.row}>
        {LENGTHS.map((l) => {
          const active = l.id === length;
          return (
            <Pressable
              key={l.id}
              onPress={() => setLength(l.id)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {l.label}
              </Text>
              <Text style={styles.chipMeta}>{l.minutes}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
        onPress={onBegin}
      >
        <Text style={styles.ctaText}>Begin tonight’s story</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  kicker: {
    ...typography.label,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  heading: { ...typography.title, color: colors.text, fontSize: 26 },
  sub: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
  },
  quota: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    backgroundColor: colors.accentGlow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.full,
  },
  quotaText: { color: colors.accent, fontSize: 12, fontWeight: '600' },
  section: {
    ...typography.label,
    color: colors.textDim,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: {
    width: '48%',
    flexGrow: 1,
    minWidth: '45%',
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentGlow,
  },
  cardLocked: { opacity: 0.85 },
  emoji: { fontSize: 22, marginBottom: 6 },
  cardTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
  cardSub: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  lock: {
    marginTop: 8,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.accentSoft,
    fontWeight: '700',
  },
  row: { flexDirection: 'row', gap: 10 },
  chip: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  chipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentGlow,
  },
  chipText: { color: colors.textMuted, fontWeight: '600' },
  chipTextActive: { color: colors.accent },
  chipMeta: { color: colors.textDim, fontSize: 12, marginTop: 4 },
  cta: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  ctaText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
