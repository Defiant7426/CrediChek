import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chatcita from './components/Chatcita';
import Perfil from './components/Perfil';
import Informacion from './components/Informacion';
import Cardiologia from './components/Cardiologia';
import TermsAndConditions from './components/TermsAndConditions';
import ContactUs from './components/ContactUs';
import Creadores from './components/Creadores'; 
import CitasPendientes from './components/CitasPendientes';
import HistorialCitas from './components/HistorialCitas';
import Dermatologia from './components/Dermatologia';
import Pediatria from './components/Pediatria';
import AsitenciaMedicamentos from './components/AsitenciaMedicamentos';
import CuestionarioCita from './components/CuestionarioCita';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import ResumenConsultas from './components/ResumenConsultas';


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirige a login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatcita" element={<Chatcita />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/cardiologia" element={<Cardiologia />} />
        <Route path="/terminos" element={<TermsAndConditions />} />
        <Route path="/contacto" element={<ContactUs />} />
        <Route path="/creadores" element={<Creadores />} />

        <Route path="/pediatria" element={<Pediatria />} />
        <Route path="/dermatologia" element={<Dermatologia />} />
        <Route path="/citasPendientes" element={<CitasPendientes />} />
        <Route path="/historialCitas" element={<HistorialCitas />} />
        <Route path="/chatImagen" element={<AsitenciaMedicamentos />} />
        <Route path="/cuestionarCita" element={<CuestionarioCita />} />
        <Route path="/preguntasFrecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/resumenConsultas" element={<ResumenConsultas />} />

      </Routes>
    </Router>
  )
}

export default App
