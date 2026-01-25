import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Paper, MenuItem,
    Snackbar, Alert, Stack, LinearProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/PageHeader';
import { createGraduate, getGraduateById, updateGraduate } from '../../../firebase/graduatesService';
import './GraduateForm.css'; // Import CSS

// פונקציית עזר לוולידציה של תעודת זהות ישראלית
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

interface GraduateFormState {
    identityCard: string;
    fullName: string;
    role: string;
    degree: string;
    imageUrl: string;
    review: string;
    status: 'pending' | 'approved' | 'rejected';
}

const GraduateForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // ה-ID הוא תעודת הזהות
    const isEditMode = !!id;

    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState<GraduateFormState>({
        identityCard: '',
        fullName: '',
        role: '',
        degree: 'מדעי המחשב',
        imageUrl: '',
        review: '',
        status: 'pending'
    });

    const [errors, setErrors] = useState({
        identityCard: false,
        fullName: false,
        role: false,
        degree: false,
        imageUrl: false,
        review: false,
    });

    // טעינת נתונים בעריכה
    useEffect(() => {
        const loadData = async () => {
            if (isEditMode && id) {
                setLoading(true);
                try {
                    const data = await getGraduateById(id);
                    if (data) {
                        setFormData({
                            identityCard: data.identityCard || id,
                            fullName: data.fullName,
                            role: data.role,
                            degree: data.degree,
                            imageUrl: data.imageUrl,
                            review: data.review,
                            status: data.status
                        });
                    } else {
                        alert("לא נמצא בוגר עם תעודת זהות זו");
                        navigate('/graduates');
                    }
                } catch (error) {
                    console.error("Error loading:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadData();
    }, [id, isEditMode, navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        let isValid = event.target.validity ? event.target.validity.valid : value !== '';

        // בדיקת ולידציה ספציפית לתעודת זהות
        if (name === 'identityCard') {
            isValid = isValidIsraeliID(value);
        }

        setErrors((prev) => ({ ...prev, [name]: !isValid }));
    };

    const isFormValid = Object.values(errors).every((error) => !error) &&
        formData.identityCard !== "" && formData.fullName !== "";

    const handleSave = async () => {
        if (!isValidIsraeliID(formData.identityCard)) {
            alert("תעודת הזהות אינה תקינה");
            setErrors(prev => ({ ...prev, identityCard: true }));
            return;
        }

        setSaving(true);
        try {
            const dataToSend = {
                identityCard: formData.identityCard,
                fullName: formData.fullName,
                role: formData.role,
                degree: formData.degree,
                imageUrl: formData.imageUrl,
                review: formData.review,
                status: formData.status
            };

            if (isEditMode && id) {
                await updateGraduate(id, dataToSend);
            } else {
                await createGraduate(formData.identityCard, dataToSend);
            }

            setShowSuccess(true);
            setTimeout(() => {
                navigate('/graduates');
            }, 1500);

        } catch (error) {
            console.error("Error saving:", error);
            alert("שגיאה בשמירה (ייתכן שתעודת הזהות כבר קיימת)");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="sm" className="form-container">
                <LinearProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" className="form-container">
            <PageHeader title={isEditMode ? 'עריכת פרטי בוגר' : 'הוספת בוגר חדש'} />

            <Paper elevation={3} className="form-paper">
                <Stack spacing={3}>

                    {/* שדה תעודת זהות */}
                    <TextField
                        fullWidth label="תעודת זהות" name="identityCard"
                        value={formData.identityCard} onChange={handleChange}
                        error={!!errors.identityCard}
                        helperText={errors.identityCard ? 'מספר זהות לא תקין' : 'משמש כמזהה ייחודי במערכת'}
                        required
                        // חוסמים עריכה אם זה מצב עריכה (כי זה המפתח)
                        slotProps={{ input: { readOnly: isEditMode } }}
                        variant={isEditMode ? "filled" : "outlined"}
                    />

                    <TextField
                        fullWidth label="שם מלא" name="fullName"
                        value={formData.fullName} onChange={handleChange}
                        error={!!errors.fullName} helperText={errors.fullName ? 'שם מלא חובה' : ''}
                        required
                    />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth label="תפקיד נוכחי" name="role"
                            value={formData.role} onChange={handleChange}
                            error={!!errors.role} helperText={errors.role ? 'תפקיד חובה' : ''}
                            required placeholder="למשל: מפתח Full Stack"
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
                        error={!!errors.imageUrl} helperText={errors.imageUrl ? 'קישור לתמונה חובה' : ''}
                        type='url' required placeholder="https://example.com/photo.jpg"
                    />

                    <TextField
                        fullWidth multiline rows={4} label="סיפור הצלחה / חוות דעת" name="review"
                        value={formData.review} onChange={handleChange}
                        error={!!errors.review} helperText={errors.review ? 'חוות דעת חובה' : ''}
                        required
                    />

                    {/* הצגת שדה סטטוס רק בעריכה */}
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

                    <Stack direction="row" spacing={2} className="form-actions">
                        <Button
                            variant="contained" onClick={handleSave}
                            startIcon={saving ? null : <SaveIcon />}
                            disabled={!isFormValid || saving} fullWidth
                        >
                            {saving ? "שומר..." : "שמור"}
                        </Button>
                        <Button
                            variant="outlined" color="secondary" onClick={() => navigate('/graduates')}
                            startIcon={<ArrowForwardIcon />} fullWidth
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
                <Alert severity="success" variant="filled" className="snackbar-alert">
                    הנתונים נשמרו בהצלחה!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default GraduateForm;