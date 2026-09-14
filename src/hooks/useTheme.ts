// hooks/useTheme.ts
import { useMemo } from 'react';
import { useAppSelector, type RootState } from '@/store/store';
import { buildTheme, type ThemeSettings } from '@/theme/themeBuilder';
import { useSystemMode } from '@/theme/themeBuilder';

export const useTheme = () => {
  const customizer = useAppSelector((state:RootState) => state.customizer);
  const systemMode = useSystemMode();

  const themeSettings: ThemeSettings = useMemo(() => ({
    theme: customizer.activeTheme,
    mode: customizer.activeMode,
    direction: customizer.activeDir,
    borderRadius: customizer.borderRadius,
    
  }), [customizer]);

  const theme = useMemo(() => {
    return buildTheme(themeSettings);
  }, [themeSettings]);

  // Get actual mode (resolves system mode)
  const actualMode = customizer.activeMode === 'system' ? systemMode : customizer.activeMode;

  return {
    theme,
    mode: actualMode,
    settings: themeSettings,
  };
};