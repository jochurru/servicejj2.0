const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_SERVICE_JJ_API_KEY;

async function parseResponse(response) {
    const data = await response.json().catch(() => ({}));

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

    return data;
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
        const response = await fetch(
            `${API_BASE_URL}/pedidos/ticket/${encodeURIComponent(ticketLimpio)}`,
            { headers: authHeaders() }
        );
        const data = await parseResponse(response);
        return data.pedido;
    },

    getPedidos: async () => {
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            headers: authHeaders(),
        });
        return parseResponse(response);
    },

    createPedido: async (formData) => {
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            method: 'POST',
            headers: authHeaders(),
            body: formData,
        });
        return parseResponse(response);
    },

    updatePedido: async (id, body) => {
        const response = await fetch(`${API_BASE_URL}/pedidos/${id}`, {
            method: 'PUT',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(body),
        });
        return parseResponse(response);
    },

    deletePedido: async (id) => {
        const response = await fetch(`${API_BASE_URL}/pedidos/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        return parseResponse(response);
    },

    consultarSeguimiento: async (idCorto) => {
        const ticketLimpio = normalizeTicket(idCorto);
        const response = await fetch(
            `${API_BASE_URL}/pedidos/seguimiento/${encodeURIComponent(ticketLimpio)}`
        );
        return parseResponse(response);
    },

    reclamarPedidos: async (data) => {
        const response = await fetch(`${API_BASE_URL}/pedidos/reclamar`, {
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
};

export { normalizeTicket };
