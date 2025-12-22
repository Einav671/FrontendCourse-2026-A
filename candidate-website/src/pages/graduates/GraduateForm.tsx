import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';

// --- הגדרת המחלקה ---
export class Graduate {
    id: string;
    fullName: string;
    role: string;
    degree: string;
    imageUrl: string;
    review: string;
    status: 'pending' | 'approved' | 'rejected';

    constructor(
        id: string, 
        fullName: string, 
        role: string, 
        degree: string, 
        imageUrl: string, 
        review: string,
        status: 'pending' | 'approved' | 'rejected' = 'pending'
    ) {
        this.id = id;
        this.fullName = fullName;
        this.role = role;
        this.degree = degree;
        this.imageUrl = imageUrl;
        this.review = review;
        this.status = status;
    }
}
// --------------------

const GraduateForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<any>({
    fullName: '',
    role: '',
    degree: 'מדעי המחשב',
    imageUrl: '',
    review: '',
    status: 'pending'
  });

  useEffect(() => {
    if (isEditMode) {
      const saved = JSON.parse(localStorage.getItem('graduates') || '[]');
      const itemToEdit = saved.find((g: any) => g.id === id);
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

  const handleSave = () => {
    if (!formData.fullName || !formData.role) {
        alert("יש למלא שם ותפקיד");
        return;
    }

    const saved = JSON.parse(localStorage.getItem('graduates') || '[]');
    
    const newItem = new Graduate(
        isEditMode ? id! : Date.now().toString(),
        formData.fullName,
        formData.role,
        formData.degree,
        formData.imageUrl,
        formData.review,
        formData.status 
    );

    if (isEditMode) {
      const updated = saved.map((g: any) => g.id === id ? newItem : g);
      localStorage.setItem('graduates', JSON.stringify(updated));
    } else {
      localStorage.setItem('graduates', JSON.stringify([...saved, newItem]));
    }
    navigate('/graduates');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת פרטי בוגר' : 'הוספת בוגר חדש'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth label="שם מלא" name="fullName"
              value={formData.fullName} onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth label="תפקיד נוכחי" name="role"
              value={formData.role} onChange={handleChange}
              required
              placeholder="למשל: מפתח Full Stack"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select fullWidth label="תואר" name="degree"
              value={formData.degree} onChange={handleChange}
            >
                <MenuItem value="מדעי המחשב">מדעי המחשב</MenuItem>
                <MenuItem value="מערכות מידע">מערכות מידע</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="קישור לתמונה (URL)" name="imageUrl"
              value={formData.imageUrl} onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth multiline rows={4} label="סיפור הצלחה / חוות דעת" name="review"
              value={formData.review} onChange={handleChange}
            />
          </Grid>
          
          {isEditMode && (
              <Grid item xs={12}>
                <TextField
                  select fullWidth label="סטטוס אישור" name="status"
                  value={formData.status} onChange={handleChange}
                >
                    <MenuItem value="pending">ממתין לאישור</MenuItem>
                    <MenuItem value="approved">מאושר</MenuItem>
                    <MenuItem value="rejected">נדחה</MenuItem>
                </TextField>
              </Grid>
          )}
        </Grid>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
          <Button variant="contained" onClick={handleSave} startIcon={<SaveIcon />}>שמור</Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/graduates')} startIcon={<ArrowForwardIcon />}>ביטול</Button>
        </div>
      </Paper>
    </Container>
  );
};

export default GraduateForm;