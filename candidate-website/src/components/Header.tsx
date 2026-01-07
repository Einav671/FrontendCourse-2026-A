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
import SchoolIcon from '@mui/icons-material/School';
import { Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../theme/ThemeContext';

// --- הפרדת עיצובים (Styles) ---
const styles = {
  menuButton: {
    ml: 2, // ב-RTL אנחנו רוצים מרווח משמאל לכפתור (כדי להרחיק את הלוגו)
  },
  logoContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  logoText: {
    fontWeight: 'bold'
  },
  drawerList: {
    width: 250
  },
  listItemText: {
    textAlign: 'right' // מוודא שהטקסט בתפריט מיושר לימין
  }
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'דף הבית', path: '/' },
    { text: 'ניהול קורסים', path: '/management' },
    { text: 'ניהול משתמשים', path: '/users' },
    { text: 'ניהול מלגות', path: '/scholarships' },
    { text: 'ניהול בוגרים', path: '/graduates' },
    { text: 'ניהול מועמדים', path: '/candidates' },
    { text: 'מסלולי התמחות', path: '/internships' },
    { text: 'מחשבון קבלה', path: '/calculator' },
    { text: 'צור קשר', path: '/forms' },
    { text: 'ניהול התראות', path: '/alerts' },
    { text: 'מרכז עזרה', path: '/help' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* כפתור המבורגר */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {/* לוגו וכותרת */}
          <Box sx={styles.logoContainer}>
            <IconButton component={Link} to="/" color="inherit" edge="start">
              <SchoolIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={styles.logoText}>
              מערכת ניהול אקדמית
            </Typography>
          </Box>

          {/* כפתור החלפת מצב (light/dark mode) */}
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label="toggle theme"
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* תיקון הכיוון:
         בגלל stylis-plugin-rtl שמותקן אצלך, הוא הופך את ה-CSS.
         לכן, anchor="left" יהפוך בפועל ל-Right במסך.
      */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List sx={styles.drawerList}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
                <ListItemText
                  primary={item.text}
                  style={{ textAlign: 'right' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}