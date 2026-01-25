import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container, TextField, Button, Paper, MenuItem,
    Stack, Snackbar, Alert, LinearProgress
} from '@mui/material';
import { PageHeader } from '../../../components/PageHeader';
import { createUser, getUserByEmail, updateUser } from '../../../firebase/usersService';
import './UsersForm.css';

const UsersForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordHelperText = "לפחות 8 תווים, חייב לכלול אותיות ומספרים";

    // הוספתי שדה confirmPassword
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '', // שדה חדש לאימות
        userType: 'מועמד',
    });

    const [errors, setErrors] = useState({
        email: false,
        fullName: false,
        password: false,
        confirmPassword: false, // שגיאה לאימות
        userType: false,
    });

    useEffect(() => {
        const loadUser = async () => {
            if (isEditMode && id) {
                setLoading(true);
                try {
                    const data = await getUserByEmail(id);
                    if (data) {
                        setFormData({
                            email: data.email || data.id,
                            fullName: data.fullName,
                            password: '',
                            confirmPassword: '',
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

        // עדכון ה-State
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };

            // בדיקת התאמת סיסמאות בזמן אמת (אם משנים את הסיסמא או את האימות)
            if (name === 'password' || name === 'confirmPassword') {
                const pass = name === 'password' ? value : prev.password;
                const confirm = name === 'confirmPassword' ? value : prev.confirmPassword;

                // עדכון שגיאת האימות
                setErrors(prevErrors => ({
                    ...prevErrors,
                    confirmPassword: confirm !== '' && pass !== confirm
                }));
            }

            return updated;
        });

        // ולידציה לשאר השדות
        let isValid = event.target.validity ? event.target.validity.valid : value !== '';

        if (name === 'password') {
            isValid = passwordRegex.test(value);
            setErrors((prev) => ({ ...prev, password: !isValid }));
        }
        if (name === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            setErrors((prev) => ({ ...prev, email: !isValid }));
        }
        if (name === 'fullName' || name === 'userType') {
            setErrors((prev) => ({ ...prev, [name]: !isValid }));
        }
    };

    const handleSave = async () => {
        const isPasswordRequired = !isEditMode;

        // בדיקה נוספת לאימות סיסמא לפני שמירה
        if (isPasswordRequired && formData.password !== formData.confirmPassword) {
            alert("הסיסמאות אינן תואמות");
            return;
        }

        if (!formData.email || !formData.fullName || (isPasswordRequired && !formData.password)) {
            alert("נא למלא את כל שדות החובה");
            return;
        }

        setSaving(true);
        try {
            const userForDB = {
                email: formData.email,
                fullName: formData.fullName,
                userType: formData.userType
            };

            if (isEditMode && id) {
                await updateUser(id, userForDB);
            } else {
                await createUser(formData.email, formData.password, userForDB);
            }

            setShowSuccess(true);
            setTimeout(() => {
                navigate('/users');
            }, 1500);
        } catch (error: any) {
            console.error("Error saving user:", error);
            if (error.code === 'auth/email-already-in-use') {
                alert("כתובת המייל הזו כבר קיימת במערכת");
            } else {
                alert("שגיאה בשמירה: " + error.message);
            }
        } finally {
            setSaving(false);
        }
    };

    const isFormValid =
        (!errors.email && !errors.fullName && !errors.userType && !errors.confirmPassword) &&
        (formData.email !== "" && formData.fullName !== "") &&
        (isEditMode || (!errors.password && formData.password !== "" && formData.password === formData.confirmPassword));

    if (loading) {
        return (
            <Container maxWidth="sm" className="form-container">
                <LinearProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" className="form-container">
            <PageHeader title={isEditMode ? 'עריכת משתמש' : 'משתמש חדש'} />

            <Paper elevation={3} className="form-paper">
                <Stack spacing={3}>
                    <TextField
                        fullWidth type="email" label="אימייל (משמש כשם משתמש)" name="email"
                        value={formData.email} onChange={handleChange}
                        required error={!!errors.email}
                        helperText={errors.email ? "אימייל לא תקין" : isEditMode ? "לא ניתן לשנות כתובת מייל" : ""}
                        slotProps={{ input: { readOnly: isEditMode } }}
                        variant={isEditMode ? "filled" : "outlined"}
                    />

                    <TextField
                        fullWidth label="שם מלא" name="fullName"
                        value={formData.fullName} onChange={handleChange}
                        required error={!!errors.fullName}
                        helperText={errors.fullName ? "שם מלא הוא שדה חובה" : ""}
                    />

                    {!isEditMode && (
                        <>
                            <TextField
                                fullWidth type="password" label="סיסמא" name="password"
                                value={formData.password} onChange={handleChange}
                                required error={!!errors.password}
                                helperText={errors.password ? "סיסמא חלשה מדי: " + passwordHelperText : passwordHelperText}
                            />
                            {/* שדה אימות סיסמא חדש */}
                            <TextField
                                fullWidth type="password" label="אימות סיסמא" name="confirmPassword"
                                value={formData.confirmPassword} onChange={handleChange}
                                required error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword ? "הסיסמאות אינן תואמות" : ""}
                            />
                        </>
                    )}

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

                    <Stack direction="row" spacing={2} className="form-actions">
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
                <Alert severity="success" variant="filled" className="snackbar-alert">
                    המשתמש נשמר בהצלחה!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UsersForm;