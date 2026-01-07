import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { SystemAlert } from './SystemAlert';
// ייבוא הרכיב המשותף לכותרת
import { PageHeader } from '../../components/PageHeader';
import DesktopOnly from '../../components/DesktopOnly';

const AlertsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('system-alerts') || '[]');
    setAlerts(saved);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("למחוק את ההתראה?")) {
      const updated = alerts.filter(a => a.id !== id);
      setAlerts(updated);
      localStorage.setItem('system-alerts', JSON.stringify(updated));
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  return (
    <DesktopOnly>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* שימוש ברכיב המשותף - כותרת וכפתור הוספה */}
      <PageHeader 
        title="ניהול התראות מערכת"
        buttonText="הוסף התראה"
        onButtonClick={() => navigate('/alerts/new')}
      />

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              {/* בגלל ה-RTL הגלובלי, העמודות יסתדרו מימין לשמאל אוטומטית */}
              <TableCell sx={{ fontWeight: 'bold' }}>הודעה</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>סוג/דחיפות</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} hover>
                <TableCell>{alert.message}</TableCell>
                <TableCell align="center">
                  <Chip label={alert.type} color={getTypeColor(alert.type) as any} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => navigate(`/alerts/edit/${alert.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(alert.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {alerts.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">אין התראות פעילות כרגע</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </DesktopOnly>
  );
};

export default AlertsManagement;