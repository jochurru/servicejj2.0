import { Smartphone, Monitor, Tv, Refrigerator, WashingMachine, Laptop } from 'lucide-react';

export const EQUIPOS_REPARACION = [
  { icon: Tv, title: 'Televisores', desc: 'LED, Smart TV y pantallas. Diagnóstico de imagen, sonido y placas.' },
  { icon: Smartphone, title: 'Celulares', desc: 'Pantallas, baterías, puertos de carga y fallas de software.' },
  { icon: Laptop, title: 'Notebooks & PC', desc: 'Formateo, upgrades, limpieza y reparación de hardware.' },
  { icon: Refrigerator, title: 'Heladeras', desc: 'Fugas, compresores, termostatos y sistemas No Frost.' },
  { icon: WashingMachine, title: 'Lavarropas', desc: 'Tambor, motor, programas y problemas de centrifugado.' },
  { icon: Monitor, title: 'Monitores', desc: 'Backlight, fuentes y conectividad HDMI/DisplayPort.' },
];

export const PROCESO_TECNICO = [
  { step: '01', title: 'Ingreso', desc: 'Recibimos tu equipo con ticket de seguimiento digital.' },
  { step: '02', title: 'Diagnóstico', desc: 'Evaluación técnica con presupuesto claro antes de reparar.' },
  { step: '03', title: 'Reparación', desc: 'Trabajo con repuestos de calidad y control de calidad.' },
  { step: '04', title: 'Entrega', desc: 'Garantía escrita y seguimiento online de tu pedido.' },
];
