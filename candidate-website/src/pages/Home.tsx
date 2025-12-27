import React from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SystemAlert } from './alerts/SystemAlert'; 

// ייבוא אייקונים
import CalculateIcon from '@mui/icons-material/Calculate';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  // --- פונקציית הטעינה הראשונית וההתראות ---
  useEffect(() => {
    // 1. טעינת התראות
    const savedAlerts = JSON.parse(localStorage.getItem('system-alerts') || '[]');
    setAlerts(savedAlerts);

    // 2. הפעלת מנגנון אתחול הנתונים (Seeding)
    initializeSystemData();
  }, []);

  // --- לוגיקה ליצירת נתונים ראשוניים אם המערכת ריקה ---
  const initializeSystemData = () => {
    
    // 1. אתחול מלגות (Scholarships)
    if (!localStorage.getItem('scholarships')) {
      const initialScholarships = [
        { id: "1", code: "PRES-700", name: "מלגת מצטייני נשיא", targetAudience: "מצטיינים", amount: 10000, link: "", conditions: "ציון פסיכומטרי מעל 700" },
        { id: "2", code: "BAG-110", name: "מלגת הישגים בבגרות", targetAudience: "תיכון", amount: 5000, link: "", conditions: "ממוצע בגרות מעל 110" },
        { id: "3", code: "TECH-NEW", name: "עידוד טכנולוגי", targetAudience: "נרשמים חדשים", amount: 2000, link: "", conditions: "מענק חד פעמי לנרשמים החודש" },
        { id: "4", code: "PER-IPH", name: "מלגת פריפריה", targetAudience: "תושבי פריפריה", amount: 4000, link: "", conditions: "מגורים ביישוב זכאי מעל 5 שנים" },
        { id: "5", code: "WOM-DEV", name: "נשים בטכנולוגיה", targetAudience: "נשים", amount: 7500, link: "", conditions: "עידוד נשים למקצועות הפיתוח" },
        { id: "6", code: "SOC-ACT", name: "מעורבות חברתית", targetAudience: "מתנדבים", amount: 6000, link: "", conditions: "140 שעות התנדבות בקהילה" },
        { id: "7", code: "MIL-RES", name: "מילואים פעיל", targetAudience: "משרתי מילואים", amount: 3000, link: "", conditions: "הצגת אישור מילואים פעיל שנתי" },
        { id: "8", code: "EXC-YR1", name: "מצטייני שנה א'", targetAudience: "סטודנטים", amount: 4500, link: "", conditions: "ממוצע ציונים מעל 95 בשנה א'" },
        { id: "9", code: "LONE-SOL", name: "חיילים בודדים", targetAudience: "חיילים משוחררים", amount: 8000, link: "", conditions: "תעודת שחרור כחייל בודד" },
        { id: "10", code: "RET-WRK", name: "חזרה למעגל העבודה", targetAudience: "גילאי 40+", amount: 2500, link: "", conditions: "הסבה מקצועית לגילאי 40 פלוס" }
      ];
      localStorage.setItem('scholarships', JSON.stringify(initialScholarships));
      console.log('Scholarships initialized with 10 items');
    }

    // 2. אתחול בוגרים (Graduates)
    if (!localStorage.getItem('graduates')) {
      const initialGraduates = [
        { id: "1", fullName: "דנה כהן", role: "Full Stack Developer", degree: "מדעי המחשב", imageUrl: "", review: "התואר נתן לי כלים מצוינים להשתלבות בתעשייה.", status: "approved" },
        { id: "2", fullName: "רון לוי", role: "DevOps Engineer", degree: "מדעי המחשב", imageUrl: "", review: "מרצים מעולים ויחס אישי.", status: "approved" },
        { id: "3", fullName: "שירן אזולאי", role: "Data Scientist", degree: "מדעי המחשב", imageUrl: "", review: "קורסי ה-AI היו ברמה גבוהה מאוד.", status: "approved" },
        { id: "4", fullName: "עומר פרץ", role: "Cyber Security Analyst", degree: "מדעי המחשב", imageUrl: "", review: "ההתמחות באבטחת מידע פתחה לי דלתות.", status: "approved" },
        { id: "5", fullName: "גלעד יוסף", role: "Product Manager", degree: "מדעי המחשב", imageUrl: "", review: "שילוב מצוין בין טכנולוגיה לניהול.", status: "approved" },
        { id: "6", fullName: "נועה ברק", role: "Frontend Lead", degree: "מדעי המחשב", imageUrl: "", review: "נהניתי מאוד מקורסי ה-Web.", status: "pending" },
        { id: "7", fullName: "איתי גולן", role: "Backend Developer", degree: "מדעי המחשב", imageUrl: "", review: "הבסיס באלגוריתמים עזר לי מאוד בראיונות.", status: "approved" },
        { id: "8", fullName: "מאי דהן", role: "QA Automation", degree: "מדעי המחשב", imageUrl: "", review: "הכנה טובה לעולם הבדיקות האוטומטיות.", status: "approved" },
        { id: "9", fullName: "יוסי אברהם", role: "System Architect", degree: "מדעי המחשב", imageUrl: "", review: "תואר מעמיק ומקצועי.", status: "approved" },
        { id: "10", fullName: "ליאור שחר", role: "Mobile Developer", degree: "מדעי המחשב", imageUrl: "", review: "למדתי לפתח לאנדרואיד ו-iOS.", status: "rejected" }
      ];
      localStorage.setItem('graduates', JSON.stringify(initialGraduates));
      console.log('Graduates initialized with 10 items');
    }

    // 3. אתחול משתמשים (Users)
    if (!localStorage.getItem('users')) {
      const initialUsers = [
        { id: "1", fullName: "מנהל מערכת", email: "admin@college.ac.il", password: "admin", userType: "מנהל מערכת" },
        { id: "2", fullName: "ישראל ישראלי", email: "student@post.com", password: "123", userType: "מועמד" },
        { id: "3", fullName: "שרה אימנו", email: "sarah@post.com", password: "123", userType: "בוגר" },
        { id: "4", fullName: "משה רבנו", email: "moshe@post.com", password: "123", userType: "מועמד" },
        { id: "5", fullName: "דוד המלך", email: "david@post.com", password: "123", userType: "סטודנט" },
        { id: "6", fullName: "שלמה המלך", email: "shlomo@post.com", password: "123", userType: "מנהל מערכת" },
        { id: "7", fullName: "רחל המהנדסת", email: "rachel@post.com", password: "123", userType: "בוגר" },
        { id: "8", fullName: "יעקב אבינו", email: "jacob@post.com", password: "123", userType: "מועמד" },
        { id: "9", fullName: "לאה המפתחת", email: "leah@post.com", password: "123", userType: "בוגר" },
        { id: "10", fullName: "יוסף הצדיק", email: "joseph@post.com", password: "123", userType: "סטודנט" }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      console.log('Users initialized with 10 items');
    }

    // 4. אתחול קורסים (Courses)
    if (!localStorage.getItem('courses')) {
      const initialCourses = [
        { id: "1", code: "CS101", name: "מבוא למדעי המחשב", credits: 5, description: "קורס יסוד בתכנות בשפת פייתון", type: "חובה" },
        { id: "2", code: "MATH201", name: "אלגברה לינארית", credits: 4, description: "מרחבים וקטורים ומטריצות", type: "חובה" },
        { id: "3", code: "CS102", name: "מבני נתונים", credits: 4, description: "עצים, גרפים, רשימות מקושרות", type: "חובה" },
        { id: "4", code: "CS201", name: "אלגוריתמים", credits: 4, description: "ניתוח סיבוכיות ופתרון בעיות", type: "חובה" },
        { id: "5", code: "WEB300", name: "פיתוח צד לקוח", credits: 3, description: "React, HTML, CSS", type: "בחירה" },
        { id: "6", code: "DB400", name: "בסיסי נתונים", credits: 3.5, description: "SQL ו-NoSQL", type: "חובה" },
        { id: "7", code: "OS100", name: "מערכות הפעלה", credits: 4, description: "ניהול זיכרון ותהליכים", type: "חובה" },
        { id: "8", code: "AI500", name: "מבוא לבינה מלאכותית", credits: 3, description: "Machine Learning basics", type: "בחירה" },
        { id: "9", code: "CYB600", name: "אבטחת סייבר", credits: 3, description: "הגנה על רשתות ומערכות", type: "בחירה" },
        { id: "10", code: "NET700", name: "תקשורת מחשבים", credits: 3.5, description: "פרוטוקולים ומודל השכבות", type: "חובה" }
      ];
      localStorage.setItem('courses', JSON.stringify(initialCourses));
      console.log('Courses initialized with 10 items');
    }

    // 5. אתחול מועמדים (Candidates)
    if (!localStorage.getItem('candidates')) {
      const initialCandidates = [
        { id: "1", fullName: "רון ארד", email: "ron@gmail.com", phone: "050-1111111", degree: "מדעי המחשב", status: "חדש" },
        { id: "2", fullName: "גלית שטראוס", email: "galit@gmail.com", phone: "050-2222222", degree: "מערכות מידע", status: "בטיפול" },
        { id: "3", fullName: "דני רופ", email: "dani@gmail.com", phone: "050-3333333", degree: "מדעי המחשב", status: "התקבל" },
        { id: "4", fullName: "אילנית לוי", email: "ilanit@gmail.com", phone: "050-4444444", degree: "מדעי המחשב", status: "נדחה" },
        { id: "5", fullName: "אייל גולן", email: "eyal@gmail.com", phone: "050-5555555", degree: "מדעי המחשב", status: "חדש" },
        { id: "6", fullName: "שרית חדד", email: "sarit@gmail.com", phone: "050-6666666", degree: "מערכות מידע", status: "בטיפול" },
        { id: "7", fullName: "עומר אדם", email: "omer@gmail.com", phone: "050-7777777", degree: "מדעי המחשב", status: "התקבל" },
        { id: "8", fullName: "נועה קירל", email: "noa@gmail.com", phone: "050-8888888", degree: "מדעי המחשב", status: "חדש" },
        { id: "9", fullName: "סטטיק", email: "static@gmail.com", phone: "050-9999999", degree: "מערכות מידע", status: "התקבל" },
        { id: "10", fullName: "בן אל", email: "benel@gmail.com", phone: "050-0000000", degree: "מדעי המחשב", status: "נדחה" }
      ];
      localStorage.setItem('candidates', JSON.stringify(initialCandidates));
      console.log('Candidates initialized with 10 items');
    }
    // 6. אתחול התראות מערכת (System Alerts)
    if (!localStorage.getItem('system-alerts')) {
      const initialAlerts = [
        { id: "1", type: "info", message: "המערכת תושבת לתחזוקה ביום חמישי בין 02:00 ל-04:00" },
        { id: "2", type: "warning", message: "תקופת הרישום לסמסטר ב' מסתיימת בעוד 3 ימים" },
        { id: "3", type: "success", message: "סנכרון נתונים מול משרד החינוך בוצע בהצלחה" },
        { id: "4", type: "info", message: "נוספו 3 מלגות חדשות למאגר המלגות" },
        { id: "5", type: "warning", message: "ישנן 15 פניות מועמדים שממתינות לטיפול מעל 48 שעות" },
        { id: "6", type: "success", message: "גיבוי מערכת יומי הושלם ללא שגיאות" },
        { id: "7", type: "error", message: "נכשל ניסיון שליחת מייל מרוכז לבוגרים (שגיאת שרת SMTP)" },
        { id: "8", type: "info", message: "יום פתוח וירטואלי יתקיים בתאריך 25.12 - נא להיערך" },
        { id: "9", type: "warning", message: "זוהו 5 ניסיונות התחברות כושלים לממשק הניהול" },
        { id: "10", type: "success", message: "עודכנו בהצלחה הסילבוסים של קורסי שנה א'" }
      ];
      localStorage.setItem('system-alerts', JSON.stringify(initialAlerts));
      console.log('System Alerts initialized with 10 items');
    }
  };

  return (
    <Container maxWidth="xl" className="dashboard-container">
      
      {/* כותרת ראשית */}
      <Box className="header-section">
        <Typography variant="h4" component="h1" className="page-title">
          דשבורד ניהול
        </Typography>
        <Typography variant="subtitle1" className="page-subtitle">
          סקירה כללית של הפעילויות במערכת
        </Typography>
      </Box>

      {/* שורה ראשונה */}
      <Grid container spacing={4} sx={{ mb: 10 }}>
        
        {/* כרטיס 1: מחשבון */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/calculator')}
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}>
              <CalculateIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">מחשבוני התאמה</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">לחץ לחישוב חדש</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* כרטיס 2: פניות */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/forms')} 
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#fff3e0', color: '#ef6c00' }}>
              <ChatBubbleOutlineIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">פניות פתוחות</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">תיבת דואר נקייה</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* כרטיס 3: מועמדים */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/candidates')}
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }}>
              <PeopleAltIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">מועמדים חדשים</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">ממתין לרישום</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* שורה שנייה */}
      <Grid container spacing={4} sx={{ mb: 10 }}>
        
        {/* כרטיס 4: מלגות */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/scholarships')}
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#e0f2f1', color: '#00695c' }}>
              <AutorenewIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">סטטוס עדכון מלגות</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', my: 1 }}>מעודכן</Typography>
              <Typography className="card-subtext">לחץ לניהול המלגות</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* כרטיס 5: ניהול בוגרים */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            className="kpi-paper"
            onClick={() => navigate('/graduates')} 
          >
            <Avatar className="icon-avatar" sx={{ bgcolor: '#f3e5f5', color: '#7b1fa2' }}>
              <AssignmentIcon fontSize="large" />
            </Avatar>
            <Box className="card-content">
              <Typography className="card-title">חוות דעת לאישור</Typography>
              <Typography className="card-value">0</Typography>
              <Typography className="card-subtext">לחץ לניהול בוגרים</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* שורה שלישית: רשימות */}
      <Grid container spacing={4}>
        
        {/* התראות מערכת - דינמי */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="alerts-paper">
            <Typography variant="h6" className="section-title">
              התראות מערכת
            </Typography>
            
            <Box className="alerts-list">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <Box key={alert.id} className={`alert-item alert-${alert.type}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {alert.message}
                    {alert.type === 'success' && <CheckCircleOutlineIcon fontSize="small" />}
                  </Box>
                ))
              ) : (
                <Box className="alert-item" style={{color: '#999', textAlign:'center', marginTop: '20px'}}>
                    אין התראות חדשות
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;