import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid, MenuItem, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

export class Internship {
  id: string;
  title: string;
  description: string;
  careerPaths: string[];
  skills: string[];
  icon: string; // key for selected icon

  constructor(
    id: string,
    title: string,
    description: string,
    careerPaths: string[],
    skills: string[],
    icon: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.careerPaths = careerPaths;
    this.skills = skills;
    this.icon = icon;
  }
}

const InternshipForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    careerPaths: '',
    skills: '',
    icon: 'ai'
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    careerPaths: false,
    skills: false
  });
  useEffect(() => {
    if (isEditMode) {
      const saved = JSON.parse(localStorage.getItem('internships') || '[]');
      const itemToEdit = saved.find((i: any) => i.id === id);
      if (itemToEdit) setFormData(itemToEdit);
    }
  }, [id, isEditMode]);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    
    // בדיקה בטוחה: אם יש validity (כמו בטקסט רגיל) נשתמש בו.
    // אם אין (כמו לפעמים ב-Select), נבדוק פשוט שהערך לא ריק.
    const isValid = event.target.validity 
        ? event.target.validity.valid 
        : value !== ''; // בדיקת גיבוי

    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  const isFormValid = Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value !== "");

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      alert('יש למלא כותרת ותיאור');
      return;
    }

    const saved = JSON.parse(localStorage.getItem('internships') || '[]');

    const newItem = new Internship(
      isEditMode ? id! : Date.now().toString(),
      formData.title,
      formData.description,
      formData.careerPaths.split(',').map((s: string) => s.trim()).filter(Boolean),
      formData.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
      formData.icon
    );

    if (isEditMode) {
      const updated = saved.map((i: any) => (i.id === id ? newItem : i));
      localStorage.setItem('internships', JSON.stringify(updated));
    } else {
      localStorage.setItem('internships', JSON.stringify([...saved, newItem]));
    }
    navigate('/internships');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת מסלול התמחות' : 'הוספת מסלול התמחות חדש'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="כותרת המסלול"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title ? 'יש למלא כותרת' : ''}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="תיאור המסלול"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description ? 'יש למלא תיאור' : ''}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="כיווני קריירה (מופרדים בפסיקים)"
              name="careerPaths"
              value={formData.careerPaths}
              required
              error={!!errors.careerPaths}
              helperText={errors.careerPaths ? '(לפחות אחד)יש למלא כיווני קריירה' : ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="מיומנויות נרכשות (מופרדות בפסיקים)"
              name="skills"
              value={formData.skills}
              required
              error={!!errors.skills}
              helperText={errors.skills ? '(לפחות אחד)יש למלא מיומנויות נרכשות' : ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="אייקון מסלול"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
            >
              <MenuItem value="ai">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon sx={{ color: '#3f51b5' }} />
                  בינה מלאכותית (AI)
                </Box>
              </MenuItem>
              <MenuItem value="software">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CodeIcon sx={{ color: '#4caf50' }} />
                  פיתוח תוכנה
                </Box>
              </MenuItem>
              <MenuItem value="security">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ color: '#f44336' }} />
                  אבטחת מידע
                </Box>
              </MenuItem>
              <MenuItem value="cloud">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CloudIcon sx={{ color: '#1976d2' }} />
                  ענן ותשתיות
                </Box>
              </MenuItem>
              <MenuItem value="data">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorageIcon sx={{ color: '#6a1b9a' }} />
                  נתונים ומסדי נתונים
                </Box>
              </MenuItem>
              <MenuItem value="devops">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BuildIcon sx={{ color: '#ff9800' }} />
                  DevOps / תשתיות
                </Box>
              </MenuItem>
              <MenuItem value="embedded">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DeveloperModeIcon sx={{ color: '#009688' }} />
                  מערכות משובצות
                </Box>
              </MenuItem>
              <MenuItem value="network">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SettingsEthernetIcon sx={{ color: '#455a64' }} />
                  רשתות ותקשורת
                </Box>
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
          <Button variant="contained" onClick={handleSave} startIcon={<SaveIcon />} disabled={!isFormValid}>
            שמור
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/internships')}
            startIcon={<ArrowForwardIcon />}
          >
            ביטול
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default InternshipForm;