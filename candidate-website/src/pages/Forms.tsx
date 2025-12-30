import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Paper, 
  Stack, 
  Snackbar, 
  Alert,
  Button 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; // אייקון לשליחה
import { PageHeader } from '../components/PageHeader'; // וודא שהנתיב תקין

// הגדרת הממשק לנתוני הטופס
interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

const Forms: React.FC = () => {
  // State לנתונים
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  // State לשגיאות
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false
  });

  // State להודעת הצלחה (Snackbar)
  const [showSuccess, setShowSuccess] = useState(false);

  // פונקציית עזר לביטויים רגולריים (Regex)
  const validators = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // בודק מבנה אימייל תקין
    phone: /^[0-9]{10}$/ // בודק שהמספר מכיל בדיוק 10 ספרות
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // לוגיקת ולידציה
    let isValid = true;

    if (name === 'phone') {
        // בדיקת טלפון: רק ספרות ובדיוק 10 תווים
        isValid = validators.phone.test(value);
    } else if (name === 'email') {
        // בדיקת אימייל
        isValid = validators.email.test(value);
    } else if (name === 'fullName') {
        // בדיקת שם: לא ריק
        isValid = value.trim().length > 0;
    }

    // עדכון סטייט השגיאות (אם השדה הוא לא notes)
    if (name !== 'notes') {
        setErrors((prev) => ({ ...prev, [name]: !isValid }));
    }
  };

  // הטופס תקין רק אם אין שגיאות וכל שדות החובה מלאים
  const isFormValid = 
    !errors.fullName && !errors.email && !errors.phone &&
    formData.fullName !== "" && formData.email !== "" && formData.phone !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    // 1. שמירה ל-localStorage (סימולציה)
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    const newLead = { ...formData, id: Date.now(), date: new Date().toISOString() };
    localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));

    // 2. הצגת פידבק למשתמש
    setShowSuccess(true);

    // 3. איפוס הטופס
    setTimeout(() => {
      setFormData({ fullName: '', email: '', phone: '', notes: '' });
      setErrors({ fullName: false, email: false, phone: false }); // איפוס גם לשגיאות ויזואליות
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <Container maxWidth="sm">
      {/* כותרת הדף */}
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
            />

            <TextField
              label="מספר טלפון"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              helperText={errors.phone ? 'מספר טלפון חייב להכיל 10 ספרות בדיוק' : ''}
              // מגביל את הקלט ברמת ה-HTML
              inputProps={{ maxLength: 10, inputMode: 'numeric' }} 
              required
              fullWidth
            />

            <TextField
              label="הערות נוספות / שאלות"
              name="notes"
              value={formData.notes} 
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            {/* כפתור שליחה רגיל (PageHeader לא מתאים כאן) */}
            <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                disabled={!isFormValid}
                endIcon={<SendIcon />} // ב-RTL האייקון יופיע בצד הנכון
                fullWidth
            >
                שלח פרטים
            </Button>

          </Stack>
        </form>
      </Paper>

      {/* הודעת פידבק */}
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