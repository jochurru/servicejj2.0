import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAdmin();

    if (loading) {
        return (
            <div className="pt-40 text-center font-newtown italic text-xl uppercase animate-pulse">
                Verificando acceso...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return (
            <div className="pt-40 px-4 text-center max-w-lg mx-auto">
                <p className="font-newtown italic uppercase text-2xl text-slate-800 mb-4">
                    Acceso restringido
                </p>
                <p className="text-slate-500">
                    Esta sección es solo para personal autorizado del taller.
                </p>
            </div>
        );
    }

    return children;
};

export default AdminRoute;
