import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '@/constants/theme';
import { setPrefs } from '@/lib/storage';

export default function AgeGateScreen() {
  const confirm = async () => {
    await setPrefs({ ageConfirmed: true });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.inner}>
        <Text style={styles.kicker}>NIGHTBOUND</Text>
        <Text style={styles.title}>Stories for grown‑ups</Text>
        <Text style={styles.body}>
          Soft literary tales to quiet the mind—romance, mystery, memory, and
          dusk. Not for children. Not explicit. Built for sleep.
        </Text>
        <Text style={styles.notice}>
          You must be 18 or older to continue. Content is calm and literary;
          no graphic material.
        </Text>

        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          onPress={confirm}
        >
          <Text style={styles.btnText}>I am 18 or older</Text>
        </Pressable>

        <Text style={styles.fine}>
          By continuing you agree to use Nightbound for personal, non‑medical
          relaxation. Sleep is not guaranteed—only a gentler end to the day.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    gap: spacing.md,
  },
  kicker: { ...typography.label, color: colors.accent },
  title: { ...typography.hero, color: colors.text },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  notice: {
    ...typography.caption,
    color: colors.textDim,
    marginTop: spacing.md,
    lineHeight: 20,
  },
  btn: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnPressed: { opacity: 0.85 },
  btnText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  fine: {
    ...typography.caption,
    color: colors.textDim,
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});
