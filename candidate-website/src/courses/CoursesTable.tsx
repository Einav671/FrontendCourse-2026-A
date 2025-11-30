import React, { useState } from 'react';
import { Course } from './Course';
import './CoursesTable.css';

const CoursesTable: React.FC = () => {
  // יצירת State עם נתונים התואמים לשדות החדשים
  const [courses, setCourses] = useState<Course[]>([
    new Course(
        "1", 
        "מבוא למדעי המחשב", 
        "10111", 
        5, 
        "קורס בסיס המלמד עקרונות תכנות בשפת Java", 
        "CS-BA", 
        "חובה"
    ),
    new Course(
        "2", 
        "מבני נתונים", 
        "10222", 
        4, 
        "לימוד מבנים מתקדמים כגון עצים, גרפים ורשימות מקושרות", 
        "CS-BA", 
        "חובה"
    ),
    new Course(
        "3", 
        "בינה מלאכותית", 
        "10333", 
        3.5, 
        "מבוא לאלגוריתמים של חיפוש, למידת מכונה ורשתות נוירונים", 
        "CS-AI", 
        "בחירה"
    ),
  ]);

  return (
    <div className="courses-container">
      <h2>תוכנית הלימודים - רשימת קורסים</h2>
      
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
              {/* טיפ: אפשר להגביל את אורך התיאור ב-CSS אם הוא ארוך מדי */}
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