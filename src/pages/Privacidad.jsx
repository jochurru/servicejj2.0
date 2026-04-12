const Privacidad = () => {
return (
<div className="max-w-4xl mx-auto px-4 py-20 font-sans">
    <h1 className="font-newtown text-4xl italic uppercase mb-8">Política de Privacidad</h1>
    <div className="space-y-6 text-slate-700 leading-relaxed">
    <p>En <strong>Service JJ</strong>, valoramos tu privacidad. Esta política explica cómo manejamos tu información.</p>
    
    <section>
        <h2 className="font-bold text-black uppercase tracking-wider mb-2">1. Datos Recolectados</h2>
        <p>Solo recolectamos los datos que nos proporcionas voluntariamente a través de WhatsApp o llamadas telefónicas para coordinar servicios técnicos o ventas.</p>
    </section>

    <section>
        <h2 className="font-bold text-black uppercase tracking-wider mb-2">2. Uso de la Información</h2>
        <p>Tu información se utiliza exclusivamente para: Proveer presupuestos, realizar reparaciones y gestionar la entrega de productos comprados.</p>
    </section>

    <section>
        <h2 className="font-bold text-black uppercase tracking-wider mb-2">3. No compartimos datos</h2>
        <p>No vendemos ni compartimos tus datos personales con terceros bajo ninguna circunstancia.</p>
    </section>
    </div>
</div>
);
};
export default Privacidad;