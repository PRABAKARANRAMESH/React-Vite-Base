// theme/palette.ts

import type { PaletteOptions } from "@mui/material";


// Theme definitions
export interface ThemeConfig {
  name: string;
  palette: {
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText?: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText?: string;
    };
  };
}

export const themeConfigs: ThemeConfig[] = [
  {
    name: 'BLUE_THEME',
    palette: {
      primary: {
        main: '#5D87FF',
        light: '#ECF2FF',
        dark: '#4570EA',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#49BEFF',
        light: '#E8F7FF',
        dark: '#23afdb',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'PURPLE_THEME',
    palette: {
      primary: {
        main: '#763EBD',
        light: '#F2ECF9',
        dark: '#6E35B7',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#49BEFF',
        light: '#E8F7FF',
        dark: '#23afdb',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'PINK_THEME',
    palette: {
      primary: {
        main: '#E91E63',
        light: '#FCE4EC',
        dark: '#C2185B',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#49BEFF',
        light: '#E8F7FF',
        dark: '#23afdb',
        contrastText: '#ffffff',
      },
    },
  },
];

// Complete palette for light mode
export const getLightPalette = (themeConfig: ThemeConfig): PaletteOptions => ({
  mode: 'light',
  ...themeConfig.palette,
  success: {
    main: '#13DEB9',
    light: '#E6FFFA',
    dark: '#02b3a9',
    contrastText: '#ffffff',
  },
  info: {
    main: '#539BFF',
    light: '#EBF3FE',
    dark: '#1682d4',
    contrastText: '#ffffff',
  },
  error: {
    main: '#D92D20',
    light: '#FFECEC',
    dark: '#f3704d',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#FFAE1F',
    light: '#FEF5E5',
    dark: '#ae8e59',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#F8FAFC',
    100: '#F2F6FA',
    200: '#EAEFF4',
    300: '#DFE5EF',
    400: '#7C8FAC',
    500: '#5A6A85',
    600: '#2A3547',
    700: '#1A202C',
    800: '#0F141E',
    900: '#05070B',
  },
  text: {
    primary: '#2A3547',
    secondary: '#5A6A85',
    disabled: '#A0AEC0',
  },
  divider: '#E2E8F0',
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  action: {
    active: '#5A6A85',
    hover: '#F2F6FA',
    selected: '#EAEFF4',
    disabled: '#A0AEC0',
    disabledBackground: '#F2F6FA',
    focus: '#EAEFF4',
  },
});

// Complete palette for dark mode
export const getDarkPalette = (themeConfig: ThemeConfig): PaletteOptions => ({
  mode: 'dark',
  ...themeConfig.palette,
  success: {
    main: '#13DEB9',
    light: '#E6FFFA',
    dark: '#02b3a9',
    contrastText: '#ffffff',
  },
  info: {
    main: '#539BFF',
    light: '#223662',
    dark: '#1682d4',
    contrastText: '#ffffff',
  },
  error: {
    main: '#D92D20',
    light: '#FFECEC',
    dark: '#f3704d',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#FFAE1F',
    light: '#4D3A2A',
    dark: '#ae8e59',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#0F141E',
    100: '#1A202C',
    200: '#2A3547',
    300: '#4A5568',
    400: '#718096',
    500: '#A0AEC0',
    600: '#CBD5E0',
    700: '#E2E8F0',
    800: '#EDF2F7',
    900: '#F7FAFC',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0AEC0',
    disabled: '#4A5568',
  },
  divider: '#2D3748',
  background: {
    default: '#0F141E',
    paper: '#1A202C',
  },
  action: {
    active: '#A0AEC0',
    hover: '#2A3547',
    selected: '#2D3748',
    disabled: '#4A5568',
    disabledBackground: '#2A3547',
    focus: '#2D3748',
  },
});