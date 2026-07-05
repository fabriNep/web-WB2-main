import { Role } from './role.model';

export interface Usuario {
  idUsuario?: number;
  nombre: string;
  email: string;
  username: string;
  password?: string;
  statusUsuario?: boolean;
  roles?: Role[];
}
