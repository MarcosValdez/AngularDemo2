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
  fecha: Date;
  precio: string;
  cantidad: number;
}
