import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAdmin } from '../../hooks/useAdmin';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children, requireAdmin = true }) => {
    const location = useLocation();
    const { user, loading: authLoading } = useAuth();
    const { isAdmin, loading: roleLoading } = useAdmin();

    if (authLoading || roleLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center pt-24">
                <LoadingSpinner label="Verificando acceso..." />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
