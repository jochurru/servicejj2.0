import React, { useEffect, useState } from 'react';
import { db } from "../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { Hammer, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom"; // IMPORTADO

const MisPedidos = () => {
const { user, loading: authLoading } = useAuth(); // Agregamos authLoading para saber si terminó de chequear el login
const navigate = useNavigate(); // Hook para redirección
const [pedidos, setPedidos] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
// 1. SEGURIDAD: Si terminó de cargar la auth y no hay usuario, afuera.
if (!authLoading && !user) {
    navigate("/login");
    return;
}

const obtenerPedidos = async () => {
    // 2. Si no hay usuario todavía, no hacemos nada
    if (!user) return;
    
    try {
    const q = query(
        collection(db, "pedidos"), 
        where("clienteId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const listaPedidos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    setPedidos(listaPedidos);
    } catch (error) {
    console.error("Error al obtener pedidos:", error);
    } finally {
    setLoading(false);
    }
};

// Solo ejecutamos la búsqueda si tenemos un usuario
if (user) {
    obtenerPedidos();
}
}, [user, authLoading, navigate]);

// 3. UI DE ESPERA: Mientras chequeamos si está logueado o cargando datos
if (authLoading || (user && loading)) {
return (
    <div className="pt-40 text-center font-newtown italic text-xl uppercase animate-pulse">
    Verificando acceso...
    </div>
);
}

// 4. Si después de todo no hay user (por seguridad, aunque el navigate ya actuó)
if (!user) return null;

return (
<div className="pt-32 px-4 max-w-5xl mx-auto min-h-screen">
    <h1 className="font-newtown italic uppercase text-4xl mb-8 border-b-4 border-black pb-2">
    Mis Reparaciones
    </h1>

    {pedidos.length === 0 ? (
    <p className="text-slate-500 italic text-lg">No tenés pedidos registrados con este usuario.</p>
    ) : (
    <div className="grid gap-6">
        {pedidos.map((pedido) => (
        <div key={pedido.id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
            <h3 className="font-bold text-xl uppercase italic">{pedido.equipo}</h3>
            <p className="text-slate-600 font-medium">Falla: {pedido.falla}</p>
            <p className="text-xs text-slate-400 mt-2">ID Pedido: {pedido.id}</p>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 border-2 border-black rounded-full">
            {pedido.estado === 'pendiente' && <Clock className="text-orange-500" />}
            {pedido.estado === 'en reparación' && <Hammer className="text-blue-600" />}
            {pedido.estado === 'listo' && <CheckCircle className="text-emerald-500" />}
            <span className="font-bold uppercase text-sm">{pedido.estado}</span>
            </div>
        </div>
        ))}
    </div>
    )}
</div>
);
};

export default MisPedidos;