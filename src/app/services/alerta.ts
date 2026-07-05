import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Alerta } from '../models/alerta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/alertas`;

  listar(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.baseUrl);
  }

  misAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.baseUrl}/mis-alertas`);
  }

  obtenerPorId(id: number): Observable<Alerta> {
    return this.http.get<Alerta>(`${this.baseUrl}/${id}`);
  }

  crear(alerta: Alerta): Observable<void> {
    return this.http.post<void>(this.baseUrl, alerta);
  }

  actualizar(alerta: Alerta): Observable<string> {
    return this.http.put(this.baseUrl, alerta, { responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}