import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
// import Footer from "./components/Footer"; 
import Home from './pages/Home';
import Management from './pages/Management';
import Forms from './pages/Forms';
import Help from './pages/Help';

// --- קורסים ---
import CourseForm from './pages/courses/CourseForm';

// --- מועמדים (חדש!) ---
import CandidatesManagement from './pages/candidates/CandidatesManagement';
import CandidateForm from './pages/candidates/CandidateForm';

// --- מחשבון (חדש!) ---
import AdmissionCalculator from './pages/calculator/AdmissionCalculator';

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

          {/* --- קורסים (יצירה ועריכה) --- */}
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/edit/:id" element={<CourseForm />} />
          
          {/* --- מועמדים (רשימה, יצירה ועריכה) --- */}
          <Route path="/candidates" element={<CandidatesManagement />} />
          <Route path="/candidates/new" element={<CandidateForm />} />
          <Route path="/candidates/edit/:id" element={<CandidateForm />} />

        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;