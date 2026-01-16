import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar, Stack, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { SystemAlert } from '../alerts/types/SystemAlert';

// ייבוא פונקציות Firebase
import { db } from '../../firebase/scholarshipService'; // או config
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

import './Home.css'; // Import CSS

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. שליפת התראות
        const alertsSnapshot = await getDocs(collection(db, "systemAlerts"));
        const alertsData = alertsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as SystemAlert));
        setAlerts(alertsData);

        // 2. חישובים סטטיסטיים
        const leadsSnapshot = await getDocs(collection(db, "leads"));
        const candidatesSnapshot = await getDocs(collection(db, "candidates"));
        const scholarshipsSnapshot = await getDocs(collection(db, "scholarships"));

        const pendingGradsQuery = query(collection(db, "graduates"), where("status", "==", "pending"));
        const pendingGradsSnapshot = await getDocs(pendingGradsQuery);

        setStats({
          leads: leadsSnapshot.size,
          candidates: candidatesSnapshot.size,
          scholarships: scholarshipsSnapshot.size,
          pendingGraduates: pendingGradsSnapshot.size
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleOutlineIcon fontSize="small" />;
      case 'error': return <ErrorOutlineIcon fontSize="small" />;
      case 'warning': return <WarningAmberIcon fontSize="small" />;
      default: return <InfoOutlinedIcon fontSize="small" />;
    }
  };

  const renderKpiCard = (title: string, value: string | number, subtext: string, icon: React.ReactNode, bgColor: string, color: string, path: string) => (
    <Grid >
      {/* הערה: השתמשתי ב-Grid item עם חלוקה רספונסיבית */}
      <Paper elevation={2} className="kpi-paper" onClick={() => navigate(path)}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: bgColor, color: color }}>
          {icon}
        </Avatar>
        <Box className="kpi-content">
          <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>{title}</Typography>
          <Typography className="card-value">
            {loading ? <CircularProgress size={20} /> : value}
          </Typography>
          <Typography className="card-subtext">{subtext}</Typography>
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Container maxWidth="xl" className="dashboard-container">
      <PageHeader title="דשבורד ניהול" />

      {/* גריד ראשי */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {renderKpiCard('מחשבוני התאמה', '0', 'לחץ לחישוב חדש', <CalculateIcon fontSize="large" />, '#e8f5e9', '#2e7d32', '/calculator')}
        {renderKpiCard('פניות פתוחות', stats.leads, 'תיבת דואר', <ChatBubbleOutlineIcon fontSize="large" />, '#fff3e0', '#ef6c00', '/forms')}
        {renderKpiCard('מועמדים רשומים', stats.candidates, 'סה"כ מועמדים', <PeopleAltIcon fontSize="large" />, '#e3f2fd', '#1565c0', '/candidates')}
        {renderKpiCard('מלגות פעילות', stats.scholarships, 'מספר מלגות', <AutorenewIcon fontSize="large" />, '#e0f2f1', '#00695c', '/scholarships')}
        {renderKpiCard('חוות דעת לאישור', stats.pendingGraduates, stats.pendingGraduates > 0 ? 'נדרשת פעולה!' : 'הכל מעודכן', <AssignmentIcon fontSize="large" />, '#f3e5f5', '#7b1fa2', '/graduates')}
      </Grid>

      {/* אזור התראות מערכת */}
      <Grid container spacing={4}>
        <Grid >
          <Paper elevation={3} className="alerts-section-paper">
            <Typography variant="h6" className="section-title">
              התראות מערכת
            </Typography>

            <Stack spacing={2}>
              {loading ? (
                <Box className="loading-container">
                  <CircularProgress />
                </Box>
              ) : alerts.length > 0 ? (
                alerts.map((alert) => (
                  <Box key={alert.id} className={`alert-item alert-${alert.type}`}>
                    {alert.message}
                    {getAlertIcon(alert.type)}
                  </Box>
                ))
              ) : (
                <Typography className="no-alerts-text">
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