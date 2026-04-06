// Figma Design System — Flazers Colors
// Derived from Figma frames: bg #F8F9FA, green #21C05D, dark #0F172A, secondary #64748B

export const Colors = {
  // Primary
  primary: '#21C05D',
  primaryDark: '#006E2F',
  primaryLight: '#DCFCE7',
  primaryBg: '#F0FDF4',

  // Screen backgrounds
  screenBg: '#F8F9FA',
  white: '#FFFFFF',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',

  // Neutrals
  gray10: '#F8FAFC',
  gray20: '#E2E8F0',
  gray30: '#CBD5E1',
  gray50: '#94A3B8',
  gray70: '#64748B',

  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  // Semantic
  success: '#21C05D',
  successBg: '#ECFDF5',
  successText: '#15803D',
  warning: '#B45309',
  warningBg: '#FEF3C7',
  info: '#3B82F6',
  infoBg: '#EFF6FF',
  error: '#EF4444',

  // Shadows
  shadow: 'rgba(0,0,0,0.08)',
  shadowLight: 'rgba(0,0,0,0.05)',

  // Bottom nav
  navBg: '#FFFFFF',
  navBorder: '#F1F5F9',
} as const;

export type ColorKey = keyof typeof Colors;
