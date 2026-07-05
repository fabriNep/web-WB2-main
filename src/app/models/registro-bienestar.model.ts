import { Empleado } from './empleado.model';

export interface RegistroBienestar {
  idRegistro?: number;
  empleado: Empleado;
  nivelEstres: number;
  estadoAnimo: string;
  fecha: string; // formato ISO yyyy-MM-dd
}
