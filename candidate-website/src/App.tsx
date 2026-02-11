import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import PageLoader from './components/PageLoader';
import DesktopOnly from './components/DesktopOnly';
import './App.css';
import LoginForm from './pages/login/loginForm';

// --- דפים ציבוריים ---
const UserHome = lazy(() => import('./pages/home/UserHome'));
const HelpCenter = lazy(() => import('./pages/help/HelpCenter'));
const PublicCourses = lazy(() => import('./pages/courses/PublicCourses'));
const SpecializationTracks = lazy(() => import('./pages/internship/SpecializationTracks'));
const PublicScholarships = lazy(() => import('./pages/scholarships/PublicScholarships'));
// הוספנו את דף הבוגרים הציבורי
const PublicGraduates = lazy(() => import('./pages/graduates/PublicGraduates'));

// --- דפי ניהול ---
const AdminDashboard = lazy(() => import('./pages/home/AdminDashboard'));
const Management = lazy(() => import('./pages/courses/coursesTable/Management'));
const Forms = lazy(() => import('./pages/leads/Forms'));
const LeadsManagement = lazy(() => import('./pages/leads/LeadsManagement/LeadsManagement'));

const CourseForm = lazy(() => import('./pages/courses/courseForm/CourseForm'));
const CandidatesManagement = lazy(() => import('./pages/candidates/CandidatesManagement/CandidatesManagement'));
const CandidateForm = lazy(() => import('./pages/candidates/CandidateForm/CandidateForm'));
const AdmissionCalculator = lazy(() => import('./pages/calculator/AdmissionCalculator'));
const ScholarshipsManagement = lazy(() => import('./pages/scholarships/ScholarshipsManagement/ScholarshipsManagement'));
const ScholarshipForm = lazy(() => import('./pages/scholarships/ScholarshipForm/ScholarshipForm'));
const GraduatesManagement = lazy(() => import('./pages/graduates/GraduatesManagement/GraduatesManagement'));
const GraduateForm = lazy(() => import('./pages/graduates/GraduateForm/GraduateForm'));
const InternshipsManagement = lazy(() => import('./pages/internship/internshipsManagement/InternshipsManagement'));
const InternshipForm = lazy(() => import('./pages/internship/internshipForm/InternshipForm'));
const UsersManagement = lazy(() => import('./pages/users/usersManagement/UsersManagement'));
const UserForm = lazy(() => import('./pages/users/usersForm/UsersForm'));
const AlertsManagement = lazy(() => import('./pages/alerts/AlertsManagement/AlertsManagement'));
const AlertForm = lazy(() => import('./pages/alerts/AlertForm/AlertForm'));

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* דפים ציבוריים */}
            <Route path="/" element={<UserHome />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/calculator" element={<AdmissionCalculator />} />
            <Route path="/courses-info" element={<PublicCourses />} />
            <Route path="/tracks" element={<SpecializationTracks />} />
            <Route path="/scholarships-info" element={<PublicScholarships />} />
            {/* נתיב חדש לבוגרים ציבורי */}
            <Route path="/graduates-info" element={<PublicGraduates />} />

            <Route path="/login" element={<DesktopOnly><LoginForm /></DesktopOnly>} />

            {/* ניהול */}
            <Route path="/admin" element={<DesktopOnly><AdminDashboard /></DesktopOnly>} />
            <Route path="/management" element={<DesktopOnly><Management /></DesktopOnly>} />
            <Route path="/forms" element={<DesktopOnly><Forms /></DesktopOnly>} />
            <Route path="/leads" element={<DesktopOnly><LeadsManagement /></DesktopOnly>} />
            <Route path="/users" element={<DesktopOnly><UsersManagement /></DesktopOnly>} />
            <Route path="/users/new" element={<DesktopOnly><UserForm /></DesktopOnly>} />
            <Route path="/users/edit/:id" element={<DesktopOnly><UserForm /></DesktopOnly>} />
            <Route path="/courses/new" element={<DesktopOnly><CourseForm /></DesktopOnly>} />
            <Route path="/courses/edit/:id" element={<DesktopOnly><CourseForm /></DesktopOnly>} />
            <Route path="/candidates" element={<DesktopOnly><CandidatesManagement /></DesktopOnly>} />
            <Route path="/candidates/new" element={<DesktopOnly><CandidateForm /></DesktopOnly>} />
            <Route path="/candidates/edit/:id" element={<DesktopOnly><CandidateForm /></DesktopOnly>} />
            <Route path="/scholarships" element={<DesktopOnly><ScholarshipsManagement /></DesktopOnly>} />
            <Route path="/scholarships/new" element={<DesktopOnly><ScholarshipForm /></DesktopOnly>} />
            <Route path="/scholarships/edit/:id" element={<DesktopOnly><ScholarshipForm /></DesktopOnly>} />
            <Route path="/internships" element={<DesktopOnly><InternshipsManagement /></DesktopOnly>} />
            <Route path="/internships/new" element={<DesktopOnly><InternshipForm /></DesktopOnly>} />
            <Route path="/internships/edit/:id" element={<DesktopOnly><InternshipForm /></DesktopOnly>} />
            <Route path="/graduates" element={<DesktopOnly><GraduatesManagement /></DesktopOnly>} />
            <Route path="/graduates/new" element={<DesktopOnly><GraduateForm /></DesktopOnly>} />
            <Route path="/graduates/edit/:id" element={<DesktopOnly><GraduateForm /></DesktopOnly>} />
            <Route path="/alerts" element={<DesktopOnly><AlertsManagement /></DesktopOnly>} />
            <Route path="/alerts/new" element={<DesktopOnly><AlertForm /></DesktopOnly>} />
            <Route path="/alerts/edit/:id" element={<DesktopOnly><AlertForm /></DesktopOnly>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;