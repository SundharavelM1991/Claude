export const Colors = {
  // ─── Primary — Teal Blue ───────────────────────────────────────────────────
  primary: '#0A7EA4',
  primaryDark: '#065E7C',
  primaryDarker: '#044A61',
  primaryLight: '#38A8C8',
  primaryLighter: '#7FCDE0',
  primarySurface: '#E6F4F9',
  primarySurface2: '#CCE9F3',

  // ─── Semantic — Success (Check-in status) ─────────────────────────────────
  success: '#10B981',
  successDark: '#059669',
  successLight: '#34D399',
  successSurface: '#ECFDF5',

  // ─── Semantic — Warning (Reminders) ───────────────────────────────────────
  warning: '#F59E0B',
  warningDark: '#D97706',
  warningLight: '#FCD34D',
  warningSurface: '#FFFBEB',

  // ─── Semantic — Danger (Incidents) ────────────────────────────────────────
  danger: '#EF4444',
  dangerDark: '#DC2626',
  dangerLight: '#F87171',
  dangerSurface: '#FEF2F2',

  // ─── Semantic — Info (Forms / Messages) ───────────────────────────────────
  info: '#6366F1',
  infoDark: '#4F46E5',
  infoLight: '#818CF8',
  infoSurface: '#EEF2FF',

  // ─── Neutral — Surface Hierarchy ──────────────────────────────────────────
  background: '#F8FAFC',       // Page background
  surface: '#FFFFFF',          // Card / sheet
  surfaceElevated: '#FFFFFF',  // Modal / bottom sheet
  surfaceSubtle: '#F1F5F9',    // Section background, disabled

  // ─── Neutral — Text ───────────────────────────────────────────────────────
  textPrimary: '#0F172A',      // Slate 900 — headings, names
  textSecondary: '#475569',    // Slate 600 — sub-labels, descriptions
  textTertiary: '#94A3B8',     // Slate 400 — timestamps, placeholders
  textDisabled: '#CBD5E1',     // Slate 300
  textInverse: '#FFFFFF',      // On dark/colored backgrounds
  textLink: '#0A7EA4',         // Same as primary

  // ─── Neutral — Borders & Dividers ─────────────────────────────────────────
  border: '#E2E8F0',           // Slate 200 — card borders
  borderLight: '#F1F5F9',      // Slate 100 — subtle dividers
  divider: '#EDF2F7',

  // ─── Navigation ───────────────────────────────────────────────────────────
  tabBar: '#FFFFFF',
  tabBarActive: '#0A7EA4',
  tabBarInactive: '#94A3B8',

  // ─── Gradient Pairs ───────────────────────────────────────────────────────
  gradientPrimaryStart: '#0A7EA4',
  gradientPrimaryEnd: '#065E7C',
  gradientHeroStart: '#0A7EA4',
  gradientHeroEnd: '#0369A1',
  gradientCardStart: '#38A8C8',
  gradientCardEnd: '#0A7EA4',

  // ─── Overlay & Scrim ──────────────────────────────────────────────────────
  overlay: 'rgba(15, 23, 42, 0.5)',
  overlayLight: 'rgba(15, 23, 42, 0.2)',
  shimmer: '#E2E8F0',
  shimmerHighlight: '#F8FAFC',

  // ─── Shadow ───────────────────────────────────────────────────────────────
  shadowColor: '#0F172A',
  shadowPrimary: 'rgba(10, 126, 164, 0.25)',
};

export type ColorKey = keyof typeof Colors;
