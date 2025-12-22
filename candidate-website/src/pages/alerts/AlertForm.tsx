// src/pages/alerts/AlertForm.tsx
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import { SystemAlert } from './SystemAlert';

const AlertForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({ message: '', type: 'info' });
  const [errors, setErrors] = useState({ message: false });

  useEffect(() => {
    if (isEdit) {
      const saved = JSON.parse(localStorage.getItem('system-alerts') || '[]');
      const found = saved.find((a: any) => a.id === id);
      if (found) setFormData(found);
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'message') setErrors({ message: false });
  };

  const handleSave = () => {
    if (!formData.message) {
        setErrors({ message: true });
        return;
    }

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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            {isEdit ? 'עריכת התראה' : 'התראה חדשה'}
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    fullWidth label="תוכן ההודעה" name="message" 
                    value={formData.message} onChange={handleChange}
                    error={errors.message} helperText={errors.message ? "שדה חובה" : ""}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField select fullWidth label="סוג התראה" name="type" value={formData.type} onChange={handleChange}>
                    <MenuItem value="success">הצלחה (ירוק)</MenuItem>
                    <MenuItem value="warning">אזהרה (כתום)</MenuItem>
                    <MenuItem value="error">שגיאה (אדום)</MenuItem>
                    <MenuItem value="info">מידע (כחול)</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                    שמור
                </Button>
            </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AlertForm;