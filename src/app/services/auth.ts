import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { JwtRequest, JwtResponse, TokenPayload } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const TOKEN_KEY = 'wb_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credenciales: JwtRequest): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(`${this.baseUrl}/login`, credenciales)
      .pipe(tap((res) => sessionStorage.setItem(TOKEN_KEY, res.jwttoken)));
  }

  register(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/usuarios`, usuario);
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = jwtDecode<TokenPayload>(token);
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<TokenPayload>(token);
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    return this.getPayload()?.sub ?? null;
  }

  getRole(): string | null {
    return this.getPayload()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}