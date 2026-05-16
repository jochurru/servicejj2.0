import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/FadeIn';
import {
  BENEFICIOS_CLIMA,
  MARCAS_CALDERAS,
  MARCAS_AIRE,
  IMAGENES_CLIMA,
  VISUAL_SERVICIOS_CLIMA,
} from '../data/climatizacion';

const SI_ICON = (slug) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;

function BrandTile({ name, slug }) {
  const [broken, setBroken] = useState(!slug);
  const src = slug ? SI_ICON(slug) : null;

  return (
    <div className="group flex h-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      {src && !broken ? (
        <img
          src={src}
          alt=""
          width={120}
          height={40}
          className="max-h-8 w-auto max-w-28 object-contain opacity-75 grayscale transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="text-center text-[11px] font-black uppercase tracking-[0.12em] text-neutral-800">
          {name}
        </span>
      )}
    </div>
  );
}

const VisualCard = ({ src, alt, label, sub }) => (
  <div className="relative flex min-h-[280px] h-full flex-col overflow-hidden rounded-[28px] bg-neutral-900 md:min-h-[320px]">
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
    <div className="relative z-1 mt-auto flex w-full flex-col justify-end p-6 md:p-8">
      <p className="font-newtown text-2xl italic uppercase leading-tight text-white md:text-3xl">
        {label}
      </p>
      {sub && (
        <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-white/80">{sub}</p>
      )}
    </div>
  </div>
);

const Climatizacion = () => (
  <div className="bg-white">
    <PageHero
      badge="Climatización profesional"
      title="Calderas, aires y frío industrial"
      subtitle="Instalación, mantenimiento y reparación con técnicos matriculados. Trabajamos todas las marcas — consultá sin compromiso."
      cta="Pedir presupuesto"
      ctaTo="/tecnico-online"
      secondaryCta="WhatsApp"
      secondaryTo="https://wa.me/5491151765077"
    />

    {/* Impact strip */}
    <section className="border-y border-neutral-200 bg-neutral-950 py-6 text-white">
      <div className="container-page flex flex-col items-center justify-center gap-4 text-center md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-2">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
          <CheckCircle2 className="shrink-0" size={18} aria-hidden />
          Arreglamos todas las marcas
        </div>
        <span className="hidden text-neutral-600 md:inline">|</span>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
          Calderas · Aires acondicionados · Cámaras frigoríficas · Multisplit y conductos · Visitas en CABA y zona
        </p>
      </div>
    </section>

    {/* Visual grid — alto impacto */}
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader
          badge="Cobertura real"
          title="Tu equipo, en buenas manos"
          subtitle="Tecnología de primeras marcas y el mismo criterio técnico para hogares, locales y oficinas."
        />
        <div
          className="mt-12 mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8"
          role="list"
          aria-label="Servicios de climatización"
        >
          {VISUAL_SERVICIOS_CLIMA.map((item, i) => (
            <FadeIn key={item.imageKey} delay={i * 0.06} className="h-full">
              <article className="h-full" role="listitem">
                <VisualCard
                  src={IMAGENES_CLIMA[item.imageKey]}
                  alt={item.alt}
                  label={item.label}
                  sub={item.sub}
                />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Marcas calderas */}
    <section className="section-pad bg-neutral-50">
      <div className="container-page">
        <SectionHeader
          badge="Calderas · Argentina y líderes globales"
          title="Marcas que ya conocés"
          subtitle="Piezas, diagnóstico y mantenimiento. Si tu marca no está en la lista, igual trabajamos el equipo — traé modelo y foto."
        />
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.06)] md:p-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {MARCAS_CALDERAS.map((m) => (
              <BrandTile key={m.name} name={m.name} slug={m.slug} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Arreglamos todas las marcas — consultá
          </p>
        </div>
      </div>
    </section>

    {/* Marcas aire */}
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader
          badge="Aire acondicionado"
          title="Primeras marcas del mercado"
          subtitle="Instalaciones nuevas, cambios de equipo y service para que el consumo sea eficiente todo el año."
        />
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-neutral-900 bg-neutral-950 p-8 md:p-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {MARCAS_AIRE.map((m) => (
              <BrandTile key={m.name} name={m.name} slug={m.slug} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Todas las marcas — escribinos y coordinamos visita
          </p>
        </div>
      </div>
    </section>

    {/* Servicios */}
    <section className="section-pad bg-neutral-50">
      <div className="container-page">
        <SectionHeader badge="Servicios" title="Qué hacemos por vos" subtitle="Un solo equipo para calor, frío y conservación." />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFICIOS_CLIMA.map((b) => (
            <StaggerItem key={b.title}>
              <div className="card-minimal group h-full border border-neutral-200 bg-white transition hover:border-black hover:shadow-lg">
                <b.icon className="mb-4 text-neutral-700 transition group-hover:text-black" size={28} strokeWidth={1.5} />
                <h3 className="font-newtown text-xl italic uppercase text-black">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    {/* CTA */}
    <section className="section-pad bg-black text-white">
      <FadeIn className="container-page text-center">
        <h2 className="font-newtown text-3xl italic uppercase tracking-tight text-white md:text-5xl">
          ¿Caldera, aire o cámara fría?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          Coordinamos visita técnica o presupuesto. Creá tu pedido online y obtené ticket de seguimiento al instante.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/tecnico-online" className="btn-primary bg-white text-black hover:bg-neutral-200">
            Solicitar servicio <ArrowRight size={16} aria-hidden />
          </Link>
          <Link to="/#contacto-seccion" className="btn-secondary border-white text-black hover:bg-white hover:text-black">
            Nueva consulta
          </Link>
        </div>
      </FadeIn>
    </section>
  </div>
);

export default Climatizacion;
