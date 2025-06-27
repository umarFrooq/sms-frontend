import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Default user icon

const userNavigations = [
  { name: 'Profile', href: '/profile' }, // TODO: Update href later
  { name: 'Settings', href: '/settings' }, // TODO: Update href later
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

  const handleUserMenuAction = (action) => {
    handleCloseUserMenu();
    if (action === 'logout') {
      // TODO: Implement actual logout logic
      alert('Logout action triggered!');
      // For now, redirect to login, assuming AppRoutes handles this based on auth state
      // This might require context/state management to properly clear auth state
      window.location.href = '/login';
    }
    // Handle other actions like navigation if needed
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: (theme) => theme.shadows[1], // Softer shadow from theme
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }} // Only show on small screens
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Student Management System {/* Or your App Name */}
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open user menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {/* Placeholder for user avatar - replace with actual user data */}
              <Avatar alt="User Name" src="/static/images/avatar/2.jpg">
                 {/* Fallback if src is invalid or user has no image */}
                <AccountCircle />
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
                onClick={() => setting.action ? handleUserMenuAction(setting.action) : handleCloseUserMenu()}
                // component={setting.href ? RouterLink : 'div'} // If using react-router-dom for navigation
                // to={setting.href}
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
