import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardContent, Typography,
    Box, LinearProgress, Chip, Button
} from '@mui/material';
import { PageHeader } from '../../components/PageHeader';
import { getAllScholarships } from '../../firebase/scholarshipService';
import StarsIcon from '@mui/icons-material/Stars';
import { useNavigate } from 'react-router-dom';

interface Scholarship {
    id: string;
    name: string;
    amount: string;
    description: string;
    // שדות נוספים אם יש
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
                <Button variant="contained" onClick={() => navigate('/calculator')}>
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
                                borderRight: '6px solid #4caf50', // צבע ירוק למלגות
                                boxShadow: 3
                            }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Typography variant="h5" fontWeight="bold" color="primary">
                                            {scholarship.name}
                                        </Typography>
                                        <StarsIcon color="success" fontSize="large" />
                                    </Box>

                                    <Chip
                                        label={`גובה המלגה: ${scholarship.amount}`}
                                        color="success"
                                        variant="outlined"
                                        sx={{ mb: 2, fontWeight: 'bold' }}
                                    />

                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {scholarship.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) : (
                        <Box width="100%" textAlign="center" mt={4}>
                            <Typography>לא נמצאו מלגות פעילות כרגע.</Typography>
                        </Box>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default PublicScholarships;