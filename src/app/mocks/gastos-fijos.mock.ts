import { GastosFijos } from './../models/gastos_fijos';

export const GASTOS_FIJOS_MOCK: GastosFijos[] = [
  {
    id: 1,
    categoria_id: 4, // Vivienda
    descripcion: 'Alquiler piso',
    cantidad: 550,
    dia_pago: 1,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    categoria_id: 5, // Servicios
    descripcion: 'Electricidad',
    cantidad: 45,
    dia_pago: 10,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    categoria_id: 5, // Servicios
    descripcion: 'Agua',
    cantidad: 25,
    dia_pago: 15,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 4,
    categoria_id: 5, // Servicios
    descripcion: 'Internet + Móvil',
    cantidad: 35,
    dia_pago: 5,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 5,
    categoria_id: 5, // Servicios
    descripcion: 'Gas',
    cantidad: 30,
    dia_pago: 12,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 6,
    categoria_id: 2, // Transporte
    descripcion: 'Abono transporte',
    cantidad: 40,
    dia_pago: 1,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 7,
    categoria_id: 3, // Ocio
    descripcion: 'Netflix',
    cantidad: 13,
    dia_pago: 20,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 8,
    categoria_id: 3, // Ocio
    descripcion: 'Spotify',
    cantidad: 11,
    dia_pago: 15,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 9,
    categoria_id: 6, // Salud
    descripcion: 'Gimnasio',
    cantidad: 30,
    dia_pago: 1,
    activo: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
  },
];

// Total gastos fijos: 779€
// Esto deja para un sueldo de 1500€:
// - Ahorro (15%): 225€
// - Gastos fijos: 779€
// - Disponible para variables: ~496€

export const getTotalGastosFijos = (): number => {
  return GASTOS_FIJOS_MOCK.filter((g) => g.activo === 1).reduce(
    (sum, g) => sum + g.cantidad,
    0
  );
};
