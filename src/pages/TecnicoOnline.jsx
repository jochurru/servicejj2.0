import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { serviceApi } from '../services/api'; 

const TecnicoOnline = () => {
    // 1. Estado inicial sincronizado con el controlador del Backend
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        equipo: '',
        modelo: '',
        falla: '',
        fotos: [], // Aquí guardamos objetos { file, preview }
        aceptaTerminos: false
    });
    const [loading, setLoading] = useState(false);

    // 2. Manejo de archivos y generación de previews
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

    // 3. Envío al Backend usando FormData (Para Cloudinary + Multer)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Creamos el contenedor FormData para archivos binarios
            const dataParaEnviar = new FormData();

            // Adjuntamos campos de texto
            dataParaEnviar.append('nombre', formData.nombre);
            dataParaEnviar.append('telefono', formData.telefono);
            dataParaEnviar.append('email', formData.email);
            dataParaEnviar.append('equipo', formData.equipo);
            dataParaEnviar.append('modelo', formData.modelo);
            dataParaEnviar.append('falla', formData.falla);
            dataParaEnviar.append('aceptaTerminos', formData.aceptaTerminos);

            // Adjuntamos las fotos reales (el archivo binario)
            formData.fotos.forEach((foto) => {
                dataParaEnviar.append('fotos', foto.file); 
            });

            // Petición a la API
            const response = await serviceApi.crearPedido(dataParaEnviar);
            
            Swal.fire({
                title: '¡Pedido Recibido!',
                text: `Tu ID de seguimiento es: ${response.id}`,
                icon: 'success',
                confirmButtonColor: '#2563eb'
            });

            // Limpieza de recursos (previews) y reinicio de estado
            formData.fotos.forEach(foto => URL.revokeObjectURL(foto.preview));
            setFormData({
                nombre: '', telefono: '', email: '', equipo: '', modelo: '', falla: '', fotos: [], aceptaTerminos: false
            });
            if (e.target) e.target.reset();

        } catch (error) {
            console.error("Error en el envío:", error);
            Swal.fire('Error', error.message || 'No pudimos procesar tu solicitud.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
            <h1 className="text-3xl font-newtown text-blue-500 mb-4 uppercase italic tracking-wider">Técnico Online</h1>
            <p className="mb-8 text-slate-400 font-medium">Diagnóstico remoto profesional para Service JJ.</p>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-700">
                
                {/* Nombre y WhatsApp */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Nombre Completo</label>
                        <input 
                            type="text" 
                            className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all"
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            required
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

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>

                {/* Marca y Modelo */}
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

                {/* Falla */}
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

                {/* Fotos con Preview */}
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

                <div className="mb-6 p-4 bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl">
                    <p className="text-[12px] md:text-xs text-blue-200 leading-relaxed italic">
                        <strong>Nota:</strong> El presupuesto enviado por mail es preliminar. 
                        Aceptamos Mercado Pago y transferencias.
                    </p>
                </div>

                {/* Términos */}
                <div className="flex items-start gap-3 mb-6 bg-slate-900/50 p-3 rounded-xl">
                    <input 
                        type="checkbox" 
                        id="terminos"
                        className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        checked={formData.aceptaTerminos}
                        onChange={(e) => setFormData({...formData, aceptaTerminos: e.target.checked})}
                        required
                    />
                    <label htmlFor="terminos" className="text-[11px] text-slate-400 leading-tight">
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