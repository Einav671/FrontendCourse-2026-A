import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import type { Course } from './Course';
import { PageHeader } from '../../components/PageHeader';
import { getAllCourses, deleteCourse } from '../../firebase/coursesService'; // ייבוא ה-Service
import './CoursesTable.css'; 

const CoursesTable: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // פונקציה לטעינת נתונים
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("שגיאה בטעינת הקורסים");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק קורס זה?")) {
      try {
        await deleteCourse(id);
        // עדכון הרשימה המקומית
        setCourses(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("שגיאה במחיקת הקורס");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader 
        title="ניהול קורסים" 
        buttonText="הוסף קורס חדש" 
        onButtonClick={() => navigate('/courses/new')} 
      />

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="courses table">
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>קוד קורס</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>שם הקורס</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>נק"ז</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>תיאור</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>תואר</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>סוג</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  לא נמצאו קורסים. לחץ על "הוסף קורס חדש" כדי להתחיל.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id} hover>
                  <TableCell>{course.code}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{course.name}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {course.description}
                  </TableCell>
                  <TableCell>{course.degreeCode}</TableCell>
                  <TableCell>
                    <Chip label={course.type} size="small" color={course.type === 'חובה' ? 'primary' : 'default'} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                        color="primary" 
                        onClick={() => navigate(`/courses/edit/${course.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                        color="error" 
                        onClick={() => handleDelete(course.id)}
                    >
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

export default CoursesTable;