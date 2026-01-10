import React, { useState, useEffect } from 'react';
import {
  Container, Paper, TextField, Button, MenuItem,
  Snackbar, Alert, Stack, LinearProgress, Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { createCandidate, getCandidateById, updateCandidate } from '../../firebase/candidatesService';

const isValidIsraeliID = (id: string): boolean => {
    let strId = String(id).trim();
    if (strId.length > 9 || strId.length < 5) return false;
    strId = strId.padStart(9, '0');
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        let num = Number(strId.charAt(i)) * ((i % 2) + 1);
        if (num > 9) num -= 9;
        sum += num;
    }
    return sum % 10 === 0;
};

const CandidateForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    identityCard: '',
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
    identityCard: false,
    firstName: false, lastName: false, email: false, phone: false,
    degreeCode: false, bagrut: false, psychometric: false, status: false,
  });

  useEffect(() => {
    const loadCandidate = async () => {
        if (isEditMode && id) {
            setLoading(true);
            try {
                const data = await getCandidateById(id);
                if (data) {
                    setFormData({ ...data,
                        identityCard: data.identityCard || id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        degreeCode: data.degreeCode,
                        bagrut: data.bagrut.toString(),
                        psychometric: data.psychometric.toString(),
                        status: data.status
                    });
                } else {
                    alert("המועמד לא נמצא");
                    navigate('/candidates');
                }
            } catch (error) {
                console.error("Error loading candidate:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    loadCandidate();
  }, [id, isEditMode, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    let isValid = event.target.validity.valid;
    if (name === 'identityCard') {
        isValid = isValidIsraeliID(value);
    }
    setErrors((prev) => ({ ...prev, [name]: !isValid && value !== '' }));
  };

  const handleSave = async () => {
    if (!isValidIsraeliID(formData.identityCard)) {
        alert("תעודת הזהות אינה תקינה");
        setErrors(prev => ({...prev, identityCard: true}));
        return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("נא למלא את כל שדות החובה");
        return;
    }

    setSaving(true);
    try {
        const dataToSend = {
            identityCard: formData.identityCard,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            degreeCode: formData.degreeCode,
            bagrut: Number(formData.bagrut),
            psychometric: Number(formData.psychometric),
            status: formData.status
        };

        if (isEditMode && id) {
            await updateCandidate(id, dataToSend);
        } else {
            await createCandidate(formData.identityCard, dataToSend);
        }

        setShowSuccess(true);
        setTimeout(() => {
            navigate('/candidates');
        }, 1500);

    } catch (error) {
        console.error("Error saving candidate:", error);
        alert("שגיאה בשמירה (ייתכן שתעודת הזהות כבר קיימת במערכת)");
    } finally {
        setSaving(false);
    }
  };

  const isFormValid = Object.values(errors).every((error) => !error) &&
    Object.values(formData).every((value) => value !== "");

  if (loading) {
      return (
          <Container maxWidth="sm" sx={{ mt: 4 }}>
              <LinearProgress />
          </Container>
      );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <PageHeader title={isEditMode ? 'עריכת מועמד' : 'מועמד חדש'} />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3}>
          
          <TextField
              fullWidth 
              label="תעודת זהות" 
              name="identityCard"
              value={formData.identityCard} 
              onChange={handleChange}
              required 
              error={!!errors.identityCard}
              helperText={errors.identityCard ? "מספר זהות לא תקין" : "מספר ייחודי (משמש כמזהה)"}
              slotProps={{ input: { readOnly: isEditMode } }}
              variant={isEditMode ? "filled" : "outlined"}
            />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth label="שם פרטי" name="firstName"
              value={formData.firstName} onChange={handleChange}
              required error={!!errors.firstName}
              helperText={errors.firstName ? "שדה חובה" : ""}
            />
            <TextField
              fullWidth label="שם משפחה" name="lastName"
              value={formData.lastName} onChange={handleChange}
              required error={!!errors.lastName}
              helperText={errors.lastName ? "שדה חובה" : ""}
            />
          </Stack>

          <TextField
            fullWidth type="email" label="אימייל" name="email"
            value={formData.email} onChange={handleChange}
            required error={!!errors.email}
            helperText={errors.email ? "אימייל לא תקין" : ""}
          />

          <TextField
            fullWidth type="tel" label="טלפון (10 ספרות)" name="phone"
            value={formData.phone} onChange={handleChange}
            required error={!!errors.phone}
            helperText={errors.phone ? "נדרשות 10 ספרות" : ""}
            inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
          />

          <TextField
            fullWidth label="תואר התעניינות" value="מדעי המחשב"
            InputProps={{ readOnly: true }} variant="filled"
            helperText="מסלול לימודים קבוע"
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth type="number" label="ממוצע בגרות" name="bagrut"
              value={formData.bagrut} onChange={handleChange}
              required error={!!errors.bagrut}
              helperText={errors.bagrut ? "55-120" : ""}
              inputProps={{ min: 55, max: 120 }}
            />
            <TextField
              fullWidth type="number" label="פסיכומטרי" name="psychometric"
              value={formData.psychometric} onChange={handleChange}
              required error={!!errors.psychometric}
              helperText={errors.psychometric ? "200-800" : ""}
              inputProps={{ min: 200, max: 800 }}
            />
          </Stack>

          <TextField
            select fullWidth label="סטטוס טיפול" name="status"
            value={formData.status} onChange={handleChange}
            required error={!!errors.status}
          >
            <MenuItem value="נפתח">נפתח</MenuItem>
            <MenuItem value="בטיפול">בטיפול</MenuItem>
            <MenuItem value="התקבל">התקבל</MenuItem>
            <MenuItem value="נדחה">נדחה</MenuItem>
            <MenuItem value="נסגר">נסגר</MenuItem>
          </TextField>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained" color="primary" startIcon={saving ? null : <SaveIcon />}
              onClick={handleSave} disabled={!isFormValid || saving} fullWidth
            >
              {saving ? "שומר..." : "שמור"}
            </Button>
            <Button
              variant="outlined" color="secondary" startIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/candidates')} fullWidth
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