import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppServiceBase {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache');

  constructor(protected http: HttpClient) {}

  /**
   * Método para realizar una peticion get
   * @param api url a donde se va a realizar la consulta
   * @returns Objeto con los resultados de la busqueda
   */
  get(api: string) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.get(urlApi);
  }

  /**
   * método para realizar una peticion get con el id
   * @param api url a donde se va a realizar la consulta
   * @param id identificador del elemento que se consulta
   * @returns Objeto con los datos obtenidos del identificador
   */
  getById(api: string, id: any) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.get(urlApi);
  }

  /**
   * Método para realizar una peticion post
   * @param api url a donde se va a realizar la consulta
   * @param body cuerpo que se envia en la peticion
   * @returns Objeto a donde se hace la consulta o mensaje de confirmación
   */
  post(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.post(urlApi, body, { headers: this.headers });
  }

  /**
   * Método para realizar una peticion put
   * @param api url a donde se va a realizar la consulta
   * @param body cuerpo que se envia en la peticion
   * @returns Objeto a donde se hace la consulta o mensaje de confirmacion
   */
  put(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.put(urlApi, body);
  }

  /**
   * Método para realizar una petición delete
   * @param api url a donde se va a realizar la consulta
   * @param id identificar del elemento que se va a eliminar
   * @returns Objeto a donde se hace la consulta o mensaje de confirmación
   */
  delete(api: string, id: number) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.delete(urlApi);
  }

  /**
   * Método para realizar una peticion post que devuelve un array de bytes
   * @param api url a donde se va a realizar la consulta
   * @param body cuerpo que se envía en la peticion
   * @returns Cadena de bytes en forma de blob
   */
  getExcel(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.post(urlApi, body, { responseType: 'blob' });
  }
}
