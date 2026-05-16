import React, { useEffect, useState } from 'react';
import { db } from "../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { Hammer, Clock, CheckCircle, Wrench } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { serviceApi } from '../services/api';
import PedidoQR from '../components/common/PedidoQR';

const MisPedidos = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. SEGURIDAD: Si terminó de cargar la auth y no hay usuario, redirigir
        if (!authLoading && !user) {
            navigate("/login");
            return;
        }

        const vincularYObtenerPedidos = async () => {
            if (!user || !user.email) return;

            try {
                // 1. Intentamos sincronizar los pedidos huérfanos con el backend
                try {
                    await serviceApi.reclamarPedidos({
                        email: user.email,
                        clienteId: user.uid,
                    });
                } catch {
                    /* endpoint de reclamo opcional */
                }

                // 2. Buscamos en Firestore los pedidos asociados al usuario.
                // Aceptamos cualquier pedido que pertenezca al usuario logueado.
                const q = query(
                    collection(db, "pedidos"), 
                    where("clienteId", "==", user.uid)
                );
                
                const querySnapshot = await getDocs(q);
                let listaPedidos = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // 3. Respaldo: Si no encontramos pedidos asociados a este clienteId (por ejemplo, pedidos hechos desde Técnico Online sin ID de usuario), buscamos por su email.
                if (listaPedidos.length === 0) {
                    const qEmail = query(
                        collection(db, "pedidos"), 
                        where("email", "==", user.email)
                    );
                    const querySnapshotEmail = await getDocs(qEmail);
                    listaPedidos = querySnapshotEmail.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                }

                setPedidos(listaPedidos);
            } catch (error) {
                console.error("Error al obtener pedidos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            vincularYObtenerPedidos();
        }
    }, [user, authLoading, navigate]);

    // UI DE ESPERA
    if (authLoading || (user && loading)) {
        return (
            <div className="pt-40 text-center font-newtown italic text-xl uppercase animate-pulse">
                Verificando acceso...
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="pt-32 px-4 max-w-5xl mx-auto min-h-screen">
            <h1 className="font-newtown italic uppercase text-4xl mb-8 border-b-4 border-black pb-2">
                Mis Reparaciones
            </h1>

            {pedidos.length === 0 ? (
                <p className="text-slate-500 italic text-lg">No tenés pedidos registrados con este usuario.</p>
            ) : (
                <div className="grid gap-8">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="card-pro p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                            {/* Decoración Retro */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rotate-45 z-0"></div>
                            
                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                                        <PedidoQR pedido={pedido} size="sm" />
                                        <div>
                                        <span className="bg-blue-600 text-white px-4 py-1 rounded-2xl text-[10px] font-bold uppercase italic">
                                            Service JJ Oficial
                                        </span>
                                        <h2 className="font-newtown text-3xl italic uppercase mt-4 leading-none">
                                            {pedido.equipo}
                                        </h2>
                                        <p className="text-slate-400 text-xs font-bold mt-2 tracking-widest">TICKET: {pedido.idCorto || pedido.id}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Badge de Estado con estilo de Seguimiento */}
                                    <div className="bg-black text-white p-4 rounded-2xl text-center shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] min-w-35">
                                        <p className="text-[10px] uppercase tracking-widest mb-1 opacity-70 flex items-center justify-center gap-2 mx-auto">
                                            {pedido.estado === 'pendiente' && <Clock size={12} className="text-orange-500" />}
                                            {pedido.estado === 'en reparación' && <Hammer size={12} className="text-blue-500" />}
                                            {pedido.estado === 'listo' && <CheckCircle size={12} className="text-emerald-500" />}
                                            Estado
                                        </p>
                                        <span className="text-sm font-bold uppercase italic text-blue-400">
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
                                            <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                                Actualizaciones del Técnico
                                            </h3>
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
                                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-6 text-center tracking-[0.3em]">
                                            Progreso de Reparación
                                        </p>
                                        <div className="relative flex justify-between items-center max-w-md mx-auto">
                                            <div className="absolute h-1 bg-slate-100 w-full top-1/2 -translate-y-1/2 z-0"></div>
                                            
                                            {/* Paso 1: Ingresado */}
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default MisPedidos;