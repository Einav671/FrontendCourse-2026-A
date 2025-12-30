import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Paper, Radio, FormControlLabel,
  Snackbar, Alert, Stack, Typography, Box, RadioGroup
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { Course } from './Course';
import { PageHeader } from '../../components/PageHeader';

const CourseForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: 2,
    description: '',
    degreeCode: 'CS-BA',
    type: 'חובה'
  });

  const [errors, setErrors] = useState({
    name: false,
    code: false,
    credits: false,
    description: false,
    degreeCode: false,
    type: false,
  });

  useEffect(() => {
    if (isEditMode) {
      const savedCourses = JSON.parse(localStorage.getItem('my-courses') || '[]');
      const courseToEdit = savedCourses.find((c: Course) => c.id === id);
      if (courseToEdit) {
        setFormData(courseToEdit);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = event.target.validity ? event.target.validity.valid : value !== '';
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const handleSave = () => {
    const savedCourses = JSON.parse(localStorage.getItem('my-courses') || '[]');

    if (isEditMode) {
      const updatedCourses = savedCourses.map((c: Course) =>
        c.id === id ? { ...formData, id } : c
      );
      localStorage.setItem('my-courses', JSON.stringify(updatedCourses));
    } else {
      const newCourse = {
        ...formData,
        id: Date.now().toString()
      };
      localStorage.setItem('my-courses', JSON.stringify([...savedCourses, newCourse]));
    }

    setShowSuccess(true);
    setTimeout(() => {
        navigate('/management'); // שים לב: זה מחזיר ל-/management לפי הקוד המקורי שלך, אולי תרצה לשנות ל-/courses?
    }, 1500);
  };

  const isFormValid = Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value !== "");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <PageHeader title={isEditMode ? 'עריכת קורס' : 'יצירת קורס חדש'} />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="שם הקורס"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={!!errors.name}
            helperText={errors.name ? "שם הקורס נדרש" : ""}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              type="number"
              label="קוד קורס"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              error={!!errors.code}
              helperText={errors.code ? "נדרש 10000-99999" : ""}
              slotProps={{ htmlInput: { min: 10000, max: 99999 } }}
            />
            <TextField
              fullWidth
              type="number"
              label="נקודות זכות"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              required
              error={!!errors.credits}
              helperText={errors.credits ? "0-10" : ""}
              slotProps={{ htmlInput: { min: 0, max: 10 } }}
            />
          </Stack>

          <Box>
            <Typography variant="subtitle1" gutterBottom>סוג קורס</Typography>
            <RadioGroup
                row
                name="type"
                value={formData.type}
                onChange={handleChange}
            >
                <FormControlLabel value="חובה" control={<Radio />} label="חובה" />
                <FormControlLabel value="בחירה" control={<Radio />} label="בחירה" />
                <FormControlLabel value="סמינר" control={<Radio />} label="סמינר" />
            </RadioGroup>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="תיאור"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            error={!!errors.description}
            helperText={errors.description ? "תיאור נדרש" : ""}
          />

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
              startIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/management')}
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
          הקורס נשמר בהצלחה!
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default CourseForm;