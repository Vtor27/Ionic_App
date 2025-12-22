import { Gastos } from '../models/gastos';

// Gastos de diciembre 2024 (mes actual simulado)
export const GASTOS_MOCK: Gastos[] = [
  // Semana 1 (1-7 dic)
  {
    id: 1,
    categoria_id: 1, // Alimentación
    descripcion: 'Compra semanal Mercadona',
    cantidad: 62.35,
    fecha_gasto: '2024-12-02T18:30:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-02T18:30:00.000Z',
  },
  {
    id: 2,
    categoria_id: 1, // Alimentación
    descripcion: 'Café y tostada',
    cantidad: 3.5,
    fecha_gasto: '2024-12-03T08:15:00.000Z',
    imagen_ticket: '',
    notas: 'Desayuno fuera',
    fecha_creacion: '2024-12-03T08:15:00.000Z',
  },
  {
    id: 3,
    categoria_id: 2, // Transporte
    descripcion: 'Gasolina',
    cantidad: 45,
    fecha_gasto: '2024-12-04T19:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-04T19:00:00.000Z',
  },
  {
    id: 4,
    categoria_id: 3, // Ocio
    descripcion: 'Cena con amigos',
    cantidad: 28.5,
    fecha_gasto: '2024-12-06T21:30:00.000Z',
    imagen_ticket: '',
    notas: 'Cumple de Marta',
    fecha_creacion: '2024-12-06T21:30:00.000Z',
  },

  // Semana 2 (8-14 dic)
  {
    id: 5,
    categoria_id: 1, // Alimentación
    descripcion: 'Compra semanal Lidl',
    cantidad: 48.9,
    fecha_gasto: '2024-12-09T17:45:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-09T17:45:00.000Z',
  },
  {
    id: 6,
    categoria_id: 6, // Salud
    descripcion: 'Farmacia - Ibuprofeno',
    cantidad: 4.95,
    fecha_gasto: '2024-12-10T13:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-10T13:00:00.000Z',
  },
  {
    id: 7,
    categoria_id: 3, // Ocio
    descripcion: 'Cine',
    cantidad: 8.5,
    fecha_gasto: '2024-12-11T20:00:00.000Z',
    imagen_ticket: '',
    notas: 'Gladiator 2',
    fecha_creacion: '2024-12-11T20:00:00.000Z',
  },
  {
    id: 8,
    categoria_id: 1, // Alimentación
    descripcion: 'Pan y leche',
    cantidad: 4.2,
    fecha_gasto: '2024-12-12T09:30:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-12T09:30:00.000Z',
  },
  {
    id: 9,
    categoria_id: 7, // Otros
    descripcion: 'Regalo Navidad mamá',
    cantidad: 35,
    fecha_gasto: '2024-12-14T12:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-14T12:00:00.000Z',
  },

  // Semana 3 (15-21 dic)
  {
    id: 10,
    categoria_id: 1, // Alimentación
    descripcion: 'Compra semanal Carrefour',
    cantidad: 71.8,
    fecha_gasto: '2024-12-16T18:00:00.000Z',
    imagen_ticket: '',
    notas: 'Compra grande Navidad',
    fecha_creacion: '2024-12-16T18:00:00.000Z',
  },
  {
    id: 11,
    categoria_id: 2, // Transporte
    descripcion: 'Parking centro',
    cantidad: 3.5,
    fecha_gasto: '2024-12-17T11:30:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-17T11:30:00.000Z',
  },
  {
    id: 12,
    categoria_id: 1, // Alimentación
    descripcion: 'Menú del día',
    cantidad: 12.5,
    fecha_gasto: '2024-12-18T14:00:00.000Z',
    imagen_ticket: '',
    notas: 'Comida trabajo',
    fecha_creacion: '2024-12-18T14:00:00.000Z',
  },
  {
    id: 13,
    categoria_id: 3, // Ocio
    descripcion: 'Cervezas afterwork',
    cantidad: 15,
    fecha_gasto: '2024-12-19T19:30:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-19T19:30:00.000Z',
  },
  {
    id: 14,
    categoria_id: 7, // Otros
    descripcion: 'Lotería Navidad',
    cantidad: 20,
    fecha_gasto: '2024-12-20T10:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-20T10:00:00.000Z',
  },

  // Semana 4 (22-31 dic)
  {
    id: 15,
    categoria_id: 1, // Alimentación
    descripcion: 'Compra Nochebuena',
    cantidad: 85.6,
    fecha_gasto: '2024-12-23T17:00:00.000Z',
    imagen_ticket: '',
    notas: 'Marisco y carne',
    fecha_creacion: '2024-12-23T17:00:00.000Z',
  },
  {
    id: 16,
    categoria_id: 2, // Transporte
    descripcion: 'Gasolina viaje familia',
    cantidad: 50,
    fecha_gasto: '2024-12-24T09:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-12-24T09:00:00.000Z',
  },
  {
    id: 17,
    categoria_id: 3, // Ocio
    descripcion: 'Cotillón Nochevieja',
    cantidad: 45,
    fecha_gasto: '2024-12-28T20:00:00.000Z',
    imagen_ticket: '',
    notas: 'Entrada + copa',
    fecha_creacion: '2024-12-28T20:00:00.000Z',
  },
];

// Noviembre 2024 (mes anterior para historial)
export const GASTOS_NOVIEMBRE_MOCK: Gastos[] = [
  {
    id: 101,
    categoria_id: 1,
    descripcion: 'Compra semanal',
    cantidad: 55.2,
    fecha_gasto: '2024-11-04T18:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-11-04T18:00:00.000Z',
  },
  {
    id: 102,
    categoria_id: 1,
    descripcion: 'Compra semanal',
    cantidad: 48.3,
    fecha_gasto: '2024-11-11T18:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-11-11T18:00:00.000Z',
  },
  {
    id: 103,
    categoria_id: 1,
    descripcion: 'Compra semanal',
    cantidad: 61.5,
    fecha_gasto: '2024-11-18T18:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-11-18T18:00:00.000Z',
  },
  {
    id: 104,
    categoria_id: 1,
    descripcion: 'Compra semanal',
    cantidad: 52.8,
    fecha_gasto: '2024-11-25T18:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-11-25T18:00:00.000Z',
  },
  {
    id: 105,
    categoria_id: 2,
    descripcion: 'Gasolina',
    cantidad: 42,
    fecha_gasto: '2024-11-08T19:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-11-08T19:00:00.000Z',
  },
  {
    id: 106,
    categoria_id: 3,
    descripcion: 'Concierto',
    cantidad: 35,
    fecha_gasto: '2024-11-15T21:00:00.000Z',
    imagen_ticket: '',
    notas: '',
    fecha_creacion: '2024-11-15T21:00:00.000Z',
  },
  {
    id: 107,
    categoria_id: 6,
    descripcion: 'Dentista',
    cantidad: 60,
    fecha_gasto: '2024-11-20T10:00:00.000Z',
    imagen_ticket: '',
    notas: 'Revisión anual',
    fecha_creacion: '2024-11-20T10:00:00.000Z',
  },
  {
    id: 108,
    categoria_id: 7,
    descripcion: 'Ropa invierno',
    cantidad: 89,
    fecha_gasto: '2024-11-29T16:00:00.000Z',
    imagen_ticket: '',
    notas: 'Black Friday',
    fecha_creacion: '2024-11-29T16:00:00.000Z',
  },
];

// Todos los gastos juntos
export const ALL_GASTOS_MOCK: Gastos[] = [
  ...GASTOS_MOCK,
  ...GASTOS_NOVIEMBRE_MOCK,
];

// Helpers
export const getGastosByMes = (mes: string): Gastos[] => {
  return ALL_GASTOS_MOCK.filter(
    (g) => g.fecha_gasto.slice(0, 7) === mes
  );
};

export const getTotalGastosMes = (mes: string): number => {
  return getGastosByMes(mes).reduce((sum, g) => sum + g.cantidad, 0);
};

// Diciembre: ~543.80€ en gastos variables
// Noviembre: ~443.80€ en gastos variables
