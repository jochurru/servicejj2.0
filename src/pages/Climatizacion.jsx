import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/FadeIn';
import { BENEFICIOS_CLIMA } from '../data/climatizacion';

const Climatizacion = () => (
  <div className="bg-white">
    <PageHero
      badge="Climatización"
      title="Aire acondicionado sin complicaciones"
      subtitle="Instalación, mantenimiento y reparación de splits y sistemas. Técnicos matriculados con garantía escrita."
      cta="Pedir presupuesto"
      ctaTo="/tecnico-online"
      secondaryCta="Contactar"
      secondaryTo="/#contacto-seccion"
    />

    <section className="section-pad">
      <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <span className="badge mb-4">Especialidad</span>
          <h2 className="text-4xl md:text-5xl mb-6">Clima perfecto todo el año</h2>
          <p className="text-neutral-500 leading-relaxed mb-6">
            Instalamos equipos nuevos, realizamos mantenimiento preventivo y resolvemos fallas como falta de gas,
            compresor dañado o equipos que no enfrían. Trabajamos en hogares, comercios y oficinas en CABA.
          </p>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li className="flex gap-2"><span className="text-black font-bold">—</span> Cálculo de frigorías según ambiente</li>
            <li className="flex gap-2"><span className="text-black font-bold">—</span> Instalación con materiales de primera</li>
            <li className="flex gap-2"><span className="text-black font-bold">—</span> Service anual programado</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1631545806609-73ef74c2cfb8?w=800&q=80"
              alt="Instalación de aire acondicionado"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="section-pad bg-neutral-50">
      <div className="container-page">
        <SectionHeader badge="Servicios" title="Qué ofrecemos" subtitle="Soluciones completas para tu confort térmico." />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFICIOS_CLIMA.map((b) => (
            <StaggerItem key={b.title}>
              <div className="card-minimal h-full">
                <b.icon className="mb-4" size={26} strokeWidth={1.5} />
                <h3 className="text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-neutral-500">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="section-pad bg-black text-white">
      <FadeIn className="container-page text-center max-w-xl mx-auto">
        <h2 className="text-3xl text-white mb-4">¿Necesitás instalar o reparar tu aire?</h2>
        <p className="text-neutral-400 mb-8">Coordinamos visita técnica o presupuesto remoto según tu caso.</p>
        <Link to="/tecnico-online" className="btn-primary bg-white text-black hover:bg-neutral-200">
          Solicitar servicio <ArrowRight size={16} />
        </Link>
      </FadeIn>
    </section>
  </div>
);

export default Climatizacion;
