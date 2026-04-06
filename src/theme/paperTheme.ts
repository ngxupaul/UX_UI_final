import { MD3LightTheme } from 'react-native-paper';
import { Colors } from './colors';

export const PaperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    primaryContainer: Colors.primaryLight,
    secondary: Colors.info,
    background: Colors.screenBg,
    surface: Colors.cardBg,
    surfaceVariant: Colors.gray20,
    error: Colors.error,
    onPrimary: Colors.white,
    onBackground: Colors.textPrimary,
    onSurface: Colors.textPrimary,
    outline: Colors.gray30,
  },
};
