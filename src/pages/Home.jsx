import { Link } from 'react-router-dom';
import { MotionDiv } from '../components/ui/motion';
import { ArrowRight, CheckCircle2, MapPin, Search } from 'lucide-react';
import ContactForm from '../components/common/ContactForm';
import BusquedaPedido from '../components/common/BusquedaPedido';
import SectionHeader from '../components/ui/SectionHeader';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/FadeIn';
import { SERVICIOS } from '../data/servicios';

const PASOS = [
  { num: '01', title: 'Solicitá servicio', desc: 'Completá el formulario online o traé tu equipo al local.' },
  { num: '02', title: 'Diagnóstico', desc: 'Evaluamos la falla y te damos un presupuesto sin compromiso.' },
  { num: '03', title: 'Seguimiento', desc: 'Consultá el estado con tu ticket SJ-XXXX en cualquier momento.' },
];

const Home = () => (
  <div className="bg-white">
    <section className="section-pad pt-4 border-b border-neutral-100">
      <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge mb-6">Service JJ · CABA</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-6">
            Reparación rápida y confiable
          </h1>
          <p className="text-lg text-neutral-500 max-w-md leading-relaxed mb-8">
            Servicio técnico integral, climatización y seguimiento digital. Más de 20 años de experiencia.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/tecnico-online" className="btn-primary">
              Crear pedido <ArrowRight size={16} />
            </Link>
            <a href="#servicios" className="btn-secondary">Ver servicios</a>
          </div>
        </MotionDiv>
        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 bg-neutral-50 rounded-3xl -z-10" />
            <BusquedaPedido />
          </div>
        </FadeIn>
      </div>
    </section>

    <section id="servicios" className="section-pad bg-neutral-50">
      <div className="container-page">
        <SectionHeader badge="Servicios" title="Todo lo que necesitás" subtitle="Reparación, climatización y productos con garantía." />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICIOS.map((s) => (
            <StaggerItem key={s.id}>
              <Link to={s.path} className="card-minimal h-full flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">{s.label}</span>
                <h3 className="text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed grow">{s.desc}</p>
                <span className="mt-4 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver más <ArrowRight size={14} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="section-pad">
      <div className="container-page">
        <SectionHeader badge="Proceso" title="Cómo funciona" subtitle="Sabé en todo momento qué pasa con tu equipo." />
        <div className="grid md:grid-cols-3 gap-8">
          {PASOS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.1}>
              <div className="border-t-2 border-black pt-6">
                <span className="text-4xl font-newtown text-neutral-200">{p.num}</span>
                <h3 className="text-xl mt-2 mb-2">{p.title}</h3>
                <p className="text-neutral-500 text-sm">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-black text-white">
      <div className="container-page">
        <SectionHeader badge="Confianza" title="Por qué elegirnos" dark />
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { t: '+20 años', s: 'Experiencia' },
            { t: 'Garantía', s: 'Por escrito' },
            { t: 'Repuestos', s: 'De calidad' },
            { t: 'Seguimiento', s: 'Online' },
          ].map((item) => (
            <StaggerItem key={item.t} className="text-center">
              <CheckCircle2 className="mx-auto mb-4 text-white/60" size={28} />
              <h3 className="text-2xl text-white">{item.t}</h3>
              <p className="text-neutral-500 text-xs uppercase tracking-widest mt-1">{item.s}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="section-pad border-y border-neutral-100">
      <FadeIn className="container-page flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-neutral-50 rounded-3xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-black text-white rounded-xl"><Search size={24} /></div>
          <div>
            <h3 className="text-2xl mb-2">¿Ya tenés un ticket?</h3>
            <p className="text-neutral-500 text-sm">Consultá el estado con tu código SJ-XXXX.</p>
          </div>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-primary shrink-0">
          Ir al buscador
        </a>
      </FadeIn>
    </section>

    <section className="section-pad">
      <div className="container-page grid md:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <span className="badge mb-4">Ubicación</span>
          <h2 className="text-4xl md:text-5xl mb-6">Estamos cerca tuyo</h2>
          <p className="text-neutral-500 mb-8">Villa Crespo, Almagro y Palermo.</p>
          <div className="flex items-center gap-4 p-5 border border-neutral-200 rounded-2xl">
            <MapPin size={22} />
            <div>
              <p className="font-semibold">Av. Ángel Gallardo 1049</p>
              <p className="text-sm text-neutral-500">Villa Crespo, CABA</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="h-80 rounded-2xl overflow-hidden border border-neutral-200 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe
              title="Mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.457876822831!2d-58.4357534!3d-34.6039572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca69584288b5%3A0x7d0130691523f66a!2sAv.%20%C3%81ngel%20Gallardo%201049!5e0!3m2!1ses-419!2sar!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </FadeIn>
      </div>
    </section>

    <div id="contacto-seccion">
      <ContactForm />
    </div>
  </div>
);

export default Home;
