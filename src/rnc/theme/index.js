import { DefaultTheme } from 'react-native-ios-kit';
import { createTheming } from '../themeProvider';

export const { ThemeProvider, withTheme, useTheme } =
  createTheming(DefaultTheme);
