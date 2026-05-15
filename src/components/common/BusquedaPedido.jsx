import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode, CameraOff, X } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const BusquedaPedido = () => {
  const [idTicket, setIdTicket] = useState('');
  const [tieneCamara, setTieneCamara] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => setTieneCamara(devices.some((d) => d.kind === 'videoinput')))
        .catch(() => setTieneCamara(false));
    }
  }, []);

  useEffect(() => {
    let scanner = null;
    if (isScanning) {
      scanner = new Html5QrcodeScanner('reader-home', { fps: 10, qrbox: { width: 250, height: 250 } });
      scanner.render(
        (decodedText) => {
          const code = decodedText.split('/').pop().toUpperCase().trim();
          setIsScanning(false);
          scanner.clear();
          navigate(`/seguimiento/${code}`);
        },
        () => {}
      );
    }
    return () => { if (scanner) scanner.clear().catch(() => {}); };
  }, [isScanning, navigate]);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (idTicket.trim()) {
      navigate(`/seguimiento/${idTicket.trim().toUpperCase().replace('SJ-', '')}`);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-white border border-neutral-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative">
      {isScanning && (
        <div className="absolute inset-0 z-50 bg-white rounded-2xl p-4 flex flex-col items-center justify-center">
          <button type="button" onClick={() => setIsScanning(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100">
            <X size={20} />
          </button>
          <div id="reader-home" className="w-full overflow-hidden rounded-xl" />
          <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400">Escaneando...</p>
        </div>
      )}

      <span className="badge mb-4">Seguimiento</span>
      <h3 className="font-newtown text-2xl mb-2">Consultá tu reparación</h3>
      <p className="text-sm text-neutral-500 mb-6">Ingresá tu ticket SJ-XXXX o escaneá el QR.</p>

      <form onSubmit={handleBuscar} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Ej: SJ-X4Y8"
            value={idTicket}
            onChange={(e) => setIdTicket(e.target.value)}
            className="input-field uppercase pr-14"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors">
            <Search size={18} />
          </button>
        </div>

        {tieneCamara ? (
          <button type="button" onClick={() => setIsScanning(true)} className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-neutral-300 rounded-xl text-sm font-medium hover:border-black hover:bg-neutral-50 transition-all">
            <QrCode size={18} /> Escanear QR
          </button>
        ) : (
          <p className="flex items-center justify-center gap-2 text-xs text-neutral-400 py-2">
            <CameraOff size={14} /> Cámara no detectada
          </p>
        )}
      </form>
    </div>
  );
};

export default BusquedaPedido;
