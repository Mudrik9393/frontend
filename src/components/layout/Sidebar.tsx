import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Collapse,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  ReportProblem,
  Receipt,
  Assignment,
  People,
  Assessment,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import zawaLogo from '../../assets/image/zawa-logo.png';

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
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    console.log("Sidebar role found =>", storedRole);
    setRole(storedRole);
  }, []);

  const handleClick = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? '' : menu));
  };

  // Menu for Admin
  const adminMenu: MenuItem[] = [
    {
      text: 'Dashboard',
      icon: <Dashboard sx={{ color: '#1976d2' }} />,
      link: '/dashboard',
    },
    {
      text: 'Complaints',
      icon: <ReportProblem sx={{ color: '#d32f2f' }} />,
      subItems: [{ text: 'Manage Complaints', link: '/complaint' }],
    },
    {
      text: 'Request',
      icon: <Assignment sx={{ color: '#f57c00' }} />,
      subItems: [{ text: 'Track Request', link: '/request' }],
    },
    {
      text: 'User',
      icon: <People sx={{ color: '#6a1b9a' }} />,
      subItems: [{ text: 'User List', link: '/user' }],
    },
    {
      text: 'Report',
      icon: <Assessment sx={{ color: '#0288d1' }} />,
      subItems: [{ text: 'Overrall Report', link: '/report' }],
    },
  ];

  // Menu for Meter Reader
  const meterReaderMenu: MenuItem[] = [
    {
      text: 'Dashboard',
      icon: <Dashboard sx={{ color: '#1976d2' }} />,
      link: '/dashboard',
    },
    {
      text: 'Bills',
      icon: <Receipt sx={{ color: '#388e3c' }} />,
      subItems: [
        { text: 'Add Bill', link: '/calculation' },
        { text: 'View Bill', link: '/meterreaderbills' },
      ],
    },
  ];

  const menuItems =
    role === 'admin'
      ? adminMenu
      : role === 'meterreader'
      ? meterReaderMenu
      : [];

  // Show loading if role not yet loaded
  if (!role) {
    return (
      <Box sx={{ color: 'white', padding: 2 }}>
        Loading sidebar...
      </Box>
    );
  }

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
          backgroundColor: '#1e2235',
          padding: 2,
        },
      }}
    >
      <Box sx={{ mt: 10, mb: 4 }}>
        <Box className="flex items-center gap-3">
          <img src={zawaLogo} alt="ZAWA Logo" className="w-25 h-16" />
          <Typography variant="subtitle1" fontWeight="bold" className="text-white">
            ZACORE
          </Typography>
        </Box>
      </Box>

      <List>
        {menuItems.map((item) => (
          <Box key={item.text}>
            <ListItem disablePadding>
              {item.subItems ? (
                <ListItemButton onClick={() => handleClick(item.text)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: 'white' }} />
                  {openMenu === item.text ? (
                    <ExpandLess sx={{ color: 'white' }} />
                  ) : (
                    <ExpandMore sx={{ color: 'white' }} />
                  )}
                </ListItemButton>
              ) : (
                <ListItemButton component={Link} to={item.link!}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: 'white' }} />
                </ListItemButton>
              )}
            </ListItem>

            {item.subItems && (
              <Collapse in={openMenu === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {item.subItems.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding>
                      <ListItemButton component={Link} to={subItem.link}>
                        <ListItemText primary={subItem.text} sx={{ color: 'white' }} />
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
