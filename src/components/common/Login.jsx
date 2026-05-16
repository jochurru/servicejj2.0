import { useEffect } from 'react';
import { auth, provider } from '../../services/firebaseConfig';
import { signInWithRedirect } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) navigate(from, { replace: true });
    }, [user, loading, from, navigate]);

    const iniciarSesion = () => {
        signInWithRedirect(auth, provider).catch((error) => {
            console.error('Error al iniciar sesión:', error);
            alert('Hubo un problema al iniciar sesión. Por favor, intentá de nuevo.');
        });
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-zinc-200">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-newtown italic uppercase text-black mb-2">
                        Bienvenido
                    </h2>
                    <p className="text-zinc-500 font-sans normal-case tracking-normal">
                        Iniciá sesión con Google para gestionar tus pedidos y acceder al soporte técnico.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={iniciarSesion}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-black hover:bg-black hover:text-white text-black font-newtown italic uppercase py-3 px-4 transition-all duration-300"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="w-6 h-6"
                    />
                    <span>Continuar con Google</span>
                </button>
                <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans normal-case">
                        Al ingresar, aceptás nuestros <br />
                        <a href="/terminos" className="text-black font-medium underline">
                            Términos de Servicio
                        </a>{' '}
                        y{' '}
                        <a href="/privacidad" className="text-black font-medium underline">
                            Política de Privacidad
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
