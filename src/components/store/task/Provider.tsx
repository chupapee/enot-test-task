import { INewTask, ITask } from 'components/libs/types';
import { useReducer } from 'react';
import { initTasks, TaskContext, tasksReducer } from './slice';

export function TaskProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [tasks, dispatchTask] = useReducer(tasksReducer, initTasks);

  function toggleTaskStatus(task: ITask) {
    dispatchTask({ type: 'ToggleStatus', toggledTask: task });
  }

  function addTask(task: INewTask) {
    dispatchTask({ type: 'AddTask', newTask: task });
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleStatus: toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}