import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Box, Button, Stack, useTheme, Paper,
  Card, CardContent, Chip, Accordion, AccordionSummary, AccordionDetails,
  Avatar, LinearProgress, TextField, alpha, Fade, Slide, Zoom, Grow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MemoryIcon from '@mui/icons-material/Memory';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';

// Firebase Services
import { getAllInternships } from '../../firebase/internshipsService';
import { getAllCourses } from '../../firebase/coursesService';
import { getAllGraduates } from '../../firebase/graduatesService';
import { createLead } from '../../firebase/leadsService';

const UserHome: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // --- States for Data ---
  const [tracks, setTracks] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [graduates, setGraduates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- State for Contact Form ---
  const [leadForm, setLeadForm] = useState({id: '',  fullName: '', email: '', phone: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // --- Animation State ---
  const [checked, setChecked] = useState(false);

  // --- FAQ Data ---
  const faqs = [
    { q: "מה ההבדל בין קורס בודד לתואר במדעי המחשב?", a: "התואר האקדמי מעניק ידע מעמיק, תעודה מוכרת עולמית ויכולות מחקר ופיתוח (R&D), בעוד קורסים נקודתיים מתמקדים לרוב בהכשרה טכנית ספציפית ללא הבסיס התיאורטי הנדרש לקידום לתפקידי ניהול." },
    { q: "איך בודקים זכאות למלגות?", a: "ניתן להשתמש במחשבון ההתאמה באתר שלנו (בתפריט 'מחשבון קבלה') שמחשב אוטומטית זכאות למלגות הצטיינות על סמך נתוני הבגרות והפסיכומטרי." },
    { q: "מה ההבדל בין קורסי חובה לבחירה?", a: "קורסי חובה (כמו מתמטיקה, מבוא למדמ\"ח) הם הבסיס של התואר וכולם חייבים לעשותם. קורסי בחירה מאפשרים לך להתמקד בתחומים שמעניינים אותך בשנים ב' ו-ג' (כגון סייבר, AI או פיתוח משחקים)." },
    { q: "האם חייבים ידע מוקדם ב-AI?", a: "ממש לא. התואר בנוי כך שהוא מתחיל מהבסיס ומלמד את כל מה שצריך. עם זאת, זיקה לטכנולוגיה ומתמטיקה בהחלט עוזרת." },
    { q: "כמה זמן נמשך התואר?", a: "התואר נמשך לרוב 3 שנים אקדמיות (6 סמסטרים). קיימת אפשרות לפריסה שונה לאנשים עובדים בתיאום עם המזכירות האקדמית." },
  ];

  useEffect(() => {
    setChecked(true);
    const fetchData = async () => {
      try {
        const [tracksData, coursesData, graduatesData] = await Promise.all([
          getAllInternships(),
          getAllCourses(),
          getAllGraduates()
        ]);

        setTracks(tracksData);
        setCourses(coursesData.slice(0, 6));
        setGraduates(graduatesData.slice(0, 3));
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await createLead(leadForm);
      setFormStatus('success');
      setLeadForm({id: '', fullName: '', phone: '', email: '' });
    } catch (error) {
      console.error("Error sending lead:", error);
      setFormStatus('idle');
    }
  };

  return (
    <Box>
      {/* 1. HERO SECTION */}
      <Box sx={{
        position: 'relative',
        height: { xs: 'auto', md: '80vh' },
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
          <Grid container>
            <Grid>
              
              <Slide direction="right" in={checked} timeout={800}>
                <Box>
                   <Chip label="הרשמה לסמסטר אביב בעיצומה" color="secondary" sx={{ mb: 3, fontWeight: 'bold' }} />
                </Box>
              </Slide>

              <Fade in={checked} timeout={1500}>
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 1.1, mb: 2 }}>
                  להוביל את המהפכה <br />
                  <span style={{ color: theme.palette.primary.light }}>הטכנולוגית הבאה</span>
                </Typography>
              </Fade>

              <Slide direction="up" in={checked} timeout={1200}>
                <Typography variant="h5" sx={{ mb: 5, opacity: 0.9, fontWeight: 300, maxWidth: '600px', lineHeight: 1.6 }}>
                  תואר ראשון במדעי המחשב עם שילוב ייחודי של תיאוריה ופרקטיקה.
                  המסלול שלך לקריירה בהייטק מתחיל כאן.
                </Typography>
              </Slide>

              <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ flexWrap: 'wrap', rowGap: 2 }}
                >
                  <Button
                    variant="contained" size="large" onClick={() => navigate('/calculator')}
                    endIcon={<RocketLaunchIcon />}
                    sx={{
                      px: 4, py: 1.5, borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.7)' },
                        '70%': { boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)' },
                        '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' }
                      },
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  >
                    בדיקת סיכויי קבלה
                  </Button>

                  <Button
                    variant="outlined" size="large" onClick={() => navigate('/tracks')}
                    sx={{ px: 4, py: 1.5, borderRadius: '50px', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                  >
                    מסלולי הלימוד
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/scholarships-info')}
                    startIcon={<SchoolIcon />}
                    sx={{
                      px: 4, py: 1.5, borderRadius: '50px', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    מלגות לימודים
                  </Button>
                </Stack>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. ABOUT CS (TEXT) */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="flex-start">
          <Grid>
            <Grow in={checked} timeout={2000}>
              <Box>
                <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                  למה ללמוד אצלנו?
                </Typography>
                <Typography variant="h3" fontWeight="800" gutterBottom sx={{ mb: 4 }}>
                  מדעי המחשב בעידן ה-AI
                </Typography>

                <Typography paragraph sx={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'text.secondary', mb: 3 }}>
                  בעולם שמשתנה בקצב מסחרר, מתכנתים לא יכולים להסתפק רק בידע בכתיבת קוד.
                  התואר שלנו נבנה מחדש כדי להתאים למהפכת הבינה המלאכותית; אנחנו מכשירים את הסטודנטים לא רק להבין איך מחשבים עובדים, אלא איך ללמד מחשבים לחשוב.
                </Typography>
                <Typography paragraph sx={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'text.secondary', mb: 3 }}>
                  לצד היסודות הקריטיים של מדעי המחשב (אלגוריתמים, מתמטיקה ומבני נתונים), תוכנית הלימודים משלבת מהיום הראשון עבודה עם כלי פיתוח מתקדמים.
                </Typography>

                {/* --- שינוי: הבלטת הקונטיינר --- */}
                <Paper elevation={0} sx={{
                   p: 3, 
                   borderLeft: `6px solid ${theme.palette.secondary.main}`,
                   // הוספת מסגרת עדינה סביב כל הנייר כדי להגדיר אותו
                   border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                   // הכהיית הרקע מעט כדי שיהיה בולט יותר
                   bgcolor: alpha(theme.palette.secondary.main, 0.08),
                   transition: 'transform 0.3s ease-in-out',
                   '&:hover': { transform: 'translateX(-10px)' } 
                }}>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }}>
                    השילוב המנצח: בסיס תיאורטי חזק שיאפשר לך להבין כל טכנולוגיה עתידית, יחד עם פרקטיקה בשימוש ב-Generative AI לייעול הפיתוח.
                  </Typography>
                </Paper>
              </Box>
            </Grow>
          </Grid>

          <Grid>
            <Card sx={{
              borderRadius: 4,
              boxShadow: 8, // צל חזק יותר
              // גרדיאנט במקום צבע אחיד
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  הדרישה בתעשייה
                </Typography>
                <Typography paragraph sx={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.7 }}>
                  חברות ההייטק מחפשות היום "מתכנתי על" – כאלו שיודעים לרתום את כוחה של הבינה המלאכותית כדי לפתח מוצרים מהר יותר וטוב יותר.
                </Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2, fontWeight: 'bold', boxShadow: 3 }}
                  onClick={() => navigate('/graduates-info')}
                >
                  לראות איפה הבוגרים עובדים
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 3. AI SOLUTION SECTION */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f0f4f8', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={5}>
            <Typography variant="h3" fontWeight="bold">היתרון שלנו: שילוב AI בתואר</Typography>
            <Typography variant="subtitle1" color="text.secondary" maxWidth="700px" mx="auto" mt={1} sx={{ fontSize: '1.1rem' }}>
              אנחנו לא רק מלמדים קוד, אנחנו מלמדים איך לפתור בעיות מורכבות באמצעות הכלים המתקדמים ביותר.
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {[
              { icon: <PsychologyIcon fontSize="medium" />, title: "למידה עמוקה (Deep Learning)", text: "קורסים מעשיים בבניית רשתות נוירונים ואימון מודלים." },
              { icon: <MemoryIcon fontSize="medium" />, title: "חומרה ותוכנה", text: "הבנה מעמיקה של איך AI רץ על מעבדים גרפיים." },
              { icon: <AutoFixHighIcon fontSize="medium" />, title: "GenAI וכלים מתקדמים", text: "שימוש בכלי פיתוח מבוססי AI לייעול הכתיבה." },
            ].map((item, i) => (
              <Grid key={i}>
                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 + (i * 500) } : {})}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      height: '100%',
                      // הוספת מסגרת דקה בצבע ראשי שקוף
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                      // רקע מעט כחלחל (ולא לבן לגמרי)
                      bgcolor: alpha(theme.palette.background.paper, 0.8),
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textAlign: 'center',
                      cursor: 'default',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`, // צל צבעוני
                        bgcolor: 'background.paper'
                      }
                    }}
                  >
                    <Box sx={{ color: theme.palette.primary.main, mb: 1.5 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1.1rem' }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                      {item.text}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. TRACKS */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>מסלולי ההתמחות</Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={6} sx={{ fontSize: '1.2rem' }}>
          בשנה ב' ו-ג', הסטודנטים בוחרים התמחות המעניקה יתרון בשוק העבודה.
        </Typography>

        {loading ? <LinearProgress /> : (
          <Grid container spacing={3}>
            {tracks.map((track, index) => (
              <Grid key={track.id}>
                <Slide direction="up" in={checked} timeout={500 + (index * 200)} mountOnEnter unmountOnExit>
                  <Card sx={{
                    height: '100%',
                    borderRadius: 3,
                    borderTop: `4px solid ${theme.palette.secondary.main}`,
                    // מסגרת עדינה מסביב לשאר הכרטיס
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    borderRight: `1px solid ${theme.palette.divider}`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    transition: 'transform 0.2s',
                    '&:hover': { 
                        transform: 'scale(1.02)',
                        boxShadow: 6
                    }
                  }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{track.name || track.title}</Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ height: '60px', overflow: 'hidden' }}>
                        {track.description || "מסלול התמחות מתקדם המשלב ידע תיאורטי ומעשי."}
                      </Typography>
                      <Button size="small" endIcon={<ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} />} onClick={() => navigate('/tracks')}>
                        למידע נוסף
                      </Button>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* 5. COURSES */}
      <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
            <Box>
              <Typography variant="h3" fontWeight="bold">קורסים נבחרים</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.8, fontSize: '1.2rem' }}>הצצה לתוכנית הלימודים העדכנית שלנו</Typography>
            </Box>
            <Button variant="outlined" color="inherit" onClick={() => navigate('/courses-info')}>לקטלוג המלא</Button>
          </Box>

          {loading ? <LinearProgress color="secondary" /> : (
            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid key={course.id}>
                  <Paper sx={{
                    p: 3, borderRadius: 2, 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    backdropFilter: 'blur(10px)', color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                  }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography fontWeight="bold" variant="h6">{course.name}</Typography>
                      <Chip label={course.type} size="small" sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 'bold' }} />
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {course.description ? course.description.substring(0, 80) + '...' : 'קורס ליבה בתואר.'}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* 6. GRADUATES */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
          הבוגרים שלנו מספרים
        </Typography>
        <Typography variant="subtitle1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          הסיפורים האמיתיים של מי שכבר עשו את זה
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 4,
          alignItems: 'stretch'
        }}>
          {graduates.map((grad) => (
            <Paper
              key={grad.id}
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                background: `linear-gradient(to bottom right, #ffffff, ${alpha(theme.palette.secondary.main, 0.05)})`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  position: 'absolute', top: -10, right: 20, fontSize: '8rem',
                  color: alpha(theme.palette.secondary.main, 0.1), lineHeight: 1, fontFamily: 'serif', pointerEvents: 'none'
                }}
              >
                "
              </Typography>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Stack direction="row" spacing={0.5} mb={2}>
                  {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                  ))}
                </Stack>
                <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'text.secondary', minHeight: '80px' }}>
                  {grad.review || grad.quote || "הלימודים נתנו לי את הכלים להצליח בהייטק."}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center" mt={3} sx={{ position: 'relative', zIndex: 1 }}>
                <Avatar
                  src={grad.imageUrl && grad.imageUrl.startsWith('http') && !grad.imageUrl.includes('localhost') ? grad.imageUrl : undefined}
                  alt={grad.fullName}
                  sx={{
                    bgcolor: theme.palette.secondary.main, width: 60, height: 60,
                    border: `2px solid ${theme.palette.background.paper}`, boxShadow: 2
                  }}
                >
                  {grad.fullName?.[0]}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold" variant="subtitle1">{grad.fullName}</Typography>
                  <Typography variant="caption" color="primary" fontWeight="bold">
                    {grad.role || 'בוגר המכללה'}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* 7. FAQ & 8. CONTACT FORM */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>שאלות נפוצות</Typography>
        <Box mt={4}>
          {faqs.map((faq, i) => (
            <Accordion key={i} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, mb: 1, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold" sx={{ fontSize: '1.1rem' }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5', py: 8 }} id="contact-section">
        <Container maxWidth="md">
          <Paper elevation={4} sx={{ 
              p: 5, 
              borderRadius: 4, 
              textAlign: 'center',
              borderTop: `6px solid ${theme.palette.primary.main}`
          }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>רוצים לשמוע עוד?</Typography>
            <Typography mb={4} color="text.secondary" sx={{ fontSize: '1.2rem' }}>השאירו פרטים ויועץ לימודים יחזור אליכם בהקדם</Typography>
            {formStatus === 'success' ? (
              <Zoom in={true}>
                <Stack alignItems="center" spacing={2}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                  <Typography variant="h6" color="success.main">הפרטים נשלחו בהצלחה!</Typography>
                  <Button onClick={() => setFormStatus('idle')}>שלח פנייה נוספת</Button>
                </Stack>
              </Zoom>
            ) : (
              <form onSubmit={handleLeadSubmit}>
                <Grid container spacing={2}>
                  <Grid>
                    <TextField fullWidth label="שם מלא" required value={leadForm.fullName} onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })} />
                  </Grid>
                  <Grid>
                    <TextField fullWidth label="טלפון" required value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} />
                  </Grid>
                  <Grid>
                    <TextField fullWidth label="אימייל" type="email" required value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} />
                  </Grid>
                  <Grid>
                    <Button type="submit" variant="contained" size="large" fullWidth disabled={formStatus === 'sending'} endIcon={<SendIcon />} sx={{ mt: 2, height: '50px', fontSize: '1.1rem' }}>
                      {formStatus === 'sending' ? 'שולח...' : 'דבר איתי!'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default UserHome;