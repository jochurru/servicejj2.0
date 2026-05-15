import { ArrowUpRight } from 'lucide-react';
import { MotionArticle } from './motion';

const formatPrecio = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const ProductCard = ({ producto }) => (
  <MotionArticle
    whileHover={{ y: -4 }}
    transition={{ duration: 0.25 }}
    className="group card-minimal overflow-hidden p-0 flex flex-col"
  >
    <div className="aspect-4/3 overflow-hidden bg-neutral-100 relative">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <span className="absolute top-3 left-3 badge bg-white/90 backdrop-blur">{producto.categoria}</span>
    </div>
    <div className="p-5 flex flex-col grow">
      <h3 className="font-newtown text-lg leading-tight mb-2">{producto.nombre}</h3>
      <p className="text-xl font-semibold text-black mb-4">{formatPrecio(producto.precio)}</p>
      <a
        href={`https://wa.me/5491151765077?text=${encodeURIComponent(`Hola, consulto por: ${producto.nombre}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium border border-black rounded-full hover:bg-black hover:text-white transition-colors"
      >
        Consultar <ArrowUpRight size={14} />
      </a>
    </div>
  </MotionArticle>
);

export default ProductCard;
