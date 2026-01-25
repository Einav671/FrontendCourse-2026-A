import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Fab, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { PageHeader } from '../../components/PageHeader';

const HelpCenter: React.FC = () => {
    const faqs = [
        { q: "מה ההבדל בין קורס בודד לתואר במדעי המחשב?", a: "התואר האקדמי מעניק ידע מעמיק, תעודה מוכרת עולמית ויכולות מחקר ופיתוח (R&D), בעוד קורסים נקודתיים מתמקדים לרוב בהכשרה טכנית ספציפית ללא הבסיס התיאורטי הנדרש לקידום לתפקידי ניהול." },
        { q: "איך בודקים זכאות למלגות?", a: "ניתן להשתמש במחשבון ההתאמה באתר שלנו (בתפריט 'מחשבון קבלה') שמחשב אוטומטית זכאות למלגות הצטיינות על סמך נתוני הבגרות והפסיכומטרי." },
        { q: "מה ההבדל בין קורסי חובה לבחירה?", a: "קורסי חובה (כמו מתמטיקה, מבוא למדמ\"ח) הם הבסיס של התואר וכולם חייבים לעשותם. קורסי בחירה מאפשרים לך להתמקד בתחומים שמעניינים אותך בשנים ב' ו-ג' (כגון סייבר, AI או פיתוח משחקים)." },
        { q: "האם חייבים ידע מוקדם ב-AI?", a: "ממש לא. התואר בנוי כך שהוא מתחיל מהבסיס ומלמד את כל מה שצריך. עם זאת, זיקה לטכנולוגיה ומתמטיקה בהחלט עוזרת." },
        { q: "כמה זמן נמשך התואר?", a: "התואר נמשך לרוב 3 שנים אקדמיות (6 סמסטרים). קיימת אפשרות לפריסה שונה לאנשים עובדים בתיאום עם המזכירות האקדמית." },
    ];

    const handleWhatsApp = () => {
        // החלף את המספר למספר האמיתי של המכללה
        window.open("https://wa.me/972500000000", "_blank");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 10 }}>
            <PageHeader title="מרכז עזרה ושאלות נפוצות" />

            <Paper elevation={3} sx={{ p: 4, mt: 2, borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <HelpOutlineIcon color="primary" fontSize="large" />
                    <Typography variant="h6">
                        כאן תמצאו תשובות לשאלות הנפוצות ביותר של מועמדים
                    </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                    {faqs.map((faq, index) => (
                        <Accordion key={index} elevation={1} sx={{ mb: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight="bold" color="primary.main">{faq.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    {faq.a}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Paper>

            <Box mt={4} textAlign="center">
                <Typography variant="body1" color="text.secondary">לא מצאת תשובה?</Typography>
                <Typography variant="h6">הצוות שלנו זמין בוואטסאפ!</Typography>
            </Box>

            {/* כפתור וואטסאפ צף */}
            <Fab
                color="success"
                aria-label="whatsapp"
                sx={{ position: 'fixed', bottom: 32, left: 32, zIndex: 1000 }}
                onClick={handleWhatsApp}
            >
                <WhatsAppIcon />
            </Fab>
        </Container>
    );
};

export default HelpCenter;