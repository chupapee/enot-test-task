import { useState, useReducer, useMemo } from 'react';
import { Card, Collapse, Grid, Typography } from '@mui/material';

import { Task } from './Task';
import { AccordionWrap } from 'components/ui/AccordionWrap';
import { CheckboxBtn } from 'components/ui/CheckboxBtn';
import { filterTasks } from 'components/libs/helpers';
import { initTasks, tasksReducer, TOGGLE_STATUS_TYPE } from 'components/store';

export function TaskList() {
  const [showTodayTask, setShowTodayTasks] = useState(true);
  function toggleShowTodayTasks() {
    setShowTodayTasks(!showTodayTask);
  }

  const [tasks, dispatch] = useReducer(tasksReducer, initTasks);
  function toggleTaskStatus({ id, parentId }: { id: number; parentId: number }): void {
    dispatch({
      type: TOGGLE_STATUS_TYPE,
      payload: { id, parentId },
    });
  }

  const { todayTasks, otherDaysTasks } = useMemo(() => filterTasks(tasks), [tasks]);

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item>
          <CheckboxBtn checked={!showTodayTask} onChange={toggleShowTodayTasks} />
        </Grid>
        <Grid item>
          <Typography>Today Tasks:</Typography>
        </Grid>
      </Grid>
      <Collapse in={showTodayTask}>
        <Card elevation={16} sx={{ padding: '15px', borderRadius: '20px' }}>
          {todayTasks?.map(({ id, taskList }) => (
            <Task toggleTaskStatus={toggleTaskStatus} key={id} taskList={taskList} />
          ))}
        </Card>
      </Collapse>

      {otherDaysTasks.map(({ id, date, taskList }) => (
        <AccordionWrap key={id} date={date}>
          <Task toggleTaskStatus={toggleTaskStatus} taskList={taskList} />
        </AccordionWrap>
      ))}
    </>
  );
}