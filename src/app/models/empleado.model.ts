import { Empresa } from './empresa.model';
import { Usuario } from './usuario.model';


export interface Empleado {
  idEmpleado?: number;
  usuario: Usuario;
  empresa: Empresa;
  cargo: string;
  estado: boolean;
}
