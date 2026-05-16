import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const { div: MotionDiv, article: MotionArticle } = motion;
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { serviceApi } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import PedidoStatusBadge from '../../components/admin/PedidoStatusBadge';
import AdminPedidosSkeleton from '../../components/admin/AdminPedidosSkeleton';
import PedidoQR from '../../components/common/PedidoQR';

const formatTicket = (pedido) => {
    const id = pedido.idCorto || pedido.id;
    if (!id) return '—';
    return String(id).startsWith('SJ-') ? id : `SJ-${id}`;
};

const AdminDashboard = () => {
    const { user } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargar = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        try {
            const lista = await serviceApi.getPedidos();
            setPedidos(lista);
        } catch (err) {
            let mensaje = err.message || 'No se pudieron cargar los pedidos';
            if (mensaje.includes('Llave de API')) {
                mensaje +=
                    ' Reiniciá el servidor backend (npm run dev) para aplicar la autenticación con Google.';
            }
            setError(mensaje);
            setPedidos([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        cargar();
    }, [cargar]);

    return (
        <section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="font-newtown italic uppercase text-2xl md:text-3xl text-black">
                        Pedidos técnicos
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1 font-sans normal-case tracking-normal">
                        Estado en tiempo real del taller. Seleccioná un pedido para gestionarlo.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={cargar}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-zinc-200 rounded-full hover:border-black transition-colors disabled:opacity-40"
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    Actualizar
                </button>
            </div>

            {error && (
                <p className="mb-6 text-sm text-red-600 border border-red-200 bg-red-50 px-4 py-3 rounded-xl">
                    {error}
                </p>
            )}

            {loading ? (
                <AdminPedidosSkeleton />
            ) : error ? null : pedidos.length === 0 ? (
                <p className="text-center py-20 text-zinc-400 font-medium">
                    No hay pedidos registrados todavía.
                </p>
            ) : (
                <MotionDiv
                    className="grid gap-4 md:grid-cols-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.06 } },
                    }}
                >
                    {pedidos.map((pedido) => {
                        const ticket = formatTicket(pedido);
                        return (
                            <MotionArticle
                                key={pedido.id}
                                variants={{
                                    hidden: { opacity: 0, y: 16 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ y: -3 }}
                                className="group border border-zinc-200 rounded-2xl p-6 bg-white hover:border-black transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <PedidoQR pedido={pedido} size="sm" showTicket={false} />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                                            {ticket}
                                        </span>
                                        <PedidoStatusBadge estado={pedido.estado} />
                                    </div>
                                </div>
                                <h3 className="font-newtown text-xl uppercase italic text-black mb-1">
                                    {pedido.equipo}
                                </h3>
                                <p className="text-sm text-zinc-500 mb-1 font-sans normal-case">
                                    {pedido.nombre} · {pedido.telefono}
                                </p>
                                <p className="text-sm text-zinc-400 line-clamp-2 font-sans normal-case italic mb-6">
                                    {pedido.falla}
                                </p>
                                <Link
                                    to={`/admin/wizard?ticket=${encodeURIComponent(ticket)}`}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-black border border-black px-4 py-2 rounded-full group-hover:bg-black group-hover:text-white transition-all"
                                >
                                    Ver detalles
                                    <ArrowUpRight size={16} />
                                </Link>
                            </MotionArticle>
                        );
                    })}
                </MotionDiv>
            )}
        </section>
    );
};

export default AdminDashboard;