import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import { Stagger, StaggerItem } from '../components/ui/FadeIn';
import { PRODUCTOS_DESTACADOS } from '../data/productos';

const Ventas = () => (
  <div className="bg-white">
    <PageHero
      badge="Vidriera"
      title="Productos destacados"
      subtitle="Equipos reacondicionados y repuestos seleccionados. Consultá disponibilidad por WhatsApp."
      cta="Consultar por WhatsApp"
      ctaTo="https://wa.me/5491151765077"
    />

    <section className="section-pad">
      <div className="container-page">
        <SectionHeader
          badge="Catálogo"
          title="Selección del mes"
          subtitle="No es una tienda online: cada producto se confirma con nuestro equipo antes de la compra."
        />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTOS_DESTACADOS.map((prod) => (
            <StaggerItem key={prod.id}>
              <ProductCard producto={prod} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="text-center text-sm text-neutral-400 mt-12">
          ¿Buscás algo específico?{' '}
          <a href="https://wa.me/5491151765077" className="text-black font-medium underline">
            Escribinos por WhatsApp
          </a>
        </p>
      </div>
    </section>
  </div>
);

export default Ventas;
