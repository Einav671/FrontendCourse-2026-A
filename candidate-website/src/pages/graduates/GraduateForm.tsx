import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Paper, MenuItem, 
  Snackbar, Alert, Stack 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';

// --- הגדרת המחלקה ---
export class Graduate {
    id: string;
    fullName: string;
    role: string;
    degree: string;
    imageUrl: string;
    review: string;
    status: 'pending' | 'approved' | 'rejected';

    constructor(
        id: string, 
        fullName: string, 
        role: string, 
        degree: string, 
        imageUrl: string, 
        review: string,
        status: 'pending' | 'approved' | 'rejected' = 'pending'
    ) {
        this.id = id;
        this.fullName = fullName;
        this.role = role;
        this.degree = degree;
        this.imageUrl = imageUrl;
        this.review = review;
        this.status = status;
    }
}
// --------------------

// הגדרת טיפוס ל-State של הטופס כדי למנוע שגיאות ב-setFormData
interface GraduateFormState {
    fullName: string;
    role: string;
    degree: string;
    imageUrl: string;
    review: string;
    status: 'pending' | 'approved' | 'rejected';
}

const GraduateForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // סטייט להודעת הצלחה
  const [showSuccess, setShowSuccess] = useState(false);

  // סטייט לנתונים (עם טיפוס מוגדר)
  const [formData, setFormData] = useState<GraduateFormState>({
    fullName: '',
    role: '',
    degree: 'מדעי המחשב',
    imageUrl: '',
    review: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({
    fullName: false,
    role: false,
    degree: false,
    imageUrl: false,
    review: false,
  });

  useEffect(() => {
    if (isEditMode) {
      const saved = JSON.parse(localStorage.getItem('graduates') || '[]');
      const itemToEdit = saved.find((g: any) => g.id === id);
      if (itemToEdit) {
          // מוודאים שאנחנו מכניסים רק את השדות הרלוונטיים ל-state
          setFormData({
              fullName: itemToEdit.fullName,
              role: itemToEdit.role,
              degree: itemToEdit.degree,
              imageUrl: itemToEdit.imageUrl,
              review: itemToEdit.review,
              status: itemToEdit.status
          });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    // בגלל שהגדרנו Interface, טייפסקריפט עכשיו מבין מה זה prevFormData
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    
    const isValid = event.target.validity 
        ? event.target.validity.valid 
        : value !== ''; 

    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  const isFormValid = Object.values(errors).every((error) => !error) && 
                      Object.values(formData).every((value) => value !== "");

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('graduates') || '[]');
    
    const newItem = new Graduate(
        isEditMode ? id! : Date.now().toString(),
        formData.fullName,
        formData.role,
        formData.degree,
        formData.imageUrl,
        formData.review,
        formData.status 
    );

    if (isEditMode) {
      const updated = saved.map((g: any) => g.id === id ? newItem : g);
      localStorage.setItem('graduates', JSON.stringify(updated));
    } else {
      localStorage.setItem('graduates', JSON.stringify([...saved, newItem]));
    }

    // הצגת הודעת הצלחה וניווט
    setShowSuccess(true);
    setTimeout(() => {
        navigate('/graduates');
    }, 1500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת פרטי בוגר' : 'הוספת בוגר חדש'}
        </Typography>

        {/* שימוש ב-Stack במקום Grid */}
        <Stack spacing={3}>
            
            <TextField
              fullWidth label="שם מלא" name="fullName"
              value={formData.fullName} onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName ? 'שם מלא חובה' : ''}
              required
            />

            {/* שורה אחת לשני שדות קצרים */}
            <Stack direction="row" spacing={2}>
                <TextField
                fullWidth label="תפקיד נוכחי" name="role"
                value={formData.role} onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role ? 'תפקיד חובה' : ''}
                required
                placeholder="למשל: מפתח Full Stack"
                />
                
                <TextField
                select fullWidth label="תואר" name="degree"
                value={formData.degree} onChange={handleChange}
                >
                    <MenuItem value="מדעי המחשב">מדעי המחשב</MenuItem>
                </TextField>
            </Stack>

            <TextField
              fullWidth label="קישור לתמונה (URL)" name="imageUrl"
              value={formData.imageUrl} onChange={handleChange}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl ? 'קישור לתמונה חובה' : ''}
              type='url'
              required
              placeholder="https://example.com/photo.jpg"
            />

            <TextField
              fullWidth multiline rows={4} label="סיפור הצלחה / חוות דעת" name="review"
              value={formData.review} onChange={handleChange}
              error={!!errors.review}
              helperText={errors.review ? 'חוות דעת חובה' : ''}
              required
            />
            
            {isEditMode && (
                <TextField
                  select fullWidth label="סטטוס אישור" name="status"
                  value={formData.status} onChange={handleChange}
                >
                    <MenuItem value="pending">ממתין לאישור</MenuItem>
                    <MenuItem value="approved">מאושר</MenuItem>
                    <MenuItem value="rejected">נדחה</MenuItem>
                </TextField>
            )}

            {/* כפתורים */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                    variant="contained" 
                    onClick={handleSave} 
                    startIcon={<SaveIcon />} 
                    disabled={!isFormValid}
                    fullWidth
                >
                    שמור
                </Button>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => navigate('/graduates')} 
                    startIcon={<ArrowForwardIcon />}
                    fullWidth
                >
                    ביטול
                </Button>
            </Stack>
        </Stack>
      </Paper>

      {/* רכיב הודעת הצלחה */}
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

export default GraduateForm;