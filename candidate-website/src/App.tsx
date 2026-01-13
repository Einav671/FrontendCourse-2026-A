import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import PageLoader from './components/PageLoader';
import './App.css';
// --- דפים כלליים ---
const Home = lazy(() => import('./pages/home/Home'));
const Management = lazy(() => import('./pages/courses/coursesTable/Management'));
const Forms = lazy(() => import('./pages/leads/Forms'));
const Help = lazy(() => import('./pages/help/Help'));

// --- קורסים ---
const CourseForm = lazy(() => import('./pages/courses/courseForm/CourseForm'));

// --- מועמדים ---
const CandidatesManagement = lazy(() => import('./pages/candidates/CandidatesManagement/CandidatesManagement'));
const CandidateForm = lazy(() => import('./pages/candidates/CandidateForm/CandidateForm'));

// --- מחשבון ---
const AdmissionCalculator = lazy(() => import('./pages/calculator/AdmissionCalculator'));

// --- מלגות (Scholarships) ---
const ScholarshipsManagement = lazy(() => import('./pages/scholarships/ScholarshipsManagement/ScholarshipsManagement'));
const ScholarshipForm = lazy(() => import('./pages/scholarships/ScholarshipForm/ScholarshipForm'));

// --- בוגרים (Graduates) ---
const GraduatesManagement = lazy(() => import('./pages/graduates/GraduatesManagement/GraduatesManagement'));
const GraduateForm = lazy(() => import('./pages/graduates/GraduateForm/GraduateForm'));

// --- מסלולי התמחות ---
const InternshipsManagement = lazy(() => import('./pages/internship/internshipsManagement/InternshipsManagement'));
const InternshipForm = lazy(() => import('./pages/internship/internshipForm/InternshipForm'));

// --- משתמשים ---
const UsersManagement = lazy(() => import('./pages/users/usersManagement/UsersManagement'));
const UserForm = lazy(() => import('./pages/users/usersForm/UsersForm'));

// --- התראות מערכת ---
const AlertsManagement = lazy(() => import('./pages/alerts/AlertsManagement/AlertsManagement'));
const AlertForm = lazy(() => import('./pages/alerts/AlertForm/AlertForm'));


function App() {
  return (
    <div className="app-container">
      <Header /> {/* Header נשאר מחוץ ל-Suspense כדי שיופיע תמיד */}

      <main>
        {/* 4. עטיפת הנתיבים ב-Suspense */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* --- דפים כלליים --- */}
            <Route path="/" element={<Home />} />
            <Route path="/management" element={<Management />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/help" element={<Help />} />

            {/* --- ניהול משתמשים --- */}
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />

            {/* --- מחשבון --- */}
            <Route path="/calculator" element={<AdmissionCalculator />} />

            {/* --- קורסים --- */}
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses/edit/:id" element={<CourseForm />} />

            {/* --- מועמדים --- */}
            <Route path="/candidates" element={<CandidatesManagement />} />
            <Route path="/candidates/new" element={<CandidateForm />} />
            <Route path="/candidates/edit/:id" element={<CandidateForm />} />

            {/* --- מלגות --- */}
            <Route path="/scholarships" element={<ScholarshipsManagement />} />
            <Route path="/scholarships/new" element={<ScholarshipForm />} />
            <Route path="/scholarships/edit/:id" element={<ScholarshipForm />} />

            {/* --- מסלולי התמחות --- */}
            <Route path="/internships" element={<InternshipsManagement />} />
            <Route path="/internships/new" element={<InternshipForm />} />
            <Route path="/internships/edit/:id" element={<InternshipForm />} />

            {/* --- בוגרים --- */}
            <Route path="/graduates" element={<GraduatesManagement />} />
            <Route path="/graduates/new" element={<GraduateForm />} />
            <Route path="/graduates/edit/:id" element={<GraduateForm />} />

            {/* --- התראות מערכת --- */}
            <Route path="/alerts" element={<AlertsManagement />} />
            <Route path="/alerts/new" element={<AlertForm />} />
            <Route path="/alerts/edit/:id" element={<AlertForm />} />

          </Routes>
        </Suspense>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;