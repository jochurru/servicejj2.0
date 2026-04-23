import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode, CameraOff, X } from 'lucide-react';
import { Html5QrcodeScanner } from "html5-qrcode"; // Asegurate de tener esta librería instalada

const BusquedaPedido = () => {
    const [idTicket, setIdTicket] = useState('');
    const [tieneCamara, setTieneCamara] = useState(false);
    const [isScanning, setIsScanning] = useState(false); // Nuevo estado para el modal del QR
    const navigate = useNavigate();

    // 1. Chequeo de cámara
    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    const videoDevices = devices.filter(device => device.kind === 'videoinput');
                    setTieneCamara(videoDevices.length > 0);
                })
                .catch(() => setTieneCamara(false));
        }
    }, []);

    // 2. Lógica del Scanner QR (Solo se activa si isScanning es true)
    useEffect(() => {
        let scanner = null;
        if (isScanning) {
            scanner = new Html5QrcodeScanner("reader-home", {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            });

            scanner.render(
                (decodedText) => {
                    // Extraemos el código si es una URL o lo usamos directo
                    const partes = decodedText.split('/');
                    const code = partes[partes.length - 1].toUpperCase().trim();
                    
                    setIsScanning(false);
                    scanner.clear();
                    navigate(`/seguimiento/${code}`);
                },
                () => { /* Silencioso */ }
            );
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(err => console.error("Error al limpiar", err));
            }
        };
    }, [isScanning, navigate]);

    const handleBuscar = (e) => {
        e.preventDefault();
        if (idTicket.trim()) {
            // Quitamos el "SJ-" si el cliente lo escribió a mano para no duplicar
            const code = idTicket.trim().toUpperCase().replace('SJ-', '');
            navigate(`/seguimiento/${code}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl border-2 border-slate-100 relative">
            
            {/* MODAL DEL SCANNER (Sobrepuesto) */}
            {isScanning && (
                <div className="absolute inset-0 z-50 bg-white rounded-3xl p-4 flex flex-col items-center justify-center">
                    <button 
                        onClick={() => setIsScanning(false)}
                        className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                    <div id="reader-home" className="w-full overflow-hidden rounded-2xl"></div>
                    <p className="mt-4 text-[10px] font-black uppercase text-slate-400 animate-pulse">Escaneando ticket...</p>
                </div>
            )}

            <h3 className="font-newtown italic text-xl uppercase mb-4 text-center">
                Consultá tu <span className="text-blue-600">Reparación</span>
            </h3>

            <form onSubmit={handleBuscar} className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="EJ: SJ-X4Y8"
                        value={idTicket}
                        onChange={(e) => setIdTicket(e.target.value)}
                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-bold transition-all uppercase"
                    />
                    <button 
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {tieneCamara ? (
                    <button
                        type="button"
                        onClick={() => setIsScanning(true)} // Activa el scanner
                        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-400 text-blue-600 rounded-2xl font-bold text-xs uppercase hover:bg-blue-50 transition-all"
                    >
                        <QrCode size={18} />
                        Escanear Código QR
                    </button>
                ) : (
                    <div className="flex items-center justify-center gap-2 py-3 text-slate-400 text-[10px] uppercase font-bold">
                        <CameraOff size={14} />
                        Cámara no detectada
                    </div>
                )}
            </form>
        </div>
    );
};

export default BusquedaPedido;