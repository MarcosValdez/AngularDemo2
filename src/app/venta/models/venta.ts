import { Libro } from './libro';
import { Comprador } from './comprador';

export class Venta {
  ventaId: number;
  libro: Libro;
  comprador: Comprador;
  fecha: Date;
}
