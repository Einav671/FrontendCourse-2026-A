// src/pages/candidates/CandidatesManagement.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Candidate } from './Candidate';

const CandidatesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('candidates');
    if (saved) {
      setCandidates(JSON.parse(saved));
    } else {
      // נתוני דמו אם אין כלום
      setCandidates([
        new Candidate("1", "ישראל", "ישראלי", "israel@test.com", "0501234567", "CS", 85, 650, "נפתח"),
        new Candidate("2", "דנה", "כהן", "dana@test.com", "0527654321", "CS", 90, 700, "בטיפול")
      ]);
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("למחוק את המועמד?")) {
      const updated = candidates.filter(c => c.id !== id);
      setCandidates(updated);
      localStorage.setItem('candidates', JSON.stringify(updated));
    }
  };

  // צבע לסטטוס
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>ניהול מועמדים</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/candidates/new')}>
          מועמד חדש
        </Button>
      </div>
      <br />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>שם פרטי</TableCell>
              <TableCell>שם משפחה</TableCell>
              <TableCell>אימייל</TableCell>
              <TableCell>טלפון</TableCell>
              <TableCell align="center">סטטוס</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.firstName}</TableCell>
                <TableCell>{c.lastName}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell align="center">
                    <Chip label={c.status} color={getStatusColor(c.status) as any} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => navigate(`/candidates/edit/${c.id}`)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(c.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CandidatesManagement;