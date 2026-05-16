import { useEffect, useState } from 'react';
import { formatTicket, buildPublicSeguimientoUrl } from '../../utils/ticket';

const SIZES = {
    sm: 96,
    md: 160,
    lg: 220,
};

const PedidoQR = ({
    pedido,
    size = 'md',
    showTicket = true,
    className = '',
}) => {
    const ticket = formatTicket(pedido?.idCorto || pedido?.id);
    const px = SIZES[size] || SIZES.md;

    const trackingText =
        pedido?.qrContenido ||
        (pedido?.idCorto || pedido?.id ? buildPublicSeguimientoUrl(pedido.idCorto || pedido.id) : '');

    const [dataUrl, setDataUrl] = useState(null);
    const [localPending, setLocalPending] = useState(false);

    useEffect(() => {
        if (pedido?.qrUrl) {
            setDataUrl(null);
            setLocalPending(false);
            return;
        }
        if (!trackingText) {
            setDataUrl(null);
            setLocalPending(false);
            return;
        }
        let cancelled = false;
        setLocalPending(true);
        import('qrcode')
            .then((QRCode) => {
                const q = QRCode.default ?? QRCode;
                return q.toDataURL(trackingText, {
                    width: px,
                    margin: 2,
                    errorCorrectionLevel: 'H',
                    color: { dark: '#000000', light: '#FFFFFF' },
                });
            })
            .then((url) => {
                if (!cancelled) setDataUrl(url);
            })
            .catch(() => {
                if (!cancelled) setDataUrl(null);
            })
            .finally(() => {
                if (!cancelled) setLocalPending(false);
            });
        return () => {
            cancelled = true;
        };
    }, [pedido?.qrUrl, trackingText, px]);

    const imgSrc = pedido?.qrUrl || dataUrl;

    if (!imgSrc) {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div
                    className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 flex items-center justify-center text-zinc-400 text-xs text-center px-3"
                    style={{ width: px, height: px }}
                >
                    {localPending ? 'Generando QR…' : 'QR no disponible'}
                </div>
                {showTicket && (
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                        {ticket}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
                <img
                    src={imgSrc}
                    alt={`Código QR del ticket ${ticket}`}
                    width={px}
                    height={px}
                    className="block object-contain"
                />
            </div>
            {showTicket && (
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    {ticket}
                </p>
            )}
        </div>
    );
};

export default PedidoQR;
