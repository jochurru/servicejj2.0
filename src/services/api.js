// Usamos las variables del .env.local
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_SERVICE_JJ_API_KEY;

export const serviceApi = {
crearPedido: async (datosPedido) => {
// Validamos que la URL y la Key existan antes de tirar el fetch
if (!API_BASE_URL || !API_KEY) {
    console.error("Faltan variables de entorno en el Frontend");
    throw new Error("Error de configuración del cliente");
}

const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY // Aquí viaja la llave protegida
    },
    body: JSON.stringify(datosPedido)
});

if (!response.ok) {
    const error = await response.json();
    throw new Error(error.mensaje || 'Error en la conexión');
}

return await response.json();
}
};