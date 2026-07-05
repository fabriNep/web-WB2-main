import { Usuario } from './usuario.model';

export interface InteraccionChatbot {
  idInteraccion?: number;
  usuario: Usuario;
  mensajeUsuario: string;
  respuestaBot: string;
  fecha: string;
}
