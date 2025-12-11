import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          מערכת רישום
        </Typography>

        <Button color="inherit" component={Link} to="/">בית</Button>
        <Button color="inherit" component={Link} to="/management">ניהול</Button>
        <Button color="inherit" component={Link} to="/forms">טפסים</Button>
        {/* הכפתור שלך */}
        <Button color="inherit" component={Link} to="/help">עזרה</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;