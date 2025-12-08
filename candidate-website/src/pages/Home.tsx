import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      
      {/* כותרת ראשית */}
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to my site
      </Typography>

      {/* כותרת משנית */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        About the Candidate
      </Typography>


    </Container>
  );
};

export default Home;