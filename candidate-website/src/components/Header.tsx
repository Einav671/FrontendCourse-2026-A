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
import { Box, Button, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactMailIcon from '@mui/icons-material/ContactMail';

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
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // --- תפריט למשתמשים אורחים (האתר הציבורי) ---
  const guestMenuItems = [
    { text: 'דף הבית', path: '/' },
    { text: 'מסלולי התמחות', path: '/tracks' },
    { text: 'קטלוג קורסים', path: '/courses-info' },
    { text: 'מלגות', path: '/scholarships-info' },
    { text: 'בוגרים', path: '/graduates-info' },
    { text: 'מחשבון קבלה', path: '/calculator' },
    { text: 'מרכז עזרה', path: '/help' },
  ];

  // --- תפריט למנהלים (כל מסכי הניהול) ---
  const adminMenuItems = [
    { text: 'דשבורד ניהול', path: '/admin' },
    { text: 'ניהול קורסים', path: '/management' },
    { text: 'ניהול משתמשים', path: '/users' },
    { text: 'ניהול מועמדים', path: '/candidates' },     // הוספתי
    { text: 'ניהול מלגות', path: '/scholarships' },      // הוספתי
    { text: 'ניהול בוגרים', path: '/graduates' },        // הוספתי
    { text: 'ניהול התמחויות', path: '/internships' },    // הוספתי
    { text: 'פניות (לידים)', path: '/forms' },
    { text: 'ניהול התראות', path: '/alerts' },           // הוספתי
    { text: '----------------', path: '#' },             // מפריד ויזואלי
    { text: 'מעבר לאתר הציבורי', path: '/' },
  ];

  const menuItems = user ? adminMenuItems : guestMenuItems;
  const logoLink = user ? '/admin' : '/';

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{ top: 0, zIndex: 1100, bgcolor: 'background.paper' }}
      >
        <Toolbar>
          <IconButton
            size="large" edge="start" color="inherit" aria-label="menu"
            onClick={toggleDrawer} sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={styles.logoContainer}>
            <IconButton component={Link} to={logoLink} color="primary" edge="start">
              {user ? <AdminPanelSettingsIcon /> : <SchoolIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={styles.logoText} color="text.primary">
              {user ? 'מערכת ניהול' : 'המחלקה למדעי המחשב'}
            </Typography>
          </Box>

          {/* תפריט עליון מהיר למשתמשים אורחים */}
          {!user && (
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              <Button component={Link} to="/tracks" color="inherit">מסלולים</Button>
              <Button component={Link} to="/scholarships-info" color="inherit">מלגות</Button>
              <Button component={Link} to="/calculator" color="inherit">בדיקת קבלה</Button>
              <Button
                component={Link}
                to="/forms"
                variant="contained"
                color="primary"
                startIcon={<ContactMailIcon />}
                sx={{ borderRadius: 20, px: 3 }}
              >
                צור קשר
              </Button>
            </Stack>
          )}

          {user ? (
            <Box sx={styles.userSection}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.email}
              </Typography>
              <AccountCircle color="action" />
              <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                יציאה
              </Button>
            </Box>
          ) : (
            <Button component={Link} to="/login" color="inherit" sx={{ ml: 1 }}>
              סגל
            </Button>
          )}

          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List sx={styles.drawerList}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              {/* טיפול במפריד */}
              {item.text === '----------------' ? (
                <Box sx={{ width: '100%', borderBottom: '1px solid #ddd', my: 1 }} />
              ) : (
                <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
                  <ListItemText primary={item.text} style={{ textAlign: 'right' }} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}