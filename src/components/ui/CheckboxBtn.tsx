import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Checkbox, CheckboxProps } from '@mui/material';

export function CheckboxBtn(props: CheckboxProps) {
  return (
    <Checkbox
      {...props}
      icon={<CheckBoxIcon />}
      inputProps={{ 'aria-label': 'controlled' }}
      checkedIcon={<CheckBoxOutlineBlank />}
      sx={{
        borderRadius: '20px',
        '&.Mui-checked': {
          color: 'secondary.main',
        },
      }}
    />
  );
}