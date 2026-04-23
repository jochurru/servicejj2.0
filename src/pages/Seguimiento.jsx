import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Wrench, Clock, CheckCircle, AlertTriangle } from 'lucide-react';


const Seguimiento = () => {
    const { idCorto } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pedido, setPedido] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    if (!idCorto) return;

    const fetchSeguimiento = async () => {
        // 🚀 EL SECRETO: Procesamos el ID ANTES de entrar al try/catch
        let ticketFinal = idCorto.toUpperCase().trim();
        if (!ticketFinal.startsWith('SJ-')) {
            ticketFinal = `SJ-${ticketFinal}`;
        }

        // Si el ticketFinal es distinto al idCorto de la URL y no queremos que ensucie,
        // nos aseguramos de llamar a la API SOLO con el ticketFinal procesado.
        try {
            setLoading(true);
            const res = await serviceApi.consultarSeguimiento(ticketFinal);
            const datosPedido = res.success ? res : res; 
            setPedido(datosPedido);
            setError(null);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("No se encontró el ticket.");
        } finally {
            setLoading(false);
        }
    };

    fetchSeguimiento();
}, [idCorto]);

    if (loading) return (
        <div className="py-20 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
            <p className="font-newtown italic uppercase text-slate-400">Buscando equipo...</p>
        </div>
    );

    if (error) return (
        <div className="py-20 text-center px-4">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-red-500 font-bold uppercase mb-2 italic">Error de Seguimiento</h2>
            <p className="text-slate-600 font-medium max-w-sm mx-auto">
                No pudimos encontrar el ticket <span className="font-bold text-black">"{idCorto}"</span>. 
                Verificá que el código sea correcto.
            </p>
        </div>
    );

    return (
        <>
            {/* Botón flotante para clientes logueados */}
            {user && (
                <button
                    onClick={() => navigate("/mis-pedidos")}
                    className="fixed top-24 left-4 z-40 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase italic flex items-center gap-2 shadow-xl hover:bg-blue-600 transition-all border border-white/20"
                >
                    ← Volver a mis pedidos
                </button>
            )}

            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="card-pro p-8 bg-white shadow-2xl relative overflow-hidden">
                    {/* Decoración Retro */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rotate-45 z-0"></div>
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                            <div>
                                <span className="bg-blue-600 text-white px-4 py-1 rounded-2xl text-[10px] font-bold uppercase italic">
                                    Service JJ Oficial
                                </span>
                                <h1 className="font-newtown text-4xl italic uppercase mt-4 leading-none">
                                    {pedido.equipo}
                                </h1>
                                <p className="text-slate-400 text-xs font-bold mt-2 tracking-widest">TICKET: {pedido.idCorto}</p>
                            </div>
                            
                            <div className="bg-black text-white p-4 rounded-2xl min-w-140px text-center shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
                                <p className="text-[10px] uppercase tracking-widest mb-1 opacity-70">Estado</p>
                                <span className="text-xl font-bold uppercase italic text-blue-400">
                                    {pedido.estado}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Box de Falla */}
                            <div className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-100 relative">
                                <Wrench className="absolute -top-3 -left-3 bg-white text-blue-600 p-1 rounded-lg border-2 border-blue-100" size={32} />
                                <p className="text-[10px] font-bold uppercase text-blue-400 mb-2 ml-4">Reporte de Falla</p>
                                <p className="text-slate-700 italic font-medium leading-relaxed">
                                    "{pedido.falla}"
                                </p>
                            </div>

                            {/* BLOQUE DE NOTAS INTERACTIVAS */}
                            {pedido.notasTecnico && pedido.notasTecnico.length > 0 && (
                                <div className="mt-6 space-y-3">
                                    <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                        Actualizaciones del Técnico
                                    </h4>
                                    <div className="space-y-3">
                                        {pedido.notasTecnico.map((nota, index) => (
                                            <div key={index} className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-2xl shadow-sm">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                        {nota.fecha}
                                                    </span>
                                                </div>
                                                <p className="text-slate-700 italic text-sm font-medium leading-relaxed">
                                                    "{nota.texto}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Línea de Tiempo */}
                            <div className="pt-4">
                                <p className="text-[10px] font-bold uppercase text-slate-400 mb-6 text-center tracking-[0.3em]">Progreso de Reparación</p>
                                <div className="relative flex justify-between items-center max-w-md mx-auto">
                                    <div className="absolute h-1 bg-slate-100 w-full top-1/2 -translate-y-1/2 z-0"></div>
                                    
                                    {/* Paso 1: Ingreso */}
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-green-500 border-4 border-white ring-2 ring-green-500"></div>
                                        <span className="text-[9px] font-bold uppercase">Ingresado</span>
                                    </div>

                                {/* Paso 2: Taller */}
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`w-5 h-5 rounded-full border-4 border-white ring-2 ${
                                            pedido.estado === 'en reparación' || pedido.estado === 'listo' 
                                            ? 'ring-blue-600 bg-blue-600' 
                                            : 'ring-slate-200 bg-slate-200'
                                        }`}></div>
                                        <span className="text-[9px] font-bold uppercase text-slate-400">Taller</span>
                                    </div>
                                    {/* Paso 3: Listo */}
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`w-5 h-5 rounded-full border-4 border-white ring-2 ${
                                            pedido.estado === 'listo' 
                                            ? 'ring-green-500 bg-green-500' 
                                            : 'ring-slate-200 bg-slate-200'
                                        }`}></div>
                                        <span className="text-[9px] font-bold uppercase text-slate-400">Listo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Seguimiento;