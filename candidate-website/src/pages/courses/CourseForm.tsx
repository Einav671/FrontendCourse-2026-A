import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Paper, Grid, MenuItem 
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת קורס' : 'יצירת קורס חדש'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="שם הקורס" name="name" value={formData.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="קוד קורס" name="code" value={formData.code} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="number" label="נקודות זכות" name="credits" value={formData.credits} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField select fullWidth label="סוג קורס" name="type" value={formData.type} onChange={handleChange}>
              <MenuItem value="חובה">חובה</MenuItem>
              <MenuItem value="בחירה">בחירה</MenuItem>
              <MenuItem value="סמינר">סמינר</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
             <TextField fullWidth multiline rows={3} label="תיאור" name="description" value={formData.description} onChange={handleChange} />
          </Grid>
        </Grid>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
            onClick={handleSave}
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