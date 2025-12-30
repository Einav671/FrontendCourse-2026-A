import React, { useState, useEffect } from 'react';
import { 
  Container, TextField, Button, Paper, MenuItem, Box, 
  Snackbar, Alert, Stack 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';

// אייקונים
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
//import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
//import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

export class Internship {
  id: string;
  title: string;
  description: string;
  careerPaths: string[];
  skills: string[];
  icon: string;
  // ... constructor unchanged
  constructor(id:string, title:string, description:string, careerPaths:string[], skills:string[], icon:string) {
      this.id=id; this.title=title; this.description=description; this.careerPaths=careerPaths; this.skills=skills; this.icon=icon;
  }
}

interface InternshipFormState {
    title: string;
    description: string;
    careerPaths: string;
    skills: string;
    icon: string;
}

const InternshipForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<InternshipFormState>({
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
      
      if (itemToEdit) {
        setFormData({
            title: itemToEdit.title,
            description: itemToEdit.description,
            careerPaths: Array.isArray(itemToEdit.careerPaths) ? itemToEdit.careerPaths.join(', ') : itemToEdit.careerPaths,
            skills: Array.isArray(itemToEdit.skills) ? itemToEdit.skills.join(', ') : itemToEdit.skills,
            icon: itemToEdit.icon
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = event.target.validity ? event.target.validity.valid : value !== ''; 
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const isFormValid = Object.values(errors).every((error) => !error) && 
                      Object.values(formData).every((value) => value !== "");

  const handleSave = () => {
    if (!formData.title || !formData.description) return;

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

    setShowSuccess(true);
    setTimeout(() => {
        navigate('/internships');
    }, 1500);
  };

  return (
    <Container maxWidth="sm">
      <PageHeader title={isEditMode ? 'עריכת מסלול התמחות' : 'הוספת מסלול התמחות חדש'} />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3}>
            <TextField
              fullWidth label="כותרת המסלול" name="title"
              value={formData.title} onChange={handleChange}
              error={!!errors.title} helperText={errors.title ? 'יש למלא כותרת' : ''}
              required
            />
          
            <TextField
              fullWidth multiline rows={4} label="תיאור המסלול" name="description"
              value={formData.description} onChange={handleChange}
              error={!!errors.description} helperText={errors.description ? 'יש למלא תיאור' : ''}
              required
            />
          
            <TextField
              fullWidth label="כיווני קריירה (מופרדים בפסיקים)" name="careerPaths"
              value={formData.careerPaths} onChange={handleChange}
              error={!!errors.careerPaths} helperText={errors.careerPaths ? 'שדה חובה' : ''}
              required
            />
          
            <TextField
              fullWidth label="מיומנויות נרכשות (מופרדות בפסיקים)" name="skills"
              value={formData.skills} onChange={handleChange}
              error={!!errors.skills} helperText={errors.skills ? 'שדה חובה' : ''}
              required
            />
          
            <TextField
              select fullWidth label="אייקון מסלול" name="icon"
              value={formData.icon} onChange={handleChange}
            >
              <MenuItem value="ai"><Box sx={{ display: 'flex', gap: 1 }}><SchoolIcon color="primary" />בינה מלאכותית (AI)</Box></MenuItem>
              <MenuItem value="software"><Box sx={{ display: 'flex', gap: 1 }}><CodeIcon color="success" />פיתוח תוכנה</Box></MenuItem>
              <MenuItem value="security"><Box sx={{ display: 'flex', gap: 1 }}><SecurityIcon color="error" />אבטחת מידע</Box></MenuItem>
              <MenuItem value="cloud"><Box sx={{ display: 'flex', gap: 1 }}><CloudIcon color="info" />ענן ותשתיות</Box></MenuItem>
              <MenuItem value="data"><Box sx={{ display: 'flex', gap: 1 }}><StorageIcon color="secondary" />נתונים</Box></MenuItem>
              <MenuItem value="devops"><Box sx={{ display: 'flex', gap: 1 }}><BuildIcon color="warning" />DevOps</Box></MenuItem>
            </TextField>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                    variant="contained" onClick={handleSave} 
                    startIcon={<SaveIcon />} disabled={!isFormValid} fullWidth
                >
                    שמור
                </Button>
                <Button
                    variant="outlined" color="secondary" onClick={() => navigate('/internships')}
                    startIcon={<ArrowForwardIcon />} fullWidth
                >
                    ביטול
                </Button>
            </Stack>
        </Stack>
      </Paper>

      <Snackbar 
        open={showSuccess} autoHideDuration={1500} onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          המסלול נשמר בהצלחה!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InternshipForm;