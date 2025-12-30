import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Paper, 
  Stack, 
  Snackbar, 
  Alert 
} from '@mui/material';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // בדיקת ולידציה בסיסית בעת הקלדה
    const isValid = event.target.validity.valid && value !== '';
    if (name !== 'notes') {
        setErrors((prev) => ({ ...prev, [name]: !isValid }));
    }
  };

  const isFormValid = 
    !errors.fullName && !errors.email && !errors.phone &&
    formData.fullName !== "" && formData.email !== "" && formData.phone !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. שמירה ל-localStorage (סימולציה של שליחה לשרת)
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    const newLead = { ...formData, id: Date.now(), date: new Date().toISOString() };
    localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));

    // 2. הצגת פידבק למשתמש
    setShowSuccess(true);

    // 3. איפוס הטופס לאחר השהיה קצרה (כדי שהמשתמש יראה את ההודעה)
    setTimeout(() => {
      setFormData({ fullName: '', email: '', phone: '', notes: '' });
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <Container maxWidth="sm">
      {/* שימוש בקומפוננטה המשותפת לכותרת */}
      <PageHeader 
        title="מתעניינים בתואר?" 
        // במידה ורוצים כפתור נוסף אפשר להוסיף כאן, כרגע זה טופס רישום אז לא חובה
      />

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          {/* שימוש ב-Stack לסידור אנכי ומרווחים אחידים */}
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

            <TextField
              label="הערות נוספות / שאלות"
              name="notes"
              value={formData.notes} 
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            {/* הכפתור הראשי של הטופס */}
            <PageHeader 
                title="" 
                buttonText="שלח פרטים" 
                onButtonClick={() => { /* הקליק מטופל ע"י ה-form submit */ }} 
            />
             {/* הערה: אם PageHeader לא תומך ב-type="submit", עדיף להשתמש בכפתור רגיל בתוך ה-Stack: */}
             {/* <Button type="submit" variant="contained" size="large" disabled={!isFormValid}>
                שלח פרטים
             </Button> 
             */}
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