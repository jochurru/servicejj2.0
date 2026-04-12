import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, AirVent, ShoppingBag, Menu, X } from 'lucide-react';
import logojj from '../../assets/Logo.webp';

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const closeMenu = () => setIsOpen(false);

return (
<nav className="fixed top-0 w-full bg-white border-b-4 border-black z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 h-24 flex items-center">
    
    {/* 1. AREA LOGO (Empuja al centro) */}
    <div className="flex-1 flex justify-start">
        <Link 
            to="/" 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
            className="flex items-center gap-3 group"
        >
            <img 
                src={logojj} 
                alt="Service JJ Logo" 
                className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col leading-none">
                <span className="font-newtown text-2xl md:text-3xl italic uppercase tracking-tighter text-black">
                    SERVICE <span className="text-black">JJ</span>
                </span>
                <span className="font-sans font-medium text-gray-500 uppercase text-[9px] tracking-widest -mt-1">
                    Ventas y Servicios Integrales
                </span>
            </div>
        </Link>
    </div>

    {/* 2. LINKS AL CENTRO (Solo escritorio) */}
    <div className="hidden md:flex items-center justify-center gap-8">
        <Link to="/ventas" className="font-newtown italic uppercase text-lg flex items-center gap-2 text-black hover:text-emerald-500 transition-colors">
            <ShoppingBag size={20} className="not-italic" /> <span>Ventas</span>
        </Link>
        <Link to="/servicio-tecnico" className="font-newtown italic uppercase text-lg flex items-center gap-2 text-black hover:text-blue-600 transition-colors">
            <Hammer size={20} className="not-italic" /> <span>Servicio Técnico</span>
        </Link>
        <Link to="/climatizacion" className="font-newtown italic uppercase text-lg flex items-center gap-2 text-black hover:text-orange-500 transition-colors">
            <AirVent size={20} className="not-italic" /> <span>Climatización</span>
        </Link>
    </div>

    {/* 3. AREA CONTACTO (Empuja al centro) */}
    <div className="flex-1 flex justify-end items-center gap-4">
        <a href="#contacto-seccion" className="hidden md:inline-block font-newtown italic uppercase bg-black text-white px-6 py-2 border-b-4 border-gray-600 hover:border-blue-500 active:border-b-0 active:translate-y-1 transition-all">
            Contacto
        </a>

        {/* BOTÓN HAMBURGUESA */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black p-2 focus:outline-none"
        >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
    </div>
    </div>

    {/* MENÚ MÓVIL (Tu código original) */}
    <div className={`md:hidden bg-white border-b-4 border-black transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
    <div className="flex flex-col p-6 gap-6">
        <Link to="/ventas" onClick={closeMenu} className="font-newtown italic uppercase text-2xl flex items-center gap-4 text-black">
        <ShoppingBag size={24} className="text-emerald-500" /> Ventas
        </Link>
        <Link to="/servicio-tecnico" onClick={closeMenu} className="font-newtown italic uppercase text-2xl flex items-center gap-4 text-black">
        <Hammer size={24} className="text-blue-600" /> Servicio Técnico
        </Link>
        <Link to="/climatizacion" onClick={closeMenu} className="font-newtown italic uppercase text-2xl flex items-center gap-4 text-black">
        <AirVent size={24} className="text-orange-500" /> Climatización
        </Link>
        <a 
        href="#contacto-seccion" 
        onClick={closeMenu}
        className="font-newtown italic uppercase bg-black text-white text-center py-4 text-xl border-b-4 border-gray-600"
        >
        Contacto
        </a>
    </div>
    </div>
</nav>
);
};

export default Navbar;