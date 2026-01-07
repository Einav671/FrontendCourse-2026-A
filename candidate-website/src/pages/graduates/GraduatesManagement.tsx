import React, { useState, useEffect } from 'react';
import { 
  Container, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Chip, Tooltip, CircularProgress 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import type { Graduate } from './Graduate';
import { getAllGraduates, deleteGraduate, updateGraduate } from '../../firebase/graduatesService';

const GraduatesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);

  // טעינת הנתונים
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
        // עדכון מקומי מהיר
        setGraduates(prev => prev.map(g => g.id === id ? { ...g, status: newStatus } : g));
    } catch (error) {
        console.error("Error updating status:", error);
        alert("שגיאה בעדכון הסטטוס");
    }
  };

  const getStatusChip = (status: string) => {
      switch(status) {
          case 'approved': return <Chip label="מאושר" color="success" size="small" />;
          case 'rejected': return <Chip label="נדחה" color="error" size="small" />;
          default: return <Chip label="ממתין" color="warning" size="small" />;
      }
  };

  return (
    <Container maxWidth="lg">
      <PageHeader 
        title="ניהול בוגרים וחוות דעת" 
        buttonText="הוסף בוגר"
        onButtonClick={() => navigate('/graduates/new')}
      />
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell><b>תמונה</b></TableCell>
              {/* הוספנו עמודת תעודת זהות */}
              <TableCell><b>ת.ז</b></TableCell> 
              <TableCell><b>שם מלא</b></TableCell>
              <TableCell><b>תפקיד</b></TableCell>
              <TableCell><b>חוות דעת</b></TableCell>
              <TableCell align="center"><b>סטטוס</b></TableCell>
              <TableCell align="center"><b>אישור</b></TableCell>
              <TableCell align="center"><b>פעולות</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
               <TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>
            ) : graduates.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={8} align="center">אין נתונים. לחץ על "הוסף בוגר" כדי להתחיל.</TableCell>
                </TableRow>
            ) : (
                graduates.map((g) => (
                <TableRow key={g.id} sx={{ bgcolor: g.status === 'pending' ? 'warning.light' : 'inherit' }}>
                    <TableCell>
                        <Avatar src={g.imageUrl} alt={g.fullName}>{g.fullName?.charAt(0)}</Avatar>
                    </TableCell>
                    <TableCell>{g.identityCard || g.id}</TableCell>
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
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GraduatesManagement;