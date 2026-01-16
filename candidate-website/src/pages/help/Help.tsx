import React from 'react';
import {
  Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PageHeader } from '../../components/PageHeader';
import './Help.css'; // Import CSS

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

      <PageHeader title="מרכז עזרה" />

      <Box className="help-intro">
        <Typography variant="h6" color="text.secondary" gutterBottom>
          כאן תוכלו למצוא תשובות לשאלות נפוצות.
        </Typography>
      </Box>

      {/* רשימת האקורדיונים */}
      <Box>
        {faqData.map((item, index) => (
          <Accordion key={index} className="faq-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
            >
              <Typography className="faq-question">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="faq-details">
              <Typography className="faq-answer">
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* אזור יצירת קשר בתחתית */}
      <Paper elevation={0} className="contact-section-paper">
        <Box className="contact-inner-box">
          <Typography variant="h6" className="contact-title">
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