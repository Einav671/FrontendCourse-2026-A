import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Paper, Stack, 
  Snackbar, Alert 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';

// --- הגדרת המחלקה (Class) ---
export class Scholarship {
    id: string; // הוספנו את ה-id לכאן כדי למנוע שגיאות
    code: string;
    name: string;
    targetAudience: string;
    amount: number;
    link: string;
    conditions: string;

    constructor(
        id: string,
        code: string, 
        name: string, 
        targetAudience: string, 
        amount: number, 
        link: string, 
        conditions: string
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.targetAudience = targetAudience;
        this.amount = amount;
        this.link = link;
        this.conditions = conditions;
    }
}
// ------------------------------

// הגדרת Interface ל-State של הטופס
interface ScholarshipFormState {
    code: string;
    name: string;
    targetAudience: string;
    amount: string | number; // מאפשר גמישות בשדה הקלט
    link: string;
    conditions: string;
}

const ScholarshipForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // סטייט להודעת הצלחה
  const [showSuccess, setShowSuccess] = useState(false);

  // State לנתונים
  const [formData, setFormData] = useState<ScholarshipFormState>({
    code: '',
    name: '',
    targetAudience: '',
    amount: '',
    link: '',
    conditions: ''
  });

  const [errors, setErrors] = useState({
    code: false,
    name: false,
    amount: false,
    link: false
  });

  useEffect(() => {
    if (isEditMode) {
      const saved = JSON.parse(localStorage.getItem('scholarships') || '[]');
      const itemToEdit = saved.find((s: Scholarship) => s.id === id);
      if (itemToEdit) {
        // מעדכנים את ה-State עם הנתונים שנמצאו
        setFormData({
            code: itemToEdit.code,
            name: itemToEdit.name,
            targetAudience: itemToEdit.targetAudience,
            amount: itemToEdit.amount,
            link: itemToEdit.link,
            conditions: itemToEdit.conditions
        });
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

  // בדיקת תקינות: מוודאים שאין שגיאות ושהשדות *הכרחיים* מלאים (לא חייב הכל)
  const isFormValid = !errors.code && !errors.name && !errors.amount && !errors.link &&
                      formData.code !== '' && formData.name !== '' && formData.amount !== '';
  
  const handleSave = () => {
    if (!formData.code || !formData.name || !formData.amount) {
        alert("נא למלא את שדות החובה");
        return;
    }

    const saved = JSON.parse(localStorage.getItem('scholarships') || '[]');
    
    const newItem = new Scholarship(
        isEditMode ? id! : Date.now().toString(), // כאן ה-ID נוצר או נלקח מה-URL
        formData.code,
        formData.name,
        formData.targetAudience,
        Number(formData.amount),
        formData.link,
        formData.conditions
    );

    if (isEditMode) {
      const updated = saved.map((item: any) => item.id === id ? newItem : item);
      localStorage.setItem('scholarships', JSON.stringify(updated));
    } else {
      localStorage.setItem('scholarships', JSON.stringify([...saved, newItem]));
    }

    // הצגת הודעת הצלחה וניווט
    setShowSuccess(true);
    setTimeout(() => {
        navigate('/scholarships');
    }, 1500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditMode ? 'עריכת מלגה' : 'הוספת מלגה חדשה'}
        </Typography>

        {/* החלפנו את Grid ב-Stack */}
        <Stack spacing={3}>
            
            {/* שורה אחת לקוד וסכום */}
            <Stack direction="row" spacing={2}>
                <TextField
                fullWidth label="קוד מלגה" name="code"
                value={formData.code} onChange={handleChange}
                required error={!!errors.code}
                helperText={errors.code ? 'שדה חובה' : ''}
                />
                
                <TextField
                fullWidth type="number" label="סכום (₪)" name="amount"
                value={formData.amount} onChange={handleChange}
                required error={!!errors.amount}
                slotProps={{ htmlInput: { min: 0 } }}
                helperText={errors.amount ? 'סכום תקין' : ''}
                />
            </Stack>

            <TextField
              fullWidth label="שם המלגה / נותן המלגה" name="name"
              value={formData.name} onChange={handleChange}
              required error={!!errors.name}
              helperText={errors.name ? 'שדה חובה' : ''}
            />

            <TextField
              fullWidth label="קהל יעד" name="targetAudience"
              value={formData.targetAudience} onChange={handleChange}
            />

            <TextField
              fullWidth label="קישור לאתר" name="link"
              type="url"
              placeholder="https://"
              error={!!errors.link}
              required
              helperText={errors.link ? 'קישור תקין' : ''}
              value={formData.link} onChange={handleChange}
            />

            <TextField
              fullWidth multiline rows={3} label="תנאים לקבלה" name="conditions"
              value={formData.conditions} onChange={handleChange}
            />

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
                    onClick={() => navigate('/scholarships')}
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
          המלגה נשמרה בהצלחה!
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default ScholarshipForm;