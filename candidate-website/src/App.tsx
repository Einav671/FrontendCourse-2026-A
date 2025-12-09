import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";

// ייבוא הדפים שיצרנו
import Home from './pages/Home';
import Management from './pages/Management';
import Forms from './pages/Forms';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main>
        {/* הגדרת נתיב (Route) לכל קומפוננטה חדשה */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/management" element={<Management />} />
          <Route path="/forms" element={<Forms />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App