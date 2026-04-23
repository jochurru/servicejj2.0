import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Ventas from "./pages/Ventas.jsx";
import ServicioTecnico from "./pages/ServicioTecnico.jsx";
import Climatizacion from "./pages/Climatizacion.jsx"; 
import Footer from "./components/layout/Footer.jsx";
import Terminos from "./pages/Terminos.jsx";
import Privacidad from "./pages/Privacidad.jsx";
import WapButton from "./components/common/WapButton.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import ScrollToTopButton from "./components/common/ScrollToTopButton.jsx";
import TecnicoOnline from "./pages/TecnicoOnline.jsx";
import Login from "./components/common/Login.jsx";
import MisPedidos from "./pages/MisPedidos.jsx";
import Seguimiento from "./pages/Seguimiento.jsx"; 
import AdminWizard from "./pages/AdminWizard.jsx"; 

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="grow pt-20 md:pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} />
            
            {/* 📍 RUTA CLAVE: Seguimiento público (Para el buscador del Home y QR) */}
            <Route path="/seguimiento/:idCorto" element={<Seguimiento />} />
            
            {/* 🛠️ RUTA DE ADMIN: Administrador de taller */}
            <Route path="/admin-wizard" element={<AdminWizard />} />

            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/servicio-tecnico" element={<ServicioTecnico />} />
            <Route path="/climatizacion" element={<Climatizacion />} />  
            <Route path="/tecnico-online" element={<TecnicoOnline />} />           
          </Routes>
        </main>
        <Footer />
        <WapButton />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;