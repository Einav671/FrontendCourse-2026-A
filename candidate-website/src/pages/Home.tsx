import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar, Stack, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { SystemAlert } from './alerts/SystemAlert'; 

// ייבוא פונקציות Firebase
import { db } from '../firebase/scholarshipService'; // או config
import { collection, getDocs, query, where } from 'firebase/firestore';

// ייבוא אייקונים
import CalculateIcon from '@mui/icons-material/Calculate';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
      boxShadow: 4, 
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
    borderRight: '4px solid', // הגבול הימני הצבעוני
  }
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [stats, setStats] = useState({
    leads: 0,
    candidates: 0,
    scholarships: 0,
    pendingGraduates: 0
  });
  const [loading, setLoading] = useState(true);

  // פונקציית עזר לבחירת צבעים ואייקונים לפי סוג ההתראה
  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bgcolor: '#e8f5e9', // ירוק בהיר
          color: '#1b5e20',   // ירוק כהה
          borderColor: '#4caf50',
          icon: <CheckCircleOutlineIcon fontSize="small" />
        };
      case 'error':
        return {
          bgcolor: '#ffebee', // אדום בהיר
          color: '#b71c1c',   // אדום כהה
          borderColor: '#ef5350',
          icon: <ErrorOutlineIcon fontSize="small" />
        };
      case 'warning':
        return {
          bgcolor: '#fff3e0', // כתום בהיר
          color: '#e65100',   // כתום כהה
          borderColor: '#ff9800',
          icon: <WarningAmberIcon fontSize="small" />
        };
      case 'info':
      default:
        return {
          bgcolor: '#e3f2fd', // כחול בהיר
          color: '#0d47a1',   // כחול כהה
          borderColor: '#2196f3',
          icon: <InfoOutlinedIcon fontSize="small" />
        };
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. שליפת התראות מערכת
        const alertsSnapshot = await getDocs(collection(db, "systemAlerts"));
        const alertsData = alertsSnapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data()
        } as SystemAlert));
        setAlerts(alertsData);

        // 2. חישוב פניות פתוחות
        const leadsSnapshot = await getDocs(collection(db, "leads"));
        const leadsCount = leadsSnapshot.size;

        // 3. חישוב מועמדים
        const candidatesSnapshot = await getDocs(collection(db, "candidates"));
        const candidatesCount = candidatesSnapshot.size;

        // 4. חישוב מלגות
        const scholarshipsSnapshot = await getDocs(collection(db, "scholarships"));
        const scholarshipsCount = scholarshipsSnapshot.size;

        // 5. חישוב בוגרים ממתינים
        const pendingGradsQuery = query(collection(db, "graduates"), where("status", "==", "pending"));
        const pendingGradsSnapshot = await getDocs(pendingGradsQuery);
        const pendingGradsCount = pendingGradsSnapshot.size;

        setStats({
          leads: leadsCount,
          candidates: candidatesCount,
          scholarships: scholarshipsCount,
          pendingGraduates: pendingGradsCount
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderKpiCard = (title: string, value: string | number, subtext: string, icon: React.ReactNode, bgColor: string, color: string, path: string) => (
    <Grid >
      <Paper elevation={2} sx={styles.kpiPaper} onClick={() => navigate(path)}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: bgColor, color: color }}>
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'start', flexGrow: 1, ml: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>{title}</Typography>
          <Typography sx={styles.cardValue}>
            {loading ? <CircularProgress size={20} /> : value}
          </Typography>
          <Typography sx={styles.cardSubtext}>{subtext}</Typography>
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Container maxWidth="xl">
      <PageHeader title="דשבורד ניהול" />

      {/* גריד ראשי */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {renderKpiCard('מחשבוני התאמה', '0', 'לחץ לחישוב חדש', <CalculateIcon fontSize="large" />, '#e8f5e9', '#2e7d32', '/calculator')}
        {renderKpiCard('פניות פתוחות', stats.leads, 'תיבת דואר', <ChatBubbleOutlineIcon fontSize="large" />, '#fff3e0', '#ef6c00', '/forms')}
        {renderKpiCard('מועמדים רשומים', stats.candidates, 'סה"כ מועמדים', <PeopleAltIcon fontSize="large" />, '#e3f2fd', '#1565c0', '/candidates')}
        {renderKpiCard('מלגות פעילות', stats.scholarships, 'מספר מלגות במערכת', <AutorenewIcon fontSize="large" />, '#e0f2f1', '#00695c', '/scholarships')}
        {renderKpiCard('חוות דעת לאישור', stats.pendingGraduates, stats.pendingGraduates > 0 ? 'נדרשת פעולה!' : 'הכל מעודכן', <AssignmentIcon fontSize="large" />, '#f3e5f5', '#7b1fa2', '/graduates')}
      </Grid>

      {/* אזור התראות מערכת */}
      <Grid container spacing={4}>
        <Grid>
          <Paper elevation={3} sx={{ p: 3, minHeight: 250 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              התראות מערכת
            </Typography>
            
            <Stack spacing={2}>
              {loading ? (
                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                   <CircularProgress />
                 </Box>
              ) : alerts.length > 0 ? (
                alerts.map((alert) => {
                  const alertStyles = getAlertStyles(alert.type);
                  return (
                    <Box 
                      key={alert.id} 
                      sx={{
                        ...styles.alertItem,
                        bgcolor: alertStyles.bgcolor,
                        color: alertStyles.color,
                        borderColor: alertStyles.borderColor // שימוש בצבע הגבול המתאים
                      }}
                    >
                      {alert.message}
                      {alertStyles.icon}
                    </Box>
                  );
                })
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