import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, AirVent, ShoppingBag, Menu, X, UserCircle, LogOut } from 'lucide-react'; // Agregamos LogOut
import logojj from '../../assets/Logo.webp';
import { useAuth } from "../../hooks/useAuth"; // 1. IMPORTAMOS EL HOOK

const Navbar = () => {
const { user, logout } = useAuth(); // 2. CONSUMIMOS EL USUARIO Y LOGOUT
const [isOpen, setIsOpen] = useState(false);
const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

const closeMenu = () => setIsOpen(false);

useEffect(() => {
const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) { 
    setIsVisible(false);
    } else {
    setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
};
window.addEventListener('scroll', controlNavbar);
return () => window.removeEventListener('scroll', controlNavbar);
}, [lastScrollY]);

return (
<nav className={`fixed top-0 w-full bg-white border-b-4 border-black z-50 shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
    <div className="max-w-7xl mx-auto px-4 h-24 flex items-center">
    
    {/* 1. AREA LOGO */}
    <div className="flex-1 flex justify-start">
        <Link 
        to="/" 
        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
        className="flex items-center gap-3 group"
        >
        <img src={logojj} alt="Service JJ Logo" className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105" />
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

    {/* 2. LINKS AL CENTRO */}
    <div className="hidden md:flex items-center justify-center gap-8">
        <Link to="/ventas" className="font-newtown italic uppercase text-lg flex items-center gap-2 text-black hover:text-emerald-500 transition-colors">
        <ShoppingBag size={20} /> <span>Ventas</span>
        </Link>
        <Link to="/servicio-tecnico" className="font-newtown italic uppercase text-lg flex items-center gap-2 text-black hover:text-blue-600 transition-colors">
        <Hammer size={20} /> <span>Servicio Técnico</span>
        </Link>
        <Link to="/climatizacion" className="font-newtown italic uppercase text-lg flex items-center gap-2 text-black hover:text-orange-500 transition-colors">
        <AirVent size={20} /> <span>Climatización</span>
        </Link>
    </div>

    {/* 3. AREA CONTACTO Y LOGIN DINÁMICO */}
    <div className="flex-1 flex justify-end items-center gap-3">
        
        {/* LÓGICA DE USUARIO */}
        {user ? (
        <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end">
            <span className="font-newtown italic text-sm text-black">Hola,</span>
            <span className="font-newtown italic text-lg uppercase text-blue-600 leading-none">
                {user.displayName?.split(' ')[0]}
            </span>
            </div>
            <button 
            onClick={logout}
            className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
            title="Cerrar Sesión"
            >
            <LogOut size={20} />
            </button>
        </div>
        ) : (
        <Link 
            to="/login" 
            className="hidden md:flex font-newtown italic uppercase items-center gap-2 border-2 border-black px-4 py-2 hover:bg-slate-100 transition-all text-black"
        >
            <UserCircle size={20} />
            <span>Ingresar</span>
        </Link>
        )}

        <a href="#contacto-seccion" className="hidden md:inline-block font-newtown italic uppercase bg-black text-white px-6 py-2 border-b-4 border-gray-600 hover:border-blue-500 active:border-b-0 active:translate-y-1 transition-all">
        Contacto
        </a>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black p-2">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
    </div>
    </div>

    {/* MENÚ MÓVIL DINÁMICO */}
    <div className={`md:hidden bg-white border-b-4 border-black transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
    <div className="flex flex-col p-6 gap-6">
        
        {user ? (
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
            <span className="font-newtown italic uppercase text-2xl text-blue-600">
            Hola, {user.displayName?.split(' ')[0]}
            </span>
            <button onClick={logout} className="flex items-center gap-2 text-red-500 font-bold">
            SALIR <LogOut size={20} />
            </button>
        </div>
        ) : (
        <Link to="/login" onClick={closeMenu} className="font-newtown italic uppercase text-2xl flex items-center gap-4 text-black border-b-2 border-slate-100 pb-2">
            <UserCircle size={24} /> Ingresar
        </Link>
        )}

        <Link to="/ventas" onClick={closeMenu} className="font-newtown italic uppercase text-2xl flex items-center gap-4 text-black text-emerald-500">
            Ventas
        </Link>
        <Link to="/servicio-tecnico" onClick={closeMenu} className="font-newtown italic uppercase text-2xl flex items-center gap-4 text-black text-blue-600">
            Servicio Técnico
        </Link>
        <Link to="/climatizacion" onClick={closeMenu} className="font-newtown italic uppercase text-2xl flex items-center gap-4 text-black text-orange-500">
            Climatización
        </Link>
        <a href="#contacto-seccion" onClick={closeMenu} className="font-newtown italic uppercase bg-black text-white text-center py-4 text-xl border-b-4 border-gray-600">
        Contacto
        </a>
    </div>
    </div>
</nav>
);
};

export default Navbar;