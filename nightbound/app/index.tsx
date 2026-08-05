import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { colors } from '@/constants/theme';
import { getPrefs } from '@/lib/storage';

export default function Index() {
  const [ready, setReady] = useState(false);
  const [ageOk, setAgeOk] = useState(false);

  useEffect(() => {
    getPrefs().then((p) => {
      setAgeOk(p.ageConfirmed);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!ageOk) return <Redirect href="/age-gate" />;
  return <Redirect href="/(tabs)" />;
}
