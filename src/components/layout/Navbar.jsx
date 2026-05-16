import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const { span: MotionSpan, div: MotionDiv } = motion;
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import logojj from '../../assets/Logo.webp';
import { useAuth } from '../../hooks/useAuth';
import { useAdmin } from '../../hooks/useAdmin';

const LINKS = [
  { to: '/servicio-tecnico', label: 'Servicio técnico' },
  { to: '/climatizacion', label: 'Climatización' },
  { to: '/ventas', label: 'Vidriera' },
  { to: '/tecnico-online', label: 'Crear pedido' },
];

const NavLink = ({ to, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group py-1 text-sm font-medium tracking-wide"
  >
    <span
      className={`transition-colors duration-300 ${
        isActive ? 'text-black' : 'text-zinc-500 group-hover:text-black'
      }`}
    >
      {label}
    </span>
    <MotionSpan
      className="absolute left-0 right-0 -bottom-0.5 h-px bg-black origin-left"
      initial={false}
      animate={{ scaleX: isActive ? 1 : 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    />
  </Link>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-zinc-200/50 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
          : 'bg-white/70 backdrop-blur-md border-zinc-200/50'
      }`}
    >
      <MotionDiv
        className="container-page h-18 md:h-20 flex items-center justify-between gap-6"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group"
          onClick={closeMenu}
        >
          <img
            src={logojj}
            alt="Service JJ"
            className="h-10 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-newtown italic uppercase text-xl md:text-2xl tracking-tight text-black hidden sm:block leading-none">
            Service JJ
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10" aria-label="Principal">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              label={l.label}
              isActive={location.pathname === l.to}
            />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          {user ? (
            <>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  label="Panel admin"
                  isActive={location.pathname.startsWith('/admin')}
                />
              )}
              <NavLink
                to="/mis-pedidos"
                label="Mis reparaciones"
                isActive={location.pathname === '/mis-pedidos'}
              />
              <span className="h-4 w-px bg-zinc-200" aria-hidden />
              <span className="text-xs uppercase tracking-widest text-zinc-400">
                {user.displayName?.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={logout}
                className="p-2.5 rounded-full border border-zinc-200 text-zinc-600 hover:border-black hover:text-black hover:bg-black/5 transition-all duration-300"
                aria-label="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium uppercase tracking-wider border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              <UserCircle size={17} />
              Ingresar
            </Link>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-black hover:opacity-60 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </MotionDiv>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-zinc-200/50 bg-white/90 backdrop-blur-lg"
          >
            <nav className="container-page py-6 flex flex-col gap-1" aria-label="Móvil">
              {LINKS.map((l, i) => (
                <MotionDiv
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={l.to}
                    onClick={closeMenu}
                    className={`block py-3 text-lg font-medium tracking-wide border-b border-zinc-100 transition-colors ${
                      location.pathname === l.to ? 'text-black' : 'text-zinc-500'
                    }`}
                  >
                    {l.label}
                  </Link>
                </MotionDiv>
              ))}
              <div className="pt-4 mt-2 border-t border-zinc-200/50">
                {user ? (
                  <div className="space-y-3">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={closeMenu}
                        className="block py-2 text-base font-medium text-black"
                      >
                        Panel admin
                      </Link>
                    )}
                    <Link
                      to="/mis-pedidos"
                      onClick={closeMenu}
                      className="block py-2 text-base font-medium text-black"
                    >
                      Mis reparaciones
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        logout();
                      }}
                      className="text-sm uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
                    >
                      Salir
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-medium uppercase tracking-wider bg-black text-white rounded-full"
                  >
                    <UserCircle size={18} />
                    Ingresar
                  </Link>
                )}
              </div>
            </nav>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
