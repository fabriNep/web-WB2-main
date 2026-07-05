import { RegistroBienestar } from './registro-bienestar.model';

export interface Recomendacion {
  idRecomendacion?: number;
  registro: RegistroBienestar;
  descripcion: string;
  fecha: string;
}
