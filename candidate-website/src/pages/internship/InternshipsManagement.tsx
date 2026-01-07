import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Box, useTheme } from '@mui/material';
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
  const theme = useTheme();

  // Map icon key -> base icon color
  const iconColorMap: { [key: string]: string } = {
    ai: '#3f51b5',
    software: '#4caf50',
    security: '#f44336',
    cloud: '#1976d2',
    data: '#6a1b9a',
    devops: '#ff9800',
    embedded: '#009688',
    network: '#455a64',
  };

  // Card background by icon key for light and dark modes
  const cardBgLight: { [key: string]: string } = {
    ai: '#e3f2fd',
    software: '#e8f5e9',
    security: '#ffebee',
    cloud: '#e3f2fd',
    data: '#f3e5f5',
    devops: '#fff3e0',
    embedded: '#e0f2f1',
    network: '#eceff1',
  };

  const cardBgDark: { [key: string]: string } = {
    ai: '#1a3a52',
    software: '#1b3a1f',
    security: '#3a1a1a',
    cloud: '#16324a',
    data: '#2f1630',
    devops: '#3a2a10',
    embedded: '#073232',
    network: '#263238',
  };

  const getCardBgFromIcon = (iconKey: string | undefined) => {
    const key = iconKey || 'ai';
    return theme.palette.mode === 'dark' ? (cardBgDark[key] || '#1e1e1e') : (cardBgLight[key] || '#ffffff');
  };

  const getIconColor = (baseColor: string) => {
    if (theme.palette.mode === 'dark') {
      // For dark mode, use lighter, brighter icon colors
      const colorMap: { [key: string]: string } = {
        '#3f51b5': '#5c7cfa',
        '#4caf50': '#69db7c',
        '#f44336': '#ff6b6b',
        '#1976d2': '#4dabf7',
        '#6a1b9a': '#b197fc',
        '#ff9800': '#ffa94d',
        '#009688': '#20c997',
        '#455a64': '#748b96',
      };
      return colorMap[baseColor] || baseColor;
    }
    return baseColor;
  };

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
          <Grid key={index}>
            <Paper elevation={3} sx={{ ...styles.card, backgroundColor: getCardBgFromIcon(internship.icon) }}>
              
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