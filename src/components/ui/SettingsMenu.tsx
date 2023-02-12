import { useContext, useState } from 'react';

import { Button, Menu, MenuItem, Fade, Tooltip, IconButton, Typography, Grid } from '@mui/material';
import {
  AddRounded,
  Brightness4Rounded,
  LightMode,
  Settings,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import { NewsContext, ThemeContext, TOGGLE_NEWS_TYPE, TOGGLE_THEME_TYPE } from 'components/store';

export function SettingsMenu() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    setTheme({
      type: TOGGLE_THEME_TYPE,
      payload: theme,
    });
  }

  const { isNewsVisible, setIsNewsVisible } = useContext(NewsContext);

  function toggleNewsVisibility() {
    setIsNewsVisible({
      type: TOGGLE_NEWS_TYPE,
      payload: isNewsVisible,
    });
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Tooltip title='Settings'>
          <IconButton
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Settings sx={{ width: 28, height: 30 }} />
          </IconButton>
        </Tooltip>
      </Button>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        TransitionComponent={Fade}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* news visibility */}
        <MenuItem onClick={toggleNewsVisibility}>
          <Grid container flexDirection={'row'} alignItems='center'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              {isNewsVisible ? (
                <VisibilityOffRounded fontSize='small' />
              ) : (
                <VisibilityRounded fontSize='small' />
              )}
            </Grid>
            <Grid item>
              <Typography>{isNewsVisible ? 'Hide news' : 'Show news'}</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        {/* add task */}
        <MenuItem onClick={closeMenu}>
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
        <MenuItem onClick={toggleTheme}>
          <Grid container flexDirection={'row'} alignItems='center' justifyContent='end'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              {theme === 'dark' ? (
                <Brightness4Rounded fontSize='small' />
              ) : (
                <LightMode fontSize='small' />
              )}
            </Grid>
            <Grid item>
              <Typography>{theme}</Typography>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </div>
  );
}