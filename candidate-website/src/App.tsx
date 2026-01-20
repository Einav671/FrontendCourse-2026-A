import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import PageLoader from './components/PageLoader';
import DesktopOnly from './components/DesktopOnly';
import './App.css';
import LoginForm from './pages/login/loginForm';

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
      <Header /> 

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* --- דפים כלליים --- */}
            <Route path="/" element={<Home />} />
            
            {/* --- ניהול --- */}
            <Route path="/login" element={
              <DesktopOnly>
                <LoginForm />
              </DesktopOnly>
            } />
            <Route path="/management" element={
              <DesktopOnly>
                <Management />
              </DesktopOnly>
            } />
            
            <Route path="/forms" element={<Forms />} />
            <Route path="/help" element={<Help />} />

            {/* --- ניהול משתמשים --- */}
            <Route path="/users" element={
              <DesktopOnly>
                <UsersManagement />
              </DesktopOnly>
            } />
            <Route path="/users/new" element={
              <DesktopOnly>
                <UserForm />
              </DesktopOnly>
            } />
            <Route path="/users/edit/:id" element={
              <DesktopOnly>
                <UserForm />
              </DesktopOnly>
            } />

            {/* --- מחשבון --- */}
            <Route path="/calculator" element={<AdmissionCalculator />} />

            {/* --- קורסים (הוספתי חסימה) --- */}
            <Route path="/courses/new" element={
              <DesktopOnly>
                <CourseForm />
              </DesktopOnly>
            } />
            <Route path="/courses/edit/:id" element={
              <DesktopOnly>
                <CourseForm />
              </DesktopOnly>
            } />

            {/* --- מועמדים --- */}
            <Route path="/candidates" element={
              <DesktopOnly>
                <CandidatesManagement />
              </DesktopOnly>
            } />
            <Route path="/candidates/new" element={
              <DesktopOnly>
                <CandidateForm />
              </DesktopOnly>
            } />
            <Route path="/candidates/edit/:id" element={
              <DesktopOnly>
                <CandidateForm />
              </DesktopOnly>
            } />

            {/* --- מלגות --- */}
            <Route path="/scholarships" element={
              <DesktopOnly>
                <ScholarshipsManagement />
              </DesktopOnly>
            } />
            <Route path="/scholarships/new" element={
              <DesktopOnly>
                <ScholarshipForm />
              </DesktopOnly>
            } />
            <Route path="/scholarships/edit/:id" element={
              <DesktopOnly>
                <ScholarshipForm />
              </DesktopOnly>
            } />

            {/* --- מסלולי התמחות (הוספתי חסימה) --- */}
            <Route path="/internships" element={
              <DesktopOnly>
                <InternshipsManagement />
              </DesktopOnly>
            } />
            <Route path="/internships/new" element={
              <DesktopOnly>
                <InternshipForm />
              </DesktopOnly>
            } />
            <Route path="/internships/edit/:id" element={
              <DesktopOnly>
                <InternshipForm />
              </DesktopOnly>
            } />

            {/* --- בוגרים --- */}
            <Route path="/graduates" element={
              <DesktopOnly>
                <GraduatesManagement />
              </DesktopOnly>
            } />
            <Route path="/graduates/new" element={
              <DesktopOnly>
                <GraduateForm />
              </DesktopOnly>
            } />
            <Route path="/graduates/edit/:id" element={
              <DesktopOnly>
                <GraduateForm />
              </DesktopOnly>
            } />

            {/* --- התראות מערכת --- */}
            <Route path="/alerts" element={
              <DesktopOnly>
                <AlertsManagement />
              </DesktopOnly>
            } />
            <Route path="/alerts/new" element={
              <DesktopOnly>
                <AlertForm />
              </DesktopOnly>
            } />
            <Route path="/alerts/edit/:id" element={
              <DesktopOnly>
                <AlertForm />
              </DesktopOnly>
            } />
            
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;