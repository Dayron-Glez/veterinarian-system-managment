
import './App.css'
import { Routes, Route } from "react-router-dom";
import ReceptionComponent from './components/ReceptionComponent';
import LoginComponent from './components/LoginComponent';
import DoctorComponent from './components/DoctorComponent';
function App() {


  return (
    <>
        <Routes>
          <Route path="/" element={<LoginComponent/>} />
          <Route path="/ReceptionComponent" element={<ReceptionComponent/>} />
          <Route path="/DoctorComponent" element={<DoctorComponent/>} />
        </Routes>
    </>
  )
}

export default App
