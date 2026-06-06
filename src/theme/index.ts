export const Colors = {
  primary: '#6366F1',
  primaryDark: '#4338CA',
  primaryLight: '#818CF8',
  primarySurface: '#EEF2FF',
  primaryBorder: '#C7D2FE',
  secondary: '#F5A623',
  secondaryLight: '#FABB5C',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  background: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F4F8',

  text: '#1A2B4A',
  textSecondary: '#6B7C93',
  textLight: '#9CA8B8',
  textInverse: '#FFFFFF',

  border: '#E2E8F0',
  borderLight: '#F0F4F8',
  divider: '#EDF2F7',

  cardShadow: 'rgba(0, 0, 0, 0.08)',

  gradientStart: '#4338CA',
  gradientEnd: '#6366F1',

  tabBar: '#FFFFFF',
  tabBarActive: '#6366F1',
  tabBarInactive: '#9CA8B8',
};

export const Typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
  h2: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body1: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  body2: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
  label: { fontSize: 13, fontWeight: '500' as const, lineHeight: 18 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 100,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
