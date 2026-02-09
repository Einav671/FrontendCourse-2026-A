import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardContent, Typography,
    Box, LinearProgress, Chip, Button, Divider, CardActions
} from '@mui/material';
import { PageHeader } from '../../components/PageHeader';
import { getAllScholarships } from '../../firebase/scholarshipService';
import StarsIcon from '@mui/icons-material/Stars';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';

// עדכון הממשק שיתאים לנתוני המנהל
interface Scholarship {
    id: string;
    name: string;
    amount: string | number;
    description: string;
    targetAudience?: string;
    link?: string;
    conditions?: string;
    code?: string;
}

const PublicScholarships: React.FC = () => {
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const data = await getAllScholarships();
                setScholarships(data as unknown as Scholarship[]);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchScholarships();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <PageHeader title="מלגות וסיוע לסטודנטים" />

            <Box textAlign="center" mb={6}>
                <Typography variant="h5" color="text.secondary" paragraph>
                    אנו מאמינים כי השכלה גבוהה צריכה להיות נגישה לכולם.
                    המכללה מציעה מגוון מלגות הצטיינות וסיוע כלכלי.
                </Typography>
                <Button variant="contained" size="large" onClick={() => navigate('/calculator')}>
                    בדקו זכאות במחשבון ההתאמה
                </Button>
            </Box>

            {loading ? <LinearProgress /> : (
                <Grid container spacing={4}>
                    {scholarships.length > 0 ? scholarships.map((scholarship) => (
                        <Grid key={scholarship.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderTop: '6px solid #4caf50',
                                borderRadius: 2,
                                boxShadow: 4,
                                transition: '0.3s',
                                '&:hover': { boxShadow: 10 }
                            }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                                            {scholarship.name}
                                        </Typography>
                                        <StarsIcon color="success" />
                                    </Box>

                                    <Box mb={2}>
                                        <Chip
                                            label={`₪${scholarship.amount?.toLocaleString()}`}
                                            color="success"
                                            sx={{ fontWeight: 'bold', mr: 1 }}
                                        />
                                        {scholarship.targetAudience && (
                                            <Chip
                                                label={scholarship.targetAudience}
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {scholarship.description}
                                    </Typography>

                                    {scholarship.conditions && (
                                        <>
                                            <Divider sx={{ my: 1.5 }} />
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                תנאי סף:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {scholarship.conditions}
                                            </Typography>
                                        </>
                                    )}
                                </CardContent>

                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    {scholarship.link ? (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            endIcon={<LaunchIcon />}
                                            href={scholarship.link}
                                            target="_blank"
                                        >
                                            להגשת מועמדות
                                        </Button>
                                    ) : (
                                        <Typography variant="caption" color="text.disabled">
                                            פרטים נוספים במזכירות
                                        </Typography>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    )) : (
                        <Box width="100%" textAlign="center" mt={4}>
                            <Typography variant="h6">לא נמצאו מלגות פעילות כרגע.</Typography>
                        </Box>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default PublicScholarships;