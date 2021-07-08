import { Autor } from './autor';
import { Categoria } from './categoria';
import { Editorial } from './editorial';

export class Libro {
  libroId: number;
  autor: Autor;
  categoria: Categoria;
  editorial: Editorial;
  nombre: string;
  descripcion: string;
  paginas: any;
  anio: number;
  precio: string;
  cantidad: number;
  imagen: string;
}
