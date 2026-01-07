import { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
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

  // Create light theme
  const lightTheme = createTheme({
    direction: 'rtl',
    palette: {
      mode: 'light',
      primary: {
        main: '#581a96', // Your primary color for light mode
      },
      secondary: {
        main: '#240888ff', // Your secondary color for light mode
      },
      background: {
        default: '#ffffff',
        paper: '#f5f5f5',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  // Create dark theme
  const darkTheme = createTheme({
    direction: 'rtl',
    palette: {
      mode: 'dark',
      primary: {
        main: '#1A1A1A', // Your primary color for dark mode
      },
      secondary: {
        main: '#96961A', // Your secondary color for dark mode
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

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
