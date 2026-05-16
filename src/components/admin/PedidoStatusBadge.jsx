const STYLES = {
    pendiente: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    'en reparación': 'bg-zinc-900 text-white border-black',
    'en revision': 'bg-zinc-900 text-white border-black',
    listo: 'bg-white text-black border-black',
    entregado: 'bg-zinc-50 text-zinc-500 border-zinc-200',
    cancelado: 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through',
};

const PedidoStatusBadge = ({ estado }) => {
    const key = (estado || 'pendiente').toLowerCase();
    const style = STYLES[key] || STYLES.pendiente;

    return (
        <span
            className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border rounded-full ${style}`}
        >
            {estado || 'pendiente'}
        </span>
    );
};

export default PedidoStatusBadge;
