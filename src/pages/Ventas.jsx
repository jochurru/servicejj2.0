import { ShoppingCart, Plus } from 'lucide-react';

const PRODUCTOS_PRUEBA = [
{ id: 1, nombre: "Placa Main Universal", precio: 45000, categoria: "Repuestos", imagen: "https://via.placeholder.com/300" },
{ id: 2, nombre: "Control Remoto Smart", precio: 8500, categoria: "Accesorios", imagen: "https://via.placeholder.com/300" },
{ id: 3, nombre: "Tira LED 32 pulg.", precio: 12000, categoria: "Repuestos", imagen: "https://via.placeholder.com/300" },
{ id: 4, nombre: "Compresor 1/4 HP", precio: 89000, categoria: "Climatización", imagen: "https://via.placeholder.com/300" },
];

const Ventas = () => {
return (
<div className="max-w-6xl mx-auto px-4 py-12">
    <div className="flex justify-between items-end mb-12">
    <div>
        <h1 className="font-newtown text-5xl italic uppercase">Ventas</h1>
        <p className="text-slate-500 font-sans uppercase tracking-widest text-xs mt-2">Catálogo de repuestos y equipos</p>
    </div>
    
    <div className="relative p-3 border-2 border-black cursor-pointer hover:bg-black hover:text-white transition-all">
        <ShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-white">0</span>
    </div>
    </div>

    {/* GRILLA ACTUALIZADA: 4 columnas y menos espacio (gap-6) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {PRODUCTOS_PRUEBA.map((prod) => (
        <div 
        key={prod.id} 
        className="group bg-white border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col"
        >
        {/* Imagen con proporción 4:3 para que no sea tan alta */}
        <div className="relative aspect-4/3 overflow-hidden border-b-2 border-black bg-gray-50">
            <img 
            src={prod.imagen} 
            alt={prod.nombre} 
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase italic">
            {prod.categoria}
            </div>
        </div>
        
        {/* Contenido compacto */}
        <div className="p-4 flex flex-col grow">
            <h3 className="font-newtown text-lg italic uppercase leading-tight mb-2 min-h-10">
            {prod.nombre}
            </h3>
            <div className="mt-auto flex justify-between items-center">
            <span className="text-xl font-bold text-slate-900">${prod.precio}</span>
            <button className="bg-black text-white p-2 hover:bg-emerald-500 transition-colors">
                <Plus size={18} />
            </button>
            </div>
        </div>
        </div>
    ))}
    </div>
</div>
);
};

export default Ventas;