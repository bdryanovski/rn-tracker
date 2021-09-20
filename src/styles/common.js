import { StyleSheet, Appearance } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

let scheme = Appearance.getColorScheme();

console.log('Color Scheme', scheme);

// Set Dark for now
scheme = 'dark';

// Colors

const LightColors = {
  white: '#fff',
  black: '#000',

  primary: '#264653',
  accent: '#2A9D8F',
  background: '#e9ecef', // Light
  background200: '#adb5bd', // Darker
  danger: '#E76F51',
  success: '#6ED8CC',
  warning: '#E9C46A',

  // Border
  border: '#666666', // Darker
  border100: '#8c8c8c',
  border200: '#b3b3b3',
  border300: '#cccccc',
  border400: '#e8e8e8',
  border500: '#ffffff', // Lighter

  // Typography
  text: '#000000', // Darker
  text100: '#333333',
  text200: '#666666', // Lighter
};

const DarkColors = {
  white: '#fff',
  black: '#000',

  primary: '#244B06',
  accent: '#006466',

  background: '#212F45', // Light
  background200: '#272640', // Darker
  danger: '#CC2839',
  success: '#A5BF1F',
  warning: '#F58700',

  // Border
  border: '#0E161B', // Darker
  border100: '#17242B',
  border200: '#1B2A32',
  border300: '#495865',
  border400: '#566471',
  border500: '#6C7784', // Lighter

  // Typography
  text: '#8F9BA3', // Darker
  text100: '#ACBAC3',
  text200: '#EAEDF0', // Lighter
};

const BaseColors = {
  ...LightColors,
  textColor: LightColors.black,
  baseBackgroundColor: LightColors.background,
  primaryColor: '#EA6762',
  accentColor: LightColors.accent,
  cardColor: LightColors.background200,
  borderColor: '#E7E6E7',
  timelineHeadlineText: LightColors.text,
  contrastBackground: LightColors.background200,
  progressBackground: LightColors.background,
  progressColor: LightColors.primary,
};

const BlackColors = {
  ...DarkColors,
  textColor: DarkColors.text100,
  baseBackgroundColor: DarkColors.background,
  primaryColor: DarkColors.primary,
  accentColor: DarkColors.accent,
  cardColor: DarkColors.background200,
  borderColor: DarkColors.border300,
  timelineHeadlineText: DarkColors.white,
  contrastBackground: DarkColors.background200,
  progressBackground: DarkColors.white,
  progressColor: DarkColors.accent,
};

export const Colors =
  scheme === 'dark' ? { ...BaseColors, ...BlackColors } : BaseColors;

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryColor,
    background: Colors.baseBackgroundColor,
    card: Colors.cardColor,
    text: Colors.textColor,
    border: Colors.borderColor,
  },
};

export const ThemeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.baseBackgroundColor,
    primary: Colors.accent,
    text: Colors.text,
    card: Colors.cardColor,
    border: Colors.border,
  },
};

export const NavigationTheme = scheme === 'dark' ? ThemeDark : Theme;

const LightTheme = {
  // Shadow
  boxShadow: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.24,
  },

  // Radius
  smallRadius: {
    borderRadius: 3,
  },
  // Buttons
  horizontalButton: {
    height: 40,
  },

  // Timeline
  timelineHeader: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.accentColor,
    color: Colors.timelineHeadlineText,
  },

  // Button
  buttonNormal: {
    backgroundColor: Colors.accentColor,
    color: Colors.textColor,
  },

  buttonNavigation: {
    backgroundColor: Colors.accentColor,
    color: Colors.textColor,
    padding: 5,
  },

  buttonTimelineAddMore: {
    backgroundColor: Colors.accentColor,
    color: Colors.textColor,
    width: '35%',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 30,
  },

  // Typography

  // Headline
  headline: {
    color: Colors.textColor,
    textAlign: 'left',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    marginBottom: 20,
  },

  subheading: {
    color: Colors.textColor,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 2,
    letterSpacing: 0.5,
  },

  paragraph: {
    color: Colors.textColor,
    textAlign: 'left',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginBottom: 10,
    marginTop: 0,
  },

  caption: {
    color: Colors.textColor,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
};

const BlackTheme = {};

export default StyleSheet.create(
  scheme === 'dark' ? { ...LightTheme, ...BlackTheme } : LightTheme,
);
