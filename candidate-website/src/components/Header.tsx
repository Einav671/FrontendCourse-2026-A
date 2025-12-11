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
import { Link, useLocation } from 'react-router-dom'; // הוספנו את useLocation

export default function Header() {
  const [open, setOpen] = useState(false);
  
  // 1. שימוש ב-useLocation כדי לדעת את הכתובת הנוכחית
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // 2. פונקציה שמחזירה את שם הדף לפי הכתובת (URL)
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'דף הבית';
      case '/management':
        return 'ניהול קורסים';
      case '/forms':
        return 'טפסים';
      case '/help':
        return 'מרכז עזרה';
      default:
        return 'מערכת ניהול קורסים'; // כותרת ברירת מחדל
    }
  };

  return (
    <>
      <AppBar position="static">
        {/* הוספנו flex-direction: row-reverse כדי שהכל יתחיל מימין */}
        <Toolbar sx={{ flexDirection: 'row-reverse' }}>
          
          {/* כפתור ההמבורגר - עכשיו הוא בצד ימין */}
          <IconButton
            size="large"
            edge="end" // שינינו ל-end כדי שיהיה בקצה
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ ml: 2 }} // מרווח קטן משמאל לכפתור
          >
            <MenuIcon />
          </IconButton>

          {/* הכותרת הדינמית - מיושרת לימין */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
            {getPageTitle(location.pathname)}
          </Typography>

        </Toolbar>
      </AppBar>

      {/* התפריט הצדדי - נפתח מימין (anchor="right") */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        {/* הגדרת כיוון הטקסט מימין לשמאל בתוך התפריט */}
        <List sx={{ width: 250, direction: 'rtl' }}>
          
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="דף הבית" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/management" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול קורסים" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/forms" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="טפסים" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/help" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="עזרה" />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </>
  );
}