import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom'; 
// מחקנו את useLocation כי אנחנו כבר לא משתמשים בכותרת דינמית

export default function Header() {
  const [open, setOpen] = useState(false);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="static">
        {/* כיוון מימין לשמאל */}
        <Toolbar sx={{ flexDirection: 'row-reverse' }}>
          
          {/* כפתור המבורגר בצד ימין */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* --- שינוי 1: כותרת קבועה אחת --- */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right', fontWeight: 'bold' }}>
            מערכת ניהול אקדמית
          </Typography>

        </Toolbar>
      </AppBar>

      {/* תפריט צד (Drawer) */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <List sx={{ width: 250, direction: 'rtl' }}>
          
          {/* דף הבית */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="דף הבית" />
            </ListItemButton>
          </ListItem>

          {/* --- שינוי 2: הוספת קישורים חדשים --- */}

          {/* ניהול קורסים */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/management" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול קורסים" />
            </ListItemButton>
          </ListItem>

          {/* ניהול מועמדים (חדש!) */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/candidates" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול מועמדים" />
            </ListItemButton>
          </ListItem>

          {/* מחשבון קבלה (חדש!) */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/calculator" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="מחשבון קבלה" />
            </ListItemButton>
          </ListItem>

          {/* טפסים כלליים */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/forms" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="צור קשר" />
            </ListItemButton>
          </ListItem>

          {/* עזרה */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/help" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="מרכז עזרה" />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </>
  );
}