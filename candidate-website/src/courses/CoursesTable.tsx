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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CoursesTable: React.FC = () => {
  // 1. אתחול ה-State כמערך ריק בהתחלה
  const [courses, setCourses] = useState<Course[]>([]);

  // מפתח קבוע ל-localStorage (כדי שלא נכתוב "my-courses" כמה פעמים)
  const LOCAL_STORAGE_KEY = 'my-courses';

  // --------------------------------------------------------
  // דרישה 1: טעינת נתונים מ-localStorage עם useEffect
  // --------------------------------------------------------
  useEffect(() => {
    // מנסים לקרוא נתונים שנשמרו בעבר
    const savedCourses = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (savedCourses) {
      // אם יש נתונים, הופכים אותם חזרה למערך ומעדכנים את ה-State
      // הערה: JSON.parse מחזיר אובייקטים פשוטים. בקוד מורכב יותר היינו ממירים אותם חזרה ל-new Course
      setCourses(JSON.parse(savedCourses));
    } else {
      // אופציונלי: אם אין כלום בזיכרון, אפשר לטעון נתונים התחלתיים
      setCourses([
        new Course("1", "מבוא למדעי המחשב", "10111", 5, "קורס בסיס", "CS-BA", "חובה")
      ]);
    }
  }, []); // המערך הריק [] מבטיח שזה ירוץ רק פעם אחת בטעינת הקומפוננטה

  // --------------------------------------------------------
  // *** דרישה חדשה: אין שמירה אוטומטית, אלא שמירה ידנית בלבד.
  // לכן ה-useEffect הבא הוצא מפעולה (קומנט).
  // --------------------------------------------------------
  /*
  useEffect(() => {
    // כל פעם שמשתנה courses משתנה - נשמור את המצב החדש בזיכרון
    if (courses.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
    }
  }, [courses]); // התלות ב-[courses] גורמת לזה לרוץ בכל שינוי בטבלה
  */

  // --------------------------------------------------------
  // דרישה 2: פונקציה להוספת אובייקט אקראי
  // --------------------------------------------------------
  const addRandomCourse = () => {
    // מאגרי נתונים להגרלה
    const names = ["סדנת לינוקס", "מבוא לסייבר", "תכנות מונחה עצמים", "מסדי נתונים", "לוגיקה"];
    const types = ["חובה", "בחירה"];
    const degrees = ["CS-BA", "CS-AI", "CS-SEC"];

    // הגרלת ערכים
    const randomId = Date.now().toString(); // יצירת מזהה ייחודי לפי זמן
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCode = Math.floor(10000 + Math.random() * 90000).toString(); // מספר בין 10000-99999
    const randomCredits = Math.floor(Math.random() * 4) + 2; // בין 2 ל-5
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomDegree = degrees[Math.floor(Math.random() * degrees.length)];
    
    // יצירת אובייקט חדש מהמחלקה Course
    const newCourse = new Course(
      randomId,
      randomName,
      randomCode,
      randomCredits,
      "קורס שנוצר באופן אקראי",
      randomDegree,
      randomType
    );

    // עדכון ה-State בצורה שלא משנה את המערך הקיים אלא יוצרת חדש (Immutability)
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  // --------------------------------------------------------
  // דרישה 3: שמירת הנתונים ל-localStorage בלחיצת כפתור
  // --------------------------------------------------------
  const saveToLocalStorage = () => {
    const jsonString = JSON.stringify(courses);          // המרה ל-JSON
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonString); // שמירה תחת אותו מפתח
    alert("הנתונים נשמרו בהצלחה ב-Local Storage!");
  };

  // פונקציית עזר למחיקת נתונים (כדי שתוכלו לאפס את הטבלה)
  const clearTable = () => {
      setCourses([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <div className="courses-container">
      <h2>תוכנית הלימודים - רשימת קורסים</h2>
      
      {/* כפתורי פעולה */}
      <div className="actions-bar">
        <Button variant="contained" color='info' onClick={addRandomCourse} className="add-btn">
          <AddIcon fontSize='small' /> הוסף קורס אקראי
        </Button>

        {/* כפתור חדש: שמירה ידנית ל-localStorage */}
        <Button variant="contained" color='success' onClick={saveToLocalStorage} className="save-btn">
          <SaveIcon fontSize='small' /> שמור נתונים
        </Button>
        
        <Button variant="contained" color='error' onClick={clearTable} className="clear-btn">
          אפס טבלה
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table className="courses-table" aria-label="courses table">
          <TableHead>
            <TableRow>
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
