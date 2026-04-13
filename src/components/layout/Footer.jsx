import { Link } from 'react-router-dom';
// Iconos de utilidad (Lucide)
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
// Iconos de marca (React Icons - Font Awesome)
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";

const Footer = () => {
const user = useAuth().user; // Para mostrar enlace "Mis Reparaciones" solo si hay usuario
const currentYear = new Date().getFullYear();


return (
<footer className="bg-slate-900 text-white pt-16 pb-8 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
    
    {/* COLUMNA 1: MARCA Y REDES */}
    <div className="flex flex-col gap-4">
        <h2 className="font-newtown text-3xl italic uppercase leading-none">
        Service <span className="text-blue-500">JJ</span>   
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
        Especialistas en climatización y servicio técnico integral. 
        Soluciones rápidas con garantía escrita en Villa Crespo y CABA.
        </p>
        
        {/* BOTONES DE REDES SOCIALES */}
        <div className="flex gap-3 mt-2">
        <a 
            href="https://www.instagram.com/servicejj.ok/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center"
            title="Instagram"
        >
            <FaInstagram size={18} />
        </a>
        <a 
            href="https://www.facebook.com/p/SERVICE-JJ-100063529391770/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
            title="Facebook"
        >
            <FaFacebookF size={18} />
        </a>
        </div>
    </div>

{/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
<div>
    <h3 className="font-newtown text-lg italic uppercase mb-6 text-blue-500 tracking-tight">Secciones</h3>
    <ul className="flex flex-col gap-3 text-slate-300 text-sm">
        <li>
            <Link 
                to="/" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="hover:text-white transition-colors"
            >
                Inicio
            </Link>
        </li>
        <li><Link to="/ventas" className="hover:text-white transition-colors">Ventas</Link></li>
        <li><Link to="/servicio-tecnico" className="hover:text-white transition-colors">Servicio Técnico</Link></li>
        <li><Link to="/climatizacion" className="hover:text-white transition-colors">Climatización</Link></li>
        
        {/* ✨ SOLO SE MUESTRA SI HAY USUARIO */}
        {user && (
            <li>
                <Link 
                    to="/mis-pedidos" 
                    className="hover:text-white transition-colors italic text-blue-400 font-medium"
                >
                    Mis Reparaciones
                </Link>
            </li>
        )}
    </ul>
</div>

    {/* COLUMNA 3: CONTACTO DIRECTO */}
    <div>
        <h3 className="font-newtown text-lg italic uppercase mb-6 text-blue-500 tracking-tight">Contacto</h3>
        <ul className="flex flex-col gap-4 text-slate-300 text-sm">
        <li className="flex items-start gap-3">
            <Phone size={16} className="text-blue-500 mt-1" /> 
            <div className="flex flex-col">
            <a href="tel:5491151765077" className="hover:text-white transition-colors">11 5176-5077</a>
            <a href="tel:5491151765098" className="hover:text-white transition-colors">11 5176-5098</a> 
            </div>
        </li>
        <li className="flex items-center gap-3">
            <Mail size={16} className="text-blue-500" /> 
            <a href="mailto:servicejjok@gmail.com" className="hover:text-white transition-colors italic text-xs">
            servicejjok@gmail.com
            </a>
        </li>
        <li className="flex items-start gap-3">
            <MapPin size={16} className="text-blue-500 mt-1" /> 
            <a 
            href="https://maps.app.goo.gl/WGSrYMUHPNFZjP358" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors leading-tight"
            >
            Av. Ángel Gallardo 1049, <br />
            Villa Crespo, CABA
            </a>
        </li>
        </ul>
    </div>

    {/* COLUMNA 4: LEGAL / CONFIANZA */}
    <div>
        <h3 className="font-newtown text-lg italic uppercase mb-6 text-blue-500 tracking-tight">Legal</h3>
        <ul className="flex flex-col gap-3 text-slate-300 text-sm">
        <li>
            <Link to="/privacidad" className="flex items-center gap-2 hover:text-white transition-colors">
            <ShieldCheck size={14} /> Política de Privacidad
            </Link>
        </li>
        <li><Link to="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
        <li className="mt-4 border-t border-slate-800 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Matrícula Profesional: #115176
            </span>
        </li>
        </ul>
    </div>
    </div>

    {/* BARRA INFERIOR DE CRÉDITOS */}
    <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 uppercase tracking-widest font-medium">
    <p>© {currentYear} Service JJ - Todos los derechos reservados.</p>
    <p>Desarrollado por <span className="text-slate-300 italic">Jonatan Churruarin</span></p>
    </div>
</footer>
);
};

export default Footer;