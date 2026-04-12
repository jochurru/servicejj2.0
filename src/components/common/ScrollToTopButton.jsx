import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
const [isVisible, setIsVisible] = useState(false);

// Lógica para mostrar/ocultar el botón según el scroll
useEffect(() => {
const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
    setIsVisible(true);
    } else {
    setIsVisible(false);
    }
};

window.addEventListener('scroll', toggleVisibility);
return () => window.removeEventListener('scroll', toggleVisibility);
}, []);

const scrollToTop = () => {
window.scrollTo({
    top: 0,
    behavior: 'smooth',
});
};

return (
<button
    onClick={scrollToTop}
    className={`fixed bottom-8 right-30 p-4 rounded-full bg-blue-600 text-white shadow-2xl transition-all duration-300 z-50 hover:bg-black hover:scale-110 active:scale-95 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}
    aria-label="Volver arriba"
>
    <ChevronUp size={24} strokeWidth={3} />
</button>
);
};

export default ScrollToTopButton;