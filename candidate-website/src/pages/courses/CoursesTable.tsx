import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Button, LinearProgress, Box, Typography, Container 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// תיקון: ייבוא הפונקציה הנכונה מהקובץ ששלחת לי
import { getAllCourses } from '../../firebase/coursesService'; 

// נגדיר את המבנה של הקורס שיתאים למה שחוזר מהשרת
interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  type: string;
  // אפשר להוסיף עוד שדות אם רוצים להציג אותם בטבלה
}

const CoursesTable: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  
  // State לניהול הטעינה
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // מתחילים טעינה
        const data = await getAllCourses();
        setCourses(data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false); // מסיימים טעינה בכל מקרה
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          ניהול קורסים
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => navigate('/courses/new')}
        >
          קורס חדש
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        {/* דרישת המחוון: אינדיקציית טעינה (Linear Progress) */}
        {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>} 
        
        {!loading && courses.length === 0 ? (
          <Box p={3} textAlign="center">
            <Typography>לא נמצאו קורסים במערכת</Typography>
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="courses table">
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell><b>שם הקורס</b></TableCell>
                <TableCell><b>קוד קורס</b></TableCell>
                <TableCell><b>נקודות זכות</b></TableCell>
                <TableCell><b>סוג</b></TableCell>
                <TableCell align="left"><b>פעולות</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow
                  key={course.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {course.name}
                  </TableCell>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.type}</TableCell>
                  <TableCell align="left">
                    {/* דרישת המחוון: קישור ישיר לעריכה לפי ID */}
                    <IconButton 
                      color="primary" 
                      onClick={() => navigate(`/courses/edit/${course.id}`)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default CoursesTable;