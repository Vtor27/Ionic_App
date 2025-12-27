
export interface GastoConCategoria {
    id: number;
    categoria_id: number;
    descripcion: string;
    cantidad: number;
    fecha_gasto: string;
    imagen_ticket?: string;
    notas: string;
    categoria_nombre: string;
    categoria_color: string;
    categoria_icono: string; 
}