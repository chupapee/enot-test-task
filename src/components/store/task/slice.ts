/* eslint-disable no-case-declarations */
import { createContext } from 'react';
import { INewTask, ITask, ITaskList } from 'components/libs/types';

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

interface IAction {
  type: 'ToggleStatus' | 'AddTask';
  toggledTask?: ITask;
  newTask?: INewTask;
}

export const tasksReducer = (state: ITaskList, {type, newTask, toggledTask}: IAction) => {
  const stateCopy: ITaskList = structuredClone(state); // deep cloning
  switch (type) {
    // toggle
    case 'ToggleStatus':
      const changedTaskList = stateCopy
        .filter(({ id }) => id === toggledTask!.parentId)[0].taskList;
      const changedTask = changedTaskList.filter(
        ({ id, parentId }) => id === toggledTask!.id && parentId === toggledTask!.parentId)[0];
      changedTask.isDone = !changedTask.isDone;
      return stateCopy;
    // add
    case 'AddTask':
      // const stateCopy = structuredClone(state);
      const exsistedTasksDate = stateCopy
        .filter(({ date }) => date.toLocaleDateString() === new Date(newTask!.date).toLocaleDateString());
      if (exsistedTasksDate.length) {
        const { id: parentId, taskList } = exsistedTasksDate[0];
        const id = taskList[taskList.length - 1].id + 1;
        const fullNewTask: ITask = { ...newTask!, isDone: false, parentId, id };
        exsistedTasksDate[0].taskList.push(fullNewTask);
        return stateCopy;
      } else {
        const parentId = stateCopy[stateCopy.length - 1].id + 1;
        const fullNewTask: ITask = { ...newTask!, parentId, isDone: false, id: 1 };
        const newTaskList = { id: parentId, date: new Date(newTask!.date), taskList: [fullNewTask] };
        stateCopy.push(newTaskList);
        return stateCopy;
      }
    default: return state;
  }
};

interface ITaskContext {
  tasks: ITaskList;
  toggleStatus: (taskInfo: ITask) => void;
  addTask: (task: INewTask) => void;
}

export const TaskContext = createContext<ITaskContext | null>(null);