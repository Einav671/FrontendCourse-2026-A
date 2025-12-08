import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // ניווט ללא רענון דף

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* שם האתר / לוגו */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          מערכת ניהול קורסים
        </Typography>

        {/* כפתורי ניווט */}
        <Button color="inherit" component={Link} to="/">
          בית
        </Button>
        <Button color="inherit" component={Link} to="/management">
          ניהול (Management)
        </Button>
        <Button color="inherit" component={Link} to="/forms">
          טפסים (Forms)
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;