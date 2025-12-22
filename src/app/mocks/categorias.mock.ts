import { Categorias } from '../models/categorias.interface';

export const CATEGORIAS_MOCK: Categorias[] = [
  {
    id: 1,
    nombre: 'Alimentación',
    color: '#2dd36f',
    icono: 'fast-food',
    es_fijo: 0,
    activa: 1,
  },
  {
    id: 2,
    nombre: 'Transporte',
    color: '#ffc409',
    icono: 'car',
    es_fijo: 0,
    activa: 1,
  },
  {
    id: 3,
    nombre: 'Ocio',
    color: '#eb445a',
    icono: 'game-controller',
    es_fijo: 0,
    activa: 1,
  },
  {
    id: 4,
    nombre: 'Vivienda',
    color: '#3880ff',
    icono: 'home',
    es_fijo: 1,
    activa: 1,
  },
  {
    id: 5,
    nombre: 'Servicios',
    color: '#92949c',
    icono: 'flash',
    es_fijo: 1,
    activa: 1,
  },
  {
    id: 6,
    nombre: 'Salud',
    color: '#10dc60',
    icono: 'medkit',
    es_fijo: 0,
    activa: 1,
  },
  {
    id: 7,
    nombre: 'Otros',
    color: '#222428',
    icono: 'ellipsis-horizontal',
    es_fijo: 0,
    activa: 1,
  },
];

// Helper para obtener categoría por ID
export const getCategoriaById = (id: number): Categorias | undefined => {
  return CATEGORIAS_MOCK.find((cat) => cat.id === id);
};

// Helper para obtener categorías fijas
export const getCategoriasFijas = (): Categorias[] => {
  return CATEGORIAS_MOCK.filter((cat) => cat.es_fijo === 1);
};

// Helper para obtener categorías variables
export const getCategoriasVariables = (): Categorias[] => {
  return CATEGORIAS_MOCK.filter((cat) => cat.es_fijo === 0);
};
