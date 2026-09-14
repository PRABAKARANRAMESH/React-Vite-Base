// theme/themeBuilder.ts
import { createTheme, type Theme } from '@mui/material/styles';
import { themeConfigs, getLightPalette, getDarkPalette } from './palette';
import typography from './typography';
import components from './components';

export interface ThemeSettings {
  theme: string;
  mode: 'light' | 'dark' | 'system';
  direction: 'ltr' | 'rtl';
  borderRadius: number;
}

export const buildTheme = (settings: ThemeSettings): Theme => {
  const { theme: themeName, mode, direction, borderRadius } = settings;
  
  // Find theme configuration
  const themeConfig = themeConfigs.find(config => config.name === themeName) || themeConfigs[0];
  
  // Determine actual mode (handle system mode)
  const actualMode = mode === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode;

  // Get appropriate palette
  const palette = actualMode === 'dark' 
    ? getDarkPalette(themeConfig)
    : getLightPalette(themeConfig);

  // Create theme
  const theme = createTheme({
    cssVariables: true,
    direction,
    palette,
    typography,
    shape: {
      borderRadius,
    },
    shadows: [
      'none',
      '0px 1px 2px rgba(0, 0, 0, 0.05)',
      '0px 1px 3px rgba(0, 0, 0, 0.1)',
      '0px 1px 8px rgba(0, 0, 0, 0.1)',
      '0px 1px 10px rgba(0, 0, 0, 0.1)',
      '0px 1px 14px rgba(0, 0, 0, 0.1)',
      '0px 1px 18px rgba(0, 0, 0, 0.1)',
      ...Array(18).fill('none'),
    ] as any,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  // Add component overrides
  theme.components = components(theme);

  return theme;
};

// Hook to get current system preference
export const useSystemMode = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};