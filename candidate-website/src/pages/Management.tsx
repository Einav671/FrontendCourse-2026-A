import React from 'react';
import CoursesTable from './courses/CoursesTable'; 
import { Container, Box } from '@mui/material';
import { PageHeader } from '../components/PageHeader'; // וודא שהנתיב תקין

const Management: React.FC = () => {

  const handleAddCourse = () => {
    console.log('Open Add Course Modal');
    // כאן תהיה הלוגיקה לפתיחת המודל או הניווט
  };

  return (
    <Container maxWidth="lg">
      
      {/* כותרת וכפתור הוספה מרוכזים ברכיב אחד */}
      <PageHeader 
        title="ניהול קורסים" 
        buttonText="הוסף קורס חדש"
        onButtonClick={handleAddCourse}
      />

      <Box sx={{ mt: 2 }}>
        <CoursesTable />
      </Box>

    </Container>
  );
};

export default Management;