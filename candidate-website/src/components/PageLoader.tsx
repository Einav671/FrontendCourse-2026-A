import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const PageLoader: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh', 
        width: '100%' 
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default PageLoader;