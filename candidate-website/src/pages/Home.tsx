import React from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // הוק לניווט

// ייבוא אייקונים
import CalculateIcon from '@mui/icons-material/Calculate';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// ייבוא קובץ העיצוב
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" className="dashboard-container">
      
      {/* כותרת ראשית */}
      <Box className="header-section">
        <Typography variant="h4" component="h1" className="page-title">
          דשבורד ניהול
        </Typography>
        <Typography variant="subtitle1" className="page-subtitle">
          סקירה כללית של הפעילויות במערכת
        </Typography>
      </Box>

      {/* שורה ראשונה */}
      <Grid container spacing={4} sx={{ mb: 10 }}>
        
        {/* כרטיס 1: מפנה למחשבון (תוקן!) */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/calculator')} // --- תיקון: מפנה למחשבון ---
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}>
              <CalculateIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">מחשבוני התאמה</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">לחץ לחישוב חדש</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* כרטיס 2: מפנה לדף טפסים (פניות) */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/forms')} 
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#fff3e0', color: '#ef6c00' }}>
              <ChatBubbleOutlineIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">פניות פתוחות</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">תיבת דואר נקייה</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* כרטיס 3: מפנה לניהול מועמדים (תוקן!) */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/candidates')} // --- תיקון: מפנה למועמדים ---
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }}>
              <PeopleAltIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">מועמדים חדשים</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">ממתין לרישום</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* שורה שנייה */}
      <Grid container spacing={4} sx={{ mb: 10 }}>
        
        {/* כרטיס 4: מפנה לעזרה */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/help')}
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#e0f2f1', color: '#00695c' }}>
              <AutorenewIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">סטטוס עדכון מלגות</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', my: 1 }}>מעודכן</Typography>
              <Typography className="card-subtext">אין עדכונים חדשים</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* כרטיס 5: מפנה לניהול */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/management')}
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#f3e5f5', color: '#7b1fa2' }}>
              <AssignmentIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">חוות דעת לאישור</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">אין משימות ממתינות</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* שורה שלישית: רשימות */}
      <Grid container spacing={4}>
        
        {/* התראות מערכת */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="alerts-paper">
            <Typography variant="h6" className="section-title">
              התראות מערכת
            </Typography>
            
            <Box className="alerts-list">
              <Box className="alert-item alert-success">
                המערכת מעודכנת ותקינה <CheckCircleOutlineIcon fontSize="small"/>
              </Box>
              <Box className="alert-item" style={{color: '#999', textAlign:'center', marginTop: '20px'}}>
                אין התראות חדשות
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* פעולות אחרונות */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="alerts-paper">
            <Typography variant="h6" className="section-title">
              פעולות אחרונות
            </Typography>
            
            <Box className="alerts-list">
              <Box className="activity-item">
                <Typography className="activity-text">מערכת הופעלה מחדש</Typography>
                <Typography className="activity-time">עכשיו</Typography>
              </Box>
              <Box className="activity-item">
                <Typography className="activity-text">בוצע ניקוי מטמון</Typography>
                <Typography className="activity-time">לפני 5 דקות</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Home;