import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Grid, MenuItem } from '@mui/material';

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

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, validity } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !validity.valid }));
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

    navigate('/users');
};

const isFormValid = Object.values(errors).every((error) => !error) && 
                                        Object.values(formData).every((value) => value !== "");

return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                {isEditMode ? 'עריכת משתמש' : 'משתמש חדש'}
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="fullName-input"
                        fullWidth
                        label="שם מלא"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        error={!!errors.fullName}
                        helperText={errors.fullName ? "שם מלא הוא שדה חובה" : ""}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="email-input"
                        fullWidth
                        type="email"
                        label="אימייל"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        error={!!errors.email}
                        helperText={errors.email ? "אימייל לא תקין" : ""}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="password-input"
                        fullWidth
                        type="password"
                        label="סיסמא"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        error={!!errors.password}
                        helperText={errors.password ? "סיסמא היא שדה חובה" : ""}
                    />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    id="userType-select"
                    select
                    fullWidth
                    label="סוג משתמש"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    error={!!errors.userType}
                    helperText={errors.userType ? "יש לבחור סוג משתמש" : ""}
                    SelectProps={{ id: "userType-select" }}
                >
                    <MenuItem value="מועמד">מועמד</MenuItem>
                    <MenuItem value="בוגר">בוגר</MenuItem>
                    <MenuItem value="מנהל מערכת">מנהל מערכת</MenuItem>
                </TextField>
            </Grid>

            </Grid>

            <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={!isFormValid}
                >
                    שמור
                </Button>
                
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/users')}
                >
                    ביטול
                </Button>
            </div>
        </Paper>
    </Container>
);
};

export default UsersForm;