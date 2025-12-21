import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
// import Footer from "./components/Footer"; 
import Home from './pages/Home';
import Management from './pages/Management';
import Forms from './pages/Forms';
import Help from './pages/Help';

// --- קורסים ---
import CourseForm from './pages/courses/CourseForm';

// --- מועמדים ---
import CandidatesManagement from './pages/candidates/CandidatesManagement';
import CandidateForm from './pages/candidates/CandidateForm';

// --- מחשבון ---
import AdmissionCalculator from './pages/calculator/AdmissionCalculator';

// --- מלגות (Scholarships) ---
import ScholarshipsManagement from './pages/scholarships/ScholarshipsManagement';
import ScholarshipForm from './pages/scholarships/ScholarshipForm';

// --- בוגרים (Graduates) - החזרנו את זה! ---
import GraduatesManagement from './pages/graduates/GraduatesManagement';
import GraduateForm from './pages/graduates/GraduateForm';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          {/* --- דפים כלליים --- */}
          <Route path="/" element={<Home />} />
          <Route path="/management" element={<Management />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/help" element={<Help />} />
          
          {/* --- מחשבון --- */}
          <Route path="/calculator" element={<AdmissionCalculator />} />

          {/* --- קורסים --- */}
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/edit/:id" element={<CourseForm />} />
          
          {/* --- מועמדים --- */}
          <Route path="/candidates" element={<CandidatesManagement />} />
          <Route path="/candidates/new" element={<CandidateForm />} />
          <Route path="/candidates/edit/:id" element={<CandidateForm />} />

          {/* ------------------------------------------------------- */}
          {/* --- נתיבים למלגות --- */}
          {/* ------------------------------------------------------- */}
          <Route path="/scholarships" element={<ScholarshipsManagement />} />
          <Route path="/scholarships/new" element={<ScholarshipForm />} />
          <Route path="/scholarships/edit/:id" element={<ScholarshipForm />} />

          {/* ------------------------------------------------------- */}
          {/* --- נתיבים לבוגרים (החזרנו את זה!) --- */}
          {/* ------------------------------------------------------- */}
          <Route path="/graduates" element={<GraduatesManagement />} />
          <Route path="/graduates/new" element={<GraduateForm />} />
          <Route path="/graduates/edit/:id" element={<GraduateForm />} />

        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;