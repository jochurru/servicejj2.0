const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_SERVICE_JJ_API_KEY;

export const serviceApi = {
    // 1. Obtener todos los pedidos (Vista Admin)
    getPedidos: async () => {
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            headers: { 'x-api-key': API_KEY }
        });
        return await response.json();
    },

    // 2. Crear Pedido (Usa FormData para que las fotos viajen bien)
    createPedido: async (formData) => {
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            method: 'POST',
            headers: { 'x-api-key': API_KEY },
            body: formData // No ponemos Content-Type, el navegador lo hace solo con FormData
        });
        return await response.json();
    },

    // 3. Seguimiento Público (Lo que usará el QR)
consultarSeguimiento: async (idCorto) => {
    // 1. Limpiamos espacios y pasamos a mayúsculas
    let ticketLimpio = idCorto.trim().toUpperCase();

    // 2. 🧠 Filtro Inteligente: Si el usuario no puso el "SJ-", se lo agregamos.
    // Esto evita el 404 porque el Backend espera "SJ-XXXX"
    if (!ticketLimpio.startsWith('SJ-')) {
        ticketLimpio = `SJ-${ticketLimpio}`;
    }


    const response = await fetch(`${API_BASE_URL}/pedidos/seguimiento/${ticketLimpio}`);
    
    if (!response.ok) throw new Error("Ticket no encontrado");
    return await response.json();
},

    // 4. Vincular pedidos anteriores (Reclamo)
    reclamarPedidos: async (data) => {
        const response = await fetch(`${API_BASE_URL}/pedidos/reclamar`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_KEY 
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
};