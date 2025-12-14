import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
// import Footer from "./components/Footer"; 
import Home from './pages/Home';
import Management from './pages/Management';
import Forms from './pages/Forms';
import Help from './pages/Help';

// --- הייבוא החדש (ודא שהנתיב תואם לאיפה שיצרת את הקובץ) ---
import CourseForm from './pages/courses/CourseForm';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          {/* הנתיבים הקיימים שעובדים */}
          <Route path="/" element={<Home />} />
          <Route path="/management" element={<Management />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/help" element={<Help />} />

          {/* --- נתיבים חדשים לניהול קורסים (יצירה ועריכה) --- */}
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/edit/:id" element={<CourseForm />} />
          
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;