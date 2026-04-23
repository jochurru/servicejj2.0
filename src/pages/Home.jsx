import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin } from 'lucide-react'; 
import ContactForm from '../components/common/ContactForm.jsx';
import BusquedaPedido from '../components/common/BusquedaPedido.jsx';
import { SERVICIOS } from '../data/servicios'; 

const Home = () => {
    const scrollToContact = () => {
        document.getElementById('contacto-seccion')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col w-full bg-white">
            {/* HERO SECTION - DOS COLUMNAS */}
            <section className="pt-18 pb-20 px-4 flex justify-center border-b border-slate-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* COLUMNA IZQUIERDA: SLOGAN Y TEXTO */}
                    <div className="text-left">
                        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block">
                            Servicio tecnico con garantía escrita.
                        </span>
                        <h1 className="font-newtown text-7xl md:text-6xl pt-0.5 uppercase italic leading-[0.85] text-slate-900 mb-6 tracking-tighter">
                            Soluciones Reales <br />
                            <span className="text-blue-600">Para Problemas</span> <br />
                            Técnicos
                        </h1>
                        <p className="text-slate-500 text-lg font-medium mb-10 max-w-md">
                            Servicios a todo CABA y alrededores.
                        </p>
                        
                        {/* BOTONES DE ACCIÓN */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/tecnico-online" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-newtown italic uppercase hover:bg-blue-700 transition-all text-center shadow-lg shadow-blue-200">
                                Técnico Online
                            </Link>
                            <button 
                                onClick={scrollToContact} 
                                className="bg-black text-white px-8 py-4 rounded-2xl font-newtown italic uppercase hover:bg-slate-800 transition-all text-center"
                            >
                                Contacto
                            </button>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: CONSULTA TU REPARACIÓN */}
                    <div className="w-full">
                        <BusquedaPedido />
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE SERVICIOS - Grid de 4 columnas */}
            <section className="py-20 bg-slate-50 px-4 border-y border-slate-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SERVICIOS.map((s) => (
                            <Link 
                                to={s.path} 
                                key={s.id}
                                className={`group p-8 rounded-[40px] border-2 border-transparent bg-white shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center ${s.color} ${s.destacado ? 'md:scale-105 border-blue-100 shadow-md' : ''}`}
                            >
                                <div className="mb-6 p-5 rounded-3xl bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                                    {s.icon}
                                </div>
                                <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 mb-2 uppercase">{s.label}</span>
                                <h2 className="font-newtown text-2xl italic uppercase mb-4 text-slate-900">{s.title}</h2>
                                <p className="text-slate-500 text-xs leading-relaxed mb-6">{s.desc}</p>
                                <div className="mt-auto flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-black group-hover:text-blue-600 transition-colors">
                                    Saber más <span className="text-lg">+</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE CONFIANZA */}
            <section className="py-16 bg-black text-white px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { t: "+20 Años", s: "Trayectoria" },
                        { t: "Garantía", s: "Por Escrito" },
                        { t: "Repuestos", s: "Originales" },
                        { t: "Atención", s: "Inmediata" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <CheckCircle2 className="text-blue-500 mb-4" size={28} />
                            <h3 className="font-newtown italic text-2xl uppercase leading-none">{item.t}</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{item.s}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* UBICACIÓN */}
            <section className="py-24 bg-white px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="font-newtown text-5xl italic uppercase leading-none text-slate-900">
                                Estamos <br />
                                <span className="text-blue-600">Cerca Tuyo</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                Operamos en toda la zona de <strong>Villa Crespo, Almagro y Palermo</strong>. Traé tu equipo o coordinamos un service a domicilio en el día.
                            </p>
                            
                            <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl">
                                <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-slate-900 uppercase tracking-tight leading-none">Av. Ángel Gallardo 1049</p>
                                    <p className="text-slate-400 text-sm mt-1 font-bold italic">Villa Crespo, CABA</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-100 w-full rounded-[50px] overflow-hidden border-8 border-slate-50 shadow-2xl relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.457876822831!2d-58.4357534!3d-34.6039572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca69584288b5%3A0x7d0130691523f66a!2sAv.%20%C3%81ngel%20Gallardo%201049%2C%20C1405%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1710000000000" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                className="grayscale hover:grayscale-0 transition-all duration-1000"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <div id="contacto-seccion">
                <ContactForm />
            </div>
        </div>
    );
};

export default Home;