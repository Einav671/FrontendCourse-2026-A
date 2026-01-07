import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import type { SystemAlert } from './SystemAlert';
import { PageHeader } from '../../components/PageHeader';
import DesktopOnly from '../../components/DesktopOnly';
// Import Service
import { getAllAlerts, deleteAlert } from '../../firebase/alertsService';


const AlertsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);

  // פונקציה לטעינת הנתונים
  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await getAllAlerts();
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      alert("שגיאה בטעינת ההתראות");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("למחוק את ההתראה?")) {
      try {
        await deleteAlert(id);
        // רענון הרשימה לאחר מחיקה (או סינון מקומי)
        setAlerts(prev => prev.filter(a => a.id !== id));
      } catch (error) {
        console.error("Error deleting alert:", error);
        alert("שגיאה במחיקת ההתראה");
      }
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
              <TableCell sx={{ fontWeight: 'bold' }}>הודעה</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>סוג/דחיפות</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : alerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">אין התראות פעילות כרגע</TableCell>
              </TableRow>
            ) : (
              alerts.map((alert) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </DesktopOnly>
  );
};

export default AlertsManagement;