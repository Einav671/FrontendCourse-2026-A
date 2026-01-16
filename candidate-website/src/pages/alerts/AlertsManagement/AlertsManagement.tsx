import React, { useState, useEffect } from 'react';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, LinearProgress, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import type { SystemAlert } from '../types/SystemAlert';
import { PageHeader } from '../../../components/PageHeader';
import DesktopOnly from '../../../components/DesktopOnly';
import { getAllAlerts, deleteAlert } from '../../../firebase/alertsService';
import './AlertsManagement.css'; // Import CSS

const AlertsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);

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
      <Container maxWidth="lg" className="management-container">
        <PageHeader
          title="ניהול התראות מערכת"
          buttonText="הוסף התראה"
          onButtonClick={() => navigate('/alerts/new')}
        />

        <TableContainer component={Paper} elevation={3}>
          {/* אינדיקציית טעינה */}
          {loading && <Box className="loading-box"><LinearProgress /></Box>}

          {!loading && alerts.length === 0 ? (
            <Box className="empty-state-box">אין התראות פעילות כרגע</Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-cell">הודעה</TableCell>
                  <TableCell align="center" className="table-header-cell">סוג/דחיפות</TableCell>
                  <TableCell align="center" className="table-header-cell">פעולות</TableCell>
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
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </DesktopOnly>
  );
};

export default AlertsManagement;