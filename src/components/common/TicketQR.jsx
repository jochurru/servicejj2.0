import { QRCodeSVG } from 'qrcode.react';
import { Printer, Download } from 'lucide-react';

const TicketQR = ({ idCorto, equipo }) => {
// Esta es la URL que va a leer tu AdminWizard
const urlSeguimiento = `https://servicejj.vercel.app/seguimiento/${idCorto}`;

return (
<div className="bg-white p-8 rounded-[40px] shadow-xl text-center border-2 border-slate-100 max-w-sm mx-auto">
    <h3 className="font-newtown italic uppercase text-2xl mb-2">Ticket de Ingreso</h3>
    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">ID: {idCorto}</p>
    
    <div className="bg-slate-50 p-6 rounded-[30px] mb-6 flex justify-center border-2 border-dashed border-slate-200">
    <QRCodeSVG 
        value={urlSeguimiento} 
        size={200}
        bgColor={"#f8fafc"}
        fgColor={"#000000"}
        level={"H"} // Alta recuperación de errores
    />
    </div>

    <p className="font-bold text-slate-700 mb-6 italic">"{equipo}"</p>

    <div className="grid grid-cols-2 gap-4">
    <button onClick={() => window.print()} className="flex items-center justify-center gap-2 bg-black text-white p-4 rounded-2xl text-[10px] font-black uppercase">
        <Printer size={16} /> Imprimir
    </button>
    <button className="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-2xl text-[10px] font-black uppercase">
        <Download size={16} /> Imagen
    </button>
    </div>
</div>
);
};

export default TicketQR;