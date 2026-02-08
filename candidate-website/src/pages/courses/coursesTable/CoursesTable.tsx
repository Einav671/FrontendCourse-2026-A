import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, LinearProgress, Box, Typography, Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../../firebase/coursesService';
import type { Course } from '../types/Course';
import { PageHeader } from '../../../components/PageHeader';

const CoursesTable: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader
        title="ניהול קורסים"
        buttonText="קורס חדש"
        onButtonClick={() => navigate('/courses/new')}
      />

      <TableContainer component={Paper} elevation={3}>
        {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}

        {!loading && courses.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography>לא נמצאו קורסים במערכת</Typography>
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="courses table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>שם הקורס</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>קוד קורס</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>נקודות זכות</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>סוג</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow
                  key={course.id}
                  hover // הוספת אפקט ריחוף
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    {course.name}
                  </TableCell>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.type}</TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>
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