export interface Resumen_Mensual {
  sueldo: number;
  gastosFijos: number;
  gastosVariables: number;
  totalGastos: number;
  porcentajeAhorro: number;
  ahorroPrevisto: number;
  disponible: number;
  estado: 'bien' | 'apretado';
}
