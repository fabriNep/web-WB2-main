import { inject, Injectable } from '@angular/core';
import { Empresa } from '../models/empresa.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/empresas`;

  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/${id}`);
  }

  crear(empresa: Empresa): Observable<void> {
    return this.http.post<void>(this.baseUrl, empresa);
  }

  actualizar(empresa: Empresa): Observable<string> {
    return this.http.put(this.baseUrl, empresa, { responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}