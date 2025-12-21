import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Chip, Tooltip 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// --- המחלקה מוגדרת כאן למניעת שגיאות ---
export class Graduate {
    id: string;
    fullName: string;
    role: string;
    degree: string;
    imageUrl: string;
    review: string;
    status: 'pending' | 'approved' | 'rejected';

    constructor(
        id: string, 
        fullName: string, 
        role: string, 
        degree: string, 
        imageUrl: string, 
        review: string,
        status: 'pending' | 'approved' | 'rejected' = 'pending'
    ) {
        this.id = id;
        this.fullName = fullName;
        this.role = role;
        this.degree = degree;
        this.imageUrl = imageUrl;
        this.review = review;
        this.status = status;
    }
}
// ----------------------------------------

const GraduatesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [graduates, setGraduates] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('graduates');
    if (saved) {
      setGraduates(JSON.parse(saved));
    }
  }, []);

  const saveToStorage = (updatedList: any[]) => {
    setGraduates(updatedList);
    localStorage.setItem('graduates', JSON.stringify(updatedList));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("למחוק את הבוגר?")) {
      const updated = graduates.filter((g: any) => g.id !== id);
      saveToStorage(updated);
    }
  };

  const handleApprove = (id: string) => {
    const updated = graduates.map((g: any) => g.id === id ? { ...g, status: 'approved' } : g);
    saveToStorage(updated);
  };

  const handleReject = (id: string) => {
    const updated = graduates.map((g: any) => g.id === id ? { ...g, status: 'rejected' } : g);
    saveToStorage(updated);
  };

  const getStatusChip = (status: string) => {
      switch(status) {
          case 'approved': return <Chip label="מאושר" color="success" size="small" />;
          case 'rejected': return <Chip label="נדחה" color="error" size="small" />;
          default: return <Chip label="ממתין" color="warning" size="small" />;
      }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>ניהול בוגרים וחוות דעת</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/graduates/new')}>
          הוסף בוגר
        </Button>
      </div>
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>תמונה</b></TableCell>
              <TableCell><b>שם מלא</b></TableCell>
              <TableCell><b>תפקיד</b></TableCell>
              <TableCell><b>חוות דעת</b></TableCell>
              <TableCell align="center"><b>סטטוס</b></TableCell>
              <TableCell align="center"><b>אישור</b></TableCell>
              <TableCell align="center"><b>פעולות</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {graduates.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={7} align="center">אין נתונים. לחץ על "הוסף בוגר" כדי להתחיל.</TableCell>
                </TableRow>
            ) : (
                graduates.map((g: any) => (
                <TableRow key={g.id} sx={{ bgcolor: g.status === 'pending' ? '#fffde7' : 'inherit' }}>
                    <TableCell>
                        <Avatar src={g.imageUrl} alt={g.fullName}>{g.fullName?.charAt(0)}</Avatar>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{g.fullName}</TableCell>
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
                                <IconButton color="success" onClick={() => handleApprove(g.id)} title="אשר">
                                    <CheckIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleReject(g.id)} title="דחה">
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
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GraduatesManagement;