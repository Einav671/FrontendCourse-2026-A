import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Course } from './Course';
import { PageHeader } from '../../components/PageHeader'; // ייבוא הרכיב המשותף

const CoursesTable: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const LOCAL_STORAGE_KEY = 'my-courses';

  useEffect(() => {
    const savedCourses = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      const initialData = [
        new Course("1", "מבוא למדעי המחשב", "10111", 5, "קורס בסיס", "CS-BA", "חובה")
      ];
      setCourses(initialData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק קורס זה?")) {
      const updatedCourses = courses.filter(c => c.id !== id);
      setCourses(updatedCourses);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCourses));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* שימוש ב-PageHeader לכותרת וכפתור */}
      <PageHeader 
        title="ניהול קורסים" 
        buttonText="הוסף קורס חדש" 
        onButtonClick={() => navigate('/courses/new')} 
      />

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="courses table">
          <TableHead>
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
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  לא נמצאו קורסים.
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