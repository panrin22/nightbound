/** Nightbound — soft literary dark theme (sleep-first) */
export const colors = {
  bg: '#0B0D12',
  bgElevated: '#141820',
  bgCard: '#1A1F2B',
  border: '#2A3142',
  text: '#E8E4DC',
  textMuted: '#9A9488',
  textDim: '#6B6570',
  accent: '#C4A574', // warm amber
  accentSoft: '#8B7355',
  accentGlow: 'rgba(196, 165, 116, 0.15)',
  danger: '#C47A7A',
  success: '#7A9E8A',
  overlay: 'rgba(11, 13, 18, 0.85)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const typography = {
  hero: { fontSize: 32, fontWeight: '300' as const, letterSpacing: 1.2 },
  title: { fontSize: 22, fontWeight: '500' as const, letterSpacing: 0.4 },
  body: { fontSize: 17, fontWeight: '400' as const, lineHeight: 28 },
  story: { fontSize: 18, fontWeight: '400' as const, lineHeight: 32, letterSpacing: 0.3 },
  caption: { fontSize: 13, fontWeight: '400' as const, letterSpacing: 0.2 },
  label: { fontSize: 12, fontWeight: '600' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
};
