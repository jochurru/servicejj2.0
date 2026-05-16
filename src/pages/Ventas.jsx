import { useEffect, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import { Stagger, StaggerItem } from '../components/ui/FadeIn';
import { serviceApi } from '../services/api';
import { PRODUCTOS_DESTACADOS } from '../data/productos';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { MotionDiv } from '../components/ui/motion';

const mapProducto = (p) => ({
  id: p.id,
  nombre: p.nombre,
  precio: p.precio,
  categoria: p.categoria || 'Equipos',
  imagen: p.imagen,
  descripcion: p.descripcion,
});

const Ventas = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const lista = await serviceApi.getProductosPublicos();
        if (!cancelled) {
          setProductos(lista.length > 0 ? lista.map(mapProducto) : PRODUCTOS_DESTACADOS);
        }
      } catch {
        if (!cancelled) setProductos(PRODUCTOS_DESTACADOS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
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

          {loading ? (
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LoadingSpinner label="Cargando catálogo..." />
            </MotionDiv>
          ) : (
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productos.map((prod) => (
                <StaggerItem key={prod.id}>
                  <ProductCard producto={prod} />
                </StaggerItem>
              ))}
            </Stagger>
          )}

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
};

export default Ventas;
