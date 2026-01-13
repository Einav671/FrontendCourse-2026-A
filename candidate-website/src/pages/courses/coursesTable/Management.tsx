import React from 'react';
import CoursesTable from './CoursesTable';
import { Container, Box } from '@mui/material';
import DesktopOnly from '../../../components/DesktopOnly';

const Management: React.FC = () => {

  return (
    <DesktopOnly>
      <Container maxWidth="lg">

        <Box sx={{ mt: 2 }}>
          <CoursesTable />
        </Box>

      </Container>
    </DesktopOnly>
  );
};

export default Management;