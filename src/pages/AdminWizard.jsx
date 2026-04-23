import React, { useState, useEffect } from 'react';
import { db } from "../services/firebaseConfig";
import { doc, updateDoc, arrayUnion, getDocs, collection, query, where } from "firebase/firestore";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Search, Save, QrCode, X, Wrench, ClipboardList } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminWizard = () => {
    const [busqueda, setBusqueda] = useState("");
    const [pedido, setPedido] = useState(null);
    const [nuevaNota, setNuevaNota] = useState("");
    const [nuevoEstado, setNuevoEstado] = useState("");
    const [loading, setLoading] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    // Lógica del Scanner QR
    useEffect(() => {
        let scanner = null;
        if (isScanning) {
            scanner = new Html5QrcodeScanner("reader", {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            });

            scanner.render(
                (decodedText) => {
                    // Si el QR tiene la URL completa, nos quedamos con el ID final
                    const partes = decodedText.split('/');
                    const idExtraido = partes[partes.length - 1].toUpperCase();
                    
                    setBusqueda(idExtraido);
                    setIsScanning(false);
                    scanner.clear();
                    ejecutarBusquedaRapida(idExtraido);
                },
                () => { /* Silencioso para evitar spam de consola */ }
                );
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(error => console.error("Error al limpiar scanner", error));
            }
        };
    }, [isScanning]);

    const ejecutarBusquedaRapida = async (id) => {
        if (!id) return;
        setLoading(true);
        try {
            const q = query(collection(db, "pedidos"), where("idCorto", "==", id.trim()));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                setPedido({ id: docSnap.id, ...docSnap.data() });
                setNuevoEstado(docSnap.data().estado);
            } else {
                Swal.fire({
                    title: "No encontrado",
                    text: `El código ${id} no existe en la base de datos.`,
                    icon: "warning",
                    confirmButtonColor: "#2563eb"
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const actualizarPedido = async () => {
        if (!pedido) return;
        setLoading(true);
        try {
            const pedidoRef = doc(db, "pedidos", pedido.id);
            const dataToUpdate = { estado: nuevoEstado };

            if (nuevaNota.trim()) {
                dataToUpdate.notasTecnico = arrayUnion({
                    fecha: new Date().toLocaleString('es-AR', { 
                        day: '2-digit', month: '2-digit', year: 'numeric', 
                        hour: '2-digit', minute: '2-digit' 
                    }) + " hs",
                    texto: nuevaNota.trim()
                });
            }

            await updateDoc(pedidoRef, dataToUpdate);

            Swal.fire({
                title: '¡Actualizado!',
                text: 'Estado y bitácora guardados.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                popup: 'rounded-[35px]'
            });

            setNuevaNota("");
            ejecutarBusquedaRapida(pedido.idCorto); // Refrescar datos
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo guardar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 px-4 max-w-4xl mx-auto pb-20 min-h-screen">
            <header className="flex justify-between items-center mb-10">
                <h1 className="font-newtown italic uppercase text-3xl md:text-5xl border-b-4 border-black pb-2">
                    Administrador de Taller
                </h1>
                <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg">
                    <Wrench size={24} />
                </div>
            </header>

            {/* OVERLAY DEL SCANNER */}
            {isScanning && (
                <div className="fixed inset-0 z-100 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                    <button 
                        onClick={() => setIsScanning(false)}
                        className="absolute top-10 right-10 bg-white/10 hover:bg-red-500 text-white p-4 rounded-full transition-all"
                    >
                        <X size={32} />
                    </button>
                    <div className="w-full max-w-md bg-white p-4 rounded-[40px] shadow-2xl">
                        <div id="reader" className="overflow-hidden rounded-[30px]"></div>
                    </div>
                    <p className="text-white font-newtown italic mt-8 text-xl tracking-widest animate-pulse">
                        Apunte al QR del Ticket
                    </p>
                </div>
            )}

            {/* BUSCADOR */}
            <div className="flex gap-3 mb-12">
                <div className="relative flex-1">
                    <input 
                        type="text" 
                        placeholder="ID CORTO (EJ: SJ-A1B2)" 
                        className="w-full p-5 rounded-2xl border-2 border-slate-200 uppercase font-black text-slate-700 focus:border-blue-600 outline-none transition-all shadow-sm"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value.toUpperCase())}
                    />
                </div>
                <button 
                    onClick={() => setIsScanning(true)}
                    className="bg-blue-600 text-white px-6 rounded-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg"
                    title="Escanear QR"
                >
                    <QrCode size={24} />
                </button>
                <button 
                    onClick={() => ejecutarBusquedaRapida(busqueda)} 
                    className="bg-black text-white px-8 rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                    <Search size={20} /> <span className="hidden md:inline font-bold">BUSCAR</span>
                </button>
            </div>

            {/* FORMULARIO DE EDICIÓN */}
            {pedido ? (
                <div className="bg-white rounded-[50px] p-8 md:p-12 shadow-2xl border border-slate-100 transition-all animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-blue-600 font-black uppercase text-[10px] tracking-[0.3em]">Pedido Identificado</span>
                            <h2 className="font-newtown text-4xl italic uppercase text-slate-900">{pedido.equipo}</h2>
                            <p className="text-slate-400 font-bold italic">{pedido.modelo || 'Sin modelo'}</p>
                        </div>
                        <div className="bg-slate-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
                            SJ-{pedido.idCorto}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {['pendiente', 'en reparación', 'listo'].map((est) => (
                            <button
                                key={est}
                                onClick={() => setNuevoEstado(est)}
                                className={`p-4 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${
                                    nuevoEstado === est ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                {est}
                            </button>
                        ))}
                    </div>

                    <div className="mb-10">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-4 ml-2 tracking-widest">
                            <ClipboardList size={14} /> Nueva actualización para el cliente
                        </label>
                        <textarea 
                            className="w-full p-8 rounded-[40px] bg-slate-50 border-2 border-slate-100 italic font-medium focus:border-blue-500 outline-none transition-all shadow-inner text-slate-700"
                            placeholder="Describí el avance de hoy..."
                            rows="4"
                            value={nuevaNota}
                            onChange={(e) => setNuevaNota(e.target.value)}
                        />
                    </div>

                    <button 
                        onClick={actualizarPedido}
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-6 rounded-[30px] font-newtown italic uppercase text-2xl hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-4 group"
                    >
                        {loading ? 'Sincronizando...' : (
                            <>
                                <Save className="group-hover:animate-bounce" /> 
                                GUARDAR CAMBIOS
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <div className="text-center py-20 opacity-20 select-none">
                    <QrCode size={120} className="mx-auto mb-4" strokeWidth={1} />
                    <p className="font-newtown italic text-2xl uppercase">Esperando Identificación</p>
                </div>
            )}
        </div>
    );
};

export default AdminWizard;