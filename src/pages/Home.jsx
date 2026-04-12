import { Link } from 'react-router-dom';
import { Hammer, AirVent, ShoppingBag, CheckCircle2, MapPin } from 'lucide-react'; 
import ContactForm from '../components/common/ContactForm.jsx'; // Formulario de contacto
const SERVICIOS = [
{
id: 1,
title: "Climatización",
desc: "Instalación y mantenimiento de aires acondicionados. Especialistas en sistemas split.",
label: "SERVICIO PRINCIPAL",
icon: <AirVent size={40} />,
color: "hover:border-blue-600",
destacado: true,
path: "/climatizacion"
},
{
id: 2,
title: "Servicio Técnico",
desc: "Reparación de lavarropas, heladeras y TV con repuestos originales y garantía.",
label: "ATENCIÓN RÁPIDA",
icon: <Hammer size={40} />,
color: "hover:border-blue-600",
path: "/servicio-tecnico"
},
{
id: 3,
title: "Ventas",
desc: "Equipos reacondicionados y repuestos seleccionados con garantía escrita.",
label: "OPORTUNIDADES",
icon: <ShoppingBag size={40} />,
color: "hover:border-blue-600",
path: "/ventas"
},
{
id: 4,
title: "Técnico Online",
desc: "Diagnóstico remoto gratuito. Subí fotos de tu equipo y recibí un presupuesto aproximado.",
label: "NUEVO SERVICIO",
icon: <div className="relative">
        <Hammer size={40} />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
    </div>,
color: "hover:border-blue-600",
destacado: false,
path: "/tecnico-online"
}
];

const Home = () => {
// Función para scroll suave al formulario
const scrollToContact = () => {
document.getElementById('contacto-seccion')?.scrollIntoView({ behavior: 'smooth' });
};

return (
<div className="flex flex-col w-full">
    {/* HERO SECTION */}
    <section className="bg-white pt-6 pb-20 px-4 border-b-2 border-slate-100 flex justify-center">
    <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="font-newtown text-4xl md:text-6xl uppercase italic leading-tight text-slate-900 mb-8 mt-2 tracking-tight">
        Servicio Técnico <br />
        Profesional <br />
        <span className="text-blue-600">con Garantía Escrita</span>
        </h1>

        <p className="text-slate-600 text-lg md:text-xl font-medium mb-12 max-w-2xl">
        Especialistas en Climatización y Línea Blanca. <br />
        Atención rápida en <span className="font-bold text-black border-b-2 border-blue-600 italic">Villa Crespo y alrededores.</span>
        </p>

<div className="flex flex-col gap-5 justify-center w-full max-w-lg mx-auto">
{/* Botón destacado arriba */}
<Link to="/tecnico-online" className="bg-blue-600 text-white px-8 py-4 text-xl rounded-2xl font-newtown italic uppercase hover:bg-blue-700 hover:scale-105 transition-all text-center w-full">
Diagnóstico Técnico Online
</Link>

{/* Los otros dos abajo en fila */}
<div className="flex flex-col sm:flex-row gap-5 w-full">
<Link to="/ventas" className="bg-slate-200 text-slate-800 px-8 py-4 text-xl rounded-2xl font-newtown italic uppercase hover:bg-slate-300 transition-all text-center flex-1">
    Catálogo
</Link>
<button onClick={scrollToContact} className="bg-black text-white px-8 py-4 text-xl rounded-2xl font-newtown italic uppercase hover:bg-slate-800 transition-all text-center flex-1">
    Contacto
</button>
</div>
</div>
    </div>
    </section>

    {/* SECCIÓN DE SERVICIOS */}
    <section className="py-12 bg-slate-50 px-4">
    <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICIOS.map((s) => (
            <Link 
            to={s.path} 
            key={s.id}
            className={`group p-8 rounded-3xl border-2 border-transparent bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center ${s.color} ${s.destacado ? 'md:scale-105 border-blue-100 shadow-md' : ''}`}
            >
            <div className="mb-6 p-4 rounded-full bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {s.icon}
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600 mb-2">{s.label}</span>
            <h2 className="font-newtown text-3xl italic uppercase mb-4">{s.title}</h2>
            <p className="text-slate-500 leading-relaxed mb-6">{s.desc}</p>
            <span className="mt-auto font-bold text-sm uppercase tracking-wider text-black group-hover:text-blue-600">Saber más +</span>
            </Link>
        ))}
        </div>
    </div>
    </section>

    {/* SECCIÓN DE CONFIANZA */}
    <section className="py-16 bg-black text-white px-4">
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
        { t: "+20 Años", s: "De experiencia" },
        { t: "Garantía", s: "Escrita" },
        { t: "Villa Crespo", s: "Radio 5km" },
        { t: "Atención", s: "En el día" }
        ].map((item, i) => (
        <div key={i} className="flex flex-col items-center text-center">
            <CheckCircle2 className="text-blue-500 mb-4" size={32} />
            <h3 className="font-newtown italic text-2xl uppercase leading-none">{item.t}</h3>
            <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">{item.s}</p>
        </div>
        ))}
    </div>
    </section>

    {/* SECCIÓN UBICACIÓN Y MAPA */}
    <section className="py-20 bg-white px-4">
    <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
            <h2 className="font-newtown text-4xl italic uppercase leading-none">
            Nuestra <span className="text-blue-600">Ubicación</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
            Estamos ubicados en el corazón de <strong>Villa Crespo</strong>, frente al Parque Centenario. Nuestra ubicación estratégica nos permite brindar una atención rápida en Caballito, Almagro, Palermo y alrededores.
            </p>
            
            <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MapPin size={24} />
                </div>
                <div>
                <p className="font-bold text-slate-900 leading-none">Av. Ángel Gallardo 1049</p>
                <p className="text-slate-500 text-sm">Villa Crespo, CABA</p>
                </div>
            </div>
            <p className="text-xs text-slate-400 italic">
                * Coordinar visitas previamente por WhatsApp para asegurar disponibilidad técnica.
            </p>
            </div>
        </div>

        <div className="h-80 w-full rounded-3xl overflow-hidden border-2 border-slate-100 shadow-2xl relative">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.444738515746!2d-58.437754924260274!3d-34.60555367295444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca6a00000001%3A0x6d9f75f78c7774d8!2sAv.%20%C3%81ngel%20Gallardo%201049%2C%20C1405%20CABA!5e0!3m2!1ses-419!2sar!4v1710800000000!5m2!1ses-419!2sar" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
        </div>
        </div>
    </div>
    </section>

    {/* SECCIÓN DE CONTACTO FINAL */}
    <div id="contacto-seccion">
    <ContactForm />
    </div>
</div>
);
};

export default Home;