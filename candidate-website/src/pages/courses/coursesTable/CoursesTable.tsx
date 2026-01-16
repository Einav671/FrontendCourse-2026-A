import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, LinearProgress, Box, Typography, Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// תיקון: ייבוא הפונקציה הנכונה מהקובץ ששלחת לי
import { getAllCourses } from '../../../firebase/coursesService';
import type { Course } from '../types/Course';
import './CoursesTable.css'; // Import CSS

const CoursesTable: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        // המרה ידנית אם צריך, או שימוש בנתונים כפי שהם אם הסרוויס מחזיר מחלקה
        setCourses(data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" className="management-container">
      <Box className="page-title-row">
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
        {/* אינדיקציית טעינה */}
        {loading && <Box className="loading-box"><LinearProgress /></Box>}

        {!loading && courses.length === 0 ? (
          <Box className="empty-message">
            <Typography>לא נמצאו קורסים במערכת</Typography>
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="courses table">
            <TableHead className="table-head-row">
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
                  <TableCell component="th" scope="row" className="course-name-cell">
                    {course.name}
                  </TableCell>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.type}</TableCell>
                  <TableCell className="actions-cell">
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