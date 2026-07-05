import { Empleado } from "./empleado.model";

export interface Comentario {
  idComentario?: number;
  empleado: Empleado;
  contenido: string;
  fecha: string;
}
