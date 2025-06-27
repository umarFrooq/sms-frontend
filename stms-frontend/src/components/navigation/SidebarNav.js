import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import GradeIcon from '@mui/icons-material/Grade';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import { NavLink as RouterNavLink } from 'react-router-dom';

// TODO: Replace with actual role from auth context.
// This is a placeholder and will determine which links are shown.
// Possible roles: 'admin', 'super_admin', 'teacher', 'student', 'parent'
const userRole = 'admin';


const NavLinkBehavior = React.forwardRef((props, ref) => (
  <RouterNavLink
    ref={ref}
    {...props}
    style={({ isActive }) => ({
      textDecoration: 'none',
      color: 'inherit',
      ...(isActive && !props.isparent ? {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      } : {}),
      ...props.style,
    })}
    onClick={(e) => {
      if (props.onClick) props.onClick(e);
      if (props.handleDrawerToggle) { // For mobile: close drawer on item click
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

  // Role check: if item has roles defined and user's role is not among them, don't render
  if (item.roles && !item.roles.includes(userRole)) {
    return null;
  }

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
    }
  };

  if (item.children) { // This item has children, render as a collapsible section
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
              // Recursively render child items, passing necessary props
              <SidebarNavItem key={child.text} item={{...child, isChild: true}} handleDrawerToggle={handleDrawerToggle} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  // This item is a direct link
  return (
    <ListItem
        disablePadding
        component={NavLinkBehavior}
        to={item.path || '#'} // Fallback path if none provided
        handleDrawerToggle={handleDrawerToggle}
        isparent={!!item.children} // For NavLinkBehavior styling
    >
      <ListItemButton sx={{ py: 1.5, pl: item.isChild ? 4 : 2  }}> {/* Indent child items */}
        <ListItemIcon sx={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
};

// Define navigation structure with roles
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
    roles: ['admin', 'teacher', 'student', 'parent', 'super_admin'], // Parent role can see some children like "My Grades"
    children: [
      { text: 'Subjects', icon: <BookIcon />, path: '/subjects', roles: ['admin', 'teacher', 'super_admin'] },
      { text: 'Grade Entry', icon: <AssignmentTurnedInIcon />, path: '/grades/entry', roles: ['admin', 'teacher', 'super_admin'] },
      { text: 'My Grades', icon: <GradeIcon />, path: '/my-grades', roles: ['student', 'parent'] },
      // TODO: Add other academic links here with appropriate roles
      // { text: 'Attendance', icon: <SomeIcon />, path: '/attendance', roles: ['admin', 'teacher'] },
    ]
  },
  { text: 'Student Records', icon: <SchoolIcon />, path: '/students', roles: ['admin', 'teacher', 'super_admin'] },
  { text: 'Timetable', icon: <EventNoteIcon />, path: '/timetable', roles: ['admin', 'teacher', 'student', 'super_admin'] },
  { text: 'Fees Management', icon: <AccountBalanceWalletIcon />, path: '/fees', roles: ['admin', 'super_admin'] },
];

const settingsNavItems = [
  { text: 'System Settings', icon: <SettingsIcon />, path: '/system-settings', roles: ['admin', 'super_admin'] },
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
