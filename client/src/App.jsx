import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Quality from './pages/Quality'
import Financial from './pages/Financial'
import SGSST from './pages/SGSST'
import Contact from './pages/Contact'
import WorkWithUs from './pages/WorkWithUs'
import PQRS from './pages/PQRS'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/calidad" element={<Quality />} />
            <Route path="/financiero" element={<Financial />} />
            <Route path="/sgsst" element={<SGSST />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/trabaja" element={<WorkWithUs />} />
            <Route path="/pqrs" element={<PQRS />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
