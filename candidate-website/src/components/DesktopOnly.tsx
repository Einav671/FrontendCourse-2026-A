import React from 'react';
import { Box, Paper, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DesktopOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  if (isDesktop) return <>{children}</>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 680, width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          דף זה זמין רק במסכים גדולים
        </Typography>
        <Typography sx={{ mb: 3 }}>ניהול מתקדם נתמך רק בממשק שולחני. אנא עברו למחשב כדי להמשיך.</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>חזרה לדשבורד</Button>
          <Button variant="outlined" onClick={() => window.open(window.location.href, '_blank')}>פתח בחלון חדש</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DesktopOnly;
