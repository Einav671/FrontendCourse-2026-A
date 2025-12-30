import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';

// אייקונים
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

// עיצוב פנימי במקום CSS חיצוני
const styles = {
  card: {
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 6,
    }
  },
  list: {
    paddingInlineStart: '20px', // תומך RTL אוטומטית
    margin: 0,
  }
};

const InternshipsManagement: React.FC = () => {
  const navigate = useNavigate();

  const defaultInternships = [
    {
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
    const props = { sx: { fontSize: 40 } };
    switch (key) {
      case 'ai': return <SchoolIcon {...props} sx={{ ...props.sx, color: '#3f51b5' }} />;
      case 'software': return <CodeIcon {...props} sx={{ ...props.sx, color: '#4caf50' }} />;
      case 'security': return <SecurityIcon {...props} sx={{ ...props.sx, color: '#f44336' }} />;
      case 'cloud': return <CloudIcon {...props} sx={{ ...props.sx, color: '#1976d2' }} />;
      case 'data': return <StorageIcon {...props} sx={{ ...props.sx, color: '#6a1b9a' }} />;
      case 'devops': return <BuildIcon {...props} sx={{ ...props.sx, color: '#ff9800' }} />;
      case 'embedded': return <DeveloperModeIcon {...props} sx={{ ...props.sx, color: '#009688' }} />;
      case 'network': return <SettingsEthernetIcon {...props} sx={{ ...props.sx, color: '#455a64' }} />;
      default: return <SchoolIcon {...props} />;
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('internships') || 'null');
    if (saved && Array.isArray(saved) && saved.length > 0) {
      setInternships([...defaultInternships, ...saved]);
    } else {
      setInternships(defaultInternships);
    }
  }, []);

  return (
    <Container maxWidth="lg">
      
      {/* כותרת וכפתור הוספה */}
      <PageHeader 
        title="מסלולי התמחות" 
        buttonText="הוסף מסלול התמחות חדש"
        onButtonClick={() => navigate('/internships/new')}
      />

      <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', mb: 4, mt: -3, color: 'text.secondary' }}>
        גלו את המסלולים האקדמיים שלנו ובחרו בקריירה שמתאימה לכם
      </Typography>

      <Grid container spacing={4}>
        {internships.map((internship, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ ...styles.card, backgroundColor: internship.color }}>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {iconForKey(internship.icon)}
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {internship.title}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', flexGrow: 1 }}>
                {internship.description}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  כיווני קריירה:
                </Typography>
                <Box component="ul" sx={styles.list}>
                  {internship.careerPaths.map((path: string, idx: number) => (
                    <li key={idx}><Typography variant="body2">{path}</Typography></li>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  מיומנויות נרכשות:
                </Typography>
                <Box component="ul" sx={styles.list}>
                  {internship.skills.map((skill: string, idx: number) => (
                    <li key={idx}><Typography variant="body2">{skill}</Typography></li>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InternshipsManagement;