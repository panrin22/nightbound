import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import { setPrefs } from '@/lib/storage';

const FEATURES = [
  'Unlimited stories every night',
  'All moods unlocked (Nature, Literary…)',
  'Sleep timer + library favorites',
  'Cancel anytime in Google Play',
];

export default function PaywallScreen() {
  const onSubscribe = () => {
    // MVP stub — wire Play Billing + RevenueCat later
    Alert.alert(
      'Play Billing next',
      'Subscription product premium_monthly @ $2.99 will use Google Play Billing. For now you can enable Premium in Settings (dev toggle).',
      [
        { text: 'Open Settings', onPress: () => router.replace('/(tabs)/settings') },
        { text: 'OK', style: 'cancel' },
      ]
    );
  };

  const onTrialDev = async () => {
    await setPrefs({ isPremium: true });
    Alert.alert('Premium enabled (dev)', 'Enjoy unlimited stories.');
    router.back();
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>NIGHTBOUND PREMIUM</Text>
      <Text style={styles.title}>Tonight’s story is waiting.</Text>
      <Text style={styles.price}>$2.99 / month</Text>
      <Text style={styles.trial}>7‑day free trial · cancel anytime</Text>

      {FEATURES.map((f) => (
        <View key={f} style={styles.featureRow}>
          <Text style={styles.bullet}>✦</Text>
          <Text style={styles.feature}>{f}</Text>
        </View>
      ))}

      <Pressable style={styles.cta} onPress={onSubscribe}>
        <Text style={styles.ctaText}>Start free trial</Text>
      </Pressable>

      <Pressable style={styles.ghost} onPress={onTrialDev}>
        <Text style={styles.ghostText}>Dev: unlock premium now</Text>
      </Pressable>

      <Text style={styles.fine}>
        Soft literary content only. Not a medical sleep treatment. Billing via
        Google Play when live.
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
  title: {
    ...typography.hero,
    fontSize: 28,
    color: colors.text,
    marginTop: spacing.sm,
  },
  price: {
    marginTop: spacing.lg,
    fontSize: 32,
    color: colors.accent,
    fontWeight: '300',
  },
  trial: { color: colors.textMuted, marginTop: 4, marginBottom: spacing.xl },
  featureRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: { color: colors.accent, marginTop: 2 },
  feature: { color: colors.text, flex: 1, lineHeight: 22 },
  cta: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  ctaText: { color: colors.bg, fontWeight: '700', fontSize: 16 },
  ghost: {
    marginTop: spacing.sm,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ghostText: { color: colors.textDim, fontSize: 13 },
  fine: {
    marginTop: spacing.lg,
    color: colors.textDim,
    fontSize: 12,
    lineHeight: 18,
  },
});
