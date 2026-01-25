import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardContent, Typography, List, ListItem,
    ListItemIcon, ListItemText, Button, Box, CircularProgress, useTheme
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WorkIcon from '@mui/icons-material/Work';
import { PageHeader } from '../../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { getAllInternships } from '../../firebase/internshipsService';

// אני מניח ש-Internship ב-Service שלך מייצג מסלול התמחות
// אם המבנה שונה, אנא עדכן את השדות כאן
interface Track {
    id: string;
    name: string; // שם המסלול
    description: string;
    skills?: string[]; // מניח שיש מערך של כישורים
    careerOptions?: string; // כיווני קריירה
}

const SpecializationTracks: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await getAllInternships();
                // המרה למבנה המקומי
                setTracks(data.map(d => ({
                    id: d.id,
                    name: (d as any).name || (d as any).title || 'מסלול התמחות',
                    description: (d as any).description || '',
                    skills: (d as any).skills || ['פיתוח מעשי', 'עבודה בצוות', 'טכנולוגיות מתקדמות'],
                    careerOptions: (d as any).career || (d as any).company || 'הייטק ופיתוח'
                })));
            } catch (error) {
                console.error("Error loading tracks", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTracks();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <PageHeader title="מסלולי התמחות וקריירה" />
            <Typography variant="subtitle1" textAlign="center" sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
                התואר שלנו מאפשר לך לבחור את הדרך שלך. בשנה השנייה תוכלו לבחור אחד ממסלולי ההתמחות ולהעמיק בתחום שהכי מדבר אליכם.
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center"><CircularProgress /></Box>
            ) : (
                <Grid container spacing={4}>
                    {tracks.length > 0 ? tracks.map((track) => (
                        <Grid key={track.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.3s',
                                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
                            }}>
                                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', bgcolor: theme.palette.action.hover }}>
                                    <WorkIcon fontSize="large" color="primary" />
                                </Box>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" component="div" gutterBottom fontWeight="bold" color="primary">
                                        {track.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {track.description}
                                    </Typography>

                                    {track.skills && track.skills.length > 0 && (
                                        <>
                                            <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2 }}>
                                                מיומנויות נרכשות:
                                            </Typography>
                                            <List dense>
                                                {Array.isArray(track.skills) ? track.skills.map((skill, i) => (
                                                    <ListItem key={i} disablePadding>
                                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                                            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={skill} />
                                                    </ListItem>
                                                )) : (
                                                    // Fallback if skills is a string
                                                    <ListItem disablePadding>
                                                        <ListItemText primary={String(track.skills)} />
                                                    </ListItem>
                                                )}
                                            </List>
                                        </>
                                    )}

                                    <Typography variant="subtitle2" sx={{ mt: 2, p: 1, bgcolor: 'primary.light', color: 'white', borderRadius: 1, textAlign: 'center' }}>
                                        קריירה: {track.careerOptions}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) : (
                        <Box width="100%" textAlign="center">
                            <Typography>טרם הוזנו מסלולי התמחות במערכת.</Typography>
                        </Box>
                    )}
                </Grid>
            )}

            <Box textAlign="center" mt={6}>
                <Button variant="contained" size="large" onClick={() => navigate('/')}>
                    חזרה לדף הבית
                </Button>
            </Box>
        </Container>
    );
};

export default SpecializationTracks;