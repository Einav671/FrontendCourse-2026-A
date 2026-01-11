import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Paper, 
  Stack, 
  Snackbar, 
  Alert,
  Button,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { PageHeader } from '../components/PageHeader';
import { createLead, type Lead } from '../firebase/leadsService'; // וודא שהנתיב נכון

const Forms: React.FC = () => {
  // State לנתונים
  const [formData, setFormData] = useState<Lead>({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // סטייט לנעילת הכפתור בזמן שליחה

  const validators = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{10}$/
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    let isValid = true;
    if (name === 'phone') isValid = validators.phone.test(value);
    else if (name === 'email') isValid = validators.email.test(value);
    else if (name === 'fullName') isValid = value.trim().length > 0;

    if (name !== 'notes') {
        setErrors((prev) => ({ ...prev, [name]: !isValid }));
    }
  };

  const isFormValid = 
    !errors.fullName && !errors.email && !errors.phone &&
    formData.fullName !== "" && formData.email !== "" && formData.phone !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true); // התחלת טעינה

    try {
        // שליחה ל-Firebase
        await createLead(formData);

        // הצגת פידבק למשתמש
        setShowSuccess(true);

        // איפוס הטופס
        setFormData({ fullName: '', email: '', phone: '', notes: '' });
        setErrors({ fullName: false, email: false, phone: false });

    } catch (error) {
        console.error("Error submitting form: ", error);
        alert("אירעה שגיאה בשליחת הטופס, אנא נסה שוב מאוחר יותר.");
    } finally {
        setIsSubmitting(false); // סיום טעינה
    }
  };

  return (
    <Container maxWidth="sm">
      <PageHeader title="מתעניינים בתואר?" />

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            
            <TextField
              label="שם מלא"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              helperText={errors.fullName ? 'שם מלא הוא שדה חובה' : ''}
              required
              fullWidth
              disabled={isSubmitting} // חסימת שדות בזמן שליחה
            />

            <TextField
              label="כתובת אימייל"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email ? 'נא להזין כתובת אימייל תקינה' : ''}
              required
              fullWidth
              disabled={isSubmitting}
            />

            <TextField
              label="מספר טלפון"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              helperText={errors.phone ? 'מספר טלפון חייב להכיל 10 ספרות בדיוק' : ''}
              inputProps={{ maxLength: 10, inputMode: 'numeric' }} 
              required
              fullWidth
              disabled={isSubmitting}
            />

            <TextField
              label="הערות נוספות / שאלות"
              name="notes"
              value={formData.notes} 
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              disabled={isSubmitting}
            />

            <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                disabled={!isFormValid || isSubmitting}
                endIcon={isSubmitting ? null : <SendIcon />}
                fullWidth
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "שלח פרטים"}
            </Button>

          </Stack>
        </form>
      </Paper>

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          הפרטים נשמרו בהצלחה! נחזור אליך בהקדם.
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default Forms;