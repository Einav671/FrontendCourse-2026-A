import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Paper, Radio, FormControlLabel,
  Snackbar, Alert, Stack, Typography, Box, RadioGroup, LinearProgress
} from '@mui/material';
// ^^^ שינוי 1: החלפתי CircularProgress ב-LinearProgress בשורה למעלה ^^^

import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/PageHeader';
import { createCourse, getCourseById, updateCourse } from '../../../firebase/coursesService';
import './CourseForm.css'; // Import CSS

const CourseForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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
    const loadCourse = async () => {
      if (isEditMode && id) {
        setLoading(true);
        try {
          const data = await getCourseById(id);
          if (data) {
            setFormData({
              name: data.name,
              code: data.code,
              credits: data.credits,
              description: data.description,
              degreeCode: data.degreeCode,
              type: data.type
            });
          } else {
            alert("הקורס לא נמצא");
            navigate('/courses');
          }
        } catch (error) {
          console.error("Error loading course:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadCourse();
  }, [id, isEditMode, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = event.target.validity ? event.target.validity.valid : value !== '';
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.code) {
      alert("נא למלא את שדות החובה");
      return;
    }

    setSaving(true);

    try {
      const dataToSend = {
        name: formData.name,
        code: formData.code,
        credits: Number(formData.credits),
        description: formData.description,
        degreeCode: formData.degreeCode,
        type: formData.type
      };

      if (isEditMode && id) {
        await updateCourse(id, dataToSend);
      } else {
        await createCourse(dataToSend);
      }

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/courses'); // חזרה לניהול קורסים
      }, 1500);

    } catch (error) {
      console.error("Error saving course:", error);
      alert("שגיאה בשמירת הקורס");
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = Object.values(errors).every((error) => !error) && formData.name !== "";

  if (loading) {
    return (
      <Container maxWidth="sm" className="form-container">
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="form-container">
      <PageHeader title={isEditMode ? 'עריכת קורס' : 'יצירת קורס חדש'} />

      <Paper elevation={3} className="form-paper">
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
              onClick={() => navigate('/courses')}
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
          הקורס נשמר בהצלחה!
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default CourseForm;