import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Paper, Grid, MenuItem 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { Candidate } from './Candidate';

const CandidateForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // 1. State לנתונים (כל השדות של המועמד)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    degreeCode: 'CS',
    bagrut: '',
    psychometric: '',
    status: 'נפתח'
  });

  // 2. State לשגיאות - בוליאני (כמו בקוד שביקשת)
  // true = יש שגיאה, false = תקין
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    degreeCode: false,
    bagrut: false,
    psychometric: false,
    status: false,
  });

  // טעינת נתונים בעריכה
  useEffect(() => {
    if (isEditMode) {
      const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
      const candidateToEdit = savedCandidates.find((c: Candidate) => c.id === id);
      if (candidateToEdit) {
        setFormData(candidateToEdit);
      }
    }
  }, [id, isEditMode]);

  // 3. פונקציית השינוי עם הולידציה המבוקשת
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, validity } = event.target;
    
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    
    // בדיקה האם השדה תקין לפי חוקי ה-HTML שהגדרנו למטה (pattern, min, max, required)
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !validity.valid }));
  };

  const handleSave = () => {
    // אין צורך בפונקציית validate ידנית כי הכפתור יהיה נעול אם יש שגיאות
    const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    
    // המרת המספרים ל-number לפני השמירה
    const candidateData = new Candidate(
        isEditMode ? id! : Date.now().toString(),
        formData.fullName,
        formData.email,
        formData.phone,
        formData.degreeCode,
        Number(formData.bagrut),
        Number(formData.psychometric),
        formData.status
    );

    if (isEditMode) {
      const updatedCandidates = savedCandidates.map((c: any) => 
        c.id === id ? candidateData : c
      );
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    } else {
      localStorage.setItem('candidates', JSON.stringify([...savedCandidates, candidateData]));
    }

    navigate('/candidates');
  };

  // 4. בדיקה האם הטופס תקין לשימוש בכפתור השמירה
  const isFormValid = Object.values(errors).every((error) => !error) && 
                      Object.values(formData).every((value) => value !== "");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת מועמד' : 'מועמד חדש'}
        </Typography>

        <Grid container spacing={2}>
          
          {/* שם מלא */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="שם מלא"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={!!errors.fullName}
              helperText={errors.fullName ? "שם מלא הוא שדה חובה" : ""}
            />
          </Grid>

          {/* אימייל */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="אימייל"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email ? "אימייל לא תקין" : ""}
            />
          </Grid>

          {/* טלפון - 10 ספרות בדיוק */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="tel"
              label="טלפון (10 ספרות)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!!errors.phone}
              helperText={errors.phone ? "מספר טלפון חייב להכיל 10 ספרות בדיוק" : ""}
              // Regex: בדיוק 10 ספרות (0-9)
              inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
            />
          </Grid>
          
          {/* תואר */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="תואר התעניינות"
              name="degreeCode"
              value={formData.degreeCode}
              onChange={handleChange}
              required
              error={!!errors.degreeCode}
              helperText={errors.degreeCode ? "יש לבחור תואר" : ""}
            >
              <MenuItem value="CS">מדעי המחשב</MenuItem>
              <MenuItem value="PSY">פסיכולוגיה</MenuItem>
              <MenuItem value="LAW">משפטים</MenuItem>
            </TextField>
          </Grid>

          {/* בגרות - 55 עד 120 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="ממוצע בגרות"
              name="bagrut"
              value={formData.bagrut}
              onChange={handleChange}
              required
              error={!!errors.bagrut}
              helperText={errors.bagrut ? "טווח תקין: 55-120" : ""}
              // HTML5 Validation Attributes
              inputProps={{ min: 55, max: 120 }}
            />
          </Grid>

          {/* פסיכומטרי - 200 עד 800 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="פסיכומטרי"
              name="psychometric"
              value={formData.psychometric}
              onChange={handleChange}
              required
              error={!!errors.psychometric}
              helperText={errors.psychometric ? "טווח תקין: 200-800" : ""}
              // HTML5 Validation Attributes
              inputProps={{ min: 200, max: 800 }}
            />
          </Grid>

          {/* סטטוס */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="סטטוס טיפול"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              error={!!errors.status}
            >
              <MenuItem value="נפתח">נפתח</MenuItem>
              <MenuItem value="בטיפול">בטיפול</MenuItem>
              <MenuItem value="התקבל">התקבל</MenuItem>
              <MenuItem value="נדחה">נדחה</MenuItem>
              <MenuItem value="נסגר">נסגר</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!isFormValid} // הכפתור מושבת אם הטופס לא תקין
          >
            שמור
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            startIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/candidates')}
          >
            ביטול
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default CandidateForm;