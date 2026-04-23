import React, { useEffect, useState } from 'react'; // Agregamos useEffect
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { serviceApi } from '../services/api'; 
import { useAuth } from "../hooks/useAuth"; // 1. Importamos el hook

const TecnicoOnline = () => {
    const { user } = useAuth(); // 2. Consumimos el usuario
    
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        equipo: '',
        modelo: '',
        falla: '',
        fotos: [], 
        aceptaTerminos: false
    });
    const [loading, setLoading] = useState(false);

    // 3. EFECTO: Si hay usuario logueado, autocompletamos nombre y email
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                nombre: user.displayName || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (formData.fotos.length + files.length > 5) {
            return Swal.fire('¡Ups!', 'El máximo es de 5 fotos.', 'warning');
        }
        
        const newPhotos = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        
        setFormData({ ...formData, fotos: [...formData.fotos, ...newPhotos] });
    };

const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataParaEnviar = new FormData();

            // 1. Cargamos los datos básicos
            dataParaEnviar.append('nombre', formData.nombre);
            dataParaEnviar.append('telefono', formData.telefono);
            dataParaEnviar.append('email', formData.email);
            dataParaEnviar.append('equipo', formData.equipo);
            dataParaEnviar.append('modelo', formData.modelo);
            dataParaEnviar.append('falla', formData.falla);
            dataParaEnviar.append('aceptaTerminos', formData.aceptaTerminos);
            
            // 2. Si hay usuario logueado, mandamos su ID de Google
            if (user) {
                dataParaEnviar.append('clienteId', user.uid);
            } else {
                dataParaEnviar.append('clienteId', "null"); // Importante para el "Reclamo" posterior
            }

            // 3. Mandamos las fotos (el Backend espera el campo 'fotos')
            formData.fotos.forEach((foto) => {
                dataParaEnviar.append('fotos', foto.file); 
            });

            // --- 🚀 CAMBIO CLAVE AQUÍ ---
            // Usamos 'createPedido' (nombre exacto en api.js)
            const response = await serviceApi.createPedido(dataParaEnviar);
            
            if (response.success) {
                Swal.fire({
                    title: '¡Pedido Recibido!',
                    // Usamos 'idCorto' para que el cliente vea el ticket SJ-XXXX
                    text: `Tu código de seguimiento es: ${response.idCorto}`, 
                    icon: 'success',
                    confirmButtonColor: '#2563eb'
                });

                // Limpieza de memoria de las fotos
                formData.fotos.forEach(foto => URL.revokeObjectURL(foto.preview));
                
                // Reiniciamos el formulario
                setFormData({
                    nombre: user ? user.displayName : '',
                    telefono: '', 
                    email: user ? user.email : '', 
                    equipo: '', modelo: '', falla: '', fotos: [], aceptaTerminos: false
                });
                if (e.target) e.target.reset();
            }

        } catch (error) {
            console.error("Error en el envío:", error);
            Swal.fire('Error', 'No pudimos conectar con el servidor. Revisa tu conexión.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
            <h1 className="text-3xl font-newtown text-blue-500 mb-4 uppercase italic tracking-wider">Técnico Online</h1>
            <p className="mb-8 text-slate-400 font-medium">Diagnóstico remoto profesional para Service JJ.</p>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-700">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                            {user ? 'Nombre (Identificado)' : 'Nombre Completo'}
                        </label>
                        <input 
                            type="text" 
                            className={`w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all ${user ? 'text-blue-400 italic font-bold' : ''}`}
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            required
                            readOnly={!!user} // Si hay usuario, no se puede editar
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">WhatsApp</label>
                        <input 
                            type="tel" 
                            className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all"
                            value={formData.telefono}
                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {user ? 'Email (Sincronizado)' : 'Correo Electrónico'}
                    </label>
                    <input 
                        type="email" 
                        className={`w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all ${user ? 'text-blue-400 italic' : ''}`}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        readOnly={!!user} // Bloqueado si hay sesión
                    />
                </div>

                {/* MARCA Y MODELO (Igual que antes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Equipo (Marca)</label>
                        <input 
                            type="text" 
                            placeholder="Ej: Samsung"
                            className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all"
                            value={formData.equipo}
                            onChange={(e) => setFormData({...formData, equipo: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Modelo Exacto</label>
                        <input 
                            type="text" 
                            placeholder="Ej: UN55NU7100"
                            className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all"
                            value={formData.modelo}
                            onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                            required
                        />
                    </div>
                </div>

                {/* DESCRIPCIÓN Y FOTOS (Igual que antes) */}
                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Descripción de la falla</label>
                    <textarea 
                        rows="3"
                        className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all resize-none"
                        value={formData.falla}
                        onChange={(e) => setFormData({...formData, falla: e.target.value})}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Fotos del equipo (Máx. 5)</label>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                    
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {formData.fotos.map((foto, index) => (
                            <div key={index} className="relative aspect-square">
                                <img src={foto.preview} alt="preview" className="w-full h-full object-cover rounded-lg border border-slate-700" />
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const nuevas = formData.fotos.filter((_, i) => i !== index);
                                        setFormData({...formData, fotos: nuevas});
                                    }}
                                    className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center hover:bg-red-500 transition-colors"
                                >✕</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* NOTA Y BOTÓN */}
<div className="mb-6 p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded-r-xl shadow-lg">
    <p className="text-[12px] md:text-sm text-blue-100 leading-relaxed italic">
        <strong className="text-blue-400 uppercase tracking-widest block mb-1">Aviso Importante:</strong>
        El presupuesto enviado por este medio es **preliminar** y basado en la descripción técnica provista. 
        En reparaciones de alta complejidad o fallas intermitentes, es posible que se requiera **agendar una visita técnica presencial** para un diagnóstico definitivo. 
        <span className="block mt-2 font-bold text-white">Aceptamos Mercado Pago y Transferencias.</span>
    </p>
</div>

{/* Términos y condiciones */}
<div className="flex items-center gap-3 mb-6 bg-slate-900/50 p-3 rounded-xl">
    <input 
        type="checkbox" 
        id="terminos"
        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer"
        checked={formData.aceptaTerminos}
        onChange={(e) => setFormData({...formData, aceptaTerminos: e.target.checked})}
        required
    />
    <label htmlFor="terminos" className="text-[11px] text-slate-400 leading-none cursor-pointer">
        Acepto los <Link to="/terminos" className="text-blue-500 hover:underline">Términos</Link> y las <Link to="/privacidad" className="text-blue-500 hover:underline">Políticas de Privacidad</Link>.
    </label>
</div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-newtown italic uppercase tracking-widest transition-all ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:scale-[1.02]'}`}
                >
                    {loading ? 'Procesando diagnóstico...' : 'Obtener Presupuesto Express'}
                </button>
            </form>
        </div>
    );
};

export default TecnicoOnline;