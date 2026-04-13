// Usamos las variables del .env.local
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_SERVICE_JJ_API_KEY;

export const serviceApi = {
    /**
     * @param {FormData} dataParaEnviar - Ahora recibe un objeto FormData en lugar de un JSON
     */
    crearPedido: async (dataParaEnviar) => {
        // 1. Validamos configuración
        if (!API_BASE_URL || !API_KEY) {
            console.error("Faltan variables de entorno en el Frontend");
            throw new Error("Error de configuración del cliente");
        }

        // 2. Ejecutamos la petición
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                // IMPORTANTE: Al enviar FormData, NO debemos definir el Content-Type.
                // El navegador detectará los archivos y pondrá 'multipart/form-data' automáticamente.
                'x-api-key': API_KEY 
            },
            body: dataParaEnviar // Aquí viaja el FormData con las fotos y el texto
        });

        // 3. Manejo de respuesta
        if (!response.ok) {
            // Intentamos leer el error del backend (500, 403, 400, etc.)
            const error = await response.json();
            throw new Error(error.mensaje || 'Error en la conexión con el servidor');
        }

        return await response.json();
    }
};