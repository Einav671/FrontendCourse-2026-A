import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Forms: React.FC = () => {
  // 1. תיקון: הוספת notes ל-State ההתחלתי
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '' // <--- הוספנו את זה כאן
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    notes: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    
    const isValid = event.target.validity 
        ? event.target.validity.valid 
        : value !== ''; 

    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  // 2. תיקון: בדיקת התקינות לא צריכה לכלול את notes (כי הוא אופציונלי)
  // אנו בודקים שאין שגיאות באף שדה, ושרק שדות החובה מלאים
  const isFormValid = 
    !errors.fullName && !errors.email && !errors.phone && // אין שגיאות
    formData.fullName !== "" && formData.email !== "" && formData.phone !== ""; // שדות חובה מלאים

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert(`תודה ${formData.fullName}, פרטייך התקבלו! נחזור אליך למספר ${formData.phone}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          מתעניינים בתואר?
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          השאירו פרטים ונציג אקדמי יחזור אליכם בהקדם לבדיקת התאמה.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          <TextField
            label="שם מלא"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            helperText={errors.fullName ? 'שם מלא הוא שדה חובה' : ''}
            required
            fullWidth
          />

          <TextField
            label="כתובת אימייל"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email ? 'אימייל לא תקין' : ''}
            required
            fullWidth
          />

          <TextField
            label="מספר טלפון"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            helperText={errors.phone ? 'מספר טלפון חייב להכיל 10 ספרות בדיוק' : ''}
            inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
            required
            fullWidth
          />

          {/* כעת זה יעבוד כי notes קיים ב-formData */}
          <TextField
            label="הערות נוספות / שאלות"
            name="notes"
            value={formData.notes} 
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            endIcon={<SendIcon />}
            sx={{ mt: 2 }}
            disabled={!isFormValid}
          >
            שלח פרטים
          </Button>

        </Box>
      </Paper>
    </Container>
  );
};

export default Forms;