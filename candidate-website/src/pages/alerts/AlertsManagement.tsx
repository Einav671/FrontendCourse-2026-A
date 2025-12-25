// src/pages/alerts/AlertsManagement.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { SystemAlert } from './SystemAlert';

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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4" fontWeight="bold">ניהול התראות מערכת</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/alerts/new')}>
          הוסף התראה
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>הודעה</TableCell>
              <TableCell align="center">סוג/דחיפות</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{alert.message}</TableCell>
                <TableCell align="center">
                  <Chip label={alert.type} color={getTypeColor(alert.type) as any} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => navigate(`/alerts/edit/${alert.id}`)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(alert.id)}><DeleteIcon /></IconButton>
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
  );
};

export default AlertsManagement;