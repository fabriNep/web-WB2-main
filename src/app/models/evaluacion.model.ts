import { Empleado } from './empleado.model';

export interface Evaluacion {
  idEvaluacion?: number;
  empleado: Empleado;
  pregunta: string;
  respuesta: string;
  fecha: string;
}
