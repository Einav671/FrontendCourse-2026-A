import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, TextField, Button, MenuItem, 
  Snackbar, Alert, Stack 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { SystemAlert } from './SystemAlert';
// ייבוא הכותרת המשותפת
import { PageHeader } from '../../components/PageHeader';

const AlertForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [showSuccess, setShowSuccess] = useState(false);

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
      const saved: SystemAlert[] = JSON.parse(localStorage.getItem('system-alerts') || '[]');
      const found = saved.find((a) => a.id === id);
      
      if (found) {
        setFormData({
            message: found.message,
            type: found.type
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = event.target.validity ? event.target.validity.valid : value !== '';
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const handleSave = () => {
    const saved: SystemAlert[] = JSON.parse(localStorage.getItem('system-alerts') || '[]');
    const newAlert = new SystemAlert(
      isEdit ? id! : Date.now().toString(),
      formData.message,
      formData.type
    );

    if (isEdit) {
      const updated = saved.map((a) => a.id === id ? newAlert : a);
      localStorage.setItem('system-alerts', JSON.stringify(updated));
    } else {
      localStorage.setItem('system-alerts', JSON.stringify([...saved, newAlert]));
    }
    
    setShowSuccess(true);
    setTimeout(() => {
        navigate('/alerts');
    }, 1500);
  };

  const isFormValid = Object.values(errors).every((error) => !error) && formData.message !== "";

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* כותרת הדף */}
      <PageHeader title={isEdit ? 'עריכת התראה' : 'התראה חדשה'} />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3}>
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

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={!isFormValid}
                    fullWidth
                >
                    שמור וחזור
                </Button>

                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<ArrowForwardIcon />} // האייקון יתהפך אוטומטית ב-RTL
                    onClick={() => navigate('/alerts')}
                    fullWidth
                >
                    ביטול
                </Button>
            </Stack>
        </Stack>
      </Paper>

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={1500} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          הנתונים נשמרו בהצלחה!
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default AlertForm;