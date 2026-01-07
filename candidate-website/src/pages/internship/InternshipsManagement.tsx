import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Box, CircularProgress, IconButton } from '@mui/material';
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
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  // פונקציה לטעינת הנתונים
  const fetchInternships = async () => {
    setLoading(true);
    try {
      const data = await getAllInternships();
      setInternships(data);
    } catch (error) {
      console.error("Error fetching internships:", error);
      alert("שגיאה בטעינת הנתונים");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("האם למחוק את מסלול ההתמחות?")) {
      try {
        await deleteInternship(id);
        setInternships(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting:", error);
        alert("שגיאה במחיקה");
      }
    }
  };

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

      {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
          </Box>
      ) : internships.length === 0 ? (
          <Typography align="center">לא נמצאו מסלולי התמחות.</Typography>
      ) : (
        <Grid container spacing={4}>
            {internships.map((internship) => (
            <Grid key={internship.id}>
                <Paper elevation={3} sx={{ ...styles.card, backgroundColor: internship.color || getBackgroundColor(internship.icon) }}>
                
                {/* כפתורי ניהול בפינה */}
                <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" onClick={() => navigate(`/internships/edit/${internship.id}`)} sx={{ bgcolor: 'rgba(255,255,255,0.7)' }}>
                        <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(internship.id)} sx={{ bgcolor: 'rgba(255,255,255,0.7)' }}>
                        <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                </Box>

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