import React, { useState, useEffect } from 'react';
import { 
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import DesktopOnly from '../../components/DesktopOnly';
import { getAllScholarships,deleteScholarship } from '../../firebase/scholarshipService';
import type { Scholarship } from './Scholarship';


const ScholarshipsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true); // הוספנו אינדיקציה לטעינה

  // פונקציה לשליפת הנתונים מ-Firebase
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
        fetchScholarships();
      }).catch((error) => {
        console.error("Error deleting scholarship: ", error);
        alert("שגיאה במחיקת המלגה");
      });
    }
  };

  return (
    <DesktopOnly>
      <Container maxWidth="lg">
      
      <PageHeader 
        title="ניהול מלגות" 
        buttonText="הוסף מלגה"
        onButtonClick={() => navigate('/scholarships/new')}
      />
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
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
            {loading ? (
               <TableRow>
                 <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                   <CircularProgress />
                 </TableCell>
               </TableRow>
            ) : scholarships.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={7} align="center">לא נמצאו מלגות. לחץ על "הוסף מלגה" כדי להתחיל.</TableCell>
                </TableRow>
            ) : (
                scholarships.map((s) => (
                <TableRow key={s.id}>
                    <TableCell>{s.code}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{s.name}</TableCell>
                    <TableCell>{s.targetAudience}</TableCell>
                    <TableCell>
                        <Chip label={`₪${s.amount.toLocaleString()}`} color="success" variant="outlined" size="small" />
                    </TableCell>
                    <TableCell>
                        {s.link ? <a href={s.link} target="_blank" rel="noopener noreferrer">קישור</a> : '-'}
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
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </DesktopOnly>
  );
};

export default ScholarshipsManagement;