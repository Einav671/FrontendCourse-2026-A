import React, { useState, useEffect } from 'react';
import {
    Container, Grid, Card, CardContent, Typography, Chip, Button,
    ButtonGroup, Box, LinearProgress, Divider
} from '@mui/material';
import { PageHeader } from '../../components/PageHeader';
import { getAllCourses } from '../../firebase/coursesService';

// שימוש בטיפוס כללי כדי לא לשבור אם ה-Import המקורי חסר
interface PublicCourse {
    id: string;
    name: string;
    type: 'חובה' | 'בחירה' | string; // גמיש
    description?: string;
    points?: number;
}

const PublicCourses: React.FC = () => {
    const [courses, setCourses] = useState<PublicCourse[]>([]);
    const [filter, setFilter] = useState<'All' | 'חובה' | 'בחירה'>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses();
                // המרה לטיפוס המקומי במידת הצורך
                setCourses(data as unknown as PublicCourse[]);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = filter === 'All'
        ? courses
        : courses.filter(c => c.type === filter);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <PageHeader title="קטלוג קורסים לשנת הלימודים" />

            <Typography variant="subtitle1" gutterBottom sx={{ mb: 4, maxWidth: '800px' }}>
                צפו ברשימת הקורסים המעודכנת. ניתן לסנן לפי קורסי חובה (ליבה) וקורסי בחירה המאפשרים התמחות בתחומים מתקדמים.
            </Typography>

            {/* כפתורי סינון */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <ButtonGroup variant="outlined" size="large">
                    <Button variant={filter === 'All' ? 'contained' : 'outlined'} onClick={() => setFilter('All')}>כל הקורסים</Button>
                    <Button variant={filter === 'חובה' ? 'contained' : 'outlined'} onClick={() => setFilter('חובה')}>קורסי חובה</Button>
                    <Button variant={filter === 'בחירה' ? 'contained' : 'outlined'} onClick={() => setFilter('בחירה')}>קורסי בחירה</Button>
                </ButtonGroup>
            </Box>

            {loading ? <LinearProgress /> : (
                <Grid container spacing={3}>
                    {filteredCourses.length > 0 ? filteredCourses.map((course) => (
                        <Grid key={course.id}>
                            <Card sx={{
                                height: '100%',
                                borderTop: `4px solid ${course.type === 'חובה' ? '#1976d2' : '#ed6c02'}`,
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                            }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                                            {course.name}
                                        </Typography>
                                        <Chip
                                            label={course.type}
                                            color={course.type === 'חובה' ? 'primary' : 'warning'}
                                            size="small"
                                        />
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: '60px' }}>
                                        {course.description || "אין תיאור זמין לקורס זה."}
                                    </Typography>
                                    {course.points && (
                                        <Box mt={2}>
                                            <Chip label={`נקודות זכות: ${course.points}`} variant="outlined" size="small" />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    )) : (
                        <Box width="100%" textAlign="center" mt={4}>
                            <Typography>לא נמצאו קורסים בקטגוריה זו.</Typography>
                        </Box>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default PublicCourses;