import { useState, useMemo, useContext } from 'react';
import { Card, Collapse, Grid, Typography } from '@mui/material';

import { Task } from './Task';
import { AccordionWrap } from 'components/ui/AccordionWrap';
import { CheckboxBtn } from 'components/ui/CheckboxBtn';
import { filterTasks } from 'components/libs/helpers';
import { TaskContext } from 'components/store/task/slice';

export function TaskList() {
  const tasksContext = useContext(TaskContext);

  const [showTodayTask, setShowTodayTasks] = useState(true);
  function toggleShowTodayTasks() {
    setShowTodayTasks(!showTodayTask);
  }
  const { todayTasks, otherDaysTasks } = useMemo(
    () => filterTasks(tasksContext!.tasks),
    [tasksContext]
  );

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
        <Card elevation={16} sx={{ padding: '15px', borderRadius: '20px', width: '100%' }}>
          {todayTasks?.map(({ id, taskList }) => (
            <Task toggleTaskStatus={tasksContext!.toggleStatus} key={id} taskList={taskList} />
          ))}
        </Card>
      </Collapse>

      {otherDaysTasks.map(({ id, date, taskList }) => (
        <AccordionWrap key={id} date={date}>
          <Task toggleTaskStatus={tasksContext!.toggleStatus} taskList={taskList} />
        </AccordionWrap>
      ))}
    </>
  );
}