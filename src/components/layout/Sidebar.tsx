import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Dashboard, ReportProblem, Receipt, Assignment, People } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface SubItem {
  text: string;
  link: string;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  link?: string;
  subItems?: SubItem[];
}

const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string>('');

  const handleClick = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? '' : menu));
  };

  const menuItems: MenuItem[] = [
    { 
      text: 'Dashboard', 
      icon: <Dashboard sx={{ color: '#1976d2' }} />, // Blue
      link: '/dashboard' 
    },
    {
      text: 'Complaints',
      icon: <ReportProblem sx={{ color: '#d32f2f' }} />, // Red
      subItems: [
        { text: 'New Complaint', link: '/complaint/new' },
        { text: 'Manage Complaints', link: '/complaint' },
      ],
    },
    {
      text: 'Bills',
      icon: <Receipt sx={{ color: '#388e3c' }} />, // Green
      subItems: [
        { text: 'View Bills', link: '/bills/view' },
        { text: 'Payment History', link: '/bills/history' },
      ],
    },
    {
      text: 'Request',
      icon: <Assignment sx={{ color: '#f57c00' }} />, // Orange
      subItems: [
        { text: 'New Request', link: '/request/new' },
        { text: 'Track Request', link: '/request/track' },
      ],
    },
    {
      text: 'User',
      icon: <People sx={{ color: '#6a1b9a' }} />, // Purple
      subItems: [
        { text: 'Add User', link: '/user/add' },
        { text: 'User List', link: '/user' },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          backgroundColor: '#e2e8f0',
          padding: 2,
        },
      }}
    >
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          ZAWA System
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <Box key={item.text}>
            <ListItem disablePadding>
              {item.subItems ? (
                <ListItemButton onClick={() => handleClick(item.text)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {openMenu === item.text ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              ) : (
                <ListItemButton component={Link} to={item.link!}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </ListItem>

            {/* Collapse subItems */}
            {item.subItems && (
              <Collapse in={openMenu === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {item.subItems.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding>
                      <ListItemButton component={Link} to={subItem.link}>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
