import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './courses/CoursesTable'; // הטבלה של החברים שלך
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // אייקון למלגות
import PeopleIcon from '@mui/icons-material/People'; // אייקון לבוגרים

const Management: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* כותרת הדף */}
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
        מערכת ניהול אקדמית
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 5, color: '#666' }}>
        דשבורד ריכוז נתונים ופעולות למנהל המערכת
      </Typography>

      {/* --- אזור כפתורי הניווט החדשים (קוביות) --- */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        
        {/* כרטיסיית מלגות */}
        <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#e3f2fd', transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                <CardActionArea onClick={() => navigate('/scholarships')} sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                        <SchoolIcon sx={{ fontSize: 50, color: '#1976d2', mb: 2 }} />
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                            סטטוס מלגות
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ניהול מאגר המלגות, הוספת מלגות חדשות ועריכת תנאים
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

        {/* כרטיסיית בוגרים */}
        <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#e8f5e9', transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                <CardActionArea onClick={() => navigate('/graduates')} sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                        <PeopleIcon sx={{ fontSize: 50, color: '#2e7d32', mb: 2 }} />
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                            ניהול בוגרים
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            עדכון סיפורי הצלחה, הוספת בוגרים וניהול חוות דעת
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

      </Grid>

      {/* --- הטבלה הקיימת (קורסים) --- */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ borderRight: '4px solid #1976d2', pr: 1, mb: 3 }}>
            ניהול תוכנית הלימודים (קורסים)
        </Typography>
        <CoursesTable />
      </Box>

    </Container>
  );
};

export default Management;