export function formatTicket(idCorto) {
    if (!idCorto) return '—';
    const id = String(idCorto).trim().toUpperCase();
    if (id.startsWith('SJ-SJ-')) return id.replace('SJ-SJ-', 'SJ-');
    return id.startsWith('SJ-') ? id : `SJ-${id}`;
}

/** URL de seguimiento para generar QR en el cliente (fallback si no hay imagen en Cloudinary). */
export function buildPublicSeguimientoUrl(idCorto) {
    const ticket = formatTicket(idCorto);
    if (!ticket || ticket === '—') return '';
    const fromEnv =
        typeof import.meta !== 'undefined' ? import.meta.env?.VITE_PUBLIC_APP_URL : '';
    const origin =
        (fromEnv && String(fromEnv).trim()) ||
        (typeof window !== 'undefined' ? window.location.origin : '');
    const base = String(origin).replace(/\/$/, '');
    if (!base) return '';
    return `${base}/seguimiento/${encodeURIComponent(ticket)}`;
}
