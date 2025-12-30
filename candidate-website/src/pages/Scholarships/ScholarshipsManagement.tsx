import React, { useState, useEffect } from 'react';
import { 
  Container, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';

// הערה: עדיף לייבא את Scholarship מקובץ Scholarship.ts אם הוא קיים בפרויקט
// לצורך הדוגמה נשאיר את המבנה שהיה בטבלה
interface ScholarshipData {
    id: string;
    code: string;
    name: string;
    targetAudience: string;
    amount: number;
    link: string;
    conditions: string;
}

const ScholarshipsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<ScholarshipData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('scholarships');
    if (saved) {
      setScholarships(JSON.parse(saved));
    } else {
      setScholarships([]); 
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("למחוק את המלגה?")) {
      const updated = scholarships.filter((s) => s.id !== id);
      setScholarships(updated);
      localStorage.setItem('scholarships', JSON.stringify(updated));
    }
  };

  return (
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
            {scholarships.length === 0 ? (
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
  );
};

export default ScholarshipsManagement;