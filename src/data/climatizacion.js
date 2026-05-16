import { Snowflake, Wind, Wrench, Shield, Flame, Boxes } from 'lucide-react';

/** Servicios destacados */
export const BENEFICIOS_CLIMA = [
  {
    icon: Wind,
    title: 'Aire acondicionado',
    desc: 'Splits, multisplit, conductos y equipos centrales. Instalación, limpieza profunda, recarga de gas y service preventivo.',
  },
  {
    icon: Flame,
    title: 'Calderas y calefacción',
    desc: 'Diagnóstico de quemadores, intercambiadores, válvulas y circulación. Mantenimiento anual y reparación en todas las marcas.',
  },
  {
    icon: Boxes,
    title: 'Cámaras frigoríficas',
    desc: 'Equipos comerciales e industriales: fugas, compresores, electricidad y puertas. Visitas programadas para comercios.',
  },
  {
    icon: Wrench,
    title: 'Reparación integral',
    desc: 'Fallas eléctricas, electrónica, fugas y equipos que no enfrían ni calientan. Presupuesto claro antes de avanzar.',
  },
  {
    icon: Snowflake,
    title: 'Frío industrial',
    desc: 'Balance térmico y puesta a punto según uso real del espacio. Materiales de primera y terminación prolija.',
  },
  {
    icon: Shield,
    title: 'Garantía escrita',
    desc: 'Trabajos respaldados por escrito. Técnicos matriculados y seguimiento si necesitás soporte posterior.',
  },
];

/**
 * Marcas calefacción (reales en Argentina)
 */
export const MARCAS_CALDERAS = [
  { name: 'Peisa', slug: null },
  { name: 'Eskabe', slug: null },
  { name: 'Orbis', slug: null },
  { name: 'Longvie', slug: null },
  { name: 'Volcan', slug: null },
  { name: 'Rheem', slug: null },
  { name: 'Emege', slug: null },
  { name: 'Bosch', slug: 'bosch' },
  { name: 'Ariston', slug: null },
  { name: 'Baxi', slug: null },
  { name: 'Rinnai', slug: 'rinnai' },
  { name: 'Caldaia', slug: null },
];  

/**
 * Marcas aire acondicionado (fuertes en Argentina)
 */
export const MARCAS_AIRE = [
  { name: 'Samsung', slug: 'samsung' },
  { name: 'LG', slug: 'lg' },
  { name: 'Philco', slug: null },
  { name: 'BGH', slug: null },
  { name: 'Surrey', slug: null },
  { name: 'Carrier', slug: 'carrier' },
  { name: 'York', slug: null },
  { name: 'Electrolux', slug: 'electrolux' },
  { name: 'Hisense', slug: null },
  { name: 'TCL', slug: null },
  { name: 'Gree', slug: null },
  { name: 'Tadiran', slug: 'tadiran' },
];

/** Imágenes con look más técnico y real (menos stock posado) */
export const IMAGENES_CLIMA = {
  aire: 'https://res.cloudinary.com/dxtzs8lit/image/upload/v1778894249/Aire_m6blfe.webp',

  caldera: 'https://res.cloudinary.com/dxtzs8lit/image/upload/v1778894248/caldera_yf3nv6.webp',

  camara: 'https://res.cloudinary.com/dxtzs8lit/image/upload/v1778894249/camara_o2x0gg.webp',

  tecnico: 'https://res.cloudinary.com/dxtzs8lit/image/upload/v1778894250/servicio_tecnico_kqnsqn.webp',
};

/** Tarjetas hero visuales — grid 2×2 (fila 1: Aires | Calderas · fila 2: Cámaras | Service) */
export const VISUAL_SERVICIOS_CLIMA = [
  {
    imageKey: 'aire',
    alt: 'Técnico revisando unidad exterior de aire acondicionado',
    label: 'Aires acondicionados',
    sub: 'Instalación, limpieza, gas refrigerante y reparación de equipos que no enfrían.',
  },
  {
    imageKey: 'caldera',
    alt: 'Sistema de calefacción y caldera',
    label: 'Calderas',
    sub: 'Puesta a punto, seguridad de combustión y mantenimiento para que duren más.',
  },
  {
    imageKey: 'camara',
    alt: 'Depósito industrial refrigerado',
    label: 'Cámaras frigoríficas',
    sub: 'Fallas eléctricas, sellado y equipos que pierden temperatura.',
  },
  {
    imageKey: 'tecnico',
    alt: 'Instalación y mantenimiento de equipos de climatización',
    label: 'Service integral',
    sub: 'Diagnóstico claro y garantía escrita en cada intervención.',
  },
];