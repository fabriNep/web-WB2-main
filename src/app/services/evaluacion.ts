import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Evaluacion } from '../models/evaluacion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/evaluaciones`;

  listar(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.baseUrl);
  }

  misEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.baseUrl}/mis-evaluaciones`);
  }

  obtenerPorId(id: number): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(`${this.baseUrl}/${id}`);
  }

  crear(evaluacion: Evaluacion): Observable<void> {
    return this.http.post<void>(this.baseUrl, evaluacion);
  }

  actualizar(evaluacion: Evaluacion): Observable<string> {
    return this.http.put(this.baseUrl, evaluacion, { responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}