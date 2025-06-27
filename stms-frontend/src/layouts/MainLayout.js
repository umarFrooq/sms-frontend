import React, { useState } from 'react';
import { Box, Drawer, CssBaseline, Toolbar } from '@mui/material';
import Header from '../components/navigation/Header';
import SidebarNav from '../components/navigation/SidebarNav';

const drawerWidth = 250; // Adjusted drawer width slightly

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = <SidebarNav handleDrawerToggle={handleDrawerToggle} />;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation sidebar"
      >
        {/* Temporary Drawer for mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              // backgroundColor: (theme) => theme.palette.background.paper, // Optional: can set a specific bg for drawer
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Permanent Drawer for desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              // backgroundColor: (theme) => theme.palette.background.paper,
            },
          }}
          open // Permanent drawer is always open on larger screens
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 }, // Responsive padding
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Toolbar /> {/* Spacer for the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
