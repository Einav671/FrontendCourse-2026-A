import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const InternshipsManagement: React.FC = () => {
  const navigate = useNavigate();

  const defaultInternships = [
    {
      // כדאי להוסיף כאן id ייחודי אם תרצה לאפשר עריכה של ברירות המחדל בעתיד
      title: 'בינה מלאכותית (AI)',
      description: 'מסלול זה מתמקד בפיתוח אלגוריתמים חכמים, למידת מכונה וניתוח נתונים.',
      careerPaths: ['חוקר AI', 'מהנדס למידת מכונה', 'מדען נתונים'],
      skills: ['TensorFlow', 'Python', 'ניתוח נתונים (NLP)'],
      icon: 'ai',
      color: '#e3f2fd'
    },
    {
      title: 'פיתוח תוכנה',
      description: 'מסלול זה מתמקד בפיתוח יישומים, אתרים ומערכות תוכנה מתקדמות.',
      careerPaths: ['Full Stack Developer', 'מפתח אפליקציות', 'מהנדס מערכות'],
      skills: ['React', 'Node.js', 'Agile'],
      icon: 'software',
      color: '#e8f5e9'
    },
    {
      title: 'אבטחת מידע',
      description: 'מסלול זה מתמקד בהגנה על מערכות מידע, סייבר ואבטחת נתונים.',
      careerPaths: ['מומחה סייבר', 'מנהל אבטחת מידע', 'חוקר אבטחה'],
      skills: ['Penetration Testing', 'DesSecOps', 'ניהול סיכונים'],
      icon: 'security',
      color: '#ffebee'
    }
  ];

  const [internships, setInternships] = useState<any[]>([]);

  const iconForKey = (key: string | undefined) => {
    switch (key) {
      case 'ai':
        return <SchoolIcon sx={{ fontSize: 40, color: '#3f51b5' }} />;
      case 'software':
        return <CodeIcon sx={{ fontSize: 40, color: '#4caf50' }} />;
      case 'security':
        return <SecurityIcon sx={{ fontSize: 40, color: '#f44336' }} />;
      case 'cloud':
        return <CloudIcon sx={{ fontSize: 40, color: '#1976d2' }} />;
      case 'data':
        return <StorageIcon sx={{ fontSize: 40, color: '#6a1b9a' }} />;
      case 'devops':
        return <BuildIcon sx={{ fontSize: 40, color: '#ff9800' }} />;
      case 'embedded':
        return <DeveloperModeIcon sx={{ fontSize: 40, color: '#009688' }} />;
      case 'network':
        return <SettingsEthernetIcon sx={{ fontSize: 40, color: '#455a64' }} />;
      default:
        return <SchoolIcon sx={{ fontSize: 40 }} />;
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('internships') || 'null');
    if (saved && Array.isArray(saved) && saved.length > 0) {
      setInternships([...defaultInternships, ...saved]);
    } else {
      setInternships(defaultInternships);
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'internships') {
        const updated = JSON.parse(e.newValue || 'null');
        if (Array.isArray(updated)) setInternships([...defaultInternships, ...updated]);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} dir="rtl">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
        מסלולי התמחות
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        גלו את המסלולים האקדמיים שלנו ובחרו בקריירה שמתאימה לכם
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/internships/new')}
        >
          הוסף מסלול התמחות חדש
        </Button>
      </Box>

      <Grid container spacing={4}>
        {internships.map((internship, index) => (
          // תיקון: Grid נקי ללא פרמטרים נוספים
          <Grid key={index}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: internship.color, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {iconForKey(internship.icon)}
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {internship.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                {internship.description}
              </Typography>
              
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'right' }}>
                כיווני קריירה:
              </Typography>
              <ul style={{ paddingRight: '20px', paddingLeft: 0, margin: 0, textAlign: 'right' }}>
                {internship.careerPaths.map((path: string, idx: number) => (
                  <li key={idx}>{path}</li>
                ))}
              </ul>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'right' }}>
                  מיומנויות נרכשות:
                </Typography>
                <ul style={{ paddingRight: '20px', paddingLeft: 0, margin: 0, textAlign: 'right' }}>
                  {internship.skills.map((skill: string, idx: number) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InternshipsManagement;