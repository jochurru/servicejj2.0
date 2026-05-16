import { Download, Printer } from 'lucide-react';
import PedidoQR from './PedidoQR';
import { formatTicket, buildPublicSeguimientoUrl } from '../../utils/ticket';

const TicketQR = ({ idCorto, equipo, qrUrl, qrContenido }) => {
    const ticket = formatTicket(idCorto);
    const pedido = {
        idCorto: ticket,
        qrUrl,
        qrContenido: qrContenido || buildPublicSeguimientoUrl(idCorto),
    };

    const descargarQr = async () => {
        try {
            if (qrUrl) {
                const res = await fetch(qrUrl);
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${ticket}-qr.png`;
                a.click();
                URL.revokeObjectURL(url);
                return;
            }
            const text = pedido.qrContenido;
            if (!text) return;
            const mod = await import('qrcode');
            const q = mod.default ?? mod;
            const dataUrl = await q.toDataURL(text, {
                width: 512,
                margin: 2,
                errorCorrectionLevel: 'H',
            });
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `${ticket}-qr.png`;
            a.click();
        } catch {
            if (qrUrl) window.open(qrUrl, '_blank');
        }
    };

    const puedeDescargar = !!(qrUrl || pedido.qrContenido);

    return (
        <div className="bg-white p-8 rounded-[40px] shadow-xl text-center border-2 border-zinc-200 max-w-sm mx-auto">
            <h3 className="font-newtown italic uppercase text-2xl mb-2 text-black">
                Ticket de ingreso
            </h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                Escaneá para seguir tu reparación
            </p>

            <PedidoQR pedido={pedido} size="lg" className="mb-6" />

            <p className="font-medium text-zinc-700 mb-6 italic font-sans normal-case">
                &quot;{equipo}&quot;
            </p>

            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 bg-black text-white p-4 rounded-2xl text-[10px] font-black uppercase"
                >
                    <Printer size={16} /> Imprimir
                </button>
                <button
                    type="button"
                    onClick={descargarQr}
                    disabled={!puedeDescargar}
                    className="flex items-center justify-center gap-2 border-2 border-black text-black p-4 rounded-2xl text-[10px] font-black uppercase disabled:opacity-40"
                >
                    <Download size={16} /> Descargar QR
                </button>
            </div>
        </div>
    );
};

export default TicketQR;
