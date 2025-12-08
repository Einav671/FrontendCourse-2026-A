import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Forms: React.FC = () => {
  // State לשמירת הנתונים של הטופס
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  // פונקציה שמתעדכנת בכל הקלדה
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // פונקציית שליחת הטופס
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // מניעת רענון דף
    console.log('Form Submitted:', formData);
    alert(`תודה ${formData.fullName}, פרטייך התקבלו! נחזור אליך למספר ${formData.phone}`);
    // כאן בעתיד נשלח את הנתונים לשרת או נשמור ב-LocalStorage
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          מתעניינים בתואר?
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          השאירו פרטים ונציג אקדמי יחזור אליכם בהקדם לבדיקת התאמה.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          <TextField
            label="שם מלא"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="כתובת אימייל"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="מספר טלפון"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="הערות נוספות / שאלות"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            endIcon={<SendIcon />}
            sx={{ mt: 2 }}
          >
            שלח פרטים
          </Button>

        </Box>
      </Paper>
    </Container>
  );
};

export default Forms;