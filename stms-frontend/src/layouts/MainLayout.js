import React, { useState } from 'react';
import { Box, Drawer, CssBaseline, Toolbar } from '@mui/material';
import Header from '../components/navigation/Header';
import SidebarNav from '../components/navigation/SidebarNav';

const drawerWidth = 240; // Standard drawer width

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <SidebarNav handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
        {/* Permanent Drawer for desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open // Permanent drawer is always open on larger screens
        >
          <SidebarNav />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: (theme) => theme.palette.background.default, // Use theme background
          minHeight: '100vh', // Ensure it takes full viewport height
        }}
      >
        <Toolbar /> {/* Spacer for the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
