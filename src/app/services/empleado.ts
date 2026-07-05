import { inject, Injectable } from '@angular/core';
import { Empleado } from '../models/empleado.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CompletarPerfil } from '../models/completar-perfil.model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/empleados`;

  listar(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}/${id}`);
  }

  crear(empleado: Empleado): Observable<void> {
    return this.http.post<void>(this.baseUrl, empleado);
  }

  actualizar(empleado: Empleado): Observable<string> {
    return this.http.put(this.baseUrl, empleado, { responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  miPerfil(): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}/mi-perfil`);
  }

  completarPerfil(data: CompletarPerfil): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.baseUrl}/mi-perfil`, data);
  }
}