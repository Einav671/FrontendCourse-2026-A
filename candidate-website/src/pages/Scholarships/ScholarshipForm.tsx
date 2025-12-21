import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';

// --- הגדרת המחלקה בתוך הקובץ ---
export class Scholarship {
    id: string;
    code: string;
    name: string;
    targetAudience: string;
    amount: number;
    link: string;
    conditions: string;

    constructor(id: string, code: string, name: string, targetAudience: string, amount: number, link: string, conditions: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.targetAudience = targetAudience;
        this.amount = amount;
        this.link = link;
        this.conditions = conditions;
    }
}
// ------------------------------

const ScholarshipForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // State כללי למניעת שגיאות
  const [formData, setFormData] = useState<any>({
    code: '',
    name: '',
    targetAudience: '',
    amount: '',
    link: '',
    conditions: ''
  });

  const [errors, setErrors] = useState<any>({
    code: false,
    name: false,
    amount: false,
    link: false
  });

  useEffect(() => {
    if (isEditMode) {
      const saved = JSON.parse(localStorage.getItem('scholarships') || '[]');
      const itemToEdit = saved.find((s: any) => s.id === id);
      if (itemToEdit) {
        setFormData(itemToEdit);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    
    // ניקוי שגיאה בעת הקלדה
    if (value.trim() !== '') {
        setErrors((prev: any) => ({ ...prev, [name]: false }));
    }
  };

  const handleSave = () => {
    if (!formData.code || !formData.name || !formData.amount) {
        alert("נא למלא את שדות החובה");
        return;
    }

    const saved = JSON.parse(localStorage.getItem('scholarships') || '[]');
    const newItem = new Scholarship(
        isEditMode ? id! : Date.now().toString(),
        formData.code,
        formData.name,
        formData.targetAudience,
        Number(formData.amount),
        formData.link,
        formData.conditions
    );

    if (isEditMode) {
      const updated = saved.map((item: any) => item.id === id ? newItem : item);
      localStorage.setItem('scholarships', JSON.stringify(updated));
    } else {
      localStorage.setItem('scholarships', JSON.stringify([...saved, newItem]));
    }
    navigate('/scholarships');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת מלגה' : 'הוספת מלגה חדשה'}
        </Typography>

        {/* חזרה לתחביר Grid הקלאסי (item + xs) שעובד בכל גרסה */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth label="קוד מלגה" name="code"
              value={formData.code} onChange={handleChange}
              required error={!!errors.code}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="number" label="סכום (₪)" name="amount"
              value={formData.amount} onChange={handleChange}
              required error={!!errors.amount}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="שם המלגה / נותן המלגה" name="name"
              value={formData.name} onChange={handleChange}
              required error={!!errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="קהל יעד" name="targetAudience"
              value={formData.targetAudience} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="קישור לאתר" name="link"
              value={formData.link} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth multiline rows={3} label="תנאים לקבלה" name="conditions"
              value={formData.conditions} onChange={handleChange}
            />
          </Grid>
        </Grid>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
            שמור
          </Button>
          <Button variant="outlined" color="secondary" startIcon={<ArrowForwardIcon />} onClick={() => navigate('/scholarships')}>
            ביטול
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default ScholarshipForm;