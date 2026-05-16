import ProtectedRoute from './ProtectedRoute';

/** @deprecated Usar ProtectedRoute directamente */
const AdminRoute = ({ children }) => (
    <ProtectedRoute>{children}</ProtectedRoute>
);

export default AdminRoute;
