import { useState, useEffect } from 'react'; // הוספנו useEffect
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
import { Link, useNavigate } from 'react-router-dom'; // הוספנו useNavigate
import SchoolIcon from '@mui/icons-material/School';
import { Box, Button } from '@mui/material'; // הוספנו Button רגיל כי IconButton פחות מתאים לטקסט
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle'; // אייקון למשתמש
import LogoutIcon from '@mui/icons-material/Logout'; // אייקון יציאה

// --- Firebase Imports ---
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '../firebase/config'; // וודא שהנתיב הזה נכון לקובץ config שלך

import { useThemeContext } from '../theme/ThemeContext';

// --- הפרדת עיצובים (Styles) ---
const styles = {
  menuButton: {
    ml: 2,
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
    textAlign: 'right'
  },
  // עיצוב לאזור המשתמש
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ml: 2 // מרווח קטן מהכפתור של החלפת הנושא
  }
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();

  // 1. משתנה לשמירת המשתמש המחובר
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // 2. המאזין של Firebase - רץ פעם אחת כשההדר עולה
  useEffect(() => {
    // הפונקציה הזו רצה אוטומטית כל פעם שמישהו מתחבר או מתנתק
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // מעדכן את ה-State (אם מחובר נקבל אובייקט, אם לא נקבל null)
    });

    // פונקציית ניקוי - מפסיקה להאזין כשהרכיב יורד מהמסך (מונע דליפות זיכרון)
    return () => unsubscribe();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // 3. פונקציית היציאה
  const handleLogout = async () => {
    try {
      await signOut(auth); // מנתק מ-Firebase
      // המאזין ב-useEffect יזהה את זה לבד ויעדכן את הכפתור
      navigate('/login'); // אופציונלי: מעביר לדף התחברות או לדף הבית
    } catch (error) {
      console.error("Error signing out: ", error);
    }
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
              מערכת ניהול
            </Typography>
          </Box>

          {/* --- אזור כפתורי התחברות/משתמש --- */}
          {user ? (
            // מצב 1: המשתמש מחובר
            <Box sx={styles.userSection}>
              {/* הצגת אימייל המשתמש (מוסתר במסכים קטנים אם תרצה, כרגע מוצג תמיד) */}
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.email}
              </Typography>

              {/* אייקון משתמש */}
              <AccountCircle />

              {/* כפתור יציאה */}
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />} // אייקון יציאה ליד הטקסט
              >
                יציאה
              </Button>
            </Box>
          ) : (
            // מצב 2: המשתמש לא מחובר
            <Button component={Link} to="/login" color="inherit">
              התחבר
            </Button>
          )}

          {/* כפתור החלפת מצב (light/dark mode) */}
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label="toggle theme"
            sx={{ ml: 1 }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

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