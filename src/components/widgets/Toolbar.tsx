import { Grid, Typography } from '@mui/material';
import { SettingsMenu } from 'components/ui/SettingsMenu';

export function Toolbar() {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography sx={{ fontSize: '26px', fontWeight: 'bold' }} ml='2px'>
        To Do
      </Typography>
      <SettingsMenu />
    </Grid>
  );
}