import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appService';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root',
})
export class VentaService extends AppServiceBase {
  guardarVenta(venta: Venta) {
    return this.post('venta/save', venta).pipe(catchError(this.handleError));
  }

  listaVentas() {
    return this.get('venta/list').pipe(catchError(this.handleError));
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
