import React from 'react';
import {
  Container, Grid, Typography, Box, Button, Stack, useTheme, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserHome: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      {/* --- חלק 1: Hero Section (באנר עליון) --- */}
      <Box sx={{
        position: 'relative',
        bgcolor: '#1a1a1a',
        color: 'white',
        py: 10,
        borderBottom: `6px solid ${theme.palette.primary.main}`,
        overflow: 'hidden'
      }}>
        {/* גרפיקת רקע */}
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15,
          backgroundImage: 'radial-gradient(circle at 70% 30%, #ffffff 0%, transparent 50%)',
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid>
              <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                <AutoFixHighIcon sx={{ color: theme.palette.secondary.light, fontSize: 32 }} />
                <Typography variant="overline" sx={{ letterSpacing: 3, fontWeight: 'bold', color: theme.palette.secondary.light }}>
                  המחלקה למדעי המחשב
                </Typography>
              </Box>

              <Typography variant="h2" fontWeight="800" sx={{ mb: 2, lineHeight: 1.1 }}>
                ללמוד את שפת העתיד <br />
                <span style={{ color: theme.palette.primary.light }}>ולהוביל ב-AI וחדשנות</span>
              </Typography>

              <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '650px', mb: 5, lineHeight: 1.6, fontWeight: 300 }}>
                התוכנית שלנו משלבת ידע תיאורטי מעמיק עם פרקטיקה מתקדמת בתחומי הבינה המלאכותית,
                Machine Learning ופיתוח תוכנה. הצטרפו לנבחרת שפותרת את האתגרים הטכנולוגיים של המחר.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={() => navigate('/calculator')}
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                  מחשבון התאמה ומלגות
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="inherit"
                  onClick={() => navigate('/scholarships')} // או לדף מידע אחר
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                  בדיקת מלגות קיימות
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- חלק 2: הוכחה חברתית ומידע --- */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={3}>
          {/* כרטיס המלצות */}
          <Grid >
            <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <SchoolIcon color="primary" fontSize="large" />
                <Typography variant="h5" fontWeight="bold">מה הבוגרים אומרים?</Typography>
              </Box>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, color: 'text.secondary' }}>
                "הכלים שקיבלתי בתואר, במיוחד בתחום האלגוריתמים וה-AI, נתנו לי יתרון משמעותי כבר בראיון העבודה הראשון שלי בגוגל."
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">– דניאל כהן, מפתח Backend</Typography>
            </Paper>
          </Grid>

          {/* כרטיס מסלולים */}
          <Grid>
            <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: 3, bgcolor: theme.palette.secondary.main, color: 'white' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>מסלולי התמחות</Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                אנו מציעים מגוון התמחויות המותאמות לדרישות השוק:
              </Typography>
              <Stack spacing={1}>
                <Box display="flex" gap={1}><CheckCircleIcon fontSize="small" /><Typography>בינה מלאכותית (AI)</Typography></Box>
                <Box display="flex" gap={1}><CheckCircleIcon fontSize="small" /><Typography>סייבר ואבטחת מידע</Typography></Box>
                <Box display="flex" gap={1}><CheckCircleIcon fontSize="small" /><Typography>פיתוח Full Stack</Typography></Box>
              </Stack>
              <Button
                variant="contained"
                color="warning"
                sx={{ mt: 3 }}
                onClick={() => navigate('/tracks')}
              >
                לכל המסלולים
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserHome;