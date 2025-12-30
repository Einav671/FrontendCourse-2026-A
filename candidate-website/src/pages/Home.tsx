import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader'; // וודא שהנתיב תקין
import { SystemAlert } from './alerts/SystemAlert'; 

// ייבוא אייקונים
import CalculateIcon from '@mui/icons-material/Calculate';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// --- הפרדת עיצוב (Styles Object) ---
const styles = {
  kpiPaper: {
    p: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 4, // שימוש בצלליות של ה-Theme
    },
  },
  cardValue: {
    fontWeight: 'bold',
    fontSize: '2.2rem',
    my: 1,
    lineHeight: 1,
  },
  cardSubtext: {
    fontSize: '0.85rem',
    color: 'text.secondary',
  },
  alertItem: {
    p: 2,
    borderRadius: 2,
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  useEffect(() => {
    const savedAlerts = JSON.parse(localStorage.getItem('system-alerts') || '[]');
    setAlerts(savedAlerts);
  }, []);

  // פונקציית עזר לרינדור כרטיס
  const renderKpiCard = (title: string, value: string | number, subtext: string, icon: React.ReactNode, bgColor: string, color: string, path: string) => (
    <Grid>
      <Paper elevation={2} sx={styles.kpiPaper} onClick={() => navigate(path)}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: bgColor, color: color }}>
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'start' }}> {/* textAlign start מתאים את עצמו ל-RTL */}
          <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>{title}</Typography>
          <Typography sx={styles.cardValue}>{value}</Typography>
          <Typography sx={styles.cardSubtext}>{subtext}</Typography>
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Container maxWidth="xl">
      
      {/* כותרת הדף באמצעות הרכיב המשותף */}
      <PageHeader title="דשבורד ניהול" />

      {/* גריד ראשי */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        
        {/* שורה ראשונה */}
        {renderKpiCard('מחשבוני התאמה', '0', 'לחץ לחישוב חדש', <CalculateIcon fontSize="large" />, '#e8f5e9', '#2e7d32', '/calculator')}
        {renderKpiCard('פניות פתוחות', '0', 'תיבת דואר נקייה', <ChatBubbleOutlineIcon fontSize="large" />, '#fff3e0', '#ef6c00', '/forms')}
        {renderKpiCard('מועמדים חדשים', '0', 'ממתין לרישום', <PeopleAltIcon fontSize="large" />, '#e3f2fd', '#1565c0', '/candidates')}

        {/* שורה שנייה */}
        {renderKpiCard('סטטוס עדכון מלגות', 'מעודכן', 'לחץ לניהול המלגות', <AutorenewIcon fontSize="large" />, '#e0f2f1', '#00695c', '/scholarships')}
        {renderKpiCard('חוות דעת לאישור', '0', 'לחץ לניהול בוגרים', <AssignmentIcon fontSize="large" />, '#f3e5f5', '#7b1fa2', '/graduates')}
      </Grid>

      {/* אזור התראות מערכת */}
      <Grid container spacing={4}>
        <Grid>
          <Paper elevation={3} sx={{ p: 3, minHeight: 250 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              התראות מערכת
            </Typography>
            
            <Stack spacing={2}>
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <Box 
                    key={alert.id} 
                    sx={{
                      ...styles.alertItem,
                      bgcolor: alert.type === 'success' ? '#e8f5e9' : '#fff3e0',
                      color: alert.type === 'success' ? '#1b5e20' : '#e65100',
                      borderRight: `4px solid ${alert.type === 'success' ? '#4caf50' : '#ff9800'}`
                    }}
                  >
                    {alert.message}
                    {alert.type === 'success' && <CheckCircleOutlineIcon fontSize="small" />}
                  </Box>
                ))
              ) : (
                <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
                    אין התראות חדשות
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;