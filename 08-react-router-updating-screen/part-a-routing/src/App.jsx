import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '30px auto' }}>
      <Navbar />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
