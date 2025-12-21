import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

// --- הגדרת המחלקה (Class) בתוך הקובץ ---
export class Scholarship {
    id: string;
    code: string;
    name: string;
    targetAudience: string;
    amount: number;
    link: string;
    conditions: string;

    constructor(id: string, code: string, name: string, targetAudience: string, amount: number, link: string, conditions: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.targetAudience = targetAudience;
        this.amount = amount;
        this.link = link;
        this.conditions = conditions;
    }
}
// ----------------------------------------

const ScholarshipsManagement: React.FC = () => {
  const navigate = useNavigate();
  // שימוש ב-any[] כדי למנוע שגיאות אדומות של TypeScript
  const [scholarships, setScholarships] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('scholarships');
    if (saved) {
      setScholarships(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("למחוק את המלגה?")) {
      const updated = scholarships.filter((s: any) => s.id !== id);
      setScholarships(updated);
      localStorage.setItem('scholarships', JSON.stringify(updated));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>ניהול מלגות</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/scholarships/new')}>
          הוסף מלגה
        </Button>
      </div>
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>קוד</b></TableCell>
              <TableCell><b>שם המלגה</b></TableCell>
              <TableCell><b>קהל יעד</b></TableCell>
              <TableCell><b>סכום</b></TableCell>
              <TableCell><b>תנאים</b></TableCell>
              <TableCell align="center"><b>פעולות</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scholarships.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} align="center">לא נמצאו מלגות. לחץ על "הוסף מלגה" כדי להתחיל.</TableCell>
                </TableRow>
            ) : (
                scholarships.map((s: any) => (
                <TableRow key={s.id}>
                    <TableCell>{s.code}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{s.name}</TableCell>
                    <TableCell>{s.targetAudience}</TableCell>
                    <TableCell>
                        <Chip label={`₪${s.amount}`} color="success" variant="outlined" size="small" />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {s.conditions}
                    </TableCell>
                    <TableCell align="center">
                    <IconButton color="primary" onClick={() => navigate(`/scholarships/edit/${s.id}`)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(s.id)}><DeleteIcon /></IconButton>
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