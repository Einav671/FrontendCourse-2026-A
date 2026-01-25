import { useState, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { Box, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // אייקון למנהל

import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useThemeContext } from '../theme/ThemeContext';

const styles = {
  menuButton: { ml: 2 },
  logoContainer: { flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 },
  logoText: { fontWeight: 'bold' },
  drawerList: { width: 250 },
  listItemText: { textAlign: 'right' },
  userSection: { display: 'flex', alignItems: 'center', gap: 1, ml: 2 }
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleDrawer = () => setOpen(!open);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // ביציאה חוזרים לדף הבית הציבורי
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // --- תפריטים ---

  // 1. תפריט למשתמשים/אורחים בלבד
  const guestMenuItems = [
    { text: 'דף הבית', path: '/' },
    { text: 'מחשבון קבלה', path: '/calculator' },
    { text: 'קטלוג קורסים', path: '/courses-info' },
    { text: 'מסלולי התמחות', path: '/tracks' },
    { text: 'מרכז עזרה', path: '/help' },
  ];

  // 2. תפריט למנהלים בלבד (רק דפי ניהול)
  const adminMenuItems = [
    { text: 'דשבורד ניהול', path: '/admin' },
    { text: 'ניהול קורסים', path: '/management' },
    { text: 'ניהול משתמשים', path: '/users' },
    { text: 'ניהול מלגות', path: '/scholarships' },
    { text: 'ניהול בוגרים', path: '/graduates' },
    { text: 'ניהול מועמדים', path: '/candidates' },
    { text: 'ניהול התמחויות', path: '/internships' },
    { text: 'פניות (לידים)', path: '/forms' },
    { text: 'ניהול התראות', path: '/alerts' },
    { text: 'מעבר לאתר הציבורי', path: '/' }, // אופציה אופציונלית למקרה שרוצים להציץ
  ];

  const menuItems = user ? adminMenuItems : guestMenuItems;

  // לאן הלוגו מוביל? אם מנהל -> דשבורד, אם אורח -> בית
  const logoLink = user ? '/admin' : '/';

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large" edge="start" color="inherit" aria-label="menu"
            onClick={toggleDrawer} sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {/* לוגו - הלינק משתנה דינמית */}
          <Box sx={styles.logoContainer}>
            <IconButton component={Link} to={logoLink} color="inherit" edge="start">
              {user ? <AdminPanelSettingsIcon /> : <SchoolIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={styles.logoText}>
              {user ? 'מערכת ניהול' : 'המחלקה למדעי המחשב'}
            </Typography>
          </Box>

          {user ? (
            <Box sx={styles.userSection}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.email}
              </Typography>
              <AccountCircle />
              <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                יציאה
              </Button>
            </Box>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              התחברות סגל
            </Button>
          )}

          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List sx={styles.drawerList}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
                <ListItemText primary={item.text} style={{ textAlign: 'right' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}