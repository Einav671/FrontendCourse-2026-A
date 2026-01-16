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
import './ScholarshipsManagement.css'; // Import CSS

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
      <Container maxWidth="lg" className="management-container">

        <PageHeader
          title="ניהול מלגות"
          buttonText="הוסף מלגה"
          onButtonClick={() => navigate('/scholarships/new')}
        />

        <TableContainer component={Paper} elevation={3}>
          {/* אינדיקציית טעינה - LinearProgress */}
          {loading && <Box className="loading-box"><LinearProgress /></Box>}

          {!loading && scholarships.length === 0 ? (
            <Box className="empty-state-box">לא נמצאו מלגות. לחץ על "הוסף מלגה" כדי להתחיל.</Box>
          ) : (
            <Table>
              <TableHead className="table-head-row">
                <TableRow>
                  <TableCell><b>קוד</b></TableCell>
                  <TableCell><b>שם המלגה</b></TableCell>
                  <TableCell><b>קהל יעד</b></TableCell>
                  <TableCell><b>סכום</b></TableCell>
                  <TableCell><b>קישור לאתר</b></TableCell>
                  <TableCell><b>תנאים</b></TableCell>
                  <TableCell align="center"><b>פעולות</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scholarships.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.code}</TableCell>
                    <TableCell className="scholarship-name">{s.name}</TableCell>
                    <TableCell>{s.targetAudience}</TableCell>
                    <TableCell>
                      <Chip label={`₪${s.amount.toLocaleString()}`} color="success" variant="outlined" size="small" />
                    </TableCell>
                    <TableCell>
                      {s.link ? <a href={s.link} target="_blank" rel="noopener noreferrer">קישור</a> : '-'}
                    </TableCell>
                    <TableCell className="conditions-cell">
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