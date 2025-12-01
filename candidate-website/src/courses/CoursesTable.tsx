import React, { useState, useEffect } from 'react';
import { Course } from './Course';
import './CoursesTable.css';

const CoursesTable: React.FC = () => {
  // 1. אתחול ה-State כמערך ריק בהתחלה
  const [courses, setCourses] = useState<Course[]>([]);

  // --------------------------------------------------------
  // דרישה 1: טעינת נתונים מ-localStorage עם useEffect
  // --------------------------------------------------------
  useEffect(() => {
    // מנסים לקרוא נתונים שנשמרו בעבר
    const savedCourses = localStorage.getItem('my-courses');
    
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
  // בונוס חשוב: שמירת נתונים ל-localStorage
  // (בלי זה, הטעינה לא תעזור לנו בפעם הבאה)
  // --------------------------------------------------------
  useEffect(() => {
    // כל פעם שמשתנה courses משתנה - נשמור את המצב החדש בזיכרון
    if (courses.length > 0) {
        localStorage.setItem('my-courses', JSON.stringify(courses));
    }
  }, [courses]); // התלות ב-[courses] גורמת לזה לרוץ בכל שינוי בטבלה

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

  // פונקציית עזר למחיקת נתונים (כדי שתוכלו לאפס את הטבלה)
  const clearTable = () => {
      setCourses([]);
      localStorage.removeItem('my-courses');
  }

  return (
    <div className="courses-container">
      <h2>תוכנית הלימודים - רשימת קורסים</h2>
      
      {/* כפתורי פעולה */}
      <div className="actions-bar">
        <button onClick={addRandomCourse} className="add-btn">
          + הוסף קורס אקראי
        </button>
        
        <button onClick={clearTable} className="clear-btn">
          אפס טבלה
        </button>
      </div>

      <table className="courses-table">
        <thead>
          <tr>
            <th>קוד קורס</th>
            <th>שם הקורס</th>
            <th>נק"ז</th>
            <th>תיאור</th>
            <th>שייך לתואר</th>
            <th>סוג</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.credits}</td>
              <td>{course.description}</td>
              <td>{course.degreeCode}</td>
              <td>{course.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;