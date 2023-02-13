import { Box, Stack, Typography } from '@mui/material';

import { ITask } from 'components/libs/types';
import { StatusLine } from 'components/ui/StatusLine';
import { SwitchBtn } from 'components/ui/SwitchBtn';

enum IMPORTANCE_COLORS {
  low = 'yellow',
  mid = 'blue',
  high = 'red',
}

interface IProps {
  taskList: ITask[];
  toggleTaskStatus: (task: ITask) => void;
}

export function Task({ taskList, toggleTaskStatus }: IProps) {
  return (
    <>
      {taskList.map(({ id, parentId, title, description, importance, isDone }) => (
        <Box key={id} sx={{ marginBottom: '15px' }} onClick={(e) => e.stopPropagation()}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <StatusLine color={IMPORTANCE_COLORS[importance]} />
            <Box sx={{ maxWidth: '200px', width: '100%' }}>
              <Typography
                sx={{
                  textDecoration: isDone ? 'line-through' : 'default',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: 14,
                  color: 'gray',
                  fontWeight: 'bold',
                }}
              >
                {description}
              </Typography>
            </Box>
            <Box sx={{ marginLeft: 'auto !important', bgColor: 'transparent' }}>
              <SwitchBtn
                checked={isDone}
                onClick={() =>
                  toggleTaskStatus({ id, parentId, title, description, importance, isDone })
                }
              />
            </Box>
          </Stack>
        </Box>
      ))}
    </>
  );
}