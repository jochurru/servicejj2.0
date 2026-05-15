import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/FadeIn';
import { EQUIPOS_REPARACION, PROCESO_TECNICO } from '../data/servicioTecnico';

const ServicioTecnico = () => (
  <div className="bg-white">
    <PageHero
      badge="Servicio técnico"
      title="Reparamos tu equipo con garantía"
      subtitle="Diagnóstico profesional, repuestos de calidad y seguimiento online de punta a punta."
      cta="Solicitar reparación"
      ctaTo="/tecnico-online"
      secondaryCta="Consultar ticket"
      secondaryTo="/"
    />

    <section className="section-pad bg-neutral-50">
      <div className="container-page">
        <SectionHeader badge="Especialidades" title="Qué reparamos" subtitle="Técnicos con experiencia en electrodomésticos y electrónica." />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EQUIPOS_REPARACION.map((item) => (
            <StaggerItem key={item.title}>
              <div className="card-minimal h-full">
                <item.icon className="mb-4" size={28} strokeWidth={1.5} />
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="section-pad">
      <div className="container-page">
        <SectionHeader badge="Proceso" title="Así trabajamos" align="left" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESO_TECNICO.map((p, i) => (
            <FadeIn key={p.step} delay={i * 0.08}>
              <div className="border-l-2 border-black pl-6">
                <span className="text-sm font-semibold text-neutral-400">{p.step}</span>
                <h3 className="text-lg mt-1 mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-500">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-black text-white">
      <FadeIn className="container-page text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-white mb-4">¿Listo para reparar tu equipo?</h2>
        <p className="text-neutral-400 mb-8">Creá tu pedido online y recibí un ticket de seguimiento al instante.</p>
        <Link to="/tecnico-online" className="btn-primary bg-white text-black hover:bg-neutral-200">
          Crear pedido <ArrowRight size={16} />
        </Link>
      </FadeIn>
    </section>
  </div>
);

export default ServicioTecnico;
