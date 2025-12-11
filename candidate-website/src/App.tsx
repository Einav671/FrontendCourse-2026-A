import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
// import Footer from "./components/Footer"; // נשאיר בהערה אם עדיין אין לכם פוטר
import Home from './pages/Home';
import Management from './pages/Management';
import Forms from './pages/Forms';
import Help from './pages/Help';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/management" element={<Management />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;