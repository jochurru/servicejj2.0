import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const footerLinkClass =
  'group inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors duration-300';

const Footer = () => {
  const { user } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.06),transparent)] pointer-events-none"
        aria-hidden
      />

      <div className="container-page relative pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-zinc-800/80">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block group">
              <h2 className="font-newtown italic uppercase text-3xl md:text-4xl text-white tracking-tight leading-none group-hover:opacity-80 transition-opacity duration-300">
                Service JJ
              </h2>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-zinc-500 max-w-xs">
              Servicio técnico y climatización en CABA. Garantía escrita y seguimiento digital de tu reparación.
            </p>
            <div className="flex gap-3 mt-8">
              <a
                href="https://www.instagram.com/servicejj.ok/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/p/SERVICE-JJ-100063529391770/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-6">
              Servicios
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/servicio-tecnico" className={footerLinkClass}>
                  Servicio técnico
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
              <li>
                <Link to="/climatizacion" className={footerLinkClass}>
                  Climatización
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link to="/ventas" className={footerLinkClass}>
                  Vidriera
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link to="/tecnico-online" className={footerLinkClass}>
                  Crear pedido
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              {user && (
                <li>
                  <Link to="/mis-pedidos" className={footerLinkClass}>
                    Mis reparaciones
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-6">
              Contacto
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="tel:5491151765077" className={footerLinkClass}>
                  <Phone size={15} className="shrink-0 text-zinc-600 group-hover:text-white transition-colors" />
                  11 5176-5077
                </a>
              </li>
              <li>
                <a href="mailto:servicejjok@gmail.com" className={footerLinkClass}>
                  <Mail size={15} className="shrink-0 text-zinc-600 group-hover:text-white transition-colors" />
                  servicejjok@gmail.com
                </a>
              </li>
              <li className="flex gap-2 text-zinc-500 leading-relaxed">
                <MapPin size={15} className="shrink-0 mt-0.5 text-zinc-600" />
                <span>Av. Ángel Gallardo 1049, Villa Crespo, CABA</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacidad" className={footerLinkClass}>
                  Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className={footerLinkClass}>
                  Términos
                </Link>
              </li>
              <li>
                <Link to="/" className={footerLinkClass}>
                  Inicio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-zinc-600">
          <p>© {year} Service JJ — Todos los derechos reservados</p>
          <p className="text-zinc-700">Villa Crespo · Buenos Aires</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
