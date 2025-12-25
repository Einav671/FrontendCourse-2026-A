import React, { useState, useEffect } from 'react';
import { Course } from './Course';
import './CoursesTable.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit'; // ייבוא אייקון עריכה
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'; // לכפתור העריכה בטבלה
import { useNavigate } from 'react-router-dom'; // הוק לניווט

const CoursesTable: React.FC = () => {
  const navigate = useNavigate(); // אתחול ה-Hook לניווט
  const [courses, setCourses] = useState<Course[]>([]);
  const LOCAL_STORAGE_KEY = 'my-courses';

  useEffect(() => {
    const savedCourses = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      setCourses([
        new Course("1", "מבוא למדעי המחשב", "10111", 5, "קורס בסיס", "CS-BA", "חובה")
      ]);
    }
  }, []);

  const addRandomCourse = () => {
    const names = ["סדנת לינוקס", "מבוא לסייבר", "תכנות מונחה עצמים", "מסדי נתונים", "לוגיקה"];
    const types = ["חובה", "בחירה"];
    const degrees = ["CS-BA", "CS-AI", "CS-SEC"];

    const randomId = Date.now().toString();
    const newCourse = new Course(
      randomId,
      names[Math.floor(Math.random() * names.length)],
      Math.floor(10000 + Math.random() * 90000).toString(),
      Math.floor(Math.random() * 4) + 2,
      "קורס שנוצר באופן אקראי",
      degrees[Math.floor(Math.random() * degrees.length)],
      types[Math.floor(Math.random() * types.length)]
    );

    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  const saveToLocalStorage = () => {
    const jsonString = JSON.stringify(courses);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonString);
    alert("הנתונים נשמרו בהצלחה ב-Local Storage!");
  };

  const clearTable = () => {
    setCourses([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <div className="courses-container">
      {/* כפתורי פעולה */}
      <div className="actions-bar" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/courses/new')}
          startIcon={<AddIcon />}
          sx={{ fontWeight: 'bold' }}
        >
          צור קורס חדש (טופס)
        </Button>

        <Button variant="contained" color='info' onClick={addRandomCourse}>
          <AddIcon fontSize='small' sx={{ mr: 1 }} /> הוסף קורס אקראי
        </Button>
        <Button variant="contained" color='success' onClick={saveToLocalStorage}>
          <SaveIcon fontSize='small' sx={{ mr: 1 }} /> שמור שינויים
        </Button>

        <Button variant="contained" color='error' onClick={clearTable}>
          אפס טבלה
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table className="courses-table" aria-label="courses table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>פעולות</TableCell> {/* עמודה חדשה */}
              <TableCell align="center">קוד קורס</TableCell>
              <TableCell align="center">שם הקורס</TableCell>
              <TableCell align="center">נק"ז</TableCell>
              <TableCell align="center">תיאור</TableCell>
              <TableCell align="center">שייך לתואר</TableCell>
              <TableCell align="center">סוג</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/courses/edit/${course.id}`)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>

                <TableCell align="center">{course.code}</TableCell>
                <TableCell align="right">{course.name}</TableCell>
                <TableCell align="center">{course.credits}</TableCell>
                <TableCell align="right">{course.description}</TableCell>
                <TableCell align="center">{course.degreeCode}</TableCell>
                <TableCell align="right">{course.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoursesTable;