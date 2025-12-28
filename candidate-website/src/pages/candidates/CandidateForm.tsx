import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Paper, MenuItem,
  Snackbar, Alert, Stack // החלפנו את Grid ב-Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { Candidate } from './Candidate';

const CandidateForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    degreeCode: 'CS',
    bagrut: '',
    psychometric: '',
    status: 'נפתח'
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    degreeCode: false,
    bagrut: false,
    psychometric: false,
    status: false,
  });

  useEffect(() => {
    if (isEditMode) {
      const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
      const candidateToEdit = savedCandidates.find((c: Candidate) => c.id === id);
      if (candidateToEdit) {
        setFormData(candidateToEdit);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    const isValid = event.target.validity
      ? event.target.validity.valid
      : value !== '';

    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  const handleSave = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');

    const candidateData = new Candidate(
      isEditMode ? id! : Date.now().toString(),
      formData.firstName,
      formData.lastName,
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

    setShowSuccess(true);
    setTimeout(() => {
        navigate('/candidates');
    }, 1500);
  };

  const isFormValid = Object.values(errors).every((error) => !error) &&
    Object.values(formData).every((value) => value !== "");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת מועמד' : 'מועמד חדש'}
        </Typography>

        {/* שימוש ב-Stack במקום Grid - הרבה יותר נקי */}
        <Stack spacing={2}>
          
          {/* שורה ראשונה: שם פרטי ושם משפחה */}
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="שם פרטי"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              error={!!errors.firstName}
              helperText={errors.firstName ? "שדה חובה" : ""}
            />
            <TextField
              fullWidth
              label="שם משפחה"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              error={!!errors.lastName}
              helperText={errors.lastName ? "שדה חובה" : ""}
            />
          </Stack>

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

          <TextField
            fullWidth
            type="tel"
            label="טלפון (10 ספרות)"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={!!errors.phone}
            helperText={errors.phone ? "נדרשות 10 ספרות" : ""}
            inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
          />

          <TextField
            fullWidth
            label="תואר התעניינות"
            value="מדעי המחשב"
            InputProps={{ readOnly: true }}
            variant="filled"
            helperText="מסלול לימודים קבוע"
          />

          {/* שורה לציונים */}
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              type="number"
              label="ממוצע בגרות"
              name="bagrut"
              value={formData.bagrut}
              onChange={handleChange}
              required
              error={!!errors.bagrut}
              helperText={errors.bagrut ? "55-120" : ""}
              inputProps={{ min: 55, max: 120 }}
            />
            <TextField
              fullWidth
              type="number"
              label="פסיכומטרי"
              name="psychometric"
              value={formData.psychometric}
              onChange={handleChange}
              required
              error={!!errors.psychometric}
              helperText={errors.psychometric ? "200-800" : ""}
              inputProps={{ min: 200, max: 800 }}
            />
          </Stack>

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

          {/* כפתורים */}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!isFormValid}
              fullWidth
            >
              שמור
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/candidates')}
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
          המועמד נשמר בהצלחה!
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default CandidateForm;