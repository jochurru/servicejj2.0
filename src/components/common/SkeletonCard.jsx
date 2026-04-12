const SkeletonCard = () => (
    <div className="bg-white rounded-3xl p-8 h-72 w-full border-2 border-slate-50 flex flex-col items-center justify-center shadow-sm animate-pulse">
        <div className="w-20 h-20 bg-slate-200 rounded-full mb-6"></div>
        <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded-full w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded-full w-2/3"></div>
        <div className="mt-auto h-8 bg-slate-200 rounded-xl w-1/2"></div>
    </div>
    );

    export default SkeletonCard;