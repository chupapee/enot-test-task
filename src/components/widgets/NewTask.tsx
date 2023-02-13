import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { INewTask } from 'components/libs/types';
import { TaskContext } from 'components/store/task/slice';
import { ChangeEvent, useContext, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  p: 5,
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

interface IProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

type EventType = {
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<"low" | "mid" | "high">,
  field: 'title' | 'description' | 'date' | 'importance';
};

export function NewTask({ active, setActive }: IProps) {
  const taskContext = useContext(TaskContext);

  const [form, setForm] = useState<INewTask>({ title: '', description: '', date: '', importance: 'low' });
  const [error, setError] = useState(false);

  function handleChange({e, field}: EventType) {
    setForm({ ...form, [field]: e.target.value });
  }

  function confirmTask() {
    if (form.title.length && form.description.length && form.date.length) {
      taskContext!.addTask(form);

      closePopup();
    } else {
      setError(true);
    }
  }

  function closePopup() {
    setForm({ title: '', description: '', date: '', importance: 'low' });
    setError(false);
    setActive(false);
  }

  return (
    <Modal
      open={active}
      onClose={closePopup}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Card elevation={16} sx={style}>
        <Typography>New Task</Typography>
        <TextField
          required
          value={form.title}
          onChange={(e) => handleChange({e, field: 'title'})}
          label='Title'
          color='secondary'
          variant='standard'
        />
        <TextField
          required
          value={form.description}
          onChange={(e) => handleChange({e, field: 'description'})}
          label='Description'
          color='secondary'
          variant='standard'
        />
        <TextField
          required
          type='date'
          value={form.date}
          onChange={(e) => handleChange({e, field: 'date'})}
          color='secondary'
          variant='standard'
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id='demo-simple-select-autowidth-label'>Importance</InputLabel>
          <Select
            color='primary'
            value={form.importance}
            onChange={(e) => handleChange({e, field: 'importance'})}
            fullWidth
            variant='standard'
            label='Importance'
          >
            <MenuItem value={'low'}>low</MenuItem>
            <MenuItem value={'mid'}>mid</MenuItem>
            <MenuItem value={'high'}>high</MenuItem>
          </Select>
        </FormControl>
        {error && (
          <Typography sx={{ color: 'red', fontSize: '18px', marginTop: '-25px' }}>
            Fill in all the fields, please
          </Typography>
        )}
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Button onClick={closePopup} fullWidth color='secondary' variant='text'>
            reset
          </Button>
          <Button onClick={confirmTask} fullWidth sx={{ ml: '15px' }} variant='contained'>
            save
          </Button>
        </Box>
      </Card>
    </Modal>
  );
}