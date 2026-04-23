// src/data/servicios.jsx
import { Hammer, AirVent, ShoppingBag } from 'lucide-react';

export const SERVICIOS = [
    {
        id: 1,
        title: "Climatización",
        desc: "Instalación y mantenimiento de aires acondicionados. Especialistas en sistemas split.",
        label: "SERVICIO PRINCIPAL",
        icon: <AirVent size={40} />,
        color: "hover:border-blue-600",
        destacado: true,
        path: "/climatizacion"
    },
    {
        id: 2,
        title: "Servicio Técnico",
        desc: "Reparación de lavarropas, heladeras y TV con repuestos originales y garantía.",
        label: "ATENCIÓN RÁPIDA",
        icon: <Hammer size={40} />,
        color: "hover:border-blue-600",
        path: "/servicio-tecnico"
    },
    {
        id: 3,
        title: "Ventas",
        desc: "Equipos reacondicionados y repuestos seleccionados con garantía escrita.",
        label: "OPORTUNIDADES",
        icon: <ShoppingBag size={40} />,
        color: "hover:border-blue-600",
        path: "/ventas"
    },
    {
        id: 4,
        title: "Técnico Online",
        desc: "Diagnóstico remoto gratuito. Subí fotos de tu equipo y recibí un presupuesto aproximado.",
        label: "NUEVO SERVICIO",
        icon: (
            <div className="relative">
                <Hammer size={40} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
        ),
        color: "hover:border-blue-600",
        destacado: false,
        path: "/tecnico-online"
    }
];