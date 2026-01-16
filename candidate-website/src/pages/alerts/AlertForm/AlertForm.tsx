import React, { useState, useEffect } from 'react';
import {
  Container, Paper, TextField, Button, MenuItem,
  Snackbar, Alert, Stack, LinearProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/PageHeader';
import { createAlert, getAlertById, updateAlert } from '../../../firebase/alertsService';
import './AlertForm.css'; // Import CSS

const AlertForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    message: '',
    type: 'info'
  });

  const [errors, setErrors] = useState({
    message: false,
    type: false
  });

  useEffect(() => {
    const loadAlert = async () => {
      if (isEdit && id) {
        setLoading(true);
        try {
          const data = await getAlertById(id);
          if (data) {
            setFormData({
              message: data.message,
              type: data.type
            });
          } else {
            alert("ההתראה לא נמצאה");
            navigate('/alerts');
          }
        } catch (error) {
          console.error("Error loading alert:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadAlert();
  }, [id, isEdit, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = event.target.validity ? event.target.validity.valid : value !== '';
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const handleSave = async () => {
    if (!formData.message) {
      setErrors(prev => ({ ...prev, message: true }));
      return;
    }

    setSaving(true);
    try {
      const dataToSend = {
        message: formData.message,
        type: formData.type
      };

      if (isEdit && id) {
        await updateAlert(id, dataToSend);
      } else {
        await createAlert(dataToSend);
      }

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/alerts');
      }, 1500);
    } catch (error) {
      console.error("Error saving alert:", error);
      alert("שגיאה בשמירת ההתראה");
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = !errors.message && !errors.type && formData.message !== "";

  if (loading) {
    return (
      <Container maxWidth="sm" className="form-container">
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="form-container">
      <PageHeader title={isEdit ? 'עריכת התראה' : 'התראה חדשה'} />

      <Paper elevation={3} className="form-paper">
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

          <Stack direction="row" spacing={2} className="form-actions">
            <Button
              variant="contained"
              color="primary"
              startIcon={saving ? null : <SaveIcon />}
              onClick={handleSave}
              disabled={!isFormValid || saving}
              fullWidth
            >
              {saving ? "שומר..." : "שמור וחזור"}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowForwardIcon />}
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
        <Alert severity="success" variant="filled" className="snackbar-alert">
          הנתונים נשמרו בהצלחה!
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default AlertForm;