export interface GastosFijos {
  id: number;
  categoria_id: number;
  descripcion: string;
  cantidad: number;
  dia_pago: number;
  activo: number; //Default 1
  fecha_creacion: string;
}
