import React from 'react';
import { auth, provider } from "../../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Si tenés react-icons instalado, si no usamos la imagen de antes

const Login = () => {
const navigate = useNavigate();

const iniciarSesion = async () => {
try {
    const result = await signInWithPopup(auth, provider);
    console.log("¡Éxito!", result.user.displayName);
    navigate("/"); 
} catch (error) {
    console.error("Error al autenticar:", error.message);
}
};

return (
<div className="flex items-center justify-center min-h-[60vh] px-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
    
    {/* Encabezado del Card */}
    <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
        Bienvenido
        </h2>
        <p className="text-slate-500">
        Iniciá sesión para gestionar tus pedidos y acceder al soporte técnico.
        </p>
    </div>

    {/* Botón de Google Estilizado */}
    <button 
        onClick={iniciarSesion}
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm active:scale-95"
    >
        <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google" 
        className="w-6 h-6"
        />
        <span>Continuar con Google</span>
    </button>

    {/* Pie del Card */}
    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 leading-relaxed">
        Al ingresar, aceptás nuestros <br />
        <a href="/terminos" className="text-blue-500 hover:underline">Términos de Servicio</a> y <a href="/privacidad" className="text-blue-500 hover:underline">Política de Privacidad</a>.
        </p>
    </div>

    </div>
</div>
);
};

export default Login;