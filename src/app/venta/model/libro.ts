import { Autor } from './autor';
import { Categoria } from './categoria';
import { Editorial } from './editorial';

export class Libro {
  libroId: number;
  autorId: Autor;
  categoriaId: Categoria;
  editorialId: Editorial;
  nombre: string;
  descripcion: string;
  paginas: any;
  fecha: Date;
  precio: string;
  cantidad: number;
}
