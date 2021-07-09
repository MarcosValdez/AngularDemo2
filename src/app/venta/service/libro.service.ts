import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appService';
import { Parametros } from 'src/app/reporte/models/parametros';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root',
})
export class LibroService extends AppServiceBase {
  /**
   * Servicio para listar los libros
   * @returns lista de libros
   */
  listarLibros(): Observable<any> {
    return this.get('libro/list').pipe(catchError(this.handleError));
  }

  /**
   * Servicio para generar el excel con los filtros de busqueda
   * @param parametrosDTO Objeto con los parametros para realizar la búsqueda
   * @returns Archivo excel con los resultados de la busqueda como Array de bytes
   */
  exportarExcel(parametrosDTO: Parametros) {
    return this.getExcel('libro/export/reporte', parametrosDTO).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Servicio para devolver la
   * @param parametrosDTO Objeto con los parametros para realizar la busqueda
   * @returns lista de ventas realizadas segun el filtro
   */
  listarFiltro(parametrosDTO: Parametros): Observable<any> {
    return this.post('libro/listar', parametrosDTO).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Servicio para guardar un nuevo libro
   * @param libro Objeto con los datos del libro para guardar
   * @returns Mensaje de confirmacion del guardado
   */
  save(libro: Libro) {
    return this.post('libro/save', libro).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para la busqueda de un libro por su id
   * @param id Identificador del libro
   * @returns Objeto con los datos del libro
   */
  obtenerLibro(id: number) {
    return this.get(`libro/list/${id}`).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para eliminar un libro por su id
   * @param id Identificador del libro
   * @returns Mensaje de confirmación
   */
  eliminar(id: number) {
    return this.delete(`libro/delete`, id).pipe(catchError(this.handleError));
  }

  /**
   * Servicio para generar el reporte de inventario de los libros
   * @returns Archivo excel con el inventario de libros como array de bytes
   */
  descargar() {
    return this.getExcel('libro/export/inventario', { id: 1 }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Cannot perform the request, please try again later');
  }
}
