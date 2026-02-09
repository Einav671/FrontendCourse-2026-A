import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardContent, Typography,
    Box, LinearProgress, Avatar, Stack, useTheme
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { PageHeader } from '../../components/PageHeader';
import { getAllGraduates } from '../../firebase/graduatesService';

// הגדרת הממשק לפי מה שנשמר בפועל ב-Firebase (כמו במנהל)
interface GraduateData {
    id: string;
    fullName: string;
    role: string;      // במנהל זה מופיע כ"תפקיד"
    review: string;    // במנהל זה מופיע כ"חוות דעת"
    imageUrl?: string; // התמונה
    status?: string;   // סטטוס (נציג רק מאושרים)
}

const PublicGraduates: React.FC = () => {
    const theme = useTheme();
    const [graduates, setGraduates] = useState<GraduateData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGraduates = async () => {
            try {
                // משיכת כל הבוגרים
                const data = await getAllGraduates();

                // סינון: מציגים באתר רק את מי שהסטטוס שלו "approved"
                // המרה: מוודאים שהשדות תואמים למה שהמנהל הזין
                const approvedGraduates = data
                    .filter((g: any) => g.status === 'approved')
                    .map((g: any) => ({
                        id: g.id,
                        fullName: g.fullName,
                        role: g.role || 'בוגר המכללה',
                        review: g.review || 'ממליץ בחום!',
                        imageUrl: g.imageUrl || ''
                    }));

                setGraduates(approvedGraduates);
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
                                overflow: 'visible',
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
                                    boxShadow: 2,
                                    zIndex: 1
                                }}>
                                    <FormatQuoteIcon />
                                </Box>

                                <CardContent sx={{ pt: 5, px: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    {/* שימוש בשדה review במקום quote */}
                                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 3, flexGrow: 1 }}>
                                        "{grad.review}"
                                    </Typography>

                                    <Box mt={2} pt={2} borderTop={`1px solid ${theme.palette.divider}`}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            {/* שימוש ב-imageUrl מהדאטה */}
                                            <Avatar
                                                src={grad.imageUrl}
                                                alt={grad.fullName}
                                                sx={{ bgcolor: theme.palette.secondary.main, width: 50, height: 50 }}
                                            >
                                                {grad.fullName.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography fontWeight="bold" variant="subtitle1">
                                                    {grad.fullName}
                                                </Typography>
                                                <Typography variant="caption" color="primary.main" fontWeight="bold">
                                                    {grad.role}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) : (
                        <Box width="100%" textAlign="center" mt={4}>
                            <Typography variant="h6" color="text.secondary">
                                עדיין לא פורסמו סיפורי בוגרים.
                            </Typography>
                        </Box>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default PublicGraduates;