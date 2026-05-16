import { MotionDiv } from '../ui/motion';

const AdminPedidosSkeleton = ({ count = 6 }) => (
    <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: count }).map((_, i) => (
            <MotionDiv
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className="border border-zinc-200 rounded-2xl p-6 animate-pulse"
            >
                <div className="h-3 w-24 bg-zinc-100 rounded mb-4" />
                <div className="h-6 w-3/4 bg-zinc-200 rounded mb-3" />
                <div className="h-4 w-1/2 bg-zinc-100 rounded mb-6" />
                <div className="h-9 w-32 bg-zinc-100 rounded-full" />
            </MotionDiv>
        ))}
    </div>
);

export default AdminPedidosSkeleton;
