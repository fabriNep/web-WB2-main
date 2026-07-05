import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { EmpleadoService } from '../services/empleado';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const perfilGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const empleadoService = inject(EmpleadoService);
  const router = inject(Router);

  if (auth.isAdmin()) return of(true);

  return empleadoService.miPerfil().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/completar-perfil'])))
  );
};
