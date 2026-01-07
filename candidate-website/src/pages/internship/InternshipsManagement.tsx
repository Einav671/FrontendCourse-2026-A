import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Box, CircularProgress, IconButton, useTheme } from '@mui/material';
import { PageHeader } from '../../components/PageHeader';

// אייקונים לניהול
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// אייקונים לתצוגה
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

// ייבוא שירות ומודל
import { getAllInternships, deleteInternship } from '../../firebase/internshipsService';
import type { Internship } from './Internship';

const styles = {
  card: {
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    position: 'relative', // כדי למקם את כפתורי הניהול
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 6,
    }
  },
  list: {
    paddingInlineStart: '20px',
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
    const baseColor = iconColorMap[key || 'ai'] || '#3f51b5';
    const iconProps = {
      sx: {
        ...props.sx,
        color: getIconColor(baseColor)
      }
    };

    switch (key) {
      case 'ai': return <SchoolIcon {...iconProps} />;
      case 'software': return <CodeIcon {...iconProps} />;
      case 'security': return <SecurityIcon {...iconProps} />;
      case 'cloud': return <CloudIcon {...iconProps} />;
      case 'data': return <StorageIcon {...iconProps} />;
      case 'devops': return <BuildIcon {...iconProps} />;
      case 'embedded': return <DeveloperModeIcon {...iconProps} />;
      case 'network': return <SettingsEthernetIcon {...iconProps} />;
      default: return <SchoolIcon {...iconProps} />;
    }
  };

  // צבע רקע ברירת מחדל אם לא מוגדר
  const getBackgroundColor = (iconKey: string) => {
      switch (iconKey) {
          case 'ai': return '#e3f2fd';
          case 'software': return '#e8f5e9';
          case 'security': return '#ffebee';
          default: return '#ffffff';
      }
  };

  return (
    <Container maxWidth="lg">
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
          <Grid key={index}>
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
      )}
    </Container>
  );
};

export default InternshipsManagement;