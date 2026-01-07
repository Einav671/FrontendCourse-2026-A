import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// הגדרת הטיפוסים שהרכיב מקבל
interface PageHeaderProps {
  title: string;          // כותרת העמוד
  buttonText?: string;    // טקסט הכפתור (אופציונלי - אם לא תשלח, לא יהיה כפתור)
  onButtonClick?: () => void; // הפונקציה שתקרה בלחיצה
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, buttonText, onButtonClick }) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4, // מרווח תחתון אחיד
        mt: 2  // מרווח עליון אחיד
      }}
    >
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>
        {title}
      </Typography>
      
      {/* מציג את הכפתור רק אם העבירו טקסט ופונקציה */}
      {buttonText && onButtonClick && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />} // האייקון יתהפך אוטומטית בזכות ה-RTL שהגדרנו ב-main.tsx
          onClick={onButtonClick}
          sx={{ fontWeight: 'bold', px: 3 }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};