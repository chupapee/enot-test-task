import { useContext, useState } from 'react';

import { Button, Menu, MenuItem, Fade, Tooltip, IconButton, Typography, Grid } from '@mui/material';
import {
  AddRounded,
  Brightness4Rounded,
  LightMode,
  Settings,
  VisibilityOffRounded,
} from '@mui/icons-material';
import { ThemeContext, TOGGLE_THEME_TYPE } from 'components/store';

export function SettingsMenu() {
  const { theme, dispatch } = useContext(ThemeContext);

  function toggleTheme() {
    dispatch({
      type: TOGGLE_THEME_TYPE,
      payload: theme,
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
        {/* add task */}
        <MenuItem onClick={closeMenu}>
          <Grid container flexDirection={'row'} alignItems='center'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              <AddRounded sx={{ width: '25px' }} />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '20px' }}>Add task</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        {/* news visibility */}
        <MenuItem onClick={closeMenu}>
          <Grid container flexDirection={'row'} alignItems='center'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              <VisibilityOffRounded sx={{ width: '25px' }} />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '20px' }}>Hide news</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        {/* theme mode */}
        <MenuItem onClick={toggleTheme}>
          <Grid container flexDirection={'row'} alignItems='center' justifyContent='end'>
            <Grid item sx={{ display: 'flex' }} mr={1}>
              {theme === 'dark' ? (
                <Brightness4Rounded sx={{ width: '25px' }} />
              ) : (
                <LightMode sx={{ width: '25px' }} />
              )}
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '20px' }}>{theme}</Typography>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </div>
  );
}