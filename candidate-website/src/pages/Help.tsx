import React from 'react';

const Help: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif',direction: 'rtl' }}>
      <h1>מרכז עזרה</h1>
      <p>ברוכים הבאים למערכת הניהול. כאן תוכלו למצוא תשובות לשאלות נפוצות.</p>
      
      <h3>איך מוסיפים מועמד חדש?</h3>
      <p>יש לגשת לעמוד "ניהול" וללחוץ על הכפתור "הוסף מועמד".</p>
      
      <h3>איך שומרים נתונים?</h3>
      <p>בסיום העבודה, לחצו על כפתור "שמור נתונים" כדי שהמידע יישמר בדפדפן.</p>
    </div>
  );
};

export default Help;