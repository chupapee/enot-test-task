/* eslint-disable no-case-declarations */
import { createContext } from 'react';

export const initNewsVisibility = true;

interface IAction {
  type: 'toggle_news';
}

export const newsReducer = (state: boolean, { type }: IAction) => {
  if (type === 'toggle_news') {
    return !state;
  }
  return state;
};

interface INewsContext {
  isNewsVisible: boolean;
  toggleNewsVisibility: () => void;
}

export const NewsContext = createContext<INewsContext | null>(null);