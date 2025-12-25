// src/pages/alerts/AlertForm.tsx
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { SystemAlert } from './SystemAlert';

const AlertForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    message: '',
    type: 'info'
  });

  const [errors, setErrors] = useState({
    message: false,
    type: false
  });

  useEffect(() => {
    if (isEdit) {
      const saved = JSON.parse(localStorage.getItem('system-alerts') || '[]');
      const found = saved.find((a: any) => a.id === id);
      if (found) setFormData(found);
    }
  }, [id, isEdit]);

  // --- התיקון נמצא כאן ---
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    const isValid = event.target.validity
      ? event.target.validity.valid
      : value !== ''; // בדיקת גיבוי

    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };
  // ----------------------

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('system-alerts') || '[]');

    const newAlert = new SystemAlert(
      isEdit ? id! : Date.now().toString(),
      formData.message,
      formData.type
    );

    if (isEdit) {
      const updated = saved.map((a: any) => a.id === id ? newAlert : a);
      localStorage.setItem('system-alerts', JSON.stringify(updated));
    } else {
      localStorage.setItem('system-alerts', JSON.stringify([...saved, newAlert]));
    }
    navigate('/alerts');
  };

  const isFormValid = Object.values(errors).every((error) => !error) &&
    Object.values(formData).every((value) => value !== "");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          {isEdit ? 'עריכת התראה' : 'התראה חדשה'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="תוכן ההודעה"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              error={!!errors.message}
              helperText={errors.message ? "תוכן ההודעה נדרש" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="סוג התראה"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              error={!!errors.type}
            >
              <MenuItem value="success">הצלחה (ירוק)</MenuItem>
              <MenuItem value="warning">אזהרה (כתום)</MenuItem>
              <MenuItem value="error">שגיאה (אדום)</MenuItem>
              <MenuItem value="info">מידע (כחול)</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!isFormValid}
          >
            שמור וחזור
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/alerts')}
          >
            ביטול
          </Button>
        </div>

      </Paper>
    </Container>
  );
};

export default AlertForm;