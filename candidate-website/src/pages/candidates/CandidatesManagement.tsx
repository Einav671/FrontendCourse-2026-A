import React, { useState, useEffect } from 'react';
import { 
  Container, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip, LinearProgress, Box 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from './Candidate';
import { PageHeader } from '../../components/PageHeader';
import { getAllCandidates, deleteCandidate } from '../../firebase/candidatesService';
import DesktopOnly from '../../components/DesktopOnly';

const CandidatesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data = await getAllCandidates();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      alert("שגיאה בטעינת המועמדים");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("למחוק את המועמד?")) {
      try {
        await deleteCandidate(id);
        setCandidates(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting candidate:", error);
        alert("שגיאה במחיקת המועמד");
      }
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
      <PageHeader 
        title="ניהול מועמדים" 
        buttonText="מועמד חדש" 
        onButtonClick={() => navigate('/candidates/new')} 
      />

      <TableContainer component={Paper} elevation={3}>
        {/* אינדיקציית טעינה לפי דרישות המחוון */}
        {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}

        {!loading && candidates.length === 0 ? (
           <Box p={3} textAlign="center">לא נמצאו מועמדים</Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ת.ז.</TableCell>
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
                <TableCell>{c.identityCard || c.id}</TableCell>
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
            </TableBody>
          </Table>
        )}
      </TableContainer>
      </Container>
    </DesktopOnly>
  );
};

export default CandidatesManagement;