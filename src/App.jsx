
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReceptionPage from './pages/ReceptionPage';
import LoginPage from './pages/LoginPage';
import EcopPage from './pages/EcopPage';
import TreatmentPage from './pages/TreatmentPage';
import HistoriaPage from './pages/HistoriaPage';
import DoctorPage from './pages/DoctorPage';
import { AnimatePresence } from 'framer-motion';
function App() {


  return (
    <>
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/ReceptionPage" element={<ReceptionPage />} />
          <Route path='/EcopPage' element={<EcopPage />} />
          <Route path='/DoctorPage' element={<DoctorPage />} />
          <Route path="/TreatmentPage" element={<TreatmentPage />} />
          <Route path="/detalleHistoria" element={<HistoriaPage />} /> 
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
    </>
  )
}

export default App
