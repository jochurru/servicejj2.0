import { useState, useEffect } from 'react';

const WapButton = () => {
const [showPulse, setShowPulse] = useState(true);

const nro = "5491151765077";
const msj = "Hola Service JJ, necesito presupuesto por:";
const link = `https://wa.me/${nro}?text=${encodeURIComponent(msj)}`;

useEffect(() => {
// Después de 5 segundos, cambiamos el estado para que desaparezca el pulso
const timer = setTimeout(() => {
    setShowPulse(false);
}, 5000);

return () => clearTimeout(timer); // Limpieza del timer si el componente se desmonta
}, []); // Se ejecuta cada vez que el botón se monta (cambio de sección o recarga)

return (
<a 
    href={link}
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 transition-transform hover:scale-110 active:scale-95 drop-shadow-2xl"
>
    <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp Service JJ" 
        className="w-16 h-16 md:w-20 md:h-20" 
    />
    
    {/* El pulso solo se renderiza si showPulse es true */}
    {showPulse && (
        <span className="absolute inset-0 rounded-full bg-green-500 -z-10 animate-ping opacity-30"></span>
    )}
</a>
);
};

export default WapButton;