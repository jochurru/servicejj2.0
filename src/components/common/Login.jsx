import React from 'react';
import { auth, provider, db } from "../../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const Login = () => {
const navigate = useNavigate();

const iniciarSesion = async () => {
try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    const userRef = doc(db, "usuarios", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
    await setDoc(userRef, {
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL,
        rol: "cliente", 
        fechaRegistro: serverTimestamp(),
        ultimoAcceso: serverTimestamp()
    });
    } else {
    await setDoc(userRef, { ultimoAcceso: serverTimestamp() }, { merge: true });
    }

    navigate("/"); 
} catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Hubo un problema al iniciar sesión. Por favor, intentá de nuevo.");
}
};

return (
<div className="flex items-center justify-center min-h-[60vh] px-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
    <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 font-newtown italic uppercase">
        Bienvenido
        </h2>
        <p className="text-slate-500">
        Iniciá sesión para gestionar tus pedidos y acceder al soporte técnico.
        </p>
    </div>

    <button 
        onClick={iniciarSesion}
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-black hover:border-blue-600 hover:bg-slate-50 text-black font-newtown italic uppercase py-3 px-4 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
    >
        <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google" 
        className="w-6 h-6"
        />
        <span>Continuar con Google</span>
    </button>

    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 leading-relaxed">
        Al ingresar, aceptás nuestros <br />
        <a href="/terminos" className="text-blue-500 hover:underline font-bold">Términos de Servicio</a> y <a href="/privacidad" className="text-blue-500 hover:underline font-bold">Política de Privacidad</a>.
        </p>
    </div>
    </div>
</div>
);
};

export default Login;