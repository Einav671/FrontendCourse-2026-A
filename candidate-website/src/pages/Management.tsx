import React from 'react';
import CoursesTable from './courses/CoursesTable'; 
import { Container, Box } from '@mui/material';

const Management: React.FC = () => {

  return (
    <Container maxWidth="lg">

      <Box sx={{ mt: 2 }}>
        <CoursesTable />
      </Box>

    </Container>
  );
};

export default Management;