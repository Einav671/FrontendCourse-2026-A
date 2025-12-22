import { useState } from 'react';
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
import SchoolIcon from '@mui/icons-material/School'; // אייקון אופציונלי ויפה

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

          {/* כותרת קבועה עם אייקון */}
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              מערכת ניהול אקדמית
            </Typography>
            <SchoolIcon />
          </div>

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

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/management" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="דשבורד ניהול ראשי" />
            </ListItemButton>
          </ListItem>

          {/* --- החלק שהוספנו --- */}
          
          {/*ניהול משתמשים*/}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/users" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול משתמשים" />
            </ListItemButton>
          </ListItem>

          {/* ניהול מלגות (החדש שלך) */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/scholarships" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול מלגות" />
            </ListItemButton>
          </ListItem>

          {/* ניהול בוגרים */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/graduates" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול בוגרים" />
            </ListItemButton>
          </ListItem>

          {/* ------------------- */}

          {/* ניהול קורסים (של החברים) */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/courses/new" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול קורסים" />
            </ListItemButton>
          </ListItem>

          {/* ניהול מועמדים */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/candidates" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="ניהול מועמדים" />
            </ListItemButton>
          </ListItem>

          {/* מסלולי התמחות */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/internships" onClick={toggleDrawer} sx={{ textAlign: 'right' }}>
              <ListItemText primary="מסלולי התמחות" />
            </ListItemButton>
          </ListItem>

          {/* מחשבון קבלה */}
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