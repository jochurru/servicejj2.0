const LoadingSpinner = ({ label = 'Cargando...' }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-4">
    <div className="w-10 h-10 border-2 border-neutral-200 border-t-black rounded-full animate-spin" />
    <p className="text-sm text-neutral-500 font-medium">{label}</p>
  </div>
);

export default LoadingSpinner;
