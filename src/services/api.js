import { auth } from './firebaseConfig';

const API_BASE = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const API_KEY = import.meta.env.VITE_SERVICE_JJ_API_KEY;

function apiUrl(path) {
    if (!API_BASE) {
        throw new Error(
            'Falta VITE_API_URL en .env del frontend (ej. http://localhost:5000/api)'
        );
    }
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE}${p}`;
}

async function parseResponse(response) {
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();
    const isJson = contentType.includes('application/json');

    let data = {};
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = {};
        }
    }

    if (!response.ok) {
        const mensaje =
            data.mensaje ||
            data.message ||
            data.error ||
            `Error del servidor (${response.status})`;
        const error = new Error(mensaje);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    if (!isJson && text && text.trimStart().startsWith('<')) {
        const err = new Error(
            'La API devolvió HTML en lugar de JSON. Revisá VITE_API_URL (debe apuntar al backend, ej. http://localhost:5000/api).'
        );
        err.status = response.status;
        throw err;
    }

    return data;
}

async function getAdminToken() {
    const user = auth.currentUser;
    if (!user) throw new Error('Debes iniciar sesión como administrador');
    return user.getIdToken();
}

async function adminFetch(path, options = {}) {
    const token = await getAdminToken();
    const headers = {
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(apiUrl(path), {
        ...options,
        headers,
    });

    return parseResponse(response);
}

function authHeaders(extra = {}) {
    return { 'x-api-key': API_KEY, ...extra };
}

function normalizeTicket(idCorto) {
    let ticket = idCorto.trim().toUpperCase();
    if (!ticket.startsWith('SJ-')) {
        ticket = `SJ-${ticket}`;
    }
    return ticket;
}

export const serviceApi = {
    buscarPedido: async (idCorto) => {
        const ticketLimpio = normalizeTicket(idCorto);
        const data = await adminFetch(`/pedidos/ticket/${encodeURIComponent(ticketLimpio)}`);
        return data.pedido;
    },

    getPedidos: async () => {
        const data = await adminFetch('/pedidos');
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.pedidos)) return data.pedidos;
        return [];
    },

    createPedido: async (formData) => {
        const response = await fetch(apiUrl('/pedidos'), {
            method: 'POST',
            headers: authHeaders(),
            body: formData,
        });
        return parseResponse(response);
    },

    updatePedido: async (id, body) =>
        adminFetch(`/pedidos/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }),

    deletePedido: async (id) =>
        adminFetch(`/pedidos/${encodeURIComponent(id)}`, { method: 'DELETE' }),

    consultarSeguimiento: async (idCorto) => {
        const ticketLimpio = normalizeTicket(idCorto);
        const response = await fetch(
            apiUrl(`/pedidos/seguimiento/${encodeURIComponent(ticketLimpio)}`)
        );
        return parseResponse(response);
    },

    reclamarPedidos: async (data) => {
        const response = await fetch(apiUrl('/pedidos/reclamar'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email?.trim().toLowerCase(),
                clienteId: data.clienteId ?? null,
            }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
            const error = new Error(
                result.mensaje || result.message || `Error ${response.status}`
            );
            error.status = response.status;
            throw error;
        }
        return result;
    },

    enviarConsultaContacto: async ({ nombre, email, mensaje }) => {
        const response = await fetch(apiUrl('/contact'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify({ nombre, email, mensaje }),
        });
        return parseResponse(response);
    },

    getProductosPublicos: async () => {
        const response = await fetch(apiUrl('/productos'));
        const data = await parseResponse(response);
        return data.productos || [];
    },

    getProductosAdmin: async () => {
        const data = await adminFetch('/productos');
        if (!Array.isArray(data.productos)) {
            throw new Error('Respuesta inválida: no se recibió la lista de productos');
        }
        return data.productos;
    },

    createProducto: async (formData) =>
        adminFetch('/productos', { method: 'POST', body: formData }),

    updateProducto: async (id, formData) =>
        adminFetch(`/productos/${encodeURIComponent(id)}`, { method: 'PUT', body: formData }),

    deleteProducto: async (id) =>
        adminFetch(`/productos/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};

export { normalizeTicket };
