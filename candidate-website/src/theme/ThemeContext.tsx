import { createContext, useContext, useState, type ReactNode } from 'react';
// הוספנו כאן את responsiveFontSizes
import { createTheme, ThemeProvider as MuiThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Cache for RTL support
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Theme Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }
  return context;
};

// Theme Provider Component
interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // הגדרות בסיס שמשותפות לשני הנושאים (כדי למנוע שכפול)
  const typographySettings = {
    fontFamily: 'Rubik, Arial, sans-serif', // שינינו את הפונט ל-Rubik
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  };

  // Create light theme
  const lightTheme = createTheme({
    direction: 'rtl',
    palette: {
      mode: 'light',
      primary: {
        main: '#581a96',
      },
      secondary: {
        main: '#240888',
      },
      background: {
        default: '#f5f5f5', // צבע רקע כללי קצת יותר נעים מלבן מוחלט
        paper: '#ffffff',
      },
    },
    typography: typographySettings,
  });

  // Create dark theme
  const darkTheme = createTheme({
    direction: 'rtl',
    palette: {
      mode: 'dark',
      primary: {
        main: '#9c4dcc', // הבהרתי קצת את הצבע כדי שיראה טוב על שחור
      },
      secondary: {
        main: '#7c4dff',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    typography: typographySettings,
  });

  // בחירת ה-Theme המתאים
  let theme = isDarkMode ? darkTheme : lightTheme;

  // --- כאן הקסם קורה: הופך את הפונטים לרספונסיביים ---
  theme = responsiveFontSizes(theme);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <CacheProvider value={cacheRtl}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};