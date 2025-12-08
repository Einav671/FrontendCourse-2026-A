import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ייבוא הרכיבים הקבועים (האדר ופוטר)
// שים לב: אם בקובץ Header.tsx עשית export default, תוריד את הסוגריים המסולסלים {}
import Header from "./components/Header"; 
import Footer from "./components/Footer";

// ייבוא הדפים מהתיקייה החדשה שיצרת
import Home from './pages/Home';
import Management from './pages/Management';
import Forms from './pages/Forms';

// ייבוא הפונטים (נשאר כמו במקור)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'; // אם יש לך קובץ עיצוב כללי

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* ה-Header מופיע תמיד */}
        <Header />
        
        <main>
          {/* כאן התוכן מתחלף לפי הכתובת ב-URL */}
          <Routes>
            {/* דף הבית */}
            <Route path="/" element={<Home />} />
            
            {/* דף הניהול (שמכיל בתוכו את CoursesTable) */}
            <Route path="/management" element={<Management />} />
            
            {/* דף הטפסים */}
            <Route path="/forms" element={<Forms />} />
          </Routes>
        </main>

        {/* ה-Footer מופיע תמיד */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;