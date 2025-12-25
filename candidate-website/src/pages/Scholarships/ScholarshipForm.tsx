import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';

// --- הגדרת המחלקה בתוך הקובץ ---
export class Scholarship {
    code: string;
    name: string;
    targetAudience: string;
    amount: number;
    link: string;
    conditions: string;

    constructor(code: string, name: string, targetAudience: string, amount: number, link: string, conditions: string) {
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
  const [formData, setFormData] = useState<Scholarship>({
    code: '',
    name: '',
    targetAudience: '',
    amount: 0,
    link: '',
    conditions: ''
  });

  const [errors, setErrors] = useState({
    code: false,
    name: false,
    amount: false,
    link: false
  });

  useEffect(() => {
    if (isEditMode) {
      const saved = JSON.parse(localStorage.getItem('scholarships') || '[]');
      const itemToEdit = saved.find((s: Scholarship) => s.id === id);
      if (itemToEdit) {
        setFormData(itemToEdit);
      }
    }
  }, [id, isEditMode]);

//  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, validity } = event.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: !validity.valid }));
//   };
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
    if (!formData.code || !formData.name || !formData.amount) {
        alert("נא למלא את שדות החובה");
        return;
    }

    const saved = JSON.parse(localStorage.getItem('scholarships') || '[]');
    const newItem = new Scholarship(
        formData.code,
        formData.name,
        formData.targetAudience,
        Number(formData.amount),
        formData.link,
        formData.conditions
    );
    (newItem as any).id = isEditMode ? id : Date.now().toString();

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
              helperText={errors.code ? 'נא למלא קוד מלגה' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="number" label="סכום (₪)" name="amount"
              value={formData.amount} onChange={handleChange}
              required error={!!errors.amount}
              slotProps={{ htmlInput: { min: 0 } }}
              helperText={errors.amount ? 'נא למלא סכום תקין' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="שם המלגה / נותן המלגה" name="name"
              value={formData.name} onChange={handleChange}
              required error={!!errors.name}
              helperText={errors.name ? 'נא למלא שם מלגה' : ''}
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
              type="url"
              placeholder="https://"
              error={!!errors.link}
              required
              helperText={errors.link ? 'נא למלא קישור תקין' : ''}
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
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave} disabled={!isFormValid}>
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