const Terminos = () => {
return (
<div className="max-w-4xl mx-auto px-4 py-20 font-sans">
    <h1 className="font-newtown text-4xl italic uppercase mb-8">Términos y Condiciones</h1>
    <div className="space-y-6 text-slate-700 leading-relaxed">
    <section>
        <h2 className="font-bold text-black uppercase tracking-wider mb-2">1. Garantía de Servicio</h2>
        <p>Todas nuestras reparaciones cuentan con garantía escrita. El tiempo de la misma se especificará en el remito de entrega y cubre exclusivamente la falla reparada.</p>
    </section>

    <section>
        <h2 className="font-bold text-black uppercase tracking-wider mb-2">2. Productos a la Venta</h2>
        <p>Los artículos reacondicionados son probados exhaustivamente antes de la venta. Se entregan en el estado que se visualiza en las fotos y cuentan con el período de garantía detallado en el catálogo.</p>
    </section>

    <section>
        <h2 className="font-bold text-black uppercase tracking-wider mb-2">3. Presupuestos</h2>
        <p>Los presupuestos tienen una validez de 7 días corridos debido a la volatilidad de precios en repuestos.</p>
    </section>
    
    <section className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600">
        <p className="italic text-blue-900 font-medium">
        "Al utilizar nuestros servicios, el cliente acepta estas condiciones para garantizar una transacción transparente y profesional."
        </p>
    </section>
    </div>
</div>
);
};
export default Terminos;