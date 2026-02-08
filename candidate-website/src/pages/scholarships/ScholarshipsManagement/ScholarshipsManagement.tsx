import React, { useState, useEffect } from 'react';
import {
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, LinearProgress, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/PageHeader';
import DesktopOnly from '../../../components/DesktopOnly';
import { getAllScholarships, deleteScholarship } from '../../../firebase/scholarshipService';
import type { Scholarship } from '../types/Scholarship';

const ScholarshipsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchScholarships = async () => {
    setLoading(true);
    getAllScholarships().then((list) => {
      setScholarships(list);
    }).catch((error) => {
      console.error("Error fetching scholarships: ", error);
      alert("שגיאה בטעינת המלגות");
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("למחוק את המלגה?")) {
      deleteScholarship(id).then(() => {
        setScholarships(prev => prev.filter(s => s.id !== id));
      }).catch((error) => {
        console.error("Error deleting scholarship: ", error);
        alert("שגיאה במחיקת המלגה");
      });
    }
  };

  return (
    <DesktopOnly>
      <Container maxWidth="lg" sx={{ mt: 4 }}>

        <PageHeader
          title="ניהול מלגות"
          buttonText="הוסף מלגה"
          onButtonClick={() => navigate('/scholarships/new')}
        />

        <TableContainer component={Paper} elevation={3}>
          {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}

          {!loading && scholarships.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>לא נמצאו מלגות. לחץ על "הוסף מלגה" כדי להתחיל.</Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>קוד</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>שם המלגה</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>קהל יעד</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>סכום</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>קישור לאתר</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>תנאים</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scholarships.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>{s.code}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{s.name}</TableCell>
                    <TableCell>{s.targetAudience}</TableCell>
                    <TableCell>
                      <Chip label={`₪${s.amount.toLocaleString()}`} color="success" variant="outlined" size="small" />
                    </TableCell>
                    <TableCell>
                      {s.link ? <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>קישור</a> : '-'}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {s.conditions}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => navigate(`/scholarships/edit/${s.id}`)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(s.id)}>
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

export default ScholarshipsManagement;