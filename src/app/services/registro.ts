import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegistroBienestar } from '../models/registro-bienestar.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/bienestar`;

  listar(): Observable<RegistroBienestar[]> {
    return this.http.get<RegistroBienestar[]>(this.baseUrl);
  }

  misRegistros(): Observable<RegistroBienestar[]> {
    return this.http.get<RegistroBienestar[]>(`${this.baseUrl}/mis-registros`);
  }

  obtenerPorId(id: number): Observable<RegistroBienestar> {
    return this.http.get<RegistroBienestar>(`${this.baseUrl}/${id}`);
  }

  crear(registro: RegistroBienestar): Observable<void> {
    return this.http.post<void>(this.baseUrl, registro);
  }

  actualizar(registro: RegistroBienestar): Observable<string> {
    return this.http.put(this.baseUrl, registro, { responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}