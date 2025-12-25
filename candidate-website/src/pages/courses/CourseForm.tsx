import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Paper, Grid, Radio, FormControlLabel
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { Course } from './Course';

const CourseForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // אם יש ID ב-URL, אנחנו במצב עריכה

  const isEditMode = !!id; // בוליאני - האם עריכה או יצירה

  // State לטופס
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: 2,
    description: '',
    degreeCode: 'CS-BA',
    type: 'חובה'
  });

  // טיפול בשגיאות
  const [errors, setErrors] = useState({
    name: false,
    code: false,
    credits: false,
    description: false,
    degreeCode: false,
    type: false,
  });

  // אם זה מצב עריכה - נטען את הנתונים הקיימים
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

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    const isValid = event.target.validity
      ? event.target.validity.valid
      : value !== ''; // בדיקת גיבוי

    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  const handleSave = () => {
    const savedCourses = JSON.parse(localStorage.getItem('my-courses') || '[]');

    if (isEditMode) {
      // עדכון קיים
      const updatedCourses = savedCourses.map((c: Course) =>
        c.id === id ? { ...formData, id } : c
      );
      localStorage.setItem('my-courses', JSON.stringify(updatedCourses));
    } else {
      // יצירה חדשה
      const newCourse = {
        ...formData,
        id: Date.now().toString()
      };
      localStorage.setItem('my-courses', JSON.stringify([...savedCourses, newCourse]));
    }

    // החזרה לדף הקודם
    navigate('/management');
  };

  const isFormValid = Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value !== "");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת קורס' : 'יצירת קורס חדש'}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
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
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              type="number"
              label="קוד קורס"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              error={!!errors.code}
              helperText={errors.code ? "קוד קורס נדרש מ-10000 ל-99999" : ""}
              slotProps={{ htmlInput: { min: 10000, max: 99999 } }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              type="number"
              label="נקודות זכות"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              required
              error={!!errors.credits}
              helperText={errors.credits ? "נקודות זכות נדרשות מ-0 ל-10" : ""}
              slotProps={{ htmlInput: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="subtitle1" gutterBottom>
              סוג קורס
            </Typography>
            <Grid container spacing={2}>
              <Grid>
                <FormControlLabel
                  control={
                    <Radio
                      checked={formData.type === "חובה"}
                      onChange={handleChange}
                      value="חובה"
                      name="type"
                    />
                  }
                  label="חובה"
                />
              </Grid>
              <Grid >
                <FormControlLabel
                  control={
                    <Radio
                      checked={formData.type === "בחירה"}
                      onChange={handleChange}
                      value="בחירה"
                      name="type"
                    />
                  }
                  label="בחירה"
                />
              </Grid>
              <Grid >
                <FormControlLabel
                  control={
                    <Radio
                      checked={formData.type === "סמינר"}
                      onChange={handleChange}
                      value="סמינר"
                      name="type"
                    />
                  }
                  label="סמינר"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
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
          </Grid>
        </Grid>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!isFormValid} // Disable button if form is invalid
          >
            שמור וחזור
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/management')}
          >
            ביטול
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default CourseForm;