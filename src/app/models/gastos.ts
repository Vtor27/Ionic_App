export interface Gastos {
  id?: number;
  categoria_id: number;
  descripcion: string;
  cantidad: number;
  fecha_gasto: string;
  imagen_ticket: string;
  notas: string;
  fecha_creacion: string;
}
