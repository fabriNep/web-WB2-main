import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';

const PUBLIC_ENDPOINTS = ['/login'];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const esPublico = PUBLIC_ENDPOINTS.some(url => req.url.includes(url)) ||
    (req.method === 'POST' && req.url.endsWith('/usuarios'));

  if (esPublico) {
    return next(req);
  }

  const token = authService.getToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  return next(req);
};
