import { Hammer, AirVent, ShoppingBag, ClipboardList } from 'lucide-react';

export const SERVICIOS = [
  {
    id: 1,
    title: 'Climatización',
    desc: 'Instalación, mantenimiento y reparación de aires acondicionados.',
    label: 'Especialidad',
    icon: <AirVent size={22} />,
    path: '/climatizacion',
  },
  {
    id: 2,
    title: 'Servicio Técnico',
    desc: 'TV, celulares, heladeras, lavarropas y más con garantía.',
    label: 'Core',
    icon: <Hammer size={22} />,
    path: '/servicio-tecnico',
  },
  {
    id: 3,
    title: 'Vidriera',
    desc: 'Equipos y repuestos destacados. Consultá disponibilidad.',
    label: 'Productos',
    icon: <ShoppingBag size={22} />,
    path: '/ventas',
  },
  {
    id: 4,
    title: 'Técnico Online',
    desc: 'Creá tu pedido, subí fotos y recibí presupuesto express.',
    label: 'Digital',
    icon: <ClipboardList size={22} />,
    path: '/tecnico-online',
  },
];
