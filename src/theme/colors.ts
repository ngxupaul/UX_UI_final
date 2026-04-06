// Figma Design System — Flazers Colors
// Derived from Figma screens (bg: rgb(248,249,250) = #F8F9FA, green: rgb(33,196,93) = #21C05D)

export const Colors = {
  // Primary
  primary: '#21C05D',
  primaryDark: '#16A34A',
  primaryLight: '#DCFCE7',

  // Neutrals
  white: '#FFFFFF',
  gray10: '#F8F9FA',
  gray20: '#E9ECEF',
  gray30: '#DEE2E6',
  gray50: '#ADB5BD',
  gray70: '#6C757D',
  gray90: '#212529',
  black: '#000000',

  // Semantic
  success: '#21C05D',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Screen backgrounds
  screenBg: '#F8F9FA',
  cardBg: '#FFFFFF',
  overlayGreen: 'rgba(220,252,231,0.5)',

  // Text
  textPrimary: '#000000',
  textSecondary: '#6C757D',
  textMuted: '#ADB5BD',
  textOnPrimary: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;
