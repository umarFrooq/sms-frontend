import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Corrected import name
// import { Link as RouterLink } from 'react-router-dom'; // For menu item navigation if needed

const userNavigations = [
  { name: 'Profile', href: '/profile', action: null }, // Placeholder, action: navigate
  { name: 'Settings', href: '/settings', action: null }, // Placeholder, action: navigate
  { name: 'Logout', action: 'logout' }, // Special action for logout
];

const Header = ({ drawerWidth, handleDrawerToggle }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuAction = (setting) => {
    handleCloseUserMenu();
    if (setting.action === 'logout') {
      // TODO: Implement actual logout logic (clear auth state, redirect)
      console.log('Logout action triggered!');
      alert('Logout functionality placeholder.');
      // For now, simple redirect. Proper logout needs auth context update.
      // window.location.href = '/login'; // This might be too abrupt, use navigate from react-router-dom via context
    } else if (setting.href) {
      // TODO: Navigate using react-router-dom, likely via context or passed navigate function
      console.log(`Navigate to ${setting.href}`);
      // navigate(setting.href); // Example if navigate function is available
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: (theme) => theme.shadows[1],
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Student Management System
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open user settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Name">
                <AccountCircleIcon /> {/* Default icon if no src */}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {userNavigations.map((setting) => (
              <MenuItem
                key={setting.name}
                onClick={() => handleUserMenuAction(setting)}
              >
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
