import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './courses/CoursesTable'; // הטבלה של החברים שלך
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Box } from '@mui/material';

const Management: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* כותרת הדף */}
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
       ניהול קורסים
      </Typography>
      

      {/* --- הטבלה הקיימת (קורסים) --- */}
      <Box sx={{ mt: 4 }}>
        <CoursesTable />
      </Box>

    </Container>
  );
};

export default Management;