import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, AppState, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import { apiBaseUrl, healthCheck } from '@/lib/api';
import { getPrefs, setPrefs } from '@/lib/storage';
import type { AppPrefs } from '@/lib/types';

export default function SettingsScreen() {
  const [prefs, setLocal] = useState<AppPrefs | null>(null);
  const [aiStatus, setAiStatus] = useState<string>('checking…');

  const refresh = useCallback(() => {
    getPrefs().then(setLocal);
    healthCheck()
      .then((h) => {
        const provider = (h as { provider?: string }).provider;
        setAiStatus(
          h.aiConfigured
            ? `online · ${provider ?? h.model ?? 'AI'}`
            : 'server up · API key missing'
        );
      })
      .catch(() => setAiStatus(`offline · ${apiBaseUrl()}`));
  }, []);

  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') refresh();
    });
    return () => sub.remove();
  }, [refresh]);

  const togglePremiumDev = async () => {
    if (!prefs) return;
    const next = await setPrefs({ isPremium: !prefs.isPremium });
    setLocal(next);
    Alert.alert(
      next.isPremium ? 'Premium ON (dev)' : 'Premium OFF (dev)',
      'This is a local toggle for testing. Real Play Billing comes later.'
    );
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>ABOUT</Text>
      <Text style={styles.title}>Nightbound</Text>
      <Text style={styles.body}>
        AI bedtime stories for adults—soft literary tone, sleep‑first pacing,
        English. System voice (TTS) in MVP.
      </Text>

      <View style={styles.card}>
        <Text style={styles.rowLabel}>Plan</Text>
        <Text style={styles.rowValue}>
          {prefs?.isPremium ? 'Premium' : 'Free'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.rowLabel}>AI backend</Text>
        <Text style={[styles.rowValue, { flexShrink: 1, textAlign: 'right' }]}>
          {aiStatus}
        </Text>
      </View>

      <Pressable style={styles.btn} onPress={() => router.push('/paywall')}>
        <Text style={styles.btnText}>View Premium · $2.99/mo</Text>
      </Pressable>

      <Pressable style={styles.btnGhost} onPress={togglePremiumDev}>
        <Text style={styles.btnGhostText}>
          Dev: toggle premium (no billing yet)
        </Text>
      </Pressable>

      <Text style={styles.fine}>
        Package: com.nightbound.app{'\n'}
        Voice: System TTS · Content: soft literary only{'\n'}
        Medical disclaimer: not a treatment for insomnia.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.lg,
  },
  kicker: { ...typography.label, color: colors.accent },
  title: { ...typography.title, color: colors.text, marginTop: spacing.sm },
  body: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  rowLabel: { color: colors.textMuted },
  rowValue: { color: colors.accent, fontWeight: '600' },
  btn: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radii.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  btnText: { color: colors.bg, fontWeight: '700' },
  btnGhost: {
    paddingVertical: 14,
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnGhostText: { color: colors.textDim, fontSize: 13 },
  fine: {
    marginTop: spacing.xl,
    color: colors.textDim,
    fontSize: 12,
    lineHeight: 18,
  },
});
