import { useState } from 'react';
import Swal from 'sweetalert2';
import { Send, User, Mail, MessageSquare } from 'lucide-react'; // Usamos Lucide para los iconos de los inputs

const ContactForm = () => {
const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

const handleSubmit = (e) => {
e.preventDefault();

// Aquí podrías enviar los datos a un backend o email
console.log(formData);

// Disparamos la alerta de éxito
Swal.fire({
    title: '¡Consulta Enviada!',
    text: 'Gracias por contactarte. Te responderemos a la brevedad.',
    icon: 'success',
    confirmButtonColor: '#2563eb',
    borderRadius: '20px',
    confirmButtonText: 'ENTENDIDO'
});

// Limpiamos el formulario
setFormData({ nombre: '', email: '', mensaje: '' });
};

return (
<section className="py-20 bg-slate-50 px-4">
    <div className="max-w-3xl mx-auto text-center mb-12">
    <h2 className="font-newtown text-4xl italic uppercase mb-4">¿Tenés una <span className="text-blue-600">Consulta?</span></h2>
    <p className="text-slate-600 font-medium">Completá el formulario y nos pondremos en contacto con vos en menos de 24hs.</p>
    </div>

    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100">
    
    {/* Input Nombre */}
    <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
        required
        type="text" 
        placeholder="Tu nombre completo"
        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none text-slate-700"
        value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        />
    </div>

    {/* Input Email */}
    <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
        required
        type="email" 
        placeholder="Correo electrónico"
        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none text-slate-700"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
    </div>

    {/* Textarea Mensaje */}
    <div className="relative">
        <MessageSquare className="absolute left-4 top-6 text-slate-400" size={20} />
        <textarea 
        required
        placeholder="¿En qué podemos ayudarte? (Ej: Presupuesto para instalación de Split)"
        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none text-slate-700 h-32 resize-none"
        value={formData.mensaje}
        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
        ></textarea>
    </div>

    {/* Botón de Envío */}
    <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-newtown italic uppercase text-xl flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
    >
        <Send size={20} />
        Enviar Mensaje
    </button>
    </form>
</section>
);
};

export default ContactForm;