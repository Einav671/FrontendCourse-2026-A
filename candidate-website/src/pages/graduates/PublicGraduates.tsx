import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardContent, Typography,
    Box, LinearProgress, Avatar, Stack, useTheme
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { PageHeader } from '../../components/PageHeader';
import { getAllGraduates } from '../../firebase/graduatesService';

// הגדרת טיפוס מקומי לבוגר
interface Graduate {
    id: string;
    fullName: string;
    role?: string; // תפקיד נוכחי
    company?: string; // חברה
    quote?: string; // ציטוט/סיפור
    description?: string; // תיאור נוסף אם יש
    image?: string; // אם יש תמונה (כרגע נשתמש באווטאר גנרי)
}

const PublicGraduates: React.FC = () => {
    const theme = useTheme();
    const [graduates, setGraduates] = useState<Graduate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGraduates = async () => {
            try {
                const data = await getAllGraduates();
                // המרה לטיפוס המקומי
                setGraduates(data.map(g => ({
                    id: g.id,
                    fullName: g.fullName,
                    role: (g as any).role || (g as any).jobTitle || 'בוגר התואר',
                    quote: (g as any).quote || (g as any).description || 'ממליץ בחום על הלימודים!',
                    company: (g as any).company || ''
                })));
            } catch (error) {
                console.error("Error fetching graduates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGraduates();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <PageHeader title="הבוגרים שלנו" />

            <Box textAlign="center" mb={8}>
                <Typography variant="h5" color="text.secondary" paragraph maxWidth="800px" mx="auto">
                    הבוגרים והבוגרות שלנו משתלבים בתפקידי מפתח בחברות המובילות בתעשייה.
                    הנה כמה מהסיפורים שלהם.
                </Typography>
            </Box>

            {loading ? <LinearProgress /> : (
                <Grid container spacing={4}>
                    {graduates.length > 0 ? graduates.map((grad) => (
                        <Grid key={grad.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 4,
                                position: 'relative',
                                overflow: 'visible', // כדי שהאייקון של הציטוט יוכל לצאת קצת
                                mt: 2,
                                boxShadow: 3,
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                            }}>
                                {/* אייקון ציטוט דקורטיבי */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: -20,
                                    right: 20,
                                    bgcolor: theme.palette.primary.main,
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: 40,
                                    height: 40,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: 2
                                }}>
                                    <FormatQuoteIcon />
                                </Box>

                                <CardContent sx={{ pt: 4, px: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 3, flexGrow: 1 }}>
                                        "{grad.quote}"
                                    </Typography>

                                    <Box mt={2} pt={2} borderTop={`1px solid ${theme.palette.divider}`}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 50, height: 50 }}>
                                                {grad.fullName[0]}
                                            </Avatar>
                                            <Box>
                                                <Typography fontWeight="bold" variant="subtitle1">
                                                    {grad.fullName}
                                                </Typography>
                                                <Typography variant="caption" color="primary.main" fontWeight="bold">
                                                    {grad.role} {grad.company ? `| ${grad.company}` : ''}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) : (
                        <Box width="100%" textAlign="center" mt={4}>
                            <Typography>עדיין לא פורסמו סיפורי בוגרים.</Typography>
                        </Box>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default PublicGraduates;