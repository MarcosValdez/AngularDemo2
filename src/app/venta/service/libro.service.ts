import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appService';
import { Parametros } from 'src/app/reporte/models/parametros';

@Injectable({
  providedIn: 'root',
})
export class LibroService extends AppServiceBase {
  listarLibros(): Observable<any> {
    return this.get('libro/list').pipe(catchError(this.handleError));
  }
  exportarExcel(parametrosDTO: Parametros) {
    return this.getExcel('libro/export', parametrosDTO).pipe(
      catchError(this.handleError)
    );
  }

  listarFiltro(parametrosDTO: Parametros): Observable<any> {
    return this.post('libro/listar', parametrosDTO).pipe(
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
