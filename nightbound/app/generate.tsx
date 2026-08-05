import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import type { MoodId, StoryLength } from '@/constants/moods';
import { MOODS } from '@/constants/moods';
import { colors, spacing, typography } from '@/constants/theme';
import { generateStory } from '@/lib/generateStory';
import { consumeFreeGeneration } from '@/lib/quota';
import { saveStory } from '@/lib/storage';

const RITUAL = [
  'Dimming the lights…',
  'Softening the ending…',
  'Letting the day go…',
  'Asking the night for words…',
  'Writing something calm…',
];

export default function GenerateScreen() {
  const params = useLocalSearchParams<{ mood?: string; length?: string }>();
  const mood = (params.mood as MoodId) || 'cozy';
  const length = (params.length as StoryLength) || 'short';
  const [line, setLine] = useState(RITUAL[0]);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setLine((prev) => {
        const i = RITUAL.indexOf(prev);
        return RITUAL[(i + 1) % RITUAL.length];
      });
    }, 1400);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      try {
        const story = await generateStory({ mood, length });
        await saveStory(story);
        await consumeFreeGeneration();
        router.replace({
          pathname: '/story/[id]',
          params: { id: story.id },
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not write tonight’s story.');
      }
    })();
  }, [mood, length]);

  const moodMeta = MOODS.find((m) => m.id === mood);

  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{moodMeta?.emoji ?? '🌙'}</Text>
      <Text style={styles.title}>Composing…</Text>
      <Text style={styles.line}>{error ?? line}</Text>
      {!error ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 24 }} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emoji: { fontSize: 40, marginBottom: spacing.md },
  title: { ...typography.title, color: colors.text },
  line: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
  },
});
