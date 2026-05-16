import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Wrench, Store } from 'lucide-react';

const { p: MotionP, h1: MotionH1, span: MotionSpan } = motion;

const NAV = [
    { to: '/admin', label: 'Pedidos', icon: LayoutDashboard, end: true },
    { to: '/admin/wizard', label: 'Taller', icon: Wrench },
    { to: '/admin/comercial', label: 'Vidriera', icon: Store },
];

const AdminShell = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-white pb-24">
            <section className="bg-black text-white border-b border-zinc-800">
                <div className="container-page py-12 md:py-16">
                    <MotionP
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 mb-3"
                    >
                        Panel interno
                    </MotionP>
                    <MotionH1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="font-newtown italic uppercase text-4xl md:text-5xl text-white"
                    >
                        Administración
                    </MotionH1>
                </div>
            </section>

            <div className="container-page -mt-6">
                <nav
                    className="flex flex-wrap gap-2 p-1.5 bg-white border border-zinc-200 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                    aria-label="Secciones admin"
                >
                    {NAV.map((item) => {
                        const { to, label, icon: TabIcon, end } = item;
                        const active = end
                            ? location.pathname === to
                            : location.pathname.startsWith(to);
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    active
                                        ? 'text-white'
                                        : 'text-zinc-500 hover:text-black'
                                }`}
                            >
                                {active && (
                                    <MotionSpan
                                        layoutId="admin-tab"
                                        className="absolute inset-0 bg-black rounded-xl"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <TabIcon size={16} className="relative z-10" aria-hidden />
                                <span className="relative z-10">{label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="container-page mt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminShell;
