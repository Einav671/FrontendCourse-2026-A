import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Candidate } from './Candidate';
// ייבוא הכותרת המשותפת
import { PageHeader } from '../../components/PageHeader';
import DesktopOnly from '../../components/DesktopOnly';

const CandidatesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('candidates');
    if (saved) {
      setCandidates(JSON.parse(saved));
    } else {
      // נתוני דמו אם אין כלום
      const demoData = [
        new Candidate("1", "ישראל", "ישראלי", "israel@test.com", "0501234567", "CS", 85, 650, "נפתח"),
        new Candidate("2", "דנה", "כהן", "dana@test.com", "0527654321", "CS", 90, 700, "בטיפול")
      ];
      setCandidates(demoData);
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("למחוק את המועמד?")) {
      const updated = candidates.filter(c => c.id !== id);
      setCandidates(updated);
      localStorage.setItem('candidates', JSON.stringify(updated));
    }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'נפתח': return 'info';
          case 'בטיפול': return 'warning';
          case 'התקבל': return 'success';
          case 'נדחה': return 'error';
          case 'נסגר': return 'default';
          default: return 'default';
      }
  };

  return (
    <DesktopOnly>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* שימוש ברכיב המשותף לחיסכון בקוד ועיצוב אחיד */}
      <PageHeader 
        title="ניהול מועמדים" 
        buttonText="מועמד חדש" 
        onButtonClick={() => navigate('/candidates/new')} 
      />

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              {/* כותרות מודגשות - יישור לימין הוא אוטומטי בגלל הגדרת ה-RTL */}
              <TableCell sx={{ fontWeight: 'bold' }}>שם פרטי</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>שם משפחה</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>אימייל</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>טלפון</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>סטטוס</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>{c.firstName}</TableCell>
                <TableCell>{c.lastName}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell align="center">
                    <Chip label={c.status} color={getStatusColor(c.status) as any} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => navigate(`/candidates/edit/${c.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(c.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {candidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">לא נמצאו מועמדים</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </DesktopOnly>
  );
};

export default CandidatesManagement;