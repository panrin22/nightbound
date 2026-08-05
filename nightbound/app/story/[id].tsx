import { useLocalSearchParams, Stack } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import { speakStory, stopSpeaking } from '@/lib/speech';
import { getStories, updateStory } from '@/lib/storage';
import type { Story } from '@/lib/types';

const TIMERS = [0, 10, 15, 20, 30] as const;

export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [playing, setPlaying] = useState(false);
  const [timerMin, setTimerMin] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    const list = await getStories();
    setStory(list.find((s) => s.id === id) ?? null);
  }, [id]);

  useEffect(() => {
    load();
    return () => {
      stopSpeaking();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [load]);

  const clearSleepTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const onPlay = () => {
    if (!story) return;
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    speakStory(story.body, {
      onDone: () => setPlaying(false),
      onStopped: () => setPlaying(false),
    });
  };

  const onTimer = (min: number) => {
    setTimerMin(min);
    clearSleepTimer();
    if (min <= 0) return;
    timerRef.current = setTimeout(() => {
      stopSpeaking();
      setPlaying(false);
      setTimerMin(0);
    }, min * 60 * 1000);
  };

  const toggleFavorite = async () => {
    if (!story) return;
    const next = await updateStory(story.id, { favorite: !story.favorite });
    setStory(next.find((s) => s.id === story.id) ?? story);
  };

  if (!story) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.missing}>Story not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: story.title }} />
      <View style={styles.wrap}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{story.title}</Text>
          {story.source ? (
            <Text style={styles.source}>
              {story.source === 'offline'
                ? 'Offline story · connect AI backend for fresh tales'
                : `Written with AI (${story.source}${story.model ? ` · ${story.model}` : ''})`}
            </Text>
          ) : null}
          <Text style={styles.body}>{story.body}</Text>
        </ScrollView>

        <View style={styles.bar}>
          <Text style={styles.timerLabel}>Sleep timer</Text>
          <View style={styles.timerRow}>
            {TIMERS.map((m) => (
              <Pressable
                key={m}
                onPress={() => onTimer(m)}
                style={[styles.timerChip, timerMin === m && styles.timerChipOn]}
              >
                <Text
                  style={[
                    styles.timerChipText,
                    timerMin === m && styles.timerChipTextOn,
                  ]}
                >
                  {m === 0 ? 'Off' : `${m}m`}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.secondary} onPress={toggleFavorite}>
              <Text style={styles.secondaryText}>
                {story.favorite ? '★ Saved' : '☆ Favorite'}
              </Text>
            </Pressable>
            <Pressable style={styles.primary} onPress={onPlay}>
              <Text style={styles.primaryText}>
                {playing ? 'Pause voice' : 'Listen (System TTS)'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: 180 },
  title: {
    ...typography.title,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  source: {
    color: colors.textDim,
    fontSize: 12,
    marginBottom: spacing.lg,
    letterSpacing: 0.2,
  },
  body: { ...typography.story, color: colors.text },
  missing: { color: colors.textMuted, padding: spacing.lg },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bgElevated,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  timerLabel: {
    ...typography.label,
    color: colors.textDim,
    marginBottom: spacing.sm,
  },
  timerRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  timerChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timerChipOn: {
    borderColor: colors.accent,
    backgroundColor: colors.accentGlow,
  },
  timerChipText: { color: colors.textMuted, fontSize: 12 },
  timerChipTextOn: { color: colors.accent, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 10 },
  secondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryText: { color: colors.text, fontWeight: '600' },
  primary: {
    flex: 2,
    backgroundColor: colors.accent,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: { color: colors.bg, fontWeight: '700' },
});
