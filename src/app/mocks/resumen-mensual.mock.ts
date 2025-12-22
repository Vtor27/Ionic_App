import { Resumen_Mensual } from '../models/resumen_mensual.interface';
import { CONFIGURACION_MOCK } from './configuracion.mock';
import { getTotalGastosFijos } from './gastos-fijos.mock';
import { getTotalGastosMes } from './gastos.mock';

// Genera un resumen para cualquier mes
export const getResumenMensualMock = (mes?: string): Resumen_Mensual => {
  const fechaFiltro = mes || new Date().toISOString().slice(0, 7);

  const sueldo = CONFIGURACION_MOCK.sueldo_mensual;
  const porcentajeAhorro = CONFIGURACION_MOCK.porcentaje_ahorro;
  const gastosFijos = getTotalGastosFijos();
  const gastosVariables = getTotalGastosMes(fechaFiltro);
  const totalGastos = gastosFijos + gastosVariables;
  const ahorroPrevisto = (sueldo * porcentajeAhorro) / 100;
  const disponible = sueldo - totalGastos - ahorroPrevisto;

  return {
    sueldo,
    gastosFijos,
    gastosVariables,
    totalGastos,
    porcentajeAhorro,
    ahorroPrevisto,
    disponible,
    estado: disponible >= 0 ? 'bien' : 'apretado',
  };
};

// Resumen de diciembre 2024 precalculado
export const RESUMEN_DICIEMBRE_MOCK: Resumen_Mensual = {
  sueldo: 1500,
  gastosFijos: 779, // Total de gastos_fijos.mock
  gastosVariables: 543.8, // Total de gastos.mock (diciembre)
  totalGastos: 1322.8,
  porcentajeAhorro: 15,
  ahorroPrevisto: 225,
  disponible: -47.8, // 1500 - 1322.8 - 225 = -47.8 (mes apretado por Navidad)
  estado: 'apretado',
};

// Resumen de noviembre 2024 precalculado
export const RESUMEN_NOVIEMBRE_MOCK: Resumen_Mensual = {
  sueldo: 1500,
  gastosFijos: 779,
  gastosVariables: 443.8, // Total de gastos.mock (noviembre)
  totalGastos: 1222.8,
  porcentajeAhorro: 15,
  ahorroPrevisto: 225,
  disponible: 52.2, // 1500 - 1222.8 - 225 = 52.2
  estado: 'bien',
};
