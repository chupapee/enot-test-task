/* eslint-disable no-case-declarations */
import { DispatchType, ITaskList, ReducerType, ThemeType } from 'components/libs/types';
import { createContext } from 'react';

// tasks state
export const TOGGLE_STATUS_TYPE = 'toggle_status';
export const initTasks: ITaskList = [
  {
    id: 1,
    date: new Date(),
    taskList: [
      {
        id: 1,
        parentId: 1,
        title: 'Visit David',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'high',
        isDone: false,
      },
      {
        id: 2,
        parentId: 1,
        title: 'Goseries for dinner',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'mid',
        isDone: false,
      },
      {
        id: 3,
        parentId: 1,
        title: "Fix Dad's iPad",
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'low',
        isDone: true,
      },
    ],
  },
  {
    id: 2,
    date: new Date('2023-01-12'),
    taskList: [
      {
        id: 1,
        parentId: 2,
        title: 'Goseries for dinner',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'mid',
        isDone: false,
      },
      {
        id: 2,
        parentId: 2,
        title: 'Goseries for dinner',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'mid',
        isDone: true,
      },
      {
        id: 3,
        parentId: 2,
        title: 'Goseries for dinner',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'mid',
        isDone: true,
      },
    ],
  },
  {
    id: 3,
    date: new Date('2023-01-15'),
    taskList: [
      {
        id: 1,
        parentId: 3,
        title: "Fix Dad's iPad",
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'mid',
        isDone: true,
      },
      {
        id: 2,
        parentId: 3,
        title: 'Write code',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'high',
        isDone: false,
      },
    ],
  },
  {
    id: 4,
    date: new Date('2023-02-10'),
    taskList: [
      {
        id: 1,
        parentId: 4,
        title: "Fix Dad's iPad",
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'mid',
        isDone: false,
      },
      {
        id: 2,
        parentId: 4,
        title: 'Write code',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'high',
        isDone: true,
      },
      {
        id: 3,
        parentId: 4,
        title: 'Do smth',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, dolores!',
        importance: 'low',
        isDone: true,
      },
    ],
  },
];

export const tasksReducer: ReducerType<ITaskList, { id: number, parentId: number; }> =
(state: ITaskList, { type, payload }) => {
  switch (type) {
    case TOGGLE_STATUS_TYPE:
      const stateCopy: ITaskList = structuredClone(state); // deep cloning
      const changedTaskList = stateCopy.filter(({ id }) => id === payload.parentId)[0].taskList;
      const changedTask = changedTaskList.filter(
        ({ id, parentId }) => id === payload.id && parentId === payload.parentId)[0];
        changedTask.isDone = !changedTask.isDone;
        return stateCopy;
        default: return state;
      }
    };

// theme state
export const TOGGLE_THEME_TYPE = 'toggle_theme';
export const initTheme: ThemeType = localStorage.getItem('theme') as ThemeType ?? 'dark';

export const themeReducer: ReducerType<ThemeType, ThemeType> = (state, { type }) => {
  if (type === TOGGLE_THEME_TYPE) {
    const toggledTheme = state === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', toggledTheme);
    return toggledTheme;
  }
  return state;
};

interface IThemeContext {
  theme: ThemeType;
  setTheme: DispatchType;
}

export const ThemeContext = createContext<IThemeContext>({ theme: initTheme, setTheme: () => null });

// news visibility state
export const TOGGLE_NEWS_TYPE = 'toggle_news';
export const initNewsVisibility = true;

export const newsReducer: ReducerType<boolean, boolean> = (state, { type }) => {
  if (type === TOGGLE_NEWS_TYPE) {
    return !state;
  }
  return state;
};

interface INewsContext {
  isNewsVisible: boolean;
  setIsNewsVisible: DispatchType
}

export const NewsContext = createContext<INewsContext>({ isNewsVisible: initNewsVisibility, setIsNewsVisible: () => null });