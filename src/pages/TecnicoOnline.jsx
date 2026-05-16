import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Loader2, Upload, X } from 'lucide-react';
import { serviceApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import PageHero from '../components/ui/PageHero';
import { FadeIn } from '../components/ui/FadeIn';
import TicketQR from '../components/common/TicketQR';

const STEPS = ['Tus datos', 'El equipo', 'Falla y fotos'];

const TecnicoOnline = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '', telefono: '', email: '', equipo: '', modelo: '', falla: '', fotos: [], aceptaTerminos: false,
  });
  const [loading, setLoading] = useState(false);
  const [ticketCreado, setTicketCreado] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nombre: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.fotos.length + files.length > 5) {
      return Swal.fire('Máximo 5 fotos', 'Podés subir hasta 5 imágenes del equipo.', 'warning');
    }
    const newPhotos = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setFormData({ ...formData, fotos: [...formData.fotos, ...newPhotos] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataParaEnviar = new FormData();
      dataParaEnviar.append('nombre', formData.nombre);
      dataParaEnviar.append('telefono', formData.telefono);
      dataParaEnviar.append('email', formData.email);
      dataParaEnviar.append('equipo', formData.equipo);
      dataParaEnviar.append('modelo', formData.modelo);
      dataParaEnviar.append('falla', formData.falla);
      dataParaEnviar.append('aceptaTerminos', formData.aceptaTerminos);
      dataParaEnviar.append('clienteId', user ? user.uid : 'null');
      formData.fotos.forEach((foto) => dataParaEnviar.append('fotos', foto.file));

      const response = await serviceApi.createPedido(dataParaEnviar);
      setTicketCreado({
        idCorto: response.idCorto,
        qrUrl: response.qrUrl,
        qrContenido: response.qrContenido,
        equipo: formData.equipo,
      });
      Swal.fire({
        title: '¡Pedido recibido!',
        html: `<p class="text-sm">Tu ticket: <strong>${response.idCorto}</strong></p><p class="text-xs text-zinc-500 mt-2">Guardá el QR para consultar el estado en cualquier momento.</p>`,
        icon: 'success',
        confirmButtonColor: '#000',
      });
      formData.fotos.forEach((f) => URL.revokeObjectURL(f.preview));
      setFormData({
        nombre: user ? user.displayName : '',
        telefono: '', email: user ? user.email : '',
        equipo: '', modelo: '', falla: '', fotos: [], aceptaTerminos: false,
      });
      setStep(0);
      if (e.target) e.target.reset();
    } catch (error) {
      const titulo = error.status === 429 ? 'Demasiados intentos' : 'Error';
      Swal.fire(titulo, error.message || 'No pudimos conectar con el servidor.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const canNext = () => {
    if (step === 0) return formData.nombre && formData.telefono && formData.email;
    if (step === 1) return formData.equipo && formData.modelo;
    return formData.falla && formData.aceptaTerminos;
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        badge="Técnico online"
        title="Creá tu pedido en minutos"
        subtitle="Subí fotos, describí la falla y recibí un presupuesto preliminar con ticket de seguimiento."
      />

      <section className="section-pad pt-0">
        <FadeIn className="container-page max-w-2xl">
          <div className="flex gap-2 mb-10">
            {STEPS.map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1 rounded-full mb-2 ${i <= step ? 'bg-black' : 'bg-neutral-200'}`} />
                <span className={`text-[10px] uppercase tracking-wider ${i === step ? 'text-black font-semibold' : 'text-neutral-400'}`}>{label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-8">
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="label-field">Nombre</label>
                  <input type="text" className="input-field" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required readOnly={!!user} />
                </div>
                <div>
                  <label className="label-field">WhatsApp</label>
                  <input type="tel" className="input-field" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required placeholder="11 1234-5678" />
                </div>
                <div>
                  <label className="label-field">Email</label>
                  <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required readOnly={!!user} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-field">Marca / Equipo</label>
                  <input type="text" className="input-field" placeholder="Samsung" value={formData.equipo} onChange={(e) => setFormData({ ...formData, equipo: e.target.value })} required />
                </div>
                <div>
                  <label className="label-field">Modelo</label>
                  <input type="text" className="input-field" placeholder="UN55NU7100" value={formData.modelo} onChange={(e) => setFormData({ ...formData, modelo: e.target.value })} required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="label-field">Descripción de la falla</label>
                  <textarea rows={4} className="input-field resize-none" value={formData.falla} onChange={(e) => setFormData({ ...formData, falla: e.target.value })} required placeholder="Contanos qué le pasa al equipo..." />
                </div>
                <div>
                  <label className="label-field">Fotos (máx. 5)</label>
                  <label className="flex items-center justify-center gap-2 py-8 border border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-black hover:bg-white transition-colors">
                    <Upload size={20} />
                    <span className="text-sm font-medium">Subir imágenes</span>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {formData.fotos.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mt-3">
                      {formData.fotos.map((foto, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200">
                          <img src={foto.preview} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setFormData({ ...formData, fotos: formData.fotos.filter((_, i) => i !== index) })} className="absolute top-0.5 right-0.5 p-0.5 bg-black text-white rounded-full">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed p-4 bg-white rounded-xl border border-neutral-200">
                  El presupuesto es preliminar. En casos complejos puede requerirse visita técnica presencial.
                </p>
                <label className="flex items-start gap-3 cursor-pointer text-sm text-neutral-600">
                  <input type="checkbox" required checked={formData.aceptaTerminos} onChange={(e) => setFormData({ ...formData, aceptaTerminos: e.target.checked })} className="mt-1" />
                  <span>Acepto los <Link to="/terminos" className="underline">Términos</Link> y <Link to="/privacidad" className="underline">Privacidad</Link>.</span>
                </label>
              </div>
            )}

            <div className="flex gap-3 mt-8 pt-6 border-t border-neutral-200">
              {step > 0 && (
                <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary flex-1">Atrás</button>
              )}
              {step < 2 ? (
                <button type="button" disabled={!canNext()} onClick={() => setStep(step + 1)} className="btn-primary flex-1 disabled:opacity-40">Siguiente</button>
              ) : (
                <button type="submit" disabled={loading || !canNext()} className="btn-primary flex-1 disabled:opacity-50">
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Enviando...</> : 'Enviar pedido'}
                </button>
              )}
            </div>
          </form>

          {ticketCreado && (
            <div className="mt-12">
              <TicketQR
                idCorto={ticketCreado.idCorto}
                equipo={ticketCreado.equipo}
                qrUrl={ticketCreado.qrUrl}
                qrContenido={ticketCreado.qrContenido}
              />
            </div>
          )}
        </FadeIn>
      </section>
    </div>
  );
};

export default TecnicoOnline;
