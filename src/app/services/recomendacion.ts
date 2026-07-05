import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendacion } from '../models/recomendacion.model';

@Injectable({
  providedIn: 'root',
})
export class RecomendacionService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/recomendaciones`;

  listar(): Observable<Recomendacion[]> {
    return this.http.get<Recomendacion[]>(this.baseUrl);
  }

  misRecomendaciones(): Observable<Recomendacion[]> {
    return this.http.get<Recomendacion[]>(`${this.baseUrl}/mis-recomendaciones`);
  }

  obtenerPorId(id: number): Observable<Recomendacion> {
    return this.http.get<Recomendacion>(`${this.baseUrl}/${id}`);
  }

  crear(recomendacion: Recomendacion): Observable<void> {
    return this.http.post<void>(this.baseUrl, recomendacion);
  }

  actualizar(recomendacion: Recomendacion): Observable<string> {
    return this.http.put(this.baseUrl, recomendacion, { responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}