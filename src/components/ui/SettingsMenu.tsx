import { useContext, useState } from 'react';

import { Menu, MenuItem, Fade, Tooltip, IconButton, Typography, Grid, Box } from '@mui/material';
import {
  AddRounded,
  Brightness4Rounded,
  LightMode,
  Settings,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@mui/icons-material';

import { NewTask } from 'components/widgets/NewTask';
import { ThemeContext } from 'components/store/theme/slice';
import { NewsContext } from 'components/store/news/slice';

export function SettingsMenu() {
  const themeContext = useContext(ThemeContext);
  const newsContext = useContext(NewsContext);

  const [activeTaskPopup, setActiveTaskPopup] = useState(false);
  function activateTaskPopup() {
    setActiveTaskPopup(true);
    closeMenu();
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        onClick={openMenu}
      >
        <Tooltip title='Settings'>
          <IconButton>
            <Settings sx={{ width: 28, height: 30 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        TransitionComponent={Fade}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* news visibility */}
        <MenuItem onClick={newsContext!.toggleNewsVisibility}>
          <Grid container flexDirection={'row'} alignItems='center'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              {newsContext!.isNewsVisible ? (
                <VisibilityOffRounded fontSize='small' />
              ) : (
                <VisibilityRounded fontSize='small' />
              )}
            </Grid>
            <Grid item>
              <Typography>{newsContext!.isNewsVisible ? 'Hide news' : 'Show news'}</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        {/* add task */}
        <MenuItem onClick={activateTaskPopup}>
          <Grid container flexDirection={'row'} alignItems='center' justifyContent='end'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              <AddRounded fontSize='small' />
            </Grid>
            <Grid item>
              <Typography>Add task</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        {/* theme mode */}
        <MenuItem onClick={themeContext!.toggleTheme}>
          <Grid container flexDirection={'row'} alignItems='center' justifyContent='end'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              {themeContext!.theme === 'dark' ? (
                <Brightness4Rounded fontSize='small' />
              ) : (
                <LightMode fontSize='small' />
              )}
            </Grid>
            <Grid item>
              <Typography>{themeContext!.theme}</Typography>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
      <NewTask active={activeTaskPopup} setActive={setActiveTaskPopup} />
    </div>
  );
}