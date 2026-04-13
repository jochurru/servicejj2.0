import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx"; // <--- Importante verificar esta ruta
import Home from "./pages/Home.jsx";
import Ventas from "./pages/Ventas.jsx";
import ServicioTecnico from "./pages/ServicioTecnico.jsx";
import Climatizacion from "./pages/Climatizacion.jsx"; 
import Footer from "./components/layout/Footer.jsx";
import Terminos from "./pages/Terminos.jsx";
import Privacidad from "./pages/Privacidad.jsx";
import WapButton from "./components/common/WapButton.jsx"; // Botón de WhatsApp
import ScrollToTop from "./components/common/ScrollToTop.jsx"; // Componente para scroll automático
import ScrollToTopButton from "./components/common/ScrollToTopButton.jsx"; // Botón para volver arriba
import TecnicoOnline from "./pages/TecnicoOnline.jsx"; // Nueva página para diagnóstico remoto
import Login from "./components/common/Login.jsx";
import MisPedidos from "./pages/MisPedidos.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Asegura que cada cambio de ruta inicie en la parte superior */}
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="grow pt-20 md:pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> {/* Ruta para la página de login */}
            <Route path="/mis-pedidos" element={<MisPedidos />} /> {/* Ruta para la página de mis pedidos */}
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/servicio-tecnico" element={<ServicioTecnico />} />
            <Route path="/climatizacion" element={<Climatizacion />} />  
            <Route path="/tecnico-online" element={<TecnicoOnline />} /> {/* Nueva ruta para diagnóstico remoto */}           
          </Routes>
        </main>
        <Footer />
        <WapButton /> {/* Botón de WhatsApp siempre visible */}
        <ScrollToTopButton /> {/* Botón para volver arriba */}
      </div>
    </Router>
  );
}

export default App;   