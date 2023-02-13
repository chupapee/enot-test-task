export interface ITask {
  id: number;
  parentId: number;
  title: string;
  description: string;
  importance: 'low' | 'mid' | 'high';
  isDone: boolean;
}

export interface INewTask {
  title: string;
  description: string;
  date: string;
  importance: 'low' | 'mid' | 'high';
}

export type ITaskList = {
  id: number;
  date: Date;
  taskList: ITask[];
}[];

export interface IFilteredTasks {
  todayTasks: ITaskList;
  otherDaysTasks: ITaskList;
}

export interface INews {
  news: string;
}

export type ThemeType = 'dark' | 'light';