import { useState } from 'react';
import Swal from 'sweetalert2';
import { Send } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { FadeIn } from '../ui/FadeIn';
import { serviceApi } from '../../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await serviceApi.enviarConsultaContacto({
        nombre: formData.nombre,
        email: formData.email,
        mensaje: formData.mensaje,
      });
      Swal.fire({
        title: '¡Consulta enviada!',
        text: 'Te responderemos en menos de 24 horas.',
        icon: 'success',
        confirmButtonColor: '#000',
      });
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (err) {
      Swal.fire({
        title: 'No se pudo enviar',
        text: err.message || 'Probá de nuevo en unos minutos.',
        icon: 'error',
        confirmButtonColor: '#000',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section-pad bg-neutral-50">
      <div className="container-page max-w-2xl">
        <SectionHeader badge="Contacto" title="¿Tenés una consulta?" subtitle="Completá el formulario y nos pondremos en contacto." />
        <FadeIn>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl border border-neutral-200">
            <div>
              <label className="label-field" htmlFor="nombre">Nombre</label>
              <input id="nombre" required type="text" className="input-field" placeholder="Tu nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
            </div>
            <div>
              <label className="label-field" htmlFor="email">Email</label>
              <input id="email" required type="email" className="input-field" placeholder="tu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="label-field" htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" required rows={4} className="input-field resize-none" placeholder="Ej: Presupuesto para instalación de split" value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} />
            </div>
            <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-50">
              {sending ? 'Enviando...' : <><Send size={16} /> Enviar mensaje</>}
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactForm;
