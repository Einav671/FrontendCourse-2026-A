import React, { useState } from 'react';
import {
  Container, TextField, Paper, Stack, Snackbar, Alert, Button, CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { PageHeader } from '../../components/PageHeader'; // שים לב: הנתיב יתעדכן כשנעביר תיקייה
import { createLead} from '../../firebase/leadsService'; // שים לב: הנתיב יתעדכן
import './Forms.css'; // Import CSS
import type { Lead } from './types/lead';

const Forms: React.FC = () => {
  const [formData, setFormData] = useState<Lead>({
    id: '', // שדה ID יתווסף אוטומטית ב-Firebase, אבל אנחנו צריכים אותו במודל שלנו
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [errors, setErrors] = useState({
    fullName: false, email: false, phone: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);

    try {
      const leadWithTimestamp = {
        ...formData,
        createdAt: new Date()
      };
      await createLead(leadWithTimestamp);
      setShowSuccess(true);
      setFormData({id: '', fullName: '', email: '', phone: '', notes: '', createdAt: undefined});
      setErrors({ fullName: false, email: false, phone: false });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("אירעה שגיאה בשליחת הטופס, אנא נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" className="forms-container">
      <PageHeader title="מתעניינים בתואר?" />

      <Paper elevation={3} className="forms-paper">
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>

            <TextField
              label="שם מלא" name="fullName"
              value={formData.fullName} onChange={handleChange}
              error={errors.fullName} required fullWidth disabled={isSubmitting}
              helperText={errors.fullName ? 'שם מלא הוא שדה חובה' : ''}
            />

            <TextField
              label="כתובת אימייל" name="email" type="email"
              value={formData.email} onChange={handleChange}
              error={errors.email} required fullWidth disabled={isSubmitting}
              helperText={errors.email ? 'נא להזין כתובת אימייל תקינה' : ''}
            />

            <TextField
              label="מספר טלפון" name="phone" type="tel"
              value={formData.phone} onChange={handleChange}
              error={errors.phone} required fullWidth disabled={isSubmitting}
              helperText={errors.phone ? 'מספר טלפון חייב להכיל 10 ספרות בדיוק' : ''}
              inputProps={{ maxLength: 10, inputMode: 'numeric' }}
            />

            <TextField
              label="הערות נוספות / שאלות" name="notes"
              value={formData.notes} onChange={handleChange}
              multiline rows={4} fullWidth disabled={isSubmitting}
            />

            <Button
              type="submit" variant="contained" size="large"
              disabled={!isFormValid || isSubmitting}
              endIcon={isSubmitting ? null : <SendIcon />}
              fullWidth className="submit-button"
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "שלח פרטים"}
            </Button>

          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={showSuccess} autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" className="snackbar-alert">
          הפרטים נשמרו בהצלחה! נחזור אליך בהקדם.
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default Forms;