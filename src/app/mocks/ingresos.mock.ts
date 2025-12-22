import { Ingresos } from '../models/ingresos';

export const INGRESOS_MOCK: Ingresos[] = [
  {
    id: 1,
    concepto: 'Nómina',
    cantidad: 1500,
    fecha: '2024-12-01T00:00:00.000Z',
    es_recurrente: 1,
  },
  {
    id: 2,
    concepto: 'Nómina',
    cantidad: 1500,
    fecha: '2024-11-01T00:00:00.000Z',
    es_recurrente: 1,
  },
  {
    id: 3,
    concepto: 'Nómina',
    cantidad: 1500,
    fecha: '2024-10-01T00:00:00.000Z',
    es_recurrente: 1,
  },
  {
    id: 4,
    concepto: 'Venta Wallapop',
    cantidad: 45,
    fecha: '2024-11-15T00:00:00.000Z',
    es_recurrente: 0,
  },
  {
    id: 5,
    concepto: 'Devolución Hacienda',
    cantidad: 180,
    fecha: '2024-12-10T00:00:00.000Z',
    es_recurrente: 0,
  },
];

// Helpers
export const getIngresosByMes = (mes: string): Ingresos[] => {
  return INGRESOS_MOCK.filter((i) => i.fecha.slice(0, 7) === mes);
};

export const getTotalIngresosMes = (mes: string): number => {
  return getIngresosByMes(mes).reduce((sum, i) => sum + i.cantidad, 0);
};

export const getIngresosRecurrentes = (): Ingresos[] => {
  return INGRESOS_MOCK.filter((i) => i.es_recurrente === 1);
};
