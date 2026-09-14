import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeName = 'BLUE_THEME' | 'PURPLE_THEME' | 'PINK_THEME';
export type Direction = 'ltr' | 'rtl';
interface StateType {
  activeDir: Direction;
  activeMode: ThemeMode;
  activeTheme: ThemeName; // BLUE_THEME,PURPLE_THEME,PINK_THEME
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  TopbarHeight?: number;
  isCollapse?: boolean;
  borderRadius: number | any;
  isMobileSidebar?: boolean;

}

const initialState: StateType = {
  activeDir: "ltr",
  activeMode: sessionStorage.getItem("mode") as ThemeMode || "system", 
  activeTheme: sessionStorage.getItem("theme") as ThemeName || "PURPLE_THEME", // BLUE_THEME, PURPLE_THEME,
  SidebarWidth: 240,
  MiniSidebarWidth: 76,
  TopbarHeight: 70,
  isCollapse: false, 
  borderRadius: 7,
  isMobileSidebar: false,


};

export const CustomizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setTheme: (state: StateType, action) => {
      state.activeTheme = action.payload;
    },
    setDarkMode: (state: StateType, action) => {
      state.activeMode = action.payload;
    },
    setDir: (state: StateType, action) => {
      state.activeDir = action.payload;
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    setBorderRadius: (state: StateType, action) => {
      state.borderRadius = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebar = !state.isMobileSidebar;
    },
  },

});

export const {
  setTheme,
  setDarkMode,
  setDir,
  toggleSidebar,
  setBorderRadius,
  toggleMobileSidebar
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
