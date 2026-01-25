import React, { useState, useEffect } from 'react';
import {
    Container, Grid, Typography, Button, Box, TextField, Paper,
    Card, CardContent, Avatar, Stack, Snackbar, Alert, CircularProgress, useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import SchoolIcon from '@mui/icons-material/School';

// Services
import { createLead } from '../../firebase/leadsService';
import { getAllGraduates } from '../../firebase/graduatesService';

// Types (מגדיר מקומית למקרה שאין לך גישה לקובץ הטיפוסים המקורי מכאן)
interface GraduateDisplay {
    id: string;
    fullName: string;
    jobTitle?: string; // הנחתי שזה שם השדה אצלך, אם זה אחרת תשנה
    quote?: string;    // כנ"ל
    description?: string;
}

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    // States
    const [leadForm, setLeadForm] = useState({ fullName: '', phone: '', email: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Data States
    const [graduates, setGraduates] = useState<GraduateDisplay[]>([]);
    const [loadingGrads, setLoadingGrads] = useState(true);

    // שליפת בוגרים להוכחה חברתית
    useEffect(() => {
        const fetchGraduates = async () => {
            try {
                const data = await getAllGraduates();
                // ניקח רק את ה-3 האחרונים או הרנדומליים להצגה בדף הבית
                const displayData = data.slice(0, 3).map(g => ({
                    id: g.id,
                    fullName: g.fullName,
                    // כאן אני מניח שמות שדות, תתאים את זה למבנה ב-Graduate.ts שלך
                    jobTitle: (g as any).role || (g as any).jobTitle || 'בוגר המכללה',
                    quote: (g as any).quote || (g as any).description || 'ממליץ בחום על התואר!'
                }));
                setGraduates(displayData);
            } catch (error) {
                console.error("Error fetching graduates:", error);
            } finally {
                setLoadingGrads(false);
            }
        };
        fetchGraduates();
    }, []);

    // שמירת ליד
    const handleSubmitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createLead({
                fullName: leadForm.fullName,
                phone: leadForm.phone,
                email: leadForm.email
            });
            setSubmitted(true);
            setLeadForm({ fullName: '', phone: '', email: '' });
        } catch (error) {
            console.error("Error saving lead:", error);
            alert("אירעה שגיאה בשליחת הפרטים");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: 'white',
                py: 8,
                mb: 4
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid >
                            <Typography variant="h2" fontWeight="800" gutterBottom>
                                מדעי המחשב: <br />הכרטיס שלך לעתיד
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                                השתלב בחזית הטכנולוגיה עם תואר שמשלב AI, Machine Learning ופיתוח מתקדם.
                                העתיד כבר כאן, והוא מחכה לך.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    size="large"
                                    startIcon={<CalculateIcon />}
                                    onClick={() => navigate('/calculator')}
                                    sx={{ py: 1.5, px: 4, fontSize: '1.1rem', fontWeight: 'bold' }}
                                >
                                    מחשבון התאמה אישי
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ color: 'white', borderColor: 'white', py: 1.5, px: 4, fontSize: '1.1rem' }}
                                    size="large"
                                    onClick={() => navigate('/calculator')} // המחשבון מציג גם מלגות
                                >
                                    בדיקת מלגות קיימות
                                </Button>
                            </Stack>
                        </Grid>

                        {/* Lead Form Box */}
                        <Grid >
                            <Paper elevation={10} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <SchoolIcon color="primary" />
                                    <Typography variant="h5" color="text.primary" fontWeight="bold">
                                        רוצה לשמוע עוד?
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    השאר פרטים ויועץ לימודים יחזור אליך עם כל המידע על המסלולים והמלגות.
                                </Typography>
                                <form onSubmit={handleSubmitLead}>
                                    <Stack spacing={2}>
                                        <TextField
                                            label="שם מלא" fullWidth required
                                            value={leadForm.fullName}
                                            onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                                        />
                                        <TextField
                                            label="טלפון" fullWidth required
                                            value={leadForm.phone}
                                            onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                                        />
                                        <TextField
                                            label="אימייל" type="email" fullWidth required
                                            value={leadForm.email}
                                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                            disabled={submitting}
                                        >
                                            {submitting ? "שולח..." : "שלח פרטים ליועץ"}
                                        </Button>
                                    </Stack>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Social Proof (Graduates from Firebase) */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography variant="h4" textAlign="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
                    הבוגרים שלנו מספרים
                </Typography>

                {loadingGrads ? (
                    <Box display="flex" justifyContent="center"><CircularProgress /></Box>
                ) : (
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        {graduates.length > 0 ? graduates.map((grad) => (
                            <Grid key={grad.id}>
                                <Card sx={{ height: '100%', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>{grad.fullName[0]}</Avatar>
                                            <Box>
                                                <Typography fontWeight="bold">{grad.fullName}</Typography>
                                                <Typography variant="caption" color="text.secondary">{grad.jobTitle}</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                                            "{grad.quote}"
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )) : (
                            <Typography textAlign="center" width="100%">אין עדיין המלצות במערכת.</Typography>
                        )}
                    </Grid>
                )}

                {/* Tracks Teaser */}
                <Box textAlign="center" py={6} sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'grey.100', borderRadius: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">עדיין מתלבטים?</Typography>
                    <Typography mb={3}>גלו את מגוון ההתמחויות שלנו: סייבר, בינה מלאכותית, פיתוח ועוד.</Typography>
                    <Button
                        variant="outlined"
                        size="large"
                        color="secondary"
                        endIcon={<AutoAwesomeIcon />}
                        onClick={() => navigate('/tracks')}
                    >
                        לצפייה במסלולי ההתמחות
                    </Button>
                </Box>
            </Container>

            <Snackbar open={submitted} autoHideDuration={6000} onClose={() => setSubmitted(false)}>
                <Alert severity="success" variant="filled">הפרטים נשלחו בהצלחה! ניצור קשר בקרוב.</Alert>
            </Snackbar>
        </Box>
    );
};

export default LandingPage;