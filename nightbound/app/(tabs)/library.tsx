import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  AppState,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MOODS } from '@/constants/moods';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { getStories } from '@/lib/storage';
import type { Story } from '@/lib/types';

export default function LibraryScreen() {
  const [stories, setStories] = useState<Story[]>([]);

  const refresh = useCallback(() => {
    getStories().then(setStories);
  }, []);

  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') refresh();
    });
    return () => sub.remove();
  }, [refresh]);

  if (stories.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No stories yet</Text>
        <Text style={styles.emptyBody}>
          Your generated tales will live here—ready to re‑read or listen again.
        </Text>
        <Pressable style={styles.cta} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.ctaText}>Choose a mood</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={stories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const mood = MOODS.find((m) => m.id === item.mood);
        return (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
            onPress={() =>
              router.push({ pathname: '/story/[id]', params: { id: item.id } })
            }
          >
            <View style={styles.row}>
              <Text style={styles.emoji}>{mood?.emoji ?? '📖'}</Text>
              {item.favorite ? <Text style={styles.star}>★</Text> : null}
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {mood?.label ?? item.mood} ·{' '}
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.preview} numberOfLines={2}>
              {item.body}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: 12, paddingBottom: spacing.xxl },
  empty: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: { ...typography.title, color: colors.text },
  emptyBody: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontSize: 15,
  },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radii.md,
  },
  ctaText: { color: colors.bg, fontWeight: '700' },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  emoji: { fontSize: 20 },
  star: { color: colors.accent, fontSize: 16 },
  title: { color: colors.text, fontSize: 17, fontWeight: '600', marginTop: 8 },
  meta: { color: colors.textDim, fontSize: 12, marginTop: 4 },
  preview: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
