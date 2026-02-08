import React, { useState, useEffect } from 'react';
import {
  Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Chip, Tooltip, LinearProgress, Box, alpha
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/PageHeader';
import DesktopOnly from '../../../components/DesktopOnly';
import type { Graduate } from '../types/Graduate';
import { getAllGraduates, deleteGraduate, updateGraduate } from '../../../firebase/graduatesService';

const GraduatesManagement: React.FC = () => {
  const navigate = useNavigate();
  // אין צורך במשתנה theme כאן למעלה, נשתמש בו בתוך ה-sx במידת הצורך
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGraduates = async () => {
    setLoading(true);
    try {
      const data = await getAllGraduates();
      setGraduates(data);
    } catch (error) {
      console.error("Error fetching graduates:", error);
      alert("שגיאה בטעינת הנתונים");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraduates();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("למחוק את הבוגר?")) {
      try {
        await deleteGraduate(id);
        setGraduates(prev => prev.filter(g => g.id !== id));
      } catch (error) {
        console.error("Error deleting:", error);
        alert("שגיאה במחיקה");
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      await updateGraduate(id, { status: newStatus });
      setGraduates(prev => prev.map(g => g.id === id ? { ...g, status: newStatus } : g));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("שגיאה בעדכון הסטטוס");
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved': return <Chip label="מאושר" color="success" size="small" />;
      case 'rejected': return <Chip label="נדחה" color="error" size="small" />;
      default: return <Chip label="ממתין" color="warning" size="small" />;
    }
  };

  return (
    <DesktopOnly>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <PageHeader
          title="ניהול בוגרים וחוות דעת"
          buttonText="הוסף בוגר"
          onButtonClick={() => navigate('/graduates/new')}
        />

        <TableContainer component={Paper} elevation={3}>
          {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}

          {!loading && graduates.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>אין נתונים. לחץ על "הוסף בוגר" כדי להתחיל.</Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>תמונה</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>ת.ז</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>שם מלא</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>תפקיד</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>חוות דעת</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>סטטוס</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>אישור</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {graduates.map((g) => (
                  <TableRow
                    key={g.id}
                    hover // מוסיף אפקט ריחוף יפה כמו במועמדים
                    sx={{
                      // צביעה עדינה מאוד לשורות שממתינות, שמותאמת גם ל-Dark Mode
                      bgcolor: g.status === 'pending'
                        ? (theme) => alpha(theme.palette.warning.main, theme.palette.mode === 'dark' ? 0.15 : 0.08)
                        : 'inherit'
                    }}
                  >
                    <TableCell>
                      <Avatar src={g.imageUrl} alt={g.fullName}>{g.fullName?.charAt(0)}</Avatar>
                    </TableCell>
                    <TableCell>{g.identityCard || g.id}</TableCell>
                    <TableCell>{g.fullName}</TableCell>
                    <TableCell>{g.role}</TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <Tooltip title={g.review || ""}><span>{g.review}</span></Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {getStatusChip(g.status)}
                    </TableCell>
                    <TableCell align="center">
                      {g.status === 'pending' && (
                        <>
                          <IconButton color="success" onClick={() => handleStatusChange(g.id, 'approved')} title="אשר">
                            <CheckIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleStatusChange(g.id, 'rejected')} title="דחה">
                            <CloseIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => navigate(`/graduates/edit/${g.id}`)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(g.id)}><DeleteIcon /></IconButton>
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

export default GraduatesManagement;