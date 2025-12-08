import React from 'react';
import CoursesTable from '../courses/CoursesTable'; // ייבוא הטבלה שלך
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Management: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       {/* כותרת הדף */}
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        מערכת ניהול אקדמית
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        כאן ניתן לנהל את הקורסים, לערוך סילבוסים ולצפות בנתונים.
      </Typography>

      {/* הטבלה שבנינו */}
      <CoursesTable />
    </Container>
  );
};

export default Management;