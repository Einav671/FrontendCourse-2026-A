import React, { useState, useEffect } from 'react';
import { 
  Container, TextField, Button, Paper, Stack, 
  Snackbar, Alert, CircularProgress 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import type { Scholarship } from './Scholarship';
import { db } from '../../firebase/scholarshipService'; 
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';

const ScholarshipForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // לטעינת הנתונים בעריכה
  const [saving, setSaving] = useState(false);   // למניעת לחיצות כפולות בשמירה

  const [formData, setFormData] = useState<Scholarship>({
    id: '', 
    code: '',
    name: '',
    targetAudience: '',
    amount: 0,
    link: '',
    conditions: ''
  });

  const [errors, setErrors] = useState({
    code: false,
    name: false,
    amount: false,
    link: false
  });

  // שליפת נתונים במצב עריכה
  useEffect(() => {
    const fetchScholarshipData = async () => {
        if (isEditMode && id) {
            setLoading(true);
            try {
                const docRef = doc(db, "scholarships", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        id: docSnap.id, // Set the ID from the document snapshot
                        code: data.code,
                        name: data.name,
                        targetAudience: data.targetAudience,
                        amount: data.amount,
                        link: data.link,
                        conditions: data.conditions
                    });
                } else {
                    alert("המסמך לא נמצא!");
                    navigate('/scholarships');
                }
            } catch (error) {
                console.error("Error getting document:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    fetchScholarshipData();
  }, [id, isEditMode, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = event.target.validity ? event.target.validity.valid : value !== ''; 
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const isFormValid = !errors.code && !errors.name && !errors.amount && !errors.link &&
                      formData.code !== '' && formData.name !== '' && formData.amount !== 0;
  
  const handleSave = async () => {
    if (!formData.code || !formData.name || !formData.amount) {
        alert("נא למלא את שדות החובה");
        return;
    }

    setSaving(true);

    try {
        // הכנת האובייקט לשליחה ל-Firebase
        // שים לב: אנחנו לא שולחים את ה-ID כחלק מהדאטה, הוא המפתח של המסמך
        const dataToSend = {
            code: formData.code,
            name: formData.name,
            targetAudience: formData.targetAudience,
            amount: Number(formData.amount), // המרה למספר
            link: formData.link,
            conditions: formData.conditions
        };

        if (isEditMode && id) {
            // עדכון מסמך קיים
            const docRef = doc(db, "scholarships", id);
            await updateDoc(docRef, dataToSend);
        } else {
            // יצירת מסמך חדש
            // addDoc מייצר ID ייחודי אוטומטית
            await addDoc(collection(db, "scholarships"), dataToSend);
        }

        setShowSuccess(true);
        setTimeout(() => {
            navigate('/scholarships');
        }, 1500);

    } catch (error) {
        console.error("Error saving document: ", error);
        alert("אירעה שגיאה בשמירת הנתונים");
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
      return (
          <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
          </Container>
      );
  }

  return (
    <Container maxWidth="sm">
      
      <PageHeader title={isEditMode ? 'עריכת מלגה' : 'הוספת מלגה חדשה'} />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3}>
            
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
              type="url" placeholder="https://"
              error={!!errors.link} required
              helperText={errors.link ? 'קישור תקין' : ''}
              value={formData.link} onChange={handleChange}
            />

            <TextField
              fullWidth multiline rows={3} label="תנאים לקבלה" name="conditions"
              value={formData.conditions} onChange={handleChange}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                    variant="contained" color="primary" startIcon={saving ? null : <SaveIcon />} 
                    onClick={handleSave} disabled={!isFormValid || saving} fullWidth
                >
                    {saving ? "שומר..." : "שמור"}
                </Button>
                <Button 
                    variant="outlined" color="secondary" startIcon={<ArrowForwardIcon />} 
                    onClick={() => navigate('/scholarships')} fullWidth
                >
                    ביטול
                </Button>
            </Stack>
        </Stack>
      </Paper>

      <Snackbar 
        open={showSuccess} autoHideDuration={1500} onClose={() => setShowSuccess(false)}
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