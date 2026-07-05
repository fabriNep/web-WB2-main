import { RegistroBienestar } from './registro-bienestar.model';

export interface Alerta {
  idAlerta?: number;
  registro: RegistroBienestar;
  tipo: string;
  mensaje: string;
  fecha: string;
}
