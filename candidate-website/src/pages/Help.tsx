import React from 'react';
import { 
  Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Paper 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PageHeader } from '../components/PageHeader';

const Help: React.FC = () => {
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
    <Container maxWidth="md">
      
      {/* כותרת ראשית */}
      <PageHeader title="מרכז עזרה" />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
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
              boxShadow: 1, // שימוש בצלליות מובנות
              '&:before': { display: 'none' } 
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              // ב-RTL האייקון אוטומטית יופיע בצד הנכון ללא צורך ב-flexDirection
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'action.hover' }}>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* אזור יצירת קשר בתחתית */}
      <Paper elevation={0} sx={{ mt: 6, p: 4, bgcolor: 'primary.light', bgOpacity: 0.1, borderRadius: 3, textAlign: 'center' }}>
        {/* הערה: bgcolor צריך להיות צבע חוקי מהתמה, כאן השתמשתי בקידוד פשוט, עדיף להשתמש ב-theme.palette */}
        <Box sx={{ bgcolor: '#e3f2fd', p: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark' }}>
            עדיין זקוקים לעזרה?
            </Typography>
            <Typography variant="body1">
            צוות התמיכה הטכנית זמין עבורכם במייל: <strong>support@system.co.il</strong>
            </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Help;