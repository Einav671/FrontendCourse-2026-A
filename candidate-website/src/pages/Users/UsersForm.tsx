import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Container, TextField, Button, Paper, MenuItem, 
    Stack, Snackbar, Alert, CircularProgress 
} from '@mui/material';
import { PageHeader } from '../../components/PageHeader';
import { createUser, getUserByEmail, updateUser } from '../../firebase/usersService';

const UsersForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // ה-id כאן הוא האימייל שהגיע מה-URL
    const isEditMode = !!id;

    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // קבועים
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordHelperText = "לפחות 8 תווים, חייב לכלול אותיות ומספרים";

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        userType: 'מועמד',
    });

    const [errors, setErrors] = useState({
        email: false,
        fullName: false,
        password: false,
        userType: false,
    });

    // טעינת נתונים בעריכה
    useEffect(() => {
        const loadUser = async () => {
            if (isEditMode && id) {
                setLoading(true);
                try {
                    const data = await getUserByEmail(id); // id is the email
                    if (data) {
                        setFormData({
                            email: data.email || data.id,
                            fullName: data.fullName,
                            password: data.password,
                            userType: data.userType
                        });
                    } else {
                        alert("המשתמש לא נמצא");
                        navigate('/users');
                    }
                } catch (error) {
                    console.error("Error loading user:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadUser();
    }, [id, isEditMode, navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        let isValid = event.target.validity ? event.target.validity.valid : value !== ''; 

        if (name === 'password') {
            isValid = passwordRegex.test(value);
        }
        if (name === 'email') {
            // בדיקת תקינות אימייל בסיסית
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        setErrors((prev) => ({ ...prev, [name]: !isValid }));
    };

    const handleSave = async () => {
        // ולידציה סופית לפני שליחה
        if (!formData.email || !formData.fullName || !formData.password) {
            alert("נא למלא את כל שדות החובה");
            return;
        }

        setSaving(true);
        try {
            const dataToSend = {
                email: formData.email, // שומרים גם בשדה הרגיל
                fullName: formData.fullName,
                password: formData.password,
                userType: formData.userType
            };

            if (isEditMode && id) {
                // בעריכה, ה-ID (אימייל) לא משתנה
                await updateUser(id, dataToSend);
            } else {
                // ביצירה, האימייל משמש כמזהה
                await createUser(formData.email, dataToSend);
            }

            setShowSuccess(true);
            setTimeout(() => {
                navigate('/users');
            }, 1500);
        } catch (error) {
            console.error("Error saving user:", error);
            alert("שגיאה בשמירה (ייתכן שהמייל כבר קיים במערכת)");
        } finally {
            setSaving(false);
        }
    };

    const isFormValid = Object.values(errors).every((error) => !error) &&
        Object.values(formData).every((value) => value !== "");

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

    return (
        <Container maxWidth="sm">
            
            <PageHeader title={isEditMode ? 'עריכת משתמש' : 'משתמש חדש'} />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Stack spacing={3}>
                    
                    {/* שדה האימייל הוא הראשון והחשוב ביותר */}
                    <TextField
                        fullWidth type="email" label="אימייל (משמש כשם משתמש)" name="email"
                        value={formData.email} onChange={handleChange}
                        required error={!!errors.email}
                        helperText={errors.email ? "אימייל לא תקין" : isEditMode ? "לא ניתן לשנות כתובת מייל" : ""}
                        // במצב עריכה - השדה נעול
                        slotProps={{ input: { readOnly: isEditMode } }}
                        variant={isEditMode ? "filled" : "outlined"}
                    />

                    <TextField
                        fullWidth label="שם מלא" name="fullName"
                        value={formData.fullName} onChange={handleChange}
                        required error={!!errors.fullName}
                        helperText={errors.fullName ? "שם מלא הוא שדה חובה" : ""}
                    />

                    <TextField
                        fullWidth type="text" label="סיסמא" name="password"
                        value={formData.password} onChange={handleChange}
                        required error={!!errors.password}
                        helperText={errors.password ? "סיסמא חלשה מדי: " + passwordHelperText : passwordHelperText}
                    />

                    <TextField
                        select fullWidth label="סוג משתמש" name="userType"
                        value={formData.userType} onChange={handleChange}
                        required error={!!errors.userType}
                        helperText={errors.userType ? "יש לבחור סוג משתמש" : ""}
                    >
                        <MenuItem value="מועמד">מועמד</MenuItem>
                        <MenuItem value="סטודנט">סטודנט</MenuItem>
                        <MenuItem value="בוגר">בוגר</MenuItem>
                        <MenuItem value="מנהל מערכת">מנהל מערכת</MenuItem>
                    </TextField>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="contained" color="primary" startIcon={<SaveIcon />}
                            onClick={handleSave} disabled={!isFormValid || saving} fullWidth
                        >
                            {saving ? "שומר..." : "שמור"}
                        </Button>

                        <Button
                            variant="outlined" color="secondary" startIcon={<ArrowForwardIcon />}
                            onClick={() => navigate('/users')} fullWidth
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
                    המשתמש נשמר בהצלחה!
                </Alert>
            </Snackbar>

        </Container>
    );
};

export default UsersForm;