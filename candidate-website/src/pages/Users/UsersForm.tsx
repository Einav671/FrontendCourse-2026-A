import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Container, TextField, Button, Paper, MenuItem, 
    Stack, Snackbar, Alert 
} from '@mui/material';
import { PageHeader } from '../../components/PageHeader';

interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    userType: string;
}

const UsersForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [showSuccess, setShowSuccess] = useState(false);
    
    // קבועים
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordHelperText = "לפחות 8 תווים, חייב לכלול אותיות ומספרים";

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        userType: 'מועמד',
    });

    const [errors, setErrors] = useState({
        fullName: false,
        email: false,
        password: false,
        userType: false,
    });

    useEffect(() => {
        if (isEditMode) {
            const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const userToEdit = savedUsers.find((u: User) => u.id === id);
            if (userToEdit) {
                setFormData(userToEdit);
            }
        }
    }, [id, isEditMode]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        let isValid = event.target.validity ? event.target.validity.valid : value !== ''; 

        if (name === 'password') {
            isValid = passwordRegex.test(value);
        }

        setErrors((prev) => ({ ...prev, [name]: !isValid }));
    };

    const handleSave = () => {
        const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userData: User = {
            id: isEditMode ? id! : Date.now().toString(),
            ...formData,
        };

        if (isEditMode) {
            const updatedUsers = savedUsers.map((u: User) => (u.id === id ? userData : u));
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        } else {
            localStorage.setItem('users', JSON.stringify([...savedUsers, userData]));
        }

        setShowSuccess(true);
        setTimeout(() => {
            navigate('/users');
        }, 1500);
    };

    const isFormValid = Object.values(errors).every((error) => !error) &&
        Object.values(formData).every((value) => value !== "");

    return (
        <Container maxWidth="sm">
            
            <PageHeader title={isEditMode ? 'עריכת משתמש' : 'משתמש חדש'} />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth label="שם מלא" name="fullName"
                        value={formData.fullName} onChange={handleChange}
                        required error={!!errors.fullName}
                        helperText={errors.fullName ? "שם מלא הוא שדה חובה" : ""}
                    />

                    <TextField
                        fullWidth type="email" label="אימייל" name="email"
                        value={formData.email} onChange={handleChange}
                        required error={!!errors.email}
                        helperText={errors.email ? "אימייל לא תקין" : ""}
                    />

                    <TextField
                        fullWidth type="password" label="סיסמא" name="password"
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
                        <MenuItem value="בוגר">בוגר</MenuItem>
                        <MenuItem value="מנהל מערכת">מנהל מערכת</MenuItem>
                    </TextField>

                    {/* סידור כפתורים ב-Stack במקום div עם inline styles */}
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="contained" color="primary" startIcon={<SaveIcon />}
                            onClick={handleSave} disabled={!isFormValid} fullWidth
                        >
                            שמור
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