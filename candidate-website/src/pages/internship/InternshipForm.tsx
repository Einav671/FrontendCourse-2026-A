import React, { useState, useEffect } from 'react';
import { 
  Container, TextField, Button, Paper, MenuItem, Box, 
  Snackbar, Alert, Stack, CircularProgress 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';

// אייקונים לבחירה
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';

// Service
import { createInternship, getInternshipById, updateInternship } from '../../firebase/internshipsService';

interface InternshipFormState {
    title: string;
    description: string;
    careerPaths: string; // נשמר בטופס כמחרוזת עם פסיקים
    skills: string;      // נשמר בטופס כמחרוזת עם פסיקים
    icon: string;
}

const InternshipForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  // טעינת נתונים לעריכה
  useEffect(() => {
    const loadData = async () => {
        if (isEditMode && id) {
            setLoading(true);
            try {
                const data = await getInternshipById(id);
                if (data) {
                    setFormData({
                        title: data.title,
                        description: data.description,
                        // המרה ממערך למחרוזת לתצוגה בשדה
                        careerPaths: Array.isArray(data.careerPaths) ? data.careerPaths.join(', ') : '',
                        skills: Array.isArray(data.skills) ? data.skills.join(', ') : '',
                        icon: data.icon
                    });
                } else {
                    alert("המסלול לא נמצא");
                    navigate('/internships');
                }
            } catch (error) {
                console.error("Error loading:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    loadData();
  }, [id, isEditMode, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = event.target.validity ? event.target.validity.valid : value !== ''; 
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const isFormValid = Object.values(errors).every((error) => !error) && 
                      formData.title !== "" && formData.description !== "";

  const handleSave = async () => {
    if (!formData.title || !formData.description) return;

    setSaving(true);
    try {
        const dataToSend = {
            title: formData.title,
            description: formData.description,
            // המרה ממחרוזת למערך
            careerPaths: formData.careerPaths.split(',').map(s => s.trim()).filter(Boolean),
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            icon: formData.icon,
            // אפשר להוסיף לוגיקה לבחירת צבע לפי האייקון כאן אם רוצים לשמור ב-DB
        };

        if (isEditMode && id) {
            await updateInternship(id, dataToSend);
        } else {
            await createInternship(dataToSend);
        }

        setShowSuccess(true);
        setTimeout(() => {
            navigate('/internships');
        }, 1500);

    } catch (error) {
        console.error("Error saving:", error);
        alert("שגיאה בשמירה");
    } finally {
        setSaving(false);
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

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
              placeholder="למשל: מפתח Full Stack, ראש צוות, יועץ טכנולוגי"
              required
            />
          
            <TextField
              fullWidth label="מיומנויות נרכשות (מופרדות בפסיקים)" name="skills"
              value={formData.skills} onChange={handleChange}
              error={!!errors.skills} helperText={errors.skills ? 'שדה חובה' : ''}
              placeholder="למשל: React, Node.js, Agile"
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
                    startIcon={saving ? null : <SaveIcon />} 
                    disabled={!isFormValid || saving} fullWidth
                >
                    {saving ? "שומר..." : "שמור"}
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