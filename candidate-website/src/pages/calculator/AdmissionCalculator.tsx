import React, { useState } from 'react';
import {
    Paper, Typography, TextField, Button, Box, MenuItem, Alert,
    List, ListItem, ListItemIcon, ListItemText, Chip, Divider, Fade
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsIcon from '@mui/icons-material/Stars';
import './Calculator.css';

// הגדרת מבנה של מלגה
interface Scholarship {
    id: number;
    name: string;
    amount: string;
    description: string;
}

const AdmissionCalculator: React.FC = () => {
    const [formData, setFormData] = useState({
        degree: 'CS',
        bagrut: '',
        psychometric: ''
    });

    const [admissionResult, setAdmissionResult] = useState<{ status: string, message: string, color: "success" | "warning" | "error" } | null>(null);
    const [eligibleScholarships, setEligibleScholarships] = useState<Scholarship[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        let tempErrors: any = {};
        let isValid = true;

        if (formData.degree !== 'CS') {
            tempErrors.degree = "התואר היחיד הזמין כרגע הוא מדעי המחשב"; isValid = false;
        }

        const bagrutVal = Number(formData.bagrut);
        if (!formData.bagrut || bagrutVal < 55 || bagrutVal > 120) {
            tempErrors.bagrut = "ציון בגרות חייב להיות בין 55 ל-120"; isValid = false;
        }

        const psychoVal = Number(formData.psychometric);
        if (!formData.psychometric || psychoVal < 200 || psychoVal > 800) {
            tempErrors.psychometric = "פסיכומטרי חייב להיות בין 200 ל-800"; isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const calculate = () => {
        setAdmissionResult(null);
        setEligibleScholarships([]);

        if (!validate()) return;

        const bagrut = Number(formData.bagrut);
        const psycho = Number(formData.psychometric);
        const score = (bagrut * 6 + psycho) / 2;

        let isAccepted = false;
        if (score >= 650) {
            isAccepted = true;
            setAdmissionResult({
                status: "קבלה אוטומטית",
                message: `ציון מתאם: ${score.toFixed(0)} - התקבלת למדעי המחשב! 🎉`,
                color: "success"
            });
        } else if (score >= 550) {
            isAccepted = true;
            setAdmissionResult({
                status: "המתנה / וועדה",
                message: `ציון מתאם: ${score.toFixed(0)} - נתונים גבוליים, עובר לוועדת קבלה.`,
                color: "warning"
            });
        } else {
            setAdmissionResult({
                status: "דחייה",
                message: `ציון מתאם: ${score.toFixed(0)} - לא עומד בתנאי הסף.`,
                color: "error"
            });
        }

        if (isAccepted) {
            const scholarships: Scholarship[] = [];
            if (psycho >= 700) scholarships.push({ id: 1, name: "מלגת מצטייני נשיא", amount: "10,000 ₪", description: "בזכות ציון פסיכומטרי מעל 700" });
            if (bagrut >= 110) scholarships.push({ id: 2, name: "מלגת הישגים בבגרות", amount: "5,000 ₪", description: "בזכות ממוצע בגרות מעל 110" });
            scholarships.push({ id: 3, name: "מלגת עידוד טכנולוגי", amount: "2,000 ₪", description: "מענק חד פעמי לנרשמים החודש" });
            setEligibleScholarships(scholarships);
        }
    };

    return (
        <div className="calc-container">
            <div className="calc-icon-wrapper">
                <CalculateIcon fontSize="large" />
            </div>

            <Typography variant="h4" className="calc-title">
                מחשבון התאמה ומלגות
            </Typography>

            <Typography variant="body1" className="calc-subtitle">
                בדיקה מיידית של סיכויי קבלה וזכאות למלגות הצטיינות
            </Typography>

            <Paper className="calc-card">
                <Typography className="section-title">הזנת נתונים</Typography>

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        select
                        label="בחירת תואר"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        sx={{ bgcolor: '#f8fafd' }}
                        error={!!errors.degree}
                        helperText={errors.degree}
                    >
                        <MenuItem value="CS">מדעי המחשב</MenuItem>
                    </TextField>

                    {/* הסרנו את ה-div עם ה-textAlign, כי זה אוטומטי עכשיו */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 1, display: 'block' }}>
                            ציון פסיכומטרי (200-800)
                        </Typography>
                        <TextField
                            placeholder="הכנס ציון פסיכומטרי"
                            type="number"
                            name="psychometric"
                            value={formData.psychometric}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{ bgcolor: '#f8fafd' }}
                            error={!!errors.psychometric}
                            helperText={errors.psychometric}
                        />
                    </Box>

                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 1, display: 'block' }}>
                            ממוצע בגרויות (55-120)
                        </Typography>
                        <TextField
                            placeholder="הכנס ממוצע בגרויות"
                            type="number"
                            name="bagrut"
                            value={formData.bagrut}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{ bgcolor: '#f8fafd' }}
                            error={!!errors.bagrut}
                            helperText={errors.bagrut}
                        />
                    </Box>

                    <Button variant="contained" className="calc-button" onClick={calculate}>
                        בדוק התאמה ומלגות
                    </Button>
                </Box>

                {admissionResult && (
                    <Fade in={true}>
                        <Box sx={{ mt: 4 }}>
                            <Divider sx={{ mb: 3 }}>תוצאות הבדיקה</Divider>
                            <Alert
                                severity={admissionResult.color}
                                icon={admissionResult.color === 'success' ? <CheckCircleIcon fontSize="inherit" /> : undefined}
                                sx={{ mb: 2, fontWeight: 'bold' }}
                            >
                                {admissionResult.message}
                            </Alert>

                            {eligibleScholarships.length > 0 && (
                                <Box sx={{ mt: 3, bgcolor: '#e8f5e9', p: 2, borderRadius: 2 }}>
                                    <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <StarsIcon /> נמצאו {eligibleScholarships.length} מלגות רלוונטיות!
                                    </Typography>

                                    <List>
                                        {eligibleScholarships.map((scholarship) => (
                                            <ListItem key={scholarship.id} disableGutters sx={{ borderBottom: '1px solid #c8e6c9' }}>
                                                <ListItemIcon>
                                                    <SchoolIcon color="success" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={scholarship.name}
                                                    secondary={scholarship.description}
                                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                                />
                                                <Chip label={scholarship.amount} color="success" size="small" />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center', color: '#666' }}>
                                        * הזכאות למלגה מותנית בהרשמה ותשלום מקדמה
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Fade>
                )}
            </Paper>
        </div>
    );
};

export default AdmissionCalculator;