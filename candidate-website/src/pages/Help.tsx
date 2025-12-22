import React from 'react';
import { 
  Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Paper 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Help: React.FC = () => {
  // רשימת השאלות והתשובות - תוכלי להוסיף כאן שאלות נוספות בקלות
  const faqData = [
    {
      question: "איך מוסיפים מועמד חדש?",
      answer: "יש לגשת לעמוד 'ניהול מועמדים' דרך התפריט או דף הבית, וללחוץ על הכפתור 'הוסף מועמד'. שם תוכל למלא את כל פרטי המועמד ולשמור."
    },
    {
      question: "איך שומרים נתונים במערכת?",
      answer: "בסיום מילוי טופס (מלגה, בוגר או מועמד), יש ללחוץ על כפתור ה-'שמור' ובכך המערכת שומרת את המידע באופן אוטומטי."
    },
    {
      question: "איך מאשרים חוות דעת של בוגר?",
      answer: "יש להיכנס לעמוד 'ניהול בוגרים'. בטבלה יופיעו חוות דעת בסטטוס 'ממתין'. לחיצה על כפתור ה-V הירוק תאשר את חוות הדעת ותציג אותה באתר."
    },
    {
      question: "האם ניתן לערוך מלגה קיימת?",
      answer: "כן. בעמוד 'ניהול מלגות', לחץ על אייקון העיפרון הכחול בשורה של המלגה שברצונך לעדכן. לאחר שינוי הפרטים, לחץ על 'שמור'."
    },
    {
      question: "שכחתי סיסמה או איני מצליח להתחבר, מה עושים?",
      answer: "ניתן לפנות לתמיכה הטכנית בכתובת המייל support@system.co.il או דרך דף 'צור קשר' במערכת."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8, direction: 'rtl' }}>
      {/* כותרת הדף */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          מרכז עזרה
        </Typography>
        <Typography variant="h6" color="text.secondary">
          כאן תוכלו למצוא תשובות לשאלות נפוצות.
        </Typography>
      </Box>

      {/* רשימת האקורדיונים */}
      <Box>
        {faqData.map((item, index) => (
          <Accordion 
            key={index} 
            sx={{ 
              mb: 2, 
              borderRadius: '8px !important', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:before': { display: 'none' } 
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1976d2' }} />}
              sx={{ 
                flexDirection: 'row-reverse', // הופך את כיוון החץ לעברית
                '& .MuiAccordionSummary-content': { mr: 2 } 
              }}
            >
              <Typography sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderTop: '1px solid #f0f0f0', bgcolor: '#fafafa' }}>
              <Typography sx={{ color: '#555', lineHeight: 1.6 }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* אזור יצירת קשר בתחתית */}
      <Paper elevation={0} sx={{ mt: 6, p: 4, bgcolor: '#e3f2fd', borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#0d47a1' }}>
          עדיין זקוקים לעזרה?
        </Typography>
        <Typography variant="body1">
          צוות התמיכה הטכנית זמין עבורכם במייל: <strong>support@system.co.il</strong>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Help;