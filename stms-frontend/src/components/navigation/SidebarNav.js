import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School'; // For Students
import BookIcon from '@mui/icons-material/Book'; // For Subjects
import GradeIcon from '@mui/icons-material/Grade'; // For Grades
import EventNoteIcon from '@mui/icons-material/EventNote'; // For Timetable
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // For Fees
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // For Grade Entry

import { NavLink as RouterNavLink } from 'react-router-dom';

// TODO: Replace with actual role from auth context
const userRole = 'admin'; // Example roles: 'admin', 'teacher', 'student', 'parent'


const NavLinkBehavior = React.forwardRef((props, ref) => (
  <RouterNavLink
    ref={ref}
    {...props}
    style={({ isActive }) => ({
      textDecoration: 'none',
      color: 'inherit',
      ...(isActive && !props.isparent ? { // Do not apply active style to parent if it's just a collapse trigger
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        // borderRight: '3px solid ' + (props.theme?.palette?.primary?.main || '#1976d2'), // Example active indicator
      } : {}),
      ...props.style,
    })}
    // Close drawer on item click for mobile
    onClick={(e) => {
      if (props.onClick) props.onClick(e);
      if (props.handleDrawerToggle) {
        const drawer = document.querySelector('.MuiDrawer-paper');
        if (drawer && window.getComputedStyle(drawer).getPropertyValue('position') === 'fixed') {
          props.handleDrawerToggle();
        }
      }
    }}
  />
));

const SidebarNavItem = ({ item, handleDrawerToggle }) => {
  const [open, setOpen] = React.useState(false);

  if (item.roles && !item.roles.includes(userRole)) {
    return null; // Don't render if user role doesn't match
  }

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
    }
  };

  if (item.children) {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <SidebarNavItem key={child.text} item={child} handleDrawerToggle={handleDrawerToggle} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
        disablePadding
        component={NavLinkBehavior}
        to={item.path}
        handleDrawerToggle={handleDrawerToggle}
        isparent={!!item.children} // Pass this to NavLinkBehavior
    >
      <ListItemButton sx={{ py: 1.5, pl: item.isChild ? 4 : 2  }}> {/* Indent child items */}
        <ListItemIcon sx={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
};


const navConfig = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['admin', 'teacher', 'student', 'parent', 'super_admin'] },
  {
    text: 'User Management',
    icon: <PeopleIcon />,
    path: '/users',
    roles: ['admin', 'super_admin']
  },
  {
    text: 'Academic Management',
    icon: <SchoolIcon />,
    roles: ['admin', 'teacher', 'student', 'parent', 'super_admin'],
    children: [
      { text: 'Subjects', icon: <BookIcon />, path: '/subjects', isChild: true, roles: ['admin', 'teacher', 'super_admin'] },
      { text: 'Grade Entry', icon: <AssignmentTurnedInIcon />, path: '/grades/entry', isChild: true, roles: ['admin', 'teacher', 'super_admin'] },
      { text: 'My Grades', icon: <GradeIcon />, path: '/my-grades', isChild: true, roles: ['student', 'parent'] },
      // Add other academic links here with roles
    ]
  },
  { text: 'Students Records', icon: <SchoolIcon />, path: '/students', roles: ['admin', 'teacher', 'super_admin'] }, // Example path
  { text: 'Timetable', icon: <EventNoteIcon />, path: '/timetable', roles: ['admin', 'teacher', 'student', 'super_admin'] }, // Example path
  { text: 'Fees Management', icon: <AccountBalanceWalletIcon />, path: '/fees', roles: ['admin', 'super_admin'] }, // Example path
];

const settingsNavItems = [
  { text: 'System Settings', icon: <SettingsIcon />, path: '/system-settings', roles: ['admin', 'super_admin'] }, // Example
];


const SidebarNav = ({ handleDrawerToggle }) => {
  return (
    <div>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 64 }}>
        <Typography variant="h6" component="div">
          SMS Portal
        </Typography>
      </Box>
      <Divider />
      <List component="nav">
        {navConfig.map((item) => (
          <SidebarNavItem key={item.text} item={item} handleDrawerToggle={handleDrawerToggle} />
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List component="nav">
        {settingsNavItems.map((item) => (
          <SidebarNavItem key={item.text} item={item} handleDrawerToggle={handleDrawerToggle} />
        ))}
      </List>
    </div>
  );
};

export default SidebarNav;
