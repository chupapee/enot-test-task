/* eslint-disable no-case-declarations */
import { ThemeType } from 'components/libs/types';
import { createContext } from 'react';

export const initTheme: ThemeType = (localStorage.getItem('theme') as ThemeType) ?? 'dark';

interface IAction {
  type: 'toggle_theme';
}

export const themeReducer = (state: ThemeType, { type }: IAction) => {
  if (type === 'toggle_theme') {
    const toggledTheme = state === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', toggledTheme);
    return toggledTheme;
  }
  return state;
};

interface IThemeContext {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
