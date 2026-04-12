import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
// 1. Importamos la conexión y las herramientas de Firestore
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TecnicoOnline = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        equipo: '',
        falla: '',
        fotos: [],
        aceptaTerminos: false
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (formData.fotos.length + files.length > 5) {
            return Swal.fire('¡Ups!', 'El máximo es de 5 fotos por diagnóstico.', 'warning');
        }

        const newPhotos = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setFormData({ ...formData, fotos: [...formData.fotos, ...newPhotos] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 2. Preparamos el objeto para Firestore (Payload limpio)
            const pedidoParaFirebase = {
                nombre: formData.nombre,
                telefono: formData.telefono,
                equipo: formData.equipo,
                falla: formData.falla,
                cantidadFotos: formData.fotos.length,
                aceptaTerminos: formData.aceptaTerminos,
                fechaCreacion: serverTimestamp(), // Marca de tiempo del servidor
                estado: "pendiente" // Un plus para que JJ pueda gestionarlo después
            };

            // 3. Guardamos en la colección 'pedidos' de Firestore
            const docRef = await addDoc(collection(db, "pedidos"), pedidoParaFirebase);
            console.log("Documento escrito con ID: ", docRef.id);

            Swal.fire('¡Enviado!', 'El técnico revisará tu caso en minutos.', 'success');
            
            // 4. Limpieza de memoria y estado
            formData.fotos.forEach(foto => URL.revokeObjectURL(foto.preview));

            setFormData({
                nombre: '', 
                telefono: '', 
                equipo: '', 
                falla: '', 
                fotos: [], 
                aceptaTerminos: false
            });

            e.target.reset();

        } catch (error) {
            console.error("Error al guardar en Firebase:", error); 
            Swal.fire('Error', 'No pudimos procesar tu solicitud. Revisa la conexión.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
            <h1 className="text-3xl font-newtown text-blue-500 mb-4 uppercase italic">Técnico Online</h1>
            <p className="mb-8 text-slate-400 font-medium">Diagnóstico remoto gratuito para Service JJ.</p>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-700">
                
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

                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Equipo (Marca/Modelo)</label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 focus:border-blue-500 outline-none transition-all"
                        value={formData.equipo}
                        onChange={(e) => setFormData({...formData, equipo: e.target.value})}
                        required
                    />
                </div>

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
                                    className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
                                >✕</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-6 p-4 bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl">
                    <p className="text-[12px] md:text-xs text-blue-200 leading-relaxed italic">
                        <strong>Nota importante:</strong> El diagnóstico remoto es una orientación preliminar 
                        basada en la información provista. Fallas complejas requieren inspección presencial. 
                        El valor de la visita técnica se informará previamente y será bonificado si se aprueba la reparación.
                    </p>
                </div>

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
                        Acepto los <Link to="/terminos" className="text-blue-500 hover:underline">Términos</Link> y las <Link to="/privacidad" className="text-blue-500 hover:underline">Políticas de Privacidad</Link>. Entiendo que el presupuesto es preliminar.
                    </label>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-newtown italic uppercase tracking-widest transition-all hover:scale-[1.02]">
                    Obtener Presupuesto Express
                </button>
            </form>
        </div>
    );
};

export default TecnicoOnline;